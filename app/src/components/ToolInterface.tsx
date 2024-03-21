interface fileState {
  file: File | null;
  setFile: (data: File) => void;
}

interface Props {
  heading: string;
  fileState: fileState;
}
export default function ToolInterface ({ heading, fileState }: Props)  {
  const { setFile } = fileState;
  return (
    <div className="flex items-center justify-center flex-col gap-10 ">
      <div className="flex">
        <h1 className="text-3xl font-bold  flex">{heading}</h1>
      </div>
      <div className="border border-gray-300 rounded-lg shadow-lg px-10 flex ">
        <form className="items-center flex h-52 w-fit flex-col justify-center ">
          <label>Select File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0]!)}
            id="fileInput"
            name="fileInput"
          />
        </form>
      </div>
    </div>
  );
};

