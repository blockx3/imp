"use client";

import { useRouter } from "next/navigation";

function UserIdeas({ ideas_to_show }: { ideas_to_show: string }) {
  const router = useRouter();
  return (
    <>
      <div
        className={`${
          ideas_to_show === "myideas" || ideas_to_show == ""
            ? "bg-neutral-700"
            : "bg-neutral-800"
        }  rounded-full px-2 py-1 hover:bg-neutral-700 cursor-pointer`}
        onClick={() => router.push("/user?ideas_to_show=myideas")}
      >
        My-Ideas
      </div>
      <div
        className={`${
          ideas_to_show === "upvoted" || ideas_to_show == ""
            ? "bg-neutral-700"
            : "bg-neutral-800"
        }  rounded-full px-2 py-1 hover:bg-neutral-700 cursor-pointer`}
        onClick={() => router.push("/user?ideas_to_show=upvoted")}
      >
        Up-Voted
      </div>
      <div
        className={`${
          ideas_to_show === "downvoted" || ideas_to_show == ""
            ? "bg-neutral-700"
            : "bg-neutral-800"
        }  rounded-full px-2 py-1 hover:bg-neutral-700 cursor-pointer`}
        onClick={() => router.push("/user?ideas_to_show=downvoted")}
      >
        Down-Voted
      </div>
    </>
  );
}

export default UserIdeas;
