"use client";
import { DownvoteIdeaPost, UpvoteIdeaPost } from "@/app/actions/mongo";
import { useToast } from "@/hooks/use-toast";
import { ChevronUp, ChevronDown, MessagesSquare, Loader2 } from "lucide-react";
import { useState } from "react";

function PostActions({
  post_details,
  post_status,
}: {
  post_details: {
    post_id: string;
    author_user_id?: string;
    author_username?: string;
  };
  post_status: {
    upvotes: number;
    downvotes: number;
    comments: number;
  };
}) {
  const [downVoteLoading, setDownVoteLoading] = useState(false);
  const [upvoteLoading, setUpvoteLoading] = useState(false);
  const { toast } = useToast();
  return (
    <div className="flex flex-col justify-between gap-2 w-20 items-center">
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={async (e) => {
          // TODO: check if the user is logged in if not redirect to login & add a loading state
          e.stopPropagation();
          if (upvoteLoading) {
            return;
          }
          setUpvoteLoading(true);
          const res = await UpvoteIdeaPost({
            ideaId: post_details.post_id,
            author_user_id: "1",
            author_username: "user1",
          });
          if (res.success) {
            toast({
              title: "Upvoted",
              description: res.message,
            });
          } else {
            toast({
              title: "Upvote failed",
              description: res.message,
              variant: "destructive",
            });
          }
          setUpvoteLoading(false);
        }}
      >
        <ChevronUp />
        {upvoteLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="text-neutral-400/50">{post_status.upvotes}</div>
        )}
      </div>
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={async (e) => {
          e.stopPropagation();
        }}
      >
        <MessagesSquare />
        <div className="text-neutral-400/50">{post_status.comments}</div>
      </div>
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={async (e) => {
          // TODO: check if the user is logged in if not redirect to login & add a loading state
          e.stopPropagation();
          if (downVoteLoading) {
            return;
          }
          setDownVoteLoading(true);
          const res = await DownvoteIdeaPost({
            ideaId: post_details.post_id,
            author_user_id: "1",
            author_username: "user1",
          });
          if (res.success) {
            toast({
              title: "Down-Voted",
              description: res.message,
            });
          } else {
            toast({
              title: "Down-Vote failed",
              description: res.message,
              variant: "destructive",
            });
          }
          setDownVoteLoading(false);
        }}
      >
        {downVoteLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="text-neutral-400/50">{post_status.downvotes}</div>
        )}
        <ChevronDown />
      </div>
    </div>
  );
}

export default PostActions;
