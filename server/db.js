import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// JSON fallback helpers
function readJson(fileName, defaultData) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return defaultData;
  }
}

function writeJson(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${fileName}:`, err);
  }
}

// PostgreSQL connection setup
let pool = null;
const isPostgresConfigured = Boolean(process.env.DATABASE_URL);

if (isPostgresConfigured) {
  console.log("Connecting to PostgreSQL database via DATABASE_URL...");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
  });
} else {
  console.log("No DATABASE_URL found. Operating in local JSON file persistence mode.");
}

// Initialize PostgreSQL schema if connected
export async function initDb() {
  if (!pool) return;

  try {
    const client = await pool.connect();
    console.log("✓ Connected to PostgreSQL successfully. Initializing tables...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS contents (
        id VARCHAR(64) PRIMARY KEY,
        title TEXT NOT NULL,
        category VARCHAR(100),
        badge VARCHAR(50),
        date VARCHAR(50),
        author VARCHAR(100),
        summary TEXT NOT NULL,
        content TEXT,
        image TEXT,
        read_time VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS registrations (
        id VARCHAR(64) PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(100),
        state VARCHAR(100),
        city VARCHAR(100),
        seva_wing VARCHAR(100),
        motivation TEXT,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS petitions (
        id VARCHAR(64) PRIMARY KEY,
        title TEXT NOT NULL,
        court VARCHAR(100),
        case_number VARCHAR(100),
        status VARCHAR(50),
        filed_date VARCHAR(50),
        summary TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS suggested_petitions (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100),
        contact VARCHAR(100),
        issue_title TEXT NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Pending Review',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(50),
        subject VARCHAR(150),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'Unread',
        received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS donations (
        id VARCHAR(64) PRIMARY KEY,
        donor_name VARCHAR(150),
        amount NUMERIC(12,2) NOT NULL,
        phone VARCHAR(50),
        pan VARCHAR(50),
        purpose VARCHAR(150),
        payment_method VARCHAR(100),
        transaction_id VARCHAR(100),
        date VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if contents table is empty; if so, seed default announcements
    const contentsCheck = await client.query('SELECT COUNT(*) FROM contents');
    if (parseInt(contentsCheck.rows[0].count, 10) === 0) {
      console.log("Seeding default announcements into PostgreSQL...");
      const seeds = [
        {
          id: "cnt-01",
          title: "Maa Kaali Dharma Rakshaka Samiti Launches State-wide Temple Legal Defense Cell",
          category: "Legal & Protection",
          badge: "Urgent Action",
          date: "2026-11-25",
          author: "Central Legal Wing",
          summary: "Our panel of advocates has established a 24/7 legal helpline to safeguard ancient Hindu shrines and resolve illegal encroachment disputes.",
          content: "The Central Working Committee has approved the formation of specialized legal teams across all districts.",
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
          content: "Under the divine blessings of Maa Mahakali, the samiti invites all Sanatani brothers and sisters to unite.",
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
          content: "Our unified WhatsApp groups allow instant verified communication, combating misinformation and organizing rapid peaceful legal representation.",
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
          content: "Bridging the timeless wisdom of the Upanishads and Bhagavad Gita with modern civic tools.",
          image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
          readTime: "5 min read"
        }
      ];

      for (const item of seeds) {
        await client.query(`
          INSERT INTO contents (id, title, category, badge, date, author, summary, content, image, read_time)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [item.id, item.title, item.category, item.badge, item.date, item.author, item.summary, item.content, item.image, item.readTime]);
      }
    }

    client.release();
    console.log("✓ PostgreSQL Database schema successfully verified and ready.");
  } catch (err) {
    console.error("PostgreSQL initialization error (will use JSON fallback):", err);
    pool = null; // Revert to JSON mode if connection fails
  }
}

