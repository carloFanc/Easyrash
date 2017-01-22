//Annotazione 2.0 con funzioni di base

/* Attenzione:
 * Selezione = la semplice selezione di testo che si fa con il muose trascinando l'indicatore a schermo
 * Range = Oggetto range applicato alla selezione
 */

var rangySelection = 0; //Selezione del testo
var text = ""; //Testo Selezionato
var id; //ID frammento
var author = ""; //Autore frammento
var annotation = ""; //Testo annotazione
var title;
var start = 0; //Inizio della selezione testo (offset)
var end = 0; //Fine della selezione testo (offset)
var ann_json = {}; //Json per il salvataggio in locale
var numeroIncrementale = 0; //ID incrementale
var rangeObjectOnSelection; //Oggetto Range a partire da una selezione
var evidenziatore; //Evidenziatore testo
var selectionSave; //Variabile di salvataggio Range
var date;
var countId;
var savedSel;
var ContentOfSpan;
var spanId;
var lastElement;


//Al caricamento del documento viene inizializzato rangy e viene avviato il metodo per la creazione dei range
$(window).load(function () {
    rangy.init(); //Questo metodo inizializza Rangy
    var mainRange = rangy.createRange(); //Questo metodo crea un Range vuoto presente nel DOM e non visibile agli utenti
    evidenziatore = rangy.createHighlighter(); //Crea l'oggetto highlight che permette di evidenziare il testo
    evidenziatore.addClassApplier(rangy.createClassApplier('highlight', {
        onElementCreate: function (el) {
            el.id = id;
        }
    }));

});

//Questa funzione salva la selezione inserendo degli span momentanei tra la selezione
function save() {
    //resetto gli input a vuoto
    $('#AnnotTitle').val('');
    $('#TextAreaAnnotation').val('');
    savedSel = rangy.saveSelection();

}

//Questa funzione carica la selezione salvata e rimuove gli span momentanei utilizzati per il salavataggio della funzione
function restore() {
    rangy.restoreSelection(savedSel);
}
//Funzione che ritorna il testo sotto forma di String della selezione
function getSelectedText() {
    rangySelection = rangy.getSelection();
    text = rangySelection.toString();
}

function getRangeObject(selectionObject) {
    if (selectionObject.getRangeAt)
        return selectionObject.getRangeAt(0);
}

//Crea un oggetto Range a partire dalla Selection
function aggiungiRange() {
    getSelectedText();
    rangeObjectOnSelection = getRangeObject(rangySelection);
}

//Funzione che controlla che esista del testo da selezionare e che il testo selezionato appartenga allo stesso paragrafo
function checkSelection() {
    aggiungiRange();
    startNode = rangeObjectOnSelection.startContainer.parentNode;
    endNode = rangeObjectOnSelection.endContainer.parentNode;
    var startNodeSpecial = "";
    var endNodeSpecial = ""; 

    if (rangeObjectOnSelection.collapsed) {
        swal({
            title: "Select one fragment!",
            type: "warning",
            confirmButtonText: "Ok"
        });
        return false;
    } else if ((startNode.isEqualNode(endNode)) && rangySelection !== null && !rangySelection.toHtml().includes("</span>")) {
        return true;
    } else if (startNode.nodeName === "SECTION" && (!startNode.isEqualNode(endNode))) {
        startNodeSpecial = rangeObjectOnSelection.startContainer.parentNode;
        endNodeSpecial = rangeObjectOnSelection.endContainer.parentNode.parentNode;
        if ((startNodeSpecial.isEqualNode(endNodeSpecial)) && rangySelection !== null && !rangySelection.toHtml().includes("</span>")) {
            return true;
        }
    } else if (endNode.nodeName === "SECTION" && (!startNode.isEqualNode(endNode))) {
        startNodeSpecial = rangeObjectOnSelection.startContainer.parentNode.parentNode;
        endNodeSpecial = rangeObjectOnSelection.endContainer.parentNode;
        if ((startNodeSpecial.isEqualNode(endNodeSpecial)) && rangySelection !== null && !rangySelection.toHtml().includes("</span>")) {
            return true;
        }
    } else {
        swal({
            title: "Error in the selection of fragment!",
            type: "warning",
            confirmButtonText: "Ok"
        });
        return false;
    }
}

