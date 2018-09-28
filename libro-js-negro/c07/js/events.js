jQuery(
	function() {
	//var ids = '';
	var $listItems = jQuery('li');

	$listItems.on('click', function() {
		var ids = this.id;
		$listItems.children('span').remove();
		$(this).append(' <span class="order">' + ids + '</span>');
	});
	
	
/*	
	$listItems.on('mouseover', function() {
		ids = this.id;
		$listItems.children('span').remove();
		$(this).append(' <span class="order">' + ids + '</span>');
	});
*/	
 

	$listItems.on('mouseout', function() {
		$(this).children('span').remove();
	});

	}
);