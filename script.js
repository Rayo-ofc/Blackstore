//creando
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

botonesAgregarCarrito.forEach((boton) => {
  boton.addEventListener('click', () => {
    const nombreProducto = boton.getAttribute('data-nombre');
    const precioProducto = boton.getAttribute('data-precio');
    alert(`Se ha agregado ${nombreProducto} al carrito. Precio: $${precioProducto}`);
  });
});