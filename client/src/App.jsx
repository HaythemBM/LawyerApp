import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";

import AuthReg from "./pages/user/AuthReg";
import AuthLog from "./pages/user/AuthLog";

import GetClients from "./pages/clientPages/GetClients";
import New from "./pages/clientPages/New";
import Edit from "./pages/clientPages/Edit";
import Bill from "./pages/clientPages/Bill";

import GetCases from "./pages/dossier/GetCases";
import NewFolder from "./pages/dossier/NewFolder";
import EditFolder from "./pages/dossier/EditFolder";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/users/register" element={<AuthReg />}></Route>
        <Route path="/users/login" element={<AuthLog />}></Route>

        <Route path="/clients" element={<GetClients />}></Route>
        <Route path="/clients/new" element={<New />}></Route>
        <Route path="/clients/edit/:id" element={<Edit />}></Route>
        <Route path="/clients/bill/:id" element={<Bill />}></Route>

        <Route path="/dossiers/:id" element={<GetCases />}></Route>
        <Route path="/dossiers/:id/new" element={<NewFolder />}></Route>
        <Route path="/dossiers/:id/edit/:idd" element={<EditFolder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
