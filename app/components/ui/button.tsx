import { ComponentPropsWithoutRef, ReactNode } from "react";
import { BaseComponentProps } from "~/types";
import { cn } from "~/utils/style";

const sizeMap = {
  small: "px-3 py-2",
  base: "px-5 py-2.5",
  large: "px-5 py-3",
};

type ButtonProps = BaseComponentProps &
  ComponentPropsWithoutRef<"button"> & {
    size: keyof typeof sizeMap;
    type: "submit" | "button";
    children: ReactNode;
    icon?: ReactNode;
  };

function Button({
  size = "base",
  type = "button",
  children,
  className,
  icon,
  ...props
}: ButtonProps) {
  const baseBtnStyle =
    "text-center rounded-lg focus:outline-none focus:ring-2 flex gap-2 text-black bg-white hover:text-white \
    hover:bg-[#000] border border-black focus:ring-black rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

  return (
    <>
      <button
        type={type}
        {...props}
        className={cn(sizeMap[size], baseBtnStyle, className)}
      >
        {icon}
        {children}
      </button>
    </>
  );
}
export default Button;
