import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addStudent, getStudents, switchBackEndRoute } from '../actions'
import { connect } from 'react-redux';
import {AddModal} from '../helpers/'

class AddForm extends Component {

    constructor(props){
        super(props);

        this.state={
            errorMessage: '',
            modalVisible: false,
            values: {},
            currentRoute: 'php'
        }

        this.addStudents = this.addStudents.bind(this);
    }

    addStudents(values){
        this.props.addStudent(this.props.backEndRoute, values.name, values.course, values.grade)
            .then(()=>{
                if(this.props.success){
                    this.props.getStudents(this.props.backEndRoute)
                    this.setState({
                        errorMessage: '',
                        modalVisible: true,
                        values: values
                    })

                }else{
                    this.setState({
                        errorMessage:this.props.errorMessage
                    })
                }
                this.props.reset();
            })


    }


    renderInput({input, input:{onBlur}, type, placeholder, glyphicon, meta:{touched, error}}){
        const style = {
            color: 'red',
            height: '100%'
        }


        const errorMessage = (touched && error) ?
                <p className='form-control' style={style}>{error}</p> : ''

        return (
            <div className={`input-group form-group ${touched && error? 'has-error': ''}`}>

                <span className="input-group-addon">
                    <span className={`glyphicon ${glyphicon}`}></span>
                </span>
                <input {...input} onBlur={()=>{return}} type={type} className="form-control" name={name} placeholder={placeholder}/>
                {errorMessage}
            </div>
        )
    }

    hideAddModal(){
        this.setState({
            modalVisible: false
        })
    }

    switchBackEnd(route){

        this.props.switchBackEndRoute(route);

        if(route === 'php'){
            this.setState({
                currentRoute: route
            })
        }else if(route === 'node'){
            this.setState({
                currentRoute: route
            })
        }



    }

    render() {
        const {currentRoute} = this.state;

        return (
            <form className="col-md-3 col-md-push-9" onSubmit={this.props.handleSubmit(this.addStudents)}>
                <h4>Add Student</h4>
                <Field name='name' placeholder='Student Name' type='text' glyphicon='glyphicon-user' component={this.renderInput}/>
                <Field name='course' placeholder='Student Course' type='text' glyphicon='glyphicon-list-alt' component={this.renderInput}/>
                <Field name='grade' placeholder='Student Grade' type='text' glyphicon='glyphicon-education' component={this.renderInput}/>

                <button className="btn btn-success">ADD</button>

                <div className='pull-right'>
                    <button type="button" className={`btn ${currentRoute === 'php' ? 'btn-primary' : 'btn-link' }`} onClick={()=>this.switchBackEnd('php')}>PHP</button>
                    <button type="button" className={`btn ${currentRoute === 'node' ? 'btn-primary' : 'btn-link' }`} onClick={()=>this.switchBackEnd('node')}>NODE</button>
                </div>



                <p className='text-danger'>{!this.state.errorMessage ? '': this.state.errorMessage  }</p>

                {this.state.modalVisible ? <AddModal  callback={this.hideAddModal.bind(this)} data={this.state.values}/> : ''}
            </form>
        );
    }
}


function validate(values){
    const error ={}


    if(!values.name){
        error.name = 'Please enter student\'s name';
    }
    if(!values.course){
        error.course = 'Please enter student\'s course';
    }

    if(!values.grade || !/^[1]?[0-9][0-9]?$|^200$/g.test(values.grade)){
        error.grade = 'Please enter the grade 0 - 200';
    }


    return error;
}



AddForm = reduxForm({
    form: 'add-form',
    validate: validate,

})(AddForm);

function mapStateToProps(state){
    return{
        success: state.addStudent.success,
        errorMessage: state.addStudent.errorMessage,
        backEndRoute: state.route
    }
}



export default connect(mapStateToProps, {addStudent, getStudents, switchBackEndRoute})(AddForm);






