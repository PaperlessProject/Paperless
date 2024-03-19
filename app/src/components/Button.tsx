import { getAuthToken, start, uploadFiles } from "../pdf-utils/pdfFunctions";
import publicKey from "../../keys";
import { useState } from "react";

import { Dispatch, SetStateAction } from "react";

interface Props {
  isReady: boolean;
  file: File;
  tool: string;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}

export default function Button({ isReady, tool, file, setIsReady }: Props) {
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleClick = async () => {
    //make different logic for when isReady is true(download logic)
    try {
      const token = await getAuthToken(publicKey);
      console.log("Received token:", token);

      const startResult = await start("merge", token);
      console.log("Start result:", startResult);

      const serverUrl = startResult.server;
      const taskId = startResult.task;

      if (!file) {
        return "error";
      }

      const formData = new FormData();
      formData.append("file", file);

      const uploadResult = await uploadFiles(
        serverUrl,
        taskId,
        formData,
        token
      );

      console.log("Upload result:", uploadResult);
      setUploadResult({ ...uploadResult, name: file.name });
      setIsReady(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="border-2 flex  px-5 py-1 bg-red-500 rounded-lg hover:red-600 focus:outline-none items-center justify-center text-white transform transition-transform duration-300 hover:scale-105 text-lg shadow-md mt-5"
    >
      {isReady ? "Download" : "Upload"}
    </button>
  );
}
