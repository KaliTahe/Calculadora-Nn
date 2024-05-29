//Evento
function EventoCalculadora() {
    document.querySelector("#btn").addEventListener("click", CalcularProducto);
    document.querySelector("#btn1").addEventListener("click", LimpiarCampos);
    document.querySelector("#btn2").addEventListener("click", userInterfaceGuardarProducto);
    document.querySelector("#btn3").addEventListener("click", UserInterfaceVerTodosLosProductosGuardados);
    document.querySelector("#btn4").addEventListener("click", UserInterfaceOcultarProductosGuardados);
    document.querySelector("#btn5").addEventListener("click", descargarPDF);
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
        Swal.fire({
            title: 'Oops...',
            text: 'Por favor asegúrate de haber llenado correctamente todos los campos',
            imageUrl: '/images/alert.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image'
        });
        return false;
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreproducto)) {
        Swal.fire({
            title: 'Oops...',
            text: 'El nombre de tu producto solo debe contener letras y espacios.',
            imageUrl: '/images/alert.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image'
        });
        return false;
    }
    return true;
}


function mostrarResultado(mensaje) {
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}

let ProductosGuardados = [];

function guardarProducto(nombre, costoUnidad, piezas, envio, transporte, publicidad, precio, ganancia, porcentajeganancia) {
    const productoExistente = ProductosGuardados.find(producto => producto.nombre === nombre);

    if (!productoExistente) {
        let nuevoProducto = {
            nombre: nombre,
            costoUnidad: costoUnidad,
            piezas: piezas,
            envio: envio,
            transporte: transporte,
            publicidad: publicidad,
            precio: precio,
            ganancia: ganancia,
            porcentajeganancia: porcentajeganancia
        };
        ProductosGuardados.push(nuevoProducto);
        localStorage.setItem('ProductosGuardados', JSON.stringify(ProductosGuardados));
    }
}

function VerTodosLosProductosGuardados() {
    const productosGuardadosStr = localStorage.getItem('ProductosGuardados');
    if (productosGuardadosStr) {
        ProductosGuardados = JSON.parse(productosGuardadosStr);
    }

    let tabla = "<table border='1'><tr><th>Producto</th><th>Nombre</th><th>Costo por unidad</th><th>Piezas</th><th>Costo de envío</th><th>Transporte</th><th>Publicidad</th><th>Precio</th><th>Ganancia</th><th>Porcentaje de ganancia</th><th>Viabilidad</th><th>Borrar</th></tr>";
    for (let i = 0; i < ProductosGuardados.length; i++) {
        let producto = ProductosGuardados[i];
        tabla += `<tr>
                    <td>${i + 1}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.costoUnidad}</td>
                    <td>${producto.piezas}</td>
                    <td>${producto.envio}</td>
                    <td>${producto.transporte}</td>
                    <td>${producto.publicidad}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.ganancia.toFixed(2)}</td>
                    <td>${producto.porcentajeganancia.toFixed(2)}%</td>
                    <td>${producto.viabilidad}</td>
                    <td><button onclick="eliminarProducto(${i})"><img src="../images/botecito.png" alt="Borrar" style="width: 30px; height: 30px;"></button></td>
                 </tr>`;
    }
    tabla += "</table>";
    return tabla;
}

function eliminarProducto(index) {
    ProductosGuardados.splice(index, 1);
    localStorage.setItem('ProductosGuardados', JSON.stringify(ProductosGuardados));

    if (ProductosGuardados.length === 0) {
        document.querySelector("#divMostrarResultado").innerHTML = ""; 
    } else {
        UserInterfaceVerTodosLosProductosGuardados(); 
    }
}



function userInterfaceGuardarProducto() {
    const inputs = obtenerValores();
    if (!validarCampos(inputs)) return;

    const { nombreproducto, costounidad, piezas, envio, transporte, publicidad, precio } = inputs;

    const costoproductos = calcularCostoProductos(costounidad, piezas);
    const transportetotal = calcularTransporteTotal(transporte, piezas);
    const costototal = calcularCostoTotal(costoproductos, envio, transportetotal, publicidad);
    const costoporproducto = calcularCostoPorProducto(costototal, piezas);
    const ganancia = calcularGanancia(precio, costoporproducto);
    const porcentajeganancia = calcularPorcentajeGanancia(precio, costoporproducto);

    guardarProducto(nombreproducto, costounidad, piezas, envio, transporte, publicidad, precio, ganancia, porcentajeganancia);

    const mensaje = `<div class="alert alert-success">Se guardó el producto correctamente</div>`;
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}


function UserInterfaceVerTodosLosProductosGuardados() {
    const productosGuardadosStr = localStorage.getItem('ProductosGuardados');
    if (!productosGuardadosStr || productosGuardadosStr.length === 0 || JSON.parse(productosGuardadosStr).length === 0) {
        document.querySelector("#divMostrarResultado").innerHTML = "<div class='alert alert-warning'>No hay productos guardados.</div>";
        return;
    }

    const resultado = VerTodosLosProductosGuardados();
    let mensaje = "";
    if (resultado !== "") {
        mensaje += `<div class="alert alert-info">Los productos guardados hasta el momento son: <br>`;
        mensaje += `${resultado}</div><br>`;
    } else {
        mensaje = `<div class="alert alert-warning">No se encontró ningún producto guardado hasta el momento.</div>`;
    }
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}

function UserInterfaceOcultarProductosGuardados() {
    document.querySelector("#divMostrarResultado").innerHTML = "";
}



//permite que el usuario descargue el pdf

function descargarPDF() {
    const doc = new jsPDF();

    Swal.fire({
        title: 'Descargando PDF',
        text: 'Tu archivo PDF se descargará en un momento...',
        imageUrl: '/images/ok.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Custom image',
        showConfirmButton: false,
        allowOutsideClick: false
    });

    const productosGuardadosStr = localStorage.getItem('ProductosGuardados');

    if (!productosGuardadosStr || JSON.parse(productosGuardadosStr).length === 0) {
        Swal.fire({
            text: 'No hay datos para descargar',
            imageUrl: '/images/alert.png',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom image'
        });
        return;
    }

    const productosGuardados = JSON.parse(productosGuardadosStr);

    let contenidoPDF = 'Productos Guardados:\n\n';

    productosGuardados.forEach((producto, index) => {
        contenidoPDF += `Producto ${index + 1}:\n`;
        contenidoPDF += `Nombre: ${producto.nombre}\n`;
        contenidoPDF += `Costo por unidad: ${producto.costoUnidad}\n`;
        contenidoPDF += `Piezas: ${producto.piezas}\n`;
        contenidoPDF += `Costo de envío: ${producto.envio}\n`;
        contenidoPDF += `Transporte: ${producto.transporte}\n`;
        contenidoPDF += `Publicidad: ${producto.publicidad}\n`;
        contenidoPDF += `Precio: ${producto.precio}\n\n`;
    });

    doc.text(contenidoPDF, 10, 10);

    setTimeout(() => {
        doc.save('neni_calculadora.pdf');
        Swal.close(); 
    }, 2000);
}


//JSON
// Función para cuando la llamada es exitosa
function exito() {
    var datos = JSON.parse(this.responseText);
    console.log(datos);
}

// Función para la llamada fallida
function error(err) {
    console.log('Solicitud fallida', err); 
}

// Fetch
fetch('https://api.github.com/users/KaliTahe')
    // Éxito
    .then(response => response.json())  
    .then(json => console.log(json))   
    .catch(err => console.log('Solicitud fallida', err)); 