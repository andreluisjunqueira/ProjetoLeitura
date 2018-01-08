import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/userAction';

class Login extends  Component{

    state = {
        userLogin : null
    }

    componentDidMount(){
        let { user } = this.props
        console.log(this.props)
        if(!user){
            this.askName()
        }else{
            this.setState({userLogin : user})
        }
    }

    askName(){
        setTimeout(()=>{
            const user = prompt('Type your name :')
            if(user){
                this.setState({userLogin : user},()=>{
                    this.props.dispatch(setUser(user))
                })
            }
        },1000) 
    }

    renderLogin(){
        const { userLogin } = this.state;
        return !userLogin ? (
            <div>
                <a style={{cursor : 'pointer', textDecoration:'underline'}} onClick={()=>this.askName()}>Login</a>
            </div>
        ):(
            <span>
                { this.props.user } 
            </span>
        )
    }

    render(){
        return(
            <div class="right">
               { this.renderLogin() }
            </div>
        )
    }
}

export default connect(({user})=>{
    return{user}
})(Login)