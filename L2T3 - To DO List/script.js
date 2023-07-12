const pendingTaskList = document.getElementById('pendingTaskList');
        const completedTaskList = document.getElementById('completedTaskList');
        const addTaskBtn = document.querySelector('.add-task-btn');
        const taskInput = document.querySelector('.task-input');
        const todos = {};

        let count = 1;

        function getCurrentDateTime() {
            const now = new Date();
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return now.toLocaleString('en-US', options);
        }

        function renderToDos() {
            let pendingOutput = '';
            let completedOutput = '';

            for (const todo in todos) {
                const task = todos[todo];
                const taskItem = `
                    <li class="task ${task.isDone ? 'done' : ''}" id="${todo}">
                        <input type="checkbox" class="task-checkbox" ${task.isDone ? 'checked' : ''}>
                        <label>${task.name}</label>
                        <span class="task-time">${task.time}</span>
                        <button class="delete-task-btn">Delete</button>
                    </li>
                `;
                if (task.isDone) {
                    completedOutput += taskItem;
                } else {
                    pendingOutput += taskItem;
                }
            }

            pendingTaskList.innerHTML = pendingOutput;
            completedTaskList.innerHTML = completedOutput;
        }

        addTaskBtn.addEventListener('click', function() {
            const id = 'id' + count;
            const taskName = taskInput.value.trim();

            if (taskName !== '') {
                const dateTime = getCurrentDateTime();
                todos[id] = {
                    name: taskName,
                    isDone: false,
                    time: dateTime
                };
                taskInput.value = '';
                renderToDos();
                count++;
            }
        });

        function updateTaskStatus(id) {
            todos[id].isDone = !todos[id].isDone;
            renderToDos();
        }

        function deleteTask(id) {
            delete todos[id];
            renderToDos();
        }

        pendingTaskList.addEventListener('change', function(e) {
            if (e.target.classList.contains('task-checkbox')) {
                const id = e.target.parentNode.id;
                updateTaskStatus(id);
            }
        });

        completedTaskList.addEventListener('change', function(e) {
            if (e.target.classList.contains('task-checkbox')) {
                const id = e.target.parentNode.id;
                updateTaskStatus(id);
            }
        });

        pendingTaskList.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-task-btn')) {
                const id = e.target.parentNode.id;
                deleteTask(id);
            }
        });

        completedTaskList.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-task-btn')) {
                const id = e.target.parentNode.id;
                deleteTask(id);
            }
        });

        renderToDos();