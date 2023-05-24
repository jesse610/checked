import { defaulProject } from "./applicationLogic";
import { projects } from "./applicationLogic";
import { checkProjectEmpty } from "./applicationLogic";
import { createNewElement } from "./helperFunctions";
import { createNewProject } from "./applicationLogic";
import { displayProjects } from "./onpageload";
import { removeTodoItem } from "./applicationLogic";
import { getAllTodoToday } from "./applicationLogic";
import { format, parseISO } from "date-fns";

const todoContainer = document.querySelector('.todo-container')

const updatetoDoDisplay = (todoItemsArr) => {
    const notCompleted = document.querySelector('.not-completed')
    const completed = document.querySelector('.completed')
    const p = document.querySelector('.emptyProject')

    if (todoItemsArr.length === 0) {
        displayEmptyProject()
    } else {
        updateTodo(todoItemsArr)
    }
}

const onTodoFormSubmit = () => {
    const form = document.querySelector('.form')
    // const todoHeader = document.querySelector('.todo-header')

    form.addEventListener('submit', function() {
        const btnContainer = document.querySelector('.btn-container')
        const currentActive = projects.filter(project => project.active === true)
        form.classList.add('hidden')
        updatetoDoDisplay(currentActive[0].toDoItems)
        btnContainer.classList.remove('hidden')
        // todoHeader.classList.remove('hidden')
    })
}

const updateTodo = (projectName) => {
    const notCompleted = document.querySelector('.not-completed')
    const completed = document.querySelector('.completed')
    const p1 = document.querySelector('.emptyProject')
    const div = document.querySelector('.btn-container')
    notCompleted.textContent = ''
    completed.textContent = ''
    const present = p1.classList.contains('hidden')
    
    if (p1 !== null && !present) {
        p1.classList.add('hidden')
        
        p1.classList.add('hidden')
        div.classList.add('hidden')
    }

    for (let i = 0; i < projectName.length; i++) {
            let li = document.createElement('li')
            let expandBtn = document.createElement('button')
            let delBtn = document.createElement('button')
            delBtn.classList.add('delete-btn')
            expandBtn.classList.add('expand-btn')
            let todoItem = projectName

            let input = document.createElement('input')
            input.setAttribute('type', 'checkbox')
            input.setAttribute('id', i)
            input.setAttribute('class', 'isCompletedCheckbox')

            let priorityDiv = document.createElement('div')
            let prioritySpan = document.createElement('span')
            let prioritySpan2 = document.createElement('span')
    
            let titleDiv = document.createElement('div')
            let titleSpan = document.createElement('span')
            let titleSpan2 = document.createElement('span')
    
            let descDiv = document.createElement('div')
            let descSpan = document.createElement('span')
            let descSpan2 = document.createElement('span')
    
            let dueDateDiv = document.createElement('div')
            let dueDateSpan = document.createElement('span')
            let dueDateSpan2 = document.createElement('span')
    
            prioritySpan.textContent = 'Priorty'
            prioritySpan2.textContent = todoItem[i].priority
    
            titleSpan.textContent = 'Title'
            titleSpan2.textContent = todoItem[i].title
    
            descSpan.textContent = 'Description'
            
            if (todoItem[i].desc.trim().length > 15) {
                console.log(todoItem[i].desc.trim().length)
                let SentencePreview = todoItem[i].desc.slice(0, 15)
                descSpan2.textContent = `${SentencePreview}...`
            } 
            else {
                descSpan2.textContent = todoItem[i].desc.trim()
            }
    
            dueDateSpan.textContent = 'Due Date'
            dueDateSpan2.textContent = todoItem[i].dueDate
    
            priorityDiv.append(prioritySpan, prioritySpan2)
            titleDiv.append(titleSpan, titleSpan2)
            descDiv.append(descSpan, descSpan2)
            dueDateDiv.append(dueDateSpan, dueDateSpan2)
    
            expandBtn.textContent = 'Expand'
            delBtn.textContent = 'Remove'
    
            li.append(input, priorityDiv, titleDiv, descDiv, dueDateDiv, expandBtn, delBtn)
    
            if (todoItem[i].completed === false) {
                input.checked = false
                notCompleted.appendChild(li)
            }
            else {
                input.checked = true
                completed.appendChild(li)
            }
        }
    expandtodo()
    deleteReceiptDisplay()
    displayCompletedTodo()
}

let current = []

