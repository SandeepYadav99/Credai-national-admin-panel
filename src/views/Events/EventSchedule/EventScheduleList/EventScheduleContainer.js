import React, { useCallback, useMemo } from "react";
import { IconButton, ButtonBase } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Add, Link} from "@material-ui/icons";
import PageBox from "../../../../components/PageBox/PageBox.component";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import styles from "./Style.module.css";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import FilterComponent from "../../../../components/Filter/Filter.component";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../../components/Status/StatusPill.component";
import EventScheduleView from "../EventScheduleCreate/EventSchedule.view";
import useEventScheduleList from "./EventScheduleList.hook";


const EventScheduleContainer = ({ }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewUpdate,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    warehouses,
    handleToggleSidePannel,
  } = useEventScheduleList({});
  // console.log(editData, "Edit Data")
  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.policyList);


  const UpperInfo = useCallback((obj) => {

    if (obj) {
      return (
        <div className={styles.InfoWrap}>
          <div>{editData === undefined ? "Add New Schedule" : "Edit Schedule"} </div>
          <div className={styles.newLine}></div>
        </div>
      );
    }
    return null;

  }, [editData]);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "NAME",
        sortable: true,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "description",
        label: "DESCRIPTION",
        sortable: false,
        render: (value, all) => <div>{all?.createdAtText}</div>,
      },

      {
        key: "date",
        label: "DATE",
        sortable: true,
        render: (temp, all) => <div>{all?.chapter?.name}</div>,
      },
      {
        key: "start time",
        label: "START TIME",
        sortable: false,
        render: (temp, all) => <div>{all.updatedAtText}</div>,
      },
      {
        key: "end time",
        label: "END TIME",
        sortable: false,
        render: (temp, all) => <div>{all.updatedAtText}</div>,
      },
      {
        key: "status",
        label: "STATUS",
        sortable: true,
        render: (temp, all) => <div>{<StatusPill status={all.status} />}</div>,
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
                // handleViewUpdate(all);
              }}
            >
              <Link fontSize={"small"} />
              <small>Make Live</small>
            </IconButton>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                handleToggleSidePannel(all);
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
            <span className={styles.title}>Event Schedule</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase
              onClick={handleToggleSidePannel}
              className={"createBtn"}
            >
              Add SCHEDULE
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
          <EventScheduleView
            handleToggleSidePannel={handleToggleSidePannel}
            isSidePanel={isSidePanel}

            empId={editData}
          />
        </SidePanelComponent>
      </PageBox>
    </div>
  );
};

export default EventScheduleContainer;
