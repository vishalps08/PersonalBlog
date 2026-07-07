import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { listPosts } from "../lib/posts";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    listPosts({ category: category || undefined, search: search || undefined, limit: 20 })
      .then((res) => setPosts(res.data.posts))
      .finally(() => setLoading(false));
  }, [category, search]);

  const isFiltered = Boolean(category || search);
  const [heroPost, ...restPosts] = posts;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-center gap-2 rounded-full border border-ash/20 px-4 py-2">
        <Search size={15} className="text-ash" />
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ash/60"
        />
      </div>

      <CategoryFilter active={category} onChange={setCategory} />

      {loading ? (
        <p className="font-mono text-sm text-ash">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="font-mono text-sm text-ash">No posts found.</p>
      ) : (
        <>
          {!isFiltered && heroPost && <Hero post={heroPost} />}
          <div className="divide-y divide-ash/10">
            {(isFiltered ? posts : restPosts).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}