function highlighter() {
    return new Promise(function (done) {
        evidenziatore.highlightSelection('highlight');
        rangy.getSelection().removeAllRanges();
        done();
    });

}

function addImageToHighlighter() {

    var spanWithoutImg = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = spanWithoutImg + '<img class="hovermouse" onclick="visualizeLocalComment(\'' + id + '\');" src="./img/annotation_icon.png"/>';
}

function visualizeLocalComment(id) {

    localStorage.setItem("TempGeneralId", id);
    localStorage.removeItem('TempSingleId');
    jQuery('#TextAnn').removeClass('form-control sizeBox');
    $("#show_buttons").html('');
    $("#AuthorAnn").html('');
    ContentOfSpan = $('#' + id).text(); // testo dentro span
    var p, a;
    var ActualId = id.split(",");
    var boolp = false;
    $("#DateAnn").html('');
    $("#TitleAnn").html('');
    $("#TextAnn").html('');
    $("#AnnotationLabel").html('');

    var jsonData = JSON.parse(localStorage.getItem("annotations"));
    if (jsonData != null) { //appende nome in base all'id locale
        for (p = 0; p < jsonData.length; p++) {
            for (a = 0; a < ActualId.length; a++) {
                if (parseInt(ActualId[a]) == (parseInt(jsonData[p].id))) {// allora è un commento temporaneo perchè l'id è nella localstorage
                    $("#AuthorAnn").html('<li class="list-group-item hovermouse" onclick="visualizeBodyAnnotation(' + jsonData[p].id + ');">' + jsonData[p].author + '</li>');
                    break;
                }
            }
        }
    }//appende nome in base all'id globale 
    $.ajax({
        type: 'POST',
        url: 'php/AppendListNameAnn.php',
        data: "ListId=" + ActualId + "&doc=" + sessionStorage.getItem("urlDoc"),
        success: function (data) { 
            $("#AuthorAnn").append(data);
            $(document).ready(function () {

                $('#AuthorAnn li').each(function (i) { //crea bottone add se non esiste già un annotazione con il proprio nome

                    if ($(this).text() == sessionStorage.getItem("LoggedUser")) {
                        boolp = true;
                    }
                });
                $("#add_new_ann1").html('<button type="button" onclick="closeModal()" class="btn btn-default" data-dismiss="modal">Close</button>');
                if (sessionStorage.getItem('ActualLock') == '1' && !boolp) {
                    $("#add_new_ann1").html('<button type="button" onclick="clickAdd()" id="ButtonAdd" class="btn btn-primary" data-toggle="modal" data-target="#addNewTempAnnModal">Add</button><button type="button" onclick="closeModal()" class="btn btn-default" data-dismiss="modal">Close</button>');
                }
                $("#annotation").modal("show");
            });
        },
        error: function () {
            alert("Server Error");
        }
    });

}
function visualizeBodyAnnotation(id) {
    localStorage.setItem('TempSingleId', id);
    document.getElementById("TitleAnn").contentEditable = false;
    document.getElementById("TextAnn").contentEditable = false;
    $("#show_buttons").html('');
    var p;
    var ActualId = id;
    var person = "";
    var jsonData = JSON.parse(localStorage.getItem("annotations"));
    if (jsonData != null) {
        for (p = 0; p < jsonData.length; p++) {
            if (parseInt(ActualId) === (parseInt(jsonData[p].id))) {
                $("#DateAnn").html('<h4 style="float:left;">Date:</h4><h4 style="float:right;"><div class="label label-primary">' + jsonData[p].date + '</div></h4>');
                $("#TitleAnn").html('<h4 style="float:left;">Title:</h4><h4 style="float:right;"><div class="label label-primary">' + jsonData[p].title + '</div></h4>');
                $("#TextAnn").html(jsonData[p].annotation);
                $("#AnnotationLabel").html('<h4 style="float:left">Annotation:</h4>');
                person = jsonData[p].author;
            }
        }
        if (person === sessionStorage.getItem("LoggedUser")) { //controllo che l'annotazione sia nel localstorage
            $("#show_buttons").html('<button type="button" id="buttonModifySave" class="btn btn-warning" onclick="modifyAnnotation();">Modify</button><button type="button" id="buttonDeleteAnn" onclick="deleteAnnotation();" class="btn btn-danger">Delete</button>');
        }
    }
    $.ajax({
        type: 'POST',
        url: 'php/AppendBodyAnn.php',
        dataType: "json",
        data: "id=" + id + "&doc=" + sessionStorage.getItem("urlDoc"),
        success: function (data) {
            if (data != "nada") {
                person = data[0];
                $("#DateAnn").html(data[2]);
                $("#TitleAnn").html(data[3]);
                $("#TextAnn").html(data[1]);
                $("#AnnotationLabel").html('<h4 style="float:left">Annotation:</h4>');

            }
        },
        error: function () {
            alert("Server Errors");
        }
    });
    jQuery('#TextAnn').addClass('form-control sizeBox');
}

