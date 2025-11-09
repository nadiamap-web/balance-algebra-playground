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
  const [cardboardGuess, setCardboardGuess] = useState<number | ''>('');
  const [weightGuess, setWeightGuess] = useState<number | ''>('');
  const [guessResult, setGuessResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error' | null>(null);

  const cardboardImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='15' y='25' width='70' height='50' fill='%23D2A679' rx='6' stroke='%23A5693F' stroke-width='2'/%3E%3Crect x='20' y='30' width='60' height='40' fill='%23C6863B' rx='4'/%3E%3Cpath d='M20 30 L80 30 L50 10 Z' fill='%23B97A2B' opacity='0.85'/%3E%3Cline x1='30' y1='40' x2='70' y2='40' stroke='%238B5A2B' stroke-width='2' stroke-linecap='round'/%3E%3Ctext x='50' y='60' font-size='12' text-anchor='middle' fill='%236B3F21' font-weight='700'%3E%F0%9F%93%A6%3C/text%3E%3C/svg%3E";
  const weightImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cellipse cx='50' cy='60' rx='30' ry='18' fill='%232D3748'/%3E%3Cellipse cx='50' cy='54' rx='24' ry='14' fill='%234A5568'/%3E%3Crect x='38' y='28' width='24' height='12' rx='6' fill='%232D3748'/%3E%3Ccircle cx='50' cy='52' r='4' fill='%23EDF2F7'/%3E%3Ctext x='50' y='64' font-size='10' text-anchor='middle' fill='%23fff' font-weight='700'%3E1kg%3C/text%3E%3C/svg%3E";

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
    setCardboardGuess('');
    setWeightGuess('');
    setGuessResult(null);
  };

  const computeWeightWithGuesses = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => {
      if (item.type === 'object') {
        if (item.id === 'cardboard') return sum + (typeof cardboardGuess === 'number' ? cardboardGuess : 0);
        if (item.id === 'weight') return sum + (typeof weightGuess === 'number' ? weightGuess : 0);
        return sum;
      }
      return sum + item.value;
    }, 0);
  };

  const checkGuesses = () => {
    // Validate against known correct values for Case 2
    const expectedCardboard = 5;
    const expectedWeight = 1;
    const cardboardCorrect = typeof cardboardGuess === 'number' && cardboardGuess === expectedCardboard;
    const weightCorrect = typeof weightGuess === 'number' && weightGuess === expectedWeight;
    const correct = cardboardCorrect && weightCorrect;
    setGuessResult(correct ? 'Benar — tebakan nilai objek sudah benar' : 'Salah — nilai objek tidak cocok');
    setDialogType(correct ? 'success' : 'error');
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2200);
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

        {/* Tebak Nilai Objek */}
        <div className="mb-6 bg-card p-4 rounded-lg border-2 border-border flex items-end gap-4 col-span-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Kardus:</label>
            <input type="number" value={cardboardGuess === '' ? '' : cardboardGuess} onChange={(e) => setCardboardGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Anak Timbangan:</label>
            <input type="number" value={weightGuess === '' ? '' : weightGuess} onChange={(e) => setWeightGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>
          <button onClick={checkGuesses} className="ml-2 px-3 py-1 rounded bg-primary text-primary-foreground">Cek Tebakan</button>
          {guessResult && <div className="text-sm font-medium">{guessResult}</div>}
        </div>

        {/* Animated Result Dialog */}
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-black/40" />
            <div className={`relative z-10 flex flex-col items-center space-y-3 px-6 py-8 rounded-xl shadow-xl transform transition-all duration-300 ${dialogType === 'success' ? 'bg-green-50 scale-100' : 'bg-red-50 scale-100'}`}>
              <div className="text-5xl">
                {dialogType === 'success' ? '🎉' : '❌'}
              </div>
              <div className="text-lg font-bold text-foreground">{guessResult}</div>
              <div className="flex gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Tutup otomatis...</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs animate-bounce">•</span>
                  <span className="text-xs animate-bounce" style={{ animationDelay: '100ms' }}>•</span>
                  <span className="text-xs animate-bounce" style={{ animationDelay: '200ms' }}>•</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
