# Progetto di Tecnologie Web: Easyrash

EasyRASH è un sistema online per permettere la valutazione di articoli in RASH, integrando contenuto e commenti in un unico pacchetto e facilitando il processo di peer review. 

Il progetto consiste nella progettazione e implementazione di una versione semplificata del sistema di peer-review 
EasyRASH:
- si concentra sulla scrittura e visualizzazione dei commenti dei revisori
- include alcuni moduli opzionali per gestire altre funzionalità quali la creazione di nuovi eventi, la registrazione di nuovi utenti, la submission di articoli, etc.

## Ruoli
EasyRASH ha tre ruoli:
- Chair: organizzatore di un evento, assegna le review e decide lo stato finale di un articolo (rifiutato o accettato) in base ai commenti dei revisori
- Autore: sottomette un paper e ne chiede la revisione per la accettazione alla conferenza
- Revisore (o Reviewer): riceve articoli da commentare ed esprime un giudizio complessivo su ogni articolo e una serie di commenti puntuali sul contenuto

Ogni utente è registrato su più eventi e con ruoli diversi. Per semplificare: ogni utente è identificato da un indirizzo email. 
Si accede al sistema tramite login. Dopo il login l’utente vede l’elenco degli eventi a cui è registrato e, per ogni evento, l’elenco degli articoli di quell’evento.
EasyRASH permette di svolgere le operazioni connesse con il proprio ruolo (Chair o Reviewer o autore) per quell’evento e su ogni articolo

Ogni utente può accedere ad un articolo in due modalità:
- Reader: l’interfaccia permette di leggere il contenuto, scrollare, esaminare metadati e proprietà del documento e dei vari frammenti, cercare informazioni aggiuntive, e passare alla modalità seguente. 
- Annotator: Un widget permette il passaggio dell'utente alla modalità annotazione, nella quale l'utente può commentare gli articoli e creare nuove annotazioni indipendentemente da quelle già esistenti, eventualmente anche in sovrapposizione totale o parziale con altre annotazioni).  La modalità annotator inoltre permette di esprimere un giudizio complessivo sull’articolo:
Un Reviewer può dare un punteggio da 1 a 5 e un giudizio testuale
Il Chair può aggiungere un giudizio testuale e, se tutte le review sono complete, aggiungere la decisione finale: “accepted” o “rejected”

## Eventi, paper e review
- Ogni utente può essere Chair e/o Reviewer e/o Autore per un evento
- Ad ogni Reviewer sono stati assegnati dal Chair uno o più paper da valutare e commentare
- Ogni paper quindi può essere associato a zero o più review (in base a quanti revisori lo hanno già commentato).
- Quando tutti i revisori hanno commentato il paper il Chair decide, in base ai loro suggerimenti, se accettarlo o meno
- Ogni paper può essere quindi in uno dei seguenti stati:
  - Under review: caricato nel sistema e commentato da zero o più reviewer
  - Awaiting decision: commentato da tutti i reviewer e in attesa della decisione del Chair
  - Accepted: accettato dal Chair (visti i commenti dei reviewer)
  - Rejected: rifiutato dal Chair (visti i commenti dei reviewer)

## Processo di gestione di un evento

Il processo di gestione di un evento EasyRASH è il seguente:

- Il chair crea un nuovo evento
- L'autore sottomette un paper in formato RASH
- Il chair assegna due o più reviewer alla valutazione del paper
- I reviewer annotano l'articolo localmente (correzioni da fare) e globalmente (un giudizio sul paper più un voto da 1 a 5)
- Il chair emette un giudizio: rejected, modifications requested, accepted, sulla base delle opinioni dei reviewer. 
- Se è modifications requested, l'autore sottomette una nuova versione del paper in formato RASH con le modifiche effettuate.
- Il chair valuta se le modifiche sono adeguate e emette un giudizio: reject o accepted. Se si prevedono giri multipli anche "modification requested"
- Una volta che tutti i paper sono o accepted o rejected, il chair manda i paper accepted alla casa editrice e chiude l'evento 

