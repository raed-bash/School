let ImgS = document.getElementById("ImgS");
let moodImg = "noadd";
document.getElementById("StudentsImgS").addEventListener("change", function () {
  let file = document.getElementById("StudentsImgS").files[0];

  let reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      ImgS.style.display = "inline";
      document.getElementById("ContantImg1").style.display = "flex";
      ImgS.src = reader.result;
      document.getElementById("pictureS").style.display = "none";
      moodImg = "add";
      document.getElementById("status").value = "true";
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
});

function DisplayBtnDeleteS(ManyRow) {
  $("#contantBtnDeleteS").html(
    `<button class='DeleteS' onclick='ShowDeleteConfirmationS()' id='DeleteAllDataS' >حذف الكل (${ManyRow})</button>`
  );
}

function DisplayDataS() {
  $.ajax({
    url: "./FilesPageStudents/php/pageStudentsDisplay.php",
    type: "POST",
    success: function (result) {
      result = JSON.parse(result);
      let table = "";
      let selct = "";
      if (result.length) {
        $.each(result, function (key, value) {
          table += `<tr>
                    <td>${value.id}</td>
                    <td>${value.name}</td> 
                    <td>${
                      value.year + "-" + value.month + "-" + value.day
                    }</td>   
                    <td>${value.address}</td>   
                    <td><img src='${value.image}' id='imgPop' img-id='${
            value.id
          }'></td>
                    <td>${value.Grade}</td>  
                    <td><button id='GetEditS' class='GetEdit' data-id='${
                      value.id
                    }'>تعديل</button>
                    <button id='DeleteStudents' class='DeleteS' name-img='${
                      value.image
                    }' data-id='${value.id}'>حذف</button></td> 
                    </tr> `;
          selct += `<option value='${value.name}'>`;
        });
        DisplayBtnDeleteS(result.length);
      } else {
        DeleteAllDataS(result.length);
      }
      $("#StudentsOutput").html(table);
      $("#StudentsNameM2").html(selct);
    },
  });
}
let moodS = "create";
function AddDataS() {
  let name_S_id = $("#StudentsNameS");
  let year_S_id = $("#yearS");
  let month_S_id = $("#monthS");
  let day_S_id = $("#dayS");
  let Address_S_id = $("#StudentsAddressS");
  let image_S_id = $("#StudentsImgS");
  let = StudentsGrade_S_id = $("#StudentsGradeS2");

  let dfhas = "";

  let para = $("#para");

  function dafaultColorSelect(v) {
    v.css("border", "none");
  }
  year_S_id.click(function () {
    dafaultColorSelect(year_S_id);
  });
  month_S_id.click(function () {
    dafaultColorSelect(month_S_id);
  });
  day_S_id.click(function () {
    dafaultColorSelect(day_S_id);
  });
  StudentsGrade_S_id.click(function () {
    dafaultColorSelect(StudentsGrade_S_id);
  });
  function showwarning() {
    para.fadeOut();
  }
  $("#formS").on("submit", function (event) {
    event.preventDefault();
    para.css("color", "#f00");
    if (name_S_id.val() === "") {
      para.html("يرجى اضافة اسم الطالب");
      para.fadeIn();
      name_S_id.focus();
      setTimeout(showwarning, 1500);
      return;
    } else if (year_S_id.val() === null) {
      para.html("يرجى اضافة سنة الميلاد");
      para.fadeIn();
      year_S_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    } else if (month_S_id.val() === null) {
      para.html("يرجى اضافة الشهر");
      para.fadeIn();
      month_S_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    } else if (day_S_id.val() === null) {
      para.html("يرجى اضافة اليوم");
      para.fadeIn();
      day_S_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    } else if (moodImg === "noadd") {
      para.html("يرجى اضافة صورة الطالب");
      para.fadeIn();
      setTimeout(showwarning, 1500);
      return;
    } else if (StudentsGrade_S_id.val() === null) {
      para.html("يرجى اضافة الصف");
      para.fadeIn();
      StudentsGrade_S_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    }
    if (moodS === "create") {
      $.ajax({
        url: "./FilesPageStudents/php/pageStudentsAdd.php",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري الاضافة...");
        },
        success: function (result) {
          para.html(result);
          DisplayDataS();
          para.html(result);
          para.css("color", "#F00");
          dfhas = result;
          if (dfhas === "تمت اضافة الطالب") {
            para.css("color", "#5BB318");
          }
          para.css("fontWeight", "600");
          para.fadeIn();
          setTimeout(showwarning, 1500);
        },
      });
    } else if (moodS === "edit") {
      $.ajax({
        url: "./FilesPageStudents/php/PageStudentsEditData.php",
        type: "POST",
        data: new FormData(this),
        pathImg_S_N: $("#ImgS").attr("src"),
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري التعديل...");
        },
        success: function (result) {
          DisplayDataS();
          para.html(result);
          para.css("color", "#F00");
          dfhas = result;
          if (dfhas === "تم تعديل معلومات الطالب") {
            para.css("color", "#5BB318");
          }
          para.css("fontWeight", "600");
          para.fadeIn();
          moodS = "create";
          $("#StudentsCreate").text("إضافة");
          setTimeout(showwarning, 1500);
        },
      });
    }
    if (dfhas === "تمت اضافة الطالب" && dfhas === "تم تعديل معلومات الطالب") {
      name_S_id.val("");
      SelectDafault(SelctYS, SelctMS, SelctDS, StudentsGradeS2);
      image_S_id.val("");
      ImgS.src = "";
      Address_S_id.val("");
      moodImg = "noadd";
      name_S_id.focus();
      $("#pictureS").show();
    } else {
      image_S_id.focus();
    }
  });
}
function ShowDeleteConfirmationS() {
  $(document).ready(function () {
    $("#paraDelete").css("fontWeight", "600");
    $("#paraDelete").html(
      `هل أنت متأكد من حذف كل البيانات؟ <br><br>
      <div><button class='button2' onclick='cancel()' id='CancelDelete'>إلغاء</button>
      <button onclick='DeleteAllDataS(1)' class='DeleteS'>موافق</button></div>`
    );
    $("#paraDelete").css("color", "#f00");
    $("#paraDelete").show();
    $("#back").show();
  });
}
function DeleteAllDataS(ManyRow) {
  $(document).ready(function () {
    if (ManyRow > 0) {
      $.ajax({
        url: "./FilesPageStudents/php/PageStudentsDeleteAll.php",
        type: "post",
        success: function (result) {
          DisplayDataS();
          $("#paraDelete").hide();
          $("#back").hide();
        },
      });
    }
    $("#contantBtnDeleteS").html("");
  });
}
function DeleteDataS() {
  $(document).delegate("#DeleteStudents", "click", function () {
    let idData = $(this).attr("data-id");
    let NameImg = $(this).attr("name-img");

    $.ajax({
      url: "./FilesPageStudents/php/PageStudentsDelete.php",
      type: "post",
      data: { deletedata: idData, deleteImg: NameImg },
      success: function (result) {
        DeleteAllDataS(0);
        DisplayDataS();
      },
    });
  });
}

