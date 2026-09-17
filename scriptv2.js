const taskForm = document.querySelector('#task');                               // переменной присваивается форма по id
const tasks = [];
const tasksCont = document.querySelector('#tasksCard');
loadData()                                                                      // загрузка данных из localstorage

taskForm.addEventListener('submit', handleSubmit)                               // listener на кнопку подтверждения формы

function handleSubmit (event) {
    event.preventDefault();                                                     // функция для отмены перезагрузки страницы

    const taskData = getTaskData();                                             // переменная, в которую помещаются данные из формы

    if (!taskData) {
        return;
    }

    addTask(taskData);
    saveData();
    renderTask(taskData);
    taskForm.reset();

}

function getTaskData() {                                                        // функция получения данных из формы
    const nameOfTask = document.querySelector('#task_input');                   // переменная для данных из поля названия
    const selectedValue = document.querySelector('#task_select');               // переменная для данных из поля выбора


    const taskData = {                                                          // возврат объекта
        id: Date.now(),                                                         // id присваивается timestamp
        name: nameOfTask.value,                                                 // имя: название таски из поля формы
        category: selectedValue.value,                                          // категория: выбранная категория из поля формы
        completed: false                                                        // статус задачи
    };

    if (!taskData.name.trim()) {
        alert('Поле не должно быть пустым')
        return null;
    }

    return taskData;
};

function addTask(taskData) {
    tasks.push(taskData);
};

function renderTask(taskData) {                                                 // функция, которая форматирует новый div-элемент
    const newDiv = document.createElement('div');                               // переменная, которая создаёт новый div
    newDiv.classList.add('task');                                               // присваивается класс task
    newDiv.style.cssText = `display: flex; justify-content: center; gap: 30px`;         // добавляются стили

    if (taskData.completed === true) {
        completeTask(taskData, newDiv);
    }

    // название и категория
    const taskName = document.createElement('span');                            // создание span`a для имени задачи
    taskName.textContent = taskData.name;                                       // помещение в span имени из объекта taskData
    const taskCategory = document.createElement('span');                        // создание span`a для категории задачи
    taskCategory.textContent = taskData.category;                               // помещение в span категории из объекта taskData

    // кнопки
    const completeBtn = document.createElement('button');                       // создание кнопки для выполнения задачи
    completeBtn.textContent = 'Выполнено';                                      // размещение текста в кнопке
    completeBtn.classList.add('completeBtn');
    completeBtn.style.cssText = 'background-color: #01a31d; color: #fff;  border: 1px solid #000; padding: 5px 10px; color: #fff;';
    const deleteBtn = document.createElement('button');                         // создание кнопки для удаления задачи
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'Удалить'
    deleteBtn.style.cssText = 'background-color: #f50001; color: #fff;  border: 1px solid #000; padding: 5px 10px; color: #fff;';

    newDiv.append(                                                              // в обёртку суём данные, из объекта
        taskName,                                                               // переменная с именем
        taskCategory,                                                           // переменная с категорией
        completeBtn,                                                            // кнопка выполнено
        deleteBtn                                                               // кнопка удалить
    );

    tasksCont.append(newDiv);

    // обработчики для кнопок


    deleteBtn.addEventListener('click', () => {                                 // обнаруживается клик кнопки, задаётся анонимная функция
        deleteTask(taskData, newDiv);
        saveData();
    });

    completeBtn.addEventListener('click', () => {                               // обнаруживается клик кнопки, задаётся анонимная функция
        completeTask(taskData, newDiv);
        saveData();
    });
}


function deleteTask(obj, element) {

        element.remove();                                                       // удаляется карточка задачи

        const index = tasks.findIndex(function(task) {                          // переменная, в которой функция ищет индекс задачи
            return task.id === obj.id;                                          // findIndex проходится по массиву
        });

        if (index !== -1) {                                                     // проверка, потому что findIndex может вернуть -1, если ничего не найдёт
            tasks.splice(index, 1);                                             // удаляет 1 объект из массива по переменной, в которой индекс
        }
}

function completeTask(obj, element) {
    obj.completed = true;
    element.style.cssText = 'display: flex; justify-content: center; gap: 30px; text-decoration: line-through; opacity: 0.5;';
}

function saveData() {                                                           // функция сохранения временной информации
    localStorage.setItem('tasks', JSON.stringify(tasks));                       // передаётся имя и объект, переданный из массива tasks
}

function loadData(obj, element) {
    const savedTasks = localStorage.getItem('tasks');


    if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);

        parsedTasks.forEach(task => {
            addTask(task);
            renderTask(task);
        });
    }
}


