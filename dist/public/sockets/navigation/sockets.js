"use strict";

var newLink = document.querySelector("#newLink");
var newLinkBtn = document.querySelector("#newLinkBtn");
var newLinkFt = document.querySelector("#newLinkFt");
socket.on("nuevoComunidad", function () {
  try {
    newLink.innerHTML = "\n            Links de la Comunidad\n            <span class=\"position-absolute p-1 bg-danger rounded-circle animate__animated animate__headShake\">\n                <span class=\"visually-hidden\">New alerts</span>\n            </span>\n        ";
  } catch (error) {
    var a = 0;
  }
  try {
    newLinkBtn.innerHTML = "\n            <span class=\"navbar-toggler-icon\"></span>\n            <span class=\"position-absolute p-1 bg-danger rounded-circle animate__animated animate__headShake\">\n                <span class=\"visually-hidden\">New alerts</span>\n            </span>\n        ";
  } catch (error) {
    var _a = 0;
  }
  try {
    newLinkFt.innerHTML = "\n            <img src=\"/img/amigos.png\" alt=\"\" width=\"25\" height=\"25\">\n            <span class=\"position-absolute p-1 bg-danger rounded-circle animate__animated animate__headShake\">\n                <span class=\"visually-hidden\">New alerts</span>\n            </span>\n        ";
  } catch (error) {
    var _a2 = 0;
  }
});