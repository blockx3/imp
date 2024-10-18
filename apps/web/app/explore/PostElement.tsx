"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MdxviewerComponent from "@/components/MdxViewer";
import PostActions from "@/components/ui/PostActions";

function PostElement({
  title,
  description,
  content,
}: {
  title?: string;
  description?: string;
  content: string;
}) {
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
            <div className="text-xl"># 5454</div>
          </div>
          <PostActions />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle># 334</DialogTitle>
        </DialogHeader>
        <MdxviewerComponent content={content} />
      </DialogContent>
    </Dialog>
  );
}

export default PostElement;
