const contenedorProductos = document.querySelector("#contenedor-productos");
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
const numeroCarrito = document.querySelector("#numero-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add(
        "card",
        "producto",
        "my-2",
        "shadow-sm",
        "p-3",
        "mb-5",
        "bg-body",
        "rounded"
    );
    div.innerHTML = `<img
            src="${producto.imagen}"
            class="card-img-top producto-imagen"
            alt="..."
        />
        <div class="card-body producto-detalles">
            <h5 class="card-title producto-nombre">${producto.nombre}</h5>
            <p class="card-text producto-descripcion">${producto.descripcion}</p>
            <p class="card-text producto-precio">$${producto.precio}</p>
            <button class="btn btn-outline-dark producto-agregar" id="agregar${producto.id}">
            Agregar
            </button>
        </div>`;

    contenedorProductos.appendChild(div);
    const botonesAgregar = document.querySelector(`#agregar${producto.id}`);
    botonesAgregar.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    });
    actualizarNumero();
});

const agregarAlCarrito = (productoId) => {
    const item = productos.find((producto) => producto.id === productoId);
    console.log(item);
    const existe = productosEnCarrito.some((producto) => producto.id === item.id);

    if (existe) {
        const index = productosEnCarrito.findIndex(
            (producto) => producto.id == item.id
        );
        productosEnCarrito[index].cantidad++;
    } else {
        productosEnCarrito.push(item);
        item.cantidad = 1;
    }
    localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
    );

    actualizarNumero();
};

function actualizarNumero() {
    let nuevoNumeroCarrito = productosEnCarrito.reduce(
        (acc, producto) => acc + producto.cantidad,
        0
    );
    numeroCarrito.innerText = nuevoNumeroCarrito;
}