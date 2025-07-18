import { useState } from "react";
import SensitivityForm from "@/components/sensitivity-form";
import ResultsDisplay from "@/components/results-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, Target, Zap, Trophy, Smartphone } from "lucide-react";
import { type SensitivitySettings } from "@/lib/sensitivity-calculator";

export default function Home() {
  const [sensitivitySettings, setSensitivitySettings] = useState<SensitivitySettings | null>(null);

  const handleResults = (settings: SensitivitySettings) => {
    setSensitivitySettings(settings);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById("results-section");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const features = [
    {
      icon: Target,
      title: "🎯 Device-Specific",
      description: "Optimized settings based on your exact device specifications for maximum performance."
    },
    {
      icon: Zap,
      title: "⚡ Instant Results",
      description: "Get professional-grade sensitivity settings in seconds, no guesswork required."
    },
    {
      icon: Trophy,
      title: "🏆 Pro Player Tested",
      description: "Settings based on professional player configurations and community feedback."
    },
    {
      icon: Smartphone,
      title: "📱 Mobile Optimized",
      description: "Perfect for mobile gaming with touch-friendly interface and quick copy functionality."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-orbitron font-black text-primary mb-2 animate-in slide-in-from-top duration-500">
            🎮 FF SENSITIVITY OPTIMIZER
          </h1>
          <p className="text-muted-foreground text-lg animate-in slide-in-from-top duration-500 delay-200">
            Generate Perfect Free Fire Settings for Your Device
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Form Section */}
        <div className="animate-in slide-in-from-bottom duration-500">
          <SensitivityForm onResults={handleResults} />
        </div>

        {/* Results Section */}
        {sensitivitySettings && (
          <div id="results-section" className="animate-in slide-in-from-bottom duration-500">
            <ResultsDisplay settings={sensitivitySettings} />
          </div>
        )}

        {/* Info Section */}
        <Card className="gaming-border bg-card/30 backdrop-blur-sm animate-in slide-in-from-bottom duration-500 delay-300">
          <CardHeader>
            <CardTitle className="text-xl font-orbitron font-bold text-primary flex items-center gap-3">
              <InfoIcon className="h-6 w-6" />
              🔥 Why Use Our Optimizer?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="space-y-2 animate-in slide-in-from-bottom duration-300"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-primary" />
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 px-4 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 FF Sensitivity Optimizer. Get better at Free Fire with optimized settings.
          </p>
          <p className="text-xs mt-2">
            Not affiliated with Garena. Free Fire is a trademark of Garena International I Pte. Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
