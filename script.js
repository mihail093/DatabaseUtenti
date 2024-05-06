// Creo la costante 'url'
const url = "https://jsonplaceholder.typicode.com/users";

// Richiamo gli elementi dal DOM
const selectTag = document.getElementById('selectTag');
const inputTextTag = document.getElementById('inputTextTag');
const tableBody = document.getElementById('tableBody');

// Scrivo la funzione per fare 'fetch' e convertire i dati in .json
async function fetchUsers() {
    const raw = await fetch(url);
    const users = await raw.json();
    return users;
}

// Scrivo la funzione per inserire i dati all'interno della tabella
function loadData(users) {
    tableBody.innerHTML = '';
    users.forEach(user => {
        tableBody.innerHTML += 
        `
        <tr>
            <th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
        </tr>
        `
    });
}

// Scrivo una funzione per caricare i dati 
fetchUsers().then((users) => {
    loadData(users);
    // Aggiungo un '.addEventListener' all'input di testo per caricare i dati in base alla ricerca
    inputTextTag.addEventListener('input', () => {
        const selectTagValue = selectTag.value;
        const inputTextTagValue = inputTextTag.value;
        const filteredUsers = users.filter((user) => {
            const output = user[selectTagValue].toLowerCase().includes(inputTextTagValue.toLowerCase());
            return output;
        })
        loadData(filteredUsers);
    })
});