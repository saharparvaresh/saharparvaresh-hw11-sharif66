"use strict";

let totalListTodo = document.querySelectorAll(".total-list");
let detailsBox = document.querySelector(".details-todo-list");
let numItemList = document.querySelector(".number-remitem-list");
let checkCompleted;
let filterList = document.querySelectorAll(".total-filter-list");
let filterArrLength;
let btnClearCompleted = document.querySelector(".btn-clear-completed");

function listTodo() {
    totalListTodo.forEach((lists) => {
        addTodo(lists);
        removeTodo(lists);
        hideShowDetails(lists);
        filterDetailsList(lists);
        clearCompletedTodo(lists);
    })
}
listTodo()


function addTodo(lists) {
    document.addEventListener("keypress", (ev) => {
        let valueInput = document.querySelector(".input-add");
        if (valueInput.value != "" && ev.key === "Enter") {
            lists.insertAdjacentHTML("afterbegin",`
                <li class="list-box active-list">
                    <i class="close-list"></i>
                    <input type="checkbox" class="checkbox checkbox-completed">
                    <span class="intro-list">${valueInput.value}</span>
                </li>
            `);
            hideShowDetails(lists);
            numItemDetails(lists);
            checkCompleted = document.querySelectorAll(".checkbox-completed");
            checkCompletedList(lists);
        }
    })
    
}


function removeTodo(lists) {
    document.addEventListener("click", (ev) => {
        for (let j = 0; j < lists.children.length; j++) {
            if (ev.target.className == "close-list" && lists.children[j] === ev.target.parentElement) {
                lists.removeChild(lists.children[j]);
                hideShowDetails(lists);
                numItemDetails(lists);
            }
            checkCompleted = document.querySelectorAll(".checkbox-completed");
            checkCompletedList(lists);
        }
    })
}


function hideShowDetails(lists) {
    lists.children.length > 0 ? detailsBox.style.display = "flex" : detailsBox.style.display = "none";
}


function numItemDetails(lists, filterArrLength) {
    numItemList.innerHTML = lists.children.length;
    if (filterArrLength > 0) {
        numItemList.innerHTML = filterArrLength
    }
}


function checkCompletedList(lists) {
    document.addEventListener("click",(e)=>{
        for (let checkboxIndex = 0; checkboxIndex < lists.children.length; checkboxIndex++) {
            if (lists.children[checkboxIndex] === e.target.parentElement) {
                if (checkCompleted[checkboxIndex].checked) {
                    lists.children[checkboxIndex].classList.add("completed-list");
                } else {
                    lists.children[checkboxIndex].classList.remove("completed-list")
                }
            }
        }
    })
}


let filterArr = [];
function filterDetailsList(lists) {
    filterList.forEach((filterListVal)=>{
        filterListVal.addEventListener("click",function (){
            let activeClassFilter = document.querySelector(".active-filter-list");
            activeClassFilter.classList.remove("active-filter-list");
            this.classList.add("active-filter-list");
            
            for (let itemIndex = 0; itemIndex < lists.children.length; itemIndex++) {
                if (lists.children[itemIndex].className.match("active-list") || lists.children[itemIndex].className.match("completed-list")) {
                    if (filterListVal.innerHTML === "All") {
                        filterArr.push(lists.children[itemIndex]);
                    }
                }
                if (!lists.children[itemIndex].className.match("completed-list")) {
                    if (filterListVal.innerHTML === "Active") {
                        filterArr.push(lists.children[itemIndex]);
                    }
                }
                if (lists.children[itemIndex].className.match("completed-list")) {
                    if (filterListVal.innerHTML === "Completed") {
                        filterArr.push(lists.children[itemIndex]);
                    }
                } 
                lists.children[itemIndex].style.display = "none";  
            }

            hideShowDetails(lists, filterArr.length);
            numItemDetails(lists, filterArr.length);

            for (let filterMember = 0; filterMember < filterArr.length; filterMember++) {
                filterArrLength = filterArr.length;
                filterArr[filterMember].setAttribute("style", "display:flex !important");
            }
            filterArr = [];
        })

    })
    
}


let clearArr = [];
function clearCompletedTodo(lists) {
    btnClearCompleted.addEventListener("click",()=>{
        for (let clearIndex = 0; clearIndex < lists.children.length; clearIndex++) {
            if (lists.children[clearIndex].className.match("completed-list")) {
                clearArr.push(lists.children[clearIndex]);
            }
        }
        for (const clearArrItem of clearArr) {
            lists.removeChild(clearArrItem);
        }
        clearArr = [];
        hideShowDetails(lists)
        numItemDetails(lists)
    })
}
