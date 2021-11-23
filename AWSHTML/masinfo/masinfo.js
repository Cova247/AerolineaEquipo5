let valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let origen = urlParams.get('origen');
let destino = urlParams.get('destino')
let fecha = urlParams.get('fecha')
let hora = urlParams.get('hora')
let costo = urlParams.get('costo')
let asientosdisp = urlParams.get('asientosdisp')

console.log(origen, destino, fecha, hora, costo, asientosdisp);

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
tablaAsientosdisp.innerHTML = asientosdisp

console.log(valores);

let contador = 0
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

let nuevosValores = valores
let pagarButton = document.getElementById('pagar-id')

function totalBoletos() {
    // for (let index = 0; index < ArregloBoletos.length; index++) {
    //     nuevosValores = nuevosValores+'&Boleto'+index+'='+ArregloBoletos[index]
    // }
    
    nuevosValores = nuevosValores +'&Boletos='+ ArregloBoletos.toString()
    console.log(nuevosValores);

    pagarButton.href = '../confpago/index.html'+nuevosValores
    console.log(pagarButton);
}