import { useState } from "react";
import { cn } from "@/lib/utils";

interface NumberBlockProps {
  number: number;
  onDragStart: (value: number) => void;
}

export const NumberBlock = ({ number, onDragStart }: NumberBlockProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("number", number.toString());
    onDragStart(number);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "w-14 h-14 flex items-center justify-center",
        "bg-primary text-primary-foreground rounded-lg shadow-md",
        "font-bold text-2xl cursor-grab active:cursor-grabbing",
        "transition-all duration-200 hover:scale-110 hover:shadow-lg",
        isDragging && "opacity-50 scale-95",
        "border-2 border-primary-foreground/20"
      )}
    >
      {number}
    </div>
  );
};
