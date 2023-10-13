//DATOS INGRESO
let savedPassword = 'verdurita86';
let loggedIn = login();

//INGRESO
function login() {
  let ingresar = false;
  let intentos = 2;
  for (let i = intentos; i >= 0; i--) {
    let userPassword = prompt('Ingresá tu contraseña');
    if (userPassword === savedPassword) {
      alert('Bienvenido/a');
      ingresar = true;
      break;
    } else {
      alert('Contraseña incorrecta');
    }
  }
  return ingresar;
}

//SI LOGRO INGRESAR
if (loggedIn) {
  let opcion = '';
  let saldo = 10000;
  const verduras = ['Zanahoria', 'Papa', 'Tomate', 'Espinaca', 'Morrón'];
  const precios = [2000, 1500, 2500, 3000, 1800];
  const pesos = [0.22, 1.31, 0.12, 0.15, 0.25]; // Pesos en kilogramos
  let bolsaVerduras = [];

  //MENU
  while (opcion !== 'X' && opcion !== 'x') {
    opcion = prompt(
      'Elegí una opción: \n1 - Saldo. \n2 - Elegir verduras para el bolsón. \n3 - Comprar bolsón. \n4 - Recargar saldo. \nPresioná X para finalizar.'
    );

    switch (opcion) {
      case '1':
        alert('Tu saldo es: $' + saldo);
        break;

      case '2':
        chooseVerduras(verduras, precios, pesos, bolsaVerduras);
        break;

      case '3':
        saldo = comprarBolson(saldo, bolsaVerduras);
        break;

      case '4':
        saldo = recargarSaldo(saldo);
        break;

      case 'X':
      case 'x':
        break;

      default:
        alert('Opción no válida');
        break;
    }
  }
} else {
  alert('Revisá tu casilla de correo para modificar tu contraseña');
}

//ELECCION DE VERDURAS
function chooseVerduras(verduras, precios, pesos, bolsaVerduras) {
  let eleccion = prompt('Elegí el número de la verdura que querés (o X para finalizar):\n' + formatVerdurasList(verduras, precios, pesos) + '\nVerduras en el bolsón: ' + formatBolsaVerduras(bolsaVerduras));

  while (eleccion !== 'X' && eleccion !== 'x') {
    if (eleccion.toLowerCase() === 'eliminar') {
      // Permite eliminar una verdura
      const verduraAEliminar = prompt('Ingresa el número de la verdura que deseas eliminar según el orden en la bolsa:\nVerduras en el bolsón: ' + formatBolsaVerdurasEliminar(bolsaVerduras));
      const indexAEliminar = parseInt(verduraAEliminar) - 1;

      if (!isNaN(indexAEliminar) && indexAEliminar >= 0 && indexAEliminar < bolsaVerduras.length) {
        bolsaVerduras.splice(indexAEliminar, 1);
      } else {
        alert('Selección no válida');
      }
    } else {
      // Agregar verdura a la bolsa
      const index = parseInt(eleccion) - 1;
      if (!isNaN(index) && index >= 0 && index < verduras.length) {
        const seleccionada = {
          nombre: verduras[index],
          precio: precios[index],
          peso: pesos[index]
        };
        bolsaVerduras.push(seleccionada);
      } else {
        alert('Selección no válida');
      }
    }

    eleccion = prompt('Elegí el número de la verdura que querés (o X para finalizar):\n' + formatVerdurasList(verduras, precios, pesos) + '\nSi querés eliminar una verdura escribí "eliminar".\nVerduras en el bolsón: ' + formatBolsaVerduras(bolsaVerduras));
  }
}

//LISTA DE VERDURAS ORDENADA
function formatVerdurasList(verduras, precios, pesos) {
  let verduraList = '';
  for (let i = 0; i < verduras.length; i++) {
    verduraList += `${i + 1}. ${verduras[i]} - $${precios[i]} - ${pesos[i]} kg\n`;
  }
  return verduraList;
}

//LISTA DE VERDURAS SIMPLE
function formatBolsaVerduras(bolsaVerduras) {
  let bolsaList = '';
  for (let i = 0; i < bolsaVerduras.length; i++) {
    bolsaList += `${bolsaVerduras[i].nombre}, `;
  }
  return bolsaList;
}

//LISTA DE VERDURAS PARA ELIMINAR
function formatBolsaVerdurasEliminar(bolsaVerduras) {
  let bolsaList = '';
  for (let i = 0; i < bolsaVerduras.length; i++) {
    bolsaList += `${i + 1}. ${bolsaVerduras[i].nombre}, `;
  }
  return bolsaList;
}

//COMPRAR
function comprarBolson(saldo, bolsaVerduras) {
  if (bolsaVerduras.length === 0) {
    alert('Tu bolsón está vacío.');
  } else {
    let totalCost = bolsaVerduras.reduce((total, verdura) => total + verdura.precio, 0);
    let pesoTotal = bolsaVerduras.reduce((total, verdura) => total + verdura.peso, 0);
    
    // Redondear el peso a un solo decimal
    pesoTotal = Math.round(pesoTotal * 10) / 10;
    
    if (totalCost <= saldo) {
      saldo -= totalCost;
      alert('Compra exitosa. Tu nuevo saldo es $' + saldo + '\nEl bolsón que te enviaremos tiene las siguientes verduras: ' + formatBolsaVerduras(bolsaVerduras) + '\nPeso total: ' + pesoTotal + ' kg');
      bolsaVerduras.splice(0); // Borra el bolsón después de la compra
    } else {
      alert('Fondos insuficientes para comprar el bolsón.');
    }
    return saldo; // Devuelve el saldo modificado
  }
}

//RECARGAR
function recargarSaldo(saldo) {
  let monto = parseInt(prompt('Ingresá el monto a recargar'));
  if (!isNaN(monto)) {
    saldo += monto;
    alert('Recarga exitosa. Tu nuevo saldo es $' + saldo);
  } else {
    alert('El monto ingresado no es un número');
  }
  return saldo; // Devuelve el saldo modificado
}