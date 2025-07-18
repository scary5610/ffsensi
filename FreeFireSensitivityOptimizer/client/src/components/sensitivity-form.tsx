import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Rocket } from "lucide-react";
import { calculateSensitivity, type DeviceSpecs, type SensitivitySettings } from "@/lib/sensitivity-calculator";

const formSchema = z.object({
  ram: z.string().min(1, "Please select your device RAM"),
  deviceType: z.string().min(1, "Please select your device type"),
  playStyle: z.string().min(1, "Please select your play style"),
  gyroscope: z.string().min(1, "Please select gyroscope preference"),
});

interface SensitivityFormProps {
  onResults: (settings: SensitivitySettings) => void;
}

export default function SensitivityForm({ onResults }: SensitivityFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<DeviceSpecs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ram: "",
      deviceType: "",
      playStyle: "",
      gyroscope: "",
    },
  });

  const onSubmit = async (values: DeviceSpecs) => {
    setIsGenerating(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const settings = calculateSensitivity(values);
    onResults(settings);
    setIsGenerating(false);
  };

  return (
    <Card className="gaming-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron font-bold text-primary flex items-center gap-3">
          <Smartphone className="h-6 w-6" />
          📱 SELECT YOUR DEVICE INFO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    🔹 Device RAM
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border focus:ring-primary">
                        <SelectValue placeholder="Select RAM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2GB">2GB</SelectItem>
                      <SelectItem value="3GB">3GB</SelectItem>
                      <SelectItem value="4GB+">4GB+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    🔹 Device Type
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border focus:ring-primary">
                        <SelectValue placeholder="Select Device Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low-End">Low-End</SelectItem>
                      <SelectItem value="Mid-End">Mid-End</SelectItem>
                      <SelectItem value="High-End">High-End</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="playStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    🔹 Play Style
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border focus:ring-primary">
                        <SelectValue placeholder="Select Play Style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Aggressive">Aggressive</SelectItem>
                      <SelectItem value="Balanced">Balanced</SelectItem>
                      <SelectItem value="Sniper">Sniper</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gyroscope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    🔹 Gyroscope
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background border-border focus:ring-primary">
                        <SelectValue placeholder="Do you use Gyroscope?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-400 text-primary-foreground font-orbitron font-bold py-4 text-lg uppercase tracking-wide transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl glow-cyan"
              disabled={isGenerating}
            >
              <Rocket className="mr-2 h-5 w-5" />
              {isGenerating ? "Generating..." : "Generate Best Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
