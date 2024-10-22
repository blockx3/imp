"use server";

// Authentication is disabled for now
// import { auth } from "@/auth";

/*

IMPORTANT: 
This file contains Nextjs Actions function 
which exposes POST endpoint in the APP
any exported async function is a POST endpoint
so while writing any more action function remember 
to check auth() before executing any action

This is the function to check auth()
write it at very first lines of function starting

const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

*/
import { MONGO_PRISMA_CLIENT } from "@repo/database";

export async function CreateIdeaPost({ content }: { content: string }) {
  // TODO: Enable protection
  //   const session = await auth();
  //   if (!session) {
  //     return {
  //       success: false,
  //       message: "Unauthorized",
  //     };
  //   }
  try {
    await MONGO_PRISMA_CLIENT.idea.create({
      data: {
        // TODO: add logic to auto-increment the serial number
        serial_number: 1221,
        title: "",
        description: "",
        author_username: "",
        author_user_Id: "",
        content: content,
      },
    });
    return {
      success: true,
      message: "Idea Created",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed",
    };
  }
}
