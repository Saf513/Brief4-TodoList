// Déclarer les variables
let dateActuelle = new Date();
let mood = "create";

//validation de storage
let dataTache;
if (localStorage.TaskData != null) {
    dataTache = JSON.parse(localStorage.TaskData);
}
else {
    dataTache = [];
}

//ajourt event listenner
document.addEventListener('DOMContentLoaded', () => {
    const addUniqueButton = document.getElementById('add-unique');
    const modal = document.getElementById('modal-unique');
    const closeModalButton = document.getElementById('closeModal');
    const addBtn = document.getElementById('valid');
    const closeDetailsButton = document.getElementById('closeDetails');
    const modalDetails = document.getElementById('modal-details');

    closeDetailsButton.addEventListener('click', () => {
        modalDetails.classList.add('hidden');
    });
    loading();
    modal.classList.add('hidden');

    addUniqueButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    addBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        addToStatut();
        updateCounters();
        clearData();
    })

});


function addToStatut() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const statut = document.getElementById('statut').value.trim();
    const importance = document.getElementById('importance').value.trim();

    // Validation des champs
    if (title === '') {
        alert('Le titre est requis.');
        return;
    }
    if (description === '') {
        alert('La description est requise.');
        return;
    }
    if (duration === '') {
        alert('La durée est requise.');
        return;
    }
    const validStatuses = ['todo', 'doing', 'done'];
    if (!validStatuses.includes(statut)) {
        alert('Le statut doit être "todo", "doing" ou "done".');
        return;
    }
    const validImportances = ['eleve', 'moyen', 'faible'];
    if (!validImportances.includes(importance)) {
        alert('L\'importance doit être "eleve", "moyen" ou "faible".');
        return;
    }

    // Créer l'objet tache
    const tache = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        duration: document.getElementById('duration').value,
        statut: document.getElementById('statut').value,
        importance: document.getElementById('importance').value,
        dateActuelle: dateActuelle
    };


    const containerToDo = document.createElement("div");
    containerToDo.classList.add('bg-white', 'mt-2')

    if (tache.importance === "eleve") {
        containerToDo.innerHTML = `
        <div class="space-x-2 py-3 bg-white w-80 border-2 border-green-500 border-solid border-l-8">
     <h4 class="text-xl font pl-4 ">${tache.title}</h4>
     <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="editerTache(this)" >editer</button>
     <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	"  >Détails</button>
     <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
     </div>
     `;
    } else if (tache.importance === "moyen") {
        containerToDo.innerHTML = `
        <div class="space-x-2 py-3 bg-white w-80 border-2 border-orange-500  border-solid border-l-8">
     <h4 class="text-xl font pl-4 ">${tache.title}</h4>
     <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="editerTache(this)">editer</button>
     <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
     <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
     </div>
     `;
    }
    else if (tache.importance === 'faible') {
        containerToDo.innerHTML = `
       <div class="space-x-2 py-3 bg-white w-80 border-2 border-red-500 border-l-8">
    <h4 class="text-xl font pl-4 ">${tache.title}</h4>
    <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm"  onclick="editerTache(this)">editer</button>
    <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
    <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	"onclick="deleteTask(this)">Supprimer</button>
    </div>
     `;
    }
    if (tache.statut === "todo") {
        document.getElementById("todo-list").appendChild(containerToDo);
    } else if (tache.statut === "doing") {
        document.getElementById("doing-list").appendChild(containerToDo);
    } else if (tache.statut === "done") {
        document.getElementById("done-list").appendChild(containerToDo);
    }
    updateCounters();

    dataTache.push(tache);
    localStorage.setItem('TaskData', JSON.stringify(dataTache));
}

// Fonction pour vider les champs de saisie
function clearData() {
    // Créer l'objet tache
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('statut').value = '';
    document.getElementById('importance').value = '';
    mood = "create";
    document.getElementById("valid").innerHTML = "Ajouter";
}

function loading() {
    dataTache.forEach(tache => {
        const containerToDo = document.createElement("div");
        containerToDo.classList.add('bg-white', 'rounded-sm', 'mt-2');

        if (tache.importance === "eleve") {
            containerToDo.innerHTML = `
            <div class="space-x-2  bg-white w-80 border-2 border-green-500 border-solid border-l-8 my-4 py-4 ml-4">
         <h4 class="text-xl font pl-4 ">${tache.title}</h4>
         <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="editerTache(this)">editer</button>
         <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
         <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
         </div>
         `;
        } else if (tache.importance === "moyen") {
            containerToDo.innerHTML = `
            <div class="space-x-2  bg-white w-80 border-2  border-orange-500  border-solid border-l-8 my-4 py-4 ">
         <h4 class="text-xl font pl-4 ">${tache.title}</h4>
         <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="editerTache(this)">editer</button>
         <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
         <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
         </div>
         `;
        }
        else if (tache.importance === 'faible') {
            containerToDo.innerHTML = `
          <div class="space-x-2  bg-white w- border-2 border-red-500 border-l-8 my-4 py-4 ">
    <h4 class="text-xl font pl-4 ">${tache.title}</h4>
    <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="editerTache(this)" >editer</button>
    <button id="detailBtn" class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm" onclick="affichDetails(this)" >Détails</button>
    <button id="supprimerBtn" class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
    </div>
         `;
        }

        // Ajouter la tâche au bon statut
        if (tache.statut === "todo") {
            document.getElementById("todo-list").appendChild(containerToDo);
        } else if (tache.statut === "doing") {
            document.getElementById("doing-list").appendChild(containerToDo);
        } else if (tache.statut === "done") {
            document.getElementById("done-list").appendChild(containerToDo);
        }

        updateCounters();
    });
};

