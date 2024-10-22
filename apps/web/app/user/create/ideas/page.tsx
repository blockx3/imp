import IdeaCreationForm from "./Form";
async function CreateIdea({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const edit_idea_id = (await searchParams).edit_idea_id; // To be used when idea edit feature is added
  return (
    <div className="lg:grid lg:grid-cols-3">
      <div className="lg:col-span-1 bg-neutral-800 h-fit m-4 p-2 rounded-sm text-neutral-300">
        <span className="text-xl font-bold underline underline-offset-4">
          Node:
        </span>
        <br />
        <span className="text-lg">- The Document Supports Markdown</span>
      </div>
      <IdeaCreationForm />
    </div>
  );
}

export default CreateIdea;
