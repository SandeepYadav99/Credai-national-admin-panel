import React from "react";
import { serviceDetailsMemberChapter, serviceDetailsMemberList, serviceDetailsMemberUsers } from "../../../services/MemberList.service";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

function useMemberDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [allData, setAllData] = useState({});
  const [userData,setUserData]=useState([])
  const [otherData,setOtherData]=useState({})
  const [data, setData] = useState(null);
  const { id } = useParams();

  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);
  }, [isApprovalPopUp]);

  useEffect(() => {
    if (id) {
      Promise.allSettled([
        serviceDetailsMemberChapter({ member_id: id }),
        serviceDetailsMemberUsers({member_id:id}),
        serviceDetailsMemberList({id:id}),
      ]).then((promises) => {
        const memberData = promises[0]?.value?.data;
        const userData = promises[1]?.value?.data;
        const otherData = promises[2]?.value?.data;
        setAllData(memberData);
        setUserData(userData);
        setOtherData(otherData);
      });
    }
  }, [id]);

  return {
    data,
    id,
    isApprovalPopUp,
    toggleApprovalDialog,
    allData,
    userData,
    otherData
  };
}

export default useMemberDetail;
