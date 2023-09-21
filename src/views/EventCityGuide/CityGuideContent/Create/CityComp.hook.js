import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useRef } from "react";
import {
  serviceCreateEventCityContent,
  serviceGetEventCityContentDetails,
  serviceUpdateEventCityContent,
} from "../../../../services/EventCityContent.service";
import historyUtils from "../../../../libs/history.utils";
import { useEffect } from "react";
import { useParams } from "react-router";

function useCityCompHook({ location }) {
  const initialForm = {
    title: "",
    priority: "",
    description: "",
  };
  const [form, setForm] = useState({ ...initialForm });
  const descriptionRef = useRef(null);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
    },
    [form, setForm, errorData]
  );
  useEffect(() => {
    if (id) {
      serviceGetEventCityContentDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            id: id,
            event_id: data?.event_id,
            event_city_guide_id: data?.event_city_guide_id,
            title: data?.title,
            description: data?.description,
            priority: data?.priority,
          });
        } else {
          SnackbarUtils.error(res?.message);
          historyUtils.goBack();
        }
      });
    }
  }, [id]);
  const selectedEventId = useMemo(() => {
    return location?.state?.eventId;
  }, [location]);

  const cityId = useMemo(() => {
    return location?.state?.cityId;
  }, [location]);

  console.log("selectedEventId", selectedEventId);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    ["priority", "title"].forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        delete errors[val];
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      if (selectedEventId) {
        form.event_id = selectedEventId;
      }
      if (cityId) {
        form.event_city_guide_id = cityId;
      }
      let req;
      if (id) {
        req = serviceUpdateEventCityContent({ ...form });
      } else {
        req = serviceCreateEventCityContent({ ...form });
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
  }, [form, isSubmitting, setIsSubmitting]);
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    setErrorData({ ...errors });
    if (Object.keys(errors).length === 0) {
      submitToServer();
    } else {
      console.log(form, errors, "errorFiels");
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
  ]);
  descriptionRef.current = changeTextData;

  return {
    changeTextData,
    form,
    errorData,
    changeTextData,
    handleSubmit,
    descriptionRef,
    isSubmitting,
  };
}

export default useCityCompHook;
