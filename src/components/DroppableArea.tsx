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
        "w-full h-full flex flex-wrap gap-1 items-end justify-center content-end transition-all duration-200",
        isDragOver && "ring-2 ring-primary ring-opacity-50 rounded-lg"
      )}
    >
      {items.map((item, index) => (
        <div key={`${item.id}-${index}`} className="relative group">
          {item.type === "object" ? (
            <div className={cn(
              "w-10 h-10 p-0.5 bg-transparent rounded-md flex items-center justify-center",
              item.id === "bag" && "scale-[200%]",
              item.id === "cardboard" && "scale-[300%]",
              item.id === "beef" && "scale-[200%]"
            )}>
              <img src={item.image} alt={item.label || ""} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-md shadow-md font-bold text-base">
              {item.value}
            </div>
          )}
          <button
            onClick={() => onRemove(index)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110 z-20"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
