import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../actions/';
import Students from './students';



class StudentListTable extends Component {

    constructor(props){
        super(props);


        this.scrollTop = this.scrollTop.bind(this);
    }

    componentWillMount(){
        this.props.getStudents();
         window.addEventListener('scroll', this.scroll)
    }

    scroll(){
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
            document.getElementById("scrollUp").style.display = "block";
        } else {
            document.getElementById("scrollUp").style.display = "none";
        }
    }

    scrollTop(){
        document.documentElement.scrollTop = 0;
    }


    render() {
        const students = this.props.students.map( (item, index)=>{
            return(
                <Students key={index} {...item}/>
            )
        })

        return (
            <div className="col-md-9 col-md-pull-3">
                <table className="table table-striped pull-left">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Course</th>
                        <th>Student Grade</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                        {students}
                    </tbody>
                </table>
                <button id='scrollUp' onClick={this.scrollTop}>TOP</button>
                <h1 className='text-center'>{this.props.students.length ? '' : 'There are no data'}</h1>
            </div>
        );
    }
}



function mapStateToProps(state){
    return{
        students: state.students.list
    }
}

export default connect(mapStateToProps, {getStudents})(StudentListTable);
