import { useState } from "react";
import { BalanceScale } from "@/components/BalanceScale";
import { DraggableObject } from "@/components/DraggableObject";
import { NumberBlock } from "@/components/NumberBlock";
import { DroppableArea, DroppedItem } from "@/components/DroppableArea";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Case 3: ax+b=c (Packaged meat=2, Red beef=1)
const Case3 = () => {
  const navigate = useNavigate();
  const [leftItems, setLeftItems] = useState<DroppedItem[]>([]);
  const [rightItems, setRightItems] = useState<DroppedItem[]>([]);

  const packagedMeatImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='15' y='25' width='70' height='50' fill='%23333' rx='3'/%3E%3Crect x='20' y='30' width='60' height='40' fill='%23fff' rx='2'/%3E%3Cpath d='M25,35 Q30,45 35,35 Q40,50 45,35 Q50,45 55,35 Q60,50 65,35 Q70,45 75,35 L75,65 Q70,55 65,65 Q60,50 55,65 Q50,55 45,65 Q40,50 35,65 Q30,55 25,65 Z' fill='%23e8505b'/%3E%3Cpath d='M30,40 Q35,50 40,40 Q45,55 50,40 Q55,50 60,40 Q65,55 70,40' fill='%23f7b5b9' opacity='0.7'/%3E%3C/svg%3E";
  const redBeefImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M30,40 Q35,30 45,35 Q55,30 60,35 Q70,30 75,45 Q75,60 65,65 Q55,70 45,65 Q35,70 25,60 Q20,50 30,40 Z' fill='%23c0392b'/%3E%3Cpath d='M35,45 Q40,40 45,43 Q50,40 55,45 Q60,42 63,50' fill='%23e74c3c' opacity='0.7'/%3E%3Cellipse cx='45' cy='50' rx='8' ry='5' fill='%23fff' opacity='0.3'/%3E%3C/svg%3E";

  const calculateWeight = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const handleDrop = (side: "left" | "right") => (item: DroppedItem) => {
    const newItem = { ...item };
    
    if (item.type === "object") {
      if (item.id === "packaged") {
        newItem.image = packagedMeatImage;
        newItem.label = "Daging Kemasan";
      } else if (item.id === "beef") {
        newItem.image = redBeefImage;
        newItem.label = "Daging Sapi";
      }
    }

    if (side === "left") {
      setLeftItems([...leftItems, newItem]);
    } else {
      setRightItems([...rightItems, newItem]);
    }
  };

  const handleRemove = (side: "left" | "right") => (index: number) => {
    if (side === "left") {
      setLeftItems(leftItems.filter((_, i) => i !== index));
    } else {
      setRightItems(rightItems.filter((_, i) => i !== index));
    }
  };

  const handleReset = () => {
    setLeftItems([]);
    setRightItems([]);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Kasus 3</h1>
            <p className="text-lg text-muted-foreground">Bentuk: ax + b = c</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Beranda
            </Button>
            <Button onClick={handleReset} variant="destructive" size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <BalanceScale
            leftWeight={calculateWeight(leftItems)}
            rightWeight={calculateWeight(rightItems)}
          >
            <DroppableArea
              items={leftItems}
              onDrop={handleDrop("left")}
              onRemove={handleRemove("left")}
              side="left"
            />
            <DroppableArea
              items={rightItems}
              onDrop={handleDrop("right")}
              onRemove={handleRemove("right")}
              side="right"
            />
          </BalanceScale>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Objek</h3>
            <div className="flex gap-4 justify-center">
              <DraggableObject
                id="packaged"
                value={2}
                image={packagedMeatImage}
                label="Daging Kemasan"
                onDragStart={() => {}}
              />
              <DraggableObject
                id="beef"
                value={1}
                image={redBeefImage}
                label="Daging Sapi"
                onDragStart={() => {}}
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Blok Angka</h3>
            <div className="grid grid-cols-5 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <NumberBlock key={num} number={num} onDragStart={() => {}} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-primary/10 p-6 rounded-xl border-2 border-primary/20">
          <h3 className="text-lg font-bold mb-2 text-foreground">Petunjuk:</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Seret objek atau angka ke mangkuk timbangan</li>
            <li>Daging kemasan bernilai 2</li>
            <li>Daging sapi merah bernilai 1</li>
            <li>Coba seimbangkan kedua sisi timbangan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Case3;
