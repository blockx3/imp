import { ChevronUp, ChevronDown, MessagesSquare } from "lucide-react";

function PostActions() {
  return (
    <div className="flex flex-col justify-between gap-2 w-20 items-center">
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ChevronUp />
        <div className="text-neutral-400/50">44</div>
      </div>
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MessagesSquare />
        <div className="text-neutral-400/50">254</div>
      </div>
      <div
        className="hover:bg-zinc-800 p-1 rounded-sm flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-neutral-400/50">4</div>
        <ChevronDown />
      </div>
    </div>
  );
}

export default PostActions;
