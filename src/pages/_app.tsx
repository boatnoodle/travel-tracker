import "@/styles/globals.css";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppType } from "next/app";
import { Kanit } from "next/font/google";

import { api } from "@/utils/api";

// If loading a variable font, you don't need to specify the font weight
const kanit = Kanit({
  weight: "400",
  subsets: ["thai"],
  variable: "--font-kanit",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${kanit.style.fontFamily};
        }
      `}</style>
      <div className={kanit.variable}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default (api as any).withTRPC(MyApp);
