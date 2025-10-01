import { MdDirectionsBus } from "react-icons/md";

export function Header() {
  return (
    <h2 className="text-2xl text-center font-bold mb-6 flex items-center gap-2">
      <MdDirectionsBus className="text-blue-500" /> View Schedule
    </h2>
  );
}