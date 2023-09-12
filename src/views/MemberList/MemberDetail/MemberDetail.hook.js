import React from "react";
import { serviceDetailsMemberChapter } from "../../../services/MemberList.service";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useParams} from "react-router";

function useMemberDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [allData, setAllData] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();

  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);

  // useEffect(() => {
  //   let dataValues = serviceLocationDepartments({ location_id: id });
  //   dataValues
  //     .then((data) => {
  //       setAllData(data?.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  const initData = useCallback(() => {
    if (id && !isSubmitting) {
      setIsSubmitting(true);
      const req = serviceDetailsMemberChapter({ member_id: id });
      req.then((res) => {
        if (!res.error) {
          const data = res?.data;
          setAllData(data);
        }
        setIsSubmitting(false);
      });
    }
  }, [id, isSubmitting, setIsSubmitting]);

  useEffect(() => {
    initData();
  }, [id]);


  return {
    data,
    id,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
  };
}

export default useMemberDetail;
