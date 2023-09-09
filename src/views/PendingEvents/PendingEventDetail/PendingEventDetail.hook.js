import React, { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { serviceGetPendingEventListDetails } from "../../../services/PendingEventList.service";

function usePendingEventDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetPendingEventListDetails({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  const toggleStatusDialog = useCallback(() => {
    setApproveDialog((e) => !e);
  }, [approveDialog]);
  const toggleRejectDialog = useCallback(() => {
    setRejectDialog((e) => !e);
  }, [rejectDialog]);

  return {
    id,
    employeeDetail,
    toggleStatusDialog,
    approveDialog,

    toggleRejectDialog,
    rejectDialog,
  };
}

export default usePendingEventDetail;
