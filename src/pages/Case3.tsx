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
  const [packagedGuess, setPackagedGuess] = useState<number | ''>('');
  const [beefGuess, setBeefGuess] = useState<number | ''>('');
  const [guessResult, setGuessResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error' | null>(null);

  const packagedMeatImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='18' y='28' width='64' height='44' rx='6' fill='%23f7f1f0' stroke='%23e1b7b9' stroke-width='2'/%3E%3Cellipse cx='50' cy='50' rx='22' ry='16' fill='%23e8505b'/%3E%3Cpath d='M28 40 Q40 30 50 40 Q60 30 72 40' fill='%23f7b5b9' opacity='0.6'/%3E%3Ctext x='50' y='72' font-size='10' text-anchor='middle' fill='%23333' font-weight='700'%3E%F0%9F%A5%A3%3C/text%3E%3C/svg%3E";
  const redBeefImage = '/meat.png'

  const calculateWeight = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  const handleDrop = (side: "left" | "right") => (item: DroppedItem) => {
    const newItem = { ...item };
    
    if (item.type === "object") {
      if (item.id === "packaged") {
        newItem.image = packagedMeatImage;
        newItem.label = "Daging Mika";
      } else if (item.id === "beef") {
        newItem.image = redBeefImage;
        newItem.label = "Daging kantongan";
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
    setPackagedGuess('');
    setBeefGuess('');
    setGuessResult(null);
  };

  const computeWeightWithGuesses = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => {
      if (item.type === 'object') {
        if (item.id === 'packaged') return sum + (typeof packagedGuess === 'number' ? packagedGuess : 0);
        if (item.id === 'beef') return sum + (typeof beefGuess === 'number' ? beefGuess : 0);
        return sum;
      }
      return sum + item.value;
    }, 0);
  };

  const checkGuesses = () => {
    // Validate against known correct values for Case 3
    const expectedPackaged = 2;
    const expectedBeef = 1;
    const packagedCorrect = typeof packagedGuess === 'number' && packagedGuess === expectedPackaged;
    const beefCorrect = typeof beefGuess === 'number' && beefGuess === expectedBeef;
    const correct = packagedCorrect && beefCorrect;
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

        {/* Tebak Nilai Objek */}
        <div className="mb-6 bg-card p-4 rounded-lg border-2 border-border flex items-end gap-4 col-span-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Daging Kemasan:</label>
            <input type="number" value={packagedGuess === '' ? '' : packagedGuess} onChange={(e) => setPackagedGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Daging kantongan:</label>
            <input type="number" value={beefGuess === '' ? '' : beefGuess} onChange={(e) => setBeefGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
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
                id="packaged"
                value={2}
                image={packagedMeatImage}
                label="Daging Mika"
                onDragStart={() => {}}
              />
              <DraggableObject
                id="beef"
                value={1}
                image={redBeefImage}
                label="Daging kantongan"
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
            {/* <li>Daging kemasan bernilai 2</li>
            <li>Daging sapi merah bernilai 1</li> */}
            <li>Coba seimbangkan kedua sisi timbangan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Case3;
