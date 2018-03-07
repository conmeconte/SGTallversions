
import React, {Component} from 'react';
import '../assets/css/modal.css'

export class AddModal extends Component{
    constructor(props){
        super(props);

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm(){
        this.props.callback();
    }


    render(){
        const {name, course, grade} = this.props.data
        return (
            <span>
                <div className="confirm-modal">
                    <div className="modal-content">
                        <div className="card">
                            <div className="text-center">
                                <h4>You have successfully added</h4>
                                <p>Name: {name}</p>
                                <p>Course: {course}</p>
                                <p>Grade: {grade}</p>
                            </div>
                            <div className="card-action text-center">
                                <button onClick={this.handleConfirm} className="btn btn-success">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}


export class DeleteModal extends Component{
    constructor(props){
        super(props);

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm(){
        this.props.confirmDeleteStudent();
    }

     render(){
        const {name, course, grade} = this.props.data
        return (
            <span>
                <div className="confirm-modal">
                    <div className="modal-content">
                        <div className="card">
                            <div className="text-center">
                                <h4>Do you really want to delete below data?</h4>
                                <p>Name: {name}</p>
                                <p>Course: {course}</p>
                                <p>Grade: {grade}</p>
                            </div>
                            <div className="card-action text-center">
                                <button onClick={this.handleConfirm} className="btn btn-success">Confirm</button>
                                <button onClick={this.props.hideModal} className='btn btn-warning'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }

}

export class SaveModal extends Component{
    constructor(props){
        super(props);

        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm(){
        this.props.confirmSave();
    }

     render(){
        const {name, course, grade} = this.props.data
        return (
            <span>
                <div className="confirm-modal">
                    <div className="modal-content">
                        <div className="card">
                            <div className="text-center">
                                <h4>Do you really want to save below data?</h4>
                                <p>Name: {name}</p>
                                <p>Course: {course}</p>
                                <p>Grade: {grade}</p>
                            </div>
                            <div className="card-action text-center">
                                <button onClick={this.handleConfirm} className="btn btn-success">Confirm</button>
                                <button onClick={this.props.hideModal} className='btn btn-warning'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }

}






