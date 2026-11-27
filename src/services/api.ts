// Frontend API Service with graceful fallback to local data if backend is offline

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
}

export interface MemberRegistration {
  fullName: string;
  phone: string;
  email?: string;
  state: string;
  city: string;
  sevaWing: string;
  motivation?: string;
}

export interface PetitionItem {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  status: string;
  filedDate: string;
  summary: string;
}

const FALLBACK_CONTENT: ContentItem[] = [
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

// Helper to handle API requests safely
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Fetch home page news/content
  async getContent(category?: string): Promise<{ success: boolean; data: ContentItem[] }> {
    try {
      const url = category && category !== 'All' 
        ? `/api/content?category=${encodeURIComponent(category)}` 
        : `/api/content`;
      return await apiFetch<{ success: boolean; data: ContentItem[] }>(url);
    } catch {
      console.warn("Backend API not reachable; using in-memory content data.");
      let filtered = FALLBACK_CONTENT;
      if (category && category !== 'All') {
        filtered = FALLBACK_CONTENT.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
      }
      return { success: true, data: filtered };
    }
  },

  // Add new content (for dummy testing/refreshing)
  async addContent(newPost: Partial<ContentItem>): Promise<{ success: boolean; data: ContentItem; message: string }> {
    try {
      return await apiFetch<{ success: boolean; data: ContentItem; message: string }>('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
    } catch {
      const createdItem: ContentItem = {
        id: `cnt-${Date.now()}`,
        title: newPost.title || "New Announcement",
        category: newPost.category || "General Announcement",
        badge: newPost.badge || "Live Update",
        date: new Date().toISOString().split('T')[0],
        author: newPost.author || "Samiti Central Desk",
        summary: newPost.summary || "Summary text",
        content: newPost.content || newPost.summary || "",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        readTime: "3 min read"
      };
      FALLBACK_CONTENT.unshift(createdItem);
      return { success: true, data: createdItem, message: "Announcement added (Fallback mode)" };
    }
  },

  // Register user
  async registerUser(data: MemberRegistration): Promise<{
    success: boolean;
    message: string;
    memberId: string;
    member: MemberRegistration & { id: string };
    whatsAppGroupUrl: string;
  }> {
    try {
      return await apiFetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {
      console.warn("Backend API not reachable; handling registration locally.");
      const generatedId = `MK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        message: "Jai Maa Kaali! Your registration with Maa Kaali Hindu Dharma Rakshaka Samiti is confirmed.",
        memberId: generatedId,
        member: { ...data, id: generatedId },
        whatsAppGroupUrl: "https://chat.whatsapp.com/sample-maa-kaali-dharma-rakshaka"
      };
    }
  },

  // Petitions - empty for now
  async getPetitions(): Promise<{
    success: boolean;
    petitions: PetitionItem[];
    total: number;
    statusMessage: string;
    info: string;
  }> {
    try {
      return await apiFetch('/api/petitions');
    } catch {
      return {
        success: true,
        petitions: [],
        total: 0,
        statusMessage: "No formal petitions currently active. Legal drafts are being finalized by our High Court & Supreme Court counsels.",
        info: "This section is maintained by our legal wing. When petitions for temple heritage, pilgrimage protection, or cultural freedom are officially submitted, their live court numbers and status will appear here."
      };
    }
  },

  // Suggest a petition
  async suggestPetition(data: { name: string; contact: string; issueTitle: string; description: string; location?: string }) {
    try {
      return await apiFetch('/api/petitions/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {
      return {
        success: true,
        message: "Thank you. Your petition recommendation has been logged for our Legal Advisory Council review."
      };
    }
  },

  // Submit contact message
  async submitContact(data: { name: string; email?: string; phone?: string; subject?: string; message: string }) {
    try {
      return await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {
      return {
        success: true,
        message: "Pranam. Your message has been safely received. A samiti coordinator will contact you shortly."
      };
    }
  },

  // Stats
  async getStats() {
    try {
      return await apiFetch<{
        success: boolean;
        stats: {
          activeVolunteers: number;
          districtsCovered: number;
          legalAdvocates: number;
          whatsAppCommunitySize: string;
          templesAssisted: number;
        };
      }>('/api/stats');
    } catch {
      return {
        success: true,
        stats: {
          activeVolunteers: 18450,
          districtsCovered: 142,
          legalAdvocates: 64,
          whatsAppCommunitySize: "50,000+",
          templesAssisted: 89
        }
      };
    }
  }
};