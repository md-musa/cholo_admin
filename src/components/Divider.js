import React from "react";

function Divider({title}) {
  return (
    <div className="flex w-full flex-col">
      <div className="divider">{title}</div>
    </div>
  );
}

export default Divider;
