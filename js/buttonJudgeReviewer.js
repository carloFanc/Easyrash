var title = ""; //Titolo del documento chiave primaria
var eval; //E' accepted o rejected
var reviewer = "";
var ann_global_json = {};
var judgeBoolean;

function buttonAccepted(){
    
    title = sessionStorage.getItem('urlDoc'); //Bisogna aggiungere il titolo del documento
    eval = "accepted";
    reviewer = sessionStorage.getItem('LoggedUser'); //login va sostituito con il nome della chiave usata per identificare l'utente loggato in sessionStorage
    
    ann_global_json = {"title":title, "eval":eval, "reviewer":reviewer};
    localStorage.setItem(title,JSON.stringify(ann_global_json));
    alert("Document Accepted");
    $('#judge').hide();
    $('.modal-backdrop').hide();
}

function buttonRejected(){
    
    title = sessionStorage.getItem('urlDoc'); //Bisogna aggiungere il titolo del documento
    eval = "rejected";
    riviewer = sessionStorage.getItem('LoggedUser'); //login va sostituito con il nome della chiave usata per identificare l'utente loggato in sessionStorage
    
    ann_global_json = {"title":title, "eval":eval, "reviewer":reviewer};
    localStorage.setItem(title,JSON.stringify(ann_global_json));
    console.log(ann_global_json);
    alert("Document Rejected");
    $('#judge').hide();
    $('.modal-backdrop').hide();
}