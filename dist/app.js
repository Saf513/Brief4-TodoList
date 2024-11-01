
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
let importance = document.getElementById('importance')
let dateActuelle = new Date();

let dataTache;
if (localStorage.Task != null) {
    dataTache = JSON.parse(localStorage.Task);
} else {
    dataTache = []; // Correction ici, utiliser dataTache au lieu de datapro
}

function affichData() {
    let table = '';
    for (let i = 0; i < dataTache.length; i++) {
        table += `
         <tr>
    <td> ${dataTache[i].title}</td>
    <td>${dataTache[i].description}</td>
    <td>${dataTache[i].duration}</td>
    <td>${dataTache[i].dateActuelle}</td>
    <td>${dataTache[i].importance}</td>
    <td>${dataTache[i].statut}</td>
    <td><button id="update" onclick=" deleteTask(${i})" >Modifier</button></td>
    <td><button id="delete">Supprimer</button></td>
    </tr>
        `
    }

      // Fonction pour vider les champs de saisie
      function clearData() {
        title.value = '';
        description.value = '';
        duration.value = '';
        statut.value = '';

    }

    // fonction qui supprimer un seul item

    function deleteTask(){
        for(let i=0 ; i < dataTache.length ; i++)
        {
            dataTache=splice(i,1);
        }
        localStorage.Task=dataTache;
   affichData();
    }
    document.getElementById('tbody').innerHTML = table;
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("valid").onclick = function () {
        let tache = {
            title: title.value,
            description: description.value,
            duration: duration.value,
            statut: statut.value,
            importance: importance.value,
            dateActuelle: new Date()
        };

        dataTache.push(tache);
       
affichData();
        // Clear data
        clearData();
       
    };

   
});

