// import { ElementType, ReactNode } from "react";
// import { PolymorphicProps } from "~/types";
// import { cn } from "~/lib/style";

// type ContentContainerProps<TItem extends ElementType> =
//   PolymorphicProps<TItem> & {
//     as: TItem;
//     children: ReactNode;
//     className?: string;
//   };

// export function ContentContainer<TItem extends ElementType = "div">({
//   as,
//   children,
//   className,
//   ...props
// }: ContentContainerProps<TItem>) {
//   const Component = as || ("div" as ElementType);
//   return (
//     <Component
//       className={cn(className, "flex flex-col container place-content-center")}
//       {...props}
//     >
//       {children}
//     </Component>
//   );
// }

// export default ContentContainer;
