import { cn } from "@/utils/cn";

export type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  return (
    <svg viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-15", className)}>
      {/* Top */}
      <path d="M68 59.7125L92.82 0H43.35L68 59.7125Z" className="animate-[var(--animate-section-1)]" />
      {/* Top Right */}
      <path
        d="M98.685 2.50751L73.9075 62.1775L95.0725 53.4225L133.662 37.485L98.685 2.50751Z"
        className="animate-[var(--animate-section-8)]"
      />
      {/* Right */}
      <path
        d="M103.317 56.95L76.2875 68.085L136 92.8625V43.435L103.317 56.95Z"
        className="animate-[var(--animate-section-7)]"
      />
      {/* Bottom Right */}
      <path
        d="M73.95 74.035L82.8325 95.54L98.5575 133.62L133.45 98.7275L73.95 74.035Z"
        className="animate-[var(--animate-section-6)]"
      />
      {/* Bottom */}
      <path
        d="M76.7125 97.58H76.755L68 76.415L55.9725 105.357L43.2225 136H92.6075L76.7125 97.58Z"
        className="animate-[var(--animate-section-5)]"
      />
      {/* Bottom Left */}
      <path
        d="M53.295 95.115L62.0925 73.95L2.42249 98.6L37.3575 133.493L53.295 95.115Z"
        className="animate-[var(--animate-section-4)]"
      />
      {/* Left */}
      <path
        d="M59.5425 68.085L36.7625 58.65L36.805 58.565L0 43.265V92.6925L59.5425 68.085Z"
        className="animate-[var(--animate-section-3)]"
      />
      {/* Top Left */}
      <path
        d="M40.9275 53.3375V53.4225L62.135 62.22L53.3375 40.97L37.4425 2.42249L2.46497 37.3575L40.9275 53.3375Z"
        className="animate-[var(--animate-section-2)]"
      />
    </svg>
  );
};
