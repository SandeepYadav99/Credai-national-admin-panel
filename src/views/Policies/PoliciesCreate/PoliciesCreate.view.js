import React, { useMemo } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import { isAlpha } from "../../../libs/RegexUtils";
// import useAdminCreate from "./AdminCreateHook";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Field } from "redux-form";
import { renderCountryContact } from "../../../libs/redux-material.utils";
import CustomCountryFC, {
  CountryContactFC,
} from "../../../components/CountryFC/CustomCountryFC";
import usePoliciesCreateHook from "./PoliciesCreateHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const PoliciesCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    listData,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    id,
    showPasswordCurrent,
    setShowPasswordCurrent,
  } = usePoliciesCreateHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();
 
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Policy Title"}
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
          <CustomDatePicker
            clearable
            label={"Date"}
            // maxDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "effective_date");
            }}
            value={form?.createdAtText}
            isError={errorData?.effective_date}
          />
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.chapter_id}
            errorText={errorData?.chapter_id}
            label={"Associate Chapter"}
            value={form?.chapter_id}
            handleChange={(value) => {
              changeTextData(value, "chapter_id");
            }}
          >
            {listData?.CHAPTERS?.map((dT) => {
                  return (
                    <MenuItem value={dT?.id} key={dT?.id}>
                      {dT?.name}
                    </MenuItem>
                  );
                })}
          </CustomSelectField>
        </div>

      </div>
      <div className={"formFlex"}>
      <div className={"formGroup"}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="od1"
              label="Development.pdy"
              accept={"application/pdf,application/msword,image/*"}
              error={errorData?.document}
              value={form?.document}
              placeholder={"Development.pdy"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "document");
                }
              }}
            />
            {/* <div className={styles.inst}><InfoOutlinedIcon/>Recommended Size for banner image is 1600x900 px</div> */}
          </div>
      </div>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Status</div>
        </h4>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={`Active`}
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
            "Add"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default PoliciesCreateView;
