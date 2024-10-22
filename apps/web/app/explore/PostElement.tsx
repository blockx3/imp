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
      <DialogTrigger>
        <div className="m-2 flex items-center gap-2 p-3 text-start hover:bg-zinc-900 bg-zinc-800/50 text-neutral-400 rounded-lg">
          <div className="space-y-2">
            <div className="font-bold text-3xl underline underline-offset-4">
              Title
            </div>
            <div className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
              iste amet sint sequi voluptate velit. Esse eum repellat, et vero,
              eveniet iure unde, praesentium adipisci expedita voluptatum
              corporis error eius.
            </div>
            <div className="text-xl"># {idea.serial_number}</div>
          </div>
          <PostActions />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle># {idea.serial_number}</DialogTitle>
        </DialogHeader>
        <MdxViewer markdown={idea.content} className="bg-white" />
      </DialogContent>
    </Dialog>
  );
}

export default PostElement;
