
let valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let origen = urlParams.get('origen');
let destino = urlParams.get('destino')
let fecha = urlParams.get('fecha')
let hora = urlParams.get('hora')

console.log(origen, destino, fecha, hora);

let tablaOrigen = document.getElementById('origen')
let tablaDestino = document.getElementById('destino')
let tablaFecha = document.getElementById('fecha')
let tablaHora = document.getElementById('hora')

tablaOrigen.innerHTML = origen
tablaDestino.innerHTML = destino
tablaHora.innerHTML = hora
tablaFecha.innerHTML = fecha

console.log(valores);

let ArregloBoletos = new Array;

function agregarBoleto() {
    let boletos = document.getElementById('boletos-id')
    let fila = document.getElementById('fila-id').value, asiento = document.getElementById('asiento-id').value

    let a = `
    <tr>
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
        <button type="button" class="btn btn-danger">Eliminar</button>
    </td>
    </tr>
    `
    boletos.insertAdjacentHTML("beforeend",a)

    ArregloBoletos.push([fila, asiento])

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



