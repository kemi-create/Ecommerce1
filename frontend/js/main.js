
$( document ).ready(function() {
    console.log( "ready!" );
	$.ajax({
		type: "GET",
		url: "http://192.168.107.47:8080/api/products",
		success: function(data) {
			console.log("dddd", data);
		}
	});
});

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
      url: "http://192.168.107.47:8080/api/users/signin",
      data: {
        user_mail: user_mail,
        password: password,
      },
      success: function(data) {
        console.log("dddd", data);
        Pages.Popup.closePopup();
      }
    });
  }
});

// login end

// register start

$("#btnRegisterOk").click(function() {
	let realname = $(".real_name").val();
	let sex = $(".sex").val();
	let birthday = $(".birthday").val();
	let phonenumber = $(".phone_number").val();
	let mail = $(".mail").val();
	let password = $(".re_pass").val();
	let confirm = $(".confirm").val();
	if (password == confirm) {
		if (realname!=""||sex!=""||birthday!=""||phonenumber!=""||mail!=""||password!="") {
			$.ajax({
				type: "POST",
				url: "http://192.168.107.47:8080/api/users/signup",
				data: {
					realname: realname,
					sex: sex,
					birthday: birthday,
					phonenumber: phonenumber,
					mail: mail,
					password: password,
				},
				success: function(data) {
					alert("success");
					Pages.Popup.closePopup();
				}
			});
		} else{
			alert("input correctly");
		}
	} else {
		alert("reinput password and confirm");
	}
});

// register end









