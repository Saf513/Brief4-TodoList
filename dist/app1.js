// Déclarer les variables
let dateActuelle = new Date();
let mood = "create";
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
    const searchBtn = document.getElementById('search');
    const closeDetailsButton = document.getElementById('closeDetails');
    const modalDetails = document.getElementById('modal-details');
    const closeEditModalButton = document.getElementById('closeEditModal');
    const saveStatusButton = document.getElementById('save-status');

        saveStatusButton.addEventListener('click', () => {
            const newStatus = document.getElementById('new-status').value.trim();
            if (newStatus) {
                updateTaskStatus(currentTask, newStatus);
                document.getElementById('modal-edit-status').classList.add('hidden');
            } else {
                alert('Veuillez entrer un statut valide.');
            }
        });


    closeEditModalButton.addEventListener('click', () => {
        document.getElementById('modal-edit-status').classList.add('hidden');
    });
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
     <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm " >editer</button>
     <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
     <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
     </div>
     `;
    } else if (tache.importance === "moyen") {
        containerToDo.innerHTML = `
        <div class="space-x-2 py-3 bg-white w-80 border-2 border-orange-500  border-solid border-l-8">
     <h4 class="text-xl font pl-4 ">${tache.title}</h4>
     <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" >editer</button>
     <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
     <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
     </div>
     `;
    }
    else if (tache.importance === 'faible') {
        containerToDo.innerHTML = `
       <div class="space-x-2 py-3 bg-white w-80 border-2 border-red-500 border-l-8">
    <h4 class="text-xl font pl-4 ">${tache.title}</h4>
    <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm"  >editer</button>
    <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
    <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
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
            <div class="space-x-2  bg-white w-80 border-2 border-green-500 border-solid border-l-8 my-4 py-4">
         <h4 class="text-xl font pl-4 ">${tache.title}</h4>
         <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" >editer</button>
         <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
         <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
         </div>
         `;
        } else if (tache.importance === "moyen") {
            containerToDo.innerHTML = `
            <div class="space-x-2  bg-white w-80 border-2  border-orange-500  border-solid border-l-8 my-4 py-4">
         <h4 class="text-xl font pl-4 ">${tache.title}</h4>
         <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" >editer</button>
         <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
         <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
         </div>
         `;
        }
        else if (tache.importance === 'faible') {
            containerToDo.innerHTML = `
          <div class="space-x-2  bg-white w-80 border-2 border-red-500 border-l-8 my-4 py-4">
    <h4 class="text-xl font pl-4 ">${tache.title}</h4>
    <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm"  >editer</button>
    <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
    <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
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
        element.parentElement.remove();
        updateCounters();
        dataTache.forEach(obj => {
            if (obj.title !== titre) {
                temp.push(obj);
            }
        });

        dataTache = temp;
        localStorage.setItem('TaskData', JSON.stringify(dataTache));
    }
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
        modalDetails.classList.remove('hidden'); // Afficher le modal
    }
    updateCounters();
}
function updateCounters() {
    // Récupérer les blocs de tâches
    let todoBlock = document.getElementById('todo-list');
    let doingBlock = document.getElementById('doing-list');
    let doneBlock = document.getElementById('done-list');

    // Compter les éléments de chaque bloc
    let counterTodo = todoBlock.children.length;
    let counterDoing = doingBlock.children.length;
    let counterDone = doneBlock.children.length;

    // Mettre à jour les compteurs dans le DOM
    document.getElementById('todo-count').textContent = counterTodo;
    document.getElementById('doing-count').textContent = counterDoing;
    document.getElementById('done-count').textContent = counterDone;
}

let currentTask; // Variable pour stocker la tâche en cours d'édition

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

function openEditModal(task) {
    currentTask = task; // Stocker la tâche en cours d'édition
    const modal = document.getElementById('modal-edit-status');
    modal.classList.remove('hidden'); // Afficher le modal
    document.getElementById('new-status').value = ''; // Réinitialiser le champ de saisie
}

function updateTaskStatus(task, newStatus) {
    const element = task.parentElement;
    const title = element.querySelector('h4').textContent;

    // Rechercher la tâche correspondante dans dataTache
    const tache = dataTache.find(obj => obj.title === title);
    if (tache) {
        const validStatuses = ['todo', 'doing', 'done'];
        if (validStatuses.includes(newStatus)) {
            // Mise à jour du statut
            tache.statut = newStatus;
            element.parentElement.remove(); // Supprimer l'élément actuel de l'affichage

            // Créer un nouveau conteneur pour le nouvel affichage
            const newContainer = document.createElement("div");
            newContainer.classList.add('bg-white', 'mt-2');

            let borderColor;
            if (tache.importance === "eleve") {
                borderColor = "green-500";
            } else if (tache.importance === "moyen") {
                borderColor = "orange-500";
            } else {
                borderColor = "red-500";
            }

            newContainer.innerHTML = `
                <div class="space-x-2 py-3 bg-white w-80 border-2 border-${borderColor} border-solid border-l-8">
                    <h4 class="text-xl font pl-4 ">${tache.title}</h4>
                    <button class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" onclick="openEditModal(this)">Editer</button>
                    <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm" onclick="affichDetails(this)">Détails</button>
                    <button class="deletUnique bg-red-400 rounded-md px-4 py-1 font-bold text-sm" onclick="deleteTask(this)">Supprimer</button>
                </div>
            `;

            // Ajouter le nouveau conteneur au bon statut
            if (tache.statut === "todo") {
                document.getElementById("todo-list").appendChild(newContainer);
            } else if (tache.statut === "doing") {
                document.getElementById("doing-list").appendChild(newContainer);
            } else if (tache.statut === "done") {
                document.getElementById("done-list").appendChild(newContainer);
            }

            // Mettre à jour les données dans localStorage
            localStorage.setItem('TaskData', JSON.stringify(dataTache));
            updateCounters(); // Mettre à jour les compteurs
        } else {
            alert('Statut invalide. Veuillez utiliser "todo", "doing" ou "done".');
        }
    }
}