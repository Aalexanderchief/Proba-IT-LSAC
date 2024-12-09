# **Copy-Pasta: Become the Next ChefIT**

## **Descrierea proiectului**
Această aplicație web reprezintă o platformă culinară în care utilizatorii pot publica, căuta și descoperi rețete, având la dispoziție funcționalități precum autentificare, căutare avansată și votarea rețetelor. Aplicația este implementată cu un backend robust și un frontend "prietenos" pentru utilizator.

---

## **Task-uri completate**
Mai jos sunt prezentate toate funcționalitățile implementate (inclusiv bonusurile), împreună cu detalii despre cum au fost abordate.

### **1. Homepage**
- **Frontend:**
  - Implementare afișare dinamică pentru secțiunea “Top rated recipes.”
  - Crearea formularului de contact funcțional cu validare de date.
- **Backend:**
  - Endpoint pentru returnarea primelor 3 rețete, sortate descrescător după rating.
  - Valorile ratingurilor generate aleatoriu în stadiul inițial.

**Abordare:** Am utilizat componente React pentru a structura pagina. Afișarea rețetelor top-rated s-a realizat cu ajutorul unui API REST ce preia date din baza de date și le afișează în frontend folosind Axios.

---

### **2. Pagină de Profil**
- **Frontend:**
  - Crearea unui card care afișează informațiile utilizatorului logat.
  - Adăugarea unui buton funcțional care duce la pagina de adăugare rețete.
- **Backend:**
  - Endpoint care returnează detalii despre utilizatorul logat pe baza token-ului JWT primit la autentificare.

**Abordare:** Am utilizat MongoDB pentru a stoca informațiile utilizatorului autentificat și pentru a le afișa pe pagină.

---

### **3. Register & Login**
- **Frontend:**
  - Formulare interactive pentru înregistrare și autentificare cu validări de câmpuri.
  - Gestionarea stării utilizatorului folosind local storage pentru persistenta datelor.
- **Backend:**
  - Endpoint-uri pentru înregistrarea unui utilizator nou și autentificare.
  - Utilizare JWT pentru generarea și verificarea token-urilor de acces.

**Bonus:** Funcționalitatea “Forgot password” pentru resetarea parolei utilizatorului.
**Abordare:** Am utilizat bcrypt pentru a cripta parolele înainte de stocarea lor în baza de date și middleware-uri pentru validarea token-urilor.

---

### **4. Pagina de Rețete & Search**
- **Frontend:**
  - Afișare dinamică a rețetelor într-o interfață cu scroll infinit.
  - Implementarea unei bare de căutare și filtre pentru numărul de stele și sortare alfabetică.
- **Backend:**
  - Endpoint pentru listarea tuturor rețetelor din baza de date.
  - Funcționalitatea de votare (rating) pentru rețete.
  - Endpoint pentru ștergerea unei rețete create de utilizator.

**Bonus:** Restricționarea utilizatorilor de la votarea aceleiași rețete de mai multe ori, folosind o relație între entitățile "utilizatori" și "voturi".

**Abordare:** Am utilizat un context global pentru gestionarea filtrelor și sortării în frontend și am optimizat interogările backend pentru a reduce timpul de răspuns.

---

### **5. Pagina de Adăugare Rețete**
- **Frontend:**
  - Crearea unui formular pentru adăugarea de rețete, cu câmpuri pentru nume și descriere.
  - Mesaje de confirmare în cazul succesului sau erorii.
- **Backend:**
  - Endpoint pentru adăugarea unei noi rețete în baza de date.
  - Validarea datelor trimise de utilizator.


---

## **Ce am învățat**
1. **Lucru cu framework-uri și librării:**
   - React pentru frontend, utilizând componente și hooks.
   - Express.js pentru crearea API-urilor backend.
2. **Gestionarea bazelor de date:**
   - Crearea unei baze de date si popularea acesteia folosind MongoDB si Mongoose.
   - Optimizarea interogărilor SQL pentru performanță crescută.
3. **Securitatea aplicațiilor:**
   - Utilizarea JWT pentru autentificare și middleware-uri pentru protejarea endpoint-urilor.
   - Criptarea parolelor și validarea datelor utilizatorilor.
4. **Gestionarea proiectelor:**
   - Organizarea codului în module clare și reutilizabile.
   - Utilizarea unui repository GitHub pentru versionare și colaborare.

---

## **Cum să rulați aplicația**
1. **Clonați repository-ul GitHub:**
   ```bash
   git clone <link-repository>
   cd Proba-IT-LSAC
   ```
2. **Instalare dependințe:**
   ```bash
   npm install
   ```
3. **Pornirea aplicației:**
   - **Frontend:**
     ```bash
     npm run dev
     ```
   - **Backend:**
     ```bash
     cd Proba-IT-LSAC
     npm start
     ```

---  
