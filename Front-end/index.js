const element = document.getElementById('element');

var datos = { method: 'GET' };

var peticion = new Request('http://localhost:3000/usuario', datos);

fetch(peticion).then(function(response) {
  return response.json();
})
.then(function(data) {
  console.log(data.usuarios)
  let users = data.usuarios;
  let tbody = document.getElementById('element');
  let tableBody = ''
  for (let i = 0; i < data.usuarios.length; i++) {
    tableBody += `<tr id="tr-${i}">
                    <td id="td-n${i}">${users[i].nombre}</td>
                    <td id="td-d${i}">${users[i].noCuenta}</td>
                    <td id="td-d${i}">${users[i].active}</td>
                  <tr>`
  }
  tbody.innerHTML = tableBody
});