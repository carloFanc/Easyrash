

/*function loadEvents() {
 var url = "";
 var user = sessionStorage.getItem("LoggedUser"); // pesco l'utente loggato
 $.getJSON("json/events.json", function(result) {
 $.each(result, function(key, field) { // cerco nel file events.json dove è presente l'utente loggato
 for (var i = 0; i < field.length; i++) {
 for (var j = 0; j < field[i].chairs.length; j++) {
 tab= 1;
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
 tab= 3;
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
 tab= 3;
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
 */
function loadChair() {
    alert("tab1");
//    var url = "";
//    var documentiAperti = [];
//    var arrayListaDocumenti = [];
//    var tab;
//    var user = sessionStorage.getItem("LoggedUser"); // pesco l'utente loggato
//    $.getJSON("json/events.json", function (result) {
//        $.each(result, function (key, field) { // cerco nel file events.json dove è presente l'utente loggato
//            for (var i = 0; i < field.length; i++) {
//                for (var j = 0; j < field[i].chairs.length; j++) {
//                    tab = 1;
//                    if (field[i].chairs[j] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
//                        console.log("è nei chairs della conferenza " + field[i].conference + "");
//                        for (var n = 0; n < field[i].submissions.length; n++) {
//                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
//                                url = field[i].submissions[n].url;
//                                $("#tab1").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[n].title + "</a>");
//                                arrayListaDocumenti.push(field[i].submissions[n].title);
//                            } else {
//                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
//                                    if (field[i].submissions[n].title == arrayListaDocumenti[m]) {
//                                        break;
//                                    }
//                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[n].title != arrayListaDocumenti[m])) {
//                                        url = field[i].submissions[n].url;
//                                        $("#tab1").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[n].title + "</a>");
//                                        arrayListaDocumenti.push(field[i].submissions[n].title);
//                                    }
//                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
//                            }
//                        } // fine ciclo per stampare tutti i documenti se l'utente è chairs
//                    }
//                }
//            }
//        });
//    });
}
function loadReviewer() {
        alert("tab2");

//    var url = "";
//    var documentiAperti = [];
//    var arrayListaDocumenti = [];
//    var tab;
//    var user = sessionStorage.getItem("LoggedUser"); // pesco l'utente loggato
//    $.getJSON("json/events.json", function (result) {
//        $.each(result, function (key, field) { // cerco nel file events.json dove è presente l'utente loggato
//            for (var i = 0; i < field.length; i++) {
//                for (var z = 0; z < field[i].submissions.length; z++) {
//                    for (var w = 0; w < field[i].submissions[z].reviewers.length; w++) {
//                        if (field[i].submissions[z].reviewers[w] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
//                            console.log("è nei reviewers della conferenza " + field[i].conference + " del documento " + field[i].submissions[z].title + "");
//                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
//                                url = field[i].submissions[z].url;
//                                $("#tab2").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[z].title + "</a>");
//                                arrayListaDocumenti.push(field[i].submissions[z].title);
//                            } else {
//                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
//                                    if (field[i].submissions[z].title == arrayListaDocumenti[m]) {
//                                        break;
//                                    }
//                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[z].title != arrayListaDocumenti[m])) {
//                                        url = field[i].submissions[z].url;
//                                        $("#tab2").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[z].title + "</a>");
//                                        arrayListaDocumenti.push(field[i].submissions[z].title);
//                                    }
//                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
//                            }
//                        }
//                    }
//                }
//            }
//        });
//    });

}

function loadAutor() {
        alert("tab3");

//    var url = "";
//    var documentiAperti = [];
//    var arrayListaDocumenti = [];
//    var tab;
//    var user = sessionStorage.getItem("LoggedUser"); // pesco l'utente loggato
//    $.getJSON("json/events.json", function (result) {
//        $.each(result, function (key, field) { // cerco nel file events.json dove è presente l'utente loggato
//            for (var i = 0; i < field.length; i++) {
//                for (var z = 0; z < field[i].submissions.length; z++) {
//                    for (var x = 0; x < field[i].submissions[z].authors.length; x++) {
//                        if (field[i].submissions[z].authors[x] == user) { // controllo se l'utente loggato corrisponde a quello analizzato nel json
//                            console.log("è negli authors della conferenza " + field[i].conference + " del documento " + field[i].submissions[z].title + "");
//                            if (arrayListaDocumenti.length == 0) { // controllo se l'array d'appoggio è vuoto
//                                url = field[i].submissions[z].url;
//                                $("#tab3").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[z].title + "</a>");
//                                arrayListaDocumenti.push(field[i].submissions[z].title);
//                            } else {
//                                for (var m = 0; m < arrayListaDocumenti.length; m++) {
//                                    if (field[i].submissions[z].title == arrayListaDocumenti[m]) {
//                                        break;
//                                    }
//                                    if (m == (arrayListaDocumenti.length - 1) && (field[i].submissions[z].title != arrayListaDocumenti[m])) {
//                                        url = field[i].submissions[z].url;
//                                        $("#tab3").append("<a href='#' class='list-group-item' id=" + "doc" + (arrayListaDocumenti.length + 1) + " onclick='openDocument(\"" + "documents/" + url + "\")'>" + field[i].submissions[z].title + "</a>");
//                                        arrayListaDocumenti.push(field[i].submissions[z].title);
//                                    }
//                                } // fine ciclo che controlla se il titolo del documento è già stato stampato verificando se è in arrayListaDocumenti
//                            }
//                        }
//                    } // fine ciclo sugli autori di un documento
//                }
//            }
//        });
//    });
}


function openDocument(doc) {
    $.ajax({
        url: doc,
        success: function (result) {
        }
    });
}

 