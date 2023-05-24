
const { v1: uuidv1 } = require('uuid');
import { format, endOfDay } from 'date-fns';
import { parseISO } from 'date-fns';

const defaulProject = {
    projectName: 'default',
    toDoItems: [],
    active: true,
}

const projects = [defaulProject]

const getCurrentProject = () => {
    const currentProject = projects.filter(project => project.active === true)
    return currentProject
}

const createTodo = (priority, title, desc, dueDate) => {
    let todoItem = {priority, title, desc, dueDate}
    todoItem.id = uuidv1()
    todoItem.dueDate = format(parseISO(dueDate), "MM/dd/yyyy")
    todoItem.completed = false

    const currentProject = getCurrentProject()
    return currentProject[0].toDoItems.push(todoItem), console.log(projects)
}

const checkProjectName = (project) => {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName === project) {
            return alert('Please enter another name.'), true
        }
    } 
}

const createNewProject = (project) => {
    if (!checkProjectName(project)) {
        project = {
            projectName: project,
            toDoItems: [],
            active: false
        }
        projects.push(project)
        return project
    } 
}

const removeProject = (project) => {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].projectName === project && projects.length > 1) {
            projects.splice(i, 1)
        }
    }
}

const removeTodoItem = (id) => {
   const currentProject = getCurrentProject()
   let toDoItemsArr = currentProject[0].toDoItems

    for (let i = 0; i < toDoItemsArr.length; i++) {
        if (toDoItemsArr[i].id === id) {
            toDoItemsArr.splice(i, 1)
        }
    }
}

const markComplete = (id) => {
    const currentProject = getCurrentProject()
    let toDoItemsArr = currentProject[0].toDoItems

    for (let i = 0; i < toDoItemsArr.length; i++) {
        if (toDoItemsArr[i].id === id) {
            toDoItemsArr[i].completed = true
        }
    }
}

const formValues = () => {
    const form = document.querySelector('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const priority = `${document.querySelector('#priority').value}`
        const title = `${document.querySelector('#title').value}`
        const desc =  `${document.querySelector('#desciption').value}`
        const dueDate =  `${document.querySelector('#duedate').value}`

        createTodo(priority, title, desc, dueDate)
        form.reset()
    })
}

const getTodaysDate = () => {
    const todayDate = format(new Date(), "MM/dd/yyyy")
    return todayDate
}

const getAllTodoToday = () => {
    const today = getTodaysDate()
    const todayTodos = []
    console.log('clicked today')
    for (let i = 0; i < projects.length; i++) {
        for (let j = 0; j < projects[i].toDoItems.length; j++) {
            if (projects[i].toDoItems[j].dueDate === today) {
                todayTodos.push(projects[i].toDoItems[j])
            }
        }
    }
    return todayTodos
}


export {defaulProject, projects, createTodo, createNewProject, removeProject, removeTodoItem, markComplete, formValues, getTodaysDate, getAllTodoToday}