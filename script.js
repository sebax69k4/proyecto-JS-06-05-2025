const students=[]

document.getElementById("studentform").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastname=document.getElementById("lastname").value.trim();
    const fecha=document.getElementById("fecha").value.trim();
    const grade=parseFloat(document.getElementById("grade").value)
    
    if(grade<1 || grade>7 || !name || !lastname || isNaN(grade)){
        alert("error al ingresar los datos")
        return
    }

    const student={name,lastname,fecha,grade}
    students.push(student);
    console.log(student);
    addStudentToTable(student)
    this.reset()
});

const tablebody=document.querySelector("#studentstable tbody");
function addStudentToTable(student){
    const row=document.createElement("tr")
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastname}</td>
    <td>${student.fecha}</td>
    <td>${student.grade}</td>
    `;
    tablebody.appendChild(row)
}

const promedio=document.getElementById("average");