function GetToFormEditDataS() {
  $(document).delegate("#GetEditS", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageStudents/php/PageStudentsGetSearchDataToEdit.php",
      type: "POST",
      data: { GetIdData: idData },
      success: function (data) {
        $("#pictureS").hide();
        moodImg = "add";
        $("#status").val("false");
        let result = JSON.parse(data);
        $("#InputIdS").val(result.id);
        $("#StudentsNameS").val(result.name);
        $("#yearS").val(result.year);
        $("#monthS").val(result.month);
        $("#dayS").val(result.day);
        $("#StudentsAddressS").val(result.address);
        $("#ImgS").attr("src", result.image);
        $("#InputpathimgS").val(result.image);
        $("#StudentsGradeS2").val(result.Grade);
        $("#StudentsCreate").text("تعديل");
        moodS = "edit";
      },
    });
  });
}
let moodSearchS = "byName";
function getSearchMoodS(id) {
  $(document).ready(function () {
    let valueDate1 = $("#inptSearchS1");
    let valueDate2 = $("#inptSearchS2");
    if (id === "BtnSearchDateS" && moodSearchS === "byDate") {
      let BtnSearchNumbr = $("#" + id);
      if (
        valueDate1.val() < 1900 ||
        valueDate1.val() > d.getFullYear() - 5 ||
        valueDate2.val() < 1900 ||
        valueDate1.val() > valueDate2.val()
      ) {
        $("#para").html(
          "يرجى التحقق من التاريخ<br><br><div><button class='DeleteS' onclick='cancel()' id='CancelDelete'>موافق</button></div>"
        );
        $("#para").show();

        return;
      }
      $.ajax({
        url: "./FilesPageStudents/php/pageStudentsSearchByDate.php",
        type: "POST",
        data: {
          valueDate1_N: valueDate1.val(),
          valueDate2_N: valueDate2.val(),
        },
        beforeSend: function () {
          BtnSearchNumbr.attr("disabled", true).html("جاري البحث...");
        },
        success: function (result) {
          result = JSON.parse(result);
          let table = "";
          if (result.length) {
            $.each(result, function (key, resultSearch) {
              table += `<tr>
              <td>${resultSearch.id}</td>
              <td>${resultSearch.name}</td> 
              <td>${
                resultSearch.year +
                "-" +
                resultSearch.month +
                "-" +
                resultSearch.day
              }</td>   
              <td>${resultSearch.address}</td>   
              <td></td>
              <td>${resultSearch.Grade}</td>  
              <td><button id='GetEditS' class='GetEdit' data-id='${
                resultSearch.id
              }'>تعديل</button>
              <button id='DeleteStudents' class='DeleteS' data-id='${
                resultSearch.id
              }'>حذف</button></td> 
              </tr> `;
            });
            $("#para").html("تم العثور على نتائج البحث");
            $("#para").css("color", "#000");
            $("#para").fadeIn();
            setTimeout("$('#para').fadeOut()", 1500);
            BtnSearchNumbr.attr("disabled", false).html("ابحث");
          } else {
            BtnSearchNumbr.attr("disabled", false).html("ابحث");
            // if (value.length > 10) {
            //   value = value.slice(0, 10);
            //   value = value + "...";
            // }
            $("#para").html(
              ` تعذر العثور على طلاب بين تاريخين المواليد ${
                valueDate2.val() + "," + valueDate1.val()
              }<br><br><div><button  onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataS(result.length);
          }
          $("#StudentsOutput").html(table);
        },
      });
    } else if (id === "BtnSearchNameS") {
      moodSearchS = "byName";
      $("#inptSearchS2").attr("placeholder", "بحث حسب اسم الطالب");
      $("#BtnSearchDateS").html("بحث بين تاريخي مواليد معينة");
      $("#inptSearchS2").css("gridColumn", "2/4");
      $("#inptSearchS1").hide();
    } else if (id === "BtnSearchDateS") {
      moodSearchS = "byDate";
      $("#inptSearchS2").attr("placeholder", "الى");
      $("#BtnSearchDateS").html("ابحث");
      $("#inptSearchS2").css("gridColumn", "3/4");
      $("#inptSearchS1").show();
    }
  });
}
function popimg() {
  $(document).delegate("#imgPop", "click", function () {
    let img = $(this).attr("src");
    $("#img2").attr("src", img);
    $("#back2").show();
    $("#pop").show();
  });
}
function closepop() {
  $(document).delegate(".fas", "click", function () {
    $("#back2").hide();
    $("#pop").hide();
  });
}
function SearchS(value) {
  $(document).ready(function () {
    let BtnSearchName = $("#BtnSearchNameS");
    if (moodSearchS === "byName" && value != "") {
      $.ajax({
        url: "./FilesPageStudents/php/pageStudentsSearchByName.php",
        type: "POST",
        data: { name: value },
        beforeSend: function () {
          BtnSearchName.attr("disabled", true).html("جاري البحث...");
        },
        success: function (result) {
          result = JSON.parse(result);
          let table = "";
          if (result.length) {
            $.each(result, function (key, resultSearch) {
              table += `<tr>
              <td>${resultSearch.id}</td>
              <td>${resultSearch.name}</td> 
              <td>${
                resultSearch.year +
                "-" +
                resultSearch.month +
                "-" +
                resultSearch.day
              }</td>   
              <td>${resultSearch.address}</td>   
              <td></td>
              <td>${resultSearch.Grade}</td>  
              <td><button id='GetEditS' class='GetEdit' data-id='${
                resultSearch.id
              }'>تعديل</button>
              <button id='DeleteStudents' class='DeleteS' data-id='${
                resultSearch.id
              }'>حذف</button></td> 
              </tr> `;
            });
            BtnSearchName.attr("disabled", false).html("بحث حسب الاسم");
            $("#para").html("تم العثور على نتائج البحث");
            $("#para").css("color", "#000");
            $("#para").fadeIn();
            setTimeout("$('#para').fadeOut()", 1500);
          } else {
            BtnSearchName.attr("disabled", false).html("بحث حسب الاسم");
            if (value.length > 10) {
              value = value.slice(0, 10);
              value = value + "...";
            }
            $("#para").html(
              ` تعذر العثور العثور على أي طالب باسم ${value}<br><br><div><button onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataS(result.length);
          }
          $("#StudentsOutput").html(table);
        },
      });
    } else {
      DisplayDataS();
      $("#para").fadeOut();
    }
  });
}
$(document).ready(function () {
  AddDataS();
  DisplayDataS();
  DeleteDataS();
  GetToFormEditDataS();
  popimg();
  closepop();
});