function modifyAnnotation() {
    document.getElementById("TitleAnn").contentEditable = true;
    document.getElementById("TextAnn").contentEditable = true;
    document.getElementById("buttonModifySave").setAttribute("onClick", "SaveAnnTemp();");
    document.getElementById("buttonModifySave").innerText = 'Save';
}

function deleteAnnotation() {
    var tempId;
    var p;
    tempId = localStorage.getItem("TempSingleId");//tolgo l'oggetto nel json
    var jsonData = JSON.parse(localStorage.getItem("annotations"));
    for (p = 0; p < jsonData.length; p++) {
        if (parseInt(tempId) === parseInt(jsonData[p].id)) {
            jsonData.splice(p, 1);
        }
    }
    localStorage.setItem("annotations", JSON.stringify(jsonData)); 
    //elimino o modifico l'id nello span
    if ($("#AuthorAnn li").length == 1) {
        $('#' + tempId).prop('outerHTML', ContentOfSpan);
    } else {
        //se ci sono più di un annotazione togliere solamente un id 
        var IdToDelete = localStorage.getItem('TempSingleId');
        var array = localStorage.getItem('TempGeneralId');
        var arrayId = array.split(",");
        var count;
        for (count = 0; count < arrayId.length; count++) {
            if (arrayId[count] == IdToDelete) {
                arrayId.splice(count, 1);
            }
        }

        //rimuove l'id corrispondente nell'id dello span e della img
        var text = $('#' + array.replace(",", "\\,")).text();

        var newContent = '<span class="highlight" id="' + arrayId.toString() + '">' + text + '<img class="hovermouse" onclick="visualizeLocalComment(\'' + arrayId.toString() + '\');" src="./img/annotation_icon.png"></span>';
      
        $('#' + array.replace(",", "\\,")).prop('outerHTML', newContent);
    }

    $("#annotation").modal('toggle');
}
function SaveAnnTemp() {
    var tempId;
    var p;
    tempId = parseInt(localStorage.getItem("TempSingleId"));
    var jsonData = JSON.parse(localStorage.getItem("annotations"));
    for (p = 0; p < jsonData.length; p++) {
        if (tempId === (parseInt(jsonData[p].id))) {
            var new_title = $("#TitleAnn").text().replace('Title:', '');
            jsonData[p].title = new_title;
            jsonData[p].annotation = $("#TextAnn").text();

        }
    }
    localStorage.setItem("annotations", JSON.stringify(jsonData));
    $("#annotation").modal('toggle');
}
function closeModal() {
    localStorage.removeItem('TempSingleId');
}

