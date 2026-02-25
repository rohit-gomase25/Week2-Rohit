import { create } from 'zustand';
import type { Stock, Position } from '../types/stock.types';
import { stocks as allStocksData, positions as initialPositions } from '../data/stockData';

interface StockStore {
  allStocks: Stock[];
  positions: Position[];
  searchQuery: string;
  sectorFilter: string;
  selectedStock: Stock | null;
  filteredStocks: Stock[];
  compareList: Stock[];
  comparePositions: Position[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSectorFilter: (sector: string) => void;
  setSelectedStock: (stock: Stock | null) => void;
  toggleCompare: (stock: Stock) => void;
  clearCompare: () => void;
  togglePositionCompare: (pos: Position) => void;
  clearPositionCompare: () => void;

  // CRUD Actions
  addPosition: (newPos: Omit<Position, 'id'>) => void;
  removePosition: (id: string) => void;
  updatePosition: (id: string, updates: Partial<Position>) => void;
}

// Pure helper function for filtering
function computeFiltered(stocks: Stock[], query: string, sector: string): Stock[] {
  return stocks.filter((stock) => {
    const q = query.toLowerCase();
    const matchesSearch = stock.symbol.toLowerCase().includes(q) || stock.name.toLowerCase().includes(q);
    const matchesSector = sector === '' || stock.sector === sector;
    return matchesSearch && matchesSector;
  });
}

export const useStockStore = create<StockStore>((set, get) => ({
  // Initial State - Explicitly typed to avoid 'never[]' inference
  allStocks: allStocksData,
  positions: initialPositions as Position[],
  searchQuery: '',
  sectorFilter: '',
  selectedStock: null,
  filteredStocks: allStocksData,
  compareList: [] as Stock[],
  comparePositions: [] as Position[],

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    const { allStocks, sectorFilter } = get();
    set({ filteredStocks: computeFiltered(allStocks, query, sectorFilter) });
  },

  setSectorFilter: (sector) => {
    set({ sectorFilter: sector });
    const { allStocks, searchQuery } = get();
    set({ filteredStocks: computeFiltered(allStocks, searchQuery, sector) });
  },

  setSelectedStock: (stock) => set({ selectedStock: stock }),

  toggleCompare: (stock) => set((state) => {
    const isAlreadyIn = state.compareList.some((s) => s.id === stock.id);
    if (isAlreadyIn) {
      return { compareList: state.compareList.filter((s) => s.id !== stock.id) };
    }
    if (state.compareList.length >= 4) {
      alert('Max 4 stocks for comparison');
      return state;
    }
    return { compareList: [...state.compareList, stock] };
  }),

  clearCompare: () => set({ compareList: [] }),

  // CRUD: Add with Weighted Average Merge
  addPosition: (newPos) => set((state) => {
    const existingIdx = state.positions.findIndex(p => p.symbol === newPos.symbol);

    if (existingIdx !== -1) {
      const existing = state.positions[existingIdx];
      const totalQty = existing.qty + newPos.qty;
      // Weighted Average: ((Q1 * P1) + (Q2 * P2)) / (Q1 + Q2)
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

  updatePosition: (id, updates) => set((state) => ({
    positions: state.positions.map(p => p.id === id ? { ...p, ...updates } : p)
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