const displayCompletedTodo = () => {
    const completedCheckboxes = document.querySelectorAll("input[type='checkbox'") 
    const currentActive = projects.filter(project => project.active === true)
    const clickableLinks = document.querySelectorAll('a')
    const filtered = Array.from(clickableLinks).filter(link => link.classList.contains('active'))
    console.log(clickableLinks)
    console.log(filtered)

    completedCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            let todo = currentActive[0].toDoItems

            if (checkbox.checked === true) {
                todo[checkbox.id].completed = true
                updateTodo(currentActive[0].toDoItems)
            } 
            else {
                todo[checkbox.id].completed = false
                updateTodo(currentActive[0].toDoItems)
            }
            console.log(todo, checkbox.checked)
        })
    })
}

const expandtodo = () => {
    const expandedBtns = document.querySelectorAll('.expand-btn')
    const currentActive = projects.filter(project => project.active === true)
    

    expandedBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log('clicked expand btn')
            current[0] = currentActive[0].toDoItems[index]
            console.log(current)
            displayExpandedTodo(currentActive[0].toDoItems[index])
            saveEditsOnExpand(currentActive[0].toDoItems[index])
        })
    })
}

const deleteReceiptDisplay = () => {
    const deleteBtns = document.querySelectorAll('.delete-btn')
    const currentActive = projects.filter(project => project.active === true)

    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let currentId = currentActive[0].toDoItems[index].id
            removeTodoItem(currentId)
            updateTodo(currentActive[0].toDoItems)
            console.log(projects)
        })
    })
}

const checkActivePage = (anchor) => {
    const projectList = document.querySelectorAll('a')
    projectList.forEach(project => {
        if (project.classList.contains('active')) {
            project.classList.remove('active')
        }
    })
}

const addActiveProject = () => {
    const currentActive = projects.filter(project => project.active === true)
    
}

const displayExpandedTodo = (todo) => {
    const formContainer = document.querySelector('.form')
    const saveBtn = document.querySelector('#submit-btn')
    saveBtn.setAttribute('type', 'button')
    saveBtn.classList.add('hidden')

    let priorityField = document.querySelector('#priority')
    let titleField = document.querySelector('#title')
    let descField = document.querySelector('#desciption')
    let dueDateField = document.querySelector('#duedate')

    formContainer.classList.remove('hidden')
    priorityField.value = todo.priority
    titleField.value = todo.title
    descField.value = todo.desc 
    dueDateField.value =  format(new Date(todo.dueDate), "yyyy-MM-dd")
}

const saveEditsOnExpand = (todo) => {
    console.log(todo)
    const saveBtn = document.querySelector('#submit-btn')
    saveBtn.classList.remove('hidden')
    
    if (saveBtn.getAttribute('listener') !== 'true') {
        saveBtn.addEventListener('click', function() {
            if (saveBtn.type === 'button') {
            const currentActive = projects.filter(project => project.active === true)
            todo = current[0]
                const formContainer = document.querySelector('.form')
            saveBtn.setAttribute('listener', 'true')
            let priorityField = document.querySelector('#priority')
            let titleField = document.querySelector('#title')
            let descField = document.querySelector('#desciption')
            let dueDateField = document.querySelector('#duedate')
    
            todo.priority = priorityField.value
            todo.title = titleField.value
            todo.desc = descField.value
            todo.dueDate = dueDateField.value
            todo.dueDate = format(parseISO(todo.dueDate), "MM/dd/yyyy")
            formContainer.classList.add('hidden')
            console.log(projects)
            updateTodo(currentActive[0].toDoItems)
            }
        })
    }
}

const displayEmptyProject = () => {
    const currentActive = projects.filter(project => project.active === true)
    const p = document.querySelector('.emptyProject')

    if (currentActive[0].toDoItems.length === 0 && p === null) {
        const p1 = document.createElement('p')
        p1.classList.add('emptyProject')
        p1.classList.remove('hidden')
        todoContainer.appendChild(p1)
        p1.textContent = 'Oh no, nothing to do yet!'
        // displayPlusBtn()
    } else {
        p.classList.remove('hidden')
        p.textContent = 'Oh no, nothing to do yet!'
        const btnContainer = document.querySelector('.btn-container')
        btnContainer.classList.remove('hidden')
    }
}

const createPlusBtn = () => {
    const p = document.querySelector('.emptyProject')
    const submitBtn = document.querySelector('#submit-btn')
    const div = document.createElement('div')
    const btn = document.createElement('button')
    div.classList.add('btn-container')
    btn.classList.add('createNewTodoBtn')
    todoContainer.appendChild(div)
    div.appendChild(btn)
    btn.textContent = '+'

    btn.addEventListener('click', function() {
        submitBtn.setAttribute('type', 'submit')
        displayForm()
        onFormCancel()
        div.classList.add('hidden')
        p.classList.add('hidden')
    })
}

