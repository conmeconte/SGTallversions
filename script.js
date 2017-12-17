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
var apiDataInput={
    api_key: 'jK3Fi1kiPx',
    // 'force-failure': 'timeout'
};


var ajaxOptions = {
    method: 'GET',
    dataType: 'json',
    // data: apiDataInput,
    url: `http://localhost/SGT/read.php`,
    success: functionToRunOnSuccess,
    error: functionToRunOnError,
    timeout: 2000
};



/*=========================================Functions for API receiving========================================================*/

function functionToRunOnError(error){
    $('*').css({ 'cursor': 'default' });
    console.log('Error, Danger', error);
    openModal(error.statusText);
}

function functionToRunOnSuccess(data){
    console.log(`it came throught ${data.success}`)
    $('*').css({ 'cursor': 'default' });
    if(data.success){
    console.log('success still working', data);
    processInputData(data.data)}
    else{openModal(data.error[0])}
}
// function processInputData(input){
//     student_array=[];
//     for(var i=0; i<input.data.length; i++){
//         var temp_student_info=new StudentInfo(input.data[i].id, input.data[i].name, input.data[i].course,input.data[i].grade);
//         student_array.push(temp_student_info);
//         updateStudentList(student_array);

//     }
// };
// // function StudentInfo(id, names, courses, grades){
// //     this.id= id;
// //     this.name= names;
// //     this.course=courses;
// //     this.grade=grades;

// // }
function processInputData(input){

/* Responsively Creates the table header depending on the pulled information */    
    renderHeaderOnDom(input[0]);            
    input.forEach(function(element){
        student_array.push(element);
        updateStudentList(element)}); 
};





/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
    // $.ajax(ajaxOptions);
    $('*').css({ 'cursor': 'progress' });
    $.ajax(ajaxOptions)



}

function openModal(data) {
    var modal=$('#myModal p');
    $(modal[0]).text(data);
    $('#myModal').show()
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
    $('.btn-primary').click(function(){
        // $('.tableRow').remove();
        $('.papaOfTd').empty();
        $.ajax(ajaxOptions)});
    $(".close").click(function(){$('#myModal').hide()});
    $(window).click(function(event){
        if(event.target == $('#myModal')[0]){
            $('#myModal').hide();
        }
    })

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
    $.ajax({
        url:'http://s-apis.learningfuze.com/sgt/create',
        method: 'post',
        dataType:"json",
        data:{
            api_key: 'jK3Fi1kiPx',
            name: eachInputArray.name,
            course: eachInputArray.course,
            grade: eachInputArray.grade
        },
        success: function(data){
            if(data.success) {
                console.log('successful input sent', data);
                eachInputArray.id = data.new_id;
                student_array.push(eachInputArray);
                clearAddStudentFormInputs();
                updateStudentList(student_array);
            }else{openModal(data.errors[0])}

        },
        error: function(){
            console.log('did\'t go out')
        }
    });

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
// function renderStudentOnDom(studentObj){

//     var tableDataName= $('<td>');
//     var tableDataCourse= $('<td>');
//     var tableDataGrade= $('<td>');
//     var tableDataDeleteTd=$('<td>');
//     var tableDataDelete=$('<button>').attr({
//         class: "btn btn-danger btn-sm",
//         onclick: null,
//     }).text("Delete");
//     tableDataDelete.click(function(){
//         tableDataDelete[0].studentInf=studentObj;
//         removeStudent();
//     });

//     var tableRow= $('<tr>').addClass("tableRow");

//     // for(var students_index=0; students_index<studentObj.length; students_index++){
//         tableDataName.text(studentObj.name);
//         tableDataCourse.text(studentObj.course);
//         tableDataGrade.text(studentObj.grade);
//         tableDataDeleteTd.append(tableDataDelete);
//         tableRow.append(tableDataName, tableDataCourse, tableDataGrade,tableDataDeleteTd);
//         $('.student-list>tbody').append(tableRow);

//     // }
// }

function renderStudentOnDom(studentObj){
    var tableRow= $('<tr>').addClass("tableRow");
    var tableDataDelete=$('<button>').attr({
        class: "btn btn-danger btn-sm",
        onclick: null,
    }).text("Delete");
    tableDataDelete.click(function(){
        tableDataDelete[0].studentInf=studentObj;
        removeStudent();
    });
    
    for(var prop in studentObj){
        var tableData=$('<td>').text(studentObj[prop]);
        tableRow.append(tableData);
    }
    tableRow.append(tableDataDelete);
    $('.student-list>tbody').append(tableRow);
}

/* Responsively Creates the table header depending on the pulled information */    

function renderHeaderOnDom(studentObj){
        for (var prop in studentObj){
            var tableHeader= $("<th>").text(`${prop}`);
            $('#display_info').append(tableHeader);
        }

    }

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student){
    renderStudentOnDom(student);
    renderGradeAverage(calculateGradeAverage());

}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
    var totalGrade=null;
    for (var average_index=0; average_index<student_array.length; average_index++){
        //need to name grade "Grade" in order for averaging function to work
        totalGrade+=Number(student_array[average_index].Grade);
    }
    return Math.round(totalGrade/(student_array.length));

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
    var studentObj=event.target.studentInf;
    var studentIndex = student_array.indexOf(studentObj);
    var domParent= $(event.target).parents('tr');

    $.ajax({
        method:'post',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        dataType: "json",
        data:{
            api_key: 'jK3Fi1kiPx',
            student_id: studentObj.id,
        },

        success: function(data){
            if(!data.success){

                openModal(data.errors[0]);
            }else{
                console.log("delete completed", data);
                student_array.splice(studentIndex,1);
                $(domParent).remove();
                renderGradeAverage(calculateGradeAverage());

            }
        },
        error: function(data){
            console.log('delete failed ', data)
        }
    });

}


/*=========================================Modal=======================================================================*/


