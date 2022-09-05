let SelctY = document.getElementById("year");
let SelctM = document.getElementById("month");
let SelctD = document.getElementById("day");
let SelctYS = document.getElementById("yearS");
let SelctMS = document.getElementById("monthS");
let SelctDS = document.getElementById("dayS");
let SelctMA = document.getElementById("MarksArticleM");
let SelctSelectgradeS = document.getElementById("StudentsGradeS2");
let d = new Date();

function FillSelectBirth() {
  let selectY = "";
  for (let i = d.getFullYear(); i >= 1950; --i) {
    selectY += `<option value='${i}'>${i}</option>`;
  }
  SelctY.innerHTML =
    "<option selected hidden disabled value=''>السنة</option>" + selectY;
  SelctYS.innerHTML =
    "<option selected hidden disabled value=''>السنة</option>" + selectY;
  let month = `
  <option value='January'>January</option>
  <option value='Febraury'>Febraury</option>
  <option value='March'>March</option>
  <option value='April'>April</option>
  <option value='May'>May</option>
  <option value='June'>June</option>
  <option value='July'>July</option>
  <option value='August'>August</option>
  <option value='September'>September</option>
  <option value='October'>October</option>
  <option value='November'>November</option>
  <option value='December'>December</option> `;
  SelctM.innerHTML =
    `<option selected hidden disabled value=''>الشهر</option> ` + month;
  SelctMS.innerHTML =
    `<option selected hidden disabled value=''>الشهر</option> ` + month;

  let selectD = "";
  for (let i = 1; i <= 31; ++i) {
    if (i < 10) {
      i = "0" + i;
    }
    selectD += `<option value='${i}'>${i}</option>`;
  }
  SelctD.innerHTML =
    `<option selected hidden disabled value=''>اليوم</option>` + selectD;
  SelctDS.innerHTML =
    "<option selected hidden disabled value=''>اليوم</option>" + selectD;
}
FillSelectBirth();

function SelectDafault(select1, select2, select3, select4) {
  select1.options[0].selected = true;
  if (select2 != undefined) {
    select2.options[0].selected = true;
  }
  if (select3 != undefined) {
    select3.options[0].selected = true;
  }
  if (select4 != undefined) {
    select4.options[0].selected = true;
  }
}

function EffectMenu() {
  $("#openInformationTeacher").click(function (event) {
    event.preventDefault();
    $("#openInformationTeacher").css("color", "rgb(201, 199, 199)");
    $("#openInformationArticle").css("color", "#fff");
    $("#openInformationGrade").css("color", "#fff");
    $("#openInformationStudents").css("color", "#fff");
    $("#openInformationMarks").css("color", "#fff");
    $("#PageArticle").fadeOut(100);
    $("#PageGrade").fadeOut(100);
    $("#PageStudents").fadeOut(100);
    $("#PageMarks").fadeOut(100);
    $("#PageTeacher").fadeIn(600);
  });

  $("#openInformationArticle").click(function (event) {
    event.preventDefault();
    $("#openInformationArticle").css("color", "rgb(201, 199, 199)");
    $("#openInformationTeacher").css("color", "#fff");
    $("#openInformationGrade").css("color", "#fff");
    $("#openInformationStudents").css("color", "#fff");
    $("#openInformationMarks").css("color", "#fff");
    $("#PageTeacher").fadeOut(100);
    $("#PageMarks").fadeOut(100);
    $("#PageGrade").fadeOut(100);
    $("#PageStudents").fadeOut(100);
    $("#PageArticle").fadeIn(600);
  });

  $("#openInformationGrade").click(function (event) {
    event.preventDefault();
    $("#openInformationGrade").css("color", "rgb(201, 199, 199)");
    $("#openInformationTeacher").css("color", "#fff");
    $("#openInformationArticle").css("color", "#fff");
    $("#openInformationStudents").css("color", "#fff");
    $("#openInformationMarks").css("color", "#fff");
    $("#PageTeacher").fadeOut(100);
    $("#PageArticle").fadeOut(100);
    $("#PageStudents").fadeOut(100);
    $("#PageMarks").fadeOut(100);
    $("#PageGrade").fadeIn(600);
  });

  $("#openInformationStudents").click(function (event) {
    event.preventDefault();
    $("#openInformationStudents").css("color", "rgb(201, 199, 199)");
    $("#openInformationTeacher").css("color", "#fff");
    $("#openInformationGrade").css("color", "#fff");
    $("#openInformationArticle").css("color", "#fff");
    $("#openInformationMarks").css("color", "#fff");
    $("#PageTeacher").fadeOut(100);
    $("#PageArticle").fadeOut(100);
    $("#PageGrade").fadeOut(100);
    $("#PageMarks").fadeOut(100);
    $("#PageStudents").fadeIn(600);
  });

  $("#openInformationMarks").click(function (event) {
    event.preventDefault();
    $("#openInformationMarks").css("color", "rgb(201, 199, 199)");
    $("#openInformationTeacher").css("color", "#fff");
    $("#openInformationGrade").css("color", "#fff");
    $("#openInformationArticle").css("color", "#fff");
    $("#openInformationStudents").css("color", "#fff");
    $("#PageTeacher").fadeOut(100);
    $("#PageArticle").fadeOut(100);
    $("#PageGrade").fadeOut(100);
    $("#PageStudents").fadeOut(100);
    $("#PageMarks").fadeIn(600);
  });
}

