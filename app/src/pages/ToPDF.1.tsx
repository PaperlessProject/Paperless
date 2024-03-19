import { useState } from "react";
import { getAuthToken } from "../pdf-utils/pdfFunctions";

export default function ToPDF() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void];

  const handleClick = async () => {
      //make different logic for when isReady is true(download logic)
      const fetchData = async () => {
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
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    },
    [file];
}
