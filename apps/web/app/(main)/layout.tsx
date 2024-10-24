import SideBar from "@/components/ui/SideBar";

function Main_layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-black h-screen lg:grid lg:grid-cols-4 text-neutral-300">
        <div className="lg:col-span-1 border-neutral-800 border-r-2">
          <SideBar />
        </div>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </>
  );
}

export default Main_layout;
