import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {


    render() {

        return (
            <div className="page-header">
                <h1 className="hidden-xs">Student Grade Table
                    <small className="pull-right">Grade Average : <span className="label label-default" >{this.props.average}</span></small>
                </h1>
                <h3 className="visible-xs">Student Grade Table
                    <small className='pull-right'>Grade Average : <span className="label label-default">{this.props.average}</span></small>
                </h3>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        average: state.students.average
    }
}

export default connect(mapStateToProps)(Header);
