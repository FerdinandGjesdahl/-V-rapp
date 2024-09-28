# Værapp - Webutvikling Prosjekt 1, Gruppe 11

Dette prosjektet er en værapp som viser værinformasjon basert på Yr sitt REST API. Appen er bygget ved hjelp av TanStack Query for optimal håndtering av API-kall.  Dette valgte vi for å ha et api
som er lett å jobbe med, men som samtidig har et bredt bruksområde. Med TanStack slipper vi å kalle til api-et ofte
og slipper unødvendige kall.

## Innhold

- [Om prosjektet](#om-prosjektet)
- [Funksjonalitet](#funksjonalitet)
- [Design](#design)
- [Kjøre prosjektet](#kjøre-prosjektet)

## Om prosjektet

Vi har valgt å lage en norsk værapp som henter værdata fra Yr sitt REST API. Ved hjelp av TanStack Query unngår vi unødvendige kall til API-et, noe som gjør applikasjonen mer effektiv og brukervennlig. Appen laster kun ned data for en by om gangen, og dataene oppdateres når brukeren velger en ny by.

## Funksjonalitet

- Dynamisk nedlasting av værdata basert på byvalg.
- Komponentbasert struktur for bedre modularitet.
- Tilpasset responsivt design for både desktop og mobil.

## Design
I deler av App.css implementerte vi kode for å sikre et responsivt design. På bredere desktop-skjermer plasseres listen over byer til høyre og værmeldingen til venstre for å gi et visuelt fyldigere uttrykk på siden. Vårt designutgangspunkt var "desktop-first", men gjennom utviklingsprosessen tok vi også hensyn til mobilbrukere, og det endelige designet ble ikke ferdigstilt før vi hadde tenkt gjennom mobilens layout. Ved en maksimal skjermbredde på 900px flyttes bylisten under værmeldingen. Dette gjør at all værinformasjon kan vises i sin helhet, samtidig som bylisten fortsatt er lett tilgjengelig for brukerne på en naturlig måte.

Vi har benyttet blått som en gjennomgående farge i appen grunnet at fargen passer godt til værmeldinger og psykologisk sett så viser blått tillit og stabilitet. Alle knapper er tydelig fremhevet for å gjøre det intuitivt for brukeren å forstå at de er interaktive. Vi har også inkludert bilder av hver by i tabellen på høyre side, samt værsymboler for de ulike værvarslene, for å sikre en bedre brukeropplevelse og visuell tydelighet.

Vi har valgt å plassere en favorittknapp øverst til venstre på hver ressurs/by for å sikre at den alltid er lett tilgjengelig. Knappen er utstyrt med et stjernesymbol i midten slik at det skal være intuitivt hva knappen betyr, hvor symbolet endrer farge dersom byen er favorisert eller ikke. Ved mindre viewport blir denne knappen flyttet til å være samlet med resten av knappene som brukes for navigering mellom byer og datoer.

Med tanke på det responsive designet har vi også gjort et valg slik at når viewport blir mindre fjernes kolonnen med 'Vindbeskrivelse' fra værtabellen som displayes. Dette valget har vi gjort fordi vi tenker at den gjenværende informasjonen er viktigere for brukeren, og dersom alle kolonnene skulle inngått når viewporten minskes, vil informasjonen bli kludrete og uoversiktelig på grunn av ordbrekk og lignende.

- Bilder av byene og værsymboler finnes i `src/Images`.
- Komponentene er delt opp og plassert i `src/Components` for enkel vedlikehold og arbeidsdeling.

## Valg
Appen består av to hovedkomponenter, CitiesListView og WeatherTable, som hver har en distinkt funksjon. CitiesListView inneholder en oversikt over alle tilgjengelige byer, og gir brukeren mulighet til å velge hvilken by de ønsker å se værinformasjon for. Denne komponenten er designet for å være enkel å navigere, slik at brukerne raskt kan finne og velge ønsket by fra listen.

WeatherTable er ansvarlig for å vise detaljert værinformasjon for den valgte byen. Denne komponenten presenterer et komplett værvarsel, inkludert temperatur, nedbør, vindforhold og værbeskrivelse, organisert i en tabellform. Ved å dele appen inn i disse to komponentene, har vi oppnådd en klar separasjon av funksjonalitet: den ene for byvalg, og den andre for å vise spesifikk informasjon om valgt by. Dette gjør grensesnittet oversiktlig og effektivt for brukeren.


Vi har valgt å implementere filtreringsmuligheter basert på ulike regioner i Norge, rangering etter høyest gjennomsnittstemperatur, favorittbyer, og hvorvidt det skal regne i en by. Dette valget er basert på vår antakelse om at det er naturlig for brukere å ønske tilgang til relevante og tilpassede data på en enkel måte. Filtreringskriteriene gir brukeren mulighet til å raskt hente ut nyttig informasjon.

Regioner og favoritter er samlet i en dropdown-meny på tabellen til høyre for å gjøre navigasjonen både intuitiv og enkel. For sortering mellom de ulike kriteriene har vi valgt å bruke knapper, da dette gir en direkte og brukervennlig interaksjonsform, samtidig som det tydelig markerer hvilke valg som er tilgjengelige for brukeren.


For å forbedre brukeropplevelsen har vi benyttet HTML Web Storage API. SessionStorage brukes til å lagre brukerens filtreringsvalg midlertidig, slik at disse opprettholdes ved en sideoppdatering. LocalStorage benyttes for å lagre favorittvalg permanent, slik at disse huskes selv om appen lukkes og åpnes på nytt ved en senere anledning.

For prettier konfigurasjonen var det ikke noen store krav fra noen på gruppen så vi brukte konfigurasjonen som ble
foreslått av foreleser. 

## Testing
Vi har valgt å teste appen grundig ved hjelp av snapshot-testing, prop- og state-tester, samt brukerinteraksjoner og mocking. Snapshot-testing sikrer at UI-komponentene forblir uendret over tid, mens prop- og state-tester validerer at dataflyten i komponentene fungerer som forventet. Brukerinteraksjoner testes for å sikre at appen reagerer riktig på klikk, valg og endringer. Vi bruker mocking for å teste appens oppførsel uten å være avhengig av eksterne API-kall. Dette gir oss trygghet i at appen fungerer som den skal under ulike scenarier.

Kjør testene ved å:

cd prosjek1

npm run test



## Kjøre prosjektet
Tilgjengelig på http://it2810-11.idi.ntnu.no/project1/ 

eventuelt

1. Klon dette repositoriet
2. cd prosjek1
3. npm install
4. npm run dev
5. Åpne http://localhost:5173/ 







