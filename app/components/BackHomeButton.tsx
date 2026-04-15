import Link from "next/link";

type BackHomeButtonProps = {
  label?: string;
};

export default function BackHomeButton({
  label = "Back to home",
}: BackHomeButtonProps) {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/85 shadow-(--shadow) transition hover:-translate-y-0.5 hover:text-foreground hover:shadow-lg"
      >
        <span aria-hidden="true">&larr;</span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
