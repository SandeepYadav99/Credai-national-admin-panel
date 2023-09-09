import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  HexCodeValid,
  isAlphaNumChars,
  isDate,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import { serviceCreateEventList } from "../../../services/EventList.service";

function useEventCreate() {
  const initialForm = {
    name: "",
    slug: "",
    organised_by: "",
    start_date: "",
    end_date: "",
    location: "",
    admin_id: "",
    url: "",
    registration_url: "",
    registration_status: "",
    is_digital: "",
    related_event_ids: [],
    description: "",
    logo: "",
    thumbnail: "",
    banner: "",
    primary_colour: "",
    secondary_colour: "",
    action_colour: "",
    menu_text_colour: "",
    all: false,
    event_participants: false,
    chapters: false,
    accessible_chapter_ids: [],
    is_gallery_public: "",
  };
  const featureKey = {
    event_participants: true,
    event_schedule: true,
    about_event: true,
    event_organizing_committee: false,
    event_speakers: true,
    event_gallery: false,
    analytics: false,
    help_desk: false,
    poll: false,
    surveys: false,
    sponsors: false,
    city_guide: false,
    event_feed: true,
    profile: true,
    networking: true,
    feedback: false,
  };
  const colorKey = [
    "primary_colour",
    "secondary_colour",
    "action_colour",
    "menu_text_colour",
  ];
  const eventkeys = ["all", "chapters", "event_participants"];
  const [form, setForm] = useState({ ...initialForm });
  const [feature, setFeature] = useState({ ...featureKey });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remotePath, setRemotePath] = useState("");
  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
  });
  useEffect(() => {
    serviceGetList(["ADMIN", "CHAPTERS", "EVENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "slug",
      "organised_by",
      "start_date",
      "end_date",
      "location",
      "admin_id",
      "url",
      "registration_url",
      "registration_status",
      "is_digital",
      // "related_event_ids",
      "description",
      "logo",
      "thumbnail",
      "banner",
      "primary_colour",
      "secondary_colour",
      "action_colour",
      "menu_text_colour",
      "is_gallery_public",
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    ["url", "registration_url"].forEach((val) => {
      if (!validateUrl(form[val])) {
        errors[val] = true;
        SnackbarUtils.error("Please Enter the Valid Url");
      }
    });
    colorKey.forEach((item) => {
      if (!HexCodeValid(form[item])) {
        errors[item] = true;
      }
    });
    if (!isDate(form?.start_date)) {
      errors["start_date"] = true;
    }
    if (!isDate(form?.end_date)) {
      errors["end_date"] = true;
    }
    if (form?.start_date && form?.end_date) {
      const joinDate = new Date(form?.start_date);
      const expectedDate = new Date(form?.end_date);
      joinDate.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      if (joinDate.getTime() > expectedDate.getTime()) {
        SnackbarUtils.error("End date should not be Less than Start date");
        errors["end_date"] = true;
      }
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
        t["slug"] = text.toLowerCase().replace(/ /g, "-");
      } else if (eventkeys?.includes(fieldName)) {
        if (fieldName === "all") {
          if (text) {
            eventkeys.map((item) => (t[item] = true));
          } else {
            eventkeys.map((item) => (t[item] = false));
          }
        } else if (fieldName === "chapters") {
          if (text) {
            if (t?.event_participants) {
              eventkeys.map((item) => (t[item] = true));
            } else {
              t["chapters"] = true;
              t["all"] = false;
            }
          } else {
            t["all"] = false;
            t["chapters"] = false;
          }
        } else if (fieldName === "event_participants") {
          if (text) {
            if (t?.chapters) {
              eventkeys.map((item) => (t[item] = true));
            } else {
              t["event_participants"] = true;
              t["all"] = false;
            }
          } else {
            t["all"] = false;
            t["event_participants"] = false;
          }
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  console.log("feature", feature);
  const changeFeatureData = useCallback(
    (text, fieldName) => {
      const t = { ...feature };
      t[fieldName] = text;
      setFeature(t);
    },
    [feature, setFeature]
  );
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();
        const relatedId =
          Array.isArray(form.related_event_ids) &&
          form.related_event_ids.length > 0
            ? form.related_event_ids.map((item) => item.id)
            : [];
        form.related_event_ids = relatedId;
        const chapterId =
          Array.isArray(form.accessible_chapter_ids) &&
          form.accessible_chapter_ids.length > 0
            ? form.accessible_chapter_ids.map((item) => item.id)
            : [];
        form.accessible_chapter_ids = chapterId;
        const themeData = {};
        const accessKey = {};
        for (const prop in form) {
          if (colorKey.includes(prop)) {
            themeData[prop] = form[prop];
            delete form[prop];
          }
          if (eventkeys.includes(prop)) {
            accessKey[prop] = form[prop];
            delete form[prop];
          }
        }
        form.accessible_to = accessKey;
        form.theme = themeData;
        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (
            ["registration_status", "is_gallery_public", "is_digital"].includes(
              key
            )
          ) {
            fd.append(key, form[key] ? true : false);
          } else if (
            [
              "related_event_ids",
              "accessible_chapter_ids",
              "theme",
              "accessible_to",
            ].includes(key)
          ) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        });
        fd.append('features',JSON.stringify(feature))
        fd.append("status", status);
        serviceCreateEventList(fd).then((res) => {
          if (!res.error) {
            historyUtils.push("/events");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting,feature]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }

      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer,feature]
  );

  console.log("form", form);
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    changeFeatureData,
    feature,
  };
}

export default useEventCreate;
