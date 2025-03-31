"use client";
import { comment } from "@/app/actions/pg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PostActions from "@/components/ui/PostActions";
import { idea } from "@repo/database";
import { MdxViewer } from "@repo/ui/mdxeditor";
import { useState } from "react";

function PostElement({ idea, comments }: { idea: idea; comments: any }) {
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="m-2 hover:bg-zinc-900 bg-zinc-800/50 text-neutral-400">
          <div className="flex items-center gap-2 p-2 text-start rounded-lg">
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
              toggleComment={() => setShowComment(!showComment)}
            />
          </div>
        </div>
      </DialogTrigger>
      {showComment && (
        <div className="m-2">
          comments
          <Input
            placeholder="Add a comment..."
            className="w-full mt-2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            className="mt-2"
            onClick={async () => {
              await comment({
                post_id: idea.id,
                comment: commentText,
              }).then(() => {
                alert("Comment added");
                setCommentText("");
              });
            }}
          >
            Add Comment
          </Button>
          {comments.map((cm: any) => {
            return (
              <div
                key={cm.id}
                className="flex gap-2 items-start p-2 rounded-lg hover:bg-zinc-900 mt-2 bg-zinc-800 text-neutral-400"
              >
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2"></div>
                  <p className="text-neutral-400">{cm.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
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