function DisplayBtnDeleteT(ManyRow) {
  $("#contantBtnDeleteT").html(
    `<button class='DeleteS' name='DeleteAllNT' onclick='ShowDeleteConfirmation()' id='DeleteAllDataT' >حذف الكل (${ManyRow})</button>`
  );
}

function DisplayDataT() {
  $.ajax({
    url: "./FilesPageTeacher/php/pageTeacherDisplay.php",
    type: "POST",
    success: function (result) {
      result = JSON.parse(result);
      let table = "";
      let optionTeacherlist = "";
      if (result.length) {
        $.each(result, function (key, value) {
          table += `<tr>
                    <td>${value.id}</td>
                    <td>${value.NameT}</td>
                    <td>${value.Year + "-" + value.month + "-" + value.day}</td>
                    <td>${value.AddressT}</td>
                    <td><button id='GetEditT' class='GetEdit' data-id='${
                      value.id
                    }'>تعديل</button><button id='DeleteT' class='DeleteS' data-id='${
            value.id
          }'>حذف</button></td> 
                    </tr> `;
          optionTeacherlist += `<option value='${value.NameT}'>`;
        });
        DisplayBtnDeleteT(result.length);
      } else {
        $("#para").html("لايوجد بيانات");
        $("#para").css("color", "#000");
        $("#para").fadeIn();
        DeleteAllDataT(result.length);
        setTimeout("$('#para').fadeOut()", 1500);
      }
      $("#outputT").html(table);
      $("#teacherNameA2").html(optionTeacherlist);
    },
  });
}
let moodT = "create";
function AddDataT() {
  let name_T_id = $("#teachername");
  let year_T_id = $("#year");
  let month_T_id = $("#month");
  let day_T_id = $("#day");
  let address_T_id = $("#teacheraddress");
  let para = $("#para");

  function dafaultColorSelect(v) {
    v.css("border", "none");
  }
  year_T_id.click(function () {
    dafaultColorSelect(year_T_id);
  });
  month_T_id.click(function () {
    dafaultColorSelect(month_T_id);
  });
  day_T_id.click(function () {
    dafaultColorSelect(day_T_id);
  });
  function showwarning() {
    para.fadeOut();
  }
  $("#teachercreate").click(function () {
    para.css("color", "#f00");
    if (name_T_id.val() === "") {
      para.html("يرجى اضافة اسم المعلم");
      para.fadeIn();
      name_T_id.focus();
      setTimeout(showwarning, 1500);
      return;
    } else if (year_T_id.val() === null) {
      para.html("يرجى اضافة سنة الميلاد");
      para.fadeIn();
      year_T_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    } else if (month_T_id.val() === null) {
      para.html("يرجى اضافة الشهر");
      para.fadeIn();
      month_T_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    } else if (day_T_id.val() === null) {
      para.html("يرجى اضافة اليوم");
      para.fadeIn();
      day_T_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    }
    if (moodT === "create") {
      $.ajax({
        url: "./FilesPageTeacher/php/pageTeacherAdd.php",
        type: "POST",
        data: {
          name_T_N: name_T_id.val(),
          year_T_N: year_T_id.val(),
          month_T_N: month_T_id.val(),
          day_T_N: day_T_id.val(),
          address_T_N: address_T_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري الاضافة...");
        },
        success: function (result) {
          DisplayDataT();
          para.html("تمت اضافة المدرس");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          setTimeout(showwarning, 1500);
        },
      });
    } else if (moodT === "edit") {
      $.ajax({
        url: "./FilesPageTeacher/php/pageTeacherEditData.php",
        type: "POST",
        data: {
          id_T_N: $("#InputId").val(),
          name_T_N: name_T_id.val(),
          year_T_N: year_T_id.val(),
          month_T_N: month_T_id.val(),
          day_T_N: day_T_id.val(),
          address_T_N: address_T_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري التعديل...");
        },
        success: function (result) {
          DisplayDataT();
          para.html("تم تعديل معلومات المدرس");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          moodT = "create";
          $("#teachercreate").text("إضافة");
          setTimeout(showwarning, 1500);
        },
      });
    }
    name_T_id.val("");
    address_T_id.val("");
    SelectDafault(SelctY, SelctM, SelctD);
    name_T_id.focus();
  });
}
function ShowDeleteConfirmation() {
  $(document).ready(function () {
    $("#paraDelete").css("fontWeight", "600");
    $("#paraDelete").html(
      "هل أنت متأكد من حذف كل البيانات؟ <br><br><div><button class='button2' onclick='cancel()' id='CancelDelete'>إلغاء</button><button onclick='DeleteAllDataT(1)' class='DeleteS'>موافق</button></div>"
    );
    $("#paraDelete").css("color", "#f00");
    $("#paraDelete").show();
    $("#back").show();
  });
}
function cancel() {
  $(document).ready(function () {
    $("#para").hide();
    $("#back").hide();
  });
}
function DeleteAllDataT(ManyRow) {
  $(document).ready(function () {
    if (ManyRow > 0) {
      $.ajax({
        url: "./FilesPageTeacher/php/pageTeacherDeleteAll.php",
        type: "post",
        success: function (result) {
          DisplayDataT();
          $("#paraDelete").hide();
          $("#back").hide();
        },
      });
    }
    $("#contantBtnDeleteT").html("");
  });
}
function DeleteDataT() {
  $(document).delegate("#DeleteT", "click", function () {
    let idData = $(this).attr("data-id");

    $.ajax({
      url: "./FilesPageTeacher/php/pageTeacherDelete.php",
      type: "post",
      data: { deletedata: idData },
      success: function (result) {
        DisplayDataT();
      },
    });
  });
}

