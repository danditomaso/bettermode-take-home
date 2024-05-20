import type { ReactNode, ElementType } from "react";
import type { ElementComponentProps } from "~/types";
import { cn } from "~/lib/style";

const variantMap = {
  h1: "font-extrabold text-4xl uppercase tracking-wide pointer-events-none",
  h2: "text-6xl font-extrabold tracking-wide text-black",
  h3: "text-1xl font-medium tracking-wide",
  p: "text-md tracking-wide",
  span: "text-md",
};

type VariantMapType = keyof typeof variantMap;

type TextProps<T extends VariantMapType> = ElementComponentProps<T> & {
  variant: T;
  children: ReactNode;
};

function Text<T extends VariantMapType>({
  variant,
  className = "",
  children,
  ...props
}: TextProps<T>) {
  const baseStyles = "font-sans tracking-wide text-black";
  const Component = variant as ElementType;

  return (
    <Component
      className={cn(baseStyles, variantMap[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Text;
