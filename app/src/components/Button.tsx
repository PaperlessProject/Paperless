import {
  getAuthToken,
  start,
  uploadFiles,
  process,
  download,
} from "../pdf-utils/pdfFunctions";
import publicKey from "../../keys";
import { useState, CSSProperties } from "react";
import JSZip from "jszip";
import ClipLoader from "react-spinners/ClipLoader";

import { Dispatch, SetStateAction } from "react";

interface Props {
  isReady: boolean;
  file: File;
  tool: string;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}

export default function Button({ isReady, tool, file, setIsReady }: Props) {
  const [uploadRes, setUploadRes] = useState<
    { server_filename: string; filename: string }[]
  >([]);
  const [task, setTask] = useState<string>("");
  const [server, setServer] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);

  const handleClick = async () => {
    try {
      setIsUploading(true);
      setShowButton(false);
      const token = await getAuthToken(publicKey);

      if (!isReady) {
        if (!file) {
          return "error";
        }
        setIsUploading(true);
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
        const processRes = await process(
          server,
          task,
          tool,
          newUploadRes,
          token
        );

        if (processRes) setIsReady(true);
        setIsUploading(false);
        setShowButton(true);

        if (processRes) setIsReady(true);
      } else {
        const blob = await download(server, task, token);
        setIsUploading(false);
        setShowButton(true);
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
          link.download = `${file.name.split(".").slice(0, -1).join(".")}.${
            tool === "pdfjpg" ? "jpg" : "pdf"
          }`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const override: CSSProperties = {
    margin: "20px",
  };
  return (
    <>
      {showButton && (
        <button
          onClick={handleClick}
          className="border-2 flex  px-5 py-1 bg-red-500 rounded-lg hover:red-600 focus:outline-none items-center justify-center text-white transform transition-transform duration-300 hover:scale-105 text-lg shadow-md mt-5"
        >
          {isReady ? "Download" : "Upload"}
        </button>
      )}
      {isUploading && <ClipLoader color="#36d7b7" cssOverride={override} />}
    </>
  );
}
