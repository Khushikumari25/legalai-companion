import { Scale } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

const Logo = ({ className = "", size = "md", variant = "dark" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 36,
  };

  const textColor = variant === "light" ? "text-sidebar-foreground" : "text-foreground";
  const accentColor = "text-accent";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Scale className={`${accentColor}`} size={iconSizes[size]} strokeWidth={2.5} />
        <div className="absolute inset-0 blur-sm opacity-50">
          <Scale className={`${accentColor}`} size={iconSizes[size]} strokeWidth={2.5} />
        </div>
      </div>
      <span className={`font-serif font-bold ${sizeClasses[size]} ${textColor}`}>
        Legal<span className={accentColor}>AI</span>
      </span>
    </div>
  );
};

export default Logo;
