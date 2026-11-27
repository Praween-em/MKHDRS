# Maa Kaali Hindu Dharma Rakshaka Samiti
## माँ काली हिन्दू धर्म रक्षक समिति

Official web portal and community platform for **Maa Kaali Hindu Dharma Rakshaka Samiti**, dedicated to defending Sanatana Dharma, preserving temple ecosystems, filing constitutional legal petitions, and uniting volunteers.

---

## 🚩 Features Implemented

1. **Sacred Maa Kaali Iconography & Logo**:
   - High-resolution sacred depiction of Maa Kaali in the Hero Section.
   - Handcrafted ornate vector emblem (`public/logo.svg`) used across navigation, badges, and digital ID cards.
   - Traditional Sanskrit shlokas (*"ॐ क्रीं कालिकायै नमः"*, *"धर्मो रक्षति रक्षितः"*).

2. **Dharma Volunteer Registration Form (Backend API Integration)**:
   - Dedicated page at `/register` and quick actions across the website.
   - Sends registration data to `POST /api/register` with validation.
   - Generates an instant digital **Dharma Rakshak ID Card** with unique Member ID.

3. **Dynamic Content & Announcements Feed**:
   - Live updates section on the Home page powered by `GET /api/content`.
   - Category filtering (*Legal & Protection*, *Spiritual & Sammelan*, *Community Network*, *Youth Empowerment*).
   - "Refresh Feed" button and "+ Add Live Announcement" modal demonstrating real-time `POST /api/content` posting.

4. **All Required Pages Built**:
   - **Home Page (`/`)**: Hero section with Maa Kaali, latest API announcements, four pillars of Dharma Raksha, WhatsApp banners, and community highlights.
   - **About Page (`/about`)**: Divine inspiration of Maa Mahakali, vision, mission, and working wings (*Vidhi Raksha Parishad*, *Mandir Punarutthan*, *Yuva Shakti*, *Sanchar*).
   - **Petitions Filed By Us (`/petitions`)**: Clean, dignified empty state as requested (*"PETITIONS FILED BY US PAGE EMPTY FOR NOW"*), with legal research roadmap and an interactive petition suggestion form.
   - **Support The Cause & Donate To Us (`/support`)**: Complete support page containing a dedicated **"Donate to Us"** section on the same page with preset amounts, UPI ID, QR code simulator, bank account details, and an instant printable donation receipt generator.
   - **Contact Us (`/contact`)**: Karyalaya addresses, national emergency numbers, and interactive inquiry form connected to `POST /api/contact`.
   - **Terms & Conditions (`/terms`)**: Volunteer code of conduct, legal charter, and privacy guidelines.

5. **WhatsApp Community Integration**:
   - Floating quick-access WhatsApp button on the bottom right with pulsating aura.
   - Direct header ticker link, banner buttons, and modal dialog directing users to the official WhatsApp community group.

---

## 🚀 How to Run the Project & View the Output

### Option 1: Run Full-Stack (Frontend + Backend Concurrently)
To run both the Vite React application and the Express API server together:

```bash
npm run dev:all
```

- **Frontend Website**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

### Option 2: Run Separately in Two Terminals

**Terminal 1 (Backend API Server):**
```bash
npm run server
```
*Starts the Express server on port 5000 serving `/api/content`, `/api/register`, `/api/petitions`, `/api/contact`, and `/api/stats`.*

**Terminal 2 (Frontend Client):**
```bash
npm run dev
```
*Starts Vite development server on [http://localhost:5173](http://localhost:5173).*

---

### Option 3: Production Build & Preview
To test the optimized production build:

```bash
npm run build
npm run preview
```

---

## 🛠️ Project Structure

```
├── public/
│   └── logo.svg                 # Ornate Maa Kaali Logo & Emblem
├── server/
│   └── index.js                 # Express Dummy Backend API (Content, Registration, Petitions)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Responsive navigation with WhatsApp link & Logo
│   │   ├── Footer.tsx           # Sanskrit shlokas, quick links, helpline
│   │   └── WhatsAppButton.tsx   # Floating WhatsApp button & modal
│   ├── pages/
│   │   ├── Home.tsx             # Hero with Maa Kaali image, live feed, pillars
│   │   ├── About.tsx            # Mission, vision, Maa Kaali heritage
│   │   ├── Register.tsx         # Volunteer form submitting to backend API
│   │   ├── Petitions.tsx        # Empty state dashboard & suggestion form
│   │   ├── Support.tsx          # Support cause + Donate section on same page
│   │   ├── Contact.tsx          # Emergency desk, form, office coordinates
│   │   └── Terms.tsx            # Terms & conditions, code of conduct
│   ├── services/
│   │   └── api.ts               # API service with automatic graceful fallback
│   ├── App.tsx                  # React Router configuration
│   ├── index.css                # Tailwind CSS & sacred glow styling
│   └── main.tsx                 # Entry mount
├── index.html                   # HTML template with Google Fonts (Cinzel, Inter)
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Saffron, crimson, gold color theme
└── vite.config.ts               # Vite bundler & API reverse proxy configuration
```
