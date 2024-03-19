import { useState } from "react";
import Button from "../components/Button";
import ToolInterface from "../components/ToolInterface";

export default function Compress() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void];

  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center">
        <ToolInterface fileState={{ file, setFile }} heading="Compress" />
        <Button
          file={file}
          isReady={isReady}
          tool="compress"
          setIsReady={setIsReady}
        />
      </div>
    </div>
  );
}
