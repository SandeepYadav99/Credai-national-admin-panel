import React, { Component, useCallback, useEffect, useMemo } from "react";
import { IconButton, MenuItem, ButtonBase } from "@material-ui/core";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { Add, InfoOutlined, PrintOutlined } from "@material-ui/icons";
import PageBox from "../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import useEventOrganiserUserList from "./EventOrganiserUserHook";
// import EventOrganiserUserCreateView from "../Create/EventOrganiserUserCreate.view";

const EventOrganiserUserList = ({}) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    warehouses,
    handleToggleSidePannel,
  } = useEventOrganiserUserList({});

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.eventOrganiserUser);

  const UpperInfo = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>Add Event Organising Committee</div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;
  }, []);

  const EditInfo = useCallback((obj) => {
    if (obj) {
      return (
          <div className={styles.InfoWrap}>
            <div>Edit Event Organiser</div>
            <div className={styles.newLine}></div>
          </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: true,
        render: (value, all) => <div>{all?.designation}</div>,
      },

      {
        key: "company",
        label: "COMPANY",
        sortable: true,
        render: (temp, all) => <div>{all?.company}</div>,
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: true,
        render: (temp, all) => <div>{all?.description}</div>,
      },
      {
        key: "priority",
        label: "PRIORITY",
        sortable: true,
        render: (temp, all) => <div>{all?.priority}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleEdit(all);
              }}
            >
              <Edit fontSize={"small"} />
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
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Elected Council Users</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleCreate}
              className={"createBtn"}
            >
              Create
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
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
          title={<UpperInfo />}
          open={isSidePanel}
          side={"right"}
        >
          {/*<EventOrganiserUserCreateView*/}
          {/*  handleToggleSidePannel={handleToggleSidePannel}*/}
          {/*  isSidePanel={isSidePanel}*/}
          {/*  data={editData}*/}
          {/*/>*/}
        </SidePanelComponent>

      </PageBox>
    </div>
  );
};

export default EventOrganiserUserList;
