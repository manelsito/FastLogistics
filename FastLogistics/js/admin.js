// $(function () {
//   $(".sortable-list")
//     .sortable({
//       connectWith: ".sortable-list",
//       tolerance: "pointer",
//       placeholder: "sortable-placeholder",
//     })
//     .disableSelection();

//   $(".panel").on("click", ".panel-footer button", function () {
//     var newItem = $("<li>")
//       .addClass("sortable-item")
//       .append("<input type='text'>")
//       .appendTo($(this).closest(".panel").find(".sortable-list"));

//     $(this).closest(".panel").find(".sortable-list").append(newItem);
//   });

//   $(".sortable-list").on("dragstart", ".sortable-item", function (event) {
//     event.originalEvent.dataTransfer.setData("text", $(this).index());
//   });

//   $(".papelera").on("dragover dragenter", function (event) {
//     event.preventDefault();
//     $(this).addClass("papelera-hover");
//   });

//   $(".papelera").on("dragleave dragend", function (event) {
//     $(this).removeClass("papelera-hover");
//   });

//   $(".papelera").on("drop", function (event) {
//     event.preventDefault();
//     var index = event.originalEvent.dataTransfer.getData("text");
//     $(".sortable-item").eq(index).remove();
//     $(this).removeClass("papelera-hover");
//   });
// });

$(function () {
  $(".sortable-list")
    .sortable({
      connectWith: ".sortable-list",
      tolerance: "pointer",
      placeholder: "sortable-placeholder",
      receive: function (event, ui) {
        $(this).append(ui.item);
      },
    })
    .disableSelection();

  // ... resto del código
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
        agregarTarea(item.tareas, ul, item.user.idUser);
      };

      panelBody.appendChild(ul);
      panel.appendChild(panelBody);
      panelFooter.appendChild(button);
      panel.appendChild(panelFooter);

      // Agregar el panel al contenedor
      panelContainer.appendChild(panel);
    });
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
        ? (div.style.backgroundColor = "#a7f8ba")
        : (div.style.backgroundColor = "#fe7474");
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

      var divListas = document.querySelector("body");
      divListas.appendChild(div);
      divListas.appendChild(divOscurecer);
    })

    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function agregarTarea(tareas, ul, userId) {
  const nuevaTarea = document.createElement("input");
  nuevaTarea.setAttribute("type", "text");
  nuevaTarea.setAttribute("class", "nueva-tarea");
  ul.appendChild(nuevaTarea);

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
        productos: []
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

console.log(data);

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
    .then((data) => {
      
    })
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
}
