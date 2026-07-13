import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
} from "lucide-react";

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded p-1.5 transition-colors ${
        active
          ? "bg-ink text-paper dark:bg-paper dark:text-ink"
          : "text-ash hover:bg-ash/10 hover:text-ink dark:hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] focus:outline-none font-sans text-ink dark:prose-invert",
      },
    },
  });

  if (!editor) return null;

  function addImage() {
    const url = window.prompt("Image URL (paste a Cloudinary URL, or upload via cover image for now)");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  function addLink() {
    const url = window.prompt("URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="rounded-lg border border-ash/20 bg-white dark:border-ash/30 dark:bg-night-surface">
      <div className="flex items-center gap-1 border-b border-ash/15 px-3 py-2 dark:border-ash/25">
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} strokeWidth={1.75} />
        </ToolbarButton>
        <ToolbarButton title="Link" onClick={addLink}>
          <LinkIcon size={16} strokeWidth={1.75} />
        </ToolbarButton>
      </div>
      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}