function DisplayBtnDeleteM(ManyRow) {
  $("#contantBtnDeleteM").html(
    `<button class='DeleteS' onclick='ShowDeleteConfirmationM()' id='DeleteAllDataM' >حذف الكل (${ManyRow})</button>`
  );
}

function DisplayDataM() {
  $.ajax({
    url: "./FilesPageMarks/php/pageMarksDisplay.php",
    type: "POST",
    success: function (result) {
      result = JSON.parse(result);
      let table = "";
      let selct = "";
      if (result.length) {
        $.each(result, function (key, value) {
          table += `<tr>
                    <td>${value.id}</td>
                    <td>${value.Marks}</td>
                    <td>${value.NameStudents}</td>
                    <td>${value.NameArticle}</td>
                    <td>${value.result}</td> 
                    <td><button id='GetEditM' class='GetEdit' data-id='${value.id}'>تعديل</button><button id='DeleteM' class='DeleteS' data-id='${value.id}'>حذف</button></td>
                    </tr> `;
        });
        DisplayBtnDeleteM(result.length);
      } else {
        DeleteAllDataM(result.length);
      }
      $("#MarksOutput").html(table);
    },
  });
}
let moodM = "create";
function AddDataM() {
  let marks_M_id = $("#MarksM");
  let nameStudents_M_id = $("#StudentsNameM");
  let nameArticle_M_id = $("#MarksArticleM");
  let para = $("#para");

  function dafaultColorSelect(v) {
    v.css("border", "none");
  }
  nameArticle_M_id.click(function () {
    dafaultColorSelect(nameArticle_M_id);
  });

  function showwarning() {
    para.fadeOut();
  }
  $("#MarksCreate").click(function () {
    para.css("color", "#f00");
    if (marks_M_id.val() === "") {
      para.html("يرجى اضافة العلامة");
      para.fadeIn();
      marks_M_id.focus();
      setTimeout(showwarning, 1500);
      return;
    } else if (nameStudents_M_id.val() === "") {
      para.html("يرجى اضافة اسم الطالب");
      para.fadeIn();
      nameStudents_M_id.focus();
      setTimeout(showwarning, 1500);
      return;
    } else if (nameArticle_M_id.val() === null) {
      para.html("يرجى اضافة اسم المادة");
      para.fadeIn();
      nameArticle_M_id.css("border", "1px solid #f44336");
      setTimeout(showwarning, 1500);
      return;
    }
    if (moodM === "create") {
      $.ajax({
        url: "./FilesPageMarks/php/pageMarksAdd.php",
        type: "POST",
        data: {
          marks_M_N: marks_M_id.val(),
          nameStudents_M_N: nameStudents_M_id.val(),
          nameArticle_M_N: nameArticle_M_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري الاضافة...");
        },
        success: function (result) {
          DisplayDataM();
          para.html("تمت اضافة العلامة");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          // DeleteAllDataA(result.length);
          setTimeout(showwarning, 1500);
        },
      });
    } else if (moodM === "edit") {
      $.ajax({
        url: "./FilesPageMarks/php/PageMarksEditData.php",
        type: "POST",
        data: {
          id_M_N: $("#InputId").val(),
          marks_M_N: marks_M_id.val(),
          nameStudents_M_N: nameStudents_M_id.val(),
          nameArticle_M_N: nameArticle_M_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري التعديل...");
        },
        success: function (result) {
          DisplayDataM();
          para.html("تم تعديل معلومات العلامة");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          moodM = "create";
          $("#MarksCreate").text("إضافة");
          setTimeout(showwarning, 1500);
        },
      });
    }
    marks_M_id.val("");
    nameStudents_M_id.val("");
    SelectDafault(SelctMA);
    marks_M_id.focus();
    BestTeacher();
  });
}
function ShowDeleteConfirmationM() {
  $(document).ready(function () {
    $("#paraDelete").css("fontWeight", "600");
    $("#paraDelete").html(
      `هل أنت متأكد من حذف كل البيانات؟ <br><br>
      <div><button class='button2' onclick='cancel()' id='CancelDelete'>إلغاء</button>
      <button onclick='DeleteAllDataM(1)' class='DeleteS'>موافق</button></div>`
    );
    $("#paraDelete").css("color", "#f00");
    $("#paraDelete").show();
    $("#back").show();
  });
}
function DeleteAllDataM(ManyRow) {
  $(document).ready(function () {
    if (ManyRow > 0) {
      $.ajax({
        url: "./FilesPageMarks/php/PageMarksDeleteAll.php",
        type: "post",
        success: function (result) {
          DisplayDataM();
          $("#paraDelete").hide();
          $("#back").hide();
        },
      });
    }
    $("#contantBtnDeleteM").html("");
  });
}
function DeleteDataM() {
  $(document).delegate("#DeleteM", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageMarks/php/PageMarksDelete.php",
      type: "post",
      data: { deletedata: idData },
      success: function (result) {
        DisplayDataM();
      },
    });
  });
}

