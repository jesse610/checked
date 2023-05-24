const createNewElement = (type, classes = undefined, attibutes = undefined) => {

    const el = document.createElement(type)

    if (classes !== undefined) {
        el.classList.add(...classes)
    }

    if (attibutes != undefined) {
        el.setAttribute(attibutes[0], attibutes[1])
    }

    const appendTo = (element) => {
        document.querySelector(element).appendChild(el)
    }

    const addTextContent = (string) => {
        el.textContent = `${string}`
    }

    return {
        appendTo,
        addTextContent
    }
}

const editForm = () => {
    
}


export {createNewElement}