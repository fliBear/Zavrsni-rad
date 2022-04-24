### Setup
Prilikom dohvaćanja s git-a, pozicionirati se u direktorij site-demo i upisato npm install. Može potrajati jer React zauzima nešto više od 100MB.

### Pokretanje
Pokrenuti jar datoteku s API-jem. Zatim iz komandne linije pokrenuti React projekt s npm start.

### Što je prikazano
Kod je u src datoteci. Dio koda koji je zadužen za "kopanje" po API-ju je u hef datoteci. Dio koda za izgradnju je u bob datoteci.
Cars i Manufacturers stranice pokazuju što je prikaže kada se dohvate podatci o svim automobilima ili proizvođačima.
single car stranica pokazuje jedan automobil.
Obrasci su napravljeni iz API-jevog odogovora, a kako izgleda JSON se vidi u poveznicama na prikazanim podatcima.
Toga neće biti kada napravim preusmjeravanje s API-ja na stranicu.

### TODO
- Stilizirati bolje. Pogotovo minimizacija embedaninh podataka.
- Omogućiti (djelomično) proizvoljnu stilizaciju.
- Get zahtjeve preusmjeriti na React aplikaciju, ne pustiti da naprave poziv na API.
- Riješiti rubne slučajeve kod HAL Forms formata
