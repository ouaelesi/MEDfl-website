// app/blogs/page.tsx
import BlogGrid from "@/components/blogs/BlogsGrid";
import BlogsHeader from "@/components/blogs/BlogsHeader";
import { blogs } from "@/data/Blogs";
import { Montserrat } from "next/font/google";
export const revalidate = 60;


const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"], // Example weights
  subsets: ["latin"],
  display: "swap", // Optimizes font loading
  variable: "--font-montserrat", // Optional: for CSS variables
});
export default async function BlogsPage() {
  const mapped = blogs.map((p) => ({
    id: p._id,
    title: p.title,
    href: `/blogs/${p.slug}`,
    image: p.mainImage?.url || "/images/about1.jpg",
    category: Array.isArray(p.category) && p.category.length ? p.category : [{ title: "Général" }],
  }));

  return (
       <div className={`${montserrat.className}  relative bg-background`}>
      <BlogsHeader />
      <BlogGrid posts={mapped} />
    </div>
  );
}