function GetToFormEditDataT() {
  $(document).delegate("#GetEditT", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageTeacher/php/pageTeacherGetSearchDataToEdit.php",
      type: "POST",
      data: { GetIdData: idData },
      success: function (data) {
        let result = JSON.parse(data);
        $("#InputId").val(result.id);
        $("#teachername").val(result.NameT);
        $("#year").val(result.Year);
        $("#month").val(result.month);
        $("#day").val(result.day);
        $("#teacheraddress").val(result.AddressT);
        $("#teachercreate").text("تعديل");
        moodT = "edit";
      },
    });
  });
}
let moodSearchT = "byName";
function getSearchmMoodT(id) {
  $(document).ready(function () {
    if (id === "BtnSearchName") {
      moodSearchT = "byName";
      $("#inptSearchT").attr("placeholder", "بحث حسب الاسم");
    } else if (id === "BtnSearchNumbr") {
      moodSearchT = "byNumber";
      $("#inptSearchT").attr("placeholder", "بحث حسب الرقم");
    }
  });
}
function SearchT(value) {
  $(document).ready(function () {
    let BtnSearchName = $("#BtnSearchName");
    let BtnSearchNumbr = $("#BtnSearchNumbr");
    if (moodSearchT === "byName" && value != "") {
      $.ajax({
        url: "./FilesPageTeacher/php/pageTeacherSearchByName.php",
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
              <td>${resultSearch.NameT}</td>
              <td>${
                resultSearch.Year +
                "-" +
                resultSearch.month +
                "-" +
                resultSearch.day
              }</td>
              <td>${resultSearch.AddressT}</td>
              <td><button class='GetEdit' data-id='${
                resultSearch.id
              }'>تعديل</button><button class='DeleteS DeleteT' data-id='${
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
              ` تعذر العثور العثور على أي معلم بأسم ${value}<br><br><div><button  onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataT(result.length);
          }
          $("#outputT").html(table);
        },
      });
    } else if (moodSearchT === "byNumber" && value != "") {
      $.ajax({
        url: "./FilesPageTeacher/php/pageTeacherSearchByNumber.php",
        type: "POST",
        data: { id: value },
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
              <td>${resultSearch.NameT}</td>
              <td>${
                resultSearch.Year +
                "-" +
                resultSearch.month +
                "-" +
                resultSearch.day
              }</td>
              <td>${resultSearch.AddressT}</td>
              <td><button class='GetEdit' data-id='${
                resultSearch.id
              }'>تعديل</button><button class='DeleteS DeleteT' data-id='${
                resultSearch.id
              }'>حذف</button></td> 
              </tr> `;
              $("#para").html("تم العثور على نتائج البحث");
              $("#para").css("color", "#000");
              $("#para").fadeIn();
              setTimeout("$('#para').fadeOut()", 1500);
            });
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب الرقم");
          } else {
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب الرقم");
            if (value.length > 10) {
              value = value.slice(0, 10);
              value = value + "...";
            }
            $("#para").html(
              ` تعذر العثور العثور على معلم يحمل الرقم ${value}<br><br><div><button onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataT(result.length);
          }
          $("#outputT").html(table);
        },
      });
    } else {
      DisplayDataT();
      $("#para").fadeOut();
    }
  });
}
$(document).ready(function () {
  EffectMenu();
  DisplayDataT();
  AddDataT();
  DeleteDataT();
  GetToFormEditDataT();
});
