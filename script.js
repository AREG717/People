const peopleContainer = document.getElementById('people-container');
const paginationContainer = document.getElementById('pagination');
const loadingSpinner = document.getElementById('loading-spinner');

let currentPage = 1;
let totalPeople;
const peopleperPage = 10;

function showLoadingSpinner() {
    loadingSpinner.classList.add('loading-spinner-visible')
}

function hideLoadingSpinner() {
    loadingSpinner.classList.remove('loading-spinner-visible')
}

function renderPeople(people) {
    peopleContainer.innerHTML = '';

    people.forEach(person => {
        const personElement = document.createElement('div');
        personElement.classList.add('person');
        personElement.innerHTML = `
            <h2>${person.name}</h2>
            <p><strong>Birth year:</strong> ${person.birth_year}</p>
            <p><strong>Gender:</strong> ${person.gender}</p>
            <p><strong>Mass:</strong> ${person.mass}</p>
            <p><strong>Height:</strong> ${person.height}</p>
        `;

        peopleContainer.appendChild(personElement);
    });
}

function renderPagination() {
    const totalPages = Math.ceil(totalPeople / peopleperPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerHTML = i;

        if(i === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentPage = i;
            fetchPeople();
        })

        paginationContainer.appendChild(button);
    }
}

function fetchPeople() {
    showLoadingSpinner();

    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        totalPeople = data.count;
        renderPeople(data.results);
        renderPagination();
        hideLoadingSpinner();
    })
}

fetchPeople();


