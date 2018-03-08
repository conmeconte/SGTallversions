

import types from './types';
import axios from 'axios';


export function getStudents(url='php'){
    console.log('reached'); 
    if(url == 'php'){
        url = '/server/php/server.php?resource=students'
    }else if(url === 'node'){
        url = '/api/students'
    }

    const request = axios.get(url)
    return{
        type:types.GET_STUDENTS,
        payload: request
    }
}



export function addStudent(route='php', name, course, grade){

    if(route === 'php'){
        route = '/server/php/server.php?resource=add_student'
    }else if(route === 'node'){
        route = '/api/addStudent'
    }

    const request = axios.post(route, {
        name: name,
        course: course,
        grade: grade

    })
    return{
        type: types.ADD_STUDENT,
        payload: request
    }
}




export function deleteStudent(route='php', id){

    if(route === 'php'){
        route = '/server/php/server.php?resource=delete_student'
    }else if( route === 'node' ) {
        route = '/api/deleteStudent'
    }

    const request = axios.post(route,{
        id: id
    })
    return{
        type: types.DELETE_STUDENT,
        payload: request
    }
}




export function editStudent(route='php' ,name, course, grade, id){

    if(route === 'php'){
        route = '/server/php/server.php?resource=edit_student'
    }else if(route === 'node'){
        route = '/api/editStudent'
    }

    const request = axios.post(route,{
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


export function switchBackEndRoute(route){

    return{
        type: types.SWITCH_BACKEND_ROUTE,
        payload:route
    }
}






