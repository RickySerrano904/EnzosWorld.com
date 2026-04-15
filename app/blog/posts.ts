import type { BlogConfig, BlogPostMeta } from "@/app/components/blog/types";

export const posts: BlogPostMeta[] = [
  {
    slug: "the-feline-menace",
    title: "The Feline Menace",
    date: "May 06, 2024",
    thumbnailSrc: "/images/blog/20240506_140324.jpg",
    thumbnailAlt: "Sophie the feline menace",
  },
  {
    slug: "archaeologist-enzo",
    title: "Archaeologist Enzo",
    date: "June 12, 2024",
    thumbnailSrc: "/images/blog/20240506_184142.jpg",
    thumbnailAlt: "Enzo the archaeologist",
  },
  {
    slug: "my-mistake-but-also-worth-it",
    title: "My Mistake, But Also Worth It",
    date: "July 22, 2024",
    thumbnailSrc: "/images/blog/20240506_185620.jpg",
    thumbnailAlt: "Enzo making a questionable choice",
  },
  {
    slug: "smelled-everything-tasted-most-things",
    title: "Smelled Everything, Tasted Most Things",
    date: "August 25, 2024",
    thumbnailSrc: "/images/blog/20240720_115258.jpg",
    thumbnailAlt: "Enzo with wild curiosity",
  },
  {
    slug: "fear-the-fluffasaurus",
    title: "Fear the Fluffasaurus",
    date: "October 31, 2024",
    thumbnailSrc: "/images/blog/20240926_203127.jpg",
    thumbnailAlt: "Fluffasaurus in full effect",
  },
  {
    slug: "worlds-biggest-stick",
    title: "World's Biggest Stick",
    date: "January 5, 2025",
    thumbnailSrc: "/images/blog/20240812_103032.jpg",
    thumbnailAlt: "Enzo and the world's biggest stick",
  },
  {
    slug: "it-called-to-me",
    title: "It Called to Me",
    date: "March 12, 2025",
    thumbnailSrc: "/images/blog/20240926_203134.jpg",
    thumbnailAlt: "The mysterious object that called to Enzo",
  },
  {
    slug: "bark-sip-repeat",
    title: "Bark, Sip, Repeat",
    date: "May 19, 2025",
    thumbnailSrc: "/images/blog/20240926_203141.jpg",
    thumbnailAlt: "Enzo living the bark-sip-repeat life",
  },
  {
    slug: "business-in-the-front-puddles-in-the-back",
    title: "Business in the Front, Puddles in the Back",
    date: "June 12, 2025",
    thumbnailSrc: "/images/blog/20240926_222256.jpg",
    thumbnailAlt: "A polished look with puddle chaos",
  },
];

export const blogConfig: BlogConfig = {
  basePath: "/blog",
  title: "Blog",
  titleIcon: "\u{1F4D6}",
  description:
    "Field reports from Enzo: snacks, puddles, and local feline conflicts.",
  readLabel: "Read",
  posts,
};
