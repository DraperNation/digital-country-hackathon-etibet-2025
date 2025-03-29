import { cn } from "@/lib/utils";

interface GalegAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GalegAvatar({ size = "md", className }: GalegAvatarProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  return (
    <div className={cn("relative rounded-full", sizeClasses[size], className)}>
      {/* Base circle with Tibetan maroon color */}
      <div className="absolute inset-0 rounded-full bg-[#722F37] border-2 border-[#E3B53B]"></div>

      {/* Endless knot pattern overlay */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-[#722F37] opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Stylized endless knot symbol */}
          <div className="relative w-3/4 h-3/4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E3B53B] rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E3B53B] -rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-full bg-[#E3B53B]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-[#E3B53B]"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-1/4 border-t-2 border-l-2 border-r-2 rounded-t-full border-[#E3B53B]"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-1/4 border-b-2 border-l-2 border-r-2 rounded-b-full border-[#E3B53B]"></div>
          </div>
        </div>
      </div>

      {/* Tibetan letter "ག" (ga) for Galeg */}
      <div
        className="absolute inset-0 flex items-center justify-center text-[#E3B53B] font-bold"
        style={{
          fontSize: size === "lg" ? "2rem" : size === "md" ? "1.5rem" : "1rem",
        }}
      >
        ག
      </div>

      {/* Decorative border */}
      <div className="absolute inset-0 rounded-full border-2 border-[#E3B53B] opacity-70"></div>

      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-full bg-[#E3B53B] opacity-20 blur-sm"></div>
    </div>
  );
}
