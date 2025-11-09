import { useState } from "react";
import { BalanceScale } from "@/components/BalanceScale";
import { DraggableObject } from "@/components/DraggableObject";
import { NumberBlock } from "@/components/NumberBlock";
import { DroppableArea, DroppedItem } from "@/components/DroppableArea";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Case 1: a+x=c (Apple=1, Black bag=3)
const Case1 = () => {
  const navigate = useNavigate();
  const [leftItems, setLeftItems] = useState<DroppedItem[]>([]);
  const [rightItems, setRightItems] = useState<DroppedItem[]>([]);

  const appleImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='55' r='35' fill='%23e74c3c'/%3E%3Cellipse cx='50' cy='55' rx='35' ry='30' fill='%23c0392b'/%3E%3Crect x='48' y='20' width='4' height='15' fill='%238b4513' rx='2'/%3E%3Cellipse cx='45' cy='25' rx='8' ry='4' fill='%2327ae60' transform='rotate(-20 45 25)'/%3E%3C/svg%3E";
  const bagImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20,30 L25,90 L75,90 L80,30 Z' fill='%23654321'/%3E%3Cpath d='M20,30 L30,25 L70,25 L80,30 Z' fill='%238B6914'/%3E%3Crect x='15' y='28' width='70' height='5' fill='%238B6914' rx='2'/%3E%3C/svg%3E";

  const calculateWeight = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const handleDrop = (side: "left" | "right") => (item: DroppedItem) => {
    const newItem = { ...item };
    
    // Set image and label based on object ID
    if (item.type === "object") {
      if (item.id === "apple") {
        newItem.image = appleImage;
        newItem.label = "Apel";
      } else if (item.id === "bag") {
        newItem.image = bagImage;
        newItem.label = "Kantong";
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Kasus 1</h1>
            <p className="text-lg text-muted-foreground">Bentuk: a + x = c</p>
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

        {/* Balance Scale */}
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

        {/* Objects and Numbers */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Objects */}
          <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Objek</h3>
            <div className="flex gap-4 justify-center">
              <DraggableObject
                id="apple"
                value={1}
                image={appleImage}
                label="Apel"
                onDragStart={() => {}}
              />
              <DraggableObject
                id="bag"
                value={3}
                image={bagImage}
                label="Kantong"
                onDragStart={() => {}}
              />
            </div>
          </div>

          {/* Number Blocks */}
          <div className="bg-card p-6 rounded-xl shadow-lg border-2 border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Blok Angka</h3>
            <div className="grid grid-cols-5 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <NumberBlock key={num} number={num} onDragStart={() => {}} />
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-primary/10 p-6 rounded-xl border-2 border-primary/20">
          <h3 className="text-lg font-bold mb-2 text-foreground">Petunjuk:</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Seret objek atau angka ke mangkuk timbangan</li>
            <li>Apel bernilai 1</li>
            <li>Kantong hitam bernilai 3</li>
            <li>Coba seimbangkan kedua sisi timbangan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Case1;