function clickAdd() {
    spanId = localStorage.getItem("TempGeneralId");
    $("#annotation").modal('toggle');
}

function addNewAnnotation() {

    annotation = document.getElementById("textAreaAddAnnotation").value;
    title = document.getElementById("AnnotNewTitle").value;
    if (annotation != "") {
         
        setId().then(setAuthor).then(getData).then(saveLocally).then(addIdToSpan);
    
    } else {
        swal({
            title: "Insert annotations to save",
            type: "warning",
            confirmButtonText: "Ok"
        });
    }
}

function addIdToSpan(){
       return new Promise(function (done) {
        console.log(sessionStorage.getItem("newTempAddId"));
        var newtempAddId = sessionStorage.getItem("newTempAddId");
        document.getElementById(spanId).id = '' + spanId + ',' + newtempAddId;
        var newId = spanId + ',' + newtempAddId;
        $(document).ready(function () {
            document.getElementById(newId).innerHTML = document.getElementById(newId).innerHTML.replace('<img class="hovermouse" onclick="visualizeLocalComment(\'' + spanId + '\');" src="./img/annotation_icon.png">', '<img class="hovermouse" onclick="visualizeLocalComment(\'' + newId + '\');" src="./img/annotation_icon.png">');
        });
           done();
       });
}
function saveAllAnnotations() {
    var jsonData = JSON.parse(localStorage.getItem("annotations"));
    if (jsonData != null) {
        var id = [], text = [], title = [], annotation = [], author = [], date = [];
        for (var p = 0; p < jsonData.length; p++) {
            id.push(jsonData[p].id);
            text.push(jsonData[p].text);
            title.push(jsonData[p].title);
            annotation.push(jsonData[p].annotation);
            author.push(jsonData[p].author);
            date.push(jsonData[p].date);
        }//chiamata ajax per salvare annotazioni nei json
        var data_to_send = "id=" + id + "&text=" + text + "&title=" + title + "&annotation=" + annotation + "&author=" + author + "&date=" + date + "&doc=" + sessionStorage.getItem("urlDoc");
        $.ajax({
            type: 'POST',
            url: 'php/SaveAllidAnnotations.php',
            data: data_to_send,
            success: function () {
                localStorage.removeItem("annotations");

                //chiamata ajax per modificare documento
                var Finalstring = "";
                var Tempstring = "";
                var sections = document.getElementsByTagName("section");

                for (var i = 0; i < sections.length; i++) {
                    Tempstring = $("#file section")[i].outerHTML;
                    Finalstring = Finalstring.concat(escapeHtml(Tempstring));
                }

                $.ajax({
                    type: 'POST',
                    url: 'php/SaveAllAnnotationsInDocument.php',
                    data: "body=" + Finalstring + "&doc=" + sessionStorage.getItem("urlDoc"),
                    processData: false,
                    success: function () {
                        swal({
                            title: "Annotations Saved!",
                            type: "success",
                            confirmButtonText: "Ok"
                        });

                    },
                    error: function () {
                        alert("Server Error");
                    }
                });


            },
            error: function () {
                alert("Server Error");
            }
        });
    } else {
        swal({
            title: "Error! No Annotations to save",
            type: "error",
            confirmButtonText: "Ok"
        });
        $("#confirmModal").modal('toggle');
    }

}

function saveLocally() {
    return new Promise(function (done) {
        var ann_json = {"id": id, "text": text, "title": title, "annotation": annotation, "author": author, "date": date};
        var jsonData = JSON.parse(localStorage.getItem("annotations"));
        if (jsonData != null) {
            jsonData.push(ann_json);
            localStorage.setItem("annotations", JSON.stringify(jsonData));
            console.log(localStorage.getItem("annotations"));
        } else {
            var annotationsArray = [];
            annotationsArray.push(ann_json);
            localStorage.setItem("annotations", JSON.stringify(annotationsArray));
            console.log(localStorage.getItem("annotations"));
        }

        done();
    });
}


