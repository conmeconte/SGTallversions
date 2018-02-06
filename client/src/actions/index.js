

import types from './types';
import axios from 'axios';


const BASE_URL = 'http://localhost/server.php?action=get&resource=students';


export function getStudents(){
    const request = axios.get(BASE_URL)
    return{
        type:types.GET_STUDENTS,
        payload: request
    }
}


const ADD_URL = 'http://localhost/server.php?action=post&resource=add_student';

export function addStudent(name, course, grade){
    const request = axios.post(ADD_URL, {
        name: name,
        course: course,
        grade: grade

    })
    return{
        type: types.ADD_STUDENT,
        payload: request
    }
}


const DELETE_URL = 'http://localhost/server.php?action=post&resource=delete_student';

export function deleteStudent(id){
    const request = axios.post(DELETE_URL,{
        id: id
    })
    return{
        type: types.DELETE_STUDENT,
        payload: request
    }
}


const EDIT_URL = 'http://localhost/server.php?action=post&resource=edit_student';

export function editStudent(name, course, grade, id){
    const request = axios.post(EDIT_URL,{
        name: name,
        course: course,
        grade: grade,
        id: id
    })
    return{
        type: types.EDIT_STUDENT,
        payload: request
    }
}






