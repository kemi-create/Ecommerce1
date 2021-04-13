$(document).ready(function () {
  var userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    var base64Url = userData.token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    $(".home_header").addClass("dn");
    $(".user_header").addClass("df");
    $(".home_header").removeClass("df");
    $(".user_header").removeClass("dn");
    $(".title").html(
      "<div class='dr'><label>Welcome</label><div class='w_realname'>" +
        JSON.parse(jsonPayload).realname +
        "</div></div>"
    );
    $.ajax({
	    type: "GET",
	    url: "http://192.168.107.47:8080/api/products",
	    headers: { authorization: userData ? userData.token : null },
	    success: function (data) {
	      for (var i = 0; i < data.products.length; i++) {
	        // console.log("dddd", data.products[i]);
	        console.log(data.products[i].favourite);
		        $(".user_product").append(
		          "<div class='item'>" +
		            "<div class='book_cover'><img src='" +
		            data.products[i].image +
		            "'></div>" +
		            "<div class='item_title t4 dr jc'>" +
		            data.products[i].title +
		            "</div>" +
		            "<div class='charge_favorite dr jsb'>" +
		            "<div class='charge'>" +
		            data.products[i].items +
		            "</div>" +
		            "<div class='favorite'><i class='fa fa-heart  "+data.products[i].favourite+" '></i></div>" +
		            "</div>" +
		            "</div>"
		        );
	        }
	    },
	});
  } else {
    $(".home_header").addClass("df");
    $(".user_header").addClass("dn");
    $(".home_header").removeClass("dn");
    $(".user_header").removeClass("df");
    $.ajax({
	    type: "GET",
	    url: "http://192.168.107.47:8080/api/products",
	    headers: { authorization: userData ? userData.token : null },
	    success: function (data) {
	      for (var i = 0; i < data.products.length; i++) {
	        // console.log("dddd", data.products[i]);
	        console.log(data.products[i].favorite);
		        $(".home_product").append(
		          "<div class='item'>" +
		            "<div class='book_cover'><img src='" +
		            data.products[i].image +
		            "'></div>" +
		            "<div class='item_title t4 dr jc'>" +
		            data.products[i].title +
		            "</div>" +
		            "<div class='charge_favorite dr jsb'>" +
		            "<div class='charge'>" +
		            data.products[i].items +
		            "</div>" +
		            "<div class='favorite'><i class='fa fa-heart'></i></div>" +
		            "</div>" +
		            "</div>"
		        );
	        }
	    },
	});
  }

  

  // user_icon start
  let flag = true;
  $(".user").click(function () {
    // alert(flag);
    flag = !flag;
    if (flag == true) {
      $(".menu").hide();
      $(".menu_without_section").hide();
    }
    if (flag == false) {
      $(".menu").show();
      $(".menu_without_section").show();
    }
  });

  $(".menu_without_section").click(function () {
    flag = !flag;
    $(".menu").hide();
    $(".menu_without_section").hide();
  });

  $(".menu").focusin(function () {
    // $(this).hide();	
  });
  // user_icon end

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
        success: function (data) {
          if (data.errors) {
            alert("This user is not registered.");
            $(".home_header").addClass("df");
            $(".user_header").addClass("dn");
            $(".home_header").removeClass("dn");
            $(".user_header").removeClass("df");
            $(".user_mail").val("");
            $(".password").val("");
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            JSON.parse(localStorage.getItem("user"));
            var token = JSON.parse(localStorage.getItem("user")).token ?? "";
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );
            $(".title").html(
              "<div class='dr'><label>Welcome</label><div class='w_realname'>" +
                JSON.parse(jsonPayload).realname +
                "</div></div>"
            );
            $(".home_header").addClass("dn");
            $(".user_header").addClass("df");
            $(".home_header").removeClass("df");
            $(".user_header").removeClass("dn");
            Pages.Popup.closePopup();
			location.reload(true);
          }
        },
      });
    }
  });
  // login end

  // register start
  $("#btnRegisterOk").click(function () {
    let realname = $(".real_name").val();
    let sex = $(".sex").val();
    let birthday = $(".birthday").val();
    let phonenumber = $(".phone_number").val();
    let mail = $(".mail").val();
    let password = $(".re_pass").val();
    let confirm = $(".confirm").val();
    if (password == confirm) {
      if (
        realname != "" &&
        sex != "" &&
        birthday != "" &&
        birthday != "mm/dd/yyyy" &&
        phonenumber != "" &&
        mail != "" &&
        password != "" &&
        confirm != ""
      ) {
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
          success: function (data) {
            if (data.error) {
              alert(data.error);
            } else if (data.success) {
              alert(data.success);
              Pages.Popup.closePopup();
            }
          },
        });
      } else {
        alert("input correctly");
      }
    } else {
      alert("reinput password and confirm");
      let password = $(".re_pass").val("");
      let confirm = $(".confirm").val("");
    }
  });
  // register end

  // sign out start

  $("#signOut").click(function () {
    localStorage.removeItem("user");
    location.reload(true);
  });

  // sign out end

	// profile start

	$("#listProfile").click(function() {
		flag = !flag;
		$(".menu_without_section").hide();
		$(".menu").hide();
		let userinfo = JSON.parse(jsonPayload);
		console.log(userinfo.realname);
		$(".popup-profile").append(
			+"<h2>PROFILE</h2>"
			+"<p>Real Name</p>"
			+"<input class='real_name' type='text' name="" placeholder='username or mail'>"
			// +"<label>wrong</label>"
			// +"<p>Sex</p>"
			// +"<div>"
			// +"	<select class="sex">"
			// +"		<option value="1">Man</option>"
			// +"		<option value="0">Woman</option>"
			// +"	</select>"
			// +"	<label>wrong</label>"
			// +"</div>"
			// +"<p>Birthday</p>"
			// +"<input class="birthday" type="date" name="" placeholder="username or mail">"
			// +"<label>wrong</label>"
			// +"<p>Phone Number</p>"
			// +"<input class="phone_number" type="text" name="" placeholder="username or mail">"
			// +"<label>wrong</label>"
			// +"<p>Mail</p>"
			// +"<input class="mail" type="text" name="" placeholder="username or mail">"
			// +"<label>wrong</label>"
			// +"<p>Password</p>"
			// +"<input class="re_pass" type="password" name="" placeholder="password">"
			// +"<label>wrong</label>"
			// +"<p>Confirm</p>"
			// +"<input class="confirm" type="password" name="" placeholder="confirm">"
			// +"<label>wrong</label>"
			// +"<div class="register_btns dr jc t4">"
			// +"	<div id="btnRegisterOk" class="btn_ok register_ok"><a href="#">register</a></div>"
			// +"	<div class="btn_cancel register_cancel"><a href="#" onclick="Pages.Popup.closePopup();">cancel</a></div>"
			// +"</div>"
		);
		
	});

	// profile end

});


