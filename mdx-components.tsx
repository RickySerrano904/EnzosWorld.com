// import type { MDXComponents } from "mdx/types";

// export function useMDXComponents(components: MDXComponents): MDXComponents {
//   return {
//     ...components,
//   };
// }


import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mt-6 text-lg text-foreground/80">{children}</p>
    ),
    a: ({ children, ...props }) => (
      <a
        {...props}
        className="font-semibold text-[var(--secondary)] underline underline-offset-4"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="mt-6 list-disc pl-6">{children}</ul>,
    li: ({ children }) => <li className="mt-2">{children}</li>,
    ...components,
  };
}
