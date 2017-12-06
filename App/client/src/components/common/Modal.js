import React from 'react';
import Modal from 'react-modal';
import { Button, Col, Row } from 'react-materialize';

const ModalDefault = (props)=>{
    return(
        <Modal
            isOpen={props.isOpen}
            contentLabel="Modal"
            onRequestClose={props.onRequestClose}
            style={{
                overlay : {
                    position          : 'fixed',
                    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
                },
                content : {
                    width : '600px',
                    height : '400px',
                    margin : '0 auto',
                    padding : '20px 50px'
                }
            }}
        >
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{flex:1}}>
                    { props.children }
                </div>
            </div>
        </Modal>
    )
}

ModalDefault.defaultProps = {
    confirmTitle : 'Ok',
    cancelTitle : 'Cancel',
    onCancel : ()=>{},
    onRequestClose : ()=>{}
}

export default ModalDefault;