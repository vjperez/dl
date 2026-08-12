hideThemSections();
/*
window.setTimeout(() => {
  showThemSections();
}, 3000);
*/
if(logueado){
  const parafos = document.querySelectorAll('p.sacasilogueado');
  parafos.forEach((parafo) => {
    parafo.style.display = 'none'; 
  }); 
}
