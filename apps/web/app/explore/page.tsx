// import { Suspense } from "react";
import UserSection from "./UserSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Explore_PostList from "./Posts";
async function Explore() {
  return (
    <div className="bg-black h-screen lg:grid lg:grid-cols-4 text-neutral-300">
      <div className="lg:col-span-1">
        <UserSection />
        <div className="flex justify-center">
          <Link href={"/user/create/ideas"} className="mt-4">
            <Button variant={"secondary"} className="text-lg">
              Launch 🚀
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2 border-l-2 border-r-2 border-neutral-800 max-h-screen overflow-auto no-scrollbar ">
        <Explore_PostList />
        <div className="sticky w-full h-[15vh] bottom-0 bg-gradient-to-t from-[#000000]"></div>
      </div>
      <div className="lg:col-span-1">Filters & Announcements</div>
    </div>
  );
}

export default Explore;
