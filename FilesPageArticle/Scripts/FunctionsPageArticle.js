function DisplayBtnDeleteA(ManyRow) {
  $("#contantBtnDeleteA").html(
    `<button class='DeleteS' onclick='ShowDeleteConfirmationA()' id='DeleteAllDataA' >حذف الكل (${ManyRow})</button>`
  );
}

function DisplayDataA() {
  $.ajax({
    url: "./FilesPageArticle/php/pageArticleDisplay.php",
    type: "POST",
    success: function (result) {
      result = JSON.parse(result);
      let table = "";
      let selct = "";
      if (result.length) {
        $.each(result, function (key, value) {
          table += `<tr>
                    <td>${value.id}</td>
                    <td>${value.NameArticle}</td>  
                    <td>${value.NameTeacher}</td>   
                    <td><button id='GetEditA' class='GetEdit' data-id='${value.id}'>تعديل</button><button id='DeleteA' class='DeleteS' data-id='${value.id}'>حذف</button></td> 
                    </tr> `;
          selct += `<option value='${value.NameArticle}'>${value.NameArticle}</option>`;
        });
        DisplayBtnDeleteA(result.length);
      } else {
        DeleteAllDataA(result.length);
      }
      $("#articleOutput").html(table);
      $("#MarksArticleM").html(
        "<option disabled hidden selected value=''>المادة</option>" + selct
      );
    },
  });
}
let moodA = "create";
function AddDataA() {
  let name_A_id = $("#articleNameA");
  let nameTeacher_A_id = $("#teacherNameA");
  let para = $("#para");

  function showwarning() {
    para.fadeOut();
  }
  $("#articlecreate").click(function () {
    para.css("color", "#f00");
    if (name_A_id.val() === "") {
      para.html("يرجى اضافة اسم المادة");
      para.fadeIn();
      name_A_id.focus();
      setTimeout(showwarning, 1500);
      return;
    } else if (nameTeacher_A_id.val() === "") {
      para.html("يرجى اضافة اسم الأستاذ");
      para.fadeIn();
      nameTeacher_A_id.focus();
      setTimeout(showwarning, 1500);
      return;
    }
    if (moodA === "create") {
      $.ajax({
        url: "./FilesPageArticle/php/pageArticleAdd.php",
        type: "POST",
        data: {
          name_A_N: name_A_id.val(),
          nameTeacher_A_N: nameTeacher_A_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري الاضافة...");
        },
        success: function (result) {
          DisplayDataA();
          para.html("تمت اضافة المادة");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          DeleteAllDataA(result.length);
          setTimeout(showwarning, 1500);
        },
      });
    } else if (moodA === "edit") {
      $.ajax({
        url: "./FilesPageArticle/php/PageArticleEditData.php",
        type: "POST",
        data: {
          id_A_N: $("#InputId").val(),
          name_A_N: name_A_id.val(),
          nameTeacher_A_N: nameTeacher_A_id.val(),
        },
        beforeSend: function () {
          $(this).attr("disabled", true).html("جاري التعديل...");
        },
        success: function (result) {
          DisplayDataA();
          para.html("تم تعديل معلومات المادة");
          para.css("color", "#5BB318");
          para.css("fontWeight", "600");
          para.fadeIn();
          moodA = "create";
          $("#articlecreate").text("إضافة");
          setTimeout(showwarning, 1500);
        },
      });
    }
    name_A_id.val("");
    nameTeacher_A_id.val("");
    name_A_id.focus();
  });
}
function ShowDeleteConfirmationA() {
  $(document).ready(function () {
    $("#paraDelete").css("fontWeight", "600");
    $("#paraDelete").html(
      `هل أنت متأكد من حذف كل البيانات؟ <br><br>
      <div><button class='button2' onclick='cancel()' id='CancelDelete'>إلغاء</button>
      <button onclick='DeleteAllDataA(1)' class='DeleteS'>موافق</button></div>`
    );
    $("#paraDelete").css("color", "#f00");
    $("#paraDelete").show();
    $("#back").show();
  });
}
function DeleteAllDataA(ManyRow) {
  $(document).ready(function () {
    if (ManyRow > 0) {
      $.ajax({
        url: "./FilesPageArticle/php/PageArticleDeleteAll.php",
        type: "post",
        success: function (result) {
          DisplayDataA();
          $("#paraDelete").hide();
          $("#back").hide();
        },
      });
    }
    $("#contantBtnDeleteA").html("");
  });
}
function DeleteDataA() {
  $(document).delegate("#DeleteA", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageArticle/php/PageArticleDelete.php",
      type: "post",
      data: { deletedata: idData },
      success: function (result) {
        DisplayDataA();
      },
    });
  });
}

function GetToFormEditDataA() {
  $(document).delegate("#GetEditA", "click", function () {
    let idData = $(this).attr("data-id");
    $.ajax({
      url: "./FilesPageArticle/php/PageArticleGetSearchDataToEdit.php",
      type: "POST",
      data: { GetIdData: idData },
      success: function (data) {
        let result = JSON.parse(data);
        $("#InputId").val(result.id);
        $("#articleNameA").val(result.NameArticle);
        $("#teacherNameA").val(result.NameTeacher);
        $("#articlecreate").text("تعديل");
        moodA = "edit";
      },
    });
  });
}
let moodSearchA = "byName";
function getSearchMoodA(id) {
  $(document).ready(function () {
    if (id === "BtnSearchNameA") {
      moodSearchA = "byName";
      $("#inptSearchA").attr("placeholder", "بحث حسب اسم المادة");
    } else if (id === "BtnSearchNumbrA") {
      moodSearchA = "byNumber";
      $("#inptSearchA").attr("placeholder", "بحث حسب الرقم");
    }
  });
}
function SearchA(value) {
  $(document).ready(function () {
    let BtnSearchName = $("#BtnSearchNameA");
    let BtnSearchNumbr = $("#BtnSearchNumbrA");
    if (moodSearchA === "byName" && value != "") {
      $.ajax({
        url: "./FilesPageArticle/php/pageArticleSearchByName.php",
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
              <td>${resultSearch.NameArticle}</td>  
              <td>${resultSearch.NameTeacher}</td>   
              <td><button id='GetEditA' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button><button id='DeleteA' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td> 
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
              ` تعذر العثور العثور على أي مادة باسم ${value}<br><br><div><button onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataA(result.length);
          }
          $("#articleOutput").html(table);
        },
      });
    } else if (moodSearchA === "byNumber" && value != "") {
      $.ajax({
        url: "./FilesPageArticle/php/pageArticleSearchByNumber.php",
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
              <td>${resultSearch.NameArticle}</td>  
              <td>${resultSearch.NameTeacher}</td>   
              <td><button id='GetEditA' class='GetEdit' data-id='${resultSearch.id}'>تعديل</button><button id='DeleteA' class='DeleteS' data-id='${resultSearch.id}'>حذف</button></td> 
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
              ` تعذر العثور العثور على شخص يحمل الرقم ${value}<br><br><div><button  onclick='cancel()' id='CancelDelete'>موافق</button></div>`
            );
            $("#para").css("color", "#000");
            $("#para").show();
            DeleteAllDataA(result.length);
          }
          $("#articleOutput").html(table);
        },
      });
    } else {
      DisplayDataA();
      $("#para").fadeOut();
    }
  });
}
$(document).ready(function () {
  AddDataA();
  DisplayDataA();
  DeleteDataA();
  GetToFormEditDataA();
});
