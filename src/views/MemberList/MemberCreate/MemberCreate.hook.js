import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  HexCodeValid,
  isAlphaNumChars,
  isDate,
  isEmail,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import { serviceCreateEventList } from "../../../services/EventList.service";
import { serviceCreateMemberList } from "../../../services/MemberList.service";

function useMemberCreate() {
  const initialForm = {
    name: "",
    url: "",
    chapter_ids: [],
    image: "",
    name2: "",
    email: "",
    title: "",
    contact: "",
    is_active: false,
    is_access_invite: false,
  };
  const colorKey = ["name2", "email", "title", "contact"];
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  console.log("errorData", errorData);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "url",
      // "chapter_ids",
      "image",
      "name2",
      "email",
      "contact",
      "title",
    ];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    if (form?.url && !validateUrl(form?.url)) {
      errors.url = true;
      SnackbarUtils.error("Please Enter the Valid Url");
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
        const relatedId =
          Array.isArray(form.chapter_ids) && form.chapter_ids.length > 0
            ? form.chapter_ids.map((item) => item.id)
            : [];
        form.chapter_ids = relatedId;
        const themeData = {};
        for (const prop in form) {
          if (colorKey.includes(prop)) {
            if (prop === "name2") {
              themeData["name"] = form[prop];
            } else {
              themeData[prop] = form[prop];
            }
            delete form[prop];
          }
        }
        form.member_users = themeData;
        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (["chapter_ids", "member_users"].includes(key)) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        });

        console.log("form", form, errorData);
        serviceCreateMemberList(fd).then((res) => {
          if (!res.error) {
            historyUtils.push("/members");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting]
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
      console.log("yha");
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
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
  };
}

export default useMemberCreate;
