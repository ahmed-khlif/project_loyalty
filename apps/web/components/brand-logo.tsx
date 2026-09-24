import Image from "next/image";
import { cn } from "@njiw/ui/lib/utils";

export function BrandLogo({ className, label = "njiw. / نجيو", priority = false }: { className?: string; label?: string; priority?: boolean }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("relative inline-block aspect-[0.78] w-14 overflow-hidden rounded-xl bg-[#fcf9f1]", className)}
    >
      <Image
        src="/logo.png"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 640px) 56px, 72px"
        className="object-cover object-center"
      />
    </span>
  );
}
