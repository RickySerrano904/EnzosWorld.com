import Link from "next/link";

type BackHomeButtonProps = {
  label?: string;
};

export default function BackHomeButton({
  label = "Back to home",
}: BackHomeButtonProps) {
  return (
    <div className="relative -mt-4 mb-2 px-1">
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground/60 uppercase transition-colors duration-300 hover:text-secondary"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          &larr;
        </span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
