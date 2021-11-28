let valores = window.location.search;               // Tomar URL 
const urlParams = new URLSearchParams(valores);     // Arreglo de los parametros
let origen = urlParams.get('origen');
let destino = urlParams.get('destino')
let fecha = urlParams.get('fecha')
let hora = urlParams.get('hora')
let costo = urlParams.get('costo')

//console.log(origen, destino, fecha, hora, costo, asientosdisp);

let tablaOrigen = document.getElementById('origen')
let tablaDestino = document.getElementById('destino')
let tablaFecha = document.getElementById('fecha')
let tablaHora = document.getElementById('hora')
let tablaCosto = document.getElementById('costo')
let tablaAsientosdisp = document.getElementById('asientosdisp')

tablaOrigen.innerHTML = origen
tablaDestino.innerHTML = destino
tablaHora.innerHTML = hora
tablaFecha.innerHTML = fecha
tablaCosto.innerHTML = costo

//console.log(valores);

let ArregloBoletos = new Array;

function agregarBoleto() {
    let boletos = document.getElementById('boletos-id')
    let boletoselec = document.getElementById('boletosdisp-id').value

    console.log(boletoselec);

    let a = `
    <tr id="${boletoselec}">
    <td>
        Boleto
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text col-10">${boletoselec}</span>
            </div>
        </div>
    </td>
    <td class="col-1">
        <button type="button" onclick="Borrarboleto('${boletoselec}')" class="btn btn-danger">Borrar</button>
    </td>
    </tr>
    `
    boletos.insertAdjacentHTML("beforeend",a)

    let boletovalor = document.querySelectorAll(`option[value="${boletoselec}"]`);
    console.log(boletovalor);
    boletovalor[0].disabled = true

    document.getElementById('boletosdisp-id').value='Escoge...'

    ArregloBoletos.push(boletoselec)
    console.log(ArregloBoletos);
}

function Borrarboleto(boleto) {
    console.log(boleto)
    let idboleto = document.getElementById(boleto)  

    var search_term = boleto;

    for (var i=ArregloBoletos.length-1; i>=0; i--) {
        if (ArregloBoletos[i] === search_term) {
            ArregloBoletos.splice(i, 1);
        }
    }

    let boletodesbloquear = document.querySelectorAll(`option[value="${boleto}"]`);
    boletodesbloquear[0].disabled = false

    console.log(ArregloBoletos);

    idboleto.remove()
}

document.addEventListener('DOMContentLoaded', async ()=> {

    let resp = await fetch('https://json.extendsclass.com/bin/89f13b30b47e', {
        method: 'GET'
    });
    
    let asientos = await resp.json()
    console.log(asientos);
    
    if(destino == 'Cancun'){
        tablaAsientosdisp.innerHTML = asientos.asientoscancun
    }
    else if(destino == 'PuertoVallarta'){
        tablaAsientosdisp.innerHTML = asientos.asientospuerto
    }
    else {
        tablaAsientosdisp.innerHTML = asientos.asientosleon
    }

});

document.addEventListener('DOMContentLoaded', async ()=> {

    let resp = await fetch('https://json.extendsclass.com/bin/756a0d5acfc0', {
        method: 'GET'
    });

    let asientos = await resp.json()
    console.log(asientos);

    if(destino == 'Cancun'){                // Quitar atributo de disable si no existe en el arreglo de json de asientos
        let disp = asientos.Cancun
        for (let index = 0; index < disp.length; index++) {
            let asiento = document.querySelectorAll('option[value="'+ disp[index] +'"')
            // console.log(asiento[0].value);
            asiento[0].removeAttribute('disabled')
        }
    }
    else if(destino == 'PuertoVallarta'){
        let disp = asientos.Puerto
        for (let index = 0; index < disp.length; index++) {
            let asiento = document.querySelectorAll('option[value="'+ disp[index] +'"')
            // console.log(asiento[0].value);
            asiento[0].removeAttribute('disabled')
        }
    }
    else if(destino == 'Leon'){
        let disp = asientos.Leon //Cambiar a Leon cuando se suba a la página
        for (let index = 0; index < disp.length; index++) {
            let asiento = document.querySelectorAll('option[value="'+ disp[index] +'"')
            // console.log(asiento[0].value);
            asiento[0].removeAttribute('disabled')
        }
    }

})

let nuevosValores = valores
let pagarButton = document.getElementById('pagar-id')

function totalBoletos() {
    
    console.log(nuevosValores);
    console.log(ArregloBoletos.length);

    if (ArregloBoletos.length != 0) {
        nuevosValores = nuevosValores +'&Boletos='+ ArregloBoletos.toString()
        pagarButton.href = '../confpago/index.html'+nuevosValores
        console.log(pagarButton);
    }
    else {
        $('#exampleModal3').modal('show');
    }

}