
# Volonterska platforma

Ovaj projekt je web aplikacija izrađena u Reactu koja omogućuje pregled i upravljanje aktivnostima i organizacijama povezanima s volonterskim radom. Koristi moderni razvojni stack (React, Vite, Google Maps API) za interaktivno korisničko iskustvo.

---

## Ključne funkcionalnosti

**Pregled aktivnosti i organizacija**
Korisnici mogu pregledavati listu volonterskih aktivnosti i organizacija s osnovnim detaljima i slikama.

**Interaktivna karta**
Aplikacija integrira Google Maps API (kroz `@react-google-maps/api`) za vizualizaciju lokacija aktivnosti na mapi.

**Navigacija između stranica**
React Router omogućuje jednostavnu navigaciju između Home stranice, liste aktivnosti i liste organizacija.

**Globalno stanje korisnika**
Pomoću React Contexta (`UserContext.jsx`) aplikacija održava globalne podatke o korisniku koji su dostupni kroz sve komponente.

**Moderna vizualizacija**
Projekt koristi CSS za prilagodbu stilova (komponente kao što su `ActivityList.css`, `Organizations.css`, `VolonteerList.css`).

---

## Struktura projekta

```
Zavrτni_tečaj/
├── public/                  # Statički assets (favicon, slike, itd.)
├── src/                     # Glavne React komponente
│   ├── App.jsx              # Glavna komponenta s rutiranjem
│   ├── Home.jsx             # Početna stranica
│   ├── ActivityList.jsx     # Prikaz liste aktivnosti
│   ├── Organizations.jsx    # Prikaz liste organizacija
│   ├── Map.jsx              # Interaktivna Google Maps karta
│   ├── VolonteerList.jsx    # Lista volontera
│   ├── UserContext.jsx      # React Context za globalno stanje
│   ├── assets/              # Slike i statički sadržaji
│   ├── *.css                # Stilizacija komponenti
│   └── main.jsx             # Ulazna točka React aplikacije
├── package.json             # Ovisnosti i konfiguracije
├── vite.config.js           # Konfiguracija za Vite
└── README.md                # Ovaj dokument
```

---

## Instalacija i pokretanje

1. Klonirajte repozitorij:

```bash
git clone <URL-repozitorija>
cd <ime-repozitorija>
```

2. Instalirajte potrebne pakete:

```bash
npm install
```

3. Pokrenite razvojni server:

```bash
npm run dev
```

4. Otvorite aplikaciju u pregledniku na:

```
http://localhost:5173
```

---

## Tehnologije

* **React 18** – Glavni frontend framework
* **React Router Dom** – Za upravljanje rutama i navigaciju
* **@react-google-maps/api** – Za integraciju Google Maps unutar Reacta
* **Vite** – Brzi build alat i razvojni server
* **React Context** – Za globalno upravljanje stanjem korisnika
* **ESLint** – Za analizu i održavanje kvalitete koda
* **CSS** – Stilizacija komponenti

---

## Deployment smjernice

Ako želite aplikaciju postaviti na hosting servis kao što su **Vercel** ili **Netlify**:

1. Kreirajte build za produkciju:

```bash
npm run build
```

2. Deploy direktorij:

* Sadržaj direktorija `dist/` postavite kao build za deployment.
* Na Vercelu ili Netlifyu odaberite build command `npm run build` i publish direktorij `dist`.

---

## Dodatne napomene

* Google Maps API ključ trebat će konfigurirati unutar `Map.jsx` (ili u `.env` datoteci ako koristiš varijable okoline).
* Ako se planira proširivati aplikaciju (npr. korisnički računi ili naprednije statistike), preporuča se dodati back-end API ili koristiti servis poput Firebasea.

---
