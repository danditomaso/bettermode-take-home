import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import React from "react";
import { Header } from "./components";
import { UrqlProvider } from "./utils/urql/urql";
import { client } from "./utils/urql/client";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="items-center flex flex-col">
      <Header />
      <div className="flex flex-col container place-content-center">
        <UrqlProvider value={client}>
          <Outlet />
        </UrqlProvider>
      </div>
    </div>
  );
}
