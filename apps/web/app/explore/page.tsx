// import { Suspense } from "react";
// import Explore_PostList from "./Posts";
import UserSection from "./UserSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
async function Explore() {
  const temp = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="bg-neutral-800 h-screen lg:grid lg:grid-cols-4 text-neutral-300">
      <div className="lg:col-span-1">
        <UserSection />
        <div className="flex justify-center">
          <Link href={"/user/create/ideas"} className="mt-4">
            <Button variant={"secondary"} className="text-lg">
              Feel Lucky <Plus size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:col-span-2 border-l-2 border-r-2 border-neutral-600/80 max-h-screen overflow-auto no-scrollbar relative">
        {temp.map((d, index) => {
          return (
            <div
              className="m-2 p-4 bg-neutral-700 text-neutral-300 rounded-lg space-y-4"
              key={index}
            >
              <div className="font-bold text-3xl underline underline-offset-4">
                Title
              </div>
              <div className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis, iste amet sint sequi voluptate velit. Esse eum
                repellat, et vero, eveniet iure unde, praesentium adipisci
                expedita voluptatum corporis error eius.
              </div>
            </div>
          );
        })}
        <div className="sticky w-full h-[15vh] bottom-0 bg-gradient-to-t from-[#000] drop-shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"></div>
      </div>
      <div className="lg:col-span-1">Filters & Announcements</div>
    </div>
  );
}

export default Explore;
