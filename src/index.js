import {defaulProject, projects, createTodo, createNewProject, removeProject, uuidv4, removeTodoItem, markComplete } from "./applicationLogic";
import { onPageLoad } from "./onpageload";
import { clickDate, projectClick } from "./domlogic";
import './style.css'
import { compareAsc, format } from 'date-fns'
import { formValues } from "./applicationLogic";
import { onTodoFormSubmit } from "./domlogic";
import { displayNewProject } from "./domlogic";
import { getTodaysDate } from "./applicationLogic";
import { getAllTodoToday } from "./applicationLogic";

onPageLoad()
formValues()
onTodoFormSubmit()
displayNewProject()
clickDate()
projectClick()


console.log(getTodaysDate())
console.log(getAllTodoToday())