export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
};

export type BlogConfig = {
  basePath: `/${string}`;
  title: string;
  description: string;
  posts: BlogPostMeta[];
  titleIcon?: string;
  readLabel?: string;
};
