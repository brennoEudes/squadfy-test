import React, { ReactNode, MouseEvent } from "react";
import Image from "next/image";

export default function Button({
  onClick,
  children,
  className = "",
  textColor = "text-primary",
  bgColor = "bg-white",
  icon = null,
  iconAlt = "",
  ...props
}: {
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  children: ReactNode;
  className?: string;
  textColor?: string;
  bgColor?: string;
  icon?: string | null;
  iconAlt?: string;
  [key: string]: any;
}) {
  return (
    <button
      className={`py-4 flex gap-2 ${className} ${textColor} ${bgColor}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <div className="flex items-center">
          <Image
            src={icon}
            alt={iconAlt}
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      )}
      {children}
    </button>
  );
}
