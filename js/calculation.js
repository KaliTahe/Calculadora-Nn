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

    // Guardar producto
    guardarProducto(nombreproducto, costounidad, piezas, envio, transporte, publicidad, precio, ganancia, porcentajeganancia);
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

// Función para determinar la viabilidad de la ganancia
function viabilidad(porcentajeganancia) {
    if (porcentajeganancia >= 100) {
        return `Óptimo`;
    } else if (porcentajeganancia >= 50) {
        return `Regular`;
    } else {
        return `No recomendable`;
    }
}