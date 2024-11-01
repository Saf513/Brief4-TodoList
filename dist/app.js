
// document.addEventListener('DOMContentLoaded', () => {
//     const addUniqueButton = document.getElementById('add-unique');
//     const modal = document.getElementById('modal-unique');
//     const closeModalButton = document.getElementById('closeModal');

//     modal.classList.add('hidden');


//     addUniqueButton.addEventListener('click', () => {
//         modal.classList.remove('hidden');
//     });

//     closeModalButton.addEventListener('click', () => {
//         modal.classList.add('hidden');
//     });
// });




// document.getElementById("valid").addEventListener('click', function () {
//     // Créer l'objet tache avec les valeurs des champs du formulaire
//     const tache = {
//         titre: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         duration: document.getElementById("duration").value,
//         status: document.getElementById("status").value,
//         dateActuelle: new Date()
//     };

//     // Créer un élément HTML pour afficher la tâche
//     const taskElement = document.createElement("div");
//     taskElement.style.background="#f0f0f0"
//     taskElement.className = "task"; // Ajouter une classe pour le style
//     taskElement.innerHTML = `
//         <h4>${tache.titre}</h4>
//         <p>${tache.description}</p>
//         <p>Date : ${tache.duration}</p>
//         <p>Ajouté le : ${tache.dateActuelle.toLocaleDateString()}</p>
//     `;

//     // Ajouter la tâche à la bonne section selon le statut
//     if (tache.status === "todo") {
//         document.getElementById("todo-list").appendChild(taskElement);
//     } else if (tache.status === "doing") {
//         document.getElementById("doing-list").appendChild(taskElement);
//     } else if (tache.status === "done") {
//         document.getElementById("done-list").appendChild(taskElement);
//     }

//     // Réinitialiser le formulaire et fermer le modal
//     document.getElementById("taskForm").reset();
//     document.getElementById("modal-unique").classList.add("hidden");
// });

// //Declarer les variables
// let title = document.getElementById('title').value;
// let descreption = document.getElementById('description').value;
// let duration = document.getElementById('duration').value;
// let statut = document.getElementById('statut').value;
// let dateActuelle = new Date();


// let dataTache;
// if (localStorage.Task != null) {
//     dataTache = JSON.parse(localStorage.Task);
// }
// else {
//     datapro = [];
// }

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById("valid").onclick = function () {

//         let tache = {
//             titre: document.getElementById("title").value,
//             description: document.getElementById("description").value,
//             duration: document.getElementById("duration").value,
//             statut: document.getElementById("statut").value,
//             dateActuelle: new Date()
//         };
//         dataTache.push(tache);
//         localStorage.setItem('Task', JSON.stringify(dataTache));
//         console.log(dataTache);

//         clearData();
//     }
// // clear data
// function clearData() {
//     document.getElementById("title").value = '';
//     document.getElementById("description").value = '';
//     document.getElementById("duration").value = '';
//     document.getElementById("statut").value = '';
// });
// Déclarer les variables
let title = document.getElementById('title');
let description = document.getElementById('description');
let duration = document.getElementById('duration');
let statut = document.getElementById('statut');
let importance = document.getElementById('importance');

let dataTache = JSON.parse(localStorage.getItem('Task')) || []; // Charger les tâches ou initialiser un tableau vide

// Fonction pour afficher les données
function affichData() {
    let table = '';
    for (let i = 0; i < dataTache.length; i++) {
        table += `
         <tr>
            <td>${dataTache[i].title}</td>
            <td>${dataTache[i].description}</td>
            <td>${dataTache[i].duration}</td>
            <td>${new Date(dataTache[i].dateActuelle).toLocaleDateString()}</td>
            <td>${dataTache[i].importance}</td>
            <td>${dataTache[i].statut}</td>
            <td><button class="edit" onclick="editTask(${i})">Modifier</button></td>
            <td><button class="delete" onclick="deleteTask(${i})">Supprimer</button></td>
         </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table; 
    
}

function deleteAllTasks() {
    if (confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
        dataTache = []; // Réinitialiser le tableau des tâches
        localStorage.removeItem('Task'); // Supprimer de localStorage
        affichData(); // Mettre à jour l'affichage
    }
}


// Fonction pour vider les champs de saisie
function clearData() {
    title.value = '';
    description.value = '';
    duration.value = '';
    statut.value = '';
    importance.value = 'faible'; // Réinitialiser à la valeur par défaut
}

// Fonction pour ajouter une tâche
function addTask() {
    let tache = {
        title: title.value,
        description: description.value,
        duration: duration.value,
        statut: statut.value,
        importance: importance.value,
        dateActuelle: new Date()
    };

    dataTache.push(tache);
    localStorage.setItem('Task', JSON.stringify(dataTache)); // Sauvegarder dans localStorage
    affichData(); // Mettre à jour l'affichage
    clearData(); // Vider les champs de saisie
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    dataTache.splice(index, 1); // Supprimer la tâche à l'index donné
    localStorage.setItem('Task', JSON.stringify(dataTache)); // Mettre à jour localStorage
    affichData(); // Mettre à jour l'affichage
}

// Initialisation de l'affichage des tâches
document.addEventListener('DOMContentLoaded', () => {
    affichData(); // Afficher les tâches existantes au chargement

    document.getElementById("valid").onclick = addTask; // Ajouter un écouteur pour le bouton d'ajout
    document.getElementById("closeModal").onclick = clearData; // Ajouter un écouteur pour le bouton Annuler
});

document.getElementById("deleteAll").onclick=deleteAllTasks;