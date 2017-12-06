import React from 'react';

const FilterSelector = (props)=>{

    function onSelect(option){
        props.onSelect(option)
    }

    function selected(value){
        return props.selected == value ? true : false 
    }

    return(
        <form action="#">
            <div className='row'>
                <div className='col s1'>
                    <p>Filter:</p>
                </div>
                <div className='col s2'>
                    <p>
                        <input className="with-gap" name="orderfilter" type="radio" id="radio1" onClick={()=>onSelect(0)} checked={selected(0)}/>
                        <label htmlFor="radio1">Vote score</label>
                    </p>
                </div>
                <div className='col s2'>
                    <p>
                        <input className="with-gap" name="orderfilter" type="radio" id="radio2" onClick={()=>onSelect(1)} checked={selected(1)}/>
                        <label htmlFor="radio2">Data</label>
                    </p>
                </div>
            </div>
        </form>
    )
} 

FilterSelector.defaultProps = {
    onSelect : ()=>{},
    selected : 0,
}
export default FilterSelector;