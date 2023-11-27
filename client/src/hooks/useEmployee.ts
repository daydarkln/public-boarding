import { useContext } from "react";

// providers
import { EmployeeContext } from "~providers";

const useEmployee = () => useContext(EmployeeContext);

export default useEmployee;
