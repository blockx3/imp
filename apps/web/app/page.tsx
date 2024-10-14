import { Button } from "@repo/ui";
import { PG_PRISMA_CLIENT, MONGO_PRISMA_CLIENT } from "@repo/database";
export default async function Home() {
  const user = await PG_PRISMA_CLIENT.user.findFirst();
  const data = await MONGO_PRISMA_CLIENT.idea.findFirst();
  return (
    <div>
      <div className="text-red-500">Hello world!!</div>
      <div>{user?.id}</div>
      <div>{data?.id}</div>
      <Button>Button</Button>
    </div>
  );
}
