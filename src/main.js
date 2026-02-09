import './style.css'

import { CONFIG } from './config.js';

// State
let currentState = {
  activePage: 'home',
  scrollPos: 0
};

// --- Starfield Logic ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStarfield() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];

  // Multi-layered stars
  for (let i = 0; i < CONFIG.starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8,
      speed: Math.random() * 0.4 + 0.05,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02,
      twinklePhase: Math.random() * Math.PI * 2
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // Twinkle effect
    star.twinklePhase += star.twinkleSpeed;
    const alpha = (Math.sin(star.twinklePhase) * 0.5 + 0.5) * star.opacity;

    ctx.fillStyle = `rgba(255, 204, 0, ${alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    // Movement
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }

    // Subtle horizontal drift on scroll
    star.x += (window.scrollY * 0.001) % 0.05;
  });

  requestAnimationFrame(animateStars);
}

// --- Parallax Logic ---
function initParallax() {
  const bgImage = document.getElementById('bg-image');
  const nebula = document.getElementById('nebula');

  window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    if (bgImage) {
      bgImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
    if (nebula) {
      nebula.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
    }
  });
}

// --- Navigation Logic ---
function navigateTo(pageId) {
  const pages = document.querySelectorAll('.page');
  const targetPage = document.getElementById(pageId);
  const nebula = document.getElementById('nebula');
  const bgImage = document.getElementById('bg-image');

  if (!targetPage) return;

  // Transition Background Effects
  const effect = CONFIG.bgEffects[pageId] || CONFIG.bgEffects.home;
  if (bgImage) {
    bgImage.style.backgroundImage = `url('/assets/${effect.photo}')`;
    bgImage.style.filter = `brightness(${effect.brightness}) blur(${effect.blur})`;
    // Maintaining scale(1.1) to allow for parallax movement without showing edges
  }

  // Transition Nebula
  if (nebula) nebula.style.background = CONFIG.nebulaColors[pageId] || CONFIG.nebulaColors.home;

  // Transition Pages
  pages.forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  targetPage.style.display = 'block';
  setTimeout(() => {
    targetPage.classList.add('active');
  }, 50);

  currentState.activePage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Magnetic Buttons ---
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.cta-nav, .magnetic-btn, .cta-reg');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}


// --- Content Injection ---
const SECTIONS = {
  home: `
    <div class="hero">
      <div class="title-container">
        <div class="nebula-starlines">
          <div class="starline s1"></div>
          <div class="starline s2"></div>
          <div class="starline s3"></div>
        </div>
        <span class="title-star ts1">★</span>
        <span class="title-star ts2">✦</span>
        <span class="title-star ts3">★</span>
        <span class="title-star ts4">✦</span>
        <span class="title-star ts5">★</span>
        <span class="title-star ts6">✦</span>
        <h1 class="orbitron celestial-title">CEIS 2K26</h1>
      </div>
      <h2 class="orbitron" style="font-size: 1.8rem; margin-bottom: 1rem; opacity: 0.9; color: #fff;">Illuminate Your Path ✨</h2>
      <p style="font-size: 1.2rem; opacity: 0.8; margin-bottom: 3rem; letter-spacing: 2px;">A NIGHT UNDER THE STARS 🌠</p>
      
      <div style="display: flex; justify-content: center; margin-bottom: 4rem;">
        <button class="cta-reg magnetic-btn" onclick="document.dispatchEvent(new CustomEvent('nav', {detail: 'register'}))">
          Follow the North Star
        </button>
      </div>
    </div>

    <div class="content-sections" style="margin-top: 100px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
        <div class="glass-card" style="margin: 0;">
          <h3 class="orbitron text-gradient-gold" style="margin-bottom: 2rem; font-size: 2.2rem; letter-spacing: 2px;">🪐 About CEIS 2K26</h3>
          <p style="line-height: 1.8; opacity: 0.9; font-size: 1.1rem;">
            CEIS 2K26 is the guiding light of AIESEC Carthage. It's where dreams align with destiny, visions become constellations, and members unite as one brilliant galaxy.<br><br>
            Join us for an unforgettable night of growth, connection, and celestial transformation.
          </p>
        </div>

        <div class="glass-card" style="margin: 0;">
          <h3 class="orbitron text-gradient-gold" style="margin-bottom: 2rem; font-size: 2.2rem; letter-spacing: 2px;">⭐ Under the stars theme</h3>
          <p style="line-height: 1.8; opacity: 0.9; font-size: 1.1rem;">
            Like a stargazer, every AIESECer looks up to a universe of discovery, challenges, and transformation.<br><br>
            Under the night sky lies a cosmos where dreams become constellations, where curiosity navigates by starlight, and where every challenge is a new horizon waiting to be explored.
          </p>
        </div>
      </div>

      <div class="glass-card" style="margin-bottom: 2rem;">
        <h3 class="orbitron text-gradient-gold" style="margin-bottom: 2rem; text-align: center;">☄️ Why Attend? ☄️</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
          <div style="text-align: center;">
            <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🌟</span>
            <h4 class="orbitron" style="font-size: 1rem; color: var(--gold-supernova);">Radiant Innovation</h4>
            <p style="font-size: 0.9rem; opacity: 0.8;">Spark new ideas in an environment designed for cosmic creators.</p>
          </div>
          <div style="text-align: center;">
            <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔭⭐</span>
            <h4 class="orbitron" style="font-size: 1rem; color: var(--gold-supernova);">Limitless Vision</h4>
            <p style="font-size: 0.9rem; opacity: 0.8;">Expand your horizons with workshops that reach for the stars.</p>
          </div>
          <div style="text-align: center;">
            <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">💫</span>
            <h4 class="orbitron" style="font-size: 1rem; color: var(--gold-supernova);">Universal Synergy</h4>
            <p style="font-size: 0.9rem; opacity: 0.8;">Connect with a galaxy of members and build lasting constellations of friendship.</p>
          </div>
        </div>
      </div>

      <div class="quote-section" style="text-align: center; padding: 6rem 0;">
        <p style="font-style: italic; font-size: 1.8rem; max-width: 800px; margin: 0 auto; color: var(--gold-supernova); font-family:serif;">
          "We are all in the gutter, but some of us are looking at the stars." 🌙🌃
        </p>
        <p style="margin-top: 1.5rem; opacity: 0.7; font-size: 1.1rem; letter-spacing: 2px;">— OSCAR WILDE</p>
      </div>
    </div>
  `,
  about: `
     <h2 class="orbitron text-gradient-gold" style="font-size: 3rem; margin-bottom: 3rem; text-align: center;">Following the North Star 🔭💫</h2>
     <div class="about-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="glass-card">
          <h3 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1rem;">🔭 Following the North Star</h3>
          <p style="line-height: 1.6;">Every great journey begins with a single step into the unknown. For explorers, it was setting sail by the guidance of Polaris. For AIESECers, it's that first decision to join, to participate, to lead.<br><br>CEIS 2K26 represents that pivotal moment when you choose to chart your own course.</p>
        </div>
        <div class="glass-card">
          <h3 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1rem;">🌃 The Observatory of Leadership</h3>
          <p style="line-height: 1.6;">In the cosmos, patterns emerge from what first appears as chaos. Leadership is often like that: complex and vast, yet governed by principles that bring clarity and direction. Here, every experience adds to your map, and every challenge strengthens your ability to navigate.</p>
        </div>
        <div class="glass-card">
          <h3 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1rem;">🌟 Becoming Your Own Navigator</h3>
          <p style="line-height: 1.6;">Throughout her celestial journey, the explorer learns to read the stars, trust her instruments, and believe in her course—even when facing the void. This is the essence of AIESEC leadership: finding your direction, owning your journey, and leading with conviction.</p>
        </div>
        <div class="glass-card">
          <h3 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1rem;">☄️ Your Map to the Stars</h3>
          <p style="line-height: 1.6;">An explorer finds many paths through the night, but the most rewarding one is the one she maps for herself. CEIS 2K26 is your celestial map to skills, connections, and growth that will define your future and support your voyage to new horizons.</p>
        </div>
     </div>
  `,
  navigators: `
    <h2 class="orbitron text-gradient-gold" style="font-size: 3rem; margin-bottom: 2rem; display: block; text-align: center; width: 100%;">The Celestial Navigators 🔭</h2>
    <p style="text-align: center; max-width: 800px; margin: 0 auto 4rem; opacity: 0.8; font-size: 1.1rem; line-height: 1.6;">
      Guiding Your Journey Through CEIS 2K26. Like experienced astronomers mapping the heavens, our Conference and Agenda Managers will navigate you through every phase of CEIS 2K26.
    </p>
    <div class="speaker-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4rem; justify-content: center;">
        <div class="speaker-planet">
          <div class="planet-aura"></div>
          <div class="planet-avatar" style="background: url('/assets/souleima.jpg') center/cover;"></div>
          <div class="speaker-info" style="margin-top: 2rem;">
            <h4 class="orbitron" style="color: var(--gold-supernova); font-size: 1.3rem;">Souleima Maacha</h4>
            <p style="font-size: 0.9rem; margin-bottom: 1rem; color: #fff; opacity: 0.8;">Conference Manager</p>
            <p style="font-size: 0.85rem; opacity: 0.7; line-height: 1.6;">Orchestrating the stellar journey of CEIS 2K26. With cosmic vision and precision, Souleima ensures every moment resonates with purpose and brilliance.</p>
          </div>
        </div>
        <div class="speaker-planet">
          <div class="planet-aura"></div>
          <div class="planet-avatar" style="background: url('/assets/ines.jpg') center/cover;"></div>
          <div class="speaker-info" style="margin-top: 2rem;">
            <h4 class="orbitron" style="color: var(--gold-supernova); font-size: 1.3rem;">Ines Hamdoun</h4>
            <p style="font-size: 0.9rem; margin-bottom: 1rem; color: #fff; opacity: 0.8;">Agenda Manager</p>
            <p style="font-size: 0.85rem; opacity: 0.7; line-height: 1.6;">Mapping the celestial itinerary to ensure a transformative learning experience that guides every delegate through the constellations of growth.</p>
          </div>
        </div>
        <div class="speaker-planet">
          <div class="planet-aura"></div>
          <div class="planet-avatar" style="background: url('/assets/nour.jpg') center/cover;"></div>
          <div class="speaker-info" style="margin-top: 2rem;">
            <h4 class="orbitron" style="color: var(--gold-supernova); font-size: 1.3rem;">Nour Tarchouna</h4>
            <p style="font-size: 0.9rem; margin-bottom: 1rem; color: #fff; opacity: 0.8;">Agenda Manager</p>
            <p style="font-size: 0.85rem; opacity: 0.7; line-height: 1.6;">Crafting the sessions that illuminate the path for all delegates, ensuring their celestial transformation is both profound and lasting.</p>
          </div>
        </div>
    </div>
  `,
  architects: `
    <h2 class="orbitron text-gradient-gold" style="font-size: 3rem; margin-bottom: 2rem; display: block; text-align: center; width: 100%;">Meet the Stellar Architects 🪐</h2>
    <p style="text-align: center; max-width: 800px; margin: 0 auto 4rem; opacity: 0.8; font-size: 1.1rem; line-height: 1.6;">
      The Dreamweavers Behind the Magic. Welcome to the Observatory! Just as architects design magnificent structures, our Stellar Architects build experiences that reach for the cosmos.
    </p>

    <!-- Cosmic Experience (DXP&F) -->
    <div class="dept-section" style="margin-bottom: 6rem;">
      <h3 class="orbitron" style="color: var(--gold-supernova); font-size: 1.8rem; margin-bottom: 3rem; text-align: center; border-bottom: 1px solid rgba(255,204,0,0.2); padding-bottom: 1rem; display: inline-block; width: 100%;">🛸 Cosmic Experience</h3>
      <div class="speaker-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; justify-items: center; justify-content: center;">
        ${[
      { name: "Siwar Melki", role: "OCVP DXP&F", img: "/assets/siwar_new.jpg" },
      { name: "Fadhel Lassoued", role: "OC", img: "/assets/fadhel.jpg" },
      { name: "Rania Haj Kacem", role: "OC", img: "/assets/rania.jpg" }
    ].map((m, i) => `
          <div class="speaker-planet" style="width: 160px;">
            <div class="planet-aura" style="width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,204,0,0.2) 0%, transparent 70%);"></div>
            <div class="planet-avatar" style="width: 130px; height: 130px; background: url('${m.img || `https://i.pravatar.cc/150?u=${m.name}`}') center/cover; border-color: rgba(255,204,0,0.3);"></div>
            <div class="speaker-info" style="margin-top: 1rem;">
              <h4 class="orbitron" style="font-size: 1rem; color: #fff;">${m.name}</h4>
              <p style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">${m.role}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Stellar Communications (COMM) -->
    <div class="dept-section" style="margin-bottom: 6rem;">
      <h3 class="orbitron" style="color: var(--gold-supernova); font-size: 1.8rem; margin-bottom: 3rem; text-align: center; border-bottom: 1px solid rgba(255,204,0,0.2); padding-bottom: 1rem; display: inline-block; width: 100%;">📻 Stellar Communications</h3>
      <div class="speaker-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; justify-items: center; justify-content: center;">
        ${[
      { name: "Yasmine Tlili", role: "OCVP COM", img: "/assets/yasmine.jpg" },
      { name: "Kenza Ammar", role: "OC", img: "/assets/kenza.jpg" },
      { name: "Othman Ghozia", role: "OC", img: "/assets/othman.jpg" }
    ].map((m, i) => `
          <div class="speaker-planet" style="width: 160px;">
            <div class="planet-aura" style="width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,204,0,0.2) 0%, transparent 70%);"></div>
            <div class="planet-avatar" style="width: 130px; height: 130px; background: url('${m.img || `https://i.pravatar.cc/150?u=${m.name}`}') center/cover; border-color: rgba(255,204,0,0.3);"></div>
            <div class="speaker-info" style="margin-top: 1rem;">
              <h4 class="orbitron" style="font-size: 1rem; color: #fff;">${m.name}</h4>
              <p style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">${m.role}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Orbital Logistics (LOG) -->
    <div class="dept-section" style="margin-bottom: 6rem;">
      <h3 class="orbitron" style="color: var(--gold-supernova); font-size: 1.8rem; margin-bottom: 3rem; text-align: center; border-bottom: 1px solid rgba(255,204,0,0.2); padding-bottom: 1rem; display: inline-block; width: 100%;">🛰️ Orbital Logistics</h3>
      <div class="speaker-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem; justify-items: center; justify-content: center;">
        ${[
      { name: "Ahmed Trigui", role: "OCVP LOG", img: "/assets/ahmed.jpg" },
      { name: "Lina Grijou", role: "OC", img: "/assets/lina.jpg" },
      { name: "Omar Boudaya", role: "OC", img: "/assets/omar.jpg" },
      { name: "Nour Tiouiri", role: "OC", img: "/assets/nour_tiouiri.jpg" },
      { name: "Chahd Errokh", role: "OC", img: "/assets/chahd.jpg" }
    ].map((m, i) => `
          <div class="speaker-planet" style="width: 160px;">
            <div class="planet-aura" style="width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,204,0,0.2) 0%, transparent 70%);"></div>
            <div class="planet-avatar" style="width: 130px; height: 130px; background: url('${m.img || `https://i.pravatar.cc/150?u=${m.name}`}') center/cover; border-color: rgba(255,204,0,0.3);"></div>
            <div class="speaker-info" style="margin-top: 1rem;">
              <h4 class="orbitron" style="font-size: 1rem; color: #fff;">${m.name}</h4>
              <p style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">${m.role}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
  register: `
  <div class="registration-launchpad glass-card" style = "max-width: 850px; margin: 0 auto;">
      <h2 class="orbitron text-gradient-gold" style="margin-bottom: 0.5rem; text-align: center; font-size: 2.5rem;">Registration Launchpad</h2>
      <p style="margin-bottom: 3rem; opacity: 0.9; text-align: center; font-style: italic; font-size: 1.1rem;">"Tell me your sign, I'll tell you your superpower"</p>
      
      <div class="conference-details" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; justify-content: center;">
        <div class="detail-box glass-card" style="padding: 1.5rem; text-align: center;">
          <h4 style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem;">Location</h4>
          <p style="font-size: 1.1rem; font-weight: 600;">Best Beach Sousse</p>
        </div>
        <div class="detail-box glass-card" style="padding: 1.5rem; text-align: center;">
          <h4 style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem;">Date</h4>
          <p style="font-size: 1.1rem; font-weight: 600;">13/14/15 Feb</p>
        </div>
        <div class="detail-box glass-card" style="padding: 1.5rem; text-align: center;">
          <h4 style="font-size: 0.75rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem;">Fees</h4>
          <p style="font-size: 1.3rem; color: var(--gold-supernova); font-weight: 800;">145 DT</p>
        </div>
      </div>

      <div class="form-steps">
         <div id="step-indicator" style="display: flex; gap: 1rem; margin-bottom: 3rem; justify-content: center; flex-wrap: wrap;">
            <div class="step active"></div>
            <div class="step"></div>
            <div class="step"></div>
            <div class="step"></div>
            <div class="step"></div>
            <div class="step"></div>
          </div>
         <form id="reg-form">
            <div id="form-content" style="min-height: 300px;"></div>
            <div class="form-nav" style="margin-top: 3rem; display: flex; justify-content: space-between;">
               <button type="button" id="prev-btn" class="glass-btn" style="display:none;">Back</button>
               <button type="button" id="next-btn" class="cta-nav" style="min-width: 180px;">Continue</button>
            </div>
         </form>
      </div>
    </div>

  <div style="text-align: center; margin-top: 6rem; padding-bottom: 4rem;">
    <h3 class="orbitron text-gradient-gold" style="font-size: 2.2rem;">Ready to Illuminate Your Path?</h3>
    <p style="opacity: 0.8; margin-top: 1.5rem; font-size: 1.2rem; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6;">
      Your celestial journey begins here. Join us at CEIS 2K26 and become part of a brighter constellation.
    </p>
  </div>
`
};

// --- Multi-Step Form Logic ---
let currentStep = 1;
let registrationData = {}; // Persistent data store
const formSteps = [
  {
    title: "1 👤 Personal Info",
    fields: `
  <div class="input-group">
        <label>👤 Full Name *</label>
        <input type="text" placeholder="Enter your full name" required id="reg-name">
      </div>
      <div class="input-group">
        <label>🆔 Numéro CIN *</label>
        <input type="text" placeholder="Enter your CIN number (e.g., 12345678)" required id="reg-cin">
      </div>
      <div class="input-group">
        <label>🎓 University *</label>
        <input type="text" placeholder="Enter your university name" required id="reg-university">
      </div>
      <div class="input-group">
        <label>🚻 Gender *</label>
        <div class="choice-group" data-id="reg-gender">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-gender', 'Male')">♂️ Male</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-gender', 'Female')">♀️ Female</div>
        </div>
        <input type="hidden" id="reg-gender" required>
      </div>
      <div class="input-group">
        <label>📅 Date of Birth *</label>
        <input type="date" required id="reg-dob">
      </div>
      <div class="input-group">
        <label>🎭 AIESEC Position *</label>
        <select required id="reg-position">
          <option value="">Select your position</option>
          <option value="TL">Team Leader / Middle Manager</option>
          <option value="TM">Team Member / Oldie</option>
          <option value="Newbie">Newbie</option>
        </select>
      </div>
      <div class="input-group">
        <label>🏢 AIESEC Department *</label>
        <select required id="reg-department">
          <option value="">Select your department</option>
          <option value="Not assigned yet">Not assigned yet</option>
          <option value="OGV">OGV</option>
          <option value="OGT">OGT</option>
          <option value="ICX">ICX</option>
          <option value="TM&IM">TM&IM</option>
          <option value="PM&Ewa">PM&Ewa</option>
          <option value="F&L">F&L</option>
          <option value="MKT">MKT</option>
          <option value="BD">BD</option>
        </select>
      </div>
`
  },
  {
    title: "2 🍏 Health & Dietary",
    fields: `
  <div class="input-group">
        <label>🍏 Do you have any allergies? *</label>
        <div class="choice-group" data-id="reg-allergies">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-allergies', 'Yes')">Yes</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-allergies', 'No')">No</div>
        </div>
        <input type="hidden" id="reg-allergies" required>
      </div>
      <div class="input-group">
        <label>🏥 Chronic medical conditions we should be aware of?</label>
        <div class="choice-group" data-id="reg-chronic">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-chronic', 'Yes')">Yes</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-chronic', 'No')">No</div>
        </div>
        <input type="hidden" id="reg-chronic">
      </div>
      <div class="input-group" style="margin-top: 1rem;">
        <label>📝 Please specify details for any of the above (Optional)</label>
        <textarea placeholder="List your allergies or medical conditions here..." id="reg-medical-details" rows="3"></textarea>
      </div>
`
  },
  {
    title: "3 📱 Contact Details",
    fields: `
  <div class="input-group">
        <label>📧 Email Address *</label>
        <input type="email" placeholder="your.email@example.com" required id="reg-email">
      </div>
      <div class="input-group">
        <label>📞 Phone Number *</label>
        <input type="tel" placeholder="+216 XX XXX XXX" required id="reg-phone">
      </div>
      <div class="input-group">
        <label>🚨 Emergency Phone Number *</label>
        <input type="tel" placeholder="+216 XX XXX XXX" required id="reg-emergency">
      </div>
`
  },
  {
    title: "4 🎯 Conference Expectations",
    fields: `
      <div class="input-group">
        <label>✨ Choose Your Astrological Sign *</label>
        <div class="zodiac-grid">
          ${(() => {
        const signs = [
          { name: 'Aries', icon: '♈', trait: 'Pioneering' },
          { name: 'Taurus', icon: '♉', trait: 'Grounded' },
          { name: 'Gemini', icon: '♊', trait: 'Adaptable' },
          { name: 'Cancer', icon: '♋', trait: 'Nurturing' },
          { name: 'Leo', icon: '♌', trait: 'Radiant' },
          { name: 'Virgo', icon: '♍', trait: 'Precise' },
          { name: 'Libra', icon: '♎', trait: 'Harmonizing' },
          { name: 'Scorpio', icon: '♏', trait: 'Intense' },
          { name: 'Sagittarius', icon: '♐', trait: 'Expansive' },
          { name: 'Capricorn', icon: '♑', trait: 'Resolute' },
          { name: 'Aquarius', icon: '♒', trait: 'Unconventional' },
          { name: 'Pisces', icon: '♓', trait: 'Transcendent' }
        ];
        let html = '';
        // Row 1
        for (let i = 0; i < 4; i++) {
          html += `
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[i].name}')">
              <span class="zodiac-icon">${signs[i].icon}</span>
              <span class="zodiac-name">${signs[i].name}</span>
              <span class="zodiac-trait">${signs[i].trait}</span>
            </div>`;
        }
        // Row 2 & 3 (Middle)
        html += `
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[4].name}')">
              <span class="zodiac-icon">${signs[4].icon}</span>
              <span class="zodiac-name">${signs[4].name}</span>
              <span class="zodiac-trait">${signs[4].trait}</span>
            </div>
            <div class="zodiac-center" id="zodiac-container" style="position: relative; width: 100%; height: 100%; min-height: 250px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px;">
              <canvas id="zodiac-canvas" style="width: 100%; height: 100%; position: absolute; top:0; left:0;"></canvas>
            </div>
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[5].name}')">
              <span class="zodiac-icon">${signs[5].icon}</span>
              <span class="zodiac-name">${signs[5].name}</span>
              <span class="zodiac-trait">${signs[5].trait}</span>
            </div>
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[6].name}')">
              <span class="zodiac-icon">${signs[6].icon}</span>
              <span class="zodiac-name">${signs[6].name}</span>
              <span class="zodiac-trait">${signs[6].trait}</span>
            </div>
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[7].name}')">
              <span class="zodiac-icon">${signs[7].icon}</span>
              <span class="zodiac-name">${signs[7].name}</span>
              <span class="zodiac-trait">${signs[7].trait}</span>
            </div>`;
        // Row 4
        for (let i = 8; i < 12; i++) {
          html += `
            <div class="zodiac-item" onclick="selectZodiac(this, '${signs[i].name}')">
              <span class="zodiac-icon">${signs[i].icon}</span>
              <span class="zodiac-name">${signs[i].name}</span>
              <span class="zodiac-trait">${signs[i].trait}</span>
            </div>`;
        }
        return html;
      })()}
        </div>
        <input type="hidden" id="reg-zodiac" required>
        <p style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.7; text-align: center; color: var(--gold-supernova);">"Tell me your sign, I'll tell you your superpower"</p>
      </div>
      <div class="input-group">
        <label>🎯 What are your main goals for attending the conference? *</label>
        <textarea placeholder="Share your goals and expectations..." required id="reg-goals" rows="3"></textarea>
      </div>
      <div class="input-group">
        <label>💡 Which topics or sessions interest you most? *</label>
        <textarea placeholder="Tell us about the topics that excite you..." required id="reg-topics" rows="3"></textarea>
      </div>
`
  },
  {
    title: "5 💛 Collaboration & Support",
    fields: `
  <div class="input-group">
        <label>🤝 How can our team support you during the event?</label>
        <textarea placeholder="Let us know how we can help..." id="reg-support" rows="3"></textarea>
      </div>
      <div class="input-group">
        <label>💬 Preferred Communication Method *</label>
        <div class="choice-group" data-id="reg-comm">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-comm', 'Email')">📧 Email</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-comm', 'WhatsApp')">🟢 WhatsApp</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-comm', 'Messenger')">💬 Messenger</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-comm', 'Other')">✨ Other</div>
        </div>
        <input type="hidden" id="reg-comm" required>
      </div>
      <div class="input-group">
        <label>🚌 Transportation / Bus Options *</label>
        <div class="choice-group" data-id="reg-bus">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-bus', 'Departure Only', 20)">Departure Only (+20 DT)</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-bus', 'Return Only', 20)">Return Only (+20 DT)</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-bus', 'Full Package', 30)">Full Package (+30 DT)</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-bus', 'None', 0)">None (I will arrange my own)</div>
        </div>
        <input type="hidden" id="reg-bus" required>
      </div>
      <div class="input-group">
        <label>🏨 Single Room Upgrade *</label>
        <div class="choice-group" data-id="reg-room">
          <div class="choice-btn" onclick="selectChoice(this, 'reg-room', 'No', 0)">No (Shared accommodation included)</div>
          <div class="choice-btn" onclick="selectChoice(this, 'reg-room', 'Yes', 100)">Yes (+100 DT Total)</div>
        </div>
        <input type="hidden" id="reg-room" required>
      </div>
      <div class="input-group">
        <label>📸 Upload a photo of yourself</label>
        <div class="glass-card" style="padding: 2rem; border: 2px dashed var(--gold-supernova); text-align: center;">
          <input type="file" id="reg-photo" style="display: none;" accept="image/*">
          <button type="button" class="glass-btn" onclick="document.getElementById('reg-photo').click(); return false;" style="margin-bottom: 0.5rem;">📸 Choisir un fichier</button>
          <p style="font-size: 0.8rem; opacity: 0.6;" id="file-name">Format: JPG, PNG, GIF (max 50MB)</p>
        </div>
      </div>
       <div style="margin-top: 2rem; text-align: center;">
            <div class="glass-card ticket-card selected" style="max-width: 250px; margin: 0 auto;">
              <h4 style="font-size: 0.9rem;">Total Fee</h4>
              <p style="font-weight: 800; font-size: 1.2rem;" id="total-fee">145 DT</p>
            </div>
      </div>
`
  },
  {
    title: "6 📜 Terms & Conditions",
    fields: `
      <div class="terms-container glass-card" style="padding: 2rem;">
        <h4 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1.5rem; text-align: center;">TERMS & CONDITIONS</h4>
        
        <div class="terms-list">
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">🎫</span>
             <p>I understand the total conference fee starts at <strong>145 dinars</strong> for the entire conference.</p>
          </div>
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">🏨</span>
             <p>I acknowledge that shared accommodation is included in the base fee.</p>
          </div>
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">💰</span>
             <p>I agree to pay an additional <strong>100 dinars</strong> (50 dinars per day) if I choose a single room upgrade.</p>
          </div>
            <div class="terms-item" style="display: flex; gap: 1rem; align-items: start; margin-bottom: 1rem;">
              <span style="color: var(--gold-supernova); font-size: 1.2rem;">❌</span>
              <p>I accept the 100% cancellation fee if I cancel my registration (accomodation and bus fees included)</p>
            </div>
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">📋</span>
             <p>I confirm all provided information is accurate and complete.</p>
          </div>
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">⚠️</span>
             <p>I understand that no refunds will be issued for no-shows or late cancellations.</p>
          </div>
          <div class="terms-item" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
             <span style="font-size: 1.2rem;">✨</span>
             <p>I agree to follow all conference rules and embrace the Wonderland spirit!</p>
          </div>
        </div>

        <div class="signature-section glass-card" style="padding: 2rem; text-align: center; margin-top: 2rem; border-color: var(--gold-supernova);">
            <h4 class="orbitron" style="color: var(--gold-supernova); margin-bottom: 1.5rem;">DIGITAL SIGNATURE</h4>
            
            <div class="canvas-container" style="background: #fff; border-radius: 10px; margin-bottom: 1.5rem; overflow: hidden; position: relative;">
              <canvas id="signature-pad" width="600" height="200" style="width: 100%; height: 200px; cursor: crosshair; touch-action: none;"></canvas>
              <div style="position: absolute; bottom: 5px; right: 5px; color: #333; font-size: 0.7rem; opacity: 0.5;">Sign here</div>
            </div>

            <div class="signature-actions" style="display: flex; gap: 1rem; justify-content: center;">
               <button type="button" class="glass-btn" style="background: #ff4444; border-color: #ff4444 !important;" onclick="clearSignature()">Clear Signature</button>
            </div>
            
            <input type="hidden" id="reg-signature" required>
            <p style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;">Please sign above to confirm your registration</p>
        </div>

        <div class="input-group" style="margin-top: 2rem; text-align: center;">
          <label style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer;">
            <input type="checkbox" id="reg-terms" required style="width: auto; margin: 0;">
            <span>I have read and agree to the Terms & Conditions *</span>
          </label>
        </div>
      </div>
    `
  }
];

// --- ZODIAC CONSTELLATION ENGINE ---
const ZODIAC_DATA = {
  'Aries': { // Ram: Curved line
    points: [[0.2, 0.6], [0.4, 0.45], [0.6, 0.4], [0.8, 0.5]],
    lines: [[0, 1], [1, 2], [2, 3]]
  },
  'Taurus': { // Bull: V shape with horns
    points: [[0.5, 0.8], [0.4, 0.6], [0.6, 0.6], [0.2, 0.35], [0.8, 0.35]],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4]]
  },
  'Gemini': { // Twins: Two connected pillars/lines
    points: [[0.3, 0.2], [0.35, 0.8], [0.65, 0.2], [0.7, 0.8], [0.5, 0.5], [0.32, 0.5], [0.68, 0.5]],
    lines: [[0, 1], [2, 3], [4, 5], [4, 6]]
  },
  'Cancer': { // Crab: Inverted Y / Lambda
    points: [[0.5, 0.5], [0.3, 0.3], [0.7, 0.75], [0.25, 0.7], [0.75, 0.25]],
    lines: [[0, 1], [0, 2], [1, 4], [2, 3]] // Incorrect typical shape, let's try standard Upside down Y
  },
  'Leo': { // Lion: Sickle/Hook + Triangle
    points: [[0.6, 0.3], [0.5, 0.2], [0.35, 0.25], [0.3, 0.45], [0.4, 0.6], [0.7, 0.6], [0.8, 0.45], [0.5, 0.6]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 7], [4, 5], [5, 6], [6, 0]]
  },
  'Virgo': { // Maiden: Large boxy M
    points: [[0.2, 0.4], [0.4, 0.35], [0.6, 0.35], [0.3, 0.6], [0.5, 0.6], [0.4, 0.8], [0.8, 0.3]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 5], [4, 5], [2, 6], [0, 3]]
  },
  'Libra': { // Scales: Triangle/Beam
    points: [[0.5, 0.2], [0.2, 0.7], [0.8, 0.7], [0.3, 0.5], [0.7, 0.5]],
    lines: [[3, 4], [1, 2], [0, 3], [0, 4]]
  },
  'Scorpio': { // Scorpion: S-hook tail
    points: [[0.8, 0.2], [0.75, 0.25], [0.7, 0.35], [0.6, 0.45], [0.5, 0.6], [0.5, 0.75], [0.65, 0.85], [0.8, 0.75], [0.85, 0.65]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
  },
  'Sagittarius': { // Archer: Teapot/Bow
    points: [[0.2, 0.7], [0.4, 0.5], [0.3, 0.3], [0.6, 0.5], [0.7, 0.3], [0.5, 0.8], [0.7, 0.8], [0.8, 0.5]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 7], [5, 6], [6, 7], [5, 1]]
  },
  'Capricorn': { // Goat: V-shape / Triangle
    points: [[0.2, 0.3], [0.5, 0.4], [0.8, 0.3], [0.5, 0.8], [0.3, 0.4]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 1], [0, 4]]
  },
  'Aquarius': { // Water Bearer: Zig-zag lines
    points: [[0.2, 0.3], [0.3, 0.4], [0.4, 0.3], [0.5, 0.4], [0.6, 0.3], [0.3, 0.6], [0.4, 0.7], [0.5, 0.6], [0.6, 0.7], [0.7, 0.6]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9]]
  },
  'Pisces': { // Fishes: V shape tied
    points: [[0.2, 0.3], [0.4, 0.4], [0.5, 0.5], [0.6, 0.6], [0.8, 0.7], [0.7, 0.3], [0.3, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [2, 6]] // Connecting at center knot
  }
};

