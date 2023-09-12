import React from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

import useAddUserDialogHook from "./AddUserDialog.hook";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddUserDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useAddUserDialogHook({ isOpen, handleToggle, candidateId });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Add User</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                label={"Phone Number"}
                value={form?.contact}
                onTextChange={(text) => {
                  changeTextData(text, "contact");
                }}
                onBlur={() => {
                  onBlurHandler("contact");
                }}
              />
            </div>{" "}
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
            </div>{" "}
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
            </div>{" "}
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
            <div className={"formGroup"}>
              <CustomCheckbox
                className={styles.checkbo}
                color={"primary"}
                handleChange={(text) => {
                  changeTextData(!form?.is_send_sms, "is_send_sms");
                }}
                label={"Send Invite on SMS"}
                checked={form?.is_send_sms}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Submit
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddUserDialog;
