import ReactDOM from "react-dom/client";
import { EmployeeProvider, ReactQueryProvider } from "~providers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ruLocale from "dayjs/locale/ru";
import "./index.css";
import { App } from "./App";

dayjs.extend(relativeTime);

dayjs.locale(ruLocale);
dayjs.locale("ru");

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <ReactQueryProvider>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </ReactQueryProvider>,
);
