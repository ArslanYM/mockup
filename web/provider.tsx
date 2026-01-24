"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";
import { SettingContext } from "./context/SettingContext";

function Provider({ children }: any) {
  const [userDetail, setUserDetail] = useState();
  const [settingDetail, setSettingDetail] = useState();
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
          {" "}
          {children}
        </SettingContext.Provider>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
