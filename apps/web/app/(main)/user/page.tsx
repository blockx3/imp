import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserIdeasPicker from "./UserIdeasPicker";
import IdeasList from "./IdeasList";
import { UserIdeaType } from "@/lib/types";
import IdeasSkeletons from "@/components/AllSkeletons";
import { Suspense } from "react";
async function User({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const ideas_to_show = (await searchParams).ideas_to_show as UserIdeaType;

  return (
    <div className="">
      <div className="bg-neutral-800/80 p-8 flex items-center">
        <Avatar className="lg:h-24 lg:w-24">
          <AvatarImage src="https://static.aaraz.me/blockx3/imp/logo.png" />
          <AvatarFallback>IMP</AvatarFallback>
        </Avatar>
        <div className="flex-1 px-10 space-y-2">
          <div className="text-4xl font-bold">Anish Araz</div>
          <div className="flex gap-2">
            <div className="text-green-400">Followers: 121</div>
            <div className="text-amber-300">Ideas Posted: 121</div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-neutral-800 flex gap-4 py-2 px-2">
        <UserIdeasPicker ideas_to_show={ideas_to_show as string} />
      </div>
      <Suspense fallback={<IdeasSkeletons count={4} />}>
        <IdeasList Ideas_type={ideas_to_show} userId="2" />
      </Suspense>
    </div>
  );
}

export default User;