function deleteTask(task) {
    let temp = [];
    let element = task.parentElement;
    let titre = element.querySelector('h4').textContent;

    if (element) {
        deleteAnimation(element.parentElement);
        dataTache.forEach(obj => {
            if (obj.title !== titre) {
                temp.push(obj);
            }
        });

        dataTache = temp;
        localStorage.setItem('TaskData', JSON.stringify(dataTache));
    }
}

function deleteAnimation(task) {
    let opacity = 1;
    function decrease() {
        opacity -= 0.02;
        if(opacity <= 0) {
            task.style.opacity = 0;
            task.remove();
            updateCounters();
        } else {
            task.style.opacity = opacity;
            requestAnimationFrame(decrease);
        }
    }

    decrease();
}
 

function affichDetails(task) {
    const element = task.parentElement;
    const titre = element.querySelector('h4').textContent;
    console.log(titre);

    // Rechercher la tâche correspondante dans dataTache
    const tache = dataTache.find(obj => obj.title === titre);
    if (tache) {
        const detailsContainer = document.getElementById('details');
        detailsContainer.innerHTML = `
         <div class="bg-white w-80 ml-8 space-y-2">
            <h4 class="text-center font-bold">${tache.title}</h4>
            <p class="text-center overflow-auto max-h-28"  ><span class="rounded-2xl px-4 ">Description : ${tache.description}</span></p>
            <p class="text-center"><span class="bg-sky-300 rounded-2xl px-4 ">le: ${tache.dateActuelle}</span></p>
            <p class="text-center"><span class="bg-sky-300 rounded-2xl px-4 ">Deadline: ${tache.duration}</span></p>
            <p class="text-center"><span class="bg-sky-300 rounded-2xl px-4 ">${tache.importance}</span></p>
          
          </div>
        `;

        const modalDetails = document.getElementById('modal-details');
        modalDetails.classList.remove('hidden'); 
    }
    updateCounters();
}
function updateCounters() {
    
    let todoBlock = document.getElementById('todo-list');
    let doingBlock = document.getElementById('doing-list');
    let doneBlock = document.getElementById('done-list');


    let counterTodo = todoBlock.children.length;
    let counterDoing = doingBlock.children.length;
    let counterDone = doneBlock.children.length;


    document.getElementById('todo-count').textContent = counterTodo;
    document.getElementById('doing-count').textContent = counterDoing;
    document.getElementById('done-count').textContent = counterDone;
}


document.addEventListener('DOMContentLoaded', () => {
    const closeEditModalButton = document.getElementById('closeEditModal');
    const saveStatusButton = document.getElementById('save-status');

    closeEditModalButton.addEventListener('click', () => {
        document.getElementById('modal-edit-status').classList.add('hidden');
    });

    saveStatusButton.addEventListener('click', () => {
        const newStatus = document.getElementById('new-status').value.trim();
        if (newStatus) {
            updateTaskStatus(currentTask, newStatus);
            document.getElementById('modal-edit-status').classList.add('hidden');
        } else {
            alert('Veuillez entrer un statut valide.');
        }
    });
});

function editerTache(task) {
    let element = task.parentElement;
    let titre = element.querySelector('h4').textContent;

    // Vérifier si le menu déroulant existe déjà
    if (!element.querySelector('#status')) {
        element.innerHTML += `
        <select id="status" class="w-full">
            <option selected>choisir status</option>
            <option value="1">Todo</option>
            <option value="2">Doing</option>
            <option value="3">Done</option>
        </select>`;
    }

    let selectElement = document.getElementById('status');
    selectElement.addEventListener('change', function() {
        let newStatus = selectElement.value;
        let taskElement = element.parentElement;
        let taskTitle = taskElement.querySelector('h4').innerText;

        // Mettre à jour le statut de la tâche dans le DOM
        switch (newStatus) {
            case '1':
                document.getElementById('todo-list').appendChild(taskElement);
                break;
            case '2':
                document.getElementById('doing-list').appendChild(taskElement);
                break;
            case '3':
                document.getElementById('done-list').appendChild(taskElement);
                break;
        }

        // Mettre à jour les données dans localStorage
        dataTache.forEach(obj => {
            if (obj.title === taskTitle) {
                switch (newStatus) {
                    case '1':
                        obj.statut = 'todo';
                        break;
                    case '2':
                        obj.statut = 'doing';
                        break;
                    case '3':
                        obj.statut = 'done';
                        break;
                }
            }
        });

        localStorage.setItem('TaskData', JSON.stringify(dataTache));

        updateCounters();
        selectElement.remove();
    });
}
