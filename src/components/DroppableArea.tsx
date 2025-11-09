import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface DroppedItem {
  id: string;
  value: number;
  type: "object" | "number";
  image?: string;
  label?: string;
}

interface DroppableAreaProps {
  items: DroppedItem[];
  onDrop: (item: DroppedItem) => void;
  onRemove: (index: number) => void;
  side: "left" | "right";
}

export const DroppableArea = ({ items, onDrop, onRemove, side }: DroppableAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const objectId = e.dataTransfer.getData("objectId");
    const number = e.dataTransfer.getData("number");

    if (objectId) {
      // Handle object drop
      const value = parseInt(e.dataTransfer.getData("value"));
      onDrop({
        id: objectId,
        value,
        type: "object",
        image: "", // Will be set by parent
        label: "", // Will be set by parent
      });
    } else if (number) {
      // Handle number drop
      onDrop({
        id: `number-${Date.now()}`,
        value: parseInt(number),
        type: "number",
      });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "min-h-[120px] transition-all duration-200",
        isDragOver && "ring-4 ring-primary ring-opacity-50"
      )}
    >
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="relative group">
            {item.type === "object" ? (
              <div className="flex flex-col items-center gap-1 p-2 bg-card/80 rounded-lg shadow-sm">
                <img src={item.image} alt={item.label} className="w-12 h-12 object-contain" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-lg shadow-md font-bold text-xl">
                {item.value}
              </div>
            )}
            <button
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
