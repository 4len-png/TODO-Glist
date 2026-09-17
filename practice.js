// задача 11

const listTODO = [];
let count = 0;

function showTasks() {
    console.log(listTODO);
}

function createTask(name) {

    count++;
    listTODO.push({id: count, name, completed: false});
    return listTODO;
}

function deleteTask(array, id) {
    const index = array.findIndex(task => task.id === id)

    if (index > -1) {
        array.splice(index, 1);
    }

    return array;
}

function completeTask(array, id) {
    const foundTask = array.find(task => task.id === id)

    if (foundTask) {
        foundTask.completed = true;
    } else {
        return {};
    }

}

createTask('JS');
createTask('PHP');
createTask('CSS');

deleteTask(listTODO, 2);
completeTask(listTODO, 15);

showTasks();
