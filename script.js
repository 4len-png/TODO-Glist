const taskForm = document.querySelector('#task'); // 

const tasks = [];                                                                             // массив, в который вложаться объекты


taskForm.addEventListener('submit', function (event) {                     // специальный метод смотрит на событие отправки формы и запускает функцию
    event.preventDefault();                                                                         // отменяет перезагрузку страницы, при отправке формы

    const nameOfTask = document.querySelector('#task_input')                       // переменная input'a, в который пишут
    const selectedValue = document.querySelector('#task_select')                   // переменная selecta'a, который выбирают

    const taskData = {                                                                         // создание переменной, в которой будет объект
        id: Date.now(),                                                                             // временная метка в качестве id
        name: nameOfTask.value,                                                                     // ключ -> значение, записывается имя, которое ввели в input
        category: selectedValue.value                                                               // ключ -> значение, записывается категория, которую выбрали в select
    };

    tasks.push(taskData);                                                                           // суём объект в массив

    const tasksCont = document.querySelector('#tasksCard')                         // html-контейнер

    const newDiv = document.createElement('div')                            // html-обёртка, в которую будут помещаться задачи для контейнера taskCard
    newDiv.classList.add('task')
    newDiv.style.cssText = 'display: flex; justify-content: center; gap: 30px';

    // название и категория
    const taskName = document.createElement('span');                       // создание span`a для имени задачи
    taskName.textContent = taskData.name;                                                           // помещение в span имени из объекта taskData

    const taskCategory = document.createElement('span');                   // создание span`a для категории задачи
    taskCategory.textContent = taskData.category;                                                   // помещение в span категории из объекта taskData

    // кнопки
    const completeButt = document.createElement('button');                // создание кнопки для выполнения задачи
    completeButt.textContent = 'Выполнено';                                                         // размещение текста в кнопке
    const deleteButt = document.createElement('button');                  // создание кнопки для удаления задачи
    deleteButt.textContent = 'Удалить';                                                             // размещение текста в кнопке

    newDiv.append(                                                                                  // в обёртку суём данные, из объекта
        taskName,                                                                                   // переменная с именем
        taskCategory,                                                                               // переменная с категорией
        completeButt,                                                                               // кнопка выполено
        deleteButt                                                                                  // кнопка удалить
    );

    tasksCont.append(newDiv);                                                                       // вставляем в html-контейнер полученную обёртку
    

    deleteButt.addEventListener('click', () => {                                  // обнаруживается клик кнопки, задаётся анонимная функция
        newDiv.remove();                                                                            // метод для удаления элемента

        const index = tasks.findIndex(function(task) {                              // переменная, в которой функция
            return task.id === taskData.id;                                                         // findIndex проходится по массиву 
        });

        tasks.splice(index, 1)                                                            // удаляет 1 объект из массива по переменной, в которой индекс
    });

    completeButt.addEventListener('click', () => {                                // обнаруживается клик кнопки, задаётся анонимная функция
        newDiv.classList.add('completed');                                                          // добавляется новый класс
        newDiv.style.textDecoration = 'line-through';                                               // добавляется стиль для такски
        newDiv.style.opacity = 0.5;                                                                 // добавляется стиль для такски
    });

    console.log(tasks);

});

