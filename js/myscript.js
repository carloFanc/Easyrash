var documentiAperti = [];
var arrayListaDocumenti = [];

function verifyUserAuth() {
    console.log(sessionStorage);
    $("#userLoggedIn span").append(sessionStorage.getItem("LoggedUser"));

}

function verifyAuthentication() {
    if (sessionStorage.length === 0) {
        location.replace("login.html");
    }
}

function logout() {
    $("#confirmLogout").click(function() {
        sessionStorage.removeItem("LoggedUser");
        location.replace("login.html");
    });
}
// funzione per il caricamento dei documenti nella lista all'apertura dell'index dopo il login.
function loadEvents() {
    var url = "";
    var user = sessionStorage.getItem("LoggedUser"); // pesco l'utente loggato
    $.getJSON("json/events.json", function(result) {
        $.each(result, function(key, field) { // cerco nel file events.json dove è presente l'utente loggato
            for (var i = 0; i < field.length; i++) {
                for (var j = 0; j < field[i].chairs.length; j++) {
                    if (field[i].chairs[j] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
                        console.log("è nei chairs della conferenza " + field[i].conference + "");
                        for (var n = 0; n < field[i].submissions.length; n++) {
                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
                              url = field[i].submissions[n].url;
                                $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[n].title + "</a>");
                                arrayListaDocumenti.push(field[i].submissions[n].title);
                            } else {
                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
                                    if (field[i].submissions[n].title == arrayListaDocumenti[m]) {
                                        break;
                                    }
                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[n].title != arrayListaDocumenti[m])) {
                                      url = field[i].submissions[n].url;
                                        $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[n].title + "</a>");
                                        arrayListaDocumenti.push(field[i].submissions[n].title);
                                    }
                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
                            }
                        } // fine ciclo per stampare tutti i documenti se l'utente è chairs
                    }
                } // fine ciclo sui chairs
                for (var k = 0; k < field[i].pc_members.length; k++) {
                    if (field[i].pc_members[k] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
                        console.log("è nei pc members della conferenza " + field[i].conference + "");
                        for (var n = 0; n < field[i].submissions.length; n++) {
                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
                              url = field[i].submissions[n].url;
                                $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[n].title + "</a>");
                                arrayListaDocumenti.push(field[i].submissions[n].title);
                            } else {
                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
                                    if (field[i].submissions[n].title == arrayListaDocumenti[m]) {
                                        break;
                                    }
                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[n].title != arrayListaDocumenti[m])) {
                                      url = url = field[i].submissions[n].url;;
                                        $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[n].title + "</a>");
                                        arrayListaDocumenti.push(field[i].submissions[n].title);
                                    }
                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
                            }
                        } // fine ciclo per stampare tutti i documenti se l'utente è pc_members
                    }
                } // fine ciclo sui pc_members
                for (var z = 0; z < field[i].submissions.length; z++) {
                    for (var x = 0; x < field[i].submissions[z].authors.length; x++) {
                        if (field[i].submissions[z].authors[x] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
                            console.log("è negli authors della conferenza " + field[i].conference + " del documento " + field[i].submissions[z].title + "");
                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
                              url = field[i].submissions[z].url;
                                $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[z].title + "</a>");
                                arrayListaDocumenti.push(field[i].submissions[z].title);
                            } else {
                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
                                    if (field[i].submissions[z].title == arrayListaDocumenti[m]) {
                                        break;
                                    }
                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[z].title != arrayListaDocumenti[m])) {
                                      url = field[i].submissions[z].url;
                                        $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[z].title + "</a>");
                                        arrayListaDocumenti.push(field[i].submissions[z].title);
                                    }
                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
                            }
                        }
                    } // fine ciclo sugli autori di un documento
                    for (var w = 0; w < field[i].submissions[z].reviewers.length; w++) {
                        if (field[i].submissions[z].reviewers[w] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
                            console.log("è nei reviewers della conferenza " + field[i].conference + " del documento " + field[i].submissions[z].title + "");
                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
                              url = field[i].submissions[z].url;
                                $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[z].title + "</a>");
                                arrayListaDocumenti.push(field[i].submissions[z].title);
                            } else {
                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
                                    if (field[i].submissions[z].title == arrayListaDocumenti[m]) {
                                        break;
                                    }
                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[z].title != arrayListaDocumenti[m])) {
                                      url = field[i].submissions[z].url;
                                        $("#listaDocumenti").append("<a href='#' class='list-group-item' id="+"doc"+(arrayListaDocumenti.length+1)+" onclick='openDocument(\""+"documents/"+url+"\")'>" + field[i].submissions[z].title + "</a>");
                                        arrayListaDocumenti.push(field[i].submissions[z].title);
                                    }
                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
                            }
                        }
                    } // fine ciclo sui reviewers di un documento
                } // fine ciclo sui documenti di una conferenza
            } // fine ciclo sulle conferenze
        });
    });
}
// funzione che al doppio click su un documento lo apre nel content dell'index principale
function openDocument(doc){
  $.ajax({
    url: doc,
    success: function(result) {
      $("#file").html(result);
    }
  });
}
function cambiaContenuto(string) {   //funzione che al click di un bottone nella index apre un contenuto diverso
if(string=="profile"){
        $("#page-container").load("pages/profile.php");
    }
if(string=="document"){
        $("#page-container").load("pages/document.html");
    }
if(string=="doclist"){
        $("#page-container").load("pages/doclist.html");
    }
 
}

// function docToRemove() {
//     $('#tabListaDocumenti').on('click', '.closer', function() {
//         var tabID = $(this).parents('a').attr('href');
//         $(this).parents('li').remove();
//         $(tabID).remove();
//         removeCloseDoc(this.id);
//         // var tabFirst = $('#tabListaDocumenti a:first');
//         // tabFirst.tab('show');
//
//     });
// }
//
// function removeCloseDoc(docId) {
//     var removed = false;
//     for (var i = 0; i < documentiAperti.length; i++) {
//         if (documentiAperti[i] == docId) {
//             //Rimuovo il documento trovato
//             documentiAperti.splice(i, 1);
//             removed = true;
//             break;
//         }
//     }
//     return removed;
// }
$(document).ready(function() {
    loadEvents();
    verifyAuthentication();
    // docToRemove();
    verifyUserAuth();
    logout();
});
