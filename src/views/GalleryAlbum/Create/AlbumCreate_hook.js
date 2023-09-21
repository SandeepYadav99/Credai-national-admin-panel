import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import { serviceCreateEventList } from "../../../services/EventList.service";
import { serviceCreateMemberList } from "../../../services/MemberList.service";
import history from "../../../libs/history.utils";
import { isEmail, validateUrl } from "../../../libs/RegexUtils";
import {
  serviceCreateAlbumList,
  serviceGetAlbumDetails,
  serviceUpdateAlbumList,
} from "../../../services/GalleryAlbum.service";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";

const useAlbumCreateHook = () => {
  const initialForm = {
    // id: "",
    name: "",
    event_date: "",
    description: "",
    thumbnail: "",
    images: "",
    related_to: {
      event: true,
      chapter: false,
    },
    related_chapter_id: "",
    related_event_id: "",
    visible_to: {
      all_chapters: true,
      event_participants: false,
      chapters: false,
    },
    visible_event_ids: "",
    visible_chapter_ids: [],
    status: "ACTIVE",
    // is_active: true,
  };
  // const colorKey = ["name2", "email", "title", "contact"];
  const eventkeys = ["all_chapters", "chapters", "event_participants"];
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  // const { id }  = useParams();
  const [select, setSelect] = useState("all_chapters");
  const [selectEvent, setSelectEvent] = useState("");
  const [selectRelated, setSelectRelated] = useState("Events");
  const descriptionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const empId = queryParams.get("id");

  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
  });

  console.log(form, "Form Data");
  useEffect(() => {
    serviceGetList(["ADMIN", "CHAPTERS", "EVENTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  console.log("errorData", errorData);
  useEffect(() => {
    if (empId) {
      serviceGetAlbumDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
         
          setForm({
            ...form,
            // id:data._id,
            name: data?.name,
            event_date: data?.createdAt,
            description: data?.description,
            related_chapter_id: data.related_chapter_id,
            related_event_id: data.related_event_id,
            visible_chapter_ids: data.visible_chapter_ids,
            visible_event_ids: data.visible_event_ids,
            // document: data.document,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  // useEffect(() => {
  //   if (select === "all_chapters") {
  //     setForm({ ...form, visible_event_ids: [] });
  //   }
  // }, [selectRelated]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "id",
      "name",
      "event_date",
      "description",
      "related_event_id",
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
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
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        const chapterId =
          Array.isArray(form.visible_chapter_ids) &&
          form.visible_chapter_ids.length > 0
            ? form.visible_chapter_ids.map((item) => item.id)
            : [];
        form.visible_chapter_ids = chapterId;

        const EventId =
          Array.isArray(form.related_event_id) &&
          form.related_event_id.length > 0
            ? form.related_event_id.map((item) => item.id)
            : [];

        form.related_event_id = EventId;

        const visibleEventId =
          Array.isArray(form.visible_event_ids) &&
          form.visible_event_ids.length > 0
            ? form.visible_event_ids.map((item) => item.id)
            : [];

        form.visible_event_ids = visibleEventId;
        const accessKey = {};
        for (const prop in form) {
          if (eventkeys.includes(prop)) {
            accessKey[prop] = prop === select;
          }
        }
        form.visible_to = accessKey;
        Object.keys(form).forEach((key) => {
          // if (key === "status") {
          //   fd.append(key, status === "ACTIVE" ? "ACTIVE" : "INACTIVE");
          // }

          if (key === "related_to") {
            fd.append(key, JSON.stringify(form[key]));
          } else if (
            key === "visible_to" ||
            key === "visible_chapter_ids" ||
            key === "related_event_id" ||
            key === "visible_event_ids"
          ) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        });
        // fd.append("status", status);
        if (empId) {
          fd.append("id", empId);
        }

        let req;
        if (empId) {
          req = serviceUpdateAlbumList(fd);
        } else {
          req = serviceCreateAlbumList(fd);
        }

        req.then((res) => {
          if (!res.error) {
            //  handleToggleSidePannel();
            historyUtils.push("/album");
            window.location.reload();
          } else {
            SnackbarUtils.error(res.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [
      form,
      isSubmitting,
      setIsSubmitting,
      select,
      selectRelated,
      empId,
      selectEvent,
    ]
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
      // console.log("yha");
      submitToServer(status);
    },
    // checkFormValidation,
    [
      setErrorData,
      form,
      submitToServer,
      checkFormValidation,
      select,
      selectEvent,
    ]
  );

  console.log("form", form);
  descriptionRef.current = changeTextData;
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    select,
    setSelect,
    selectRelated,
    setSelectRelated,
    empId,
    selectEvent,
    setSelectEvent,
  };
};

export default useAlbumCreateHook;
