const container = document.querySelector('.container');
let roleListCounter = 0;

async function init() {
  const data = await fetch('assets/json/data.json').then(res => res.json());
  const clickedCompanyId = localStorage.getItem('clickedCompany');
  const clickedCompanyData = data.find(x => x.id == clickedCompanyId);
  render(clickedCompanyData);
}

function checkLocalStorageTheme(){
  const theme = localStorage.getItem('theme');
  if(theme){
    if(theme === 'darkMode'){
      console.log('deneme')
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

function changeTheme(){
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme', 'darkMode');
  } else{
    localStorage.setItem('theme', 'lightMode');
  }
}

function render(clickedCompanyData){
  container.innerHTML = `
    <section class="header">
    <div class="header__wrapper">
      <div class="logo">
        <img src="assets/images/logo.svg" alt="devjobs logo">
      </div>
      <div class="mode-switch">
        <img src="assets/images/sun.svg">
        <input id="modeSwitchBtn" type="checkbox">
        <img src="assets/images/moon.svg">
      </div>
      </div>
    </section>
    <section class="company-site-container">
      <div class="company-site">
      <div class="company-site--wrapper">
        <img src="assets${clickedCompanyData.logo}" alt="Company Logo" style="background-color: ${clickedCompanyData.logoBackground};">
        <div class="company-site__wrapper">
          <p class="company-name">${clickedCompanyData.company}</p>
          <a href="${clickedCompanyData.website}">${clickedCompanyData.company.toLowerCase()}.com</a>
        </div>
      </div>
        <a href="${clickedCompanyData.website}" class="company-site-btn">Company Site</a>
      </div>
    </section>
    <section class="apply-container">
      <div class="job-info">
        <div class="job-info__wrapper">
         <div class="job-info--wrapper">
        <div class="company-grid-item--top">
          <p class="post-date">${clickedCompanyData.postedAt}</p>
          <span class="divider"></span>
          <p class="contract">${clickedCompanyData.contract}</p>
        </div>
        <p class="position">${clickedCompanyData.position}</p>
        <p class="location">${clickedCompanyData.location}</p>
        </div>
        <a href="${clickedCompanyData.apply}" class="apply-now-btn">Apply Now</a>
        </div>
        <p class="job-description">${clickedCompanyData.description}</p>
      </div>
      <div class="requirements">
        <h2>Requirements</h2>
        <p class="content">${clickedCompanyData.requirements.content}</p>
        <ul class="requirements-list">
          ${clickedCompanyData.requirements.items.map(item => 
            `<li><span class="marker"></span>${item}</li>`
          ).join('')}
        </ul>
      </div>
      <div class="role">
        <h2>What You Will Do</h2>
        <p class="content">${clickedCompanyData.role.content}</p>
        <ol class="role-list">
          ${clickedCompanyData.role.items.map((item, roleListCounter) => 
            `<li><span class="role-list-counter">${roleListCounter + 1}</span>${item}</li>`
          ).join('')}
        </ol>
      </div>
    </section>
    <section class="apply-now">
      <div class="apply-now--wrapper">
      <div class="apply-now__wrapper">
        <p class="position">${clickedCompanyData.position}</p>
        <p class="company">${clickedCompanyData.company}</p>
      </div>
      <a href="${clickedCompanyData.apply}" class="apply-now-btn">Apply Now</a>
      </div>
    </section>
  `;
  checkLocalStorageTheme();
  modeSwitchBtn.addEventListener('input', changeTheme);
  bindApplyBtns();
}

function bindApplyBtns(){
  const applyNowBtns = document.querySelectorAll('.apply-now-btn');
  for (const applyNowBtn of applyNowBtns) {
    applyNowBtn.addEventListener('click', apply);
  }
}

function apply(e){
  e.preventDefault();
  applyDialog.showModal();
  closeBtn.addEventListener('click', () => {
    applyDialog.close();
  })
}

init();