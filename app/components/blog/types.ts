export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
};

export type BlogConfig = {
  basePath: `/${string}`;
  title: string;
  description: string;
  posts: BlogPostMeta[];
  titleIcon?: string;
  readLabel?: string;
};
