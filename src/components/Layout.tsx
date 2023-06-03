import React, { type PropsWithChildren } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main
        data-theme="night"
        className="grid min-h-screen place-content-center place-items-center bg-base-100"
      >
        <div className="min-h-screen w-screen max-w-2xl md:border-x-2 md:border-info 2xl:max-w-3xl">
          {children}
        </div>
      </main>
    </>
  );
};
