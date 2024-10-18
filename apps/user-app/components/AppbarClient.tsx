"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppbarClient() {
  const { data: session, status } = useSession(); // Access session and status
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Track client-side mounting

  useEffect(() => {
    setIsMounted(true); // Ensure the component is mounted before rendering
  }, []);

  // Prevent rendering until mounted to avoid mismatch between server and client
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session?.user}
      />
    </div>
  );
}
