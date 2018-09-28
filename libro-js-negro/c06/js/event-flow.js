function showElement() {
  alert(this.innerHTML);
}

el = document.getElementById("list1");   // <<< el is reused and not defined
el.addEventListener('click', showElement, false);

el = document.getElementById("item1");
el.addEventListener('click', showElement, false);

el = document.getElementById("link1");
el.addEventListener('click', showElement, false);





el = document.getElementById("list2");
el.addEventListener('click', showElement, true);

el = document.getElementById("item2");
el.addEventListener('click', showElement, true);

el = document.getElementById("link2");
el.addEventListener('click', showElement, true);