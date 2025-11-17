let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarCarrito();

const offcanvas = new bootstrap.Offcanvas('#carritoOffcanvas');

// Botones agregar
const btnAdd = document.querySelectorAll(".btn-add");

btnAdd.forEach(boton => {
    boton.addEventListener("click", function() {

        const producto = {
            id: this.dataset.id,
            nombre: this.dataset.nombre,
            precio: Number(this.dataset.precio)
        };

        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();
        offcanvas.show();

    });
});

//función actualizar
function actualizarCarrito() {
    document.getElementById("contadorCarrito").textContent = carrito.length;

    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((prod, index) => {
        total += prod.precio;

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
            ${prod.nombre} - $${prod.precio}
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">X</button>
        `;
        lista.appendChild(li);
    });

    document.getElementById("totalCarrito").textContent = total;
}

//Eliminar producto 
function eliminarProducto(i) {
    carrito.splice(i, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}