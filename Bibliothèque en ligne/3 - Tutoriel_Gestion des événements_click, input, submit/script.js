let bouton = document.getElementById("btn-test");
let champNom = document.querySelector("#nom");
let formulaire = document.getElementById("form-test");
bouton.addEventListener("click", function () {
  console.log(" Bouton cliqué !");
});

champNom.addEventListener("input", function () {
  console.log(" Texte saisi : " + champNom.value);
});
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(" Formulaire soumis avec le nom : " + champNom.value);
});
