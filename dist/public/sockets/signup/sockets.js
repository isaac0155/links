"use strict";

var input = document.getElementById('user');
var btn = document.querySelector('#btn');
var invalid = document.querySelector('#invalid');
input.addEventListener('input', function () {
  var value = input.value;
  if (value.length > 4) {
    socket.emit('cliente:verifUser', value);
  } else {
    invalid.innerHTML = "Escoge un usuario de 5 o más caracteres.";
    input.className = 'form-control is-invalid';
    btn.disabled = true;
  }
});
socket.on('server:usuarioUsado', function () {
  invalid.innerHTML = "Este Usuario ya EXISTE, usa otro.";
  input.className = 'form-control is-invalid';
  btn.disabled = true;
});
socket.on('server:usuarioLibre', function () {
  input.className = 'form-control is-valid';
  btn.disabled = false;
});