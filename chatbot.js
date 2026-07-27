/* ==========================================================================
   AI PORTFOLIO ASSISTANT CHATBOT (chatbot.js)
   Real-Time DOM Indexer & Word-by-Word LLM Token Streaming Engine.
   ========================================================================== */

class PortfolioBot {
  constructor() {
    this.toggleBtn = document.getElementById('chatbot-toggle');
    this.panel = document.getElementById('chatbot-panel');
    this.closeIcon = this.toggleBtn ? this.toggleBtn.querySelector('.chat-close-icon') : null;
    this.openIcon = this.toggleBtn ? this.toggleBtn.querySelector('.chat-open-icon') : null;
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.form = document.getElementById('chatbot-form');
    this.input = document.getElementById('chatbot-input');
    this.promptsContainer = document.getElementById('chatbot-prompts');
    
    // Conversation history memory
    this.conversationHistory = [];
    
    // Live Page DOM Index Knowledge
    this.liveDomKnowledge = "";
    
    // Pre-indexed Core Knowledge Base
    this.knowledgeBase = {
      intro: "Hello! 👋 I am <strong>Saritha Kamatham</strong>, a Computer Science & Engineering scholar specializing in <strong>Java Enterprise Systems</strong>, <strong>Full Stack MERN Development</strong>, and <strong>AI Engineering</strong>.<br><br>I am currently pursuing my B.Tech degree at <strong>Madanapalle Institute of Technology and Science (MITS)</strong>, maintaining a top-tier academic standing of <strong>9.67 / 10 CGPA</strong>.<br><br><strong>🌟 Key Career Highlights:</strong><br>• <strong>4 Verified Internships:</strong> Java Developer Intern at <em>Alfido Tech</em> (Cert ID: BS/REG/121448), AI & Full Stack NLP Intern at <em>Study Owl Education</em>, Web Developer at <em>ApexPlanet</em> (Cert ID: APSPL2508880), and Data Science Intern at <em>Infotact Solutions</em>.<br>• <strong>Research & Honors:</strong> Co-authored a published <strong>IEEE research paper</strong>, achieved <strong>Top 25 in GDG Code Vipasana</strong>, and won 2nd Prize at the AAPS Hackathon.<br>• <strong>Algorithmic Mastery:</strong> Solved <strong>100+ LeetCode problems</strong>, earned a <strong>5-Star Gold Badge on HackerRank</strong>, and engineered <strong>32+ open-source GitHub repositories</strong>.<br>• <strong>Continuous Mindset:</strong> Actively learning Japanese to collaborate in global tech environments!",

      strengths: "Key Engineering Strengths:<br>1. <strong>Java Enterprise Mastery:</strong> Expert in Java Core/Advanced, Servlets, JDBC, OOP, Data Structures & Relational MySQL.<br>2. <strong>Academic Excellence:</strong> Maintained a top-tier 9.67/10 CGPA at MITS.<br>3. <strong>Proven Industry Track Record:</strong> 4 verified internships across Java Development, Full Stack MERN, AI NLP, and Data Science.<br>4. <strong>Research & Algorithmic Rigor:</strong> Published IEEE research paper & 100+ LeetCode problems solved (5★ HackerRank Gold).<br>5. <strong>Global Vision:</strong> Actively learning Japanese to collaborate in international engineering teams.",

      weakness: "Growth Focus & Areas of Improvement:<br>• Saritha tends to be a perfectionist with system architecture, often spending extra time refining code elegance. Her active growth focus is balancing architectural perfection with rapid agile iterations.<br>• She is also continuously expanding her knowledge from monolithic servlets into large-scale cloud-native microservices.",

      whyHire: "Why Hire Saritha?<br>• <strong>Production-Ready Skillset:</strong> Deep hands-on experience in Java, Servlets, JDBC, React, Node.js, and AI API integrations.<br>• <strong>Proven Versatility:</strong> 4 verified internships (Alfido Tech Java, Study Owl AI, ApexPlanet Web, Infotact Data Science).<br>• <strong>Top Academics & Research:</strong> 9.67/10 CGPA + Published IEEE Research Paper + Top 25 GDG Code Vipasana.<br>• She is ready to deliver clean, scalable backend and full-stack software from Day 1.",

      about: "Saritha Kamatham is a high-achieving Computer Science Scholar & Developer.<br>• <strong>Core Focus:</strong> Java Enterprise Architecture, Full Stack Web Systems, AI Engineering.<br>• <strong>Education:</strong> B.Tech in CSE (AI) at MITS (CGPA: <strong>9.67/10</strong>).<br>• <strong>Track Record:</strong> 4 Verified Internships, 32+ GitHub Repos, Published IEEE Paper, Top 25 GDG Code Vipasana Achiever.",

      skills: "Technical Skillsets:<br>• <strong>Java & Backend:</strong> Java (Core & Advanced), Java Servlets, JDBC, OOP, Data Structures & Algorithms, MySQL<br>• <strong>Full Stack Web:</strong> React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), HTML5/CSS3<br>• <strong>AI & Data Science:</strong> NLP, Google AI Studio, Machine Learning, Python, Data Analytics<br>• <strong>Dev Tools & Cloud:</strong> Git, GitHub, AWS, GCP, REST APIs, Postman",

      projects: "Top Portfolio Projects:<br>1. <strong><a href='https://github.com/Saritha-kamatham/Java-JDBC-ECommerce-Analytics-System' target='_blank' class='info-link'>Java E-Commerce Analytics Engine</a>:</strong> Enterprise system with JDBC & MySQL.<br>2. <strong><a href='https://github.com/Saritha-kamatham/Employee-Management-System-Servlet' target='_blank' class='info-link'>Employee Servlet CRUD App</a>:</strong> Full Java Servlet architecture.<br>3. <strong><a href='https://github.com/Saritha-kamatham/food-delivery-app' target='_blank' class='info-link'>Food Delivery System</a>:</strong> Real-time order processing.<br>4. <strong><a href='https://github.com/Saritha-kamatham/enterprise-freelance-marketplace' target='_blank' class='info-link'>Enterprise Freelance Marketplace</a>:</strong> Full Stack portal.<br>5. <strong><a href='https://github.com/Saritha-kamatham/StudySync-MERN-App' target='_blank' class='info-link'>StudySync</a>:</strong> Collaborative MERN rooms.<br>6. <strong><a href='https://github.com/Saritha-kamatham/InternAstra' target='_blank' class='info-link'>InternAstra</a>:</strong> Gemini AI internship matcher.",

      experience: "4 Key Verified Internships:<br>• <strong>Java Developer Intern</strong> at Alfido Tech (May 2026 – Jul 2026, Cert ID: BS/REG/121448): Java OOP backend, Data Structures, & MySQL architecture.<br>• <strong>AI & Full Stack NLP Intern</strong> at Study Owl Education (Jun 2025 – Aug 2025): SkillBuddy AI hub & Telegram AI Bot.<br>• <strong>Web Developer in PHP & MySQL Intern</strong> at ApexPlanet Software (Jun 2025 – Jul 2025, Cert ID: APSPL2508880): Dynamic web apps & database schemas.<br>• <strong>Data Science Intern</strong> at Infotact Solutions (Apr 2025 – Jun 2025): Machine learning models & Theta tool.",

      education: "Education Details:<br>• <strong>Degree:</strong> B.Tech in Computer Science & Engineering (Artificial Intelligence)<br>• <strong>Institution:</strong> Madanapalle Institute of Technology & Science (MITS), Andhra Pradesh<br>• <strong>CGPA:</strong> <strong>9.67 / 10.0</strong><br>• <strong>Highlights:</strong> Top-ranked academic standing, published IEEE research paper, and 4 verified industry internships.",

      contact: "Reach Saritha via:<br>• <strong>Email:</strong> <a href='mailto:sarithakamatham2006@gmail.com' class='info-link'>sarithakamatham2006@gmail.com</a><br>• <strong>Phone:</strong> +91 7013833020<br>• <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/saritha-kamatham-0551402a9' target='_blank' class='info-link'>linkedin.com/in/saritha-kamatham-0551402a9</a><br>• <strong>GitHub:</strong> <a href='https://github.com/Saritha-kamatham' target='_blank' class='info-link'>github.com/Saritha-kamatham</a><br>• <strong>LeetCode:</strong> <a href='https://leetcode.com/u/Saritha-Kamatham/' target='_blank' class='info-link'>leetcode.com/u/Saritha-Kamatham/</a><br>• <strong>HackerRank:</strong> <a href='https://www.hackerrank.com/profile/sarithakamatham2' target='_blank' class='info-link'>hackerrank.com/profile/sarithakamatham2</a>",

      achievements: "Accolades & Highlights:<br>• Published paper in <strong>IEEE</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_research-conference-ieee-activity-7374625782599462913-Svyn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View IEEE Post</a>).<br>• <strong>Top 25 GDG Code Vipasana Achiever</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_top25-codevipassana-googlecloud-activity-7425245594689953792--tfo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View GDG Post</a>).<br>• <strong>Japanese Language Learning Milestone</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_japanese-languagelearning-consistency-activity-7481394070142210049-_wbA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View Japanese Post</a>).<br>• <strong>2nd Prize</strong> at AAPS Hackathon.<br>• <strong>100+ LeetCode Solved</strong> & <strong>5 Star HackerRank Gold Badge</strong>.<br>• <strong>32+ GitHub Repositories</strong>.",

      hobbies: "Outside of engineering software backends, Saritha is dedicated to learning **Japanese Language & Culture**, solving complex algorithmic puzzles on LeetCode, and exploring generative AI frameworks!",

      roles: "Target Roles:<br>Saritha is actively seeking roles as a <strong>Java Software Engineer</strong>, <strong>Backend Developer</strong>, <strong>Full Stack MERN Developer</strong>, or <strong>AI Engineer</strong>."
    };
    
    this.indexLiveDOM();
    this.setupListeners();
  }