//Crea incrementalmente l'ID da applicare al Json
function setId() {
    return new Promise(function (done) { 
        var doc = sessionStorage.getItem("urlDoc");
        var user = sessionStorage.getItem("LoggedUser");
        var string = "urlDoc=" + doc + "&user=" + user;
        if (sessionStorage.getItem("countId") == null) {
            $.ajax({
                type: 'POST',
                url: 'php/findTemporaryId.php',
                data: string,
                success: function (data) {
                    sessionStorage.setItem("countId", data);
                    countId = sessionStorage.getItem("countId");
                    sessionStorage.setItem("newTempAddId", countId);
                    id = countId; 
                    done();

                },
                error: function () {
                    alert("Server Error");
                }
            });
        } else { 
            sessionStorage.setItem("countId", parseInt(sessionStorage.getItem("countId")) + 1);
            countId = sessionStorage.getItem("countId");
            sessionStorage.setItem("newTempAddId", countId);
            id = countId; 
            done();
        }
    });
}

//Funzione che prende l'annotazione inserita dall'utente e l'inserisce nel Json
function getAnnotation() {
    annotation = document.getElementById("TextAreaAnnotation").value;
}

function getTitle() {
    title = document.getElementById("AnnotTitle").value;
}

//Prende l'auotore del frammento direttamente dal sessionStorage
function setAuthor() {

    return new Promise(function (done) {
        author = sessionStorage.getItem('LoggedUser');
         
        done();
    });
}

function getData() {
    return new Promise(function (done) {
        $.ajax({
            type: 'POST',
            url: 'php/date.php',
            success: function (data) {
                date = data; 

                done();
            },
            error: function () {
                alert("Error");
            }
        });

    });
}

//Metodo per il salvataggio delle annotazioni frammento
function saveSelectionFragment() {
    restore();
    if (checkSelection()) {
        getAnnotation(); //Prende l'annotazione dall'utente e l'inserisce nel json
        getTitle();
        if (annotation != "") {

            setId().then(setAuthor).then(getData).then(saveLocally).then(highlighter).then(addImageToHighlighter);

        } else {
            swal({
                title: "Insert annotations to save",
                type: "warning",
                confirmButtonText: "Ok"
            });
        }
    }
}


//Funzione di salvataggio Range che va rivista in quanto serve capiere come funziona il salavataggio online
function saveRange() {
    aggiungiRange();
    rangeSave = rangy.saveRange(rangeObjectOnSelection);

}

//Funzione di ripristino salvataggio Range che va rivista in quanto serve capiere come funziona il salavataggio online
function restoreRange() {
    rangy.restoreRange(rangeSave);
}


function svuotaLocalStorage() {
    localStorage.clear();
}

$('#createModal').modal({
    backdrop: 'static', show: true
});

function escapeHtml(text) {
    var cambio = ";;;;;;;";
    return text.replace("&", cambio);
}

