import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Account/Login";
import Register from "../components/Account/Register";
import Home from "../components/Home";
import ChooseSpace from "../components/SpaceSelection/ChooseSpace";
import ChooseRoom from "../components/SpaceSelection/ChooseRoom";
import Welcome from "../components/AfterLogin/Welcome";
import MyVault from "../components/AfterLogin/MyVault";
import TilesAdmin from "../components/Admin/TilesAdmin";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../components/Navbar";
import NewNavbar from "../components/AfterLogin/NewNavbar";
import PlanksAdmin from "../components/Admin/PlanksAdmin";
import RugsAdmin from "../components/Admin/RugsAdmin";
import UsersAdmin from "../components/Admin/UsersAdmin";
import VaultVisualizar from "../components/AfterLogin/VaultVisualizer";
import GeneratePDF from "../components/AfterLogin/GeneratePDF";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  const { isAuth, loginUser } = useContext(AuthContext);

  const wrapNavbar = (item) => {
    return (
      <>
        {!isAuth ? <Navbar /> : <NewNavbar />}
        {item}
      </>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={wrapNavbar(<Home />)} />
        <Route path="/login" element={wrapNavbar(<Login />)} />
        <Route path="/register" element={wrapNavbar(<Register />)} />
        <Route path="/choosespace" element={wrapNavbar(<ChooseSpace />)} />
        <Route path="/chooseroom" element={wrapNavbar(<ChooseRoom />)} />
        <Route path="/visualizer" element={wrapNavbar(<Welcome />)} />
        <Route
          path="/myvault"
          element={wrapNavbar(
            <PrivateRoute>
              <MyVault />
            </PrivateRoute>
          )}
        />
        <Route
          path="/vaultVisualizer/:id"
          element={wrapNavbar(
            <PrivateRoute>
              <VaultVisualizar />
            </PrivateRoute>
          )}
        />
        <Route path="/admin-tiles" element={<TilesAdmin />} />
        <Route path="/admin-planks" element={<PlanksAdmin />} />
        <Route path="/admin-rugs" element={<RugsAdmin />} />
        <Route path="/admin-users" element={<UsersAdmin />} />
        <Route path="/generate-pdf" element={<GeneratePDF />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
