let flag = true;

$(".user").click(function() {
	// alert(flag);
	flag = !flag;
	if ( flag == true ) {
		$(".menu").hide();
		$(".menu_without_section").hide();
	} 
	if ( flag == false ) {
		$(".menu").show();
		$(".menu_without_section").show();
	}
});

$(".menu_without_section").click(function() {
	flag = !flag;
	$(".menu").hide();
	$(".menu_without_section").hide();
});

$(".menu").focusin(function(){
	$(this).hide();
	alert("admin");
});

// $(document).click(function(event) {
//   var $target = $(event.target);
//   if( !$target.closest('.menu').length || $('.menu').is(":visible") ) {
//     $('.menu').hide();
//   }
// });