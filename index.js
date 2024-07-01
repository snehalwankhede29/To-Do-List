let cardEl = document.getElementById("card");
let userInputEL = document.getElementById("userInput");
let btnEl = document.getElementById("btn");

// let localStorageItem ="My local Storage Element";
// localStorage.setItem("myItem",localStorageItem);
// let getLocallyStoredItem = localStorage.getItem("myItem");
// console.log(localStorageItem);
// localStorage.removeItem("myItem");

function getParsedTodoList(){
    let myStoredToDo = localStorage.getItem("myTodo");
    let parsedToDoList = JSON.parse(myStoredToDo);
    console.log(parsedToDoList);
    if(parsedToDoList===null){
        return [];
    }
    else{
        return parsedToDoList;
    }
    
}

let myArray = getParsedTodoList();
console.log(myArray);

// console.log(myStoredToDo);

// let myArray=[
//     {
//         title:"HTML",
//         uniqueid:1
//     },
//     {
//         title:"CSS",
//         uniqueid:2
//     },
//     {
//         title:"JS",
//         uniqueid:3
//     }
// ] 
// console.log(typeof(myArray));

function saveToDo(){
    let LocallyStoredList = JSON.stringify(myArray);
    localStorage.setItem("myTodo",LocallyStoredList);
}


function onToDoStatusChange(labelId,updateuniqueid,ToDoid){
    let myCheckBoxEl = document.getElementById(updateuniqueid);
    let myLabelEl = document.getElementById(labelId);

    if(myCheckBoxEl.checked===true){
        myLabelEl.classList.add("checked");
    }
    else{
        myLabelEl.classList.remove("checked");
    }

    let statusToDoIndex = myArray.findIndex(function(each){
        let eachToDoid = "todo"+ each.uniqueid;
        if(eachToDoid===ToDoid){
            return true;
        }
        else{
            return false;
        }
    })

    let checkedTodo = myArray[statusToDoIndex];
   
    if(checkedTodo.isChecked===true){
        checkedTodo.isChecked = false;
    }
    else{
        checkedTodo.isChecked = true;
    }

}

function onDeleteToDoEL(ToDoid){
    let deletedToDo = document.getElementById(ToDoid);
    cardEl.removeChild(deletedToDo);

    let deletedToDoIndex = myArray.findIndex(function(each){
        let eachToDoid = "todo"+ each.uniqueid;
        if(eachToDoid===ToDoid){
            return true;
        }
        else{
            return false;
        }
    })
    // console.log(deletedToDoIndex);

        myArray.splice(deletedToDoIndex,1);
        console.log(myArray);

}


function createAndAppendToDo(todo){
    let ToDoid = "todo" + todo.uniqueid;
    let updateuniqueid = "checkbox"+ todo.uniqueid;
    let labelId = "myLabel"+ todo.uniqueid;
    // console.log(ToDoid);

    let div1 = document.createElement("div");
    div1.classList.add("div1");
    div1.id = ToDoid;
    cardEl.appendChild(div1);

    let checkboxEl = document.createElement("input");
    checkboxEl.id = updateuniqueid;
    checkboxEl.type = "checkbox";
    checkboxEl.checked=todo.isChecked;
    div1.appendChild(checkboxEl);

    checkboxEl.onclick = function(){
        onToDoStatusChange(labelId,updateuniqueid,ToDoid);
    }

    let labelEl = document.createElement("label");
    labelEl.classList.add("labelC");
    labelEl.htmlFor = updateuniqueid;
    div1.appendChild(labelEl);

    let para = document.createElement("p");
    para.textContent = todo.title;
    para.id = labelId;
    if(todo.isChecked===true){
        para.classList.add("checked");
    }
    labelEl.appendChild(para);

    let icon = document.createElement("i");
    icon.classList.add("fa-solid","fa-trash");
    labelEl.appendChild(icon);
    icon.onclick = function(){
        onDeleteToDoEL(ToDoid);
    }
}


function ontodo(){
    let userInputVal = userInputEL.value;
    let lengthOfToDo = myArray.length;

    if(userInputVal===""){
        alert("please enter a valid input");
    }
    else{
        let newToDo = {
            title : userInputVal,
            uniqueid : lengthOfToDo+1,
            isChecked:false
        }
    
        myArray.push(newToDo);
        createAndAppendToDo(newToDo);
        console.log(myArray);
    }
    userInputEL.value = "";
}

for (let todo of myArray){
    createAndAppendToDo(todo);
}

