var userID = localStorage.getItem("userid");

cerrarSesion.addEventListener("click", (e) => {
  localStorage.removeItem("userid");
  location.href = "../pages/loginscreen.html";
});

fetch("http://localhost:8080/getAllUserTasks")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return response.json(); // Parsear la respuesta como JSON
  })
  .then((data) => {
    const panelContainer = document.getElementById("panel-container");

    // Para cada objeto en el array de datos
    data.forEach((item) => {
      // Crear el panel
      const panel = document.createElement("div");
      panel.setAttribute("id", `panel`);
      panel.setAttribute("class", "panel");

      // Crear el título del panel
      const titulo = document.createElement("div");
      titulo.setAttribute("class", "titulo");

      const h4 = document.createElement("h4");
      h4.textContent = item.user.user;

      titulo.appendChild(h4);
      panel.appendChild(titulo);

      // Crear el cuerpo del panel
      const panelBody = document.createElement("div");
      panelBody.setAttribute("class", "panel-body");

      const ul = document.createElement("ul");
      ul.setAttribute("class", "sortable-list");

      // Para cada tarea en el array de tareas
      item.tareas.forEach((tarea) => {
        const li = document.createElement("button");
        li.setAttribute("class", "li-button");
        li.textContent = tarea.direccion;
        li.onclick = function () {
          tareaClick(tarea);
        };
        ul.appendChild(li);
      });

      // Crear el pie del panel
      const panelFooter = document.createElement("div");
      panelFooter.setAttribute("class", "panel-footer");

      const button = document.createElement("button");
      button.setAttribute("class", "button-add");
      button.textContent = "Añadir";
      button.onclick = function () {
        agregarTarea(panelBody, ul, item.user.idUser, button);
      };

      panelBody.appendChild(ul);
      panel.appendChild(panelBody);
      panelFooter.appendChild(button);
      panel.appendChild(panelFooter);

      // Agregar el panel al contenedor
      panelContainer.appendChild(panel);
    });
    //Despues del foreach agrego el crear user
    const div = document.createElement("div");
    div.setAttribute("class", "addUser-container");
    //Crear boton
    const btn = document.createElement("button");

    // Asignar una clase
    btn.setAttribute("class", "button-addUser");

    // Agregar un evento de clic
    btn.addEventListener("click", function () {
      createUser();
    });

    // Crear un elemento de texto
    const textNode = document.createTextNode("+");

    // Agregar el elemento de texto al botón
    btn.appendChild(textNode);

    div.appendChild(btn);
    panelContainer.appendChild(div);
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

function tareaClick(element) {
  var divOscurecer = document.createElement("div");
  divOscurecer.setAttribute("id", "oscurecer");

  // Realiza una solicitud HTTP para obtener la lista de productos
  fetch("http://localhost:8080/getProductsByTask/" + element.idTarea)
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
      element.finalizada
        ? (div.style.borderColor = "#a7f8ba")
        : (div.style.borderColor = "#fe7474");
      var listaProductos = document.createElement("ul");
      listaProductos.setAttribute("id", "lista_productos");

      let titulo = document.createElement("h4");
      element.finalizada
        ? ((titulo.textContent = "Completada"), (titulo.style.color = "green"))
        : ((titulo.textContent = "Pendiente"), (titulo.style.color = "red"));

      div.appendChild(titulo);

      data.forEach((producto) => {
        var productoEnLaLista = document.createElement("li");
        productoEnLaLista.textContent = producto.nombreProducto;
        listaProductos.appendChild(productoEnLaLista);
      });

      const botones = document.createElement("div");
      botones.setAttribute("class", "buttons-popup");

      // Agregar botón para cerrar el div
      var botonCerrar = document.createElement("button");
      botonCerrar.setAttribute("id", "boton-cerrar");
      botonCerrar.textContent = "Cerrar";
      botonCerrar.addEventListener("click", function () {
        div.remove();
        divOscurecer.remove();
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      });

      var botonBorrar = document.createElement("button");
      botonBorrar.setAttribute("id", "boton-borrar");
      botonBorrar.textContent = "Eliminar";
      botonBorrar.addEventListener("click", function () {
        console.log(element.finalizada);
        if (element.finalizada) {
          borrarTareaBBDD(element.idTarea);
          location.reload();
        } else {
          advertencia(
            "Seguro que quieres borrar esta tarea? No esta finalizada.",
            element.idTarea
          );
        }
      });

      botones.appendChild(botonCerrar);
      botones.appendChild(botonBorrar);

      // Agregar lista y botón al div
      div.appendChild(listaProductos);
      div.appendChild(botones);

      var divListas = document.querySelector("body");
      divListas.appendChild(div);
      divListas.appendChild(divOscurecer);
    })

    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function agregarTarea(panel, ul, userId, button) {
  button.disabled = true;

  const nuevaTarea = document.createElement("input");
  nuevaTarea.setAttribute("type", "text");
  nuevaTarea.setAttribute("class", "nueva-tarea");
  nuevaTarea.setAttribute("autofocus", "");
  nuevaTarea.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      nuevaTarea.remove();
    }
  });
  ul.appendChild(nuevaTarea);

  panel.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  // Agregar un event listener al input de nueva tarea
  nuevaTarea.addEventListener("keyup", (event) => {
    // Verificar si se presionó la tecla "Enter" y que haya texto
    if (event.keyCode === 13 && nuevaTarea.value.trim().length > 0) {
      // Obtener el valor del input
      const tareaNombre = nuevaTarea.value;
      //Crear el nuevo boton de tarea
      const li = document.createElement("button");
      li.setAttribute("class", "li-button");
      li.onclick = function () {
        tareaClick(tarea);
      };
      // li.textContent = tareaNombre;
      // //Añadirlo a la lista
      // ul.appendChild(li);

      const data = {
        userId: userId,
        tarea: {
          direccion: tareaNombre,
        },
        productos: [],
      };

      anadirTareaBBDD(data);

      // //Quitar el input
      // nuevaTarea.remove();
      // // Limpiar el input
      // nuevaTarea.value = "";

      location.reload();
    }
  });
}

