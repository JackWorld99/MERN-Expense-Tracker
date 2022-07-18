import React from "react";

export default function Label() {
  return <></>;
}

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <div className="lables flex justify-between">
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded py-3" style={{ background: data.color ?? "#f9c74f" }}></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
