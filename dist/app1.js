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
        clearData();
    })

});

function addToStatut() {

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
    containerToDo.classList.add( 'bg-white', 'rounded-sm','mt-2','w-80');
    containerToDo.innerHTML = `
        <div class="space-x-4 py-3 pl-4">
          <h4 class="text-xl font pl-4 ">${tache.title}</h4>
            <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" >editer</button>
        <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
        <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
        </div></button>
    `;

    if (tache.importance === "eleve") {
        containerToDo.classList.add('border-2', 'border-l-4', 'border-red-400');
    } else if (tache.importance === "moyen") {
        containerToDo.classList.add('border-blue','bg-blue' ,'border-4', 'text-black', 'px-4', 'py-2', 'rounded');
    }
    else if (tache.importance === "faible") {
        containerToDo.classList.add('text-black', 'px-4', 'py-2', 'rounded');

    }
    if (tache.statut === "todo") {
        document.getElementById("todo-list").appendChild(containerToDo);
    } else if (tache.statut === "doing") {
        document.getElementById("doing-list").appendChild(containerToDo);
    } else if (tache.statut === "done") {
        document.getElementById("done-list").appendChild(containerToDo);
    }

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
        containerToDo.classList.add( 'bg-white', 'rounded-sm','mt-2');
    containerToDo.innerHTML = `
        <div class="space-x-4 py-3 pl-4">
        <h4 class="text-xl font pl-4 ">${tache.title}</h4>

            <button id="editBtn" class="bg-sky-200 rounded-md px-4 py-1 font-bold text-sm" >editer</button>
        <button class="infos bg-sky-100 rounded-md px-4 py-1 font-bold text-sm	" onclick="affichDetails(this)" >Détails</button>
        <button class="deletUnique  bg-red-400 rounded-md px-4 py-1 font-bold text-sm	" onclick="deleteTask(this)">Supprimer</button>
        </div>
    `;

        if (tache.importance === "eleve") {
            containerToDo.classList.add('border-2', 'border-l-4', 'border-red-400');
        } else if (tache.importance === "moyen") {
            containerToDo.classList.add('border-green', 'text-red', 'px-4', 'py-2', 'rounded');
        }
        else if (tache.importance === 'faible') {
            containerToDo.classList.add('bg-green', 'text-black', 'px-4', 'py-2', 'rounded');
        }

        // Ajouter la tâche au bon statut
        if (tache.statut === "todo") {
            document.getElementById("todo-list").appendChild(containerToDo);
        } else if (tache.statut === "doing") {
            document.getElementById("doing-list").appendChild(containerToDo);
        } else if (tache.statut === "done") {
            document.getElementById("done-list").appendChild(containerToDo);
        }
    });
};

function deleteTask(task) {
    let temp = [];
    let element = task.parentElement;
    let titre = element.querySelector('h4').textContent;

    if (element) {
        element.parentElement.remove();
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
            <h4>${tache.title}</h4>
            <p>Date de création : ${tache.dateActuelle}</p>
            <p>Date d'échéance : ${tache.duration}</p>
            <p>Description : ${tache.description}</p>
            <p>Importance : ${tache.importance}</p>
        `;

        const modalDetails = document.getElementById('modal-details');
        modalDetails.classList.remove('hidden'); // Afficher le modal
    }
}