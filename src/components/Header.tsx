import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="navbar fixed max-w-2xl bg-base-100 p-2 sm:p-4">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case text-info">
          twootr
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input w-40 sm:w-56 md:w-72"
          />
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};
