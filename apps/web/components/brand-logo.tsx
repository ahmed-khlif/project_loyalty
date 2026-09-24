import Image from "next/image";
import { cn } from "@njiw/ui/lib/utils";

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span
      role="img"
      aria-label="njiw. / نجيو"
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
