import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { listPosts } from "../lib/posts";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import { PostCardSkeleton, HeroSkeleton } from "../components/Skeleton";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Home() {
  useDocumentTitle(null);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    listPosts({
      category: category || undefined,
      search: search || undefined,
      page,
      limit: 10,
    })
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.pages);
      })
      .finally(() => setLoading(false));
  }, [category, search, page]);

  const isFiltered = Boolean(category || search);
  const [heroPost, ...restPosts] = posts;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center gap-2.5 rounded-full border border-ash/20 bg-white/50 px-4 py-2.5 shadow-sm transition-all focus-within:border-safelight focus-within:shadow-md dark:border-ash/25 dark:bg-night-surface/50">
        <Search size={15} className="text-ash" />
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ash/50 dark:text-paper"
        />
      </div>

      <CategoryFilter
        active={category}
        onChange={(value) => {
          setCategory(value);
          setPage(1);
        }}
      />

      {loading ? (
        <>
          {!isFiltered && <HeroSkeleton />}
          <div className="divide-y divide-ash/10 dark:divide-ash/20">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ash/25 py-20 text-center dark:border-ash/30">
          <p className="font-mono text-sm text-ash">
            {isFiltered
              ? "No posts match that search."
              : "Nothing published yet — check back soon."}
          </p>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          {!isFiltered && heroPost && <Hero post={heroPost} />}
          <div className="divide-y divide-ash/10 dark:divide-ash/20">
            {(isFiltered ? posts : restPosts).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
