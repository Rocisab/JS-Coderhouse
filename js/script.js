let savedPassword= 'travel86';
let loggedIn = login();


function login () {
    let ingresar = false;
    let intentos = 2;
    for (let i = intentos; i >= 0; i--) {
        let userPassword = prompt('Ingresá tu contraseña');
        if (userPassword===savedPassword) {
            alert('Bienvenido/a');
            ingresar = true;
            break;
        } else {
            alert('Contraseña incorrecta');
        }
}
return ingresar;

}


if (loggedIn) {
    let saldo = 10000;
    let opcion = prompt(
        'Elegí una opción: \n1 - Saldo. \n2 - Comprar bolsón de verdura. \n3 - Comprar bolsón de fruta. \n4 - Recargar saldo. \n Presioná X para finalizar.'
    );
const Verdura = 5000;
const Fruta = 7000;

    while (opcion!='X' && opcion!='x'){
        switch (opcion) {
            case '1':
                alert('Tu saldo es: $'+saldo);
                break;

            case '2':
                let CantidadVerdura = parseInt(prompt('Ingresá la cantidad a comprar'));
                if((Verdura*CantidadVerdura) <= saldo){
                    saldo -= (Verdura*CantidadVerdura);
                    alert ('Compra exitosa. Tu nuevo saldo es $' + saldo);
                } else{
                    alert ('Fondos insuficientes')
                }
                break;

            case '3':
                let CantidadFruta = parseInt(prompt('Ingresá la cantidad a comprar'));
                if((Fruta*CantidadFruta) <= saldo){
                    saldo -= (Fruta*CantidadFruta);

                    alert ('Compra exitosa. Tu nuevo saldo es $' + saldo);
                } else{
                    alert ('Fondos insuficientes')
                }
                break;

            case '4':
                let RecargarSaldo = parseInt(prompt('Ingresá el monto a recargar'));
                if(Number.isNaN(RecargarSaldo)){
                    alert ('El monto ingresado no es un número');
                }else {
                    saldo += RecargarSaldo;
                } alert ('Recarga exitosa. Tu nuevo saldo es $' + saldo);
                break;

            default:
                alert('Opción no válida');
                break;
            }
        opcion = prompt(
            'Elegí una opción: \n1 - Saldo. \n2 - Comprar bolsón de verduras. \n3 - Comprar bolsón de frutas. \n4 - Recargar saldo. \nPresioná X para finalizar.'
        );
    }
} else {
    alert('Revisá tu casilla de correo para modificar tu contraseña');
}
