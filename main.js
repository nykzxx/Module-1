// Pegando Dados
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
refreshTasks()

// Salvando os Dados
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Atualizando a Tabela
function refreshTasks() {
    const div = document.getElementById('tasksContainer');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    for(let i = 0; i < tasks.length; i++) {
        const container = document.createElement('div');
        container.className = 'w-full h-10 rounded-xl bg-neutral-800/20 border-neutral-600/40 border flex flex-row items-center px-5 place-content-between transition-all hover:bg-neutral-800/60 my-2';

        // Label com input
        const label = document.createElement('label');
        label.className = 'peer flex flex-col';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'todo';
        input.id = 'todo';
        if (tasks[i].completed){
          input.checked = tasks[i].completed;
        };
        input.addEventListener('change', () => {
            tasks[i].completed = input.checked;
            saveTasks();
        });
        input.className = 'accent-red-600 text-red-600 bg-gray-100 border-gray-300 rounded-full focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600';

        label.appendChild(input);

        // Parágrafo
        const p = document.createElement('p');
        p.className = 'peer-has-checked:line-through text-neutral-300 font-semibold';
        p.textContent = tasks[i].name;

        // Botão
        const button = document.createElement('button');
        button.className = 'text-white font-bold cursor-pointer hover:text-red-700 transition-all';
        button.textContent = 'x';
        button.onclick = () => {
            deleteTask(i)
        }

        // Monta a estrutura
        container.appendChild(label);
        container.appendChild(p);
        container.appendChild(button);

        // Exemplo: adicionando no body (você pode adicionar onde quiser)
        document.getElementById('tasksContainer').appendChild(container);
    }
    saveTasks()
}

// Criando Tarefa
function addTask(){
    if (document.getElementById('taskText').value) {
        const taskName = document.getElementById('taskText');
        
        let taskObj = {
            name: taskName.value,
            completed: false
        }
        tasks.push(taskObj)
        document.getElementById('taskText').value = '';
        console.log('Task created Sucessful! Refreshing tasks...');
        refreshTasks()
    } else {
        alert('Digita a tarefa ne animal')
    }
    
}

// Deletando a Tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    refreshTasks();
    saveTasks();
}
