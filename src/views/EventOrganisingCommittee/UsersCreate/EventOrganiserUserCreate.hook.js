import {useCallback, useEffect, useRef, useState} from "react";
import {
    isAlpha,
    isAlphaNum,
    isAlphaNumChars,
    isNum,
    isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import LogUtils from "../../../libs/LogUtils";
import {
    serviceCreateEventOrganiserUser,
    serviceGetEventOrganiserUserDetails,
    serviceUpdateEventOrganiserUser,
} from "../../../services/EventOrganiserUser.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {useParams} from "react-router";
import Constants from "../../../config/constants";
import {serviceGetList} from "../../../services/index.services";
import RouteName from "../../../routes/Route.name";

const initialForm = {
    name: "",
    description: "",
    image: "",
    company: "",
    designation: "",
    priority: "",
  user: null,
};

const useEventOrganiserUserCreate = ({location}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState("");
    const [form, setForm] = useState({...initialForm});
    const [isEdit, setIsEdit] = useState(false);
    const [isEnterManually, setIsEnterManually] = useState(false);
    const codeDebouncer = useDebounce(form?.code, 500);
    const {id} = useParams();
    const [listData, setListData] = useState({
        USERS: [],
    });

    useEffect(() => {
        if (id) {
            serviceGetEventOrganiserUserDetails({id: id}).then((res) => {
                if (!res.error) {
                    const data = res?.data?.details;
                    const fd = {};
                    Object.keys({...initialForm}).forEach((val) => {
                        fd[val] = data[val];
                    });
                    setForm({
                        ...form,
                        ...fd,
                        status: fd?.status === Constants.GENERAL_STATUS.ACTIVE,
                        image: "",
                    });
                    setImage(data?.image);
                } else {
                    SnackbarUtils.error(res?.message);
                    historyUtils.goBack();
                }
            });
        }
    }, [id]);

    useEffect(() => {
        serviceGetList(["USERS"]).then((res) => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);



    const checkFormValidation = useCallback(() => {
        const errors = {...errorData};
        let required = ["designation", "company", "description", "priority"];
        if (!id) {
            required.push('image')
        }
        if (isEnterManually) {
          required.push('name');
          delete errors['user'];
        } else {
          required.push('user');
          delete errors['name'];
        }
        required.forEach((val) => {
            if (
                !form?.[val] ||
                (Array.isArray(form?.[val]) && form?.[val].length === 0)
            ) {
                errors[val] = true;
            } else if (["code"].indexOf(val) < 0) {
                delete errors[val];
            }
        });
        Object.keys(errors).forEach((key) => {
            if (!errors[key]) {
                delete errors[key];
            }
        });
        return errors;
    }, [form, errorData, isEnterManually]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const fd = new FormData();
            Object.keys(form).forEach((key) => {
                if (["image", "status", "name"].indexOf(key) < 0 && form[key]) {
                    fd.append(key, form[key]);
                }
            });
            if (form?.image) {
                fd.append("image", form?.image);
            }
            if (id) {
                fd.append('id', id)
            }
            fd.append('organising_id', location?.state?.organising_id);
            if (isEnterManually) {
                fd.append('name', form?.name);
            } else {
                fd.append('name', form?.user?.name);
                fd.append('user_id', form?.user?.id);
            }
            let req = serviceCreateEventOrganiserUser;
            if (id) {
                req = serviceUpdateEventOrganiserUser;
            }
            req(fd).then((res) => {
                LogUtils.log("response", res);
                if (!res.error) {
                    historyUtils.goBack();
                } else {
                    SnackbarUtils.error(res.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, isSubmitting, setIsSubmitting, id, location, isEnterManually]);

    const handleSubmit = useCallback(async () => {
        const errors = checkFormValidation();
        if (Object.keys(errors).length > 0) {
            setErrorData(errors);
            return true;
        }
        submitToServer();
    }, [checkFormValidation, setErrorData, form]);

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
            const t = {...form};
            if (fieldName === "name") {
                if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
                    t[fieldName] = text;
                }
            } else if (fieldName === 'priority') {
                if (!text || (isNum(text))) {
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

    const onBlurHandler = useCallback(
        (type) => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        },
        [changeTextData]
    );

    const handleDelete = useCallback(() => {
    }, []);

    const handleReset = useCallback(() => {
        setForm({...initialForm});
    }, [form]);

    const handleManualClick = useCallback(() => {
      setIsEnterManually(e => !e);
    }, [setIsEnterManually]);

    return {
        form,
        changeTextData,
        onBlurHandler,
        removeError,
        handleSubmit,
        isLoading,
        isSubmitting,
        errorData,
        isEdit,
        handleDelete,
        handleReset,
        id,
        listData,
        image,
      handleManualClick,
      isEnterManually
    };
};

export default useEventOrganiserUserCreate;
