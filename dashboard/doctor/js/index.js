var patID = "";

(function ($) {
  "use strict";

  // var user = sessionStorage.getItem("user");
  // var token = sessionStorage.getItem("token");
  // let formData = {
  //   user: user,
  //   token: token,
  // };

  $.ajax({
    type: "GET",
    url: "http://localhost:8012/healthapp/dashboard/doctor/data.php",
    // data: formData,
    crossDomain: true,
    dataType: "json",
    encode: true,
  })
    .done(function (data) {
      patID = data.patient[0]._id;
      $(".name").text(data.patient[0].Name);
      $(".age").text(data.patient[0].Age);
      $(".dob").text(data.patient[0].DOB);
      $(".add").text(data.patient[0].Address);
      $(".chills").text(data.patient[0].Chills);
      $(".dbp").text(data.patient[0].DBP);
      $(".sbp").text(data.patient[0].SBP);
      $(".heartrate").text(data.patient[0].HeartRate);
      $(".respiration").text(data.patient[0].RR);
      $(".spo2").text(data.patient[0].SpO2);
      $(".bloodg").text(data.patient[0].BGroup);
      $(".temp").text(data.patient[0].Temp);
      $(".ambulation").text(data.patient[0].Ambulation);
      $(".fever").text(data.patient[0].HistoryFever);
      $(".bmi").text(data.patient[0].BMI);
      $(".fio2").text(data.patient[0].FiO2);
    })
    .fail(function (data) {
      console.log("failed to get patient data TO DISPLAY");
      // window.location.href = "../../login/";
    });

  $(".log_out").click(function () {
    sessionStorage.removeItem("uid");
    location.href = "../../login/";
  });
})(jQuery);
