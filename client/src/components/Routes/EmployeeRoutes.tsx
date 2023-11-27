import "reactflow/dist/style.css";
import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  UsefulMaterials,
  Skills,
  UseFullMaterialsById,
  MyOnboarding,
  Login,
} from "~employee";
import React from "react";

const EmployeeRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Login />} path={"/login"} />
      <Route element={<Dashboard />} path={"/employee"} />
      <Route element={<UsefulMaterials />} path={"/useful-materials"} />
      <Route
        element={<UseFullMaterialsById />}
        path={"/useful-materials/:id"}
      />
      <Route element={<Skills />} path={"/skills"} />
      <Route element={<MyOnboarding />} path={"/my-onboarding"} />
    </Routes>
  );
};

export default EmployeeRoutes;
