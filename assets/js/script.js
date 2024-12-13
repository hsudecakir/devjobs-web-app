const companiesContainer = document.querySelector('.company-grid-container');
const container = document.querySelector('.container');
let row = 12;

async function init() {
  const data = await fetch('assets/json/data.json').then(res => res.json());
  render(data);
  loadMoreBtn.addEventListener('click', (e) => loadMore(e, data))
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

init();