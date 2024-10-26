document.getElementById('add-task').addEventListener('click', addTask);

const taskList = document.getElementById('task-list');

// Carregar tarefas ao iniciar
loadTasks();

// Função para adicionar tarefa
function addTask() {
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('task-priority');
    const taskValue = taskInput.value;
    const taskPriority = priorityInput.value;

    if (taskValue) {
        addTaskToDOM(taskValue, taskPriority);
        taskInput.value = '';
        priorityInput.selectedIndex = 0; // Resetar a prioridade
        saveTasks();
    }
}

// Função para adicionar tarefa ao DOM
function addTaskToDOM(taskValue, taskPriority, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskValue;

    if (completed) {
        li.classList.add('completed');
    }

    // Adiciona a classe de prioridade
    li.classList.add(taskPriority);

    // Cria os botões
    createTaskButtons(li, taskValue);

    taskList.appendChild(li);
}

// Função para criar botões de tarefa
function createTaskButtons(li, taskValue) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function () {
        const newTask = prompt('Edite a tarefa:', taskValue);
        if (newTask) {
            li.firstChild.textContent = newTask;
            saveTasks();
        }
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Concluir';
    completeButton.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.addEventListener('click', function () {
        li.classList.add('fade');
        setTimeout(() => {
            taskList.removeChild(li);
            saveTasks();
        }, 300);
    });

    li.appendChild(editButton);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.priority, task.completed));
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed'),
            priority: li.classList[1] // Considera a classe de prioridade
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filtros de tarefas
document.getElementById('filter-all').addEventListener('click', () => filterTasks('all'));
document.getElementById('filter-completed').addEventListener('click', () => filterTasks('completed'));
document.getElementById('filter-pending').addEventListener('click', () => filterTasks('pending'));

function filterTasks(status) {
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        task.style.display = (status === 'all' || (status === 'completed' && isCompleted) || (status === 'pending' && !isCompleted)) ? 'flex' : 'none';
    });
}

// Alternar tema
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
});
