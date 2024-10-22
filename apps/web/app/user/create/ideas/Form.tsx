"use client";
import { CreateIdeaPost } from "@/app/actions/mongo";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { MDXEditorMethods } from "@repo/ui/mdxeditor";
import { MdxEditorComponent } from "@/components/MdxEditorComponent";
import { useToast } from "@/hooks/use-toast";
function IdeaCreationForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const mdx_ref = useRef<MDXEditorMethods>(null);
  async function HandleSubmit() {
    setLoading(true);
    const res = await CreateIdeaPost({ content });
    setLoading(false);
    if (res.success) {
      mdx_ref.current?.setMarkdown("# Idea Submitted You can write more");
      setContent("");
      setError("");
      toast({
        title: "Success !!",
        description:
          "Idea has been created successfully, you can view in your profiles",
      });
    } else {
      setError("Failed to submit idea, Try Again !!");
    }
  }

  function HandleChange(content: string) {
    setContent(content);
  }
  return (
    <div className="w-full mx-auto space-y-4 lg:col-span-2 p-4">
      <MdxEditorComponent
        onChange={HandleChange}
        markdown=""
        className="bg-white mx-auto rounded-sm prose max-w-none"
        ref={mdx_ref}
        autoFocus={true}
        placeholder="Your idea can bring next revolution. Write here...."
      />
      {error && <div className="bg-red-600 rounded-sm p-2">{error}</div>}
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
  );
}

export default IdeaCreationForm;
