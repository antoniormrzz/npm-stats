import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <ArrowPathIcon className="h-10 w-10 animate-spin text-white" />
    </div>
  );
}