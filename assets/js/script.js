const companiesContainer = document.querySelector('.company-grid-container');
const container = document.querySelector('.container');
modeSwitchBtn.addEventListener('input', changeTheme);
let row = 12;

async function init() {
  const data = await fetch('assets/json/data.json').then(res => res.json());
  render(data);
  filterForm.addEventListener('submit', (e) => filter(e, data))
  loadMoreBtn.addEventListener('click', (e) => loadMore(e, data));
  filterFormDialogBtn.addEventListener('click', (e) => openFilterFormDialog(e, data));
  searchBtn.addEventListener('submit', (e) => deneme(e, data));
  updatePlaceholder();
}

function checkLocalStorageTheme(){
  const theme = localStorage.getItem('theme');
  if(theme){
    if(theme === 'darkMode'){
      document.body.classList.add('dark-mode');
      modeSwitchBtn.setAttribute('checked', '');
    }
  } else{
    if(window.matchMedia(('(prefers-color-scheme : dark)')).matches){
      document.body.classList.add('dark-mode');
      modeSwitchBtn.setAttribute('checked', '');
    }
  }
}

checkLocalStorageTheme();

function changeTheme(){
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme', 'darkMode');
  } else{
    localStorage.setItem('theme', 'lightMode');
  }
}

function loadMore(e, companies){
    row = row + 12;
    if(row > companies.length){
      e.target.style.display = 'none';
    }
    render(companies);
    return;
}

function render(companies){
  companiesContainer.innerHTML = '';
  for (let i = 0; i < (row > companies.length ? row=companies.length : row) ; i++) {
    companiesContainer.innerHTML += `  
    <a href="detail.html">
      <div class="company-grid-item" data-company="${companies[i].company}">
        <div class="company-logo" data-company="${companies[i].company}">
          <img data-company="${companies[i].company}" src="assets${companies[i].logo}" alt="Logo">
        </div>
        <div class="company-grid-item--top" data-company="${companies[i].company}">
          <p data-company="${companies[i].company}" class="post-date">${companies[i].postedAt}</p>
          <span class="divider"></span>
          <p data-company="${companies[i].company}" class="contract">${companies[i].contract}</p>
        </div>
          <p data-company="${companies[i].company}" class="position">${companies[i].position}</p>
          <p data-company="${companies[i].company}" class="company-name">${companies[i].company}</p>
          <p data-company="${companies[i].company}" class="location">${companies[i].location}</p>
      </div>  
    </a>
    `
  }
  bindJobs(companies);
}

function bindJobs(companies){
  const jobs = document.querySelectorAll('.company-grid-item');
  for (const job of jobs) {
    job.addEventListener('click', (e) => openApplyPage(e, companies));
  }
}

function openApplyPage(e, companies){
  const clickedCompany = companies.find(company => company.company == e.target.dataset.company);
  console.log(clickedCompany.id);
  localStorage.setItem('clickedCompany', clickedCompany.id);
  
}

function updatePlaceholder(){
  const checkboxLabel = document.querySelector('.chechbox-input');
  if (window.innerWidth > 1280){
    titleInput.placeholder = 'Filter by title, companies, expertise…';
    checkboxLabel.innerHTML = '<input type="checkbox" name="contract"> Full Time Only';
  }
}

function openFilterFormDialog(e, data){
  filterFormDialog.showModal();
  filterFormMobile.addEventListener('submit', (e) => filter(e,data))
}

function filter(e, data){
  e.preventDefault();
  const jobs = [...data];
  const formData = new FormData(e.target);
  const title = formData.get('title');
  const location = formData.get('location');
  const contract = formData.has('contract');
  const filteredJobs = jobs
  .filter(job => title.trim() == '' ? job : job.position.toLowerCase().includes(title.toLowerCase()) || job.company.toLowerCase().includes(title.toLowerCase()))
  .filter(job => location.trim() == '' ? job : job.location.toLowerCase().includes(location.toLowerCase()))
  .filter(job => contract ? job.contract === 'Full Time' : job);
  console.log(filteredJobs);
  filterFormDialog.close();
  row = 12;
  render(filteredJobs);
  if(filteredJobs.length <= 12){
    loadMoreBtn.style.display = 'none';
  } else{
    loadMoreBtn.style.display = 'block';
  }
}

init();