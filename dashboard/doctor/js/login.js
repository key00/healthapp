(function ($) {
  "use strict";

  var user = sessionStorage.user; //getItem('user');
  var token = sessionStorage.token; //getItem('token');
  let formData = {
    user: user,
    token: token,
  };
  console.log(formData);

  $.ajax({
    type: "GET",
    url: "http://localhost:8012/healthapp/dashboard/doctor/data.php",
    data: formData,
    crossDomain: true,
    dataType: "json",
    encode: true,
  })
    .done(function (data) {
      if (data.message == "Token does not match. Try to Login Again.") {
        console.log("token mismatch");
        window.location.href = "../../login/";
      }
      console.log("LOGIN PROCESS SUCCESSFUL");
      $(".doctorname").text(data.doctor[0].Name);
      $(".specialty").text(data.doctor[0].Specialty);
    })
    .fail(function (data) {
      console.log("LOGIN PROCESS FAILED");
      window.location.href = "../../login/";
    });
})(jQuery);
