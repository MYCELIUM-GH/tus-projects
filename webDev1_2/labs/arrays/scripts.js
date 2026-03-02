var students = []

function $(id) { return document.getElementById(id) }
function generateRandomNumber(max) { return Math.floor(Math.random() * max) }

window.onload = function ()
{
    $("add_btn").addEventListener("click", addNewStudent)
    $("random_btn").addEventListener("click", selectRandomStudent)
}

function addNewStudent()
{
    let studentName = $("student_name").value
    
    if(studentName === "") return alert("Input field is empty")
    else students.push(studentName)
    
    let newStudent = document.createElement("li")
    newStudent.innerText = studentName
    $("students_list").appendChild(newStudent)
    $("student_name").value = ""
}

function selectRandomStudent()
{
    
    if(students.length === 0) return alert("Students list is empty")
    else 
    {
        let i = generateRandomNumber(students.length)
        let selectedStudent = students[i]
        $("selected_student").innerText = selectedStudent
    }
}


