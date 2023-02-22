let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprar = document.querySelector("#comprar-carrito");
const botonVaciar = document.querySelector("#vaciar-carrito");
const contenedorCarritoVaciado = document.querySelector("#carrito-vaciado");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVaciado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add(
                "carrito-producto",
                "d-flex",
                "justify-content-between",
                "align-items-center",
                "border",
                "p-3",
                "my-2",
                "rounded"
            );
            div.innerHTML =
                `<div class="carrito-producto-titulo">
        <small>Producto</small>
        <p>${producto.nombre}</p>
        </div>
        <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button id="${producto.id}"
        class="btn btn-outline-light carrito-producto-eliminar"
        >
        <i class="bi bi-trash3"></i>
        </button>`;

            contenedorCarritoProductos.append(div);
        });
        actualizarBotonesEliminar();
        vaciarCarrito();
        comprarCarrito();
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVaciado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";
    }
}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(
        (producto) => producto.id == idBoton
    );
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
    );
}

function vaciarCarrito() {
    botonVaciar.addEventListener("click", () => {
        productosEnCarrito.length = 0;
        localStorage.setItem(
            "productos-en-carrito",
            JSON.stringify(productosEnCarrito)
        );
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVaciado.classList.remove("disabled");
        contenedorCarritoProductos.innerHTML = "";
    });
}

function comprarCarrito() {
    botonComprar.addEventListener("click", comprarCarrito);

    function comprarCarrito() {
        productosEnCarrito.length = 0;
        localStorage.setItem(
            "productos-en-carrito",
            JSON.stringify(productosEnCarrito)
        );
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
        contenedorCarritoVaciado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";
    }
}