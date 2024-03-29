import React, { useMemo, useState} from 'react';
import { useDispatch, useSelector } from "react-redux"

import Col from '../../BootstrapReplace/Col';
import Button from '../../BootstrapReplace/CustomButton';

import { MdUnfoldMoreDouble, MdUnfoldLessDouble } from "react-icons/md"

import { changeExhaustion, addCondition, removeCondition } from './ConditionsSlice';
import { CounterBox } from '../../components/CounterBox';
import { FilterBox } from '../../components/FilterBox';

export const ConditionsBox = (props) => {
    const dispatch = useDispatch()
    const [defaultSelectValue, setDefaultSelectValue] = useState("")
    const conditions = useSelector(state => state.conditions.conditions)
    const conditionsHas = useSelector(state => state.conditions.conditionsHas) 
    const exhaustion = useSelector(state => state.conditions.exhaustion)
    let colors=["#198754", "#6a9b39", "#aead22", "#ffc107", "#f3901d", "#e8662f", "#DC3545"]
    const show = props.show

    const handleChange = (type) => {
        dispatch(changeExhaustion(type))
    }
    const handleAdd = (event) => {
        setDefaultSelectValue(event.target.value)
        dispatch(addCondition(event.target.value))
        setDefaultSelectValue("")
    }
    const handleDelete = (event, item, type) => {
        dispatch(removeCondition(item.id))
    }
    
    const filterComponent = useMemo(() => {
        return (
            <div style={{display:"flex", height:"100%"}}>
                <Button aria-labelledby="fold-unfold-misc-bar-left-button" className="miscbar-expand-button left" style={{borderRight:"1px solid black"}} onClick={props.setShow}>
                    {props.showMiscBar ? <MdUnfoldLessDouble aria-labelledby="fold-unfold-misc-bar-left-button" size="1.5em"/> : <MdUnfoldMoreDouble aria-labelledby="fold-unfold-misc-bar" size="1.5em"/>}
                    <label className="visually-hidden" id="fold-unfold-misc-bar-left-button">{props.showMiscBar ? "Collapse condition/lanugages/senses bar" : "Expand condition/lanugages/senses bar"}</label>
                </Button>
                <div style={{padding:"0.5em", height:"100%"}}>
                    <FilterBox show={show} header="Conditions" data={conditionsHas} choices={conditions} selectable={true} handleAdd={handleAdd} handleDelete={handleDelete} defaultSelectValue={defaultSelectValue}/>
                </div>
            </div>
        )
    }, [conditionsHas, defaultSelectValue, show])

    const exhaustionComponent = useMemo(() => {
        return (
            <>
                <div style={{display:"flex"}}> <span style={{paddingRight:"0.5em"}}>Exhaustion Level:  </span> <CounterBox colors={colors} handleChange={handleChange} number={exhaustion.level}/> </div>
                {exhaustion.level != 0 && show ?
                <>
                    <ol style={{paddingLeft:"1.5em"}}>
                        {exhaustion.effects.map((effect, index) => (
                            index > exhaustion.level-1 ? "" : <li key={`exhaustion-effect-level-${index+1}`}> {exhaustion.effects[index]} </li>
                        ))}
                    </ol>
                </> : null}
            </>
        )
    }, [exhaustion, show])
    
    return(
        <>
            <Col className="miscbar-col one" style={{padding:"0em"}}>
                {filterComponent}
            </Col>
            <Col className="miscbar-col two" >
                {exhaustionComponent}
            </Col>
        </>
    )
}

/*
<Card border="dark" bg="secondary" style={{minWidth:"4em", paddingTop:"0.5em", paddingBottom:"0.5em"}}>
    <FilterBox show={props.show} header="Conditions" data={conditions} test="has" handleAdd={handleAdd} handleDelete={handleDelete} defaultSelectValue={defaultSelectValue}/>
</Card>
<Card border="dark" bg="secondary" style={{minWidth:"4em", padding:"0.5em", paddingBottom:"0"}}>
    <div style={{display:"flex"}}> <span style={{paddingRight:"0.5em"}}>Exhaustion Level:  </span> <CounterBox colors={colors} handleChange={handleChange} number={exhaustion.level}/> </div>
    {exhaustion.level != 0 && props.show ?
        <>
            <br></br>
            <ol>
                {exhaustion.effects.map((effect, index) => (
                    index > exhaustion.level-1 ? "" : <li key={`exhaustion-effect-level-${index+1}`}> {exhaustion.effects[index]} </li>
                ))}
            </ol>
        </> : null}
</Card>
*/