import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BalanceScaleProps {
  leftWeight: number;
  rightWeight: number;
  children?: React.ReactNode;
}

export const BalanceScale = ({ leftWeight, rightWeight, children }: BalanceScaleProps) => {
  const [isBalanced, setIsBalanced] = useState(true);
  const [tiltDirection, setTiltDirection] = useState<"left" | "right" | "balanced">("balanced");

  useEffect(() => {
    const balanced = leftWeight === rightWeight;
    setIsBalanced(balanced);
    
    if (!balanced) {
      setTiltDirection(leftWeight > rightWeight ? "left" : "right");
    } else {
      setTiltDirection("balanced");
    }
  }, [leftWeight, rightWeight]);

  const getArmRotation = () => {
    if (tiltDirection === "left") return "rotate(-5deg)";
    if (tiltDirection === "right") return "rotate(5deg)";
    return "rotate(0deg)";
  };

  const getLeftBowlPosition = () => {
    if (tiltDirection === "left") return "translateY(15px)";
    if (tiltDirection === "right") return "translateY(-15px)";
    return "translateY(0)";
  };

  const getRightBowlPosition = () => {
    if (tiltDirection === "right") return "translateY(15px)";
    if (tiltDirection === "left") return "translateY(-15px)";
    return "translateY(0)";
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Balance indicator */}
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "text-4xl font-bold transition-all duration-300",
          isBalanced ? "text-secondary scale-110" : "text-destructive"
        )}>
          {isBalanced ? "=" : "≠"}
        </div>
        <div className="text-lg font-medium text-foreground">
          {isBalanced ? "Seimbang!" : "Tidak Seimbang"}
        </div>
      </div>

      {/* Scale structure */}
      <div className="relative w-full max-w-4xl">
        {/* Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-8 bg-scale-base rounded-lg shadow-lg" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-32 bg-scale-base rounded-t-lg" />
        
        {/* Pointer at top */}
        <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-scale-base" />

        {/* Arm with rotation */}
        <div 
          className="absolute bottom-36 left-1/2 -translate-x-1/2 w-[600px] h-6 bg-scale-arm rounded-full shadow-lg transition-transform duration-500 ease-in-out"
          style={{ transform: getArmRotation() }}
        >
          {/* Pivot point circles */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 w-8 h-8 bg-scale-base rounded-full border-4 border-background" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 bg-scale-base rounded-full border-4 border-background" />
        </div>

        {/* Bowls */}
        <div className="absolute bottom-0 left-12 w-64 h-48 flex flex-col items-center transition-transform duration-500 ease-in-out"
          style={{ transform: getLeftBowlPosition() }}>
          <div className="w-1 h-24 bg-scale-arm" />
          <div className="relative w-full h-32 bg-gradient-to-b from-scale-bowl to-scale-arm rounded-b-[50%] shadow-xl border-4 border-scale-arm overflow-visible">
            <div className="absolute inset-2 bg-white/20 rounded-b-[45%]" />
            {/* Left bowl content area */}
            <div className="absolute inset-4 flex flex-wrap gap-2 items-end justify-center pb-4 overflow-y-auto">
              {children && (children as any)[0]}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-12 w-64 h-48 flex flex-col items-center transition-transform duration-500 ease-in-out"
          style={{ transform: getRightBowlPosition() }}>
          <div className="w-1 h-24 bg-scale-arm" />
          <div className="relative w-full h-32 bg-gradient-to-b from-scale-bowl to-scale-arm rounded-b-[50%] shadow-xl border-4 border-scale-arm overflow-visible">
            <div className="absolute inset-2 bg-white/20 rounded-b-[45%]" />
            {/* Right bowl content area */}
            <div className="absolute inset-4 flex flex-wrap gap-2 items-end justify-center pb-4 overflow-y-auto">
              {children && (children as any)[1]}
            </div>
          </div>
        </div>
      </div>

      {/* Weight display */}
      <div className="flex gap-12 text-lg font-semibold">
        <div className="text-center">
          <div className="text-muted-foreground">Kiri</div>
          <div className="text-2xl text-primary">{leftWeight}</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Kanan</div>
          <div className="text-2xl text-primary">{rightWeight}</div>
        </div>
      </div>
    </div>
  );
};
