const formAddTodo = document.querySelector(".form-add-todo");
const todoList = document.querySelector(".todos-container");
const formSearchTodo = document.querySelector(".form-search");

const todoContainerHeight = 49;
let todoArray = [];

const updateTodoArray = () => todoArray = Array.from(todoList.children);
const convertToLowerCase = string => string.toLowerCase();
const scroll = (left, top) => todoList.scroll(left, top);
const alertUser = message => alert(message);
const styleTodoSelected = todo => todo.classList.add('selected');

const resetTodosStyle = () =>
    todoArray.forEach(todo => todo.classList.remove('selected'));

const resetAllForms = () => {
    formSearchTodo.reset();
    formAddTodo.reset();
}

const removeTodo = trashCan => {
    trashCan.parentElement.remove();
    resetTodosStyle();
}

const searchUserTodoInTodoArray = userTodo => {
    const todoFound = todoArray.find((todoInArray, index) => {
        const userTodoInLowerCase = convertToLowerCase(userTodo);
        const todoInArrayInLowerCase = convertToLowerCase(todoInArray.innerText);

        const isUserTodoInArray = todoInArrayInLowerCase === userTodoInLowerCase;

        if (isUserTodoInArray) {
            const todoHeightPosition = todoContainerHeight * index;

            styleTodoSelected(todoInArray);
            scroll(0, todoHeightPosition);
            return todoInArray;
        }
    })

    if (!todoFound) {
        const reponse = confirm('O to-do não se encontra na lista, você quer adicioná-lo ?');

        if (reponse) {
            insertTodo(userTodo);
        }
    }
}

const insertTodo = userTodo => {
    const todoFirstLetter = userTodo[0];
    const todoFirstLetterToUppercase = todoFirstLetter.toUpperCase();

    userTodo = userTodo.replace(todoFirstLetter, todoFirstLetterToUppercase);

    todoList.innerHTML +=
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${userTodo}</span>
            <i class="far fa-trash-alt delete"></i>
            </li>`;
}

const userTodoProcessing = userTodo => {
    const isUserTodoInArray = todoArray.some(({ innerText }) => 
        innerText.toLowerCase() === userTodo.toLowerCase())

    if (!isUserTodoInArray) {
        const totalTodoInList = todoArray.length;
        const lastTodoPosition = todoContainerHeight * totalTodoInList

        insertTodo(userTodo);
        scroll(0, lastTodoPosition)
        return
    }

    alertUser('O to-do já se encontra na lista e será selecionado')
    searchUserTodoInTodoArray(userTodo)
}

const handleAddTodo = event => {
    const keyEnter = event.key === 'Enter';

    resetTodosStyle();
    formSearchTodo.reset();

    if (keyEnter) {
        event.preventDefault();

        const userTodo = formAddTodo.add.value.trim();
        const isUserTodoValid = userTodo.length;

        if (isUserTodoValid) {
            updateTodoArray();
            userTodoProcessing(userTodo);
            resetAllForms();
            return;
        }

        formAddTodo.reset();
    }
}

const handleSearchToDo = event => {
    const keyEnter = event.key === 'Enter';

    resetTodosStyle();
    formAddTodo.reset();

    if (keyEnter) {
        event.preventDefault();

        const userTodo = convertToLowerCase(formSearchTodo.search.value.trim());
        const isUserTodoValid = userTodo.length;

        if (isUserTodoValid) {
            updateTodoArray();
            searchUserTodoInTodoArray(userTodo);
            resetAllForms();
            return;
        }

        formSearchTodo.reset();
    }
}

const handleRemoveTodo = event => {
    const clickedItem = event.target;
    const trashCan = "I";

    const isTrashCanClicked = clickedItem.nodeName === trashCan;

    resetAllForms();

    isTrashCanClicked ? removeTodo(clickedItem) : undefined;
}

formAddTodo.addEventListener('keydown', handleAddTodo)
formSearchTodo.addEventListener('keydown', handleSearchToDo)
todoList.addEventListener("click", handleRemoveTodo)