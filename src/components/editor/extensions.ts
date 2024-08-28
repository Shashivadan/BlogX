import { Highlight } from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import type { AnyExtension } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export const extensions: AnyExtension[] = [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: {
        class: "p-3",
      },
    },
  }),
  Markdown,
  Highlight,
  Link.configure({
    openOnClick: false,
  }).extend({
    inclusive: false,
    priority: 100,
  }),
  Placeholder.configure({
    placeholder: "Type Your Story....",
  }),
  TaskItem.configure({
    nested: true,
  }),
  TaskList,
];
