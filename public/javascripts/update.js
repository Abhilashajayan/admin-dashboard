const hides = document.getElementById("hideDiv");
function msgs() {
    hides.style.display = 'none';
  }
setTimeout(msgs,1000);

const hidess = document.getElementById("hides");
function hideAdd() {
    hidess.style.display = 'none';
  }
setTimeout(hideAdd,1000);

const hidesf = document.getElementById("hideDel");
function hideDe() {
    hidesf.style.display = 'none';
  }
setTimeout(hideDe,1000);

function sortData(){
    window.location.href = '/sort';
}

const searchForm = document.getElementById('searchForm');
    const tableBody = document.getElementById('tableBody');

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(searchForm);
      const query = formData.get('query');

      try {
        const response = await fetch(`/search-results?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Error fetching search results.');
        }
        window.location.href = `/search-results?query=${encodeURIComponent(query)}`;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    });

function updateTable(results) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  results.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
    `;
    tableBody.appendChild(row);
  });
}
 
function backBtn(){
  window.location.href = '/dashboard';
}

function logoutBtn(){
  window.location.href = '/logouts';
}