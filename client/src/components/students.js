import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, getStudents, editStudent } from '../actions/'
import { DeleteModal, SaveModal } from '../helpers/';


class Students extends Component {

    constructor(props){
        super(props);


        this.state={
            deleteModalVisible: false,
            saveModalVisible: false,
            edit: false,
            form: {
                name: this.props.name,
                course: this.props.course,
                grade: this.props.grade
            },
            changed: false,
            gradeHolder: ''
        }
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.showSaveModal = this.showSaveModal.bind(this)
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            form:{
                name:nextProps.name,
                course: nextProps.course,
                grade: nextProps.grade
            }
        })
    }


    toggleEdit(){
        this.setState({
            edit: !this.state.edit,
            changed: false
        })

        if( this.state.changed){
            const {name, course, grade} = this.state.form
            this.props.editStudent(this.props.backEndRoute, name, course, grade, this.props.id)
                .then(()=>{ this.props.getStudents(this.props.backEndRoute)})
        }
    }

    cancelEdit(){
        this.setState({
            edit: !this.state.edit
        })
    }


    showSaveModal(){
        if(!/^[1]?[0-9][0-9]?$|^200$/g.test(this.state.form.grade)){
            this.setState({
                form:{
                    ...this.state.form,
                    grade: ''
                },
                gradeHolder: 'Must be 0 - 200'
            })
            return
        }

        this.setState({
            saveModalVisible: true
        })
    }

    hideSaveModal(){
        this.setState({
            saveModalVisible: false
        })
    }

    deleteStudent(){
        this.props.deleteStudent(this.props.backEndRoute, this.props.id)
            .then(()=>this.props.getStudents(this.props.backEndRoute))
                .then(()=>this.hideDeleteModal(this.props.backEndRoute))
    }

    showDeleteModal(){
        this.setState({
            deleteModalVisible: true,
        })
    }
    hideDeleteModal(){
        this.setState({
            deleteModalVisible: false,
            edit: !this.state.edit
        })
    }

    handleChange(e){
        const {value, name} = e.target;
        const {form} = this.state;
        form[name]= value;
        this.setState({
            form: {...form},
            changed: true
        });
    }

    render() {


        const button = (
            this.state.edit ?
            <td>
                <button onClick={this.showDeleteModal} className="btn btn-danger">DEL</button>
                <button onClick={this.showSaveModal} className="btn btn-success">SAVE</button>
                <button onClick={this.cancelEdit} className="btn btn-warning">CANCEL</button>
                {this.state.deleteModalVisible ?
                    <DeleteModal
                        confirmDeleteStudent={this.deleteStudent.bind(this)}
                        hideModal={this.hideDeleteModal.bind(this)}
                        data={this.props}/>
                    :
                    ''
                }
                {this.state.saveModalVisible ?
                    <SaveModal
                        confirmSave={this.toggleEdit}
                        hideModal={this.hideSaveModal.bind(this)}
                        data={this.state.form}
                        />
                    :
                    ''
                }

            </td>
            :
            <td>
                <button onClick={this.toggleEdit} className="delete btn btn-info">EDIT</button>
            </td>
        );

        const students = (
            <tr className={parseInt(this.props.grade) === 200 ? 'success' : ''}>
                <td>{this.props.name}</td>
                <td>{this.props.course}</td>
                <td>{this.props.grade}</td>
                {button}
            </tr>
        );

        const editInputs= (

            <tr>
                <td><input name='name' onChange={this.handleChange} type="text" value={this.state.form.name}/></td>
                <td><input name='course' onChange={this.handleChange} type="text" value={this.state.form.course}/></td>
                <td><input placeholder={this.state.gradeHolder} name='grade' onChange={this.handleChange} type="text" value={this.state.form.grade}/></td>
                {button}
            </tr>

        );

        if(this.state.edit){
            return editInputs;
        }else{
            return students;
        }

    }
}


function mapStateToProps(state){
    return{
        success: state.deleteStudent.success,
        errorMessage: state.deleteStudent.errorMessage,
        backEndRoute: state.route
    }
}


export default connect(mapStateToProps, {deleteStudent, getStudents, editStudent})(Students);



