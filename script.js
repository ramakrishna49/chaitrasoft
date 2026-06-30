// ============================================
// CHAITRA SOFT - MASTER SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- AOS INIT ----
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  // ---- MOBILE MENU ----
  const mobileMenu = document.getElementById('mobileMenu');
  const navMenu = document.getElementById('navMenu');
  const servicesLink = document.getElementById('servicesLink');
  const servicesDropdown = document.getElementById('servicesDropdown');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  if (servicesLink && servicesDropdown) {
    servicesLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        servicesDropdown.classList.toggle('show');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navMenu && mobileMenu && servicesDropdown) {
      if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        servicesDropdown.classList.remove('show');
      }
    }
  });

  if (navMenu) {
    navMenu.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: false });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && mobileMenu && servicesDropdown) {
      navMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      servicesDropdown.classList.remove('show');
    }
  });

  // ---- FAQ TOGGLE (index.html) ----
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
      });
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ---- SMOOTH SCROLL (index.html) ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- ACTIVE PAGE DETECTION ----
  const currentPage = decodeURIComponent(window.location.pathname.split('/').pop()) || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  const servicePages = [
    'staffing.html', 'hr-services.html', 'software.html',
    'digitalmarketing.html', 'mobile-apps.html', 'website-dev.html',
  ];

  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  if (servicePages.includes(currentPage) && servicesLink) {
    servicesLink.classList.add('active');
  }

  // ---- HERO VIDEO FALLBACK ----
  document.querySelectorAll('.hero-video').forEach((video) => {
    video.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });
});

// ============================================
// STAFFING / SERVICE PAGES - OPTIONAL SCRIPTS
// ============================================

// ---- STAFFING PAGE FLOATING ICONS ----
function initStaffingAnimations() {
  const icons = document.querySelectorAll('.floating-icon');
  icons.forEach((icon, i) => {
    icon.style.top = (15 + i * 20) % 80 + '%';
    icon.style.left = (10 + i * 25) % 85 + '%';
  });
}

// ============================================
// ADMIN INTEGRATION - localStorage helpers
// ============================================
function getData(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
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

// ============================================
// CONTACT FORM VALIDATION + ADMIN SAVE
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      alert('Email must end with @gmail.com');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    // Save to admin submissions
    const subs = getData('chaitra_submissions', []);
    subs.push({
      id: generateId(),
      formType: 'Contact',
      name,
      email,
      phone,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    });
    setData('chaitra_submissions', subs);

    showGooglePopup('Thank you! Your response has been recorded.');
    this.reset();
  });
}
initContactForm();

// ============================================
// GOOGLE-STYLE SUBMISSION POPUP
// ============================================
function showGooglePopup(message) {
  const existing = document.querySelector('.google-popup-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'google-popup-overlay';
  overlay.id = 'googlePopup';
  overlay.innerHTML = `
    <div class="google-popup">
      <div class="google-popup-icon">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="#34a853">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <h3>${message}</h3>
      <p style="color:#5f6368;font-size:14px;margin-bottom:24px;">Your response has been saved.</p>
      <button onclick="document.getElementById('googlePopup').remove()" style="background:#1a73e8;color:white;border:none;padding:10px 24px;border-radius:4px;font-weight:500;cursor:pointer;font-family:'Poppins',sans-serif;">OK</button>
    </div>`;
  document.body.appendChild(overlay);

  setTimeout(() => {
    const p = document.getElementById('googlePopup');
    if (p) p.remove();
  }, 5000);
}

// ============================================
// CAREER APPLY FORM - OPPORTUNITIES PAGE
// ============================================
function initApplyForm() {
  const form = document.getElementById('applyFormEl');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formEl = this;
    const name = formEl.querySelector('[name="name"]').value.trim();
    const email = formEl.querySelector('[name="email"]').value.trim();
    const phone = formEl.querySelector('[name="phone"]').value.trim();
    const jobTitle = document.getElementById('jobTitleInput')?.value || '';
    const service = document.getElementById('serviceSelect')?.value || '';
    const resumeInput = formEl.querySelector('[name="resume"]');
    const resumeFile = resumeInput && resumeInput.files && resumeInput.files[0];

    if (!name || !email || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    function doSave(entry) {
      const subs = getData('chaitra_submissions', []);
      subs.push(entry);
      setData('chaitra_submissions', subs);
      showGooglePopup('Thank you! Your application has been received.');
      closeApplyForm();
      formEl.reset();
    }

    const base = {
      id: generateId(),
      formType: 'Career',
      name, email, phone,
      position: jobTitle,
      service,
      read: false,
      createdAt: new Date().toISOString(),
    };

    if (resumeFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        doSave({ ...base, resumeName: resumeFile.name, resumeData: ev.target.result });
      };
      reader.onerror = () => {
        doSave({ ...base, resumeName: resumeFile.name, resumeData: '' });
      };
      reader.readAsDataURL(resumeFile);
    } else {
      doSave({ ...base, resumeName: '', resumeData: '' });
    }
  });
}
initApplyForm();

