import { getToken } from "@/actions/user";
import Authform from "@/components/configurations/Authform";
import { medievalSharp } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

async function layout({ children }: Props) {
  const token = await getToken();

  if (!token) {
    return <Authform />;
  }

  return (
    <div>
      <div
        className={cn("flex items-center p-6 gap-1", medievalSharp.className)}
      >
        <Link href={"/"} className="text-xl">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-primary/80">Configurations</span>
      </div>

      <main>{children}</main>
    </div>
  );
}

export default layout;
