document.addEventListener("DOMContentLoaded", () => {
    const contenedorBotones = document.getElementById("daily-quote-actions");
    const salidaFrase = document.getElementById("quote-output");

    if (!contenedorBotones || !salidaFrase) return;

    const botonFrase = document.createElement("button");
    botonFrase.type = "button";
    botonFrase.className = "btn brand-btn rounded-pill fw-bold";
    botonFrase.textContent = "Descubrir frase";

    const textoFrase = document.createElement("p");
    textoFrase.id = "frase-del-dia";
    textoFrase.className = "quote mt-3 mb-0 px-3 py-3 rounded-3 text-center fst-italic";

    botonFrase.addEventListener("click", () => {
        botonFrase.disabled = true;

        fraseDelDia((frase) => {
            if (frase && frase.trim()) {
                textoFrase.textContent = frase;

                if (!textoFrase.isConnected) {
                    salidaFrase.append(textoFrase);
                }
            }

            botonFrase.disabled = false;
        });
    });

    contenedorBotones.append(botonFrase);
});

function fraseDelDia(callback) {
    fetch("https://catfact.ninja/fact")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`La solicitud falló con el estado ${respuesta.status}`);
            }

            return respuesta.json();
        })
        .then((datos) => {
            callback(datos.fact);
        })
        .catch((error) => {
            console.error("Error al cargar la frase:", error);
            callback(null);
        });
}
