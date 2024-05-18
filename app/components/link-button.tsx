import { Link } from "@remix-run/react";
import { testIDs } from "~/tests/testIDs";
import { ElementComponentProps } from "~/types";
import Button from "./ui/button";

type ReadMoreButtonProps = ElementComponentProps<"button"> & {
  href: string;
  text: string;
};

function LinkButton({
  href,
  text = "Read More",
  className,
  ...props
}: ReadMoreButtonProps) {
  return (
    <Link to={href}>
      <Button
        {...props}
        type={"button"}
        variant={"default"}
        size={"base"}
        className={className}
        data-testid={testIDs.galleryCard.gotoPostButton}
      >
        {text}
      </Button>
    </Link>
  );
}
export default LinkButton;
