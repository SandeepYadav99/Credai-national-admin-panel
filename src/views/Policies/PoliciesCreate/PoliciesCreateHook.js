import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import historyUtils from "../../../libs/history.utils";
import {
  serviceAdminUserCheck,
  serviceCreateAdminUser,
  serviceGetAdminUserDetails,
  serviceUpdateAdminUser,
} from "../../../services/AdminUser.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceCreatePolicyList, serviceGetPolicyDetails, serviceGetPolicyList, serviceUpdatePolicyList } from "../../../services/Policy.service";
import { serviceGetList } from "../../../services/Common.service";

const initialForm = {
  name: "",
  // country_code: "91",
  effective_date: "",
  chapter_id: "",
  document: "",
  // type: "",
  status: true,
  // image: null,
};

const usePoliciesCreateHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.code, 500);

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
  useEffect(() => {
   
    if (empId) {
      serviceGetPolicyList({ id: empId }).then((res) => {
     
        if (!res.error) {
          const data = res?.response_obj;
         
          setForm({
            ...form,
            name: data?.name,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  // const checkCodeValidation = useCallback(() => {
  //   serviceAdminUserCheck({ code: form?.code, id: empId ? empId : "" }).then(
  //     (res) => {
  //       if (!res.error) {
  //         const errors = JSON.parse(JSON.stringify(errorData));
  //         if (res.data.is_exists) {
  //           errors["code"] = "PolicyList Code Exists";
  //           setErrorData(errors);
  //         } else {
  //           delete errors.code;
  //           setErrorData(errors);
  //         }
  //       }
  //     }
  //   );
  // }, [errorData, setErrorData, form?.code]);

  // useEffect(() => {
  //   if (codeDebouncer) {
  //     checkCodeValidation();
  //   }
  // }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      // "country_code",
      "effective_date",
      "chapter_id",
      "document",
      // "type",
      "status",
    
    ];
   
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
      if (form?.chapter_id && !isEmail(form?.chapter_id)) {
        errors["chapter_id"] = true;
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
      const fd = new FormData();
      // Object.keys(form).forEach((key) => {
      //   if (key === "status") {
      //     fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
      //   } else if (key === "effective_date") {
      //     fd.append(key, form[key].replace(/\+/g, ""));
      //   } else {
      //     fd.append(key, form[key]);
      //   }
      // });
      Object.keys(form).forEach((key) => {
        if (key === "status") {
          fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
        } else {
          fd.append(key, form[key]);
        }
      });
      let req;
      if (empId) {
        req = serviceUpdatePolicyList({ ...form, id: empId ? empId : "" });
      } else {
 
        req = serviceCreatePolicyList(fd);
      }
      req.then((res) => {
       
        if (!res.error) {
          handleToggleSidePannel();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId]);

 
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
      if (fieldName === "policy_title") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  // const onBlurHandler = useCallback(
  //   (type) => {
  //     if (form?.[type]) {
  //       changeTextData(form?.[type].trim(), type);
  //     }
  //   },
  //   [changeTextData, checkCodeValidation]
  // );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    listData,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
  };
};

export default usePoliciesCreateHook;
