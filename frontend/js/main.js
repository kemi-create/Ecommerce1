
$( document ).ready(function() {

	var userData = JSON.parse(localStorage.getItem("user"));
	if(userData) {
		var base64Url = userData.token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		$(".home_header").addClass("dn");
		$(".user_header").addClass("df");
		$(".home_header").removeClass("df");
		$(".user_header").removeClass("dn");
		// console.log(JSON.parse(jsonPayload));
	} else {
		$(".home_header").addClass("df");
		$(".user_header").addClass("dn");
		$(".home_header").removeClass("dn");
		$(".user_header").removeClass("df");
	}

    console.log( "ready!" );
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/products",
		success: function(data) {
			console.log("dddd", data);
			// localStorage.setItem("user", JSON.stringify(data));
		}
	});

	// user_icon start
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
	// user_icon end

	// login/register modal
	$("#btnLogin").click(function() {
		$(".popup-login").addClass("z1000");
		$(".popup-register").removeClass("z1000");
	});

	$("#btnRegister").click(function() {
		$(".popup-login").removeClass("z1000");
		$(".popup-register").addClass("z1000");
	});
	// login/register modal

	// login start
	$("#btnOk").click(function () {
	  let user_mail = $(".user_mail").val();
	  let password = $(".password").val();
	  if (password) {
	    $.ajax({
	      type: "POST",
	      url: "http://localhost:8080/api/users/signin",
	      data: {
	        user_mail: user_mail,
	        password: password,
	      },
	      success: function(data) {
	      	// console.log(data.errors);
	      	if (data.errors) {
	      		alert("This user is not registered.")
	      		$(".home_header").addClass("df");
				$(".user_header").addClass("dn");
				$(".home_header").removeClass("dn");
				$(".user_header").removeClass("df");
				$(".user_mail").val("");
				$(".password").val("");
	      	} else {
	        	localStorage.setItem("user", JSON.stringify(data));

        		JSON.parse(localStorage.getItem("user"));
				// console.log(JSON.parse(localStorage.getItem("user")).token);
				var token = JSON.parse(localStorage.getItem("user")).token ?? "";
				var base64Url = token.split('.')[1];
				var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
				var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
				    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				}).join(''));
				// return JSON.parse(jsonPayload);
				console.log(JSON.parse(jsonPayload));
				$(".home_header").addClass("dn");
				$(".user_header").addClass("df");
				$(".home_header").removeClass("df");
				$(".user_header").removeClass("dn");;
		        Pages.Popup.closePopup();
	      	}
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
			if (realname!=""&&sex!=""&&birthday!=""&&birthday!="mm/dd/yyyy"&&phonenumber!=""&&mail!=""&&password!=""&&confirm!="") {
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
						alert(data);
						Pages.Popup.closePopup();
					}
				});
			} else{
				alert("input correctly");
			}
			// console.log(realname, sex, birthday, phonenumber, mail, password,);
		} else {
			alert("reinput password and confirm");
			let password = $(".re_pass").val("");
			let confirm = $(".confirm").val("");
		}
	});
	// register end

});









