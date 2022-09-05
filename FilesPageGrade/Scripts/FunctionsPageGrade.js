function DisplayBtnDeleteG(ManyRow) {
  $("#contantBtnDeleteG").html(
    `<button class='DeleteS' onclick='ShowDeleteConfirmationG()' id='DeleteAllDataG' >حذف الكل (${ManyRow})</button>`
  );
}

function DisplayDataG() {
  $.ajax({
    url: "./FilesPageGrade/php/pageGradeDisplay.php",
    type: "POST",
    success: function (result) {
      result = JSON.parse(result);
      let table = "";
      let optionStudents = "";
      if (result.length) {
        $.each(result, function (key, value) {
          table += `<tr>
                    <td>${value.id}</td>
                    <td>${value.Name}</td>   
                    <td><button id='GetEditG' class='GetEdit' data-id='${value.id}'>تعديل</button>
                    <button id='DeleteG' class='DeleteS' data-id='${value.id}'>حذف</button></td> 
                    </tr> `;
          optionStudents += `<option value='${value.Name}'>${value.Name}</option>`;
        });
        DisplayBtnDeleteG(result.length);
      } else {
        DeleteAllDataG(result.length);
      }
      $("#GradeOutput").html(table);
      $("#StudentsGradeS2").html(
        "<option selected hidden disabled value=''>الصف</option>" +
          optionStudents
      );
    },
  });
}
let moodG = "create";
function AddDataG() {
  let name_G_id = $("#GradeNameG");
  let para = $("#para");

  function showwarning() {
    para.fadeOut();
  }
  $("#GradeCreate").click(function () {
    para.css("color", "#f00");
    if (name_G_id.val() === "") {
      para.html("يرجى اضافة اسم الصف");
      para.fadeIn();
      name_G_id.focus();
      setTimeout(showwarning, 1500);
      return;
    }
    if (moodG === "create") {
      $.ajax({
        url: "./FilesPageGrade/php/pageGradeAdd.php",
        type: "POST",
        data: {
          name_G_N: name_G_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري الاضافة...");
        },
        success: function (result) {
          DisplayDataG();
          para.html("تمت اضافة الصف");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          DeleteAllDataG(result.length);
          setTimeout(showwarning, 1500);
        },
      });
    } else if (moodG === "edit") {
      $.ajax({
        url: "./FilesPageGrade/php/PageGradeEditData.php",
        type: "POST",
        data: {
          id_G_N: $("#InputId").val(),
          name_G_N: name_G_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري التعديل...");
        },
        success: function (result) {
          DisplayDataG();
          para.html("تم تعديل معلومات الصف");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          moodG = "create";
          $("#GradeCreate").text("إضافة");
          setTimeout(showwarning, 1500);
        },
      });
    }
    name_G_id.val("");
    name_G_id.focus();
  });
}
function ShowDeleteConfirmationG() {
  $(document).ready(function () {
    $("#paraDelete").css("fontWeight", "600");
    $("#paraDelete").html(
      `هل أنت متأكد من حذف كل البيانات؟ <br><br>
      <div><button class='button2' onclick='cancel()' id='CancelDelete'>إلغاء</button>
      <button onclick='DeleteAllDataG(1)' class='DeleteS'>موافق</button></div>`
    );
    $("#paraDelete").css("color", "#f00");
    $("#paraDelete").show();
    $("#back").show();
  });
}
function DeleteAllDataG(ManyRow) {
  $(document).ready(function () {
    if (ManyRow > 0) {
      $.ajax({
        url: "./FilesPageGrade/php/PageGradeDeleteAll.php",
        type: "post",
        success: function (result) {
          DisplayDataG();
          $("#paraDelete").hide();
          $("#back").hide();
        },
      });
    }
    $("#contantBtnDeleteG").html("");
  });
}
function DeleteDataG() {
  $(document).delegate("#DeleteG", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageGrade/php/PageGradeDelete.php",
      type: "post",
      data: { deletedata: idData },
      success: function (result) {
        DisplayDataG();
      },
    });
  });
}

function GetToFormEditDataG() {
  $(document).delegate("#GetEditG", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageGrade/php/PageGradeGetSearchDataToEdit.php",
      type: "POST",
      data: { GetIdData: idData },
      success: function (data) {
        let result = JSON.parse(data);
        $("#InputId").val(result.id);
        $("#GradeNameG").val(result.Name);
        $("#GradeCreate").text("تعديل");
        moodG = "edit";
      },
    });
  });
}
let moodSearchG = "byName";
function getSearchMoodG(id) {
  $(document).ready(function () {
    if (id === "BtnSearchNameG") {
      moodSearchG = "byName";
      $("#inptSearchG").attr("placeholder", "بحث حسب اسم الصف");
    } else if (id === "BtnSearchNumbrG") {
      moodSearchG = "byNumber";
      $("#inptSearchG").attr("placeholder", "بحث حسب الرقم");
    }
  });
}
function SearchG(value) {
  $(document).ready(function () {
    let BtnSearchName = $("#BtnSearchNameG");
    let BtnSearchNumbr = $("#BtnSearchNumbrG");
    if (moodSearchG === "byName" && value != "") {
      $.ajax({
        url: "./FilesPageGrade/php/pageGradeSearchByName.php",
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
              <td>${resultSearch.Name}</td>   
              <td><button id='GetEditG' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button>
              <button id='DeleteG' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td> 
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
              ` تعذر العثور العثور على أي صف باسم ${value}<br><br><div><button onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataG(result.length);
          }
          $("#GradeOutput").html(table);
        },
      });
    } else if (moodSearchG === "byNumber" && value != "") {
      $.ajax({
        url: "./FilesPageGrade/php/pageGradeSearchByNumber.php",
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
              <td>${resultSearch.Name}</td>   
              <td><button id='GetEditG' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button>
              <button id='DeleteG' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td> 
              </tr> `;
            });
            $("#para").html("تم العثور على نتائج البحث");
            $("#para").css("color", "#000");
            $("#para").fadeIn();
            setTimeout("$('#para').fadeOut()", 1500);
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب الرقم");
          } else {
            BtnSearchNumbr.attr("disabled", false).html("بحث حسب الرقم");
            if (value.length > 10) {
              value = value.slice(0, 10);
              value = value + "...";
            }
            $("#para").html(
              ` تعذر العثور العثور على صف يحمل الرقم ${value}<br><br><div><button  onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataG(result.length);
          }
          $("#GradeOutput").html(table);
        },
      });
    } else {
      DisplayDataG();
      $("#para").fadeOut();
    }
  });
}
$(document).ready(function () {
  AddDataG();
  DisplayDataG();
  DeleteDataG();
  GetToFormEditDataG();
});
