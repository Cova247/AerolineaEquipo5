
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
    let fila = document.getElementById('fila-id').value, asiento = document.getElementById('asiento-id').value
    contador = contador + 1

if 
    let a = `
    <tr id="boleto${contador}">
    <td>
        Boleto
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text col-10">${fila}</span>
              <span class="input-group-text col-10">${asiento}</span>
            </div>
        </div>
    </td>
    <td class="col-1">
        <button type="button" onclick="Borrarboleto(contador)" class="btn btn-danger">Borrar</button>
    </td>
    </tr>
    `
    boletos.insertAdjacentHTML("beforeend",a)

    ArregloBoletos.push([fila, asiento])

}

function Borrarboleto(contador) {
    let idboleto = document.getElementById("boleto"+contador)
    idboleto.remove()
}

let nuevosValores = valores
let pagarButton = document.getElementById('pagar-id')

function totalBoletos() {
    for (let index = 0; index < ArregloBoletos.length; index++) {
        nuevosValores = nuevosValores+'&Boleto'+index+'='+ArregloBoletos[index]
    }
    
    console.log(nuevosValores);

    pagarButton.href = '../confpago/index.html'+nuevosValores
    console.log(pagarButton);
}



