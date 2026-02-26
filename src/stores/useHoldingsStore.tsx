import { create } from 'zustand';
import type { Holding } from '../types/stock.types';
import { holdings as initialHoldings } from '../data/stockData';

interface HoldingsStore {
  holdings: Holding[];
  compareHoldings: Holding[];
  toggleHoldingCompare: (holding: Holding) => void;
  clearHoldingCompare: () => void;
}

export const useHoldingsStore = create<HoldingsStore>((set) => ({
  holdings: initialHoldings as Holding[],
  compareHoldings: [] as Holding[],

  toggleHoldingCompare: (holding) => set((state) => {
    const isAlreadyIn = state.compareHoldings.some((h) => h.id === holding.id);
    
    if (isAlreadyIn) {
      return { 
        compareHoldings: state.compareHoldings.filter((h) => h.id !== holding.id) 
      };
    }
    
    if (state.compareHoldings.length >= 4) {
      alert('Max 4 holdings for comparison');
      return state;
    }

    return { compareHoldings: [...state.compareHoldings, holding] };
  }),

  clearHoldingCompare: () => set({ compareHoldings: [] }),
}));