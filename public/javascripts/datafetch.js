
function editUser(userID) {

    fetch(`/api/users/${userID}`, {
      
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      userId  = data._id;
      console.log(userId);
      const nameInput = document.getElementById('names');
      nameInput.value = data.username;
      const emailInput = document.getElementById('emails');
      emailInput.value = data.email;
      const emaInput = document.getElementById('userId');
      emaInput.value = data._id;
      const passInput = document.getElementById('passwords');
      passInput.value = data.password;
      
    })
    .catch(error => {
      console.error('Error editing user:', error);
    });

}

function editUsers(userID) {
  fetch(`/api/delete/${userID}`, {
    method: 'DELETE',
  })
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
    window.location.reload();
  })
  .catch(error => {
    console.error('Error editing user:', error);
    
    window.location.reload();
  });
}


var userId = document.getElementById('userId').value;
document.getElementById('updateForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  try {
    const response = await fetch(`/api/users/update/${encodeURIComponent(userId)}`, {
      
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      window.location.reload();
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


// const btnOne = document.getElementById('userss');
// btnOne.addEventListener('click', () => {
//   window.location.href = '/dashboard';
//   console.log("sucess fully loaded");
// });