"use client";

import {
  EditorContent,
  type EditorEvents,
  type EditorOptions,
  useEditor,
} from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

import "@/styles/editor.css";

import { extensions } from "./extensions";
import Toolbar from "./tool-bar";

type EditorProps = {
  options?: Partial<EditorOptions>;
  onChange?: (editor: EditorEvents["update"]["editor"]) => void;
};

const Editor = (props: EditorProps) => {
  const { options, onChange } = props;

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
      {editor.isEditable && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "min-h-[350px] bg-background px-2 py-6",
          editor.isEditable && "rounded-b border border-zinc-900"
        )}
      />
    </div>
  );
};

export default Editor;
