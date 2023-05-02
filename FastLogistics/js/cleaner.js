const productos = document.getElementById("lista-productos");

//SELECTORES
const selectorProducto = document.getElementById("productos");
const selectorDireccion = document.getElementById("direcciones");
const direccionInput = document.getElementById("direccion-input");

//BOTONES
const botonEnviar = document.getElementById("enviar");
const botonCambiar = document.getElementById("cambiarDireccion");
const cerrarSesion = document.getElementById("cerrarSesion");

var direccion = 0;
var producto = 0;

var userID = localStorage.getItem("userid");

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
    titulo.textContent = "Hola, " + data; // Acceder a los datos obtenidos de la API
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

fetch("http://localhost:8080/getAllProducts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then((data) => {
    // Crear opciones para el selector de productos
    data.forEach((producto) => {
      const option = document.createElement("option");
      option.value = producto.idProducto;
      option.textContent = producto.nombreProducto;
      selectorProducto.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

fetch("http://localhost:8080/getAllTasks")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then((data) => {
    // Crear opciones para el selector de productos
    data.forEach((tarea) => {
      const option = document.createElement("option");
      option.value = tarea.idTarea;
      option.textContent = tarea.direccion;
      selectorDireccion.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

botonEnviar.addEventListener("click", (e) => {
  if (verificarSeleccion()) {
    console.log("verificao");
    if (direccionEscrita) {
      console.log("direccion");
      crearTarea();
    } else {
      añadirProductos();
    }
  }
});

function crearTarea() {
  const productos = getProductosLista();

  const data = {
    tarea: {
      direccion: direccionInput.value
    },
    productos
  };

  fetch("http://localhost:8080/insertTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido a JSON
    },
    body: JSON.stringify(data), // Convierte el objeto de datos a una cadena JSON
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Si la respuesta es exitosa, convierte la respuesta a JSON
      } else {
        throw new Error("Error en la solicitud POST"); // Maneja errores de la solicitud
      }
    })
    .then((data) => {
      if(data === true){
        alert("Tarea añadida correctamente");
      }
    })
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
}

function getProductosLista() {
  let listaDeProductos = [];
  const elementos = productos.getElementsByTagName("button");
  for (let i = 0; i < elementos.length; i++) {
    let producto = {
      idProducto: elementos[i].value,
    };
    
    listaDeProductos.push(producto);
  }
  

  return listaDeProductos;
}

function verificarSeleccion() {
  // Verificar si ambos selectores están seleccionados
  if (
    (getProductosLista().length > 0 && selectorDireccion.value == !"defecto") ||
    (getProductosLista().length > 0 && direccionInput.value.trim().length > 0)
  ) {
    console.log("???");
    return true;
  }
  return false;
}

let direccionEscrita = true;
botonCambiar.addEventListener("click", (e) => {
  direccionInput.style.display = direccionEscrita ? "none" : "block";
  botonCambiar.innerHTML = direccionEscrita
    ? "Escribir dirección"
    : "Seleccionar dirección";
  direccionEscrita = !direccionEscrita;
});

selectorProducto.addEventListener("change", (evento) => {
  //Creo el elemento en la lista productos
  var botonProducto = document.createElement("button");
  botonProducto.setAttribute("id", "boton-producto");
  botonProducto.textContent =
    selectorProducto.options[evento.target.selectedIndex].textContent;
  botonProducto.value =
    selectorProducto.options[evento.target.selectedIndex].value;
  botonProducto.onclick = function () {
    borrarProducto(this);
  };
  productos.appendChild(botonProducto);
  //Vuelvo a poner el selector en default
  selectorProducto.value = "defecto";
});

function borrarProducto(seleccion) {
  productos.removeChild(seleccion);
}
