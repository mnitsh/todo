let list = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");

let listTask = [
  { content: "content task 1", status: 'doing' },
  {
    content: "content task 2",
    status: 'complete'
  },
];


//check if has data listtask in localstorage
if (localStorage.getItem("listTask") != null) {
  listTask = JSON.parse(localStorage.getItem("listTask"));
}
//This function i used to save your task to localstorage
//so that they will not disapper when you close the browser or f5
function saveLocalStorage() {
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

btnAdd.onclick = function(event){
  //Every time click the button
  //the page has to reload
  //add this code to fit it
  event.preventDefault();
  /* console.log("clicked"); */
  //get data content task you write
  let content = document.getElementById('task').value;
  //we only continue if the content is not empty
  if(content !=""){
    //ues unshift to add to the beginning of the array
    listTask.unshift({
      content:content,
      status:'doing'
    })
  }
  //fun function addTask to referesh page
  addTaskToHTML();
  //after adding,detete the content in the form 
  document.getElementById('task').value = '';
  //when F5 or closed the browser ,newly added data is not saved
  //because the value int listtask array is diffrent form the original
  //run the savelocalstorage function to update data listtask array in localstorage
  saveLocalStorage();
}




//create a function to put task data out of html
function addTaskToHTML() {
  list.innerHTML = "";
  listTask.forEach((task, index) => {
    let newTask = document.createElement("li");
    newTask.classList.add(task.status)
    newTask.innerHTML = `
                <div class="complete-icon" onClick = "completeTask(${index})">
                    <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      
                </div>
                <div class="content">${task.content}</div>
                <div class="close-icon" onClick = "deleteTask(${index})">
                    <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                      </svg>
                      
                </div>
            `;
    //adding new task in class list-->
    list.appendChild(newTask);
  });
}

addTaskToHTML();


//when clicked on complete icon ,run function completeTask to change status task
//index is order position this task in array

function completeTask(index) {
  //i changed status task in listtask has position index
  listTask[index].status = 'complete';
  //run addTaskToHtml to reload
  addTaskToHTML();
  //every time data listtask change
  //please run the savelocalstorage function again so that it saves the new data
  saveLocalStorage();
}

//when click close icon,run function deleteTask to delete this task
function deleteTask(index){
  //use filter to filter out task whose location is diffrent from the passed index
  listTask = listTask.filter((task,newIndex)=>{ return newIndex != index})
  //run addTaskToHTML again
  addTaskToHTML();
  //run savelocalstorage to save new data
  saveLocalStorage();

}