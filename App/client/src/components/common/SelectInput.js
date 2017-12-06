import React, { Component } from 'react';

export default class SelectInput extends Component{

    state = {
        value : ''
    }
    componentDidMount() {
        window.jQuery(this.select).on('change', this.props.onChange).material_select();
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({value : nextProps.value},()=>{
            window.jQuery(this.select).material_select();
        });
    }

    render(){
        const { value } = this.state;  
        return(
            <div>
                <select ref={(select)=>this.select = select} {...this.props} className='validate' value={this.props.value} >
                    <option disabled value="">Select a category</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                    <option value="udacity">Udacity</option>
                </select>
                <label>Category</label>
            </div>
        )
    }
}