import { PrismaClient } from "@prisma/pg_client";
const prisma = new PrismaClient();
async function main() {
  await prisma.idea.createMany({
    data: [
      {
        title: "Idea 1",
        description: "This is idea 1",
        author_user_Id: "1",
        author_username: "user1",
        content: "# This is the content of idea 1",
        serial_number: 1,
      },
      {
        title: "Idea 2",
        description: "This is idea 2",
        author_user_Id: "1",
        author_username: "user1",
        content: "# This is the content of idea 2",
        serial_number: 2,
      },
      {
        title: "Idea 3",
        description: "This is idea 3",
        author_user_Id: "2",
        author_username: "user2",
        content: "# This is the content of idea 3",
        serial_number: 3,
      },
      {
        title: "Idea 4",
        description: "This is idea 4",
        author_user_Id: "2",
        author_username: "user2",
        content: "# This is the content of idea 4",
        serial_number: 4,
      },
      {
        title: "Idea 5",
        description: "This is idea 5",
        author_user_Id: "3",
        author_username: "user3",
        content: "# This is the content of idea 5",
        serial_number: 5,
      },
      {
        title: "Idea 6",
        description: "This is idea 6",
        author_user_Id: "3",
        author_username: "user3",
        content: "# This is the content of idea 6",
        serial_number: 6,
      },
      {
        title: "Idea 7",
        description: "This is idea 7",
        author_user_Id: "4",
        author_username: "user4",
        content: "# This is the content of idea 7",
        serial_number: 7,
      },
      {
        title: "Idea 8",
        description: "This is idea 8",
        author_user_Id: "4",
        author_username: "user4",
        content: "# This is the content of idea 8",
        serial_number: 8,
      },
      {
        title: "Idea 9",
        description: "This is idea 9",
        author_user_Id: "5",
        author_username: "user5",
        content: "# This is the content of idea 9",
        serial_number: 9,
      },
      {
        title: "Idea 10",
        description: "This is idea 10",
        author_user_Id: "5",
        author_username: "user5",
        content: "# This is the content of idea 10",
        serial_number: 10,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
