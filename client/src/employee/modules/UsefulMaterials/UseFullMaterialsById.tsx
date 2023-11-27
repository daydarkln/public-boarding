import { Page } from "~components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUploadFilesById } from "~api";
import axios from "axios";
import mammoth from "mammoth";
import { Button } from "antd";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileId = location.pathname.split("/")[2];

  const [html, setHtmlOutput] = useState("");

  const { data: currentFile } = useQuery({
    queryFn: () => fetchUploadFilesById(fileId),
    queryKey: ["filesById"],
  });

  const { mutateAsync, data: file } = useMutation({
    mutationFn: async (url: string) => {
      return await axios.get(`http://localhost:1337${url}`, {
        responseType: "blob",
      });
    },
  });

  const convertToHtml = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const arrayBuffer = reader.result as ArrayBuffer;

      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          setHtmlOutput(result.value);
        })
        .catch(() => {});
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (currentFile?.data) mutateAsync(currentFile?.data?.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile?.data?.url]);

  useEffect(() => {
    if (file) convertToHtml(file?.data);
  }, [file]);

  return (
    <Page type={"employee"}>
      <Button
        type={"primary"}
        className={"ml-auto flex"}
        onClick={async () => {
          await setHtmlOutput("");
          navigate("/useful-materials");
        }}
      >
        Законичить изучение
      </Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};
