/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import {
    isAlphaNumChars,
    isSpace,
} from "../../../../libs/RegexUtils";
import useDebounce from "../../../../hooks/DebounceHook";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import Constants from "../../../../config/constants";
import { serviceCreateEventSchedule,
    serviceGetEventScheduleDetails,
    serviceGetEventSchedule,
    serviceUpdateEventSchedule } from "../../../../services/EventSchedule.service";
import { serviceGetList } from "../../../../services/Common.service";
import LogUtils from "../../../../libs/LogUtils";
import {useParams} from "react-router";


const initialForm = {
    eve_name: "",
    eve_title: "",
    eve_description: "",
    start_time: "",
    end_time: "",
    speakers: [],
    status: true,
};

const useEventScheduleHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {

    const [isLoading] = useState(false);
    const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ ...initialForm });
    const [isEdit] = useState(false);
    const includeRef = useRef(null);
    const { id } = useParams();
    const [listData, setListData] = useState({
        SPEAKERS: []
    });

    useEffect(() => {
        serviceGetList(["SPEAKERS"],{event_id:id}).then((res) => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    useEffect(() => {
        if (empId) {
            serviceGetEventScheduleDetails({ id: empId }).then((res) => {
                if (!res.error) {
                    const data = res?.data?.details;
                    console.log(data)
                    setForm({
                        ...form,
                        // id:data._id,
                        eve_name: data?.eve_name,
                        effective_date: data.effective_date,
                        chapter_id: data.chapter_id,
                        // document: data.document,
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


    const checkFormValidation = useCallback(() => {
        const errors = { ...errorData };
        let required = [
            "eve_name",
            "eve_title",
            "eve_description",
            "start_time",
            "end_time",
            "speakers",
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
            let req;
            if (empId) {
                req = serviceUpdateEventSchedule
            } else {
                req = serviceCreateEventSchedule;
            }

            req({...form, speakers: form?.speakers?.map(val => val.id), event_id: id}).then((res) => {
                if (!res.error) {
                    handleToggleSidePannel();
                    window.location.reload();
                } else {
                    SnackbarUtils.error(res.message);
                }
                setIsSubmitting(false);
            });
        }

    }, [form, isSubmitting, setIsSubmitting, empId, id]);


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


    const onBlurHandler = useCallback(
        (type) => {
            if (form?.[type]) {
                changeTextData(form?.[type].trim(), type);
            }
        },
        //checkCodeValidation as dependescy
        [changeTextData]
    );

    const handleDelete = useCallback(() => { }, []);

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

export default useEventScheduleHook;
