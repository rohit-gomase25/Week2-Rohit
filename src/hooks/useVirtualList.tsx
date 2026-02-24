import {useState, useEffect , useRef} from 'react';

interface VirtualListOptions {
    rowHeight: number;
    visibleRows: number;
    overscan?: number;
}

function useVirtualList<T>(items:T[],options:VirtualListOptions){
    const rowHeight=options.rowHeight;
    const visibleRows=options.visibleRows;
    const overscan=options.overscan ?? 3;

    const [scrollTop,setScrollTop]=useState(0);
    const containerRef=useRef<HTMLDivElement>(null);

    useEffect(function(){
        const container=containerRef.current;
        if(container==null) return;

        function onScroll(){
            setScrollTop(container?.scrollTop as number);
        }
        container.addEventListener('scroll',onScroll);
        return function(){
            container.removeEventListener('scroll',onScroll);
        }
    },[]);

    const firstRow = Math.floor(scrollTop/rowHeight);
    const startIndex = Math.max(0,firstRow-overscan);
    const endIndex = Math.min(items.length,firstRow+visibleRows+overscan);
    const spacerAbove=startIndex*rowHeight;
    const spacerBelow=(items.length-endIndex)*rowHeight;

    return {
        visibleItems: items.slice(startIndex,endIndex),
        containerRef,
        spacerAbove,
        spacerBelow,
        startIndex,
        
    };
}

export default useVirtualList;