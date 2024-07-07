console.log('funcionesMenu-HidableSectionsToggle.js   [loading...]');

//menu behavior
const driver = document.querySelector('.menuHidableDriver');
driver.addEventListener('click', showOrHideMenu);
function showOrHideMenu(evento) {
  const target = document.querySelector('.menuHidableTarget');
  if(window.getComputedStyle( target ).display === 'none' ){
    showMenu();
  } else {
    hideMenu();
  }
}


function hideMenu() {
  document.querySelector('.menuHidableTarget').style.display = 'none';
  document.querySelector('.menuHidableDriver i.fa-window-close').style.display = 'none';
  document.querySelector('.menuHidableDriver i.fa-bars').style.display = 'block';
}


function showMenu() {
  document.querySelector('.menuHidableTarget').style.display = 'block';
  document.querySelector('.menuHidableDriver i.fa-bars').style.display = 'none';
  document.querySelector('.menuHidableDriver i.fa-window-close').style.display = 'block';
}


function hideThemSections() {
  let els = document.querySelectorAll('.notHidable');
  els.forEach(
    function(el){
      const hidableSibling = el.nextElementSibling;
      if(hidableSibling.classList.contains('hidable')) hidableSibling.style.display = 'none'; 
    }
  );
  els = document.querySelectorAll('.notHidable .fa-chevron-circle-up');
  els.forEach(
    function(el){
      el.style.display = 'none'; 
    }
  );
  els = document.querySelectorAll('.notHidable .fa-chevron-circle-down');
  els.forEach(
    function(el){
      el.style.display = ''; 
    }
  );
}


function showThemSections() {
  let els = document.querySelectorAll('.notHidable');
  els.forEach(
    function(el){
      const hidableSibling = el.nextElementSibling;
      if(hidableSibling.classList.contains('hidable')) hidableSibling.style.display = 'block';
    }
  );
  els = document.querySelectorAll('.notHidable .fa-chevron-circle-up');
  els.forEach(
    function(el){
      el.style.display = ''; 
    }
  );
  els = document.querySelectorAll('.notHidable .fa-chevron-circle-down');
  els.forEach(
    function(el){
      el.style.display = 'none'; 
    }
  );
}


//#containerForMain is the currentTarget, used with event delegation
//and evento.target on two diferent class of elements;
//one of class notHidable or i's of class fa-solid
const mainContainer = document.querySelector('#containerForMain');
mainContainer.addEventListener('click', showOrHideSection);
function showOrHideSection(evento){
  const clickedEl = evento.target;
  if(clickedEl.classList.contains('notHidable')){
    //console.log(clickedEl);
    const hidable = clickedEl.nextElementSibling;
    const iElUp = clickedEl.firstElementChild;
    const iElDown = iElUp.nextElementSibling;
    if(hidable.classList.contains('hidable')){
      if(window.getComputedStyle(hidable).display === 'none'){
        hidable.style.display = '';
        iElUp.style.display = '';
        iElDown.style.display = 'none';
      }else{
        hidable.style.display = 'none';
        iElUp.style.display = 'none';
        iElDown.style.display = '';
      }
    }
  }else if(clickedEl.classList.contains('fa-solid')){
    //console.log(clickedEl);
    const notHidableParent = clickedEl.parentElement;
    const hidable = notHidableParent.nextElementSibling;
    const iElUp = notHidableParent.firstElementChild;
    const iElDown = iElUp.nextElementSibling;
    if(hidable.classList.contains('hidable')){
      if(window.getComputedStyle(hidable).display === 'none'){
        hidable.style.display = '';
        iElUp.style.display = '';
        iElDown.style.display = 'none';
      }else{
        hidable.style.display = 'none';
        iElUp.style.display = 'none';
        iElDown.style.display = '';
      }
    }
  }
}