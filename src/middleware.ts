import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

/* This config is used to stop the middleware from running on static files */
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
