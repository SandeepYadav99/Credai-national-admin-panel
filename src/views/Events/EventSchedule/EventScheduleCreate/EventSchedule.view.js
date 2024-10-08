import React from "react";
import {
  ButtonBase,
  CircularProgress,
  MenuItem,
  TextField,
} from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import CustomDateTimePicker from "../../../../components/FormFields/DatePicker/CustomDateTimePicker";
import File from "../../../../components/FileComponent/FileComponent.component";
import useEventScheduleHook from "./EventSchedule.hook";
import CustomTimePicker from "../../../../components/FormFields/DatePicker/CustomTimePicker";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import { Autocomplete } from "@material-ui/lab";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../../libs/LogUtils";


const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventScheduleView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    listData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
  } = useEventScheduleHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.eve_name}
            errorText={errorData?.eve_name}
            label={"Name"}
            value={form?.eve_name}
            onTextChange={(text) => {
              changeTextData(text, "eve_name");
            }}
            onBlur={() => {
              onBlurHandler("eve_name");
            }}
          />
        </div>
      </div>
        <div className={"formFlex"}>
            <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.eve_title}
                    errorText={errorData?.eve_title}
                    label={"Title"}
                    value={form?.eve_title}
                    onTextChange={(text) => {
                        changeTextData(text, "eve_title");
                    }}
                    onBlur={() => {
                        onBlurHandler("eve_title");
                    }}
                />
            </div>
        </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.eve_description}
            errorText={errorData?.eve_description}
            label={"Event Description"}
            value={form?.eve_description}
            onTextChange={(text) => {
              changeTextData(text, "eve_description");
            }}
            onBlur={() => {
              onBlurHandler("eve_description");
            }}
            multiline
            rows={3}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
            <CustomDateTimePicker
                clearable
                label={"Start Time"}
                onChange={(date) => {
                    changeTextData(date, "start_time");
                }}
                value={form?.start_time}
                isError={errorData?.start_time}
            />
          {/*<CustomDatePicker*/}
          {/*  clearable*/}
          {/*  label={"Date"}*/}
          {/*  // maxDate={new Date()}*/}
          {/*  onChange={(date) => {*/}
          {/*    changeTextData(date, "effective_date");*/}
          {/*  }}*/}
          {/*  value={form?.effective_date}*/}
          {/*  isError={errorData?.effective_date}*/}
          {/*/>*/}
        </div>
          <div className={"formGroup"}>
              <CustomDateTimePicker
                  clearable
                  label={"End Time"}
                  onChange={(date) => {
                      changeTextData(date, "end_time");
                  }}
                  value={form?.end_time}
                  isError={errorData?.end_time}
              />
          </div>
      </div>

      <div className={"formFlex"}>
          <div className={"formGroup"}>
              <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(e, value) => {
                      changeTextData(value, "speakers");
                  }}
                  value={form?.speakers}
                  // id="tags-standard"
                  options={listData?.SPEAKERS ? listData?.SPEAKERS : []}
                  getOptionLabel={(option) => option.label}
                  defaultValue={form?.speakers}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          variant="outlined"
                          label="Speakers"
                          error={errorData?.speakers}
                      />
                  )}
              />
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
            "Save"
          ) : (
            "Add"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default EventScheduleView;
