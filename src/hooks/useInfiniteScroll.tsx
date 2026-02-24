import {useState,useEffect,useRef,useCallback} from "react";

function useInfiniteScroll<T>(items: T[],batchSize = 10) {

    const [visibleCount,setVisibleCount] = useState(batchSize);
    const bottomRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(function(){
        setVisibleCount(function(currentCount){
            const nextCount = currentCount + batchSize;
            if(nextCount > items.length){
                return items.length;
            }
            return nextCount;
        });
    },[batchSize,items.length]);


    useEffect(function(){
        const bottomDiv=bottomRef.current;
        if(bottomDiv==null) return;

        const observer = new IntersectionObserver(function(entries){
            const entry=entries[0];
            if(entry.isIntersecting=== true){
                loadMore();
            }
        });

        observer.observe(bottomDiv);
        
        return function(){
            if(bottomDiv==null) return;
            observer.disconnect();
        }; // Fixed bracket here
    },[loadMore]); // Fixed bracket here
        
    const visibleItems = items.slice(0,visibleCount);
    const hasMore = visibleCount < items.length;

    return {visibleItems,hasMore,bottomRef};
}

export default useInfiniteScroll;