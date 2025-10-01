import { Outlet } from "react-router";

import { ContentEditor } from "@/components/content-editor";

import { MainMenu } from "./_components/main-menu";

export function StudioLayout() {
  return (
    <div className="h-screen flex items-stretch">
      <MainMenu />
      <ContentEditor />
      <div className="flex-1 bg-[#FDFDFD] flex flex-col overflow-y-auto scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
