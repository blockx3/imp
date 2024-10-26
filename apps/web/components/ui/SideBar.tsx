"use client";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  CreditCard,
  WalletIcon,
  Cog,
  PackagePlus,
  Search,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion@sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";

function SideBar() {
  return (
    <>
      <div className="p-4 flex items-center justify-between border-b-2 border-neutral-800">
        <Link href={"/"}>
          <Avatar>
            <AvatarImage src="https://static.aaraz.me/blockx3/imp/logo.png" />
            <AvatarFallback>IMP</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 text-center text-xl font-bold">IMP</div>
      </div>
      <div className="flex justify-center lg:my-4">
        <Link href={"/create/ideas"} className="">
          <Button className="text-lg">Launch 🚀</Button>
        </Link>
      </div>
      <div className="lg:space-y-2">
        <Link
          href="/user?ideas_to_show=myideas"
          // TODO: bg-neutral-800 , Apply this bg on the link which is active
          className="flex items-center p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800  mx-2 group"
        >
          <CircleUserRoundIcon className="group-hover:opacity-100 opacity-50" />
          <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
        </Link>
        <Link
          href="/explore"
          className="flex items-center p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 mx-2 group"
        >
          <Search className="group-hover:opacity-100 opacity-50" />
          <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
        </Link>
        {/* <Accordion type="single" collapsible className="mx-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center p-2  rounded-lg  group bg-neutral-900 hover:bg-neutral-800">
              <div className="flex">
                <CreditCard className="group-hover:opacity-100 opacity-50" />
                <span className="ms-3 whitespace-nowrap">Payment</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-6 mt-2 space-y-2">
              <Link
                href="/user/payment/setup"
                className="flex items-center p-2 bg-neutral-900 hover:bg-neutral-800  rounded-lg  group "
              >
                <Cog className="group-hover:opacity-100 opacity-50" />
                <span className="flex-1 ms-3 whitespace-nowrap">Setup</span>
              </Link>
              <Link
                href="/user/payment/create"
                className="flex items-center p-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg  group "
              >
                <PackagePlus className="group-hover:opacity-100 opacity-50" />
                <span className="flex-1 ms-3 whitespace-nowrap">Create</span>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </div>
    </>
  );
}

export default SideBar;
