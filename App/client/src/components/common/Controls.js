import React from 'react';


const controls = (props)=>{

    const { item } = props;

    function _onDelete(id){
        props.onDelete(id)
    }
    function _onEdit(item){
        props.onEdit(item)
    }
    return(
        <div className="col s2">
            <a onClick={()=>_onEdit(item)}><i className="material-icons" style={{fontSize :18, color : 'black', cursor : 'pointer'}}>create</i></a>
            <a onClick={()=>_onDelete(item.id)}><i className="material-icons" style={{fontSize :18, color:'black', cursor : 'pointer'}}>delete_forever</i></a>
        </div>
    )
}

controls.defaultProps = {
    item : {},
    onDelete : ()=>{},
    onEdit : ()=>{},
}

export default controls;