import React from "react";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton } from "@material-ui/core";
import useMemberDetail from "./MemberDetail.hook";
import { useMemo } from "react";
import Constants from "../../../config/constants";
import DataTables from "../../../Datatables/Datatable.table";
import UpperMemberInfo from "./component/UpperMemberInfo/UpperMemberInfo";

function MemberDetail() {
  const {
    data,
    id,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
  } = useMemberDetail({});
  const CityData={}
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>
            {console.log("all", all)}
            {all?.name}
          </div>
        ),
      },
      {
        key: "email",
        label: "email",
        sortable: false,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "no",
        label: "phone number",
        sortable: false,
        render: (value, all) => <div></div>,
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: allData,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    allData,
  ]);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>City Association list</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperMemberInfo data={CityData} />
      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Associated Users</div>
          <div className={styles.btnCont}>
            <ButtonBase
              onClick={toggleApprovalDialog}
              type={"button"}
              className={styles.createBtn}
            >
              ADD USER
            </ButtonBase>
          </div>
        </div>
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;
