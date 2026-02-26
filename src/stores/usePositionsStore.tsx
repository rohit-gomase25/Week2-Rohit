import { create } from "zustand";
import type { Position } from "../types/stock.types";
import { positions as initialPositions } from "../data/stockData";

interface PositionsStore {
  positions: Position[];
  comparePositions: Position[];
  addPosition: (position: Position) => void;
  removePosition: (id: string) => void;
  updatePosition: (id: string, changes: Partial<Position>) => void;
  togglePositionCompare: (pos: Position) => void;
  clearPositionCompare: () => void;
}

export const usePositionsStore = create<PositionsStore>(function (set) {
  return {
    positions: initialPositions as Position[],
    comparePositions: [] as Position[],

    // 1. Add / Merge Position (Weighted Average Logic)
    addPosition: function (newPos) {
      set(function (state) {
        const existing = state.positions.find((p) => p.symbol === newPos.symbol);

        if (existing) {
          return {
            positions: state.positions.map(function (p) {
              if (p.symbol !== newPos.symbol) return p;

              const totalQty = p.qty + newPos.qty;
              // Weighted Average Calculation
              const weightedAvg = (p.avgPrice * p.qty + newPos.avgPrice * newPos.qty) / totalQty;

              return { 
                ...p, 
                qty: totalQty, 
                avgPrice: weightedAvg,
                // Optional: reset pnl or recalculate it based on new avg
                pnl: (p.pnl || 0) // Keep current pnl or adjust as needed
              };
            }),
          };
        }

        const positionWithId = newPos.id ? newPos : { ...newPos, id: `pos-${Date.now()}` };
        return { positions: [...state.positions, positionWithId as Position] };
      });
    },

    // 2. Remove Position
    removePosition: function (id) {
      set(function (state) {
        return {
          positions: state.positions.filter((p) => p.id !== id),
          comparePositions: state.comparePositions.filter((p) => p.id !== id),
        };
      });
    },

    // 3. Update Position (Includes logic to protect Avg Price if Qty changes)
    updatePosition: function (id, changes) {
      set(function (state) {
        const updatedPositions = state.positions.map((p) => {
          if (p.id !== id) return p;
          
          const updatedItem = { ...p, ...changes };
          
          // Logic check: If you manually update ONLY qty via a form, 
          // but want to keep the same total invested value, avgPrice MUST change.
          // If you want to keep avgPrice the same, just return updatedItem.
          return updatedItem;
        });

        const updatedCompare = state.comparePositions.map((p) =>
          p.id === id ? { ...p, ...changes } : p
        );

        return {
          positions: updatedPositions,
          comparePositions: updatedCompare,
        };
      });
    },

    // 4. Comparison Logic
    togglePositionCompare: function (pos) {
      set(function (state) {
        const isAlreadyIn = state.comparePositions.some((p) => p.id === pos.id);

        if (isAlreadyIn) {
          return {
            comparePositions: state.comparePositions.filter((p) => p.id !== pos.id),
          };
        }

        if (state.comparePositions.length >= 4) {
          alert("Max 4 positions for comparison");
          return state;
        }

        return { comparePositions: [...state.comparePositions, pos] };
      });
    },

    clearPositionCompare: function () {
      set({ comparePositions: [] });
    },
  };
});