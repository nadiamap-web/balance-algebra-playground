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
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Balance indicator */}
      <div className="flex items-center gap-4 mb-2">
        <div className={cn(
          "text-5xl font-bold transition-all duration-300",
          isBalanced ? "text-secondary scale-110" : "text-destructive"
        )}>
          {isBalanced ? "=" : "≠"}
        </div>
        <div className="text-xl font-medium text-foreground">
          {isBalanced ? "Seimbang!" : "Tidak Seimbang"}
        </div>
      </div>

      {/* Scale structure */}
      <div className="relative w-full h-[450px] flex items-center justify-center">
        {/* Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-8 bg-scale-base rounded-lg shadow-lg z-10" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-40 bg-scale-base rounded-t-lg z-10" />
        
        {/* Pointer at top */}
        <div className="absolute bottom-[192px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-scale-base z-10" />

        {/* Arm with rotation - centered on pivot */}
        <div 
          className="absolute bottom-[200px] left-1/2 w-[900px] h-6 bg-scale-arm rounded-full shadow-lg transition-transform duration-500 ease-in-out z-10 overflow-visible"
          style={{ transform: `translateX(-50%) ${getArmRotation()}` }}
        >
          {/* Pivot point circles */}
          <div className="absolute left-20 top-1/2 -translate-y-1/2 w-8 h-8 bg-scale-base rounded-full border-4 border-background shadow" />
          <div className="absolute right-20 top-1/2 -translate-y-1/2 w-8 h-8 bg-scale-base rounded-full border-4 border-background shadow" />

          {/* subtle sheen across the arm */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 w-full h-full rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-60" />
            {/* decorative rivets */}
            <div className="absolute left-28 top-1/2 -translate-y-1/2 flex gap-6">
              <span className="w-3 h-3 bg-scale-base rounded-full border-2 border-white/70 shadow-sm" />
              <span className="w-3 h-3 bg-scale-base rounded-full border-2 border-white/70 shadow-sm" />
            </div>
            <div className="absolute right-28 top-1/2 -translate-y-1/2 flex gap-6">
              <span className="w-3 h-3 bg-scale-base rounded-full border-2 border-white/70 shadow-sm" />
              <span className="w-3 h-3 bg-scale-base rounded-full border-2 border-white/70 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Left Bowl */}
        <div className="absolute bottom-0 left-8 w-80 h-64 flex flex-col items-center transition-transform duration-500 ease-in-out z-0"
          style={{ transform: getLeftBowlPosition() }}>
          <div className="w-2 h-32 bg-scale-arm" />
          <div className="relative w-full h-80 bg-gradient-to-b from-scale-bowl to-scale-arm rounded-b-[50%] shadow-xl border-4 border-scale-arm overflow-hidden">
            {/* rim */}
            <div className="absolute -top-2 left-2 right-2 h-3 bg-scale-base rounded-t-md border-t-2 border-background/60" />
            {/* inner shine */}
            <div className="absolute inset-2 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-b-[45%] pointer-events-none" />
            {/* Left bowl content area - larger space */}
            <div className="absolute inset-0 p-3 flex flex-wrap gap-1 items-end justify-center content-end pb-4">
              {children && (children as any)[0]}
            </div>
          </div>
        </div>

        {/* Right Bowl */}
        <div className="absolute bottom-0 right-8 w-80 h-64 flex flex-col items-center transition-transform duration-500 ease-in-out z-0"
          style={{ transform: getRightBowlPosition() }}>
          <div className="w-2 h-32 bg-scale-arm" />
          <div className="relative w-full h-80 bg-gradient-to-b from-scale-bowl to-scale-arm rounded-b-[50%] shadow-xl border-4 border-scale-arm overflow-hidden">
             {/* rim */}
             <div className="absolute -top-2 left-2 right-2 h-3 bg-scale-base rounded-t-md border-t-2 border-background/60" />
             {/* inner shine */}
             <div className="absolute inset-2 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-b-[45%] pointer-events-none" />
             {/* Right bowl content area - larger space */}
             <div className="absolute inset-0 p-3 flex flex-wrap gap-1 items-end justify-center content-end pb-4">
              {children && (children as any)[1]}
             </div>
           </div>
         </div>

         {/* base highlight */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-52 h-2 bg-white/10 rounded-full blur-sm opacity-80 z-0" />
       </div>
     </div>
   );
 };
