import React, { useEffect, useState } from "react";

type Props = {
  type: "string" | "boolean" | "number" | "color" | "select";
  options?: string[];
  onChange: (value: unknown) => void;
  value: string | number | boolean | string[] | undefined;
};

const OptionComponent: React.FC<Props> = ({
  type,
  options,
  value,
  onChange,
}) => {
  if (type === "string") {
    return <input type="string" onChange={(v) => onChange} value={value} />;
  } else if (type === "number") {
    return <input type="number" />;
  } else if (type === "color") {
    return <input type="color" />;
  } else if (type === "select") {
    return (
      <select>
        {options?.map((op) => (
          <option key={op} value={op}></option>
        ))}
      </select>
    );
  } else if (type === "boolean") {
    return <input type="checkbox" />;
  } else {
    return null;
  }
};

export default OptionComponent;
