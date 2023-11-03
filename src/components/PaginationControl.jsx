import { useState } from "react";
import { MdNavigateBefore, MdNavigateNext, MdSkipNext, MdSkipPrevious } from "react-icons/md";

import "./PaginationControl.scss"

export const PaginationControl = (props) => {
    const label = props.label

    const children = props.children.length
    const [numberOfEntries, setNumberOfEntries] = useState(5)
    const [activePage, setActivePage] = useState(0)

    let numberOfPages = Math.ceil(children / numberOfEntries)
    if(children%numberOfEntries === 0 && activePage + 1 > numberOfPages) {
        setActivePage(numberOfPages - 1)
    }

    let list = {
        startDots: false,
        indices: [],
        endDots: false
    }
    if(activePage - 2 >= 0) {
        list.startDots = true
    }
    if(activePage-1 >= 0) {
        list.indices.push(activePage - 1)
    }
    list.indices.push(activePage)
    if(activePage+1 <= numberOfPages - 1) {
        list.indices.push(activePage + 1)
    }
    if(activePage+2 <= numberOfPages - 1) {
        list.endDots = true
    }

    const changePage = (id) => {
        if(id === "start") {
            setActivePage(0)
        } else if (id === "inc" && activePage < numberOfPages - 1) {
            setActivePage(prev => prev + 1)
        } else if (id === "dec" && activePage > 0) {
            setActivePage(prev => prev - 1)
        } else if (id === "end") {
            setActivePage(prev => numberOfPages - 1)
        }
    }

    return (
        <>
            {props.children.filter((child, index) => ( activePage*numberOfEntries <= index && index < (activePage +1)*numberOfEntries))}
            {numberOfPages <= 1 ?
                null :
                <nav aria-label={label + " list paginator"}>
                    <ul className="paginator-control">
                        <li className="paginator-item">
                            <button className="paginator-button" onClick={(event) => changePage("start")}>
                                <MdSkipPrevious size="1.5em" aria-labelledby="paginator-first-page"/>
                                <label className="visually-hidden" id="paginator-first-page">First page</label>
                            </button>
                        </li>
                        <li className="paginator-item">
                            <button className="paginator-button" onClick={(event) => changePage("dec")}>
                                <MdNavigateBefore size="1.5em" aria-labelledby="paginator-previous-page"/>
                                <label className="visually-hidden" id="paginator-previous-page">Previous page</label>
                            </button>
                        </li>
                        {list.startDots ? <li className="paginator-item"> <span className="paginator-ellipsis">&#8230;</span> </li> : null}
                        {list.indices.map(entry => (
                            <li key={`paginator-page-${entry + 1}`} className="paginator-item">
                                <button 
                                    onClick={event => setActivePage(entry)}
                                    className={`paginator-button  ${entry === activePage ? "selected" : null}`}
                                    aria-current={entry === activePage ? "page" : null}
                                >
                                    <span className="visually-hidden">Page </span>{entry + 1}<span className="visually-hidden">{entry === activePage ? "( current)" : null}</span>
                                </button>
                            </li>
                        ))}
                        {list.endDots ? <li className="paginator-item"> <span className="paginator-ellipsis">&#8230;</span> </li> : null}
                        <li className="paginator-item">
                            <button className="paginator-button" onClick={(event) => changePage("inc")}>
                                <MdNavigateNext size="1.5em" aria-labelledby="paginator-next-page"/>
                                <label className="visually-hidden" id="paginator-next-page">Next page</label>
                            </button>
                        </li>
                        <li className="paginator-item">
                            <button className="paginator-button"  onClick={(event) => changePage("end")}>
                                <MdSkipNext size="1.5em" aria-labelledby="paginator-last-page"/>
                                <label className="visually-hidden" id="paginator-last-page">Last page</label>
                            </button>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}