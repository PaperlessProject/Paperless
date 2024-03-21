import ClipLoader from "react-spinners/ClipLoader";

import useProcess from "../hooks/useProcess";

interface Props {
  isReady: boolean;
  file: File | null;
  tool: string;
  setIsReady: (bool: boolean) => void;
}

export default function Button({ isReady, tool, file, setIsReady }: Props) {
  const { showButton, handleUpload, handleDownload } = useProcess({
    tool,
    file,
    setIsReady,
  });

  return (
    <>
      {showButton && (
        <button
          onClick={isReady ? handleDownload : handleUpload}
          className="border-2 flex  px-5 py-1 bg-red-500 rounded-lg hover:red-600 focus:outline-none items-center justify-center text-white transform transition-transform duration-300 hover:scale-105 text-lg shadow-md mt-5">
          {isReady ? "Download" : "Upload"}
        </button>
      )}
      {!showButton && (
        <ClipLoader color="red" cssOverride={{ margin: "20px" }} />
      )}
    </>
  );
}
