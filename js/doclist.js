$(document).ready(function() {
       var identify_tab="tab1"; 
       var dati = 'tab='+ identify_tab + '&user='+sessionStorage.getItem("LoggedUser");
 
     //con questa chiamata vengono prese tutti i paper di cui l'utente in questione è chair
        $.ajax({
            type: 'POST',
            url: 'php/loadListDocuments.php',
            data: dati,
            dataType: 'html',
            success: function (data) {
                 $("#tab1").html(data); 
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        }); 
});

     $("#doctab1").click(function() {
         var identify_tab="tab1";
          
         var dati = 'tab='+ identify_tab + '&user='+sessionStorage.getItem("LoggedUser");
 
     //con questa chiamata vengono prese tutti i paper di cui l'utente in questione è chair
        $.ajax({
            type: 'POST',
            url: 'php/loadListDocuments.php',
            data: dati,
            dataType: 'html',
            success: function (data) {
                 $("#tab1").html(data); 
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    
    });
    $("#doctab2").click(function() {
        var identify_tab="";
         identify_tab = "tab2";
         var dati = 'tab='+ identify_tab + '&user='+sessionStorage.getItem("LoggedUser");
 
    //con questa chiamata vengono prese tutti i paper di cui l'utente in questione è reviewer
        $.ajax({
            type: 'POST',
            url: 'php/loadListDocuments.php',
            data: dati,
            dataType: 'html',
            success: function (data) { 
                 $("#tab2").html(data);  
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    
    });
    
    $("#doctab3").click(function() {
        var identify_tab="";
         identify_tab = "tab3";
         var dati = 'tab='+ identify_tab + '&user='+sessionStorage.getItem("LoggedUser");
 
     //con questa chiamata vengono prese tutti i paper di cui l'utente in questione è author
        $.ajax({
            type: 'POST',
            url: 'php/loadListDocuments.php',
            data: dati,
            dataType: 'html',
            success: function (data) { 
                 $("#tab3").html(data);  
            },
            error: function () {
                alert("Error in Data Recovery");
            }
        });
    
    });
  
function openDocument(titledoc) {
    $.ajax({
        type: 'POST',
        url: 'php/loadIndexPage.php',
        data: {titledoc:titledoc},
        dataType: 'html',
        success: function (data) {
            alert(data);
        }
    });
}
 