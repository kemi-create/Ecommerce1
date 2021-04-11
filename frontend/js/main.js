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

// login/register modal
$("#btnLogin").click(function() {
	$(".popup-login").removeClass("z1000");
	$(".popup-register").removeClass("z2000");
	$(".popup-login").addClass("z2000");
	$(".popup-register").addClass("z1000");
});

$("#btnRegister").click(function() {
	$(".popup-login").removeClass("z2000");
	$(".popup-register").removeClass("z1000");
	$(".popup-login").addClass("z1000");
	$(".popup-register").addClass("z2000");
});
// login/register modal

// login start

$("#btnOk").click(function () {
  let user_mail = $(".user_mail").val();
  let password = $(".password").val();

  if (password) {
    $.ajax({
      type: "POST",
      url: "http://192.168.107.164:8080/api/users/signin",
      data: {
        user_mail: user_mail,
        password: password,
      },
      success: function(data) {
        console.log("dddd", data);
      }
    });
  }
});

// login end