"use server";

import { auth } from "@/auth";
import { mongo_client } from "@/lib/mongodb";
import { Redis_client } from "@/lib/redis";
import { PG_PRISMA_CLIENT } from "@repo/database";
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
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const user = await PG_PRISMA_CLIENT.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    await PG_PRISMA_CLIENT.idea.create({
      data: {
        // TODO: add logic to auto-increment the serial number
        serial_number: 1221,
        title: title,
        description: description,
        author_user_Id: user?.id as string,
        content: content,
      },
    });
    // TODO: use uder ID from the session variable
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
  const data = await PG_PRISMA_CLIENT.idea_vote_actions.findMany({
    where: {
      ideaId: ideaId,
      author_user_Id: author_user_id,
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
      await PG_PRISMA_CLIENT.$transaction(async (tx) => {
        await tx.idea_vote_actions.update({
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
      return PositiveResponce;
    } catch (error) {
      return NegativeResponce;
    }
  }
  try {
    await PG_PRISMA_CLIENT.$transaction(async (tx) => {
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
      await tx.idea_vote_actions.create({
        data: {
          author_user_Id: author_user_id,
          author_username: author_username,
          voteaction_type: "UPVOTE",
          ideaId: ideaId,
        },
      });
    });
    revalidatePath("/explore");
    // TODO: use uder ID from the session variable
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
  const data = await PG_PRISMA_CLIENT.idea_vote_actions.findMany({
    where: {
      ideaId: ideaId,
      author_user_Id: author_user_id,
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
      await PG_PRISMA_CLIENT.$transaction(async (tx) => {
        await tx.idea_vote_actions.update({
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
      return PositiveResponce;
    } catch (error) {
      return NegativeResponce;
    }
  }
  try {
    await PG_PRISMA_CLIENT.$transaction(async (tx) => {
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
      await tx.idea_vote_actions.create({
        data: {
          author_user_Id: author_user_id,
          author_username: author_username,
          voteaction_type: "DOWNVOTE",
          ideaId: ideaId,
        },
      });
    });
    revalidatePath("/explore");
    // TODO: use uder ID from the session variable
    return PositiveResponce;
  } catch (error) {
    return NegativeResponce;
  }
}

export async function FollowUser({
  toFollowUserId,
}: {
  toFollowUserId: String;
}) {
  const session = await auth();
  const ToFollowUserFollowingDataId = await PG_PRISMA_CLIENT.user.findUnique({
    where: {
      id: toFollowUserId as string,
    },
  });
  const CurrentUserFollowingDataId = await PG_PRISMA_CLIENT.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (
    !CurrentUserFollowingDataId?.following_data_id ||
    !CurrentUserFollowingDataId?.followers_data_id
  ) {
    mongo_client
      .db("follow_data")
      .createCollection(
        (CurrentUserFollowingDataId?.id + "followers") as string
      );
    mongo_client
      .db("follow_data")
      .createCollection(
        (CurrentUserFollowingDataId?.id + "following") as string
      );
    await PG_PRISMA_CLIENT.user.update({
      where: {
        id: CurrentUserFollowingDataId?.id as string,
      },
      data: {
        followers_data_id: (CurrentUserFollowingDataId?.id +
          "followers") as string,
        following_data_id: (CurrentUserFollowingDataId?.id +
          "following") as string,
      },
    });
  }

  const db = mongo_client.db("follow_data");
  const collection = db.collection(
    CurrentUserFollowingDataId?.id + "following"
  );
  const query = { email: session?.user?.email as string };
  const update = {
    $setOnInsert: {
      email: ToFollowUserFollowingDataId?.email,
      id: ToFollowUserFollowingDataId?.id,
    },
  };
  const options = { upsert: true };
  // TODO: update the follower data to whome this user followed
  const result = await collection.updateOne(query, update, options);
  return {
    success: true,
    message: "Followed",
  };
}

export async function Unfollow({
  toUnFollowUserId,
}: {
  toUnFollowUserId: String;
}) {
  const session = await auth();
  const ToFollowUserFollowingDataId = await PG_PRISMA_CLIENT.user.findUnique({
    where: {
      id: toUnFollowUserId as string,
    },
  });
  const CurrentUserFollowingDataId = await PG_PRISMA_CLIENT.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  mongo_client
    .db("follow_data")
    .collection(CurrentUserFollowingDataId?.id + "following")
    .deleteOne({ email: ToFollowUserFollowingDataId?.email });
}
