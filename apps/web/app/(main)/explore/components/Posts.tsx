import { PG_PRISMA_CLIENT } from "@repo/database";
import PostElement from "./PostElement";
async function Explore_PostList() {
  const posts = await PG_PRISMA_CLIENT.idea.findMany();
  return (
    <>
      {posts.map((idea_data) => {
        return <PostElement key={idea_data.id} idea={idea_data} />;
      })}
    </>
  );
}

export default Explore_PostList;
