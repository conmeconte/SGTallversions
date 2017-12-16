/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array=[];
var apiDataOutput={
    api_key: 'jK3Fi1kiPx'
};
var ajaxOptions = {
    method: 'post',
    dataType: 'json',
    data: apiDataOutput,
    url: `http://s-apis.learningfuze.com/sgt/get`,
    success: functionToRunOnSuccess,
    error: functionToRunOnError
};

function functionToRunOnError(error){
    console.log('Error, Danger', error);
}

function functionToRunOnSuccess(data){
    console.log(data);
    processInputData(data)
}
function processInputData(input){
    for(var i=0; i<input.data.length-1; i++){
        var temp_student_info=new StudentInfo(input.data[i].name, input.data[i].course,input.data[i].grade);
        student_array.push(temp_student_info);
        updateStudentList(student_array);

    }


}
function StudentInfo(names, courses, grades){
    this.name= names;
    this.course=courses;
    this.grade=grades;

}

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
    $.ajax(ajaxOptions)
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
    $('.btn-success').click(handleAddClicked);
    $('.btn-default').click(handleCancelClick);
    $('.btn-primary').click();

}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();

}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var eachInputArray={name: document.getElementById("studentName").value, course: document.getElementById("course").value, grade: document.getElementById("studentGrade").value};
    student_array.push(eachInputArray);
    clearAddStudentFormInputs();
    updateStudentList(student_array);
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    document.getElementById("studentName").value="";
    document.getElementById("course").value="";
    document.getElementById("studentGrade").value="";
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
    var tableDataName= $('<td>');
    var tableDataCourse= $('<td>');
    var tableDataGrade= $('<td>');
    var tableDataDeleteTd=$('<td>');
    var tableDataDelete=$('<button>').attr({
        class: "btn btn-danger btn-sm",
        onclick: null,
    }).text("Delete");
    console.log("before ",tableDataDelete[0].studentInf);
    tableDataDelete.click(function(){
        tableDataDelete[0].studentInf=studentObj;
        console.log("inside ",tableDataDelete[0].studentInf);
        removeStudent();
    });
    console.log("after ",tableDataDelete[0].studentInf);

    var tableRow= $('<tr>');

    // for(var students_index=0; students_index<studentObj.length; students_index++){
        tableDataName.text(studentObj.name);
        tableDataCourse.text(studentObj.course);
        tableDataGrade.text(studentObj.grade);
        tableDataDeleteTd.append(tableDataDelete);

    // }
    tableRow.append(tableDataName, tableDataCourse, tableDataGrade,tableDataDeleteTd);
    $('.student-list>tbody').append(tableRow);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student){
  renderStudentOnDom(student[student.length-1]);
  renderGradeAverage(calculateGradeAverage(student));

}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(students){
    var totalGrade=null;
    for (var average_index=0; average_index<students.length; average_index++){
        totalGrade+=Number(students[average_index].grade);
    }
    return Math.round(totalGrade/(students.length));

}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(numbers){
    $('.avgGrade').text(numbers);
}




function removeStudent(){
    var studentIndex = student_array.indexOf(event.target.studentInf);
    console.log(this);
    student_array.splice(studentIndex,1);
    // var domParent= $(event.target).parent();
    // var domParent2=$(domParent).parent();
    // $(domParent2).remove();
    $(event.target).parents('tr').remove();
}

/*==============================================================================================================*/
function renderStudentOnDom(studentObj){
    var new_tr = $(‘<tr>‘);
    var new_td_name = $(‘<td>‘).text(studentObj.name);
    var new_td_course = $(‘<td>‘).text(studentObj.course);
    var new_td_grade = $(‘<td>‘).text(studentObj.grade);

    var new_td_button = $(‘<td>‘);
    var delete_button = $(‘<button>’,{
    class: ‘delete btn btn-danger’,
        text: ‘Delete’,
    });

    $(new_td_button).append(delete_button);

    //delete button click handler
    delete_button.on(‘click’, function(){
        //store data attribute studentData
        var a = new_tr;
        delete_button[0].studentData = studentObj;
        removeStudent(a);
    })

    new_tr.append(new_td_name, new_td_course, new_td_grade, new_td_button);
    $(‘tbody’).append(new_tr);

}
function removeStudent(a){

    var studentIndex = student_array.indexOf(event.target.studentData);
    student_array.splice(studentIndex, 1);
    $(a).remove();
}


