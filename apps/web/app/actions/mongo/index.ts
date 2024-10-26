"use server";

import { Redis_client } from "@/lib/redis";
import { $Enums, MONGO_PRISMA_CLIENT } from "@repo/database";
import { revalidatePath } from "next/cache";

// TODO: Make the Redis_client.del() function to delete specific idea key from redis cache

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
export async function CreateIdeaPost({
  title,
  description,
  content,
}: {
  content: string;
  title: string;
  description: string;
}) {
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
        title: title,
        description: description,
        author_username: "1",
        author_user_Id: "",
        content: content,
      },
    });
    // TODO: use uder ID from the session variable
    await Redis_client.del("user:" + "1" + ":ideas:" + "myideas");
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

export async function UpvoteIdeaPost({
  ideaId,
  author_user_id,
  author_username,
}: {
  ideaId: string;
  author_user_id: string;
  author_username: string;
}) {
  const PositiveResponce = {
    success: true,
    message: "upvoted",
  };
  const NegativeResponce = {
    success: false,
    message: "upvote failed",
  };
  const data = await MONGO_PRISMA_CLIENT.voteaction.findMany({
    where: {
      ideaId: ideaId,
      author_user_Id: author_user_id,
      POST_TYPE: "COMMON_POST",
    },
  });
  const isAlreadyUpvoted =
    data.filter((d) => d.voteaction_type === "UPVOTE").length == 1;
  if (isAlreadyUpvoted) {
    return {
      success: false,
      message: "Already upvoted",
    };
  }
  const toCheck = data.filter((d) => d.voteaction_type === "DOWNVOTE");
  const isAlreadyDownvoted = toCheck.length == 1;
  if (isAlreadyDownvoted) {
    try {
      await MONGO_PRISMA_CLIENT.$transaction(async (tx) => {
        await tx.voteaction.update({
          where: {
            id: toCheck[0]?.id as string,
          },
          data: {
            voteaction_type: "UPVOTE",
          },
        });
        await tx.idea.update({
          where: {
            id: ideaId,
          },
          data: {
            upvotes_count: {
              increment: 1,
            },
            downvotes_count: {
              decrement: 1,
            },
          },
        });
      });
      revalidatePath("/explore");
      // TODO: use uder ID from the session variable
      await Redis_client.del("user:" + "1" + ":ideas:" + "upvoted");
      await Redis_client.del("user:" + "1" + ":ideas:" + "downvoted");
      return PositiveResponce;
    } catch (error) {
      return NegativeResponce;
    }
  }
  try {
    await MONGO_PRISMA_CLIENT.$transaction(async (tx) => {
      await tx.idea.update({
        where: {
          id: ideaId,
        },
        data: {
          upvotes_count: {
            increment: 1,
          },
        },
      });
      await tx.voteaction.create({
        data: {
          author_user_Id: author_user_id,
          author_username: author_username,
          POST_TYPE: "COMMON_POST",
          voteaction_type: "UPVOTE",
          ideaId: ideaId,
        },
      });
    });
    revalidatePath("/explore");
    // TODO: use uder ID from the session variable
    await Redis_client.del("user:" + "1" + ":ideas:" + "upvoted");
    await Redis_client.del("user:" + "1" + ":ideas:" + "downvoted");
    return PositiveResponce;
  } catch (error) {
    return NegativeResponce;
  }
}

export async function DownvoteIdeaPost({
  ideaId,
  author_user_id,
  author_username,
}: {
  ideaId: string;
  author_user_id: string;
  author_username: string;
}) {
  const PositiveResponce = {
    success: true,
    message: "down-voted",
  };
  const NegativeResponce = {
    success: false,
    message: "down-vote failed",
  };
  const data = await MONGO_PRISMA_CLIENT.voteaction.findMany({
    where: {
      ideaId: ideaId,
      author_user_Id: author_user_id,
      POST_TYPE: "COMMON_POST",
    },
  });
  const isAlreadyDownvoted =
    data.filter((d) => d.voteaction_type === "DOWNVOTE").length == 1;
  if (isAlreadyDownvoted) {
    return {
      success: false,
      message: "Already down-voted",
    };
  }
  const toCheck = data.filter((d) => d.voteaction_type === "UPVOTE");
  const isAlreadyUpvoted = toCheck.length == 1;
  if (isAlreadyUpvoted) {
    try {
      await MONGO_PRISMA_CLIENT.$transaction(async (tx) => {
        await tx.voteaction.update({
          where: {
            id: toCheck[0]?.id as string,
          },
          data: {
            voteaction_type: "DOWNVOTE",
          },
        });
        await tx.idea.update({
          where: {
            id: ideaId,
          },
          data: {
            upvotes_count: {
              decrement: 1,
            },
            downvotes_count: {
              increment: 1,
            },
          },
        });
      });
      revalidatePath("/explore");
      // TODO: use uder ID from the session variable
      await Redis_client.del("user:" + "1" + ":ideas:" + "downvoted");
      await Redis_client.del("user:" + "1" + ":ideas:" + "upvoted");
      return PositiveResponce;
    } catch (error) {
      return NegativeResponce;
    }
  }
  try {
    await MONGO_PRISMA_CLIENT.$transaction(async (tx) => {
      await tx.idea.update({
        where: {
          id: ideaId,
        },
        data: {
          downvotes_count: {
            increment: 1,
          },
        },
      });
      await tx.voteaction.create({
        data: {
          author_user_Id: author_user_id,
          author_username: author_username,
          POST_TYPE: "COMMON_POST",
          voteaction_type: "DOWNVOTE",
          ideaId: ideaId,
        },
      });
    });
    revalidatePath("/explore");
    // TODO: use uder ID from the session variable
    await Redis_client.del("user:" + "1" + ":ideas:" + "downvoted");
    await Redis_client.del("user:" + "1" + ":ideas:" + "upvoted");
    return PositiveResponce;
  } catch (error) {
    return NegativeResponce;
  }
}
