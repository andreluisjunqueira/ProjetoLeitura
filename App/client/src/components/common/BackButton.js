import React from 'react';


export default (props)=>{

    function goBack(){
        props.history.push('/');
    }

    return (
        <a style={{cursor:'pointer'}} onClick={()=>goBack()}>
            <i className="material-icons" style={{fontSize : 38, marginTop : 20}}>arrow_back</i>
        </a>
    )
}