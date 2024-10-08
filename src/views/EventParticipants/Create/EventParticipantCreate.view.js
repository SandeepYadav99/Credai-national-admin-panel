import React, { useMemo } from "react";
import {
  ButtonBase,
  CircularProgress,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useEventParticipantCreate from "./EventParticipantCreateHook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../libs/LogUtils";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventParticipantCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    id,
    showPasswordCurrent,
    setShowPasswordCurrent,
      listData
  } = useEventParticipantCreate({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();
  return (
    <div className={styles.departmentWrap}>
        <div className="formFlex">
            <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.contact}
                    errorText={errorData?.contact}
                    label={"Contact"}
                    value={form?.contact}
                    onTextChange={(text) => {
                        changeTextData(text, "contact");
                    }}
                    onBlur={() => {
                        onBlurHandler("contact");
                    }}
                />
            </div>
        </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
            <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Full Name"}
                value={form?.name}
                onTextChange={(text) => {
                    changeTextData(text, "name");
                }}
                onBlur={() => {
                    onBlurHandler("name");
                }}
            />

        </div>
      </div>
      <div className={"formFlex"}>

        <div className={"formGroup"}>
            <CustomTextField
                isError={errorData?.title}
                errorText={errorData?.title}
                label={"Title/Designation"}
                value={form?.title}
                onTextChange={(text) => {
                    changeTextData(text, "title");
                }}
                onBlur={() => {
                    onBlurHandler("title");
                }}
            />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.email}
            errorText={errorData?.email}
            label={"Email"}
            value={form?.email}
            onTextChange={(text) => {
              changeTextData(text, "email");
            }}
            onBlur={() => {
              onBlurHandler("email");
            }}
          />
        </div>
      </div>

        <div className={"formFlex"}>
            <div className={"formGroup"}>
                <CustomAutoComplete
                    disabled={form?.user_id && form?.is_auto}
                    autoCompleteProps={{
                        freeSolo: true,
                        getOptionLabel: (option) => option?.name || "",
                    }}
                    dataset={listData?.MEMBERS ? listData?.MEMBERS : []}
                    datasetKey={"name"}
                    onTextChange={(text, value) => {
                        if (typeof text === "string") {
                            changeTextData({name: text}, "member");
                        } else {
                            changeTextData(text, "member");
                        }
                    }}
                    variant={"outlined"}
                    label={"Member"}
                    name={"member"}
                    isError={errorData?.member}
                    value={form?.member}
                />
            </div>
        </div>
        <div className={"formFlex"}>
            <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.reg_id}
                    errorText={errorData?.reg_id}
                    label={"Reg Id"}
                    value={form?.reg_id}
                    onTextChange={(text) => {
                        changeTextData(text, "reg_id");
                    }}
                    onBlur={() => {
                        onBlurHandler("reg_id");
                    }}
                />
            </div>
        </div>

        <div className={"formFlex"}>
            <div className={"formGroup"}>
                <CustomSwitch
                    value={form?.status}
                    handleChange={() => {
                        changeTextData(!form?.status, "status");
                    }}
                    label={`Set default password for new mobile user`}
                />
            </div>
        </div>
      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : empId ? (
            "Update"
          ) : (
            "Create"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventParticipantCreateView;
