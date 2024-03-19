import Button from "../components/Button";
import ToolInterface from "../components/ToolInterface";
import { useState } from "react";

export default function FromPDF() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void];

  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center">
        <ToolInterface
          fileState={{ file, setFile }}
          heading="Convert from PDF"
        />
        <Button
          tool="pdfjpg"
          isReady={isReady}
          file={file}
          setIsReady={setIsReady}
        />
      </div>
    </div>
  );
}
