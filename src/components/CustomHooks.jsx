import React, { useEffect, useRef, useState, useMemo } from "react"
import { debounce } from "lodash"

export const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}

export const useAutosave = (callback, delay = 1000, deps = []) => {
    const savedCallback = useRef(); // to save the current "fresh" callback

    // keep callback ref up to date
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])
  
    // create the interval
    useEffect(() => {
        // function to call the callback
        const runCallback = () => {
            savedCallback.current();
        }
        if (typeof delay === 'number') {
            // run the interval
            let interval = setInterval(runCallback, delay);
            // clean up on unmount or dependency change
            return () => clearInterval(interval)
        }
    }, [delay, ...deps])
}

export const useScreenSize = () => {
    const [size, setSize]= useState({height: window.innerHeight, width: window.innerWidth})

    const testBla = () => {
        console.log("bla")
    }
    const handleResize = ()=> {
        setSize({height: window.innerHeight, width: window.innerWidth})
    }
    const handleResizeDebounced = useMemo(() => 
        debounce(handleResize, 25)
    , [testBla] )


	useEffect(() => {
		window.addEventListener("resize", handleResizeDebounced, true)
		return function cleanup() {
			window.removeEventListener("resize", handleResizeDebounced, true)
		}
	}, [handleResizeDebounced])
    return size
}