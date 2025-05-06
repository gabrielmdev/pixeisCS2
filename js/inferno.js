const nadeList = document.getElementById('nadeList');
const typeFilter = document.getElementById('typeFilter');
const siteFilter = document.getElementById('siteFilter');

let nades = [];

fetch('../data/inferno.json')
  .then(res => res.json())
  .then(data => {
    nades = data;
    renderNades(nades);
  });

  function renderNades(list) {
    nadeList.innerHTML = '';  
  
    list.forEach(nade => {
      const card = document.createElement('div');
      card.className = 'nade-card';
  
      card.innerHTML = `
        <h3>${nade.title}</h3>
        <p><strong>Local:</strong> ${nade.location}</p>
        <p><strong>Bombsite:</strong> ${nade.bombsite}</p>
        <video class="clipped-video" src="${nade.video}" controls></video>
      `;
      
      nadeList.appendChild(card);
    });
  }
  

function applyFilters() {
  const type = typeFilter.value;
  const site = siteFilter.value;

  const filtered = nades.filter(nade =>
    (type === '' || nade.type === type) &&
    (site === '' || nade.bombsite === site)
  );

  renderNades(filtered);
}

typeFilter.addEventListener('change', applyFilters);
siteFilter.addEventListener('change', applyFilters);