  // Real-time DOM Scanner & Indexer
  indexLiveDOM() {
    try {
      const snippets = [];
      const cards = document.querySelectorAll('.project-card, .timeline-item, .cert-card, .achievement-card, .bento-card');
      cards.forEach(card => {
        const text = card.innerText.replace(/\s+/g, ' ').trim();
        if (text.length > 15) snippets.push(text);
      });
      this.liveDomKnowledge = snippets.join('\n---\n');
    } catch (e) {
      console.warn("DOM Indexer warning:", e);
    }
  }
  
  setupListeners() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.togglePanel());
    }
    
    if (this.promptsContainer) {
      this.promptsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.prompt-chip');
        if (chip) {
          const query = chip.getAttribute('data-query');
          if (query) {
            this.input.value = query;
            this.handleSubmit();
          }
        }
      });
    }
    
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }
  
  togglePanel() {
    if (!this.panel) return;
    this.panel.classList.remove('hidden');
    const isActive = this.panel.classList.toggle('active');
    if (this.closeIcon) this.closeIcon.classList.toggle('hidden', !isActive);
    if (this.openIcon) this.openIcon.classList.toggle('hidden', isActive);
    
    if (isActive) {
      // Re-index live DOM whenever user opens panel to catch any live DOM changes!
      this.indexLiveDOM();
      setTimeout(() => {
        if (this.input) this.input.focus();
      }, 300);
      const tooltip = this.toggleBtn ? this.toggleBtn.querySelector('.chatbot-tooltip') : null;
      if (tooltip) tooltip.style.opacity = '0';
    } else {
      const tooltip = this.toggleBtn ? this.toggleBtn.querySelector('.chatbot-tooltip') : null;
      if (tooltip) tooltip.style.opacity = '';
    }
  }
  
  handleSubmit() {
    if (!this.input) return;
    const rawText = this.input.value.trim();
    if (!rawText) return;
    
    this.appendMessage(rawText, 'user');
    this.conversationHistory.push({ role: 'user', content: rawText });
    this.input.value = '';
    
    const loadingMessageId = this.appendLoading();
    
    setTimeout(() => {
      this.removeLoading(loadingMessageId);
      const reply = this.processQuery(rawText);
      this.streamMessage(reply);
      this.conversationHistory.push({ role: 'bot', content: reply });
    }, 450);
  }
  
  processQuery(text) {
    const query = text.toLowerCase().trim();
    
    // Re-index live DOM dynamically
    this.indexLiveDOM();

    // 1. SPECIFIC WEAKNESS / GROWTH AREA
    if (query.includes('weakness') || query.includes('growth area') || query.includes('flaw') || query.includes('improve')) {
      return this.knowledgeBase.weakness;
    }

    // 2. SPECIFIC STRENGTHS / WHY HIRE
    if (query.includes('strength') || query.includes('strong point') || query.includes('advantage') || query.includes('why hire') || query.includes('good at')) {
      return query.includes('why hire') ? this.knowledgeBase.whyHire : this.knowledgeBase.strengths;
    }

    // 3. COMPREHENSIVE SELF INTRO / OVERVIEW
    if (query.includes('intro') || query.includes('self') || query.includes('yourself') || query.includes('introduce') || query.includes('who are you') || query.includes('summary') || query.includes('overview') || query.includes('tell me about yourself')) {
      return this.knowledgeBase.intro;
    }

    // 4. HOBBIES / JAPANESE / INTERESTS
    if (query.includes('hobby') || query.includes('hobbies') || query.includes('japanese') || query.includes('free time') || query.includes('interest')) {
      return this.knowledgeBase.hobbies;
    }

    // 5. EDUCATION / COLLEGE / MITS / CGPA
    if (query.includes('education') || query.includes('mits') || query.includes('cgpa') || query.includes('college') || query.includes('university') || query.includes('gpa') || query.includes('study') || query.includes('marks') || query.includes('degree')) {
      return this.knowledgeBase.education;
    }

    // 6. TARGET ROLES
    if (query.includes('role') || query.includes('position') || query.includes('career') || query.includes('job') || query.includes('future') || query.includes('looking for')) {
      return this.knowledgeBase.roles;
    }

    // 7. SPECIFIC PROJECT LOOKUPS IN LIVE DOM
    if (query.includes('internastra')) {
      return "<strong>InternAstra – AI Internship Matching Platform:</strong><br>An intelligent recommendation web app parsing candidate resumes using Google Gemini AI models, extracting key technical skills, and semantically aligning applicants with live internship roles.<br>• <a href='https://github.com/Saritha-kamatham/InternAstra' target='_blank' class='info-link'>GitHub Repository</a>";
    }
    if (query.includes('messagetrust') || query.includes('risk analyzer') || query.includes('scam')) {
      return "<strong>MessageTrust-AI – Real-Time Message Risk Analyzer:</strong><br>A real-time NLP application evaluating digital message trustworthiness. Analyzes intent, urgency, and phishing risk patterns using Google AI Studio API models.<br>• <a href='https://github.com/Saritha-kamatham/MessageTrust-AI' target='_blank' class='info-link'>GitHub Repository</a>";
    }
    if (query.includes('skillbuddy')) {
      return "<strong>SkillBuddy AI Learning Platform:</strong><br>Full-stack educational platform built during Study Owl internship featuring secure auth, course analytics, mentor interactions, and an NLP Telegram chatbot.<br>• <a href='https://github.com/Saritha-kamatham/SkillBuddy-AI' target='_blank' class='info-link'>GitHub Repository</a>";
    }
    if (query.includes('studysync')) {
      return "<strong>StudySync – Collaborative MERN Platform:</strong><br>Real-time collaborative study platform with virtual study rooms, live chat, synchronized Pomodoro focus timers, and JWT auth.<br>• <a href='https://github.com/Saritha-kamatham/StudySync-MERN-App' target='_blank' class='info-link'>GitHub Repository</a>";
    }

    // GENERAL PROJECTS
    if (query.includes('project') || query.includes('repo') || query.includes('codebase') || query.includes('build') || query.includes('work') || query.includes('food') || query.includes('employee') || query.includes('e-commerce') || query.includes('all projects')) {
      return this.knowledgeBase.projects;
    }
    
    // 8. SKILLS & TECH
    if (query.includes('skill') || query.includes('stack') || query.includes('technology') || query.includes('technologies') || query.includes('program') || query.includes('python') || query.includes('java') || query.includes('react') || query.includes('node') || query.includes('mysql')) {
      return this.knowledgeBase.skills;
    }
    
    // 9. SPECIFIC INTERNSHIPS (Alfido, Study Owl, ApexPlanet, Infotact)
    if (query.includes('alfido')) {
      return "<strong>Alfido Tech – Java Developer Intern:</strong><br>Completed a 2-month professional Java Developer Internship (May 2026 – Jul 2026, Candidate ID: <strong>BS/REG/121448</strong>), AICTE and MSME recognized. Engineered Java OOP backend services, Data Structures, and relational MySQL data architecture.";
    }
    if (query.includes('study owl') || query.includes('owl')) {
      return "<strong>Study Owl Education – AI & Full Stack NLP Intern:</strong><br>Designed and developed SkillBuddy AI Learning Platform from scratch using React.js, Node.js, and MongoDB. Programmed an NLP AI chatbot and Telegram bot (Jun 2025 – Aug 2025).";
    }
    if (query.includes('apexplanet') || query.includes('apex')) {
      return "<strong>ApexPlanet Software – Web Developer in PHP & MySQL Intern:</strong><br>Completed a virtual internship (Jun 2025 – Jul 2025, Cert ID: <strong>APSPL2508880</strong>), AICTE and MSME recognized. Built dynamic web interfaces and MySQL database schemas.";
    }
    if (query.includes('infotact')) {
      return "<strong>Infotact Solutions – Data Science Intern:</strong><br>Structured raw tables into dashboards, formulated Machine Learning models, geospatial analytics, and co-engineered backend for data tool Theta (Apr 2025 – Jun 2025).";
    }
    if (query.includes('experience') || query.includes('intern') || query.includes('company')) {
      return this.knowledgeBase.experience;
    }
    
    // 10. CONTACT & SOCIAL PROFILES
    if (query.includes('contact') || query.includes('reach') || query.includes('email') || query.includes('phone') || query.includes('linkedin') || query.includes('github') || query.includes('leetcode') || query.includes('hackerrank') || query.includes('mail')) {
      return this.knowledgeBase.contact;
    }
    
    // 11. ACHIEVEMENTS & AWARDS & IEEE RESEARCH
    if (query.includes('achievement') || query.includes('hackathon') || query.includes('award') || query.includes('prize') || query.includes('ieee') || query.includes('gdg') || query.includes('paper') || query.includes('publication') || query.includes('research')) {
      return this.knowledgeBase.achievements;
    }
    
    // 12. CERTIFICATIONS
    if (query.includes('cert') || query.includes('credential') || query.includes('aws') || query.includes('course')) {
      return this.knowledgeBase.certifications;
    }
    
    // 13. DYNAMIC FALLBACK MATCHING AGAINST LIVE DOM KNOWLEDGE
    if (this.liveDomKnowledge) {
      const lines = this.liveDomKnowledge.split('\n---\n');
      const matches = lines.filter(line => line.toLowerCase().includes(query));
      if (matches.length > 0) {
        return `<strong>Real-Time Live Webpage Match:</strong><br>${matches[0].substring(0, 300)}...`;
      }
    }
    
    // 14. BIO / GENERAL WHO IS SARITHA
    if (query.includes('who') || query.includes('saritha') || query.includes('bio') || query.includes('background')) {
      return this.knowledgeBase.about;
    }
    
    // 15. GREETINGS
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
      return "Hello! 👋 I am Saritha's AI Portfolio Assistant. Ask me anything about her <strong>Self Intro</strong>, <strong>Strengths</strong>, <strong>Growth Areas</strong>, <strong>Java Projects</strong>, <strong>4 Internships</strong>, or <strong>Contact Information</strong>!";
    }

    if (query.includes('thank') || query.includes('thanks') || query.includes('great') || query.includes('awesome')) {
      return "You're very welcome! 😊 Feel free to ask any other questions about Saritha's engineering experience.";
    }
    
    return "I am Saritha's AI Portfolio Agent! Ask me anything about:<br>• Her <strong>Full Self Introduction</strong> & <strong>Strengths</strong><br>• Her <strong>Growth Area / Weakness</strong><br>• Her <strong>Projects</strong> (InternAstra, Java E-Commerce, SkillBuddy, StudySync)<br>• Her <strong>4 Internships</strong> (Alfido Tech Java, Study Owl AI, ApexPlanet Web, Infotact)<br>• Her <strong>Education & CGPA</strong> (9.67/10 at MITS)<br>• Her <strong>Contact Information</strong> (Email, LinkedIn, LeetCode).";
  }
  
  appendMessage(text, sender) {
    if (!this.messagesContainer) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    bubble.innerHTML = text;
    
    msgDiv.appendChild(bubble);
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  // Real-Time Word-by-Word LLM Token Streaming Loop
  streamMessage(text) {
    if (!this.messagesContainer) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'bot');
    
    const container = document.createElement('div');
    container.classList.add('bot-msg-container');
    
    const avatar = document.createElement('div');
    avatar.classList.add('msg-bot-avatar');
    avatar.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2v1a7 7 0 0 1 7 7v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a7 7 0 0 1 7-7V4a2 2 0 0 1 2-2zm-5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8.5 17a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/></svg>`;
    
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    bubble.innerHTML = '';
    
    container.appendChild(avatar);
    container.appendChild(bubble);
    msgDiv.appendChild(container);
    this.messagesContainer.appendChild(msgDiv);
    
    // Process HTML tags & token words for smooth live typewriter streaming
    const tokens = text.split(/(<br\s*\/?>|\s+)/);
    let index = 0;
    let currentContent = '';
    
    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index];
        bubble.innerHTML = currentContent + '<span class="typing-cursor">▌</span>';
        this.scrollToBottom();
        index++;
      } else {
        clearInterval(interval);
        bubble.innerHTML = text; // Final clean HTML
        this.scrollToBottom();
      }
    }, 24); // 24ms per token for fast, ultra-smooth LLM streaming!
  }
  
  appendLoading() {
    if (!this.messagesContainer) return null;
    const id = 'loading-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'bot');
    msgDiv.setAttribute('id', id);
    
    const container = document.createElement('div');
    container.classList.add('bot-msg-container');
    
    const avatar = document.createElement('div');
    avatar.classList.add('msg-bot-avatar');
    avatar.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2v1a7 7 0 0 1 7 7v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a7 7 0 0 1 7-7V4a2 2 0 0 1 2-2zm-5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8.5 17a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/></svg>`;
    
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    bubble.style.opacity = '0.7';
    bubble.innerHTML = "<span class='typing-indicator'>Streaming response...</span>";
    
    container.appendChild(avatar);
    container.appendChild(bubble);
    msgDiv.appendChild(container);
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return id;
  }
  
  removeLoading(id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  }
  
  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioBot = new PortfolioBot();
});
