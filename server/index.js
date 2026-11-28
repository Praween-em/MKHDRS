import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data persistence directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for persistent JSON storage
function readData(fileName, defaultData) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return defaultData;
  }
}

function writeData(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${fileName}:`, err);
  }
}

// Initial seed data
const initialContents = [
  {
    id: "cnt-01",
    title: "Maa Kaali Dharma Rakshaka Samiti Launches State-wide Temple Legal Defense Cell",
    category: "Legal & Protection",
    badge: "Urgent Action",
    date: "2026-11-25",
    author: "Central Legal Wing",
    summary: "Our panel of advocates has established a 24/7 legal helpline to safeguard ancient Hindu shrines and resolve illegal encroachment disputes.",
    content: "The Central Working Committee has approved the formation of specialized legal teams across all districts. Advocate members will provide pro-bono assistance to local temple management trusts and devotee collectives to preserve temple land and rituals.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read"
  },
  {
    id: "cnt-02",
    title: "Grand Maa Kaali Maha Yajna & Dharma Jagaran Sammelan Announced",
    category: "Spiritual & Sammelan",
    badge: "Upcoming Event",
    date: "2026-11-24",
    author: "Spiritual Guidance Council",
    summary: "Over 10,000 devotees and dharma rakshaks to assemble for Vedic chanting, Trishul Diksha, and youth leadership workshops.",
    content: "Under the divine blessings of Maa Mahakali, the samiti invites all Sanatani brothers and sisters to unite for the historic Maha Yajna. Workshops will cover Vedic ethics, community resilience, and cultural defense.",
    image: "https://images.unsplash.com/photo-1609803384069-1cac50e97905?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read"
  },
  {
    id: "cnt-03",
    title: "National Digital WhatsApp Network Expands to 100+ District Hubs",
    category: "Community Network",
    badge: "Network Alert",
    date: "2026-11-22",
    author: "IT & Media Cell",
    summary: "Connect immediately with your regional coordinators, get real-time dharma alerts, and participate in local seva drives.",
    content: "Our unified WhatsApp groups allow instant verified communication, combating misinformation and organizing rapid peaceful legal representation whenever Sanatana civil rights are compromised.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80",
    readTime: "2 min read"
  },
  {
    id: "cnt-04",
    title: "Youth Dharma Rakshak Training: Preserving Rituals and Cultural Pride",
    category: "Youth Empowerment",
    badge: "Training",
    date: "2026-11-18",
    author: "Youth Wing Coordinators",
    summary: "Training modern students and professionals in Shastra study, self-discipline, and peaceful constitutional activism.",
    content: "Bridging the timeless wisdom of the Upanishads and Bhagavad Gita with modern civic tools, our youth wing trains volunteers to champion dharma in educational and digital spaces.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read"
  }
];

const initialRegistrations = [
  {
    id: "MK-2026-1001",
    fullName: "Aarav Sharma",
    phone: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    state: "Uttar Pradesh",
    city: "Varanasi",
    sevaWing: "Legal & Advocacy",
    motivation: "Dedicated to the defense and legal protection of ancient temples and Sanatana values.",
    registeredAt: "2026-11-20T10:15:00Z"
  },
  {
    id: "MK-2026-1002",
    fullName: "Priya Sengupta",
    phone: "+91 98111 22334",
    email: "priya.sen@example.com",
    state: "West Bengal",
    city: "Kolkata",
    sevaWing: "Dharma Awareness & Media",
    motivation: "Spreading awareness of Maa Kaali Shakti traditions and spiritual heritage among youth.",
    registeredAt: "2026-11-22T14:30:00Z"
  }
];

// Load persisted data
let contents = readData('contents.json', initialContents);
let registrations = readData('registrations.json', initialRegistrations);
let petitions = readData('petitions.json', []);
let suggestedPetitions = readData('suggested_petitions.json', []);
let contactMessages = readData('contacts.json', []);
let donations = readData('donations.json', [
  {
    id: "MK-DON-847291",
    donorName: "Anand Kumar",
    amount: 2100,
    purpose: "Temple Legal Defense & Advocacy",
    phone: "+91 98765 11111",
    date: "2026-11-24",
    transactionId: "TXN-UPI-982147102"
  }
]);

// CORS configuration for local development and live domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://praween-em.github.io'
];

if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(',').forEach(o => allowedOrigins.push(o.trim()));
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed)) || origin.includes('github.io')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for public APIs
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ================= API ENDPOINTS ================= //

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Maa Kaali Hindu Dharma Rakshaka Samiti Live Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    totalMembers: registrations.length,
    totalAnnouncements: contents.length
  });
});

// 2. GET /api/content - Fetch content for Home Page
app.get('/api/content', (req, res) => {
  const { category, limit } = req.query;
  let result = contents;
  if (category && category !== 'All') {
    result = contents.filter(c => c.category.toLowerCase().includes(category.toString().toLowerCase()));
  }
  if (limit) {
    result = result.slice(0, parseInt(limit, 10));
  }
  res.json({
    success: true,
    total: result.length,
    data: result
  });
});

// 3. POST /api/content - Publish new announcement / news
app.post('/api/content', (req, res) => {
  const { title, category, summary, content, badge, author, image } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ success: false, error: "Title and Summary are required" });
  }

  const newPost = {
    id: `cnt-${Date.now()}`,
    title: title.trim(),
    category: category || "General Announcement",
    badge: badge || "Update",
    date: new Date().toISOString().split('T')[0],
    author: author || "Samiti Central Desk",
    summary: summary.trim(),
    content: (content || summary).trim(),
    image: image || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read"
  };

  contents.unshift(newPost);
  writeData('contents.json', contents);

  res.status(201).json({
    success: true,
    message: "New dharma announcement published successfully",
    data: newPost
  });
});

// 4. POST /api/register - User Registration Form
app.post('/api/register', (req, res) => {
  const { fullName, phone, email, state, city, sevaWing, motivation } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, error: "Full Name is required" });
  }
  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, error: "WhatsApp / Phone number is required" });
  }

  // Basic phone sanitization
  const cleanedPhone = phone.trim();

  const registrationId = `MK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newMember = {
    id: registrationId,
    fullName: fullName.trim(),
    phone: cleanedPhone,
    email: email ? email.trim() : "Not provided",
    state: state || "India",
    city: city ? city.trim() : "General",
    sevaWing: sevaWing || "General Dharma Volunteer",
    motivation: motivation ? motivation.trim() : "Devotion to Maa Kaali and Protection of Sanatana Dharma",
    registeredAt: new Date().toISOString()
  };

  registrations.unshift(newMember);
  writeData('registrations.json', registrations);

  res.status(201).json({
    success: true,
    message: "Jai Maa Kaali! Your registration with Maa Kaali Hindu Dharma Rakshaka Samiti is confirmed.",
    memberId: registrationId,
    member: newMember,
    whatsAppGroupUrl: "https://chat.whatsapp.com/sample-maa-kaali-dharma-rakshaka"
  });
});

