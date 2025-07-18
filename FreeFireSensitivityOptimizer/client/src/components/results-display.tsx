import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Clipboard, CheckCircle } from "lucide-react";
import { type SensitivitySettings, formatSettingsForCopy } from "@/lib/sensitivity-calculator";

interface ResultsDisplayProps {
  settings: SensitivitySettings;
}

export default function ResultsDisplay({ settings }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copySettings = async () => {
    const settingsText = formatSettingsForCopy(settings);
    
    try {
      await navigator.clipboard.writeText(settingsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = settingsText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const settingsData = [
    {
      label: "🔫 General",
      value: settings.general,
      color: "border-l-primary",
      textColor: "text-primary"
    },
    {
      label: "🔴 Red Dot",
      value: settings.redDot,
      color: "border-l-red-500",
      textColor: "text-red-400"
    },
    {
      label: "🔭 2x Scope",
      value: settings.scope2x,
      color: "border-l-blue-500",
      textColor: "text-blue-400"
    },
    {
      label: "🕵️‍♂️ 4x Scope",
      value: settings.scope4x,
      color: "border-l-purple-500",
      textColor: "text-purple-400"
    },
    {
      label: "🎯 AWM Scope",
      value: settings.awm,
      color: "border-l-yellow-500",
      textColor: "text-yellow-400"
    }
  ];

  return (
    <Card className="gaming-border bg-card/50 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron font-bold text-primary flex items-center gap-3">
          <Target className="h-6 w-6" />
          🎯 RECOMMENDED SENSITIVITY
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {settingsData.map((item, index) => (
            <div 
              key={item.label}
              className={`flex justify-between items-center bg-background/50 rounded-lg p-4 border-l-4 ${item.color} animate-in slide-in-from-left duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-semibold">{item.label}:</span>
              <span className={`text-2xl font-orbitron font-bold ${item.textColor}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <Button 
          onClick={copySettings}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-orbitron font-bold py-4 text-lg uppercase tracking-wide transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl glow-gold"
        >
          {copied ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              Settings Copied!
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-5 w-5" />
              📋 Copy Settings
            </>
          )}
        </Button>
        
        {copied && (
          <div className="text-center text-green-400 font-semibold animate-in fade-in duration-300">
            <CheckCircle className="inline mr-2 h-5 w-5" />
            Settings copied to clipboard!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
