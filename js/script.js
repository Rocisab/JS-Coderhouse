let savedPassword = 'verdurita86';
let saldo = localStorage.getItem('saldo') ? parseInt(localStorage.getItem('saldo')) : 10000;
const verduras = ['Zanahoria', 'Papa', 'Tomate', 'Espinaca', 'Morrón'];
const precios = [2000, 1500, 2500, 3000, 1800];
const pesos = [0.22, 1.31, 0.12, 0.15, 0.25];
const imagenes = [
    'zanahoria.jpg', 'papa.jpg', 'tomate.jpg', 'espinaca.jpg', 'morron.jpg'
];
let bolsaVerduras = [];

//Ingreso
function login() {
    const passwordInput = document.getElementById('password');
    const userPassword = passwordInput.value;
    if (userPassword === savedPassword) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
    } else {
        mostrarMensaje('Contraseña incorrecta. Intenta de nuevo.');
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
        saldo += monto;
        mostrarMensaje('Recarga exitosa. Tu nuevo saldo es $' + saldo);
        document.getElementById('saldo').innerText = 'Saldo: $' + saldo;
        guardarSaldo(); 
    } else {
        mostrarMensaje('El monto ingresado no es válido');
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
  let total = 0;

  // Calcular el peso total
  let pesoTotal = 0;
  bolsaVerduras.forEach(index => pesoTotal += pesos[index]);

  // Obtener el contenido del bolsón
  const contenidoBolson = bolsaVerduras.map(index => verduras[index]).join(', ');

  bolsaVerduras.forEach(v => total += precios[v]);
  if (saldo >= total) {
      saldo -= total;
      mostrarMensaje('Compra realizada con éxito. Te enviaremos un bolsón que contiene: ' + contenidoBolson + 
      '\nPeso total: ' + pesoTotal + ' kg\nTu nuevo saldo es $' + saldo);
      document.getElementById('saldo').innerText = 'Saldo: $' + saldo;
      guardarSaldo(); 
      bolsaVerduras = [];
      actualizarBolsa();
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
    recargarSection.style.display = 'none';
    verdurasSection.style.display = verdurasSection.style.display === 'none' ? 'flex' : 'none';
}

//Agrega una verdura al bolsón
function agregarVerdura(index) {
    bolsaVerduras.push(index);
    actualizarBolsa();
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
            contenido += verduras[v] + ', ';
        });
        bolsaDiv.innerText = contenido.slice(0, -2);
    }
}

//Muestra las verduras en forma de tarjetas
function generarTarjetasVerduras() {
    const verdurasSection = document.getElementById('verduras-section');
    verduras.forEach((verdura, index) => {
        const card = document.createElement('div');
        card.className = 'verdura-card';
        card.innerHTML = `
            <img src="/img/${imagenes[index]}" alt="${verdura}">
            <h3>${verdura}</h3>
            <p>Precio: $${precios[index]}</p>
            <p>Peso: ${pesos[index]} kg</p>
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