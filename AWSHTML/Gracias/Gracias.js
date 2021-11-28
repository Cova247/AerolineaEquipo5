let valores = window.location.search;
const urlParams = new URLSearchParams(valores);

let correo = urlParams.get('Email')

let correoNode = document.getElementById('correofinal')

// console.log(correoNode);

correoNode.innerHTML = correo