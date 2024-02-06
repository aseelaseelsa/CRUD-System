var courseName = document.getElementById("courseName");
var courseCategory= document.getElementById("courseCategory");
var coursePrice= document.getElementById("coursePrice");
var courseDescription= document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var addbtn= document.getElementById("click");
var data = document.getElementById("data");
var search = document.getElementById("search");
var currentIndex =0;
var isNameValid = false;
var isCategoryValid = false;
var isPriceValid = false;
var isCapacityValid = false;
var isDescriptionValid = false;


var courses 
if (localStorage.getItem('courses') === null){
  courses = []
}else{
  courses = JSON.parse(localStorage.getItem('courses'));
}
displayData();
checkInput();



function checkInput(){
  if (isNameValid &&isCategoryValid &&isPriceValid &&isCapacityValid &&isDescriptionValid) {
    addbtn.removeAttribute('disabled'); 
}else{
  addbtn.setAttribute('disabled','disabled');
}
}

var update = document.getElementById("update");
update.style.display = "none";





addbtn.onclick = function(e){
e.preventDefault();
addCourse();
resetInput();
displayData();
console.log(courses);

}
//  create course --------------------------------------------------------------------------------------------------------------
function addCourse(){
    var course = {
        courseName:courseName.value,
        courseCategory : courseCategory.value,
        coursePrice : coursePrice.value,
        courseDescription: courseDescription.value,
        courseCapacity: courseCapacity.value,
      }
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    //sweet alert  
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'course add successfully',
      showConfirmButton: false,
      timer: 1500
    })
}
function resetInput(){
    courseName.value=''
    courseCategory.value=''
    coursePrice.value=''
    courseDescription.value=''
    courseCapacity.value=''  
}


//read data ------------------------------------------------------------------------------------------------------------------------------------------
function displayData() {
  var result = ``;
  for (let i = 0; i < courses.length; i++) {
result +=`
<tr>
    <td>${i+1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCategory}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescription}</td>
    <td>${courses[i].courseCapacity}</td>
    <td><button class="btn btn-primary " onclick="getCourse(${i})">update</button></td>
    <td><button class="btn btn-danger" onclick="deleteCourse(${i})" >delete</button></td>

</tr>

`   
  }
  data.innerHTML= result;
}



//delete all btn --------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("deleteBtn").onclick= function () {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      courses=[]; 
      localStorage.setItem('courses', JSON.stringify(courses));
      data.innerHTML = ""; 

  //sweet alert 
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        '',
        'Cancelled'
       
      )
    }
  })
 
}

// delete btn in table --------------------------------------------------------------------------------------------------------------------------------------------
function deleteCourse(index) {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1)
      localStorage.setItem('courses', JSON.stringify(courses));

      displayData();

      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        '',
        'Cancelled'
       
       
      )
    }
  })
 
 
}




// ----------------------------------------------------------------------------seach----------------------------------------------------------------------------------
/*
 */

 search.onkeyup = function() {

   var result = ``;
  console.log(search.value);
for (let i = 0; i< courses.length; i++) {
 
 if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())  ) { 
  result += `
<tr>
    <td>${i+1}</td>
    <td>${courses[i].courseName}</td>
    <td>${courses[i].courseCapacity}</td>
    <td>${courses[i].coursePrice}</td>
    <td>${courses[i].courseDescription}</td>
    <td>${courses[i].courseCapacity}</td>
    <td><button class="btn btn-primary"  onclick="getCourse(${i})">update</button></td>
    <td><button class="btn btn-danger" onclick="deleteCourse(${i})" >delete</button></td>

</tr>

`  
 }
 data.innerHTML= result; 
}
}





 //update --------------------------------------------------------------------------------------------------------------------------------------------------
function getCourse(index){
console.log(index);
currentIndex = index;
var course = courses[index];
courseName.value = course.courseName;
courseCategory.value = course.courseCategory ;
coursePrice.value = course.coursePrice;
courseDescription.value = course.courseDescription ;
courseCapacity.value = course.courseCapacity;


update.style.display= 'inline';
addbtn.style.display = 'none';
}

update.onclick =function(e){ 
  e.preventDefault();
  updateCourse();
displayData();
update.style.display= 'none';
addbtn.style.display = 'inline';
resetInput();

}


function updateCourse(){
  var course = {
    courseName:courseName.value,
    courseCategory : courseCategory.value,
    coursePrice : coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value,
  }
var preName =  courses[currentIndex].courseName;

  courses[currentIndex].courseName =course.courseName;
  courses[currentIndex].courseCategory =course.courseCategory;
  courses[currentIndex].coursePrice =course.coursePrice;
  courses[currentIndex].courseDescription =course.courseDescription;
  courses[currentIndex].courseCapacity =course.courseCapacity;

  localStorage.setItem('courses', JSON.stringify(courses));

  //sweet alert  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${preName} updated successfully`,
    showConfirmButton: false,
    timer: 1500
  })
  
}




