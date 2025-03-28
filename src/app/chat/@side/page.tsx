"use server";

import { screen } from "@/screens/candidates-new";

export default async function Page() {
  return <>{screen.render({ candidateId: "123" })}</>;
}
