import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import File from "../../../components/FileComponent/FileComponent.component";

import useStateFedCreate from "./EventOrganiserUserCreate.hook";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import useEventOrganiserUserCreate from "./EventOrganiserUserCreate.hook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const EventOrganiserUserCreate = ({location}) => {
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
    listData,
    image,
    handleManualClick,
      isEnterManually
  } = useEventOrganiserUserCreate({location});

  const classes = useStyles();

  const UserField = useMemo(() => {
    if (isEnterManually) {
      return (
          <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Username"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
          />
      )
    }
    return (
        <CustomAutoComplete
            disabled={form?.user_id && form?.is_auto}
            autoCompleteProps={{
              freeSolo: false,
              getOptionLabel: (option) => option?.label || "",
            }}
            dataset={listData?.USERS ? listData?.USERS : []}
            datasetKey={"label"}
            onTextChange={(text, value) => {
              if (typeof text === "string") {
                changeTextData({name: text}, "user");
              } else {
                changeTextData(text, "user");
              }
            }}
            variant={"outlined"}
            label={"User"}
            name={"user"}
            isError={errorData?.user}
            value={form?.user}
        />
    )
  }, [isEnterManually, form, changeTextData, listData, errorData]);

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "Add"} Organising User</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>State Details</div>
          </h4>
        </div>
        <div className={styles.cont}>
          <div>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={5 * 1024 * 1024}
              type={["png", "jpeg", "jpg"]}
              fullWidth={true}
              name="document"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.image}
              value={form?.image}
              default_image={image ? image : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                {UserField}
                <div>
                  <button className={styles.manuallyText} onClick={handleManualClick}>
                    {isEnterManually ? 'Search By Name' : 'Enter User Manually'}
                  </button>
                </div>
              </div>
            </div>

            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.designation}
                    errorText={errorData?.designation}
                    label={"Designation"}
                    value={form?.designation}
                    onTextChange={(text) => {
                      changeTextData(text, "designation");
                    }}
                    onBlur={() => {
                      onBlurHandler("designation");
                    }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.company}
                    errorText={errorData?.company}
                    label={"Company"}
                    value={form?.company}
                    onTextChange={(text) => {
                      changeTextData(text, "company");
                    }}
                    onBlur={() => {
                      onBlurHandler("company");
                    }}
                />
              </div>
            </div>

            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.description}
                    errorText={errorData?.description}
                    label={"Description"}
                    value={form?.description}
                    onTextChange={(text) => {
                      changeTextData(text, "description");
                    }}
                    onBlur={() => {
                      onBlurHandler("description");
                    }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                    isError={errorData?.priority}
                    errorText={errorData?.priority}
                    label={"Priority"}
                    value={form?.priority}
                    onTextChange={(text) => {
                      changeTextData(text, "priority");
                    }}
                    onBlur={() => {
                      onBlurHandler("priority");
                    }}
                />
              </div>
            </div>
          </div>

        </div>
        <div className={styles.btnCont}>
          <ButtonBase
              disabled={isSubmitting}
              type={"button"}
              onClick={handleSubmit}
              className={styles.createBtn}
          >
            Add
          </ButtonBase>
        </div>
      </div>

    </div>
  );
};

export default EventOrganiserUserCreate;
