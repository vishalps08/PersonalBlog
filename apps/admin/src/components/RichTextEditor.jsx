import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import toast from "react-hot-toast";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  LinkIcon,
  ImagePlus,
  Minus,
  Undo2,
  Redo2,
} from "lucide-react";
import { uploadImage } from "../lib/posts";

function ToolbarButton({ onClick, active, disabled, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`rounded-lg p-1.5 transition-colors disabled:opacity-30 ${
        active
          ? "bg-ink text-paper dark:bg-paper dark:text-ink"
          : "text-ash hover:bg-ash/10 hover:text-ink dark:hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-ash/15 dark:bg-ash/25" />;
}

export default function RichTextEditor({ content, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing..." }),
    ],
    content: content || "",
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] focus:outline-none font-sans text-ink dark:prose-invert dark:text-paper",
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt("URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImage(file);
      editor
        .chain()
        .focus()
        .setImage({ src: res.data.image.url })
        .run();
    } catch {
      toast.error("Image upload failed");
    } finally {
      e.target.value = "";
    }
  }

  const S = 15;
  const SW = 1.75;

  return (
    <div className="overflow-hidden rounded-xl border border-ash/20 bg-white dark:border-ash/30 dark:bg-night-surface">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ash/15 px-2 py-1.5 dark:border-ash/25">
        {/* History */}
        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={S} strokeWidth={SW} />
        </ToolbarButton>

        <Divider />

        {/* Text formatting */}
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code size={S} strokeWidth={SW} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={S} strokeWidth={SW} />
        </ToolbarButton>

        <Divider />

        {/* Lists & blocks */}
        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={S} strokeWidth={SW} />
        </ToolbarButton>

        <Divider />

        {/* Media & link */}
        <ToolbarButton
          title="Link"
          active={editor.isActive("link")}
          onClick={addLink}
        >
          <LinkIcon size={S} strokeWidth={SW} />
        </ToolbarButton>
        <ToolbarButton
          title="Upload image"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus size={S} strokeWidth={SW} />
        </ToolbarButton>
      </div>

      <div className="px-5 py-4">
        <EditorContent editor={editor} />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