function GetToFormEditDataM() {
  $(document).delegate("#GetEditM", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageMarks/php/PageMarksGetSearchDataToEdit.php",
      type: "POST",
      data: { GetIdData: idData },
      success: function (data) {
        let result = JSON.parse(data);
        $("#InputId").val(result.id);
        $("#MarksM").val(result.Marks);
        $("#StudentsNameM").val(result.NameStudents);
        $("#MarksArticleM").val(result.NameArticle);
        $("#MarksCreate").text("تعديل");
        moodM = "edit";
      },
    });
  });
}
let moodSearchM = "byName";
function getSearchMoodM(id) {
  $(document).ready(function () {
    if (id === "BtnSearchNameM") {
      moodSearchM = "byName";
      $("#inptSearchM").attr("placeholder", "بحث حسب اسم الطالب");
      $("#contantCheckBox").hide();
    } else if (id === "BtnSearchArticleM") {
      moodSearchM = "byArticle";
      $("#inptSearchM").attr("placeholder", "بحث حسب المادة");
      $("#contantCheckBox").css("display", "flex");
    }
  });
}
let MoodVisible = "All";

function SearchM(value) {
  $(document).ready(function () {
    let BtnSearchName = $("#BtnSearchNameM");
    let BtnSearchNumbr = $("#BtnSearchArticleM");
    if (moodSearchM === "byName" && value != "") {
      $.ajax({
        url: "./FilesPageMarks/php/pageMarksSearchByName.php",
        type: "POST",
        data: { name: value },
        beforeSend: function () {
          BtnSearchName.attr("disabled", true).html("جاري البحث...");
        },
        success: function (result2) {
          result2 = JSON.parse(result2);
          let table = "";
          if (result2.length) {
            $.each(result2, function (key, resultSearch) {
              table += `<tr>
                    <td>${resultSearch.id}</td>
                    <td>${resultSearch.Marks}</td>
                    <td>${resultSearch.NameStudents}</td>
                    <td>${resultSearch.NameArticle}</td>
                    <td>${resultSearch.result}</td> 
                    <td><button id='GetEditM' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button>
                    <button id='DeleteM' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td>
                    </tr> `;
            });
            BtnSearchName.attr("disabled", false).html("بحث حسب الاسم");
            $("#para").html("تم العثور على نتائج البحث");
            $("#para").css("color", "#000");
            $("#para").fadeIn();
            DeleteAllDataM(0);
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
            DeleteAllDataM(result2.length);
          }
          $("#MarksOutput").html(table);
        },
      });
    } else if (moodSearchM === "byArticle") {
      $.ajax({
        url: "./FilesPageMarks/php/pageMarksSearchByArticle.php",
        type: "POST",
        data: {
          article: value,
          MoodVisible0: MoodVisible,
        },
        beforeSend: function () {
          BtnSearchNumbr.attr("disabled", true).html("جاري البحث...");
        },
        success: function (result2) {
          result2 = JSON.parse(result2);
          let table = "";
          if (result2.length) {
            $.each(result2, function (key, resultSearch) {
              table += `<tr>
                    <td>${resultSearch.id}</td>
                    <td>${resultSearch.Marks}</td>
                    <td>${resultSearch.NameStudents}</td>
                    <td>${resultSearch.NameArticle}</td>
                    <td>${resultSearch.result}</td> 
                    <td><button id='GetEditM' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button>
                    <button id='DeleteM' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td>
                    </tr> `;
            });
            $("#para").html("تم العثور على نتائج البحث");
            $("#para").css("color", "#000");
            $("#para").fadeIn();
            if (value != "") {
            } else if (MoodVisible === "Success" || MoodVisible === "fail") {
              $("#DeleteAllDataM").hide();
            } else {
              $("#DeleteAllDataM").show();
            }
            setTimeout("$('#para').fadeOut()", 1500);
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب المادة");
          } else {
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب المادة");
            if (value.length > 10) {
              value = value.slice(0, 10);
              value = value + "...";
            }
            $("#para").html(
              ` تعذر العثور العثور على علامة تحمل مادة ${value}<br><br><div><button  onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            $("#DeleteAllDataM").hide();
          }
          $("#MarksOutput").html(table);
        },
      });
    } else {
      $("#DeleteAllDataM").show();
      DisplayBtnDeleteM();
      DisplayDataM();
      $("#para").fadeOut();
    }
  });
}
function isNumber(evt) {
  var charCode = evt.which;
  if (charCode < 48 || charCode > 57) {
    return false;
  } else {
    return true;
  }
}
function VisibleMarks() {
  $(document).delegate(".visibleByResult", "click", function () {
    MoodVisible = $(this).attr("id");
    SearchM($("#inptSearchM").val());
  });
}
function BestTeacher() {
  $.ajax({
    url: "FilesPageMarks/php/pageMarksBestTeacher.php",
    success: function (BestTeacher) {
      $("#inptBestTeacher").val("افضل استاذ: " + BestTeacher);
    },
  });
}
$(document).ready(function () {
  AddDataM();
  DisplayDataM();
  DeleteDataM();
  GetToFormEditDataM();
  VisibleMarks();
  BestTeacher();
});
