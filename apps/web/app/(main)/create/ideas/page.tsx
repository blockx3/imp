import IdeaCreationForm from "./Form";
async function CreateIdea({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const edit_idea_id = (await searchParams).edit_idea_id; // To be used when idea edit feature is added
  return (
    <div className="">
      <IdeaCreationForm />
    </div>
  );
}

export default CreateIdea;