// 5. GET /api/register - List registered members (for admin preview / count)
app.get('/api/register', (req, res) => {
  res.json({
    success: true,
    total: registrations.length,
    data: registrations
  });
});

// 6. GET /api/petitions - Empty for now as requested
app.get('/api/petitions', (req, res) => {
  res.json({
    success: true,
    petitions: petitions,
    total: petitions.length,
    statusMessage: "No formal petitions currently active. Legal drafts are being finalized by our High Court & Supreme Court counsels.",
    info: "This section is maintained by our legal wing. When petitions for temple heritage, pilgrimage protection, or cultural freedom are officially submitted, their live court numbers and status will appear here."
  });
});

// 7. POST /api/petitions/suggest - Citizen petition recommendation
app.post('/api/petitions/suggest', (req, res) => {
  const { name, contact, issueTitle, description, location } = req.body;
  if (!issueTitle || !description) {
    return res.status(400).json({ success: false, error: "Issue title and description are required" });
  }

  const suggestion = {
    id: `SUGG-${Date.now()}`,
    name: name || "Anonymous Devotee",
    contact: contact || "Not provided",
    issueTitle: issueTitle.trim(),
    description: description.trim(),
    location: location || "India",
    submittedAt: new Date().toISOString()
  };

  suggestedPetitions.unshift(suggestion);
  writeData('suggested_petitions.json', suggestedPetitions);

  res.status(201).json({
    success: true,
    message: "Thank you. Your petition recommendation has been logged for our Legal Advisory Council review.",
    id: suggestion.id
  });
});

// 8. POST /api/contact - Contact inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Name and message are required" });
  }

  const inquiry = {
    id: `INQ-${Date.now()}`,
    name: name.trim(),
    email: email ? email.trim() : "Not provided",
    phone: phone ? phone.trim() : "Not provided",
    subject: subject || "General Inquiry",
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  contactMessages.unshift(inquiry);
  writeData('contacts.json', contactMessages);

  res.status(201).json({
    success: true,
    message: "Pranam. Your message has been safely received. A samiti coordinator will contact you shortly."
  });
});

// 9. GET /api/contact - Admin view inquiries
app.get('/api/contact', (req, res) => {
  res.json({
    success: true,
    total: contactMessages.length,
    data: contactMessages
  });
});

// 10. POST /api/donate - Record voluntary seva donation & generate official receipt
app.post('/api/donate', (req, res) => {
  const { donorName, amount, phone, pan, purpose, paymentMethod } = req.body;
  const numAmount = parseFloat(amount);

  if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ success: false, error: "Valid donation amount is required" });
  }

  const receiptNumber = `MK-DON-${Date.now().toString().slice(-6)}`;
  const transactionId = `TXN-UPI-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const donationRecord = {
    id: receiptNumber,
    donorName: (donorName && donorName.trim()) || "Devoted Sanatani",
    amount: numAmount,
    phone: phone || "Not provided",
    pan: pan ? pan.toUpperCase() : "Not provided",
    purpose: purpose || "Temple Legal Defense & Advocacy",
    paymentMethod: paymentMethod || "UPI / Online",
    transactionId,
    date: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    timestamp: new Date().toISOString()
  };

  donations.unshift(donationRecord);
  writeData('donations.json', donations);

  res.status(201).json({
    success: true,
    message: "Har Har Mahadev! Seva donation successfully recorded.",
    receipt: donationRecord
  });
});

// 11. GET /api/donate - Donation metrics
app.get('/api/donate', (req, res) => {
  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  res.json({
    success: true,
    totalDonationsCount: donations.length,
    totalAmountRaised: totalAmount,
    recentDonors: donations.slice(0, 10).map(d => ({
      donorName: d.donorName,
      amount: d.amount,
      purpose: d.purpose,
      date: d.date
    }))
  });
});

// 12. GET /api/stats - Community metrics
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      activeVolunteers: 18450 + registrations.length,
      districtsCovered: 142,
      legalAdvocates: 64,
      whatsAppCommunitySize: "50,000+",
      templesAssisted: 89,
      totalRegisteredOnPortal: registrations.length
    }
  });
});

// ================= STATIC SITE SERVING (FOR FULLSTACK CLOUD DEPLOYMENT) ================= //
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log(`Serving static production files from: ${distPath}`);
  app.use(express.static(distPath));

  // Catch-all route to serve index.html for client-side routing
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🕉️ Maa Kaali Dharma Rakshaka Samiti Live Backend running on http://localhost:${PORT}`);
});
