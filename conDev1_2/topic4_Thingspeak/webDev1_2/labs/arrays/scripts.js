/**
 * List of ids:
 *  
 *  Textfield to get student name: student_name
 *  List containing all students: students_list
 *  Button to add new students: add_btn
 *  Button to select a random student from the list: random_btn
 *  Div to display the name of the selected student: selected_student
 */

/**
 * List of functions:
 * 
 *  addNewStudent()
 *  generateRandomNumber(max)
 *  selectRandomStudent()
 * 
 */
function $(id){
    return document.getElementById(id)
}

var students = []

/**
 * Button Events
 */
window.onload = function ()
{
    $("#add_btn").onclick = addNewStudent()
    $("#random_btn").onclick = selectRandomStudent()
}

function addNewStudent()
{
    var studentName = $("student_name").value
    
    if(studentName === "") return alert("Please enter a valid student name")
    else students.push(studentName)
    
    let newStudent = document.createElement("li")
    newStudent.innerText = studentName
    $("studentList").appendChild(newStudent)
    $("student_name").value = ""
}

// this function generates a random number between 0 and max
function generateRandomNumber(max){
    return Math.floor(Math.random() *max)
}

// this function is executed each time the user clicks the button "random_btn"
function selectRandomStudent(){

    
    // check if the array has length > 0
    // Display an error message if the array does not contain any element


    // if the array has length > 0 we can continue...

    // get a random number between 0 and the length of the array using the function generateRandomNumber(students.length)


    // select the student name at the random position

    
    // update the div with the selected student's name

}