// ============================================
// DYNAMIC TESTIMONIALS ON INDEX PAGE
// ============================================
function renderTestimonials() {
  const grid = document.querySelector('.testimonials-grid');
  if (!grid) return;

  const testimonials = getData('chaitra_testimonials', []);
  if (testimonials.length === 0) return;

  const active = testimonials.filter(t => t.active).sort((a,b) => a.sortOrder - b.sortOrder);
  if (active.length === 0) return;

  // Clear hardcoded testimonials and render from admin data
  grid.innerHTML = active.map((t, i) => `
    <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
      <div class="testimonial-quote">"${t.content}"</div>
      <div class="testimonial-author">
        <div class="author-avatar">${t.name.charAt(0).toUpperCase()}</div>
        <div class="author-info">
          <h4>${t.name}</h4>
          <p>${t.role}${t.company ? `, ${t.company}` : ''}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Re-init AOS for new elements
  if (typeof AOS !== 'undefined') { AOS.refresh(); }
}
renderTestimonials();

// ============================================
// DYNAMIC JOBS ON OPPORTUNITIES PAGE
// ============================================
function renderAdminJobs() {
  const jobListings = document.getElementById('jobListings');
  const noJobs = document.getElementById('noJobs');
  if (!jobListings) return;
  if (noJobs) noJobs.style.display = 'none';

  const jobs = getData('chaitra_jobs', []);
  if (jobs.length === 0) {
    if (noJobs) noJobs.style.display = 'block';
    return;
  }

  const active = jobs.filter(j => j.active).sort((a,b) => a.sortOrder - b.sortOrder);
  if (active.length === 0) {
    if (noJobs) noJobs.style.display = 'block';
    return;
  }

  const html = active.map(j => {
    const startDate = j.startDate ? new Date(j.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    const endDate = j.endDate ? new Date(j.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    const dateLabel = startDate && endDate ? `${startDate} - ${endDate}` : (j.createdAt ? `Posted: ${new Date(j.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '');
    const expVal = j.experience ? (parseInt(j.experience.match(/\d+/)?.[0]) || 0) : 0;
    return `
    <div class="job-row" data-title="${(j.title + ' ' + j.category).toLowerCase()}" data-location="${j.location.toLowerCase()}" data-exp="${expVal}">
      <div class="job-row-top">
        <span>${dateLabel}</span>
        <span class="job-number"><span class="badge badge-green" style="background:#f0fdf4;color:#16a34a;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;">${j.type}</span></span>
      </div>
      <div class="job-row-body">
        <div class="job-col title">
          <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="">
          <div>
            <h3>${j.title}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${j.location}${j.badge ? ` <span style="background:#dbeafe;color:#2563eb;padding:1px 8px;border-radius:10px;font-size:11px;margin-left:6px;">${j.badge}</span>` : ''}</p>
          </div>
        </div>
        <div class="job-col"><span>SALARY</span><strong>${j.salary || '--'}</strong></div>
        <div class="job-col"><span>EXPERIENCE</span><strong>${j.experience || '--'}</strong></div>
        <div class="job-col action">
          <button onclick="openJobApplyForm('${j.title.replace(/'/g, "\\'")}')">APPLY</button>
        </div>
      </div>
    </div>
  `}).join('');

  const container = jobListings.querySelector('.container');
  container.querySelectorAll('.job-row').forEach(el => el.remove());
  const heading = container ? container.querySelector('.job-listings-title') : null;
  if (heading) {
    heading.insertAdjacentHTML('afterend', html);
  } else if (container) {
    container.insertAdjacentHTML('afterbegin', html);
  } else {
    jobListings.insertAdjacentHTML('afterbegin', html);
  }
}
renderAdminJobs();

