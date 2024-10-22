import { ModeToggle } from "@/components/theme-toggle";
// import { PG_PRISMA_CLIENT, MONGO_PRISMA_CLIENT } from "@repo/database"; // Example of importing Prisma clients
export default async function Home() {
  return (
    <div>
      HomePage
      <ModeToggle />
    </div>
  );
}
