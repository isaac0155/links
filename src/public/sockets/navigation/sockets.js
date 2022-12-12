const newLink = document.querySelector("#newLink")

socket.on("nuevoComunidad", () => {
    newLink.innerHTML = `
        Links de la Comunidad
        <span class="position-absolute p-1 bg-danger rounded-circle animate__animated animate__headShake">
            <span class="visually-hidden">New alerts</span>
        </span>
    `;
});