let zodiacState = {
  stars: [],
  lines: [],
  activeSign: null,
  animationId: null,
  width: 0,
  height: 0,
  ctx: null,
  heroStars: [] // Indices of stars currently forming shape
};

window.initZodiacCanvas = function () {
  const container = document.getElementById('zodiac-container');
  const canvas = document.getElementById('zodiac-canvas');
  if (!canvas || !container) return; // Might not be on step 4

  zodiacState.ctx = canvas.getContext('2d');

  // Resize Observer
  const resize = () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    zodiacState.width = canvas.width;
    zodiacState.height = canvas.height;
  };
  new ResizeObserver(resize).observe(container);
  resize();

  // Init Particles
  zodiacState.stars = [];
  for (let i = 0; i < 150; i++) {
    zodiacState.stars.push({
      x: Math.random() * zodiacState.width,
      y: Math.random() * zodiacState.height,
      size: Math.random() * 2,
      targetX: null,
      targetY: null,
      baseX: Math.random() * zodiacState.width, // Origin for drifting
      baseY: Math.random() * zodiacState.height,
      driftX: (Math.random() - 0.5) * 0.2,
      driftY: (Math.random() - 0.5) * 0.2,
      alpha: Math.random(),
      pulseSpeed: 0.02 + Math.random() * 0.03
    });
  }

  animateZodiac();
};

