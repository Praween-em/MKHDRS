import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Dummy Backend)
let registrations = [
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

let contents = [
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

// Requirement 4: "PETITIONS FILED BY US PAGE EMPTTY FOR NOW"
let petitions = [];

let contactMessages = [];

// ================= API ENDPOINTS ================= //

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Maa Kaali Hindu Dharma Rakshaka Samiti Backend API',
    timestamp: new Date().toISOString()
  });
});

// 1. GET /api/content - Fetch content for Home Page
app.get('/api/content', (req, res) => {
  const { category } = req.query;
  let result = contents;
  if (category && category !== 'All') {
    result = contents.filter(c => c.category.toLowerCase().includes(category.toString().toLowerCase()));
  }
  res.json({
    success: true,
    total: result.length,
    data: result
  });
});

// POST /api/content - Add new content / announcements
app.post('/api/content', (req, res) => {
  const { title, category, summary, content, badge, author } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ success: false, error: "Title and Summary are required" });
  }

  const newPost = {
    id: `cnt-${Date.now()}`,
    title,
    category: category || "General Announcement",
    badge: badge || "Update",
    date: new Date().toISOString().split('T')[0],
    author: author || "Samiti Central Desk",
    summary,
    content: content || summary,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read"
  };

  contents.unshift(newPost);
  res.status(201).json({
    success: true,
    message: "New dharma announcement published successfully",
    data: newPost
  });
});

// 2. POST /api/register - User Registration Form
app.post('/api/register', (req, res) => {
  const { fullName, phone, email, state, city, sevaWing, motivation } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({
      success: false,
      error: "Full name and WhatsApp/Phone number are required"
    });
  }

  const registrationId = `MK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newMember = {
    id: registrationId,
    fullName,
    phone,
    email: email || "Not provided",
    state: state || "India",
    city: city || "General",
    sevaWing: sevaWing || "General Dharma Volunteer",
    motivation: motivation || "Devotion to Maa Kaali and Protection of Sanatana Dharma",
    registeredAt: new Date().toISOString()
  };

  registrations.unshift(newMember);

  res.status(201).json({
    success: true,
    message: "Jai Maa Kaali! Your registration with Maa Kaali Hindu Dharma Rakshaka Samiti is confirmed.",
    memberId: registrationId,
    member: newMember,
    whatsAppGroupUrl: "https://chat.whatsapp.com/sample-maa-kaali-dharma-rakshaka"
  });
});

// GET /api/register - View registered members list
app.get('/api/register', (req, res) => {
  res.json({
    success: true,
    total: registrations.length,
    data: registrations
  });
});

// 3. GET /api/petitions - Empty for now as requested
app.get('/api/petitions', (req, res) => {
  res.json({
    success: true,
    petitions: petitions,
    total: petitions.length,
    statusMessage: "No formal petitions currently active. Legal drafts are being finalized by our High Court & Supreme Court counsels.",
    info: "This section is maintained by our legal wing. When petitions for temple heritage, pilgrimage protection, or cultural freedom are officially submitted, their live court numbers and status will appear here."
  });
});

// POST /api/petitions/suggest - Citizen petition suggestion
app.post('/api/petitions/suggest', (req, res) => {
  const { name, contact, issueTitle, description, location } = req.body;
  if (!issueTitle || !description) {
    return res.status(400).json({ success: false, error: "Issue title and description are required" });
  }

  res.status(201).json({
    success: true,
    message: "Thank you. Your petition recommendation has been logged for our Legal Advisory Council review."
  });
});

// 4. POST /api/contact - Contact inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Name and message are required" });
  }

  const inquiry = {
    id: `INQ-${Date.now()}`,
    name,
    email,
    phone,
    subject: subject || "General Inquiry",
    message,
    receivedAt: new Date().toISOString()
  };

  contactMessages.unshift(inquiry);

  res.status(201).json({
    success: true,
    message: "Pranam. Your message has been safely received. A samiti coordinator will contact you shortly."
  });
});

// 5. GET /api/stats - Community metrics
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      activeVolunteers: 18450 + registrations.length,
      districtsCovered: 142,
      legalAdvocates: 64,
      whatsAppCommunitySize: "50,000+",
      templesAssisted: 89
    }
  });
});

app.listen(PORT, () => {
  console.log(`🕉️ Maa Kaali Dharma Rakshaka Samiti Backend running on http://localhost:${PORT}`);
});