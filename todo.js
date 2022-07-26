
//items
const form = document.querySelector("#todo-form");
const todoinput= document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secendCardBody=document.querySelectorAll(".card-body")[1];
const filter= document.querySelector("#filter");
const clearButton =document.querySelector("#clear-todos");

eventListeners();


function eventListeners(){ // Eventler
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
document.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAll);
}


function clearAll(){
                //arayüzden silme
    if(confirm("Are you want to clear whole list?")){
       // todolist.innerHTML="";  //yavaş yöntem
            while (todolist.firstElementChild!=null){
                todolist.removeChild(todolist.firstElementChild);
            }
    }
}

function filterTodos(e){
    const filterText= e.target.value.toLowerCase();
    const listItems= document.querySelectorAll(".list-group-item");

    listItems.forEach((item) =>{
            const text= item.textContent.toLocaleLowerCase();

            if (text.indexOf (filterText)===-1){ //bulamadı
                item.setAttribute("style","display : none !important");
            }else{ //çalışmamasının sebebi bootstrap'de önemli komutu var? bu yüzden bu kod çalıştırılmıyo. oyüzden önemli hale getirilmeli
                item.setAttribute("style","display : block");
            }
    })


}

function loadAllTodosToUI(){
   let todos= getLocalTodos();
   todos.forEach(element => {
    addTodoToUI(element)
   });
}

function deleteTodo(e){
    if (e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        showAlert("success","To do Silindi")
        console.log(e.target.parentElement.parentElement.textContent)
        removeLocal(e.target.parentElement.parentElement.textContent);
    }
}

function addTodo(event){
    const newTodo = todoinput.value.trim();
    
    if (newTodo==="")
    showAlert("danger","Please Write "); 
    else if(isHaveIt(newTodo)){
    showAlert("warning","Var olan bir yazı girdiniz");
    } 
    else {
    addTodoToUI(newTodo);
    addLocal(newTodo);
}
    console.log(newTodo);

    event.preventDefault();
    todoinput.value="";
}

function addTodoToUI(newTodo) {
            //eklenecek kısım
/* 
    <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>
*/
            //list item
    const listItem = document.createElement("li");
    listItem.className= "list-group-item d-flex justify-content-between";

            //link oluşturma
    const link= document.createElement("a");
    link.href= "#";
    link.className= "deleteitem";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

            //text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link)

            //todo liste item ekleme
    todolist.appendChild(listItem);
   
}

function showAlert(type,message){
            //uyarı şekli
/*
    <div class="alert alert-danger" role="alert">
    This is a danger alert—check it out!
    </div>
*/
const alert = document.createElement("div");
alert.className="alert alert-"+type;
alert.textContent= message;

console.log(message);

firstCardBody.appendChild(alert);
            //setTimeOut
setTimeout(function(){alert.remove();},1000);

}

function addLocal(newTodo){
    let todos = getLocalTodos();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getLocalTodos(){
    let todos;
    if (localStorage.getItem("todos")=== null){
    todos=[];}
    else{
    todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function removeLocal(text){
    let todos = getLocalTodos();
    todos.forEach((element,index) => {
        if (element===text){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function isHaveIt(newTodo){
    const todos= getLocalTodos();
    let check=false;
    todos.forEach((e)=>{
        if (e===newTodo) {
            check=true;
        }
    });
    return check;
}