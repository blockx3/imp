import { MONGO_PRISMA_CLIENT } from "@repo/database";
import PostElement from "./PostElement";
async function Explore_PostList() {
  const posts = await MONGO_PRISMA_CLIENT.idea.findMany();
  return (
    <>
      {posts.map((data) => {
        return <PostElement key={data.id} content={data.content} />;
      })}
    </>
  );
}

export default Explore_PostList;
