import ToolInterface from "../components/ToolInterface";
import Button from "../components/Button";
import { useState } from "react";

export default function ToPDF() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void];

  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center">
        <ToolInterface fileState={{ file, setFile }} heading="Convert to PDF" />
        <Button
          tool="imagepdf"
          isReady={isReady}
          file={file}
          setIsReady={setIsReady}
        ></Button>
      </div>
    </div>
  );
}