//------------dopo tot minuti torna in reader mode
var idleTime = 0;
$(document).ready(function () {

    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute


    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 1) { // 5 = 5 minuti
        if (sessionStorage.getItem('ActualLock') == '1') {
            swal({
                title: "Reader mode for inactivity!",
                type: "warning",
                confirmButtonText: "Ok"
            },
                    function () {

                        var urlDocument = sessionStorage.getItem('urlDoc');

                        $.ajax({//se non ci sono annotazioni carica documento da /documents se ci sono da /annotations/$document/$document.html
                            type: 'POST',
                            url: 'php/checkLoadDocument.php',
                            data: "doc=" + urlDocument,
                            dataType: 'html',
                            success: function (data) {
                                if (data == "0") {

                                    $.ajax({
                                        url: "documents/" + urlDocument,
                                        type: "GET",
                                        cache: false,
                                        success: function (html) {
                                            $("#file").html(html);
                                        }
                                    });
                                } else {

                                    $.ajax({
                                        url: "annotations/" + urlDocument + "/" + urlDocument,
                                        type: "GET",
                                        cache: false,
                                        success: function (html) {
                                            $("#file").html(html);
                                        }
                                    });
                                }
                                sessionStorage.setItem('urlDoc', urlDocument);
                            },
                            error: function () {
                                alert("Error in Data Recovery");
                            }
                        });

                        //da mettere altrimenti quando c'è <img> si blocca e non continua 
                        //perchè non trova elemento judge1 in quanto c'è judge1Image
                        if ($('#changeButtonWithImageJudge').children().is("button")) {
                            document.getElementById("judge1").disabled = true;
                            document.getElementById("judge1").setAttribute("title", "Go to Annotator Mode");
                        } else {
                            return;
                        }
                    }
            );

            switchSend = 0;
            var url = sessionStorage.getItem('urlDoc');
            var string = "response=" + switchSend + "&url=" + url;
            $.ajax({
                type: 'POST',
                url: 'php/LockPage.php',
                data: string,
                dataType: 'html',
                success: function (data) {
                    sessionStorage.setItem('ActualLock', '0');
                    localStorage.removeItem("annotations");
                    $("#showButtonAnn").toggle();
                    //Cambia funzione pulsante
                    document.getElementById("mode").setAttribute("onClick", "buttonAnnotator()");
                    //Cambio testo del pulsante da Reader Mode a Annotator Mode
                    $('#mode').text('Go to Annotator Mode');
                    $('#mode').css("background-color", "red");

                },
                error: function () {
                    alert("Server Error");
                }
            });
            return false;//Returning false prevents the event from continuing up the chain
        }
    }
}
;

//funzioni per visualizzare annotazioni locali
function visualizeLocalAnnList() {
    var p;
    if (localStorage.getItem("annotations") == null || JSON.parse(localStorage.getItem("annotations")).length == 0) {
        swal({
            title: "No local annotations",
            type: "warning",
            confirmButtonText: "Ok"
        });
    } else {
        $('#ModalVisTempAnn').modal('show');
        $("#DateTemp").html('');
        $("#TextTemp").html('');
        $("#AnnTemp").html('');
        $("#AnnotationTempLabel").html('');
        $("#TextTempLabel").html('');//add

        jQuery('#AnnTemp').removeClass('form-control sizeBox');
        jQuery('#TextTemp').removeClass('form-control sizeBox');//add

        var jsonDataTemp = JSON.parse(localStorage.getItem("annotations"));
        $("#TitleTempAnn").html('');
        if (jsonDataTemp != null) { //appende nome in base all'id locale 
            for (p = 0; p < jsonDataTemp.length; p++) {
                $("#TitleTempAnn").append('<li class="list-group-item hovermouse" onclick="visualizeLocalTempBodyAnnotation(' + jsonDataTemp[p].id + ');">' + jsonDataTemp[p].title + '</li>');
            }
        }
    }
}

function visualizeLocalTempBodyAnnotation(id) {
    var p;
    var jsonDataTemp = JSON.parse(localStorage.getItem("annotations"));
    if (jsonDataTemp != null) {

        for (p = 0; p < jsonDataTemp.length; p++) {
            if (parseInt(id) === (parseInt(jsonDataTemp[p].id))) {
                $("#DateTemp").html('<h4 style="float:left;">Date:</h4><h4 style="float:right;"><div class="label label-primary">' + jsonDataTemp[p].date + '</div></h4>');
                $("#TextTemp").html(jsonDataTemp[p].text);//add
                $("#AnnTemp").html(jsonDataTemp[p].annotation);
                $("#AnnotationTempLabel").html('<h4 style="float:left">Annotation:</h4>');
                $("#TextTempLabel").html('<h4 style="float:left">Text:</h4>');//add
            }
        }
    }
    jQuery('#AnnTemp').addClass('form-control sizeBox');
    jQuery('#TextTemp').addClass('form-control sizeBox');//add

}
;
 