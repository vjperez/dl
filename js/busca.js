const forma = document.querySelector('form#queDondeForm');
forma.addEventListener('submit', handleSubmit);

function handleSubmit(evento) {
  evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
  let regexp = new RegExp(/[^a-z0-9ñäàáëèéïìíöòóüùú@._+-\s]/gi);
  //see 'negated or complemented character class';
  //basically what characters are not letters, numbers or these symbols

  let que = document.querySelector('#queId').value;
  que = minimizeStr(que, regexp);
  let donde = document.querySelector('#dondeId').value;
  donde = minimizeStr(donde, regexp);
  //alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
  if (que.length > 0 || donde.length > 0) {
    //i'm looking for a non empty cleaned str
    window.location.href =
      window.location.pathname + '?look=opciones&que=' + encodeURIComponent(que) + '&donde=' + encodeURIComponent(donde);
  } else {//both are empty
    let feedbackStr = 'Buscas algo?';
    feedback('form#queDondeForm  h3.feedback', feedbackStr, 'feedbackwarn', 'downdelayup');
  }
}