// Unified Database Repository with automatic Postgres / JSON selection
export const db = {
  isPostgres: () => Boolean(pool),

  // Contents
  async getContents(category) {
    if (pool) {
      const query = category && category !== 'All'
        ? 'SELECT * FROM contents WHERE LOWER(category) LIKE $1 ORDER BY created_at DESC'
        : 'SELECT * FROM contents ORDER BY created_at DESC';
      const params = category && category !== 'All' ? [`%${category.toLowerCase()}%`] : [];
      const res = await pool.query(query, params);
      return res.rows.map(r => ({
        id: r.id,
        title: r.title,
        category: r.category,
        badge: r.badge,
        date: r.date,
        author: r.author,
        summary: r.summary,
        content: r.content,
        image: r.image,
        readTime: r.read_time
      }));
    }
    const all = readJson('contents.json', []);
    if (category && category !== 'All') {
      return all.filter(c => c.category && c.category.toLowerCase().includes(category.toLowerCase()));
    }
    return all;
  },

  async addContent(item) {
    if (pool) {
      await pool.query(`
        INSERT INTO contents (id, title, category, badge, date, author, summary, content, image, read_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [item.id, item.title, item.category, item.badge, item.date, item.author, item.summary, item.content, item.image, item.readTime]);
      return item;
    }
    const all = readJson('contents.json', []);
    all.unshift(item);
    writeJson('contents.json', all);
    return item;
  },

  async updateContent(id, updates) {
    if (pool) {
      await pool.query(`
        UPDATE contents SET title = $1, category = $2, badge = $3, summary = $4, content = $5, author = $6
        WHERE id = $7
      `, [updates.title, updates.category, updates.badge, updates.summary, updates.content, updates.author, id]);
      return { id, ...updates };
    }
    const all = readJson('contents.json', []);
    const idx = all.findIndex(c => c.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...updates };
      writeJson('contents.json', all);
      return all[idx];
    }
    return null;
  },

  async deleteContent(id) {
    if (pool) {
      await pool.query('DELETE FROM contents WHERE id = $1', [id]);
      return true;
    }
    let all = readJson('contents.json', []);
    all = all.filter(c => c.id !== id);
    writeJson('contents.json', all);
    return true;
  },

  // Registrations / Members
  async getRegistrations() {
    if (pool) {
      const res = await pool.query('SELECT * FROM registrations ORDER BY registered_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        fullName: r.full_name,
        phone: r.phone,
        email: r.email,
        state: r.state,
        city: r.city,
        sevaWing: r.seva_wing,
        motivation: r.motivation,
        registeredAt: r.registered_at
      }));
    }
    return readJson('registrations.json', []);
  },

  async addRegistration(member) {
    if (pool) {
      await pool.query(`
        INSERT INTO registrations (id, full_name, phone, email, state, city, seva_wing, motivation)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [member.id, member.fullName, member.phone, member.email, member.state, member.city, member.sevaWing, member.motivation]);
      return member;
    }
    const all = readJson('registrations.json', []);
    all.unshift(member);
    writeJson('registrations.json', all);
    return member;
  },

  async deleteRegistration(id) {
    if (pool) {
      await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
      return true;
    }
    let all = readJson('registrations.json', []);
    all = all.filter(m => m.id !== id);
    writeJson('registrations.json', all);
    return true;
  },

  // Petitions
  async getPetitions() {
    if (pool) {
      const res = await pool.query('SELECT * FROM petitions ORDER BY created_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        title: r.title,
        court: r.court,
        caseNumber: r.case_number,
        status: r.status,
        filedDate: r.filed_date,
        summary: r.summary
      }));
    }
    return readJson('petitions.json', []);
  },

  async addPetition(petition) {
    if (pool) {
      await pool.query(`
        INSERT INTO petitions (id, title, court, case_number, status, filed_date, summary)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [petition.id, petition.title, petition.court, petition.caseNumber, petition.status, petition.filedDate, petition.summary]);
      return petition;
    }
    const all = readJson('petitions.json', []);
    all.unshift(petition);
    writeJson('petitions.json', all);
    return petition;
  },

  async deletePetition(id) {
    if (pool) {
      await pool.query('DELETE FROM petitions WHERE id = $1', [id]);
      return true;
    }
    let all = readJson('petitions.json', []);
    all = all.filter(p => p.id !== id);
    writeJson('petitions.json', all);
    return true;
  },

  // Suggested Petitions
  async getSuggestedPetitions() {
    if (pool) {
      const res = await pool.query('SELECT * FROM suggested_petitions ORDER BY submitted_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        name: r.name,
        contact: r.contact,
        issueTitle: r.issue_title,
        description: r.description,
        location: r.location,
        status: r.status,
        submittedAt: r.submitted_at
      }));
    }
    return readJson('suggested_petitions.json', []);
  },

  async addSuggestedPetition(suggestion) {
    if (pool) {
      await pool.query(`
        INSERT INTO suggested_petitions (id, name, contact, issue_title, description, location, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [suggestion.id, suggestion.name, suggestion.contact, suggestion.issueTitle, suggestion.description, suggestion.location, suggestion.status || 'Pending Review']);
      return suggestion;
    }
    const all = readJson('suggested_petitions.json', []);
    all.unshift(suggestion);
    writeJson('suggested_petitions.json', all);
    return suggestion;
  },

  async updateSuggestedPetitionStatus(id, status) {
    if (pool) {
      await pool.query('UPDATE suggested_petitions SET status = $1 WHERE id = $2', [status, id]);
      return true;
    }
    const all = readJson('suggested_petitions.json', []);
    const item = all.find(s => s.id === id);
    if (item) {
      item.status = status;
      writeJson('suggested_petitions.json', all);
    }
    return true;
  },

  // Contacts
  async getContacts() {
    if (pool) {
      const res = await pool.query('SELECT * FROM contacts ORDER BY received_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        subject: r.subject,
        message: r.message,
        status: r.status,
        receivedAt: r.received_at
      }));
    }
    return readJson('contacts.json', []);
  },

  async addContact(inquiry) {
    if (pool) {
      await pool.query(`
        INSERT INTO contacts (id, name, email, phone, subject, message, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [inquiry.id, inquiry.name, inquiry.email, inquiry.phone, inquiry.subject, inquiry.message, inquiry.status || 'Unread']);
      return inquiry;
    }
    const all = readJson('contacts.json', []);
    all.unshift(inquiry);
    writeJson('contacts.json', all);
    return inquiry;
  },

  async updateContactStatus(id, status) {
    if (pool) {
      await pool.query('UPDATE contacts SET status = $1 WHERE id = $2', [status, id]);
      return true;
    }
    const all = readJson('contacts.json', []);
    const item = all.find(c => c.id === id);
    if (item) {
      item.status = status;
      writeJson('contacts.json', all);
    }
    return true;
  },

  // Donations
  async getDonations() {
    if (pool) {
      const res = await pool.query('SELECT * FROM donations ORDER BY created_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        donorName: r.donor_name,
        amount: parseFloat(r.amount),
        phone: r.phone,
        pan: r.pan,
        purpose: r.purpose,
        paymentMethod: r.payment_method,
        transactionId: r.transaction_id,
        date: r.date,
        createdAt: r.created_at
      }));
    }
    return readJson('donations.json', []);
  },

  async addDonation(donation) {
    if (pool) {
      await pool.query(`
        INSERT INTO donations (id, donor_name, amount, phone, pan, purpose, payment_method, transaction_id, date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [donation.id, donation.donorName, donation.amount, donation.phone, donation.pan, donation.purpose, donation.paymentMethod, donation.transactionId, donation.date]);
      return donation;
    }
    const all = readJson('donations.json', []);
    all.unshift(donation);
    writeJson('donations.json', all);
    return donation;
  }
};
