import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 p-2 sm:p-4">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case text-info">twootr</a>
      </div>
      <div className="flex-none gap-4 sm:gap-8">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input-info input w-44 sm:w-56 md:w-96"
          />
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
