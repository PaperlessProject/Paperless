import ToolInterface from "../components/ToolInterface";
import Button from "../components/Button";
import { useState } from "react";
import { getAuthToken, start, uploadFiles } from "../pdf-utils/pdfFunctions";



export default function ToPDF() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void]
  
  // const handleClick = async() => {
  //   //make different logic for when isReady is true(download logic)
  //     const fetchData = async () => {
  //       try {
  //         const token = await getAuthToken(publicKey);
  //         console.log("Received token:", token);
  
  //         const startResult = await start("merge", token);
  //         console.log("Start result:", startResult);
  
  //         const serverUrl = startResult.server;
  //         const taskId = startResult.task;
  
  //         if (!file) {
  //           return "error";
  //         }
  
  //         const formData = new FormData();
  //         formData.append("file", file);
  
  //         const uploadResult = await uploadFiles(
  //           serverUrl,
  //           taskId,
  //           formData,
  //           token
  //         );
  
  //         console.log("Upload result:", uploadResult);
  //         setUploadResult({...uploadResult, name: file.name})
  
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };
  
  //     fetchData();
  //   }, [file]);

  // }
  
  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center">
        <ToolInterface fileState={{file, setFile}} heading="Convert to PDF"/>
 <Button onClick={handleClick} isReady={isReady}></Button>
      </div>
    </div>
  );
}
