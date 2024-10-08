import React from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";

import historyUtils from "../../../libs/history.utils";
import useSpeakerCreateHook from "./SpeakerCreate_hook";

function EventSpeakerCreateView({ location }) {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    descriptionRef,
    image,
  } = useSpeakerCreateHook({ location });

  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />
            <span className={"capitalize"}>
              <b>Add Speaker</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Speaker Details</div>
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
              error={errorData?.s_image }
              value={form?.s_image}
              default_image={image ? image : null}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "s_image");
                }
              }}
            />
          </div>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_name}
                  errorText={errorData?.s_name}
                  label={"Name"}
                  value={form?.s_name}
                  onTextChange={(text) => {
                    changeTextData(text, "s_name");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_name");
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_designation}
                  errorText={errorData?.s_designation}
                  label={"DESIGNATION"}
                  value={form?.s_designation}
                  onTextChange={(text) => {
                    changeTextData(text, "s_designation");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_designation");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.s_company}
                  errorText={errorData?.s_company}
                  label={"COMPANY"}
                  value={form?.s_company}
                  onTextChange={(text) => {
                    changeTextData(text, "s_company");
                  }}
                  onBlur={() => {
                    onBlurHandler("s_company");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={""}>
          <div className={"headerFlex"}>
            {/* <h4 className={""}>
              <div className={"heading"}>DESCRIPTION</div>
            </h4> */}
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.s_description}
              errorText={errorData?.s_description}
              label={"DESCRIPTION"}
              value={form?.s_description}
              onTextChange={(text) => {
                changeTextData(text, "s_description");
              }}
              onBlur={() => {
                onBlurHandler("s_description");
              }}
            />
          </div>
        </div>
      </div>
      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
        </div>

        <div className={styles.btnWrappepr}>
          <ButtonBase
            disabled={isSubmitting ? true : false}
            type={"button"}
            className={styles.createBtn}
            onClick={() => handleSubmit("PENDING")}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "ADD"
            )}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default EventSpeakerCreateView;
