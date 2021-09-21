import { RefreshCcw } from "react-feather";

export default function Loader() {
  return (
    <div className="h-screen w-full flex-row flex items-center justify-center">
      <p className="text-3xl text-blue-500">Loading</p>
      <RefreshCcw className="text-3xl text-blue-500" />
    </div>
  );
}
