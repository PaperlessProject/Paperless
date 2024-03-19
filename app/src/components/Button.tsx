interface Props {
  isReady: boolean;

  onClick: () => void;
}

export default function Button({ isReady, onClick }: Props) {
  return (
    <button onClick={onClick} className="border-2 flex  px-5 py-1 bg-red-500 rounded-lg hover:red-600 focus:outline-none items-center justify-center text-white transform transition-transform duration-300 hover:scale-105 text-lg shadow-md mt-5">
      {isReady ? "Download" : "Upload"}
    </button>
  );
}
