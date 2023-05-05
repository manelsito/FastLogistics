const titulo = document.getElementById("titulo");
const cerrarSesion = document.getElementById("cerrarSesion");
const tareas = document.getElementById("lista_tareas");
const productos = document.getElementById("lista_productos");

var userID = localStorage.getItem("userid");

// function getCookie(name) {
//   var cookies = document.cookie.split("; ");
//   for (var i = 0; i < cookies.length; i++) {
//     console.log(cookies[i]);
//     var cookie = cookies[i].split("=");
//     if (cookie[0] === name) {
//       console.log(cookie[1]);
//       return cookie[1];
//     }
//   }
//   return "";
// }

cerrarSesion.addEventListener("click", (e) => {
  localStorage.removeItem("userid");
  location.href = "../pages/loginscreen.html";
});

//NOMBRE DE USUARIO
fetch("http://localhost:8080/getUsername/" + userID)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.text(); // Parsear la respuesta como JSON
  })
  .then((data) => {
    titulo.textContent = data; // Acceder a los datos obtenidos de la API
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

//LISTA DE TAREAS
fetch("http://localhost:8080/getWorksByUser/" + userID)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then((data) => {
    data.forEach((tarea) => {
      // Crea un elemento de botón <button>
      const listItem = document.createElement("button");

      // Crea un elemento de casilla de verificación <input> tipo checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tarea.finalizada;
      checkbox.setAttribute("id","checkbox");


      // Establece el contenido del botón como el valor de 'direccion' en el objeto JSON
      listItem.textContent = tarea.direccion;

      // Agrega el evento onclick al botón
      listItem.onclick = function () {
        clickLi(tarea.idTarea);
      };

      // Agrega el evento onclick a la casilla de verificación y detiene la propagación del evento
      checkbox.onclick = function (event) {
        event.stopPropagation();
        changeTaskState(tarea.idTarea);
      };

      // Agrega la casilla de verificación al final del botón
      listItem.appendChild(checkbox);

      // Agrega el botón a la lista en HTML
      tareas.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

function clickLi(element) {
  var divOscurecer = document.createElement("div");
  divOscurecer.setAttribute("id", "oscurecer");

  // Realiza una solicitud HTTP para obtener la lista de productos
  fetch("http://localhost:8080/getProductsByTask/" + element)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      return response.json(); // Parsear la respuesta como JSON
    })
    .then((data) => {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";

      let div = document.createElement("div");
      div.setAttribute("id", "productos");
      var listaProductos = document.createElement("ul");
      listaProductos.setAttribute("id", "lista_productos");

      data.forEach((producto) => {
        var productoEnLaLista = document.createElement("li");
        productoEnLaLista.textContent = producto.nombreProducto;
        listaProductos.appendChild(productoEnLaLista);
      });

      // Agregar botón para cerrar el div
      var botonCerrar = document.createElement("button");
      botonCerrar.setAttribute("id", "boton_cerrar");
      botonCerrar.textContent = "Cerrar";
      botonCerrar.addEventListener("click", function () {
        div.remove();
        divOscurecer.remove();
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      });

      // Agregar lista y botón al div
      div.appendChild(listaProductos);
      div.appendChild(botonCerrar);

      var divListas = document.querySelector("#listas");
      divListas.appendChild(div);
      divListas.appendChild(divOscurecer);
    })

    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function changeTaskState(taskId) {
  fetch("http://localhost:8080/changeTaskState/" + taskId, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      return response.json(); // Parsear la respuesta como JSON
    })

    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}
