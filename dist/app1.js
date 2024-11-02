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
    const searchBtn=document.getElementById('search')
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

    searchBtn.addEventListener('click',()=>
    {
      searchOperation();   
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
    containerToDo.innerHTML = `
        <h4>${tache.title}</h4>
        <button id="editBtn">editer</button>
        <button id="deletUnique" onclick="deleteTask(this)" >supprimer</button>
        <button id="infos">detail</button>

    `;

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
        containerToDo.innerHTML = `
                <h4>${tache.title}</h4>
                <button class="editBtn">Éditer</button>
                <button class="deletUnique" onclick="deleteTask(this)">Supprimer</button>
                <button class="infos">Détails</button>
            `;

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
        element.remove();
        dataTache.forEach(obj => {
            if (obj.title !== titre) {
                temp.push(obj);
            }
        });
        dataTache = temp;
        localStorage.setItem('TaskData', JSON.stringify(dataTache));
    }
}

function searchOperation()
{
    
}