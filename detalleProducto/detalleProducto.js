const currentUrl = window.location.href;
console.log(currentUrl);

const urlParams = new URLSearchParams(currentUrl)
const urlId = urlParams.get('id');

const contenido = document.getElementById("contenido"); // 

let contadorCarrito = 0;

 async function fetchDetalleMueble() {
  try {
    // Obtenemos el parámetro de la URL (id del producto)
    const params = new URLSearchParams(window.location.search);
    const urlId = parseInt(params.get("id"));

    // Pedimos el JSON
    const respuesta = await fetch("../data/muebles.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar muebles.json");

    const muebles = await respuesta.json();

    // Buscamos el mueble con el id correspondiente
    const mueble = muebles.find(item => item.id === urlId);

    if (mueble) {
      const contenido = document.getElementById("contenido");
      contenido.innerHTML = ""; // limpiar contenido previo

      // Imagen
      const imagen = document.createElement("img");
      imagen.src = mueble.imagen;
      imagen.alt = mueble.alt || mueble.nombre;
      imagen.className = "imagen-producto";

      // Contenedor de detalles
      const detalles = document.createElement("div");
      detalles.className = "detalles-producto";

      // Título
      const titulo = document.createElement("h2");
      titulo.textContent = mueble.nombre;

      // Subtítulo
      const subtitulo = document.createElement("h3");
      subtitulo.textContent = "Descripción";

      // Descripción
      const descripcion = document.createElement("p");
      descripcion.textContent = mueble.descripcion;

      // Lista de características
      const lista = document.createElement("ul");

      const caracteristicas = [
        { label: "Medidas", value: mueble.medidas },
        { label: "Materiales", value: mueble.materiales },
        { label: "Acabado", value: mueble.acabado },
        { label: "Peso", value: mueble.peso },
        { label: "Capacidad", value: mueble.capacidad }
      ];

      caracteristicas.forEach(c => {
        if (c.value && c.value.trim() !== "") {
          const li = document.createElement("li");
          li.textContent = `${c.label}: ${c.value}`;
          lista.appendChild(li);
        }
      });

      // Precio
      const precio = document.createElement("p");
      precio.innerHTML = `Precio: <span class="precio">$ ${mueble.precio}</span>`;

      // Botón
      const boton = document.createElement("button");
      boton.className = "btn-agregar-al-carrito";
      boton.id = "boton-agregar-al-carrito";
      boton.textContent = "Añadir al carrito";
      
      boton.addEventListener("click", () => {
        contadorCarrito++;
        actualizarContadorCarrito();
        alert("Producto añadido al carrito");
      });
      
      // Acá podés agregar el eventListener para carrito
      // boton.addEventListener("click", () => addToCart(mueble));

      // Armamos estructura
      detalles.appendChild(titulo);
      detalles.appendChild(subtitulo);
      detalles.appendChild(descripcion);
      detalles.appendChild(lista);
      detalles.appendChild(precio);
      detalles.appendChild(boton);

      contenido.appendChild(imagen);
      contenido.appendChild(detalles);
    } else {
      document.getElementById("contenido").innerHTML = "<p>Producto no encontrado</p>";
    }

  } catch (error) {
    console.error("Error al cargar detalle del producto:", error);
    document.getElementById("contenido").innerHTML = "<p>No se pudo cargar el producto</p>";
  }
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-counter");
  contador.textContent = contadorCarrito;
}




fetchDetalleMueble()