# Duck Messenger

Duck Messenger je sigurna aplikacija za razmenu poruka koja stavlja naglasak na potpunu privatnost i vlasništvo korisnika nad porukama koje se razmenjuju između kontakata. Ovaj dokument pruža tehnički pregled arhitekture i funkcionalnosti aplikacije.

## Duck Messenger - Tehnički Pregled

### Ključne Funkcionalnosti

- Blockchain za Bazu Podataka: Duck Messenger koristi blockchain tehnologiju kao osnovnu bazu podataka. Pametni ugovor aplikacije je implementiran na Inery Testnet blockchain mreži.

- Autentifikacija Korisnika i Upravljanje Ključevima: Da bi koristili aplikaciju, korisnici moraju da pruže svoje korisničko ime, privatni ključ za kontrolu blockchain naloga i URL API čvora. Prilikom prvog postavljanja naloga, korisnici dobijaju privatni RSA ključ, koji igra ključnu ulogu u dešifrovanju simetričnih ključeva za obezbeđivanje bezbedne razmene poruka.

- Razmena Simetričnih Ključeva: Duck Messenger osigurava sigurnu komunikaciju između kontakata omogućavajući razmenu simetričnih ključeva. Ovi ključevi su jedinstveni za svaki par kontakata unutar aplikacije i mogu se dobiti samo uz pomoć privatnog RSA ključa koji je generisan tokom registracije korisnika na njihovom uređaju.

### Tehnički Detalji

#### Integracija sa Blockchain-om

Duck Messenger koristi blockchain tehnologiju za upravljanje korisničkim nalozima i enkripcionim ključevima putem pametnog ugovora implementiranog na Inery Testnet blockchain mreži.

- Registracija Korisnika i Generisanje Ključeva

  Korisnici pružaju informacije o svom nalogu, uključujući ime naloga, privatni blockchain ključ i URL API čvora.

  Nakon uspešne registracije, korisnici dobijaju privatni RSA ključ, koji se koristi za dešifrovanje poruka unutar aplikacije.

- Sigurna Razmena Poruka

  Da bi omogućili sigurnu razmenu poruka, Duck Messenger generiše jedinstveni simetrični ključ za svaki par kontakata.

  Ovaj simetrični ključ se bezbedno razmenjuje između kontakata koristeći njihove privatne RSA ključeve.

  Poruke razmenjene između kontakata se enkriptuju i dekriptuju koristeći jedinstvene simetrične ključeve, obezbeđujući krajnju sigurnost i privatnost.

## Početak

Da biste pokrenuli Duck Messenger aplikaciju, ispratite sledeće korake:

    Klonirajte repozitorijum na vaš lokalni računar.

    Instalirajte potrebne dependencije. recommended : node v18.16.0, npm 9.6.4
     `npm install` i u client folderu isto to.

    Postavite svoj Inery Testnet node ili koristite neki od javno dostupnih API nodova

- https:://tas.blockchain-servers.world.

  Konfigurišite svoj Duck Messenger nalog sa imenom nalogai njegovim privatnim ključem.

  (note) (5KHyCYKSH32vmgT4qEtsMmtYEokBjFVaLDdeck3Y6BZAqERkTf5)

  Počnite sa sigurnom i privatnom razmenom poruka sa vašim kontaktima!

## Zaključak

Duck Messenger nudi robustno i sigurno rešenje za razmenu poruka koje koristi blockchain tehnologiju i napredne tehnike enkripcije kako bi obezbedio privatnost korisnika i vlasništvo nad podacima. Pozivamo vas da istražite aplikaciju dalje i počnete da uživate u sigurnoj i privatnoj komunikaciji sa vašim kontaktima.

Za detaljne instrukcije o instalaciji i upotrebi, molimo vas da se obratite dokumentaciji projekta.

![Duck Graphic](/client/public/img/topology.png)