// ============================================
// OPPORTUNITIES PAGE
// ============================================
const serviceOptions = {
  'Staffing Services': [
    'Permanent Staffing', 'Contract Staffing', 'Contract to Hire', 'Temporary Staffing',
    'Enterprise RPO', 'BPO Requirements', 'Campus Hire', 'Bulk Hire', 'International Hiring',
  ],
  'HR Services': [
    'Payroll Outsourcing', 'HR Outsourcing', 'HR Policy & Documentation',
    'HR Consulting', 'HR Management Consulting', 'Compliance & Legal Support',
  ],
  'Software / IT Services': [
    'Website Designing & Development', 'Static Websites', 'Dynamic Websites',
    'E-commerce Websites', 'UI / UX Design', 'Graphic Design', 'Brochure Designing',
    'Video Editing', 'Logo Editing', 'Website Maintenance', 'Performance Monitoring',
    'Security Updates', 'Content Updates', 'Technical Support',
  ],
  'Digital Marketing Services': [
    'SEM Services', 'Digital Marketing Strategy', 'Social Media Marketing (SMM)',
    'Lead Generation', 'Email Marketing', 'Pay Per Click (PPC) Management', 'Brand Promotion',
  ],
  'Mobile App Development': [
    'Android App Development', 'iOS App Development', 'Hybrid App Development',
    'App Maintenance & Support Services',
  ],
};

function openApplyForm(serviceName) {
  const formContainer = document.getElementById('applyFormContainer');
  if (!formContainer) return;
  formContainer.classList.add('show');
  const serviceSelect = document.getElementById('serviceSelect');
  if (!serviceSelect) return;
  serviceSelect.innerHTML = '';
  (serviceOptions[serviceName] || []).forEach((subService) => {
    const option = document.createElement('option');
    option.value = subService;
    option.textContent = subService;
    serviceSelect.appendChild(option);
  });
}

function closeApplyForm() {
  const formContainer = document.getElementById('applyFormContainer');
  if (formContainer) formContainer.classList.remove('show');
}

function openJobApplyForm(jobTitle) {
  const formContainer = document.getElementById('applyFormContainer');
  if (!formContainer) return;
  formContainer.classList.add('show');
  const jobTitleInput = document.getElementById('jobTitleInput');
  if (jobTitleInput) jobTitleInput.value = jobTitle;
  const serviceSelect = document.getElementById('serviceSelect');
  if (serviceSelect) {
    serviceSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = jobTitle;
    option.textContent = jobTitle;
    serviceSelect.appendChild(option);
  }
}

function filterJobs(e) {
  e.preventDefault();
  const keyword = document.getElementById('keywordInput').value.toLowerCase();
  const location = document.getElementById('locationInput').value.toLowerCase();
  const experience = document.getElementById('experienceInput').value;
  const jobs = document.querySelectorAll('.job-row');
  let visibleCount = 0;

  jobs.forEach((job) => {
    const title = (job.dataset.title || '').toLowerCase();
    const loc = (job.dataset.location || '').toLowerCase();
    const exp = job.dataset.exp || '';
    const matchTitle = keyword === '' || title.includes(keyword);
    const matchLocation = location === '' || loc.includes(location);
    const matchExp = experience === '' || (exp !== '' && Number(exp) >= Number(experience));
    if (matchTitle && matchLocation && matchExp) {
      job.style.display = 'block';
      visibleCount++;
    } else {
      job.style.display = 'none';
    }
  });

  const noJobs = document.getElementById('noJobs');
  if (noJobs) noJobs.style.display = visibleCount === 0 ? 'block' : 'none';

  if (visibleCount > 0) {
    const listings = document.getElementById('jobListings');
    if (listings) listings.scrollIntoView({ behavior: 'smooth' });
  }
}

// ---- INITIALIZE PAGE-SPECIFIC FEATURES ----
if (document.querySelector('.floating-icon')) {
  initStaffingAnimations();
}
