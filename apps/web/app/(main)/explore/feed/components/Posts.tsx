import { PG_PRISMA_CLIENT } from "@repo/database";
import PostElement from "./PostElement";
import { mongo_client } from "@/lib/mongodb";
async function Explore_PostList() {
  const posts = await PG_PRISMA_CLIENT.idea.findMany();
  return (
    <>
      {posts.map(async (idea_data) => {
        const comment = await mongo_client
          .db("comment")
          .collection("comment")
          .find(
            { post_id: idea_data.id },
            { projection: { post_id: 1, comment: 1, _id: 0 } }
          )
          .toArray();
        console.log(comment);
        return (
          <PostElement key={idea_data.id} idea={idea_data} comments={comment} />
        );
      })}
    </>
  );
}

export default Explore_PostList;
