$('li[id!="two"]').hide().delay(1500).fadeIn(1400); // semi-colon indicates end of chaining - can be writen on separate lines
$('li:first-child').addClass('next');
$('li.priority').addClass('highlight');