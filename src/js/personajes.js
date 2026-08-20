document.addEventListener("DOMContentLoaded", () => {
    const encabezado = document.getElementById("head");
    const tarjetas = document.querySelectorAll(".ficha");

    if (!encabezado || tarjetas.length === 0) return;

    const filtros = [
        { etiqueta: "Ver héroes", tipoVisible: "heroe" },
        { etiqueta: "Ver villanos", tipoVisible: "villano" },
        { etiqueta: "Ver todos", tipoVisible: null },
    ];

    let filtroActual = 0;
    const botonFiltro = document.createElement("button");
    botonFiltro.type = "button";
    botonFiltro.className = "btn brand-btn rounded-pill fw-bold";
    botonFiltro.id = "filter";
    botonFiltro.setAttribute("aria-controls", "galeria");
    botonFiltro.textContent = filtros[filtroActual].etiqueta;

    botonFiltro.addEventListener("click", () => {
        const { tipoVisible } = filtros[filtroActual];

        tarjetas.forEach((tarjeta) => {
            const esVisible = !tipoVisible || tarjeta.dataset.tipo === tipoVisible;
            const columna = tarjeta.closest(".character-column");

            if (columna) {
                columna.hidden = !esVisible;
                columna.classList.toggle("d-none", !esVisible);
            }

            tarjeta.classList.toggle("resaltado", esVisible && Boolean(tipoVisible));
        });

        filtroActual = (filtroActual + 1) % filtros.length;
        botonFiltro.textContent = filtros[filtroActual].etiqueta;
    });

    encabezado.append(botonFiltro);

    tarjetas.forEach((tarjeta) => {
        const cuerpoTarjeta = tarjeta.querySelector(".card-body");

        if (cuerpoTarjeta) {
            cuerpoTarjeta.prepend(createFavoriteButton(tarjeta));
        }
    });
});

function createFavoriteButton(tarjeta) {
    const botonFavorito = document.createElement("button");
    botonFavorito.type = "button";
    botonFavorito.className = "favorite-btn float-end d-inline-flex align-items-center justify-content-center p-0 rounded-circle fw-bold text-decoration-none";
    botonFavorito.textContent = "⭐";
    botonFavorito.setAttribute("aria-label", `Guardar a ${tarjeta.querySelector(".nombre").textContent} como favorito`);

    botonFavorito.addEventListener("click", () => {
        const name = tarjeta.querySelector(".nombre").textContent;
        guardarFavorito(name).then(function (mensaje) {
            botonFavorito.setAttribute("aria-pressed", "true");
            botonFavorito.title = mensaje;
            console.log(mensaje);
        }).catch(function (error) {
            console.error(error);
        });
    });
    return botonFavorito;
}

function guardarFavorito(name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (name) {
                resolve(`Favorito guardado: ${name}`);
            }
            else {
                reject("Error: No se pudo guardar.");
            }
        }, 1000)
    });
}
