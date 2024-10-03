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
  let els = document.querySelectorAll('.hidable');
  els.forEach(
    function(el){
      //when selecting .notHidable... was doing these
      //const hidableSibling = el.nextElementSibling;
      //if(hidableSibling.classList.contains('hidable')) hidableSibling.style.display = 'none';
      el.style.display = 'none';  
    }
  );
  els = document.querySelectorAll('.fa-chevron-circle-up');
  els.forEach(
    function(el){
      el.style.display = 'none'; 
    }
  );
  els = document.querySelectorAll('.fa-chevron-circle-down');
  els.forEach(
    function(el){
      el.style.display = ''; 
    }
  );
}


function showThemSections() {
  let els = document.querySelectorAll('.hidable');
  els.forEach(
    function(el){
      //when selecting .notHidable... was doing these
      //const hidableSibling = el.nextElementSibling;
      //if(hidableSibling.classList.contains('hidable')) hidableSibling.style.display = 'block';
      el.style.display = '';
    }
  );
  els = document.querySelectorAll('.fa-chevron-circle-up');
  els.forEach(
    function(el){
      el.style.display = ''; 
    }
  );
  els = document.querySelectorAll('.fa-chevron-circle-down');
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
    const iElUp = clickedEl.firstElementChild;
    const iElDown = iElUp.nextElementSibling;
    
    let hidable = clickedEl.nextElementSibling;
    //assumes on html, every .notHidable has one .hidable sibbling    
    while( ! hidable.classList.contains('hidable') ){
      hidable = hidable.nextElementSibling;
    }
    if(window.getComputedStyle(hidable).display === 'none'){
      hidable.style.display = '';
      iElUp.style.display = '';
      iElDown.style.display = 'none';
    }else{
      hidable.style.display = 'none';
      iElUp.style.display = 'none';
      iElDown.style.display = '';
    }
  }else if(clickedEl.classList.contains('fa-chevron-circle-down') || clickedEl.classList.contains('fa-chevron-circle-up')){
    //console.log(clickedEl);
    const notHidableParent = clickedEl.parentElement;
    const iElUp = notHidableParent.firstElementChild;
    const iElDown = iElUp.nextElementSibling;

    let hidable = notHidableParent.nextElementSibling;
    //assumes on html, every .notHidable has one .hidable sibbling    
    while( ! hidable.classList.contains('hidable') ){
      hidable = hidable.nextElementSibling;
    }  
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