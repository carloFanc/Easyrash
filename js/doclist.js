$(document).ready(function() { //appena si apre la pagina con i documenti carica i documenti chair
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

     $("#doctab1").click(function() { // carica i documenti del chair dopo click tab2
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
    $("#doctab2").click(function() { // carica i documenti del reviewer dopo click tab2
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
    
    $("#doctab3").click(function() { // carica i documenti dell' author dopo click tab3
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
  
function openDocument(titleDoc) {
    sessionStorage.setItem('titleDoc', titleDoc);
    
    $.ajax({
        type: 'POST',
        url: 'php/loadIndexPage.php',
        data: {titledoc:titleDoc},
        dataType: 'html',
        success: function (data) {
            sessionStorage.setItem('urlDoc', data);
            $("#page-container").load("pages/document.html");
        }
    });
}
 