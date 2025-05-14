'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ShapeInfo {
  shapeName: string;
  sampleText: string;
  mirrorScore: number;
  roastText: string;
  voiceUrl: string;
}

interface ShapeContextType {
  shapeInfo: ShapeInfo;
  updateShape: (newShape: Partial<ShapeInfo>) => void;
  resetShape: () => void;
}

const defaultShapeInfo: ShapeInfo = {
  shapeName: '',
  sampleText: '',
  mirrorScore: 0,
  roastText: '',
  voiceUrl: '',
};

const ShapeContext = createContext<ShapeContextType | undefined>(undefined);

export function ShapeProvider({ children }: { children: ReactNode }) {
  const [shapeInfo, setShapeInfo] = useState<ShapeInfo>(defaultShapeInfo);

  const updateShape = (newShape: Partial<ShapeInfo>) => {
    setShapeInfo(current => ({
      ...current,
      ...newShape,
    }));
  };

  const resetShape = () => {
    setShapeInfo(defaultShapeInfo);
  };

  return (
    <ShapeContext.Provider value={{ shapeInfo, updateShape, resetShape }}>
      {children}
    </ShapeContext.Provider>
  );
}

export function useShape() {
  const context = useContext(ShapeContext);
  if (context === undefined) {
    throw new Error('useShape must be used within a ShapeProvider');
  }
  return context;
} 