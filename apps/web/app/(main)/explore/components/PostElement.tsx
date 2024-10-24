"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostActions from "@/components/ui/PostActions";
import { idea } from "@repo/database";
import { MdxViewer } from "@repo/ui/mdxeditor";
function PostElement({ idea }: { idea: idea }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="m-2 flex items-center gap-2 p-3 text-start hover:bg-zinc-900 bg-zinc-800/50 text-neutral-400 rounded-lg">
          <div className="space-y-2 w-full">
            <div className="font-bold text-3xl underline underline-offset-4">
              {idea.title}
            </div>
            <div className="text-lg">{idea.description}</div>
            <div className="text-xl"># {idea.serial_number}</div>
          </div>
          <PostActions
            // TODO: pass the author detail from login session
            post_details={{
              post_id: idea.id,
              author_user_id: "",
              author_username: "",
            }}
            post_status={{
              upvotes: idea.upvotes_count,
              downvotes: idea.downvotes_count,
              comments: 101,
            }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle># {idea.serial_number}</DialogTitle>
        </DialogHeader>
        <MdxViewer
          markdown={idea.content}
          className="bg-white prose max-w-none"
        />
      </DialogContent>
    </Dialog>
  );
}

export default PostElement;
