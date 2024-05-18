import { ReactNode } from "react";
import { BaseComponentProps } from "~/types";
import { cn } from "~/utils/style";

type NavProps<TItem> = BaseComponentProps & {
  links: TItem[];
  // eslint-disable-next-line no-unused-vars
  renderItem: (link: TItem) => ReactNode;
};

function Nav<TItem>({ links, renderItem, className }: NavProps<TItem>) {
  // if no links were passed to the component, return null
  if (links.length < 1) {
    return null;
  }

  // invert control of rendering to the call site to allow for unlimited customization
  return (
    <nav>
      <ul className={cn(className, "flex gap-4")}>
        {links?.map((item) => renderItem(item))}
      </ul>
    </nav>
  );
}
export default Nav;
