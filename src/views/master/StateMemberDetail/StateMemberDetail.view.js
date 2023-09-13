import React from "react";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton } from "@material-ui/core";
import FilterComponent from "../../../components/Filter/Filter.component";
import DataTables from "../../../Datatables/Datatable.table";
import PageBox from "../../../components/PageBox/PageBox.component";
import useStateMemberDetail from "./StateMemberDetail.hook";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import StatusPill from "../../../components/Status/StatusPill.component";
import { Add, InfoOutlined } from "@material-ui/icons";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import Constants from "../../../config/constants";
import UpperInfo from "../CityAssocList/component/UpperInfo/UpperInfo";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import { useCallback } from "react";
import StateMemCreate from "./StateMemCreate/StateMemCreate.view";

function StateMemberDetail() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    configFilter,
    warehouses,
    handleCreateFed,
    handleViewUpdate,
    CityData,
    handleToggleSidePannel,
    isSidePanel,
  } = useStateMemberDetail({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.state_member_list);

  const UpperInfoTitle = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Member Users</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "user",
        label: "MEMBER USER",
        sortable: true,
        render: (value, all) => <div>{all.code}</div>,
      },
      {
        key: "id",
        label: "MEMBER COMPANY/ MEMBERSHIP ID",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "contact",
        label: "PHONE NUMBER",
        sortable: true,
        render: (value, all) => <div>{all.code}</div>,
      },
      {
        key: "email",
        label: "EMAIL",
        sortable: true,
        render: (value, all) => <div>{all.code}</div>,
      },

      {
        key: "user_id",
        label: "Action",
        style: { width: "15%" },
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleViewUpdate(all);
              }}
            >
              <InfoOutlined fontSize={"small"} />
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              // onClick={() => {
              //   handleViewUpdate(all);
              // }}
            >
              <PeopleOutlineOutlinedIcon fontSize={"small"} />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: data,
      count: allData.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>State Member List</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
        <ButtonBase className={"createBtn"} onClick={handleToggleSidePannel}>
          ADD USER
          <Add fontSize={"small"} className={"plusIcon"}></Add>
        </ButtonBase>
      </div>
      <UpperInfo data={CityData} />
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Member List</span>
            <div className={styles.newLine2} />
          </div>
        </div>

        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
        <SidePanelComponent
          handleToggle={handleToggleSidePannel}
          title={<UpperInfoTitle />}
          open={isSidePanel}
          side={"right"}
        >
          <StateMemCreate
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}
            empId={editData}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
}

export default StateMemberDetail;
