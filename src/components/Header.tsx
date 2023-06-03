import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="navbar fixed z-50 overflow-hidden bg-base-100 p-2 sm:p-4 md:w-[41rem] md:max-w-2xl 2xl:w-[47rem] 2xl:max-w-3xl">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case text-info">
          twootr
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-md font-semibold text-neutral-content">
            Welcome!
          </h2>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
