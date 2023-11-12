let savedPassword = 'verdurita86';
let saldo = localStorage.getItem('saldo') ? parseInt(localStorage.getItem('saldo')) : 10000;
const imagenes = [
    'zanahoria.jpg', 'papa.jpg', 'tomate.jpg', 'espinaca.jpg', 'morron.jpg'
];
let bolsaVerduras = [];

// Objeto para representar una verdura
class Verdura {
    constructor(nombre, precio, peso, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.imagen = imagen;
    }
}

// Array para las verduras disponibles
const bolsas = [];

// Cargar datos desde un archivo JSON local
fetch('./data/datos.json')
    .then(response => response.json())
    .then(data => {
        // Procesar los datos cargados
        bolsas.push(...data.verduras);
        generarTarjetasVerduras();
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });

// Agregar una verdura al bolsón
function agregarVerdura(index) {
    bolsaVerduras.push(index);
    actualizarBolsa();
}

// Eliminar una verdura del bolsón
function eliminarVerdura(index) {
    const position = bolsaVerduras.indexOf(index);
    if (position > -1) {
        bolsaVerduras.splice(position, 1);
    }
    actualizarBolsa();
}

//Ingreso
function login() {
    const passwordInput = document.getElementById('password');
    const userPassword = passwordInput.value;
    if (userPassword === savedPassword) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta. Intenta de nuevo.'
        });
    }
}

//Guarda el Saldo del cliente en el LocalStorage
function guardarSaldo() {
    localStorage.setItem('saldo', saldo);
}

//Recarga de Saldo
function recargar() {
    const recargaInput = document.getElementById('recarga');
    const monto = parseInt(recargaInput.value);

    if (!isNaN(monto) && monto > 0) {
        Swal.fire({
            title: '¿Confirmar Recarga?',
            text: `Estás a punto de recargar $${monto} a tu saldo. ¿Deseas continuar?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, recargar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                saldo += monto;
                Swal.fire(
                    '¡Recarga Exitosa!',
                    `Tu nuevo saldo es $${saldo}.`,
                    'success'
                );
                document.getElementById('saldo').innerText = 'Saldo: $' + saldo;
                guardarSaldo();
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El monto ingresado no es válido'
        });
    }
}

//Da formato de lectura al bolsón
function formatBolsaVerduras(bolsaVerduras) {
    return bolsaVerduras.map(verdura => `${verdura.nombre}`).join(', ');
}

//Compra de Bolsón
function comprarBolson() {
    if (bolsaVerduras.length === 0) {
        mostrarMensaje('Tu bolsón está vacío.');
        return;
    }

    let total = bolsaVerduras.reduce((acc, v) => acc + bolsas[v].precio, 0);

    // Calcular el peso total
    let pesoTotal = bolsaVerduras.reduce((totalPeso, v) => totalPeso + bolsas[v].peso, 0);
    pesoTotal = Math.round(pesoTotal * 10) / 10;

    // Obtener el contenido del bolsón
    const contenidoBolson = bolsaVerduras.map(v => bolsas[v].nombre).join(', ');

    if (saldo >= total) {
        Swal.fire({
            title: '¿Confirmar Compra?',
            text: `El total de tu compra es $${total}. ¿Deseas proceder?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡comprar!',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                saldo -= total;
                Swal.fire(
                    '¡Compra Realizada!',
                    `Te enviaremos un bolsón que contiene:<br><b>${contenidoBolson}</b><br>Peso total: <b>${pesoTotal} kg</b><br>Tu nuevo saldo es <b>$${saldo}</b>`,
                    'success'
                );
                document.getElementById('saldo').innerText = 'Saldo: $' + saldo;
                guardarSaldo(); 
                bolsaVerduras = [];
                actualizarBolsa();
            }
        });
    } else {
        mostrarMensaje('No tienes suficiente saldo para realizar esta compra.');
    }
}

function recargarSaldo() {
    const recargarSection = document.getElementById('recargar-section');
    const verdurasSection = document.getElementById('verduras-section');
    verdurasSection.style.display = 'none'; // Oculta la sección de elegir verduras
    recargarSection.style.display = recargarSection.style.display === 'none' ? 'block' : 'none';
}

// Elije verduras para el bolsón
function elegirVerduras() {
    const verdurasSection = document.getElementById('verduras-section');
    const recargarSection = document.getElementById('recargar-section');
    recargarSection.style.display = 'none'; // Oculta la sección de recarga
    verdurasSection.style.display = 'flex'; // Muestra la sección de verduras
}

//Elimina una verdura del bolsón
function eliminarVerdura(index) {
    const position = bolsaVerduras.indexOf(index);
    if (position > -1) {
        bolsaVerduras.splice(position, 1);
    }
    actualizarBolsa();
}

//Muestra el mensaje que le pasamos
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerText = mensaje;
}

//Actualiza el contenido de la bolsa
function actualizarBolsa() {
    const bolsaDiv = document.getElementById('bolsa');
    if (bolsaVerduras.length === 0) {
        bolsaDiv.innerText = 'Elementos en tu bolsón de verduras: Vacío';
    } else {
        let contenido = 'Elementos en tu bolsón de verduras: ';
        bolsaVerduras.forEach(v => {
            contenido += bolsas[v].nombre + ', ';
        });
        bolsaDiv.innerText = contenido.slice(0, -2);
    }
}

//Muestra las verduras en forma de tarjetas
function generarTarjetasVerduras() {
    const verdurasSection = document.getElementById('verduras-section');
    // Limpia el contenido previo del contenedor de verduras
    verdurasSection.innerHTML = ''; 
    bolsas.forEach((verdura, index) => {
        const card = document.createElement('div');
        card.className = 'verdura-card';
        card.innerHTML = `
            <img src="/img/${verdura.imagen}" alt="${verdura.nombre}">
            <h3>${verdura.nombre}</h3>
            <p>Precio: $${verdura.precio}</p>
            <p class="mb5">Peso: ${verdura.peso} kg</p>
            <button onclick="agregarVerdura(${index})">Agregar al bolsón</button>
            <button onclick="eliminarVerdura(${index})">Eliminar del bolsón</button>
        `;
        verdurasSection.appendChild(card);
    });
}

//Al cargar la ventana, genera las tarjetas + pone un Listener para poder usar Enter además de los botones
window.onload = function() {
    generarTarjetasVerduras();

    const saldoGuardado = localStorage.getItem('saldo');
    if (saldoGuardado !== null) {
        saldo = parseInt(saldoGuardado);
        document.getElementById('saldo').innerText = 'Saldo: $' + saldo;
    }

    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });

    document.getElementById('recarga').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            recargar();
        }
    });
};
