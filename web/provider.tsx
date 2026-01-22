"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";

function Provider({ children }: any) {
  const [userDetail, setUserDetail] = useState();
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
        {children}
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
