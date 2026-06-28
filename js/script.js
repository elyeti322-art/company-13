document.addEventListener("DOMContentLoaded", () => {
    // Elementos de las pantallas
    const menuPrincipal = document.getElementById("menu-principal");
    const pantallaCarga = document.getElementById("pantalla-carga");
    const pantallaAjustes = document.getElementById("pantalla-ajustes");
    const bgImage = document.getElementById("bg-image");
    const tvEffect = document.getElementById("tv-off-effect");
    const noiseLayer = document.querySelector(".noise");

    // Botones
    const btnIniciar = document.getElementById("btn-iniciar");
    const btnAjustes = document.getElementById("btn-ajustes");
    const btnSalir = document.getElementById("btn-salir");
    const btnAplicar = document.getElementById("btn-aplicar");

    // Inputs de Ajustes
    const inputVolumen = document.getElementById("input-volumen");
    const inputOpacidad = document.getElementById("input-opacidad");

    // --- ACCIÓN: INICIAR PARTIDA ---
    btnIniciar.addEventListener("click", () => {
        // Esconder menú y mostrar texto de carga
        menuPrincipal.classList.add("hidden");
        pantallaCarga.classList.remove("hidden");
        
        // Activar súper zoom a negro en el fondo
        bgImage.classList.add("bg-zoom-black");

        // Después de 3 segundos (3000ms), regresar a como estaba antes
        setTimeout(() => {
            bgImage.classList.remove("bg-zoom-black");
            pantallaCarga.classList.add("hidden");
            menuPrincipal.classList.remove("hidden");
        }, 3000);
    });

    // --- ACCIÓN: ABRIR AJUSTES ---
    btnAjustes.addEventListener("click", () => {
        menuPrincipal.classList.add("hidden");
        pantallaAjustes.classList.remove("hidden");
    });

    // --- ACCIÓN: APLICAR AJUSTES ---
    btnAplicar.addEventListener("click", () => {
        const volValue = inputVolumen.value;
        const opacityValue = inputOpacidad.value;

        // Validar y aplicar opacidad a la capa de ruido estático vhs
        if(opacityValue >= 0.1 && opacityValue <= 1) {
            noiseLayer.style.opacity = opacityValue;
        }

        // Aquí simulamos guardar el volumen (lo ideal para reproducir audios del ARG luego)
        console.log(`Volumen configurado a: ${volValue}%`);

        // Regresar al menú principal
        pantallaAjustes.classList.add("hidden");
        menuPrincipal.classList.remove("hidden");
    });

    // --- ACCIÓN: SALIR (APAGADO DE TV) ---
    btnSalir.addEventListener("click", () => {
        // Hacemos visible la capa del efecto de la TV
        tvEffect.classList.remove("hidden");

        // Los navegadores modernos bloquean cerrar ventanas por código a menos que hayan sido abiertas por JS.
        // Después de los 2.5 segundos (2500ms) de animación intenta cerrar o borra el contenido.
        setTimeout(() => {
            try {
                window.close();
            } catch (e) {
                // Alternativa por si el navegador bloquea el cierre: deja la pantalla en negro absoluto.
                document.body.innerHTML = "<div style='background:#000;width:100vw;height:100vh;'></div>";
            }
        }, 2500);
    });
});