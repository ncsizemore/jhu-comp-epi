declare module 'react-simple-maps' {
  import { ComponentType } from 'react';
  
  export interface Geography {
    rsmKey: string;
    properties: Record<string, unknown>;
    [key: string]: unknown;
  }
  
  export interface ComposableMapProps {
    children?: React.ReactNode;
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
  }
  
  export interface GeographiesProps {
    children: (props: { geographies: Geography[] }) => React.ReactNode;
    geography: string;
  }
  
  export interface GeographyProps {
    geography: Geography;
    className?: string;
    style?: Record<string, unknown>;
    onClick?: (event: React.MouseEvent) => void;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }
  
  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  }
  
  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
}
