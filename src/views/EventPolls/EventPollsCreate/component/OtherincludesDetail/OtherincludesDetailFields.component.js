import React, { useMemo } from "react";
import { ButtonBase, TextField } from "@material-ui/core";
import styles from "./style.module.css";
import { useEffect } from "react";
const OtherincludesDetailFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;

      changeData(index, { [name]: value });
    }
  };
  return (
    <div className={styles.commentContainer}>
      <TextField
        error={errors?.option}
        onChange={handleChange}
        value={data?.option}
        fullWidth={true}
        name={"option"}
        margin={"dense"}
        variant={"outlined"}
        label={`Option ${index + 1}`}
      />
      <div className={styles.firstRow221}>
        <div className={"textCenter"}>
          <ButtonBase
            className={styles.removeBtn}
            onClick={() => {
              handlePress(index == 0 ? "-" : "-", index);
            }}
          >
            {index == 0 ? "Remove" : "Remove"}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default OtherincludesDetailFields;
