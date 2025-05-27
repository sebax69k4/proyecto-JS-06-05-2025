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
    calculateAverage();
    updateStatistics();
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
    <td>
    <button class="edit-btn">Editar</button>
    <button class="delete-btn">Eliminar</button>
    </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click",function(){
        borrarEstudiante(student,row);
    })

    row.querySelector(".edit-btn").addEventListener("click",function(){
        editarEstudiante(student,row);
    })

    tablebody.appendChild(row)
}

function borrarEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calculateAverage();
        updateStatistics();
    }
}

function editarEstudiante(student, row) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("fecha").value = student.fecha;
    document.getElementById("grade").value = student.grade;
    
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        calculateAverage();
        updateStatistics();
    }
}

const promedioDiv = document.getElementById("average");
const calculateAverage = () => {
  const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
  const average = totalGrades / students.length || 0;
  promedioDiv.textContent = `El promedio es: ${average.toFixed(2)}`;
};

function updateStatistics() {
    const totalStudents = students.length;
    const approvedStudents = students.filter(student => student.grade >= 4.0).length;
    const failedStudents = totalStudents - approvedStudents;
    
    const approvedPercentage = (approvedStudents / totalStudents) * 100 || 0;
    const failedPercentage = (failedStudents / totalStudents) * 100 || 0;
    
    document.getElementById("totalStudents").textContent = `Total de estudiantes: ${totalStudents}`;
    document.getElementById("approvedPercentage").textContent = `Estudiantes aprobados: ${approvedPercentage.toFixed(1)}%`;
    document.getElementById("failedPercentage").textContent = `Estudiantes reprobados: ${failedPercentage.toFixed(1)}%`;
}

/*
function calcularPromedio(){
   let suma = 0;
   for (const student of students){
       suma += student.grade;
   }
   const count = students.length;
   const promedio = suma / count;
   console.log(promedio);
   averageDiv.textContent = "Promedio General del Curso :" +promedio;

}*/