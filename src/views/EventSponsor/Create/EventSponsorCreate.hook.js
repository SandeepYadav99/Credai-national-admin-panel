import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { isDate, isEmail, validateUrl } from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateEventSponsor,
  serviceDetailsGetSponsorList,
  serviceGetEventSponsorDetails,
  serviceUpdateEventSponsor,
} from "../../../services/EventSponsor.service";
import { useMemo } from "react";

function useEventSponsorCreate({ location }) {
  const initialForm = {
    name: "",
    web_url: "",
    img_url: "",
    priority: "",
    email: "",
    product: "",
    contact: "",
    type: "",
    twitter: "",
    company_profile: "",
    fb: "",
    linkedin: "",
    youtube: "",
    status: false,
  };
  const [form, setForm] = useState({ ...initialForm });
  const [img, setImg] = useState("");
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    SPONSOR_TYPE: [],
  });

  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  useEffect(() => {
    serviceGetList(["SPONSOR_TYPE"], { event_id: selectedEventId }).then(
      (res) => {
        if (!res.error) {
          setListData(res.data);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (id) {
      serviceGetEventSponsorDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          console.log("data", data);
          const fd = {};
          Object.keys({ ...initialForm }).forEach((key) => {
            if (key !== "img_url") {
              if (key === "type") {
                fd[key] = data["typeObj"]?._id;
              } else {
                fd[key] = data[key];
              }
            }
          });
          setForm({
            ...form,
            id: id,
            ...fd,
          });
          setImg(data?.img_url);
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);

  console.log("errorData", errorData);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "web_url",
      // "img_url",
      "priority",
      "email",
      "contact",
      // "type",
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
    if (form?.web_url && !validateUrl(form?.web_url)) {
      errors.web_url = true;
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
      } else if (fieldName === "priority") {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "contact") {
        if (text >= 0 && text?.length <= 10) {
          t[fieldName] = text;
        }
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

        Object.keys(form).forEach((key) => {
          LogUtils.log("key", key);
          if (key !== "img_url") {
            if (["member_users"].includes(key)) {
              fd.append(key, JSON.stringify(form[key]));
            } else {
              fd.append(key, form[key]);
            }
          }
        });
        if (form?.img_url) {
          fd.append("img_url", form?.img_url);
        }
        if (selectedEventId) {
          fd.append("event_id", selectedEventId);
        }
        let req;
        if (id) {
          req = serviceUpdateEventSponsor(fd);
        } else {
          serviceCreateEventSponsor(fd);
        }
        req.then((res) => {
          if (!res.error) {
            historyUtils.goBack();
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
    img,
  };
}

export default useEventSponsorCreate;
