"use strict";

var linksList = document.querySelector("#links");
var linksUI = function linksUI(link) {
  var div = document.createElement("div");
  div.className = 'col-md-3 mb-3 mt-3';
  div.innerHTML = "\n        <div class=\"card text-center\">\n        <div class=\"card-body\">\n            <a href=\"".concat(link.url, "\" target=\"_blank\">\n                <h3 class=\"card-title text-uppercase\">\n                    ").concat(link.title, "\n                </h3>\n            </a>\n            <p class=\"m-s text-dark\">\n                ").concat(link.description, "\n            </p>\n            <p class=\"form-control text-muted\">Creado por ").concat(link.fullname, ", ").concat(data(link.created_at), "</p>\n        </div>\n    </div>\n");
  return div;
};
socket.on("nuevoComunidad", function (link) {
  linksList.innerHTML = "";
  linksList.append(linksUI(link));
});

/* formato de tiempo */
function data(tdate) {
  var system_date = new Date(Date.parse(tdate));
  var user_date = new Date();
  var tim = system_date;
  if (K.ie) {
    system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'));
  }
  var diff = Math.floor((user_date - system_date) / 1000);
  if (diff <= 1) {
    return "justo ahora";
  }
  if (diff < 20) {
    return "hace " + diff + " segundos";
  }
  if (diff < 40) {
    return "hace medio minuto";
  }
  if (diff < 60) {
    return "hace menos de 1 minuto";
  }
  if (diff <= 90) {
    return "hace 1 minuto";
  }
  if (diff <= 3540) {
    return "hace " + Math.round(diff / 60) + " minutos";
  }
  if (diff <= 5400) {
    return "hace 1 hora";
  }
  if (diff <= 86400) {
    return "hace " + Math.round(diff / 3600) + " horas";
  }
  if (diff <= 129600) {
    return "hace 1 día";
  }
  if (diff <= 172800) {
    return "hace " + Math.round(diff / 86400) + " días";
  }
  if (diff < 520000) {
    return formatDate(tim);
  }
  return "on " + system_date;
}
var K = function () {
  var a = navigator.userAgent;
  return {
    ie: a.match(/MSIE\s([^;]*)/)
  };
}();
function formatDate(input) {
  var a = input;
  a = new Date().toISOString().slice(0, 10);
  var datePart = a.match(/\d+/g),
    year = datePart[0].substring(2),
    month = datePart[1],
    day = datePart[2];
  return day + '/' + month + '/' + year;
}