let valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let origen = urlParams.get('origen');
let destino = urlParams.get('destino')
let fecha = urlParams.get('fecha')
let hora = urlParams.get('hora')
let costo = urlParams.get('costo')
let asientosdisp = urlParams.get('asientosdisp')
let boletos = urlParams.get('Boletos')

let inputOrigen = document.getElementById('inputOrigen')
let inputDestino = document.getElementById('inputDestino')
let inputHoraSalida = document.getElementById('inputHoraSalida')
let inputFechaSalida = document.getElementById('inputFechaSalida')
let inputAsientos = document.getElementById('inputAsientos')

let dinerosHTML = document.getElementById('dineros')

let numBoletosString = boletos
let numboletos = numBoletosString.split(',')
let cuantosboletos = numboletos.length

let formCompra = document.getElementById('formComprar')
    
dinerosHTML.innerHTML = ("$"+dineros(destino, cuantosboletos))

inputOrigen.value = origen
inputDestino.value = destino
inputHoraSalida.value = hora
inputFechaSalida.value = fecha
inputAsientos.value = numboletos.join(', ')

function dineros(destino, numboletos) {

    if (destino == 'Cancun') {
        let dinero = numboletos * 1533
        return dinero
    }
    else if (destino == 'PuertoVallarta') {
        let dinero = numboletos * 600
        return dinero
    }
    else if (destino == 'Leon') {
        let dinero = numboletos * 2600
        return dinero
    }
    
}

formCompra.addEventListener('submit', async e => {
    e.preventDefault(); // se tiene que quitar cuando se termine

    let datos = document.querySelectorAll("[class='form-control']");
    // console.log(datos);
    let getAsientos = await fetch('https://json.extendsclass.com/bin/756a0d5acfc0', {
        method: 'GET'
    })

    let totalAsientos = await getAsientos.json()
    // console.log(totalAsientos);
    let arregloAsientos
    let nuevosBoletos

    switch (destino) {
        case 'Cancun':
            arregloAsientos = totalAsientos.Cancun
            // console.log(arregloAsientos);
            for (let index = 0; index < numboletos.length; index++) {
                var search_term = numboletos[index];
                for (var i=arregloAsientos.length-1; i>=0; i--) {
                    if (arregloAsientos[i] === search_term) {
                        arregloAsientos.splice(i, 1);
                    }
                }
            }
            // console.log(arregloAsientos);
            nuevosBoletos = {
                "Cancun":arregloAsientos,
                "Puerto":totalAsientos.Puerto,
                "Leon":totalAsientos.Leon
            }
            break;
        case 'PuertoVallarta':
            arregloAsientos = totalAsientos.Puerto
            // console.log(arregloAsientos);
            for (let index = 0; index < numboletos.length; index++) {
                var search_term = numboletos[index];
                for (var i=arregloAsientos.length-1; i>=0; i--) {
                    if (arregloAsientos[i] === search_term) {
                        arregloAsientos.splice(i, 1);
                    }
                }
            }
            // console.log(arregloAsientos);
            nuevosBoletos = {
                "Cancun":totalAsientos.Cancun,
                "Puerto":arregloAsientos,
                "Leon":totalAsientos.Leon
            }
            break;
        case 'Leon':
            arregloAsientos = totalAsientos.Leon
            // console.log(arregloAsientos);
            for (let index = 0; index < numboletos.length; index++) {
                var search_term = numboletos[index];
                for (var i=arregloAsientos.length-1; i>=0; i--) {
                    if (arregloAsientos[i] === search_term) {
                        arregloAsientos.splice(i, 1);
                    }
                }
            }
            // console.log(arregloAsientos);
            nuevosBoletos = {
                "Cancun":totalAsientos.Cancun,
                "Puerto":totalAsientos.Puerto,
                "Leon":arregloAsientos
            }
            break;
        default:
            console.log('error');
            break;
    }   
    // console.log(nuevosBoletos);
    let getTotal = await fetch('https://json.extendsclass.com/bin/89f13b30b47e', {
        method: 'GET'
    })

    let totalActual = await getTotal.json()
    let nuevosAsientos
    switch (destino) {
        case 'Cancun':
            nuevosAsientos = {
                "asientoscancun": totalActual.asientoscancun - cuantosboletos,
                "asientosleon": totalActual.asientosleon,
                "asientospuerto": totalActual.asientospuerto    
            }
            break;
        case 'PuertoVallarta':
            nuevosAsientos = {
                "asientoscancun": totalActual.asientoscancun,
                "asientosleon": totalActual.asientosleon,
                "asientospuerto": totalActual.asientospuerto - cuantosboletos    
            }
            break;
        case 'Leon':
            nuevosAsientos = {
                "asientoscancun": totalActual.asientoscancun,
                "asientosleon": totalActual.asientosleon - cuantosboletos,
                "asientospuerto": totalActual.asientospuerto    
            }
            break;
        default:
            console.log('error');
            break;
    }
    // console.log(totalActual);
    // console.log(nuevosAsientos);

    let resp = await fetch('https://sjuvu2c7d9.execute-api.us-east-2.amazonaws.com/dev-bolariz/ticket'+"?Email="+datos[1].value, {
        method: 'GET'
    });
   
    let usuario = await resp.json()
    // console.log(usuario);
    if (usuario) {
        $('#exampleModal3').modal('show');
        return
    }
    else {
        let Email = document.getElementById('inputEmail')
        let name = document.getElementById('inputNombre')
        let address = document.getElementById('inputDireccion')
        let telephone = document.getElementById('inputTelefono')
        let creditcard = document.getElementById('inputTarjeta')
        // console.log(Email, name, address, telephone, creditcard);
        let user = {
            "Email": Email.value,
            "name": name.value,
            "address": address.value,
            "telephone": telephone.value,
            "creditcard": creditcard.value,
            "origen": origen,
            "destino": destino,
            "hour": hora,
            "date": fecha,
            "seats": numboletos.toString()
        }
        // console.log(user);
        let respSubida = await fetch('https://sjuvu2c7d9.execute-api.us-east-2.amazonaws.com/dev-bolariz/ticket', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let final = await respSubida
        console.log(final);
        
        if(final.status == 200) {
            let putTotal = await fetch('https://json.extendsclass.com/bin/89f13b30b47e', {
                method: 'PUT',
                body: JSON.stringify(nuevosAsientos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let putAsientos = await fetch('https://json.extendsclass.com/bin/756a0d5acfc0', {
                method: 'PUT',
                body: JSON.stringify(nuevosBoletos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let respTotal = await putTotal.json()
            // console.log(respTotal);
            let respAsientos = await putAsientos.json()
            // console.log(respAsientos);
            window.location.href = '../Gracias/index.html?Email='+ datos[1].value;  
            return
        }
        else{
            $('#exampleModal3').modal('show');
            console.log('algo salió mal al tratar de hacer POST :(');
            return
        }

    }  

})