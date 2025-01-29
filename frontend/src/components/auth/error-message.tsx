import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <>
      <div className="flex items-center p-1 my-2 space-x-2 text-sm text-red-800 rounded">
        <TriangleAlert />
        <p className="w-full">{message}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
