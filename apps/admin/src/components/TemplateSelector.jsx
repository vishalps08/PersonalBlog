import {
  FileText,
  Camera,
  GraduationCap,
  Star,
  ListOrdered,
  Layout,
} from "lucide-react";

const templates = [
  {
    id: "blank",
    name: "Blank",
    description: "Start from scratch",
    icon: FileText,
    content: "",
  },
  {
    id: "photo-essay",
    name: "Photo Essay",
    description: "Images with narrative text",
    icon: Camera,
    content: `<h2>Introduction</h2><p>Set the scene for your photo essay...</p><p></p><h2>The Story</h2><p>Tell the story behind the images...</p><p></p><h2>Reflections</h2><p>Share your thoughts and takeaways...</p>`,
  },
  {
    id: "tutorial",
    name: "Tutorial",
    description: "Step-by-step guide with code",
    icon: GraduationCap,
    content: `<h2>Overview</h2><p>What you'll learn in this tutorial...</p><h2>Prerequisites</h2><ul><li><p>Requirement 1</p></li><li><p>Requirement 2</p></li></ul><h2>Step 1: Getting Started</h2><p>Explain the first step...</p><pre><code>// your code here</code></pre><h2>Step 2: Building</h2><p>Continue with the next step...</p><h2>Step 3: Finishing Up</h2><p>Final implementation details...</p><h2>Conclusion</h2><p>Wrap up and next steps...</p>`,
  },
  {
    id: "review",
    name: "Review",
    description: "Structured pros, cons, verdict",
    icon: Star,
    content: `<h2>Overview</h2><p>What you're reviewing and first impressions...</p><h2>What Works</h2><ul><li><p>Highlight 1</p></li><li><p>Highlight 2</p></li><li><p>Highlight 3</p></li></ul><h2>What Doesn't</h2><ul><li><p>Issue 1</p></li><li><p>Issue 2</p></li></ul><h2>Verdict</h2><p>Final thoughts and overall rating...</p>`,
  },
  {
    id: "listicle",
    name: "Listicle",
    description: "Numbered items with details",
    icon: ListOrdered,
    content: `<h2>1. First Item</h2><p>Why this made the list...</p><h2>2. Second Item</h2><p>Description and details...</p><h2>3. Third Item</h2><p>What makes this stand out...</p><h2>4. Fourth Item</h2><p>Key takeaway here...</p><h2>5. Fifth Item</h2><p>Wrapping up the list...</p>`,
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "Side-by-side analysis",
    icon: Layout,
    content: `<h2>Introduction</h2><p>What you're comparing and why it matters...</p><h2>Option A</h2><h3>Strengths</h3><ul><li><p>Strength 1</p></li><li><p>Strength 2</p></li></ul><h3>Weaknesses</h3><ul><li><p>Weakness 1</p></li></ul><h2>Option B</h2><h3>Strengths</h3><ul><li><p>Strength 1</p></li><li><p>Strength 2</p></li></ul><h3>Weaknesses</h3><ul><li><p>Weakness 1</p></li></ul><h2>Final Pick</h2><p>Which one wins and why...</p>`,
  },
];

export default function TemplateSelector({ onSelect }) {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up">
      <div className="mb-6 text-center">
        <h1 className="mb-2 font-display text-2xl font-600 text-ink dark:text-paper">
          Choose a template
        </h1>
        <p className="text-sm text-ash">
          Pick a structure to get started, or go blank
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {templates.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.content)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-ash/15 bg-white p-5 text-center transition-all hover:border-safelight hover:shadow-md dark:border-ash/25 dark:bg-night-surface dark:hover:border-safelight"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ash/5 text-ash transition-colors group-hover:bg-safelight/10 group-hover:text-safelight dark:bg-ash/10">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <div>
                <div className="mb-0.5 text-sm font-medium text-ink dark:text-paper">
                  {t.name}
                </div>
                <div className="text-xs text-ash">{t.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
