import SingleManage from "./page/SingleManage";
import UserManage from "./page/UserManage";
import ReportManage from "./page/ReportManage";
import SetofManage from "./page/SetofManage";
import CreateSingle from "./page/CreateSingle";
import EditUser from "./page/EditUser";
import EditReport from "./page/EditReport";
import EditSingleMassge from "./page/EditSingleMassage";
import CreateSet from "./page/CreateSet";
import EditSet from "./page/EditSet";
import SignIn from "./page/SignIn";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "./api/auth";

import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const idTokenResult = localStorage.getItem("token");
    if (idTokenResult) {
      getUserData(idTokenResult).then((response) => {
        dispatch({
          type: "SIGNIN",
          payload: {
            userData: response.data,
            token: idTokenResult,
          },
        });
      });
    }
  });

  return (
    <Routes>
      <Route path="/singlemanage" element={<SingleManage />}></Route>
      <Route path="/usermanage" element={<UserManage />}></Route>
      <Route path="/reportmanage" element={<ReportManage />}></Route>
      <Route path="/setofmanage" element={<SetofManage />}></Route>
      <Route path="/createsingle" element={<CreateSingle />}></Route>
      <Route path="/edituser/:id" element={<EditUser />}></Route>
      <Route path="/editreport/:id" element={<EditReport />}></Route>
      <Route
        path="/editsinglemassage/:id"
        element={<EditSingleMassge />}
      ></Route>
      <Route path="/createset" element={<CreateSet />}></Route>
      <Route path="/editset/:id" element={<EditSet />}></Route>
      <Route path="/" element={<SignIn />}></Route>
      {/* <Route path="/" element={<Navigate to="/signin" replace />} /> */}
    </Routes>
  );
}

export default App;
