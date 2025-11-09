import { useState } from "react";
import { BalanceScale } from "@/components/BalanceScale";
import { DraggableObject } from "@/components/DraggableObject";
import { NumberBlock } from "@/components/NumberBlock";
import { DroppableArea, DroppedItem } from "@/components/DroppableArea";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Case 2: ax=c (Cardboard=5, Weight=1)
const Case2 = () => {
  const navigate = useNavigate();
  const [leftItems, setLeftItems] = useState<DroppedItem[]>([]);
  const [rightItems, setRightItems] = useState<DroppedItem[]>([]);

  const cardboardImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='20' y='20' width='60' height='60' fill='%23CD853F' rx='4'/%3E%3Crect x='25' y='25' width='50' height='50' fill='%23DEB887' rx='3'/%3E%3Cline x1='30' y1='50' x2='70' y2='50' stroke='%23A0522D' stroke-width='2'/%3E%3Cline x1='50' y1='30' x2='50' y2='70' stroke='%23A0522D' stroke-width='2'/%3E%3C/svg%3E";
  const weightImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='55' rx='35' ry='30' fill='%23FF8C42'/%3E%3Cellipse cx='50' cy='50' rx='30' ry='25' fill='%23FFB366'/%3E%3Cellipse cx='50' cy='35' rx='15' ry='12' fill='%23FFDAB3'/%3E%3Ctext x='50' y='58' text-anchor='middle' font-size='20' font-weight='bold' fill='%23000'%3E1kg%3C/text%3E%3C/svg%3E";

  const calculateWeight = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const handleDrop = (side: "left" | "right") => (item: DroppedItem) => {
    const newItem = { ...item };
    
    if (item.type === "object") {
      if (item.id === "cardboard") {
        newItem.image = cardboardImage;
        newItem.label = "Kardus";
      } else if (item.id === "weight") {
        newItem.image = weightImage;
        newItem.label = "Anak Timbangan";
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Kasus 2</h1>
            <p className="text-lg text-muted-foreground">Bentuk: ax = c</p>
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
                id="cardboard"
                value={5}
                image={cardboardImage}
                label="Kardus"
                onDragStart={() => {}}
              />
              <DraggableObject
                id="weight"
                value={1}
                image={weightImage}
                label="Anak Timbangan"
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
            <li>Kardus coklat bernilai 5</li>
            <li>Anak timbangan bernilai 1</li>
            <li>Coba seimbangkan kedua sisi timbangan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Case2;
