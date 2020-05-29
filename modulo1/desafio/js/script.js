let inputName = null;
let buttonSeach = null;

let tabUsers = null;
let tabEstatistic = null;

let summaryUsers = null;
let summaryEstatistic = null;

let allUsers = [];

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');
  buttonSeach = document.querySelector('#buttonSeach');
  tabUsers = document.querySelector('#tabUsers');
  tabEstatistic = document.querySelector('#tabEstatistic');
  summaryUsers = document.querySelector('#summaryUsers');
  summaryEstatistic = document.querySelector('#summaryEstatistic');

  fetchUsers();
  activeInput();

  setTimeout(() => {
    document.querySelector('#loading').classList.add('hide');
    inputName.value = '';
    inputName.focus();
  }, 1500);
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const {
      name: { first, last },
      picture: { large },
      dob: { age },
      gender,
    } = user;
    return {
      name: first + ' ' + last,
      picture: large,
      age,
      gender,
    };
  });
}

function activeInput() {
  function handleSearchButton() {
    filterUsers(inputName.value);
  }

  function handleTyping(event) {
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (hasText) {
      buttonSeach.classList.remove('disabled');
      if (event.key === 'Enter') {
        filterUsers(event.target.value);
      }
      return;
    }
    buttonSeach.classList.add('disabled');
  }

  inputName.addEventListener('keyup', handleTyping);
  buttonSeach.addEventListener('click', handleSearchButton);
  inputName.focus();
}

function filterUsers(searchName) {
  let usersHTML = '<div>';
  let totalUsersFilter = [];

  function resultEstatistic() {
    let estatisticHTML = '';

    const totalMale = totalUsersFilter.filter((user) => user.gender === 'male')
      .length;
    const totalFemale = totalUsersFilter.filter(
      (user) => user.gender === 'female'
    ).length;
    const totalAges = totalUsersFilter.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);

    estatisticHTML += `
    <ul>
      <li>Sexo masculino: ${totalMale}</li>
      <li>Sexo feminino: ${totalFemale}</li>
      <li>Soma das idades: ${totalAges}</li>
      <li>Média das idades: ${(totalAges / (totalMale + totalFemale)).toFixed(
        2
      )}</li>
    </ul> 
    `;
    tabEstatistic.innerHTML = estatisticHTML;
  }

  totalUsersFilter = allUsers.filter((user) =>
    user.name.toUpperCase().includes(searchName.toUpperCase())
  );

  totalUsersFilter
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((user) => {
      const { name, picture, age, gender } = user;
      const userHMTL = `
    <div class="user">
      <div>
        <img src="${picture}" alt="${name}"/>
      </div>
      <div>
        ${name} , ${age} anos
      </div>
    </div>  
    `;
      usersHTML += userHMTL;
    }, 0);
  console.log(totalUsersFilter);
  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;

  resultEstatistic();
  updateTities(totalUsersFilter.length);
}

function updateTities(searchUsers) {
  if (searchUsers === 0) {
    summaryUsers.textContent = 'Nenhum usuário filtrado';
    summaryEstatistic.textContent = 'Nada a ser exibido';
    tabUsers.innerHTML = '';
    tabEstatistic.innerHTML = '';
    return;
  }
  summaryUsers.textContent = `${searchUsers} usuário(s) encontrado(s)`;
  summaryEstatistic.textContent = 'Estatísticas';
}
