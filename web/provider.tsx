"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";
import { SettingContext } from "./context/SettingContext";
import { RefreshDataContext } from "./context/RefreshDataContext";

function Provider({ children }: any) {
  const [userDetail, setUserDetail] = useState();
  const [settingDetail, setSettingDetail] = useState();
  const [refreshData, setRefreshData] = useState();
  const CreateNewUser = async () => {
    const result = await axios.post("/api/user", {});
    setUserDetail(result?.data);
  };

  useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <SettingContext.Provider value={{ settingDetail, setSettingDetail }}>
          <RefreshDataContext.Provider
            value={{ refreshData, setRefreshData }}
          >
            {children}
          </RefreshDataContext.Provider>
        </SettingContext.Provider>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
