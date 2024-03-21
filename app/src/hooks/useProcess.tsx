import { useState } from "react";

import {
  getAuthToken,
  process,
  start,
  download,
  uploadFiles,
} from "../pdf-utils/pdfFunctions";
import { publicKey } from "../../keys";
import JSZip from "jszip";
export type Tool = string;
interface Props {
  tool: Tool;
  file: File | null;

  setIsReady: (bool: boolean) => void;
}
export default function useProcess({ tool, file, setIsReady }: Props) {
  const [uploadRes, setUploadRes] = useState<
    { server_filename: string; filename: string }[]
  >([]);

  const [task, setTask] = useState<string>("");
  const [server, setServer] = useState<string>("");

  const [showButton, setShowButton] = useState<boolean>(true);

  const handleUpload = async () => {
    try {
      setShowButton(false);
      const token = await getAuthToken(publicKey);
      if (!file) {
        return "error";
      }

      const { server, task } = await start(tool, token);
      setServer(server);
      setTask(task);
      const formData = new FormData();
      formData.append("file", file);

      const upload = await uploadFiles(server, task, formData, token);
      const newUploadRes = [
        ...uploadRes,
        { server_filename: upload.server_filename, filename: file.name },
      ];
      setUploadRes(newUploadRes);
      const processRes = await process(server, task, tool, newUploadRes, token);

      if (processRes) setIsReady(true);

      setShowButton(true);

      if (processRes) setIsReady(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    try {
      setShowButton(false);
      const token = await getAuthToken(publicKey);
      const blob = await download(server, task, token);

      if (blob) {
        setIsReady(false);

        let newBlob;
        if (blob.type === "application/zip") {
          const zip = new JSZip();
          const zipData = await zip.loadAsync(blob);
          const fileName = Object.keys(zipData.files)[0];
          const fileData = await zipData.file(fileName)!.async("blob");
          newBlob = new Blob([fileData], { type: "image/jpg" });
        } else {
          newBlob = blob;
        }

        const link = document.createElement("a");
        const url = URL.createObjectURL(newBlob);
        link.href = url;
        link.download = `${file!.name.split(".").slice(0, -1).join(".")}.${
          tool === "pdfjpg" ? "jpg" : "pdf"
        }`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setShowButton(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { showButton, handleUpload, handleDownload };
}
