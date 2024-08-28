import React from "react";
import { extensions } from "./extensions";
import "@/styles/editor.css";
import {
  EditorContent,
  EditorEvents,
  EditorOptions,
  useEditor,
} from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import ToolBar from "./tool-bar";

type PropsType = {
  options?: Partial<EditorOptions>;
  onChange?: (e: EditorEvents["update"]["editor"]) => void;
};

export default function RichTextEditor({ options, onChange }: PropsType) {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none mx-auto focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange && onChange(e);
    },
    ...options,
  });

  if (!editor) {
    return <Loader2Icon size={36} className="mx-auto animate-spin" />;
  }
  return (
    <div className="flex w-full flex-col">
      {editor.isEditable && <ToolBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "min-h-[350px] bg-background px-2 py-6",
          editor.isEditable &&
            "rounded-b border border-zinc-900 rounded-y-[6px] focus-visible::border-[2px]"
        )}
      />
    </div>
  );
}
