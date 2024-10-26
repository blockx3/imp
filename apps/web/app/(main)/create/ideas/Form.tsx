"use client";
import { CreateIdeaPost } from "@/app/actions/mongo";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { MDXEditorMethods } from "@repo/ui/mdxeditor";
import { MdxEditorComponent } from "@/components/MdxEditorComponent";
import { useToast } from "@/hooks/use-toast";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function IdeaCreationForm() {
  const schema = zod.object({
    content: zod.string().min(10, { message: "Content size is too small" }),
    title: zod.string().min(5, { message: "Title size is too small" }),
    description: zod
      .string()
      .min(10, { message: "Description size is too small" }),
  });
  type Inputes = zod.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Inputes>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const mdx_ref = useRef<MDXEditorMethods>(null);
  const onSubmit: SubmitHandler<Inputes> = async () => {
    const res = await CreateIdeaPost({
      title: getValues("title"),
      description: getValues("description"),
      content: getValues("content"),
    });
    if (res.success) {
      mdx_ref.current?.setMarkdown("# Idea Submitted You can write more");
      setContent("");
      toast({
        title: "Success !!",
        description:
          "Idea has been created successfully, you can view in your profiles",
      });
      setValue("title", "");
      setValue("description", "");
      setValue("content", "");
    } else {
      setError("root", { message: res.message });
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto space-y-6 lg:col-span-2 p-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <div className="bg-red-600 text-white mt-2 rounded-sm p-2">
              {errors.title.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
          {errors.description && (
            <div className="bg-red-600 text-white mt-2 rounded-sm p-2">
              {errors.description.message}
            </div>
          )}
        </div>
        <div>
          <MdxEditorComponent
            onChange={(c) => {
              setValue("content", c);
              if (c.length > 10) {
                clearErrors("content");
              }
            }}
            markdown=""
            className="bg-white mx-auto rounded-sm prose max-w-none"
            ref={mdx_ref}
            autoFocus={true}
            placeholder="Your idea can bring next revolution. Write here...."
          />
          {errors.content && (
            <div className="bg-red-600 text-white mt-2 rounded-sm p-2">
              {errors.content.message}
            </div>
          )}
          {errors.root && (
            <div className="bg-red-600 text-white mt-2 rounded-sm p-2">
              {errors.root.message}
            </div>
          )}
        </div>
        <Button
          className="w-full"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              <span> Wait..</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
    </>
  );
}

export default IdeaCreationForm;
