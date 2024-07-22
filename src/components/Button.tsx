import React from "react";
import Image from "next/image";

export default function Button({
  onClick,
  children,
  type = "button",
  disabled = false,
  className = "",
  textColor = "text-primary",
  bgColor = "bg-white",
  icon = null,
  iconAlt = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`py-4 ${className} ${textColor} ${bgColor}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Image src={icon} alt={iconAlt} className="mr-2 w-6 h-6" />}
      {children}
    </button>
  );
}
