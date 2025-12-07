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
  const [appleGuess, setAppleGuess] = useState<number | ''>('');
  const [bagGuess, setBagGuess] = useState<number | ''>('');
  const [guessResult, setGuessResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error' | null>(null);

  const appleImage = '/apel.png'
  const bagImage = '/bag.png'

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
    setAppleGuess('');
    setBagGuess('');
    setGuessResult(null);
  };

  const computeWeightWithGuesses = (items: DroppedItem[]) => {
    return items.reduce((sum, item) => {
      if (item.type === 'object') {
        if (item.id === 'apple') return sum + (typeof appleGuess === 'number' ? appleGuess : 0);
        if (item.id === 'bag') return sum + (typeof bagGuess === 'number' ? bagGuess : 0);
        return sum;
      }
      return sum + item.value;
    }, 0);
  };

  const checkGuesses = () => {
    // Validate against known correct values for Case 1
    const expectedApple = 1;
    const expectedBag = 3;
    const appleCorrect = typeof appleGuess === 'number' && appleGuess === expectedApple;
    const bagCorrect = typeof bagGuess === 'number' && bagGuess === expectedBag;
    const correct = appleCorrect && bagCorrect;
    setGuessResult(correct ? 'Benar — tebakan nilai objek sudah benar' : 'Salah — nilai objek tidak cocok');
    setDialogType(correct ? 'success' : 'error');
    setShowDialog(true);
    // auto hide
    setTimeout(() => setShowDialog(false), 2200);
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

        {/* Tebak Nilai Objek */}
        <div className="mb-6 bg-card p-4 rounded-lg border-2 border-border flex items-end gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm">Apel:</label>
            <input type="number" value={appleGuess === '' ? '' : appleGuess} onChange={(e) => setAppleGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Kantong:</label>
            <input type="number" value={bagGuess === '' ? '' : bagGuess} onChange={(e) => setBagGuess(e.target.value === '' ? '' : Number(e.target.value))} className="w-20 p-1 rounded border" />
          </div>
          <button onClick={checkGuesses} className="ml-2 px-3 py-1 rounded bg-primary text-primary-foreground">Cek Tebakan</button>
          {guessResult && <div className="text-sm font-medium">{guessResult}</div>}
        </div>

        {/* Animated Result Dialog */}
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            <div className="absolute inset-0 bg-black/40" />
            <div className={`relative z-10 flex flex-col items-center space-y-3 px-6 py-8 rounded-xl shadow-xl transform transition-all duration-500 ${dialogType === 'success' ? 'bg-green-50 scale-105' : 'bg-red-50 scale-95'}`}>
              {/* Decorative animated elements */}
              {dialogType === 'success' ? (
                <div className="w-40 h-24 relative flex items-center justify-center">
                  <div className="text-6xl animate-bounce">🎉</div>
                  <div className="absolute -top-4 left-4 flex gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '80ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '160ms' }} />
                  </div>
                  <div className="absolute -top-4 right-4 flex gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '40ms' }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                  </div>
                </div>
              ) : (
                <div className="w-40 h-24 flex flex-col items-center justify-center">
                  <div className="text-6xl animate-pulse">❌</div>
                </div>
              )}

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

        {/* Instructions */}
        <div className="mt-8 bg-primary/10 p-6 rounded-xl border-2 border-primary/20">
          <h3 className="text-lg font-bold mb-2 text-foreground">Petunjuk:</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Seret objek atau angka ke mangkuk timbangan</li>
            {/* <li>Apel bernilai 1</li>
            <li>Kantong hitam bernilai 3</li> */}
            <li>Coba seimbangkan kedua sisi timbangan!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Case1;
