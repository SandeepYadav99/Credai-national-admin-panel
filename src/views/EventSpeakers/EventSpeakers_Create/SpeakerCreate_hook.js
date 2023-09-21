import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";

import {
  serviceCreateEventSpeaker,
  serviceGetEventSpeakerDetails,
  serviceUpdateEventSpeaker,
} from "../../../services/EventSpeaker.service";
import historyUtils from "../../../libs/history.utils";
import constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";

function useSpeakerCreateHook({ location }) {
  const initialForm = {
    s_image: "",
    s_name: "",
    s_description: "",
    s_company: "",
    s_designation: "",
    status: true,
  };
  const { id } = useParams();
  const eventId = location?.state?.event_id;

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      serviceGetEventSpeakerDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          console.log(data, "Updatead Data");
          setImage(data?.s_image);
          setForm({
            ...form,
            id: data._id,
            //s_image: data?.s_image,
            s_name: data?.s_name,
            s_description: data?.s_description,
            s_company: data?.s_company,
            s_designation: data?.s_designation,

            // document: data.document,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "s_image",
      "s_name",
      "s_description",
      "s_company",
      "s_designation",
    ];

    if (!eventId) {
      required.push("s_image");
    }

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

        Object.keys(form).forEach((key) => {
          const val = form[key];
          if (["status", "s_image", "is_active"].indexOf(key) < 0) {
            fd.append(key, val);
          }
        });

        fd.append("status", form?.status ? "ACTIVE" : "INACTIVE");

        if (form?.s_image) {
          fd.append("s_image", form?.s_image);
        }
        if(eventId){
          fd.append('event_id',eventId)
        }
        let req;
        if (id) {
          req = serviceUpdateEventSpeaker(fd);
        } else {
          req = serviceCreateEventSpeaker(fd);
        }

        req.then((res) => {
          if (!res.error) {
            historyUtils.goBack()
            // historyUtils.push(`${RouteName.EVENTS_SPEAKERS_LIST}`);
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
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    image,
  };
}

export default useSpeakerCreateHook;
