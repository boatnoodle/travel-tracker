import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  /* ---------------------------------- Hooks --------------------------------- */

  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    console.log(status);
    if (status !== "loading" && !session) {
      // Handle unauthenticated state, e.g. render a SignIn component
      router.push("/");
    }
  }, [session]);
  return (
    <>
      <main>{children}</main>
    </>
  );
};
