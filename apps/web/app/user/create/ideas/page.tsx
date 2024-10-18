"use client";
import { CreateIdeaPost } from "@/app/actions/mongo";
import MdxeditorComponent from "@/components/MdxEditor";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
function CreateIdea() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  async function HandleSubmit() {
    setLoading(true);
    const res = await CreateIdeaPost({ content });
    setLoading(false);
    if (res) {
      console.log("Success");
    } else {
      console.log("Failed");
    }
  }

  function HandleChange({ content }: { content: string }) {
    setContent(content);
  }
  return (
    <div className="bg-black lg:grid lg:grid-cols-3">
      <div className="lg:col-span-1 bg-neutral-800 h-fit m-4 p-2 rounded-sm text-neutral-300">
        <span className="text-xl font-bold underline underline-offset-4">
          Node:
        </span>
        <br />- The Document Supports Markdown
      </div>
      <div className="min-h-screen w-full mx-auto space-y-4 lg:col-span-2 p-4">
        <MdxeditorComponent
          ClassName="bg-white mx-auto min-h-[400px] rounded-sm"
          onChange={HandleChange}
        />
        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="animate-spin mr-2" />
            Wait..
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              HandleSubmit();
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateIdea;
