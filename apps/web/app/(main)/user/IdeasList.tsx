import { Redis_client } from "@/lib/redis";
import { idea, UserIdeaType } from "@/lib/types";
import { PG_PRISMA_CLIENT } from "@repo/database";
import PostElement from "../explore/components/PostElement";

async function IdeasList({
  userId,
  Ideas_type,
}: {
  userId: string;
  Ideas_type: UserIdeaType;
}) {
  if (!["myideas", "upvoted", "downvoted"].includes(Ideas_type)) {
    return (
      <div className="text-3xl p-4">
        Invalid Idea Type. Please use myideas, upvoted or downvoted
      </div>
    );
  }
  let ideas: idea[] = [];
  const Rres = await Redis_client.lRange(
    "user:" + userId + ":ideas:" + Ideas_type,
    0,
    -1
  );
  Rres.map((d) => {
    ideas.push(JSON.parse(d));
  });
  if (ideas.length === 0) {
    console.log("fetching from database");
    switch (Ideas_type) {
      case "myideas":
        ideas = await PG_PRISMA_CLIENT.idea.findMany({
          where: {
            author_user_Id: userId,
          },
        });
        break;
      case "upvoted":
        {
          const res = await PG_PRISMA_CLIENT.idea_vote_actions.findMany({
            where: {
              author_user_Id: userId,
              voteaction_type: "UPVOTE",
            },
          });
          for (let i = 0; i < res.length; i++) {
            const idea = await PG_PRISMA_CLIENT.idea.findUnique({
              where: {
                id: res[i]?.ideaId as string,
              },
            });
            ideas.push(idea!);
          }
        }
        break;
      case "downvoted":
        {
          const res = await PG_PRISMA_CLIENT.idea_vote_actions.findMany({
            where: {
              author_user_Id: userId,
              voteaction_type: "DOWNVOTE",
            },
          });
          for (let i = 0; i < res.length; i++) {
            const idea = await PG_PRISMA_CLIENT.idea.findUnique({
              where: {
                id: res[i]?.ideaId as string,
              },
            });
            ideas.push(idea!);
          }
        }
        break;
      default:
        break;
    }
    // The redis lpush is not awaited because the request already awaited for getting data from database and
    // if we await on writing to redis too , it will cause the response to be a lot slow
    ideas.map((idea) => {
      Redis_client.lPush(
        "user:" + userId + ":ideas:" + Ideas_type,
        JSON.stringify(idea)
      );
    });
  }
  return (
    <div className="">
      {ideas.length === 0 && (
        <div className="text-3xl p-4">No Ideas to show</div>
      )}
      {ideas.map((idea) => {
        return <PostElement key={idea.id} idea={idea} />;
      })}
    </div>
  );
}

export default IdeasList;
