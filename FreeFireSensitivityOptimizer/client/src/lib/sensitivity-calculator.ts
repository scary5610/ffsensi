export interface DeviceSpecs {
  ram: string;
  deviceType: string;
  playStyle: string;
  gyroscope: string;
}

export interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  awm: number;
}

export function calculateSensitivity(specs: DeviceSpecs): SensitivitySettings {
  // Base settings for balanced gameplay
  let baseSettings: SensitivitySettings = {
    general: 90,
    redDot: 95,
    scope2x: 85,
    scope4x: 75,
    awm: 55
  };

  // RAM-based adjustments
  switch (specs.ram) {
    case "2GB":
      baseSettings.general += 5;
      baseSettings.redDot += 3;
      baseSettings.scope2x += 2;
      break;
    case "3GB":
      baseSettings.general += 2;
      baseSettings.redDot += 1;
      break;
    case "4GB+":
      baseSettings.general -= 3;
      baseSettings.redDot -= 2;
      baseSettings.awm += 5;
      baseSettings.scope4x += 3;
      break;
  }

  // Device type adjustments
  switch (specs.deviceType) {
    case "Low-End":
      baseSettings.general += 7;
      baseSettings.redDot += 5;
      baseSettings.scope2x += 3;
      baseSettings.scope4x -= 2;
      break;
    case "Mid-End":
      baseSettings.general += 2;
      baseSettings.redDot += 2;
      break;
    case "High-End":
      baseSettings.general -= 5;
      baseSettings.scope4x += 5;
      baseSettings.awm += 10;
      baseSettings.scope2x -= 2;
      break;
  }

  // Play style adjustments
  switch (specs.playStyle) {
    case "Aggressive":
      baseSettings.general += 8;
      baseSettings.redDot += 5;
      baseSettings.scope2x += 5;
      baseSettings.scope4x -= 3;
      baseSettings.awm -= 5;
      break;
    case "Balanced":
      // No major adjustments for balanced
      break;
    case "Sniper":
      baseSettings.general -= 10;
      baseSettings.redDot -= 5;
      baseSettings.scope4x += 10;
      baseSettings.awm += 15;
      baseSettings.scope2x += 3;
      break;
  }

  // Gyroscope adjustments
  if (specs.gyroscope === "Yes") {
    baseSettings.general -= 5;
    baseSettings.redDot -= 3;
    baseSettings.scope2x -= 2;
    baseSettings.scope4x += 2;
    baseSettings.awm += 3;
  }

  // Ensure values stay within reasonable bounds (30-100)
  Object.keys(baseSettings).forEach(key => {
    const typedKey = key as keyof SensitivitySettings;
    baseSettings[typedKey] = Math.max(30, Math.min(100, baseSettings[typedKey]));
  });

  return baseSettings;
}

export function formatSettingsForCopy(settings: SensitivitySettings): string {
  return `FF Sensitivity Settings:
🔫 General: ${settings.general}
🔴 Red Dot: ${settings.redDot}
🔭 2x Scope: ${settings.scope2x}
🕵️‍♂️ 4x Scope: ${settings.scope4x}
🎯 AWM Scope: ${settings.awm}

Generated by FF Sensitivity Optimizer`;
}
