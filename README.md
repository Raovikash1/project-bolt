# BABADHAM-A2Z CONSULTANCY - Job Portal

🕉️ **भगवान शिव के आशीर्वाद से** - A divine job portal connecting job seekers with employers across India.

## 🚀 Live Demo

**Website:** [https://babadham-a2zconsultancy.netlify.app](https://babadham-a2zconsultancy.netlify.app)

## ✨ Features

### 🎯 Multi-User System
- **Job Seekers** - Search and apply for jobs
- **Employers** - Post jobs and manage applications  
- **Admin Panel** - Complete platform management

### 🔐 Real Authentication
- Email/Password registration and login
- Phone OTP verification
- Secure user profiles with Supabase Auth
- Password reset functionality

### 💼 Job Management
- Advanced job posting with skills, requirements, benefits
- Real-time application tracking
- Job search with filters (location, type, salary)
- Application status management

### 🎨 Beautiful Design
- Divine Shiva-themed UI
- Responsive design for all devices
- Hindi + English bilingual support
- Professional animations and transitions

### 📊 Admin Features
- User management dashboard
- Job moderation and analytics
- Application monitoring
- System statistics and reports

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Icons:** Lucide React
- **Deployment:** Netlify
- **Notifications:** React Hot Toast

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd babadham-a2z-consultancy
npm install
```

### 2. Supabase Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Get Your Credentials:**
   - Go to Project Settings → API
   - Copy your `Project URL` and `anon public key`

3. **Update Environment Variables:**
   ```bash
   # Update .env file
   VITE_SUPABASE_URL=your-project-url-here
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set Up Database Schema:**
   The application uses the existing database schema with these main tables:
   - `profiles` - User profiles and information
   - `jobs` - Job postings
   - `applications` - Job applications
   - `admin_users` - Admin user management
   - `notifications` - User notifications

### 3. Run the Application
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🔑 Authentication Features

### Email/Password Authentication
- Secure user registration with email verification
- Login with email and password
- Password reset via email

### Phone OTP Authentication  
- SMS-based OTP verification
- Secure phone number authentication
- Fallback authentication method

### User Types
- **Job Seekers:** Browse jobs, apply, manage applications
- **Employers:** Post jobs, manage applications, view candidates
- **Admins:** Full platform management and analytics

## 📱 User Dashboards

### Job Seeker Dashboard
- Browse and search jobs
- Apply for positions
- Track application status
- Save favorite jobs
- Manage profile and resume

### Employer Dashboard
- Post new job openings
- Manage job listings
- Review applications
- Track hiring metrics
- Candidate management

### Admin Panel
- User management
- Job moderation
- Platform analytics
- System settings
- Content management

## 🌐 Deployment

The application is automatically deployed to Netlify:

1. **Connect Repository:** Link your GitHub repo to Netlify
2. **Environment Variables:** Set Supabase credentials in Netlify dashboard
3. **Build Settings:** 
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy:** Automatic deployment on every push

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- User authentication via Supabase Auth
- Secure API endpoints
- Input validation and sanitization
- HTTPS encryption

## 🎨 Design Philosophy

- **Divine Theme:** Inspired by Lord Shiva's blessings
- **User-Centric:** Intuitive and accessible design
- **Responsive:** Works perfectly on all devices
- **Bilingual:** Hindi and English support
- **Professional:** Production-ready UI/UX

## 📞 Support

For any issues or questions:
- **Developer:** Vikash
- **Email:** Contact through the website
- **Theme:** 🕉️ सर्वमुक्त शिव सत्य हैं, शिव सामर्थ्य अनंत

---

**🙏 भगवान शिव के आशीर्वाद से बनाया गया**  
*Made with Lord Shiva's Blessings*