interface Item {
    id: number,
    title: string,
    status: Status,
    completedOn?: Date
}

enum Status {
    done,
    inProgress,
    todo
}

const todoItems: Item[] = [
    { id: 1, title: "Learn HTML", status: Status.done, completedOn: new Date("2011-09-11") },
    { id: 2, title: "Learn TypeScript", status: Status.inProgress },
    { id: 3, title: "Write the best web app in the world", status: Status.todo },
]

function addTodoItem(title = "Unnamed Todo Item") {
    const id = getNextId()
    const item: Item = { id: id, title: title, status: Status.todo}
    todoItems.push(item)
    return item
}

function getNextId() {
    return todoItems.reduce((max, x) => x.id > max ? x.id : max, 0) + 1
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))