import { useState } from "react";
import { cn } from "@/lib/utils";

interface DraggableObjectProps {
  id: string;
  value: number;
  image: string;
  label: string;
  onDragStart: (id: string, value: number) => void;
  className?: string;
}

export const DraggableObject = ({
  id,
  value,
  image,
  label,
  onDragStart,
  className,
}: DraggableObjectProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("objectId", id);
    e.dataTransfer.setData("value", value.toString());
    onDragStart(id, value);
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
        "cursor-grab active:cursor-grabbing transition-all duration-200",
        isDragging && "opacity-50 scale-95",
        "hover:scale-105",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 p-3 bg-card rounded-lg shadow-md border-2 border-border hover:border-primary transition-colors">
        <img src={image} alt={label} className="w-16 h-16 object-contain" />
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">Nilai: {value}</span>
      </div>
    </div>
  );
};
