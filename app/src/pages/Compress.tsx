import { useState } from "react";
import Button from "../components/Button";
import ToolInterface from "../components/ToolInterface";

export default function Compress() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [file, setFile] = useState<File>() as [File, () => void]
  const handleClick = async() => {
    //make different logic for when isReady is true(download logic)

  }
  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center">
        <ToolInterface fileState={{file, setFile}} heading="Compress" />
        <Button onClick={handleClick}  isReady={isReady}/>
      </div>
    </div>
  );
}
