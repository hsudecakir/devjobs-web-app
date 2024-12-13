const container = document.querySelector('.container');
let roleListCounter = 0;

async function init() {
  const data = await fetch('assets/json/data.json').then(res => res.json());
  const clickedCompanyId = localStorage.getItem('clickedCompany');
  const clickedCompanyData = data.find(x => x.id == clickedCompanyId);
  render(clickedCompanyData);
}

function render(clickedCompanyData){
  container.innerHTML = `
    <section class="header">
      <div class="logo">
        <img src="assets/images/logo.svg" alt="devjobs logo">
      </div>
      <div class="mode-switch">
        <img src="assets/images/sun.svg">
        <input id="modeSwitchBtn" type="checkbox">
        <img src="assets/images/moon.svg">
      </div>
    </section>
    <section class="company-site-container">
      <div class="company-site">
        <img src="assets${clickedCompanyData.logo}" alt="Company Logo">
        <p class="company-name">${clickedCompanyData.company}</p>
        <a href="${clickedCompanyData.website}">${clickedCompanyData.company.toLowerCase()}.com</a>
        <a href="${clickedCompanyData.website}" class="company-site-btn">Company Site</a>
      </div>
    </section>
    <section class="apply-container">
      <div class="job-info">
        <div class="company-grid-item--top">
          <p class="post-date">${clickedCompanyData.postedAt}</p>
          <span class="divider"></span>
          <p class="contract">${clickedCompanyData.contract}</p>
        </div>
        <p class="position">${clickedCompanyData.position}</p>
        <p class="location">${clickedCompanyData.location}</p>
        <a href="${clickedCompanyData.apply}" class="apply-now-btn">Apply Now</a>
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
      <a href="${clickedCompanyData.apply}" class="apply-now-btn">Apply Now</a>
    </section>
  `;
}

init();