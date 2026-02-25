import { create } from 'zustand';
import type { Position } from '../types/stock.types';
import { positions as initialPositions } from '../data/stockData';

interface PositionsStore {
  positions: Position[];
  comparePositions: Position[];
  addPosition: (newPos: Omit<Position, 'id'>) => void;
  removePosition: (id: string) => void;
  togglePositionCompare: (pos: Position) => void;
  clearPositionCompare: () => void;
}

export const usePositionsStore = create<PositionsStore>((set) => ({
  // Fix for never[] error: Explicitly cast empty arrays
  positions: initialPositions as Position[],
  comparePositions: [] as Position[],

  addPosition: (newPos) => set((state) => {
    const existingIdx = state.positions.findIndex(p => p.symbol === newPos.symbol);
    if (existingIdx !== -1) {
      const existing = state.positions[existingIdx];
      const totalQty = existing.qty + newPos.qty;
      const weightedAvg = ((existing.qty * existing.avgPrice) + (newPos.qty * newPos.avgPrice)) / totalQty;
      const updated = [...state.positions];
      updated[existingIdx] = { ...existing, qty: totalQty, avgPrice: weightedAvg };
      return { positions: updated };
    }
    return { 
      positions: [...state.positions, { ...newPos, id: `pos-${Date.now()}` } as Position] 
    };
  }),

  removePosition: (id) => set((state) => ({
    positions: state.positions.filter(p => p.id !== id),
    comparePositions: state.comparePositions.filter(p => p.id !== id)
  })),

  togglePositionCompare: (pos) => set((state) => {
    const isAlreadyIn = state.comparePositions.some((p) => p.id === pos.id);
    if (isAlreadyIn) {
      return { comparePositions: state.comparePositions.filter((p) => p.id !== pos.id) };
    }
    if (state.comparePositions.length >= 4) {
      alert('Max 4 positions for comparison');
      return state;
    }
    return { comparePositions: [...state.comparePositions, pos] };
  }),

  clearPositionCompare: () => set({ comparePositions: [] }),
}));