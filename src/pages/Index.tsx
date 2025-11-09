import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Scale, BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Scale className="w-20 h-20 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Timbangan Persamaan Linear
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Media pembelajaran interaktif untuk memahami konsep Persamaan Linear Satu Variabel (PLSV) 
            menggunakan analogi timbangan ohaus dua lengan
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary" 
                onClick={() => navigate("/case1")}>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary">1</span>
              </div>
              <CardTitle className="text-2xl">Kasus 1</CardTitle>
              <CardDescription className="text-lg">a + x = c</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pelajari persamaan linear dasar dengan penjumlahan konstanta dan variabel
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Apel (Konstanta = 1)</span> */}
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Kantong Hitam (Variabel = 3)</span> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary" 
                onClick={() => navigate("/case2")}>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <CardTitle className="text-2xl">Kasus 2</CardTitle>
              <CardDescription className="text-lg">ax = c</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Eksplorasi persamaan dengan koefisien pada variabel
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Kardus (Variabel = 5)</span> */}
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Anak Timbangan (Konstanta = 1)</span> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary" 
                onClick={() => navigate("/case3")}>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <CardTitle className="text-2xl">Kasus 3</CardTitle>
              <CardDescription className="text-lg">ax + b = c</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Kuasai persamaan linear lengkap dengan koefisien dan konstanta
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Daging Kemasan (Variabel = 2)</span> */}
                </div>
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-secondary rounded-full" /> */}
                  {/* <span>Daging Sapi (Konstanta = 1)</span> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Fitur Pembelajaran</h2>
            <p className="text-muted-foreground">
              Alat interaktif yang membantu memvisualisasikan konsep matematika
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-md border-2 border-border">
              <h3 className="text-xl font-bold mb-2 text-foreground">Drag & Drop Interaktif</h3>
              <p className="text-muted-foreground">
                Seret dan letakkan objek ke timbangan dengan mudah untuk melihat perubahan langsung
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border-2 border-border">
              <h3 className="text-xl font-bold mb-2 text-foreground">Animasi Visual</h3>
              <p className="text-muted-foreground">
                Timbangan beranimasi menunjukkan keseimbangan secara visual dan intuitif
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border-2 border-border">
              <h3 className="text-xl font-bold mb-2 text-foreground">Tiga Tingkat Kesulitan</h3>
              <p className="text-muted-foreground">
                Mulai dari dasar hingga persamaan kompleks dengan bertahap
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border-2 border-border">
              <h3 className="text-xl font-bold mb-2 text-foreground">Feedback Langsung</h3>
              <p className="text-muted-foreground">
                Lihat apakah persamaan seimbang atau tidak dengan indikator jelas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
