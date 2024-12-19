declare module "web-vitals" {
  export function onCLS(callback: (metric: CLSMetric) => void): void;
  export function onFCP(callback: (metric: FCPMetric) => void): void;
  export function onFID(callback: (metric: FIDMetric) => void): void;
  export function onLCP(callback: (metric: LCPMetric) => void): void;
  export function onTTFB(callback: (metric: TTFBMetric) => void): void;

  export interface CLSMetric {
    name: "CLS";
    delta: number;
    id: string;
  }

  export interface FCPMetric {
    name: "FCP";
    startTime: number;
  }

  export interface FIDMetric {
    name: "FID";
    duration: number;
  }

  export interface LCPMetric {
    name: "LCP";
    startTime: number;
    element: Element | null;
  }

  export interface TTFBMetric {
    name: "TTFB";
    value: number;
  }
}
