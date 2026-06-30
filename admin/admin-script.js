// ===== TOAST SYSTEM =====
function toast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, 4000);
}

// ===== CONFIRM MODAL =====
function confirmAction(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box">
        <h3>Confirm</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="confirmCancel">Cancel</button>
          <button class="btn btn-danger" id="confirmOk">Delete</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#confirmCancel').onclick = () => { overlay.remove(); resolve(false); };
    overlay.querySelector('#confirmOk').onclick = () => { overlay.remove(); resolve(true); };
    overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); resolve(false); } };
  });
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
  document.querySelector('.sidebar-overlay')?.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
  // hamburger
  document.querySelector('.hamburger')?.addEventListener('click', toggleSidebar);
  document.querySelector('.sidebar-overlay')?.addEventListener('click', toggleSidebar);

  // sidebar active link
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // logout
  document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('chaitra_admin_logged_in');
    window.location.href = 'login.html';
  });

  // login form
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    if (!email || !password) {
      errorEl.textContent = 'Please enter email and password.';
      errorEl.classList.add('show');
      return;
    }
    if (email === 'admin@chaitrasoft.com' && password === 'admin123') {
      localStorage.setItem('chaitra_admin_logged_in', 'true');
      window.location.href = 'dashboard.html';
    } else {
      errorEl.textContent = 'Invalid email or password.';
      errorEl.classList.add('show');
    }
  });

  // Check auth on protected pages
  if (!document.querySelector('.login-page')) {
    const loggedIn = localStorage.getItem('chaitra_admin_logged_in');
    if (!loggedIn) {
      window.location.href = 'login.html';
    }
  }
});

// ===== LOCAL STORAGE HELPERS =====
function getData(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ===== STATS COUNTERS =====
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 30);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 30);
}

