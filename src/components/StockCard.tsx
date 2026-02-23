import React from "react";  
import type { Stock } from "../types/stock.types";

interface StockCardProps {
  stock: Stock;
  onSelect?: (stock: Stock) => void;  // Optional callback for when the card is clicked
  isSelected?: boolean;  // Optional prop to indicate if the card is selected
}

const StockCard: React.FC<StockCardProps> = ({ stock, onSelect, isSelected = false }) => {  // Destructure stock properties for easier access
    const isPositive = stock.change >= 0;

    return (
        <div onClick={()=> onSelect?. (stock)}  style={{border : isSelected ? '2px solid #1E40AF' : '1px solid #D1D5DB',
            borderRadius:8,padding:16,cursor:"pointer",
            background:isSelected ? "#DBEAFE" : "#fff"
        }}>
            <h3>{stock.symbol} - {stock.name}</h3>
            <p>Price: ${stock.price.toFixed(2)}</p>
            <p style={{color : isPositive ? 'green' : 'red'}}>
                {isPositive ? '+' : ''} {stock.change.toFixed(2)} ({stock.changePct.toFixed(2)}%)
            </p>
            <small>Sector : {stock.sector}</small>
        </div>
    );
}


export default StockCard;

