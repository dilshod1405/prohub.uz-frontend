import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectAdminProps {
    children: ReactNode;
    is_staff: boolean;
}

const ProtectAdmin: React.FC<ProtectAdminProps> = ({ children, is_staff }) => {
  const token = localStorage.getItem("access");
  const isStaff = localStorage.getItem("is_staff");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (is_staff.toString() === isStaff) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }     
  
};

export default ProtectAdmin;
