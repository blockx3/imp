"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function UserSection() {
  return (
    <div className="p-4 flex items-center justify-between border-b-2 border-neutral-800">
      <Avatar>
        {/* TODO: change the image with a link and app logo */}
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center text-xl font-bold">User Name</div>
    </div>
  );
}

export default UserSection;
