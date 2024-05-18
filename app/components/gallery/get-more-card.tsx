import Arrow from "../icons/arrow";
import { ElementComponentProps } from "~/types";
import { Link } from "@remix-run/react";

type GetMoreCardProps = ElementComponentProps<"button"> & {
  href: string;
  text: string;
};

function GetMoreCard({ href, text = "Show More", ...props }: GetMoreCardProps) {
  return (
    <Link to={href}>
      <article
        className="relative w-full bg-card rounded-lg h-96 flex flex-col place-content-center place-items-center gap-4"
        {...props}
      >
        <div className="absolute inset-0 bg-black opacity-10" />
        <button
          type="button"
          className="text-white bg-black hover:bg-black focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
        >
          <Arrow className="size-8" />
          <span className="sr-only">Show more</span>
        </button>
        {text}
      </article>
    </Link>
  );
}

export default GetMoreCard;
