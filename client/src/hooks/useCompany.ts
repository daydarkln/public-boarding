import { useContext } from "react";

// providers
import { CompanyContext } from "~providers";

const useCompany = () => useContext(CompanyContext);

export default useCompany;
