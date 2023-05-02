$(function () {
  $(".sortable-list")
    .sortable({
      connectWith: ".sortable-list",
      tolerance: "pointer",
      placeholder: "sortable-placeholder",
    })
    .disableSelection();

  $(".panel").on("click", ".panel-footer button", function () {
    var newItem = $("<li>")
      .addClass("sortable-item")
      .append("<input type='text'>")
      .appendTo($(this).closest(".panel").find(".sortable-list"));

    $(this).closest(".panel").find(".sortable-list").append(newItem);
  });

  $(".sortable-list").on("dragstart", ".sortable-item", function (event) {
    event.originalEvent.dataTransfer.setData("text", $(this).index());
  });

  $(".papelera").on("dragover dragenter", function (event) {
    event.preventDefault();
    $(this).addClass("papelera-hover");
  });

  $(".papelera").on("dragleave dragend", function (event) {
    $(this).removeClass("papelera-hover");
  });

  $(".papelera").on("drop", function (event) {
    event.preventDefault();
    var index = event.originalEvent.dataTransfer.getData("text");
    $(".sortable-item").eq(index).remove();
    $(this).removeClass("papelera-hover");
  });
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
      h4.textContent = item.user.userName;

      titulo.appendChild(h4);
      panel.appendChild(titulo);

      // Crear el cuerpo del panel
      const panelBody = document.createElement("div");
      panelBody.setAttribute("class", "panel-body");

      const ul = document.createElement("ul");
      ul.setAttribute("class", "sortable-list");

      // Para cada tarea en el array de tareas
      item.tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = tarea.direccion;
        ul.appendChild(li);
      });

      panelBody.appendChild(ul);
      panel.appendChild(panelBody);

      // Crear el pie del panel
      const panelFooter = document.createElement("div");
      panelFooter.setAttribute("class", "panel-footer");

      const button = document.createElement("button");
      button.textContent = "Añadir";

      panelFooter.appendChild(button);
      panel.appendChild(panelFooter);

      // Agregar el panel al contenedor
      panelContainer.appendChild(panel);
    });
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });
