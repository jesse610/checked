import { defaulProject, projects } from "./applicationLogic";
import { compareAsc, format } from 'date-fns'
import { createPlusBtn, updatetoDoDisplay } from "./domlogic";
import { displayPlusBtn, displayEmptyProject } from "./domlogic";

const onloadDefaultProject = projects[0].toDoItems

const displayProjects = () => {
    const projectsContainer = document.querySelector('.projects')
    projectsContainer.textContent = ''

    projects.forEach((project, index) => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        let n = project.projectName

        a.classList.add('project')
        a.textContent = n
        a.setAttribute('href', '#')
        projectsContainer.appendChild(li)
        li.appendChild(a)

        if (project.active === true) {
            a.classList.add('active')
            console.log('adding active from display prjects')
        }
    })
}

const pageLoadActive = () => {
    const projectList = document.querySelectorAll('.project')
    projectList.forEach((project, index) => {
        if (index === 0) {
            project.classList.add('active')
        }
    })
}

const checkEmptyProject = () => {
    if (onloadDefaultProject.length === 0) {
        displayEmptyProject()
    }
}

const onPageLoad = () => {
    displayProjects()
    updatetoDoDisplay(onloadDefaultProject)
    // checkEmptyProject()
    createPlusBtn()
    pageLoadActive()
}

export {onPageLoad, displayProjects}