import React, { useEffect } from 'react';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import PortfolioSummary from '../../components/PortfolioSummary';

// Note: No more PortfolioFeatureProps needed! 
// We pull everything from Zustand.

const PortfolioFeature: React.FC = () => {
  // 1. Grab actions and state from the store
  const { loadPortfolio, isLoading, error } = usePortfolioStore();
  
  // 2. We still need the initial stock list to "load" the portfolio mock data
  // In a real app, you'd probably fetch this from an API inside the store
  useEffect(() => {
    // You can pass your available stocks here. 
    // If availableStocks is also in a store, grab it from there instead!
    // loadPortfolio(stocksFromStore); 
  }, [loadPortfolio]);

  if (error) return <div style={{ color: '#DC2626' }}>{error}</div>;
  
  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      
      {isLoading ? (
        <p>Loading portfolio data...</p>
      ) : (
        /* PortfolioSummary will now likely need to be updated 
           to use the store as well to be fully "prop-drill free" */
        <PortfolioSummary />
      )}
    </div>
  );
};

export default PortfolioFeature;