const displayPlusBtn = () => {
    const btn = document.querySelector('.btn-container')
    btn.classList.remove('hidden')
}

const displayForm = () => {
    const form = document.querySelector('.form')
    const form1 = document.querySelector('.todo-form')
    form1.reset()
    form.classList.remove('hidden')
}

const projectClick = () => {
    const notCompleted = document.querySelector('.not-completed')
    const completed = document.querySelector('.completed')
    const form = document.querySelector('.form')
    let anchors = document.querySelectorAll('.project')

    anchors.forEach((anchor, index) => {
        anchor.addEventListener('click', function () {
            if (anchor.textContent === projects[index].projectName) {
                updateActiveState(projects[index])
                notCompleted.textContent = ''
                completed.textContent = ''
                form.classList.add('hidden')
                checkActivePage()
                anchor.classList.add('active')
                updatetoDoDisplay(projects[index].toDoItems)
                displayPlusBtn()
            } 
        })
    })
}


const updateActiveState = (project) => {
    const currentActive = projects.filter(project => project.active === true)
    if (currentActive[0].active != undefined) {
        currentActive[0].active = false
        project.active = true
    } 
    else {
        project.active = true
        console.log(project)
    }
}

const displayNewProject = () => {
    const projectContainer = document.querySelector('.projects')
    const btn = document.querySelector('#add-project-btn')
    const formDiv = createNewElement('div', ['form-container'])
    const projectForm = document.createElement('form')
    projectForm.setAttribute('action', '#')
    projectForm.setAttribute('method', 'post')
    projectForm.setAttribute('id', 'projectForm')
    projectForm.setAttribute('onsubmit', 'return false')
    const projectlabel = createNewElement('label', ['hidden'], ['for', 'project-input'])
    const projectInput = createNewElement('input', undefined, ['id', 'project-input'])
    const submitBtn = document.createElement('input')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.setAttribute('id', 'project-name-submit')
    submitBtn.hidden = true

    btn.addEventListener('click', function() {
        projectForm.classList.remove('hidden')
        formDiv.appendTo('.projects')
        projectContainer.appendChild(projectForm)
        projectlabel.appendTo('form')
        projectlabel.addTextContent('Label:')
        projectInput.appendTo('form')
        document.querySelector('.form-container').appendChild(projectForm)
        document.querySelector('form').appendChild(submitBtn)
        document.querySelector('#project-input').focus()
        onProjectNameSubmit()
    })

}

const onProjectNameSubmit = () => {
    const projectForm = document.querySelector('#projectForm')

    projectForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const name = document.querySelector('#project-input').value
        console.log('submited project name!')
        createNewProject(name)
        console.log(projects)
        projectForm.reset()
        projectForm.classList.add('hidden')
        displayProjects()
        projectClick()
    })
}

const onFormCancel = () => {
    const form = document.querySelector('.form')
    const formAc = document.querySelector('.form > form')
    const cancelBtn = document.querySelector('#cancel-btn')


    cancelBtn.addEventListener('click', function() {
        const btnContainer = document.querySelector('.btn-container')
        const currentActive = projects.filter(project => project.active === true)
        form.classList.add('hidden')
        updatetoDoDisplay(currentActive[0].toDoItems)
        btnContainer.classList.remove('hidden')
        formAc.reset()
    })
}

const clickDate = () => {
    const dates = document.querySelector('#today')
    const p = document.querySelector('.emptyProject')
    const btnContainer = document.querySelector('.btn-container')
    const completedContainer = document.querySelector('.completed')
    const uncompletedContainer = document.querySelector('.not-completed')

    dates.addEventListener('click', function() {
        checkActivePage()
        console.log(getAllTodoToday().length)

        dates.classList.add('active')
        if (getAllTodoToday().length > 0) {
            btnContainer.classList.add('hidden')
            updateTodo(getAllTodoToday())   
        }
        else {
            p.classList.remove('hidden')
            p.textContent = 'Nothing to do today!'
            btnContainer.classList.add('hidden')
            completedContainer.textContent = ''
            uncompletedContainer.textContent = ''
        }
    })

}


export {projectClick, updatetoDoDisplay, onTodoFormSubmit, createPlusBtn, displayEmptyProject, displayNewProject, clickDate}