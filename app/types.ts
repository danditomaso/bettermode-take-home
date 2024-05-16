import { ComponentPropsWithoutRef, ElementType } from "react";

// taken from: https://www.christianvm.dev/blog/react-as-prop and extended as required
// export type PolymorphicProps<E extends ElementType> = PropsWithChildren<
//   ComponentPropsWithoutRef<E> & {
//     as?: E;
//   }
// >;

export type BaseComponentProps = {
  className?: string;
};

// what should this type be called?

export type ElementComponentProps<TItem extends ElementType> =
  ComponentPropsWithoutRef<TItem> & {
    className?: string;
  };