function animateZodiac() {
  const { ctx, width, height, stars, activeSign } = zodiacState;
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  // Draw lines first (under particles)
  if (activeSign && ZODIAC_DATA[activeSign]) {
    const signData = ZODIAC_DATA[activeSign];
    const heroes = zodiacState.heroStars;

    ctx.strokeStyle = 'rgba(255, 204, 0, 0.6)'; // Gold
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFCC00';

    ctx.beginPath();
    signData.lines.forEach(line => {
      const p1 = stars[heroes[line[0]]];
      const p2 = stars[heroes[line[1]]];

      // Only draw if p1 and p2 have reached target (conceptually, or close enough)
      // Or just draw line between current positions for morph effect
      if (p1 && p2) {
        // Check if they are 'close' to target to fade line in? 
        // Creating a 'write' effect is complex, let's just fade lines in globally
        // For now, simpler: static connection logic
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
    });
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset
  }

  // Update & Draw Stars
  stars.forEach((star, i) => {
    // Pulse logic
    star.alpha += star.pulseSpeed;
    if (star.alpha > 1 || star.alpha < 0.2) star.pulseSpeed *= -1;
    const displayAlpha = Math.max(0, Math.min(1, star.alpha));

    // Movement Logic
    if (star.targetX !== null) {
      // Move to target (Hero Star)
      star.x += (star.targetX - star.x) * 0.05;
      star.y += (star.targetY - star.y) * 0.05;
    } else {
      // Drift logic (Background Star)
      // Return to random drift if released from hero duty? 
      // For simpler logic: if targetX is null, drift around baseX
      star.x += star.driftX;
      star.y += star.driftY;

      // Boundary wrap for drift
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      // Slowly return to random base if they were hero stars?
      // Actually, keep it simple: just drift.
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha})`;

    // Hero Star Glow
    if (star.targetX !== null) {
      ctx.fillStyle = `rgba(255, 204, 0, ${displayAlpha + 0.2})`; // Gold tint
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFCC00';
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  zodiacState.animationId = requestAnimationFrame(animateZodiac);
}

window.setZodiacShape = function (name) {
  zodiacState.activeSign = name;

  // Reset all stars to drift/idle first?
  // Conserve hero stars for transition effect

  // 1. Release old heroes
  zodiacState.stars.forEach(s => {
    s.targetX = null;
    s.targetY = null;
  });
  zodiacState.heroStars = [];

  const data = ZODIAC_DATA[name];
  if (!data) return;

  // 2. Assign new heroes
  // Pick first N stars to be heroes
  const count = data.points.length;
  for (let i = 0; i < count; i++) {
    const star = zodiacState.stars[i];
    const [nx, ny] = data.points[i]; // Normalized coords

    // Calculate screen target with padding
    const padding = 40;
    const availableW = zodiacState.width - 2 * padding;
    const availableH = zodiacState.height - 2 * padding;

    star.targetX = padding + nx * availableW;
    star.targetY = padding + ny * availableH;

    zodiacState.heroStars.push(i);
  }
};

window.validCode = function () { return true; }; // Placeholder
// --- END ZODIAC ENGINE ---

// --- EXISTING FUNCTIONS ---
window.selectChoice = function (btn, id, value, price = 0) {
  const container = btn.parentElement;
  container.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const input = document.getElementById(id);
  if (input) {
    input.value = value;
    input.dataset.price = price; // Store price data
    input.dispatchEvent(new Event('input')); // Trigger validation

    // Store price persistently in registrationData
    registrationData[id + '-price'] = price;
  }

  // Handle Dynamic Fee
  updateTotalFee();
};

function updateTotalFee() {
  const baseFee = 145;

  // Read from persistent data store, falling back to 0 if not set
  const busPrice = parseInt(registrationData['reg-bus-price'] || 0);
  const roomPrice = parseInt(registrationData['reg-room-price'] || 0);

  const total = baseFee + busPrice + roomPrice;

  const feeDisplays = document.querySelectorAll('#total-fee');
  feeDisplays.forEach(display => {
    display.innerText = `${total} DT`;
  });

  // Store total fee in data for submission
  registrationData['total-fee'] = `${total} DT`;
}

// Signature Logic
let signaturePad = null;
let isDrawing = false;

window.initSignature = function () {
  const canvas = document.getElementById('signature-pad');
  if (!canvas) return;

  // Resize canvas for high DPI
  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) / ratio,
      y: (clientY - rect.top) / ratio
    };
  };

  const startDraw = (e) => {
    isDrawing = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Critical for touch
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (isDrawing) {
      isDrawing = false;
      saveSignature();
    }
  };

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('touchend', stopDraw);
  canvas.addEventListener('mouseout', stopDraw);
};

window.clearSignature = function () {
  const canvas = document.getElementById('signature-pad');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('reg-signature').value = '';
  }
};

function saveSignature() {
  const canvas = document.getElementById('signature-pad');
  if (canvas) {
    const dataUrl = canvas.toDataURL();
    document.getElementById('reg-signature').value = dataUrl;
  }
}

window.selectZodiac = function (el, name) {
  const container = el.parentElement;
  container.querySelectorAll('.zodiac-item').forEach(item => item.classList.remove('selected'));
  el.classList.add('selected');
  const input = document.getElementById('reg-zodiac');
  if (input) {
    input.value = name;
    input.dispatchEvent(new Event('input'));
  }

  if (window.setZodiacShape) {
    window.setZodiacShape(name);
  }
};

window.selectTicket = (el, type) => {
  document.querySelectorAll('.ticket-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  window.selectedTicketType = type;
};

function renderStep() {
  const content = document.getElementById('form-content');
  const indicator = document.getElementById('step-indicator');
  if (!content) return;

  const stepData = formSteps[currentStep - 1];
  content.innerHTML = `<h3 class="orbitron" style = "margin-bottom: 1.5rem; color: var(--gold-supernova); font-size: 1.2rem;"> Stage ${currentStep}: ${stepData.title}</h3> ` + stepData.fields;

  // Auto-scroll to top of page when changing sections
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (currentStep === 4) {
    setTimeout(window.initZodiacCanvas, 100);
  }

  // Restore previous data if it exists
  const inputs = content.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (registrationData[input.id]) {
      input.value = registrationData[input.id];
      // Store price dataset if applicable
      if (input.id === 'reg-bus' || input.id === 'reg-room') {
        // Find the selected choice to get the price
        const choiceGroup = content.querySelector(`.choice-group[data-id="${input.id}"]`);
        if (choiceGroup) {
          const selectedBtn = Array.from(choiceGroup.querySelectorAll('.choice-btn')).find(btn => btn.getAttribute('onclick').includes(`'${input.value}'`));
          if (selectedBtn) {
            const priceMatch = selectedBtn.getAttribute('onclick').match(/, (\d+)\)$/);
            if (priceMatch) {
              input.dataset.price = priceMatch[1];
            }
          }
        }
      }

      // Special handle for custom choice buttons
      if (input.type === 'hidden') {
        const choiceGroup = content.querySelector(`.choice-group[data-id="${input.id}"]`) || content.querySelector(`.zodiac-grid`);
        if (choiceGroup) {
          const btns = choiceGroup.querySelectorAll('.choice-btn, .zodiac-item');
          btns.forEach(btn => {
            const btnValue = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || btn.innerText.trim();
            // For bus/room options with prices, exact match might be needed or handled by the onclick parser above
            if (btnValue === registrationData[input.id] || (btn.innerText.includes(registrationData[input.id]))) {
              btn.classList.add('selected');
            }
          });
        }
      }
    }
  });

  // Recalculate fee to ensure display is correct
  updateTotalFee();

  // Init Signature if step 7
  // Init Signature if step 6 (Terms & Conditions)
  if (currentStep === 6) {
    setTimeout(window.initSignature, 100);
  }

  // Update Indicator
  const steps = indicator.querySelectorAll('.step');
  steps.forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i < currentStep - 1) {
      s.classList.add('completed');
    } else if (i === currentStep - 1) {
      s.classList.add('active');
    }
  });

  // Buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
  if (nextBtn) nextBtn.innerText = currentStep === formSteps.length ? 'CHART YOUR COURSE' : 'CONTINUE';
}

function initForm() {
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Basic Validation
      const currentStepContainer = document.getElementById('form-content');
      const requiredInputs = currentStepContainer.querySelectorAll('[required]');
      let allValid = true;

      requiredInputs.forEach(input => {
        if (!input.value || (input.tagName === 'SELECT' && input.selectedIndex === 0)) {
          allValid = false;
          input.style.borderColor = '#ff4444';
        } else {
          input.style.borderColor = 'var(--glass-border)';
        }
      });

      if (!allValid) {
        alert("Please navigate by filling all required celestial fields before proceeding.");
        return;
      }

      // Save current step data before moving
      const allInputs = currentStepContainer.querySelectorAll('input, select, textarea');
      allInputs.forEach(input => {
        if (input.id) registrationData[input.id] = input.value;
      });

      if (currentStep < formSteps.length) {
        currentStep++;
        renderStep();
      } else {
        submitRegistration();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      // Save current data even when going back
      const currentStepContainer = document.getElementById('form-content');
      const allInputs = currentStepContainer.querySelectorAll('input, select, textarea');
      allInputs.forEach(input => {
        if (input.id) registrationData[input.id] = input.value;
      });

      if (currentStep > 1) {
        currentStep--;
        renderStep();
      }
    });
  }

  renderStep();
}

async function submitRegistration() {
  const nextBtn = document.getElementById('next-btn');
  const originalText = nextBtn.innerText;
  nextBtn.disabled = true;
  nextBtn.innerText = 'PREPARING LAUNCH...';

  const data = {
    fullName: registrationData['reg-name'],
    cin: registrationData['reg-cin'],
    university: registrationData['reg-university'],
    gender: registrationData['reg-gender'],
    dob: registrationData['reg-dob'],
    position: registrationData['reg-position'],
    department: registrationData['reg-department'],
    allergies: registrationData['reg-allergies'],
    chronic: registrationData['reg-chronic'],
    medicalDetails: registrationData['reg-medical-details'],
    email: registrationData['reg-email'],
    phone: registrationData['reg-phone'],
    emergency: registrationData['reg-emergency'],
    zodiac: registrationData['reg-zodiac'],
    goals: registrationData['reg-goals'],
    topics: registrationData['reg-topics'],
    support: registrationData['reg-support'],
    comm: registrationData['reg-comm'],
    bus: registrationData['reg-bus'],
    room: registrationData['reg-room'],
    terms: registrationData['reg-terms'],
    signature: registrationData['reg-signature'],
    fee: registrationData['total-fee'],
    photoData: registrationData['photoData'],
    photoName: registrationData['photoName'],
    photoType: registrationData['photoType']
  };

  // If URL is missing, skip network but show animation (Dev/UX purposes)
  if (!CONFIG.googleSheetsUrl) {
    console.warn("Google Sheets URL not set. Data collected:", data);
    showSuccessAnimation();
    return;
  }

  try {
    // We use text/plain to avoid CORS preflight, which Apps Script won't answer
    await fetch(CONFIG.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    });

    // With no-cors, we can't see the response, but we delay slightly to ensure transmission
    setTimeout(() => {
      showSuccessAnimation();
    }, 1500);
  } catch (error) {
    console.error("Transmission error:", error);
    alert("Cosmic interference detected. Please try again or check your connection.");
    nextBtn.disabled = false;
    nextBtn.innerText = originalText;
  }
}

// --- Success Animation ---
function showSuccessAnimation() {
  const regCard = document.querySelector('.registration-launchpad');
  regCard.innerHTML = `
  <div style = "text-align: center; padding: 4rem 2rem;">
      <h2 class="orbitron text-gradient-gold" style="font-size: 2.5rem; margin-bottom: 2rem;">LAUNCH SUCCESSFUL</h2>
      <canvas id="constellation" width="300" height="300" style="margin: 0 auto; display: block; filter: drop-shadow(0 0 15px rgba(255,204,0,0.5));"></canvas>
      <p style="margin-top: 3rem; font-size: 1.4rem; opacity: 0.9; color: var(--gold-supernova);">Your seat in the galaxy has been reserved.</p>
      <p style="margin-top: 1rem; opacity: 0.6;">Welcome to the constellation of CEIS 2K26.</p>
      <button class="cta-nav" style="margin-top: 3rem;" onclick="window.location.reload()">Back to Home</button>
    </div>
  `;

  const canvas = document.getElementById('constellation');
  const ctx = canvas.getContext('2d');
  const points = [
    { x: 150, y: 50 }, { x: 250, y: 120 }, { x: 220, y: 230 }, { x: 80, y: 230 }, { x: 50, y: 120 }, { x: 150, y: 150 }
  ];

  let progress = 0;
  function draw() {
    ctx.clearRect(0, 0, 300, 300);
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Draw points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffcc00';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffcc00';
      ctx.fill();
    }

    // Draw lines
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    const limit = Math.floor(points.length * progress);
    for (let i = 1; i <= limit; i++) {
      const p = points[i % points.length];
      ctx.lineTo(p.x, p.y);
    }

    // Animate current line segment
    if (limit < points.length) {
      const p1 = points[limit];
      const p2 = points[(limit + 1) % points.length];
      const segmentProgress = (points.length * progress) - limit;
      ctx.lineTo(p1.x + (p2.x - p1.x) * segmentProgress, p1.y + (p2.y - p1.y) * segmentProgress);
    }

    ctx.stroke();

    if (progress < 1.0) {
      progress += 0.01;
      requestAnimationFrame(draw);
    }
  }
  draw();
}

// --- Initialization ---
window.addEventListener('scroll', () => {
  const btt = document.getElementById('back-to-top');
  if (btt) {
    if (window.scrollY > window.innerHeight / 2) {
      btt.style.display = 'flex';
    } else {
      btt.style.display = 'none';
    }
  }
});

document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Event Listeners for Nav
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href').substring(1);
    navigateTo(target);
  });
});

document.addEventListener('nav', (e) => {
  navigateTo(e.detail);
});

function initFloatingEmojis() {
  const container = document.createElement('div');
  container.id = 'emoji-layer';
  container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -2;';
  document.body.appendChild(container);

  const emojis = ['⭐', '☄️', '✨', '🌠', '🌟'];
  for (let i = 0; i < 15; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'emoji-particle';
    const type = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.innerText = type;

    const size = Math.random() * 20 + 10;
    const duration = Math.random() * 15 + 15;
    const mx = (Math.random() - 0.5) * 150;
    const my = (Math.random() - 0.5) * 150;

    emoji.style.setProperty('--top', Math.random() * 100 + '%');
    emoji.style.setProperty('--left', Math.random() * 100 + '%');
    emoji.style.setProperty('--size', size + 'px');
    emoji.style.setProperty('--opacity', Math.random() * 0.2 + 0.1);
    emoji.style.setProperty('--duration', duration + 's');
    emoji.style.setProperty('--mx', mx + 'px');
    emoji.style.setProperty('--my', my + 'px');

    container.appendChild(emoji);
  }
}

// Initial Load
function init() {
  initStarfield();
  animateStars();
  initFloatingEmojis();

  // Inject sections
  Object.keys(SECTIONS).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = SECTIONS[id];
  });

  // File Upload listener
  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'reg-photo') {
      const file = e.target.files[0];
      const fileNameDisplay = document.getElementById('file-name');

      if (file) {
        // LIMIT SIZE: 2MB (2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          alert("⚠️ The file is too large! Please choose an image smaller than 2MB.");
          e.target.value = ""; // Clear the input
          if (fileNameDisplay) {
            fileNameDisplay.innerHTML = `❌ File too large (Max 2MB)`;
            fileNameDisplay.style.color = '#ff4444';
          }
          return;
        }

        if (fileNameDisplay) {
          fileNameDisplay.innerHTML = `⏳ Processing: ${file.name}...`;
          fileNameDisplay.style.color = 'var(--gold-supernova)';

          const reader = new FileReader();
          reader.onload = (event) => {
            const base64String = event.target.result.split(',')[1];
            registrationData['photoData'] = base64String;
            registrationData['photoName'] = file.name;
            registrationData['photoType'] = file.type;

            fileNameDisplay.innerHTML = `✅ ${file.name} ready for launch!`;
          };
          reader.onerror = () => {
            fileNameDisplay.innerHTML = `❌ Error processing photo.`;
            fileNameDisplay.style.color = '#ff4444';
          };
          reader.readAsDataURL(file);
        }
      }
    }
  });

  initMagneticButtons();
  initParallax();
  initForm();

  navigateTo('home');
}

window.addEventListener('resize', initStarfield);
document.addEventListener('DOMContentLoaded', init);
