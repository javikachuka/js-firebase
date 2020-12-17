/* Initialize */
import api from './servicesProductos.js'

const clearForm = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("link").value = "";
};

//Agrega un elemento a la collection User
const guardar = async function () {
  const userData = {
    name: document.getElementById("nombre").value,
    description: document.getElementById("descripcion").value,
    price: document.getElementById("precio").value,
    link: document.getElementById("link").value,
  };

  try {
    const docRef = await api.create(userData);

    console.log("Document written with ID: ", docRef.id);
    clearForm();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//Actualizar registro
const editar = function (id, name, description, price, link) {
  document.getElementById("nombre").value = name;
  document.getElementById("descripcion").value = description;
  document.getElementById("precio").value = price;
  document.getElementById("link").value = link;

  var boton = document.getElementById("boton");
  boton.innerHTML = "Editar";

  boton.onclick = async () => {
    const userData = {
      name: document.getElementById("nombre").value,
      description: document.getElementById("descripcion").value,
      price: document.getElementById("precio").value,
      link: document.getElementById("link").value,
    };

    try {
      const updatedRec = await api.update(id, userData);

      console.log("Document successfully updated!", updatedRec);
      clearForm();
      boton.innerHTML = "Guardar";
      boton.onclick = guardar;
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
}

const eliminar = async function(id) {
  try {
    await api.delet(id);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}

// funcion que carga la data en la tabla
const loadData = (data) => {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  data.forEach((doc) => {
    console.log(doc.data());
    const { name, description, price, link } = doc.data();
    tabla.innerHTML += `
            <tr>
              <th scope="row">${doc.id}</th>
              <td>${name}</td>
              <td>${description}</td>
              <td>$${price}</td>
              <td><img src="${link}" alt="" width="150px"></td>
              <td><button class="btn btn-danger" onclick="showModalEliminar('${doc.id}')" data-toggle="modal" data-target="#modalConfirmEliminar">Eliminar</button></td>
              <td><button class="btn btn-warning" onclick="editar('${doc.id}','${name}','${description}','${price}','${link}')">Editar</button></td>
            </tr>
          `;
  });
};

const showModalEliminar = (id)=>{
  const msg = document.getElementById("mensajeEliminar");
  const btnEliminar = document.getElementById('btnEliminar');
  msg.innerHTML = `¿Seguro desea eliminar el registro con ID: <b>${id} </b>?`

  btnEliminar.onclick = ()=>{
    eliminar(id)
    const modalEliminar = $('#modalConfirmEliminar').modal('hide');
  }

}

api.suscribe(loadData);

window.guardar = guardar
window.editar = editar
window.eliminar = eliminar
window.showModalEliminar = showModalEliminar