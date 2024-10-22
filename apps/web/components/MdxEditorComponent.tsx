import { MDXEditorMethods, MDXEditorProps } from "@repo/ui/mdxeditor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const InitializedMDXEditor = dynamic(
  () => import("@repo/ui/mdxeditor").then((mod) => mod.InitializedMDXEditor),
  { ssr: false }
);
export const MdxEditorComponent = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <InitializedMDXEditor {...props} editorRef={ref} />
);
