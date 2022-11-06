import { ReactNode } from "react";

export interface LayoutProps {
  children?: ReactNode;
}
export interface MapParameter {
  latitude: number;
  longitude: number;
  zoom?: number;
}
