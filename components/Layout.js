import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-full min-w-full bg-black ">
      <Nav />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
