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
            <Button className="text-lg">Launch 🚀</Button>
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2 border-l-2 border-r-2 border-neutral-800 max-h-screen overflow-auto no-scrollbar ">
        <Explore_PostList />
        <div className="sticky w-full h-[15vh] bottom-0 bg-gradient-to-t from-[#000000]"></div>
      </div>
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-neutral-800 p-3 m-2 rounded-sm space-y-2">
          <div className="text-xl border-b-2 ">Filters</div>
          <div>
            <div className="rounded-2xl text-sm bg-neutral-700 w-fit px-2 cursor-pointer hover:bg-neutral-600">
              Latest
            </div>
          </div>
        </div>
        <div className="p-2 m-2 bg-neutral-800 rounded-sm space-y-2">
          <div className="text-xl">Announcements</div>
          <div className="text-sm text-neutral-300 ">
            <div className="bg-neutral-700 text-pretty px-2 py-4 rounded-md">
              A new Idea got Approved 🚀, Check{" "}
              <Link
                href={"#"}
                className="underline underline-offset-2 text-blue-400"
              >
                Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
