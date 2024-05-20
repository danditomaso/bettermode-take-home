import { siteSettings } from "~/config/siteSettings";
import { Nav, Text } from "..";
import { Link, NavLink } from "@remix-run/react";

function Header() {
  // adding padding and negative margin to increase the hit area of the links
  return (
    <div className="z-10 flex place-items-center place-content-center w-full px-5 py-3 bg-white  border-gray-200 border-b-8 h-32">
      <div className="container flex items-center place-content-between place-items-center w-full pe-4">
        <Link
          to="/"
          className="flex items-center place-content-center place-items-center p-3 -m-3"
        >
          <Text variant="h1">{siteSettings.siteName}</Text>
        </Link>
        <Nav
          links={siteSettings.links}
          renderItem={(link) => {
            return (
              <NavLink
                to={link?.url}
                key={link?.label}
                className={({ isActive, isPending }) =>
                  isPending ? "" : isActive ? "font-bold" : ""
                }
              >
                <Text variant="p" className="capitalize text-gray-600 p-3 -m-3">
                  {link.label}
                </Text>
              </NavLink>
            );
          }}
        />
      </div>
    </div>
  );
}
export default Header;
