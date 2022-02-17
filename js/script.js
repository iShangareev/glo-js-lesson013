const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const renderStorageData = function() {
  if(JSON.parse(localStorage.getItem("toDoData")).length > 0) {
    toDoData = JSON.parse(localStorage.getItem("toDoData"))
    render()
      console.log(JSON.parse(localStorage.getItem("toDoData")).length)
  }
}

const render = function () {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''

  toDoData.forEach(function(item, index) {
    const li = document.createElement('li')

    li.classList.add('todo-item')

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
    '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
    '</div>'

    if(item.completed) {
      todoCompleted.append(li)
    } else {
        todoList.append(li)
    }

    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed
      render()
    })

    li.querySelector('.todo-remove').addEventListener('click', function() {
      removeItem(index)
      render()
    })

  })
}

const removeItem = function(index) {
  let storageData = JSON.parse(localStorage.getItem("toDoData"))
  toDoData.splice(index, 1)
  storageData.splice(index, 1)
  localStorage.setItem("toDoData", JSON.stringify(toDoData))
}

todoControl.addEventListener('submit', function(event) {
  event.preventDefault()

  const newTodo = {
    text: headerInput.value,
    completed: false
  }

  if(newTodo.text !== '') {
    toDoData.push(newTodo)

    headerInput.value = ''
  }


  render()
  localStorage.setItem('toDoData', JSON.stringify(toDoData))
})

renderStorageData()