// ===== SEED DATA =====
function seedData() {
  if (!localStorage.getItem('chaitra_jobs')) {
    setData('chaitra_jobs', [
      { id: generateId(), title: 'Senior Frontend Developer', category: 'Software', location: 'Hyderabad', type: 'Full-time', salary: '12 LPA', experience: '3-5 Years', startDate: '2026-07-10', endDate: '2026-08-10', tools: ['React', 'TypeScript', 'Tailwind'], badge: 'New', badgeColor: 'green', active: true, sortOrder: 1, createdAt: '2026-06-25T10:00:00Z' },
      { id: generateId(), title: 'HR Recruiter', category: 'HR', location: 'Bangalore', type: 'Full-time', salary: '5 LPA', experience: '1-2 Years', startDate: '2026-07-08', endDate: '2026-08-08', tools: ['Sourcing', 'Screening', 'Onboarding'], badge: 'Urgent', badgeColor: 'red', active: true, sortOrder: 2, createdAt: '2026-06-24T10:00:00Z' },
      { id: generateId(), title: 'Digital Marketing Specialist', category: 'Marketing', location: 'Remote', type: 'Contract', salary: 'Negotiable', experience: '0-2 Years', startDate: '2026-07-05', endDate: '2026-08-05', tools: ['SEO', 'Google Ads', 'Analytics'], badge: '', badgeColor: '', active: true, sortOrder: 3, createdAt: '2026-06-23T10:00:00Z' },
      { id: generateId(), title: 'Node.js Backend Developer', category: 'Software', location: 'Chennai', type: 'Full-time', salary: '8 LPA', experience: '2-4 Years', startDate: '2026-07-12', endDate: '2026-08-12', tools: ['Node.js', 'Express', 'MongoDB'], badge: 'Hot', badgeColor: 'amber', active: true, sortOrder: 4, createdAt: '2026-06-22T10:00:00Z' },
      { id: generateId(), title: 'Mobile App Developer', category: 'Mobile', location: 'Hyderabad', type: 'Full-time', salary: '6 LPA', experience: '1-3 Years', startDate: '', endDate: '', tools: ['Flutter', 'Dart', 'Firebase'], badge: '', badgeColor: '', active: false, sortOrder: 5, createdAt: '2026-06-21T10:00:00Z' },
    ]);
  }

  if (!localStorage.getItem('chaitra_submissions')) {
    setData('chaitra_submissions', [
      { id: generateId(), formType: 'Contact', name: 'Ravi Kumar', email: 'ravi@email.com', phone: '9876543210', message: 'Interested in your staffing services for our Bangalore office.', read: false, createdAt: '2026-06-29T14:30:00Z' },
      { id: generateId(), formType: 'Career', name: 'Sneha Reddy', email: 'sneha@email.com', phone: '8765432109', position: 'Frontend Developer', experience: '3 years', resumeName: 'Sneha_Resume.pdf', read: false, createdAt: '2026-06-28T11:20:00Z' },
      { id: generateId(), formType: 'Contact', name: 'Anil Verma', email: 'anil@email.com', phone: '7654321098', message: 'Need web development services for our e-commerce platform.', read: true, createdAt: '2026-06-27T09:15:00Z' },
      { id: generateId(), formType: 'Career', name: 'Priya Sharma', email: 'priya@email.com', phone: '6543210987', position: 'HR Executive', experience: '5 years', read: true, createdAt: '2026-06-26T16:45:00Z' },
      { id: generateId(), formType: 'Contact', name: 'Mohan Das', email: 'mohan@email.com', phone: '5432109876', message: 'Looking for digital marketing services for our startup.', read: false, createdAt: '2026-06-25T08:00:00Z' },
    ]);
  }

  if (!localStorage.getItem('chaitra_clients')) {
    setData('chaitra_clients', [
      { id: generateId(), name: 'TechCorp', altText: 'TechCorp Logo', section: 'home', displayOrder: 1, active: true, createdAt: '2026-06-20T10:00:00Z' },
      { id: generateId(), name: 'InnovateX', altText: 'InnovateX Logo', section: 'home', displayOrder: 2, active: true, createdAt: '2026-06-20T10:00:00Z' },
      { id: generateId(), name: 'DataFlow', altText: 'DataFlow Logo', section: 'home', displayOrder: 3, active: true, createdAt: '2026-06-20T10:00:00Z' },
      { id: generateId(), name: 'CloudBase', altText: 'CloudBase Logo', section: 'home', displayOrder: 4, active: false, createdAt: '2026-06-20T10:00:00Z' },
    ]);
  }

  if (!localStorage.getItem('chaitra_testimonials')) {
    setData('chaitra_testimonials', [
      { id: generateId(), name: 'Rajesh Gupta', role: 'CEO', company: 'TechCorp', rating: 5, content: 'Chaitra Soft transformed our HR operations. Their staffing solutions are top-notch and the team is incredibly professional.', active: true, sortOrder: 1, createdAt: '2026-06-20T10:00:00Z' },
      { id: generateId(), name: 'Sunita Patel', role: 'CTO', company: 'InnovateX', rating: 5, content: 'The software development team delivered our project ahead of schedule. Highly recommend their technical expertise.', active: true, sortOrder: 2, createdAt: '2026-06-20T10:00:00Z' },
      { id: generateId(), name: 'Vikram Singh', role: 'Marketing Head', company: 'DataFlow', rating: 4, content: 'Their digital marketing strategies helped us achieve 3x ROI in just 2 months. Great partnership!', active: true, sortOrder: 3, createdAt: '2026-06-20T10:00:00Z' },
    ]);
  }

  if (!localStorage.getItem('chaitra_settings')) {
    setData('chaitra_settings', {
      siteTitle: 'Chaitra Soft',
      tagline: 'Leading HR & IT Solutions Company',
      email: 'contact@chaitrasoft.com',
      phone: '+91 1234567890',
      address: 'Hyderabad, Telangana, India',
      linkedin: 'https://linkedin.com/company/chaitrasoft',
      twitter: 'https://twitter.com/chaitrasoft',
      facebook: 'https://facebook.com/chaitrasoft',
      instagram: 'https://instagram.com/chaitrasoft',
    });
  }
}

seedData();
