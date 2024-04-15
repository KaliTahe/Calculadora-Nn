let confirmar = confirm('¿Confirmas que aceptas los términos y condiciones?')


//Evento
function EventoCalculadora() {
    document.querySelector("#btn").addEventListener("click", CalcularProducto);
    document.querySelector("#btn1").addEventListener("click", LimpiarCampos);
}
EventoCalculadora();

function LimpiarCampos() {
    document.querySelector("#txtValorUno").value = "";
    document.querySelector("#txtValorDos").value = "";
    document.querySelector("#txtValorTres").value = "";
    document.querySelector("#txtValorCuatro").value = "";
    document.querySelector("#txtValorSeis").value = "";
    document.querySelector("#txtValorSiete").value = "";
    document.querySelector("#txtValorCinco").value = "";
    document.querySelector("#divMostrarResultado").innerHTML = "";
}

function CalcularProducto() {
    const inputs = obtenerValores();
    if (!validarCampos(inputs)) return;

    const { nombreproducto, costounidad, piezas, envio, transporte, publicidad, precio } = inputs;

    const costoproductos = calcularCostoProductos(costounidad, piezas);
    const transportetotal = calcularTransporteTotal(transporte, piezas);
    const costototal = calcularCostoTotal(costoproductos, envio, transportetotal, publicidad);
    const costoporproducto = calcularCostoPorProducto(costototal, piezas);
    const ganancia = calcularGanancia(precio, costoporproducto);
    const porcentajeganancia = calcularPorcentajeGanancia(precio, costoporproducto);
    const mensaje = generarMensaje(nombreproducto, porcentajeganancia, ganancia, precio);

    mostrarResultado(mensaje);
}

function obtenerValores() {
    return {
        nombreproducto: document.querySelector("#txtValorUno").value.trim(),
        costounidad: parseFloat(document.querySelector("#txtValorDos").value),
        piezas: parseFloat(document.querySelector("#txtValorTres").value),
        envio: parseFloat(document.querySelector("#txtValorCuatro").value),
        transporte: parseFloat(document.querySelector("#txtValorSeis").value),
        publicidad: parseFloat(document.querySelector("#txtValorSiete").value),
        precio: parseFloat(document.querySelector("#txtValorCinco").value)
    };
}

function validarCampos(inputs) {
    const { nombreproducto, costounidad, piezas, envio, transporte, publicidad, precio } = inputs;
    if (nombreproducto === "" || isNaN(costounidad) || isNaN(piezas) || isNaN(envio) || isNaN(transporte) || isNaN(publicidad) || isNaN(precio)) {
        alert('Por favor asegúrate de haber llenado correctamente todos los campos');
        return false;
    }
    return true;
}

function calcularCostoProductos(costounidad, piezas) {
    return costounidad * piezas;
}

function calcularTransporteTotal(transporte, piezas) {
    return transporte * piezas;
}

function calcularCostoTotal(costoproductos, envio, transportetotal, publicidad) {
    return costoproductos + envio + transportetotal + publicidad;
}

function calcularCostoPorProducto(costototal, piezas) {
    return costototal / piezas;
}

function calcularGanancia(precio, costoporproducto) {
    return precio - costoporproducto;
}

function calcularPorcentajeGanancia(precio, costoporproducto) {
    return ((precio / costoporproducto) - 1) * 100;
}

function generarMensaje(nombreproducto, porcentajeganancia, ganancia, precio) {
    let mensaje = "";
    if (porcentajeganancia >= 100) {
        mensaje = `${nombreproducto} es un <strong>buen producto</strong> para vender por Facebook Marketplace. Tu ganancia por producto será del ${porcentajeganancia.toFixed(0)}%, es decir, ${ganancia.toFixed(2)} pesos, tomando en cuenta tus costos y los precios de la competencia. Para eso debes ofrecer el producto a un precio de ${precio} pesos.`; 
    } else if (porcentajeganancia >= 50) {
        mensaje = `${nombreproducto} es <strong>producto regular</strong> para vender por Facebook Marketplace. Tu ganancia por producto será del ${porcentajeganancia.toFixed(0)}%, es decir, ${ganancia.toFixed(2)} pesos, tomando en cuenta tus costos y los precios de la competencia. Para eso debes ofrecer el producto a un precio de ${precio} pesos.`;
    } else {
        mensaje = `${nombreproducto} es un <strong>mal producto</strong> para vender por Facebook Marketplace. Tu ganancia por producto será del ${porcentajeganancia.toFixed(0)}%, es decir, ${ganancia.toFixed(2)} pesos, tomando en cuenta tus costos y los precios de la competencia. Para eso debes ofrecer el producto a un precio de ${precio} pesos.`;
    }
    return mensaje;
}


function mostrarResultado(mensaje) {
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}



