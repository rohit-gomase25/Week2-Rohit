import React,{useState,useEffect} from "react";
import type { Stock } from "../types/stock.types";

interface PortfolioState{
    holdings: Stock[];
    totalValue: number;
    gainLoss: number;
    isLoading: boolean;
    error: string | null;
}

interface PortfolioSummaryProps{
   availableStocks: Stock[];
}

const PortfolioSummary : React.FC<PortfolioSummaryProps> = ({availableStocks}) => { // Destructure availableStocks from props  and define the component as a React Functional Component with typed props
    const [portfolio, setPortfolio] = useState<PortfolioState>({
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        isLoading: true,    
        error: null,
    });


    const [selectedSector, setSelectedSector] = useState<string>('All');
   

    useEffect(() => {
        // Simulate fetching portfolio data with a timeout
        setTimeout(() => {
            const topThree = availableStocks.slice(0, 3); // Take the first 3 stocks from the availableStocks prop
            const totalValue = topThree.reduce((sum, stock) => sum + stock.price * 10, 0);
            const totalCost = topThree.reduce((sum, stock) => sum + (stock.price - stock.change) * 10, 0); // Assuming a fixed cost for simplicity
            setPortfolio({
                holdings: topThree,
                totalValue,
                gainLoss: totalValue - totalCost,
                isLoading: false,
                error: null,
            });
        }, 800);
    }, [availableStocks]); // Re-run the effect whenever availableStocks changes

    const filtered = selectedSector === 'All' ? portfolio.holdings : portfolio.holdings.filter(s => s.sector === selectedSector);

    if(portfolio.isLoading){
        return <p>Loading portfolio...</p>;
    }

    if(portfolio.error){
        return <p>Error : {portfolio.error}</p>;
    }

    return(
        <div style={{ border : '1px solid #D1D5DB', borderRadius:8,padding:16}}>
            <h2>Portfolio Summary</h2>
            <p>Total Value: ${portfolio.totalValue.toFixed(2)}</p>
            <p style={{color : portfolio.gainLoss >=0 ? 'green' : 'red'}}>
                Gain/Loss : ${portfolio.gainLoss.toFixed(2)}
            </p>

            <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
                <option >All</option>
                <option >Technology</option>
                <option >Finance</option>
                <option >Automotive</option>
            </select>
            <ul>
                {filtered.map(stock => (
                    <li key={stock.id}>{stock.symbol} : ${stock.price.toFixed(2)}</li>
                ))}
            </ul>
        </div>

    );
}

export default PortfolioSummary;