function anadirTareaBBDD(data) {
  fetch("http://localhost:8080/insertTaskInUser", {
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
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
}

function createUser() {
  const div = document.createElement("div");
  div.setAttribute("class", "createUser-container");

  const divTitulo = document.createElement("div");
  divTitulo.setAttribute("class", "container-titulo-createUser");

  const titulo = document.createElement("h3");
  titulo.setAttribute("class", "titulo-createUser");
  titulo.textContent = "Crear usuario";

  const botonCerrar = document.createElement("button");
  botonCerrar.setAttribute("class", "cerrar-createUser");
  botonCerrar.textContent = "x";
  botonCerrar.onclick = function(){
    div.remove();
    oscurecer.remove()
  }

  divTitulo.appendChild(titulo);
  divTitulo.appendChild(botonCerrar);

  const divContent = document.createElement("div");
  divContent.setAttribute("class", "content-createUser")

  const divInputs = document.createElement("div");
  divInputs.setAttribute("class", "inputs-container");

  const userInput = document.createElement("input");
  userInput.setAttribute("class", "user-input");
  userInput.placeholder = "Usuario";
  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("class", "password-input");
  passwordInput.placeholder = "Contraseña";

  const buttonSend = document.createElement("button");
  buttonSend.textContent = "Enviar";
  buttonSend.setAttribute("class", "button-sendUser");
  buttonSend.onclick = function () {
    if (
      userInput.value.trim().length > 0 &&
      passwordInput.value.trim().length > 0
    ) {
      const data = {
        user: userInput.value,
        password: passwordInput.value,
      };

      createUserBBDD(data);

      location.reload();
    }
  };

  divInputs.appendChild(userInput);
  divInputs.appendChild(passwordInput);

  divContent.appendChild(divInputs);
  divContent.appendChild(buttonSend);

  div.appendChild(divTitulo);
  div.appendChild(divContent);

  var body = document.querySelector("body");
  var divOscurecer = document.createElement("div");
  divOscurecer.setAttribute("id", "oscurecer");
  body.appendChild(div);
  body.appendChild(divOscurecer);
}

function createUserBBDD(data) {
  fetch("http://localhost:8080/createUser", {
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
    .then((data) => {})
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
}

async function advertencia(mensaje, tareaId) {
  const oscurecer = document.getElementById("oscurecer");
  oscurecer.style.zIndex = 1001;
  // Crear un nuevo elemento div
  const miDiv = document.createElement("div");
  miDiv.setAttribute("class", "container-advertencia");

  // Añadir texto al div
  const msj = document.createTextNode(mensaje);
  miDiv.appendChild(msj);

  const botones = document.createElement("div");
  botones.setAttribute("class", "buttons-popup");

  // Crear los botones
  const siBtn = document.createElement("button");
  siBtn.setAttribute("class", "si-button");
  siBtn.innerHTML = "Sí";
  siBtn.onclick = function () {
    borrarTareaBBDD(tareaId);

    location.reload();
  };

  const noBtn = document.createElement("button");
  noBtn.setAttribute("class", "no-button");
  noBtn.innerHTML = "No";
  noBtn.onclick = function () {
    oscurecer.style.zIndex = 1;
    miDiv.remove();
  };

  // Añadir los botones al div
  botones.appendChild(siBtn);
  botones.appendChild(noBtn);

  miDiv.appendChild(botones);

  // Añadir el div al DOM
  document.body.appendChild(miDiv);
}

function borrarTareaBBDD(idTarea) {
  fetch("http://localhost:8080/deleteTask/" + idTarea, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Si la respuesta es exitosa, convierte la respuesta a JSON
      } else {
        throw new Error("Error en la solicitud POST"); // Maneja errores de la solicitud
      }
    })
    .then((data) => {})
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
}

