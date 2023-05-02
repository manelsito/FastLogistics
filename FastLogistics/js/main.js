const button = document.getElementById("submit");
const username = document.getElementById("usuario");
const password = document.getElementById("password");

button.addEventListener("click", (e) => {
  const url = "http://localhost:8080/login"; // Reemplaza con la URL de tu API
  const data = {
    user: username.value,
    password: password.value,
  };
  console.log(JSON.stringify(data));

  fetch(url, {
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
      if (data !== -1) {
        localStorage.setItem("userid", data);
        getUsertype(data)
          .then((respuesta) => {
            var usertype = respuesta;
            if(usertype == 1){
              location.href = "../pages/admin.html";
            }
            else if (usertype == 2) {
              location.href = "../pages/tdluser.html";
            } else if (usertype == 3) {
              location.href = "../pages/cleanerscreen.html";
            }
            e.preventDefault();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("Nombre de usuario o contraseña incorrectos");
        e.preventDefault();
      }
    })
    .catch((error) => {
      console.error(error); // Maneja errores de la solicitud
    });
});

async function getUsertype(userID) {
  try {
    const response = await fetch("http://localhost:8080/getUserType/" + userID);
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