//-----------------------------------------------------------------validation----------------------------------------------------------------
//1- name
var nameAlert = document.getElementById('nameAlert');
nameAlert.style.display='none';

courseName.onkeyup = function (){
  var pattern = /^[A-Z][a-z]{2,10}$/;


    if(pattern.test(courseName.value)){
     nameAlert.style.display='none';
     isNameValid=true;
    if(courseName.classList.contains('is-invalid')){ 
      courseName.classList.replace('is-invalid' ,'is-valid');
    }
    courseName.classList.add('is-valid');
    nameAlert.style.display='none';
  }
  
  else  { 
    isNameValid = false;
    nameAlert.style.display='block';

    if(courseName.classList.contains('is-valid')){ 
      courseName.classList.replace('is-valid' ,'is-invalid');
    }
    courseName.classList.add('is-invalid');
 
  }
  checkInput();
}





//2-category
var catAlert = document.getElementById('categoryAlert');
catAlert.style.display ='none';

courseCategory.onkeyup = function (){
  var pattern = /^[A-Z][a-z]{2,20}$/;
  if(pattern.test(courseCategory.value)){
    catAlert.style.display ='none';
     isCategoryValid=true;
    if(courseCategory.classList.contains('is-invalid')){ 
      courseCategory.classList.replace('is-invalid' ,'is-valid');
    }
    courseCategory.classList.add('is-valid');
    catAlert.style.display ='none';
  }
  
  else  { 
    
    isCategoryValid = false;
    catAlert.style.display ='block';
    if(courseCategory.classList.contains('is-valid')){ 
      courseCategory.classList.replace('is-valid' ,'is-invalid');
    }
    courseCategory.classList.add('is-invalid');
 
  }
  checkInput();
}



//3- price
var priceAlert = document.getElementById('priceAlert');
priceAlert.style.display = 'none';

coursePrice.onkeyup = function (){
  var pattern = /^[0-9]{3,5}$/;
  if(pattern.test(coursePrice.value) && coursePrice.value >= 100){
    priceAlert.style.display = 'none';
     isPriceValid=true;
    if(coursePrice.classList.contains('is-invalid')){ 
      coursePrice.classList.replace('is-invalid' ,'is-valid');
    }
    coursePrice.classList.add('is-valid');
    catAlert.style.display ='none'; 

  }
  
  else  { 
    
    isPriceValid = false;
    priceAlert.style.display = 'block';
    if(coursePrice.classList.contains('is-valid')){ 
      coursePrice.classList.replace('is-valid' ,'is-invalid');
    }
    coursePrice.classList.add('is-invalid');
 
  }
  checkInput();
}




//4-Description
var desAlert = document.getElementById('desAlert');
desAlert.style.display = 'none';
courseDescription.onkeyup = function (){
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,120}$/; 
  if(pattern.test(courseDescription.value)){
    desAlert.style.display = 'none';
     isDescriptionValid=true;
    if(courseDescription.classList.contains('is-invalid')){ 
      courseDescription.classList.replace('is-invalid' ,'is-valid');
    }
    courseDescription.classList.add('is-valid');
    desAlert.style.display = 'none';
  }
  
  else  { 
    desAlert.style.display = 'block';
    isDescriptionValid = false;
    if(courseDescription.classList.contains('is-valid')){ 
      courseDescription.classList.replace('is-valid' ,'is-invalid');
    }
    courseDescription.classList.add('is-invalid');
 
  }
  checkInput();
}



//3- Capacity
var capAlert = document.getElementById('capAlert');
capAlert.style.display = 'none';
courseCapacity.onkeyup = function (){
  var pattern = /^[0-9]{2,3}$/;
  if(pattern.test(courseCapacity.value)){
    capAlert.style.display = 'none';
     isCapacityValid=true;
    if(courseCapacity.classList.contains('is-invalid')){ 
      courseCapacity.classList.replace('is-invalid' ,'is-valid');
    }
    courseCapacity.classList.add('is-valid');
    capAlert.style.display = 'none';
  }
  
  
  
  else  { 
    capAlert.style.display = 'block';
    isCapacityValid = false;
    if(courseCapacity.classList.contains('is-valid')){ 
      courseCapacity.classList.replace('is-valid' ,'is-invalid');
    }
    courseCapacity.classList.add('is-invalid');
 
  }
  checkInput();
}