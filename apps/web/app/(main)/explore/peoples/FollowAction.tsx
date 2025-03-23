"use client";
import { FollowUser, Unfollow } from "@/app/actions/pg";
import { Button } from "@/components/ui/button";

function FollowAction({
  isFollowing,
  toFollowUserId,
}: {
  isFollowing: boolean;
  toFollowUserId: string;
}) {
  return (
    <Button
      onClick={() => {
        if (!isFollowing) {
          FollowUser({
            toFollowUserId,
          });
        }
        if (isFollowing) {
          Unfollow({
            toUnFollowUserId: toFollowUserId,
          });
        }
      }}
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      className="h-8 px-3 whitespace-nowrap"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default FollowAction;
