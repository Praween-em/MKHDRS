import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDb, db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kaali@admin2026';

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
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed)) || origin.includes('github.io') || origin.includes('railway.app')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
}));

app.use(express.json());

// Initialize database on boot
initDb().catch(err => console.error("Database initialization failed:", err));

// ================= PUBLIC API ENDPOINTS ================= //

// 1. Health check
app.get('/api/health', async (req, res) => {
  try {
    const contents = await db.getContents();
    const registrations = await db.getRegistrations();
    res.json({
      status: 'online',
      service: 'Maa Kaali Hindu Dharma Rakshaka Samiti Backend API',
      database: db.isPostgres() ? 'PostgreSQL (Railway Connected)' : 'JSON Persistence Mode',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      totalMembers: registrations.length,
      totalAnnouncements: contents.length
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// 2. GET /api/content - Fetch content for Home Page
app.get('/api/content', async (req, res) => {
  try {
    const { category, limit } = req.query;
    let result = await db.getContents(category);
    if (limit) {
      result = result.slice(0, parseInt(limit, 10));
    }
    res.json({
      success: true,
      total: result.length,
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/content - Publish announcement
app.post('/api/content', async (req, res) => {
  try {
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

    const saved = await db.addContent(newPost);
    res.status(201).json({
      success: true,
      message: "Announcement published successfully",
      data: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. PUT /api/content/:id - Update existing announcement
app.put('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, summary, content, badge, author } = req.body;
    const updated = await db.updateContent(id, { title, category, summary, content, badge, author });
    if (!updated) {
      return res.status(404).json({ success: false, error: "Announcement not found" });
    }
    res.json({ success: true, message: "Announcement updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. DELETE /api/content/:id - Delete announcement
app.delete('/api/content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteContent(id);
    res.json({ success: true, message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. POST /api/register - Member Registration
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, phone, email, state, city, sevaWing, motivation } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: "Full Name is required" });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: "WhatsApp / Phone number is required" });
    }

    const registrationId = `MK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newMember = {
      id: registrationId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : "Not provided",
      state: state || "India",
      city: city ? city.trim() : "General",
      sevaWing: sevaWing || "General Dharma Volunteer",
      motivation: motivation ? motivation.trim() : "Devotion to Maa Kaali and Protection of Sanatana Dharma",
      registeredAt: new Date().toISOString()
    };

    const saved = await db.addRegistration(newMember);

    res.status(201).json({
      success: true,
      message: "Jai Maa Kaali! Your registration with Maa Kaali Hindu Dharma Rakshaka Samiti is confirmed.",
      memberId: registrationId,
      member: saved,
      whatsAppGroupUrl: "https://chat.whatsapp.com/sample-maa-kaali-dharma-rakshaka"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. GET /api/register - List registered members
app.get('/api/register', async (req, res) => {
  try {
    const members = await db.getRegistrations();
    res.json({
      success: true,
      total: members.length,
      data: members
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. DELETE /api/register/:id - Remove member
app.delete('/api/register/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteRegistration(id);
    res.json({ success: true, message: "Member removed from registry" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. GET /api/petitions - Official petitions list
app.get('/api/petitions', async (req, res) => {
  try {
    const petitions = await db.getPetitions();
    res.json({
      success: true,
      petitions,
      total: petitions.length,
      statusMessage: petitions.length === 0
        ? "No formal petitions currently active. Legal drafts are being finalized by our High Court & Supreme Court counsels."
        : `${petitions.length} Public Interest Litigations actively pursued in Courts.`,
      info: "Maintained by our Vidhi Raksha Parishad. Tracking official case numbers, affidavits, and court dates."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. POST /api/petitions - Add official petition (Admin)
app.post('/api/petitions', async (req, res) => {
  try {
    const { title, court, caseNumber, status, filedDate, summary } = req.body;
    if (!title || !caseNumber) {
      return res.status(400).json({ success: false, error: "Title and Case Number are required" });
    }

    const newPetition = {
      id: `PET-${Date.now()}`,
      title: title.trim(),
      court: court || "Supreme Court of India",
      caseNumber: caseNumber.trim(),
      status: status || "Notice Issued",
      filedDate: filedDate || new Date().toISOString().split('T')[0],
      summary: summary || ""
    };

    const saved = await db.addPetition(newPetition);
    res.status(201).json({ success: true, message: "Court petition recorded", data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. DELETE /api/petitions/:id - Delete petition
app.delete('/api/petitions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deletePetition(id);
    res.json({ success: true, message: "Petition record deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 12. POST /api/petitions/suggest - Citizen recommendation
app.post('/api/petitions/suggest', async (req, res) => {
  try {
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
      status: "Pending Review",
      submittedAt: new Date().toISOString()
    };

    const saved = await db.addSuggestedPetition(suggestion);
    res.status(201).json({
      success: true,
      message: "Thank you. Your petition recommendation has been logged for our Legal Advisory Council review.",
      id: saved.id
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 13. GET /api/petitions/suggest - List citizen suggestions (Admin)
app.get('/api/petitions/suggest', async (req, res) => {
  try {
    const suggestions = await db.getSuggestedPetitions();
    res.json({ success: true, total: suggestions.length, data: suggestions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 14. PUT /api/petitions/suggest/:id - Update suggestion status
app.put('/api/petitions/suggest/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.updateSuggestedPetitionStatus(id, status);
    res.json({ success: true, message: `Suggestion status marked as ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 15. POST /api/contact - Inquiries
app.post('/api/contact', async (req, res) => {
  try {
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
      status: "Unread",
      receivedAt: new Date().toISOString()
    };

    const saved = await db.addContact(inquiry);
    res.status(201).json({
      success: true,
      message: "Pranam. Your message has been safely received. A samiti coordinator will contact you shortly."
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 16. GET /api/contact - List contact messages (Admin)
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await db.getContacts();
    res.json({ success: true, total: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 17. PUT /api/contact/:id - Mark contact inquiry status
app.put('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await db.updateContactStatus(id, status);
    res.json({ success: true, message: `Inquiry marked as ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 18. POST /api/donate - Record donation
app.post('/api/donate', async (req, res) => {
  try {
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
      createdAt: new Date().toISOString()
    };

    const saved = await db.addDonation(donationRecord);

    res.status(201).json({
      success: true,
      message: "Har Har Mahadev! Seva donation successfully recorded.",
      receipt: saved
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 19. GET /api/donate - Donations ledger & metrics
app.get('/api/donate', async (req, res) => {
  try {
    const donations = await db.getDonations();
    const totalAmount = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    res.json({
      success: true,
      totalDonationsCount: donations.length,
      totalAmountRaised: totalAmount,
      data: donations
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 20. GET /api/stats - Global statistics
app.get('/api/stats', async (req, res) => {
  try {
    const registrations = await db.getRegistrations();
    const petitions = await db.getPetitions();
    res.json({
      success: true,
      stats: {
        activeVolunteers: 18450 + registrations.length,
        districtsCovered: 142,
        legalAdvocates: 64,
        whatsAppCommunitySize: "50,000+",
        templesAssisted: 89,
        activePetitions: petitions.length,
        totalRegisteredOnPortal: registrations.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= ADMIN AUTH & DASHBOARD APIS ================= //

// 21. POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: "mkhdrs-auth-token-verified-2026",
      role: "Central Administrator",
      message: "Admin credentials verified"
    });
  } else {
    res.status(401).json({ success: false, error: "Incorrect Admin Password" });
  }
});

// 22. GET /api/admin/overview
app.get('/api/admin/overview', async (req, res) => {
  try {
    const members = await db.getRegistrations();
    const contents = await db.getContents();
    const petitions = await db.getPetitions();
    const suggestions = await db.getSuggestedPetitions();
    const contacts = await db.getContacts();
    const donations = await db.getDonations();
    const totalDonations = donations.reduce((acc, d) => acc + (parseFloat(d.amount) || 0), 0);

    res.json({
      success: true,
      data: {
        databaseEngine: db.isPostgres() ? 'PostgreSQL (Railway Connected)' : 'JSON Persistence (Fallback)',
        totalMembers: members.length,
        totalAnnouncements: contents.length,
        totalActivePetitions: petitions.length,
        totalSuggestedPetitions: suggestions.length,
        pendingSuggestions: suggestions.filter(s => s.status === 'Pending Review').length,
        totalInquiries: contacts.length,
        unreadInquiries: contacts.filter(c => c.status === 'Unread').length,
        totalDonationsRaised: totalDonations,
        totalDonationsCount: donations.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= STATIC SITE SERVING (FOR RAILWAY FULL-STACK DEPLOYMENT) ================= //
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  console.log(`Serving static production files from: ${distPath}`);
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🕉️ Maa Kaali Dharma Rakshaka Samiti Live Backend running on port ${PORT}`);
  console.log(`Database Mode: ${db.isPostgres() ? 'PostgreSQL' : 'Local JSON persistence'}`);
});
