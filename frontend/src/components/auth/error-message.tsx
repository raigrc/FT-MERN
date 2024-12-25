import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <>
      <div className="my-2 flex items-center space-x-2 rounded p-1 text-sm text-red-800">
        <TriangleAlert />
        <p className="w-full">{message}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
