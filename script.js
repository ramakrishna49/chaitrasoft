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
// CONTACT FORM VALIDATION
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
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });
}
initContactForm();

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
