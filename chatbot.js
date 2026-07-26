/* ==========================================================================
   AI PORTFOLIO ASSISTANT CHATBOT (chatbot.js)
   Renders a smart client-side conversational AI to interface with recruiters.
   ========================================================================== */

class PortfolioBot {
  constructor() {
    this.toggleBtn = document.getElementById('chatbot-toggle');
    this.panel = document.getElementById('chatbot-panel');
    this.closeIcon = this.toggleBtn.querySelector('.chat-close-icon');
    this.openIcon = this.toggleBtn.querySelector('.chat-open-icon');
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.form = document.getElementById('chatbot-form');
    this.input = document.getElementById('chatbot-input');
    this.promptsContainer = document.getElementById('chatbot-prompts');
    
    // Knowledge Base mapping for client-side response matching
    this.knowledgeBase = {
      about: "Saritha Kamatham is a <strong>Java Developer</strong>, <strong>Full Stack Developer</strong>, and <strong>AI Engineer</strong>. She is pursuing B.Tech in Computer Science at Madanapalle Institute of Technology and Science with a stellar CGPA of 9.67/10. She specializes in Java Enterprise Architecture, Servlets, JDBC, MERN Full Stack, and AI Model integrations.",
      skills: "Her primary skillsets are:<br>• <strong>Java & Enterprise:</strong> Java (Core & Advanced), Java Servlets, JDBC, OOP, Data Structures & Algorithms, MySQL<br>• <strong>Full Stack Development:</strong> React.js, Node.js, Express.js, MongoDB, JavaScript, TypeScript<br>• <strong>AI & Cloud:</strong> NLP, Google AI Studio, Machine Learning, AWS, GCP, Git, GitHub",
      projects: "Here are her top projects, featuring Java Enterprise applications first:<br>1. <strong><a href='https://github.com/Saritha-kamatham/Java-JDBC-ECommerce-Analytics-System' target='_blank' class='info-link'>Java E-Commerce Analytics</a>:</strong> Enterprise business engine built with JDBC & MySQL.<br>2. <strong><a href='https://github.com/Saritha-kamatham/Employee-Management-System-Servlet' target='_blank' class='info-link'>Employee Management Servlet</a>:</strong> Full CRUD Java Servlet architecture.<br>3. <strong><a href='https://github.com/Saritha-kamatham/food-delivery-app' target='_blank' class='info-link'>Food Delivery System</a>:</strong> Java order processing platform.<br>4. <strong><a href='https://github.com/Saritha-kamatham/enterprise-freelance-marketplace' target='_blank' class='info-link'>Enterprise Freelance Marketplace</a>:</strong> Full Stack portal.<br>5. <strong><a href='https://github.com/Saritha-kamatham/StudySync-MERN-App' target='_blank' class='info-link'>StudySync</a>:</strong> Collaborative study rooms.<br>6. <strong><a href='https://github.com/Saritha-kamatham/InternAstra' target='_blank' class='info-link'>InternAstra</a>:</strong> AI internship matcher.",
      experience: "Saritha has completed 4 key verified internships:<br>• <strong>Java Developer Intern</strong> at Alfido Tech (May 2026 – Jul 2026, Cert ID: BS/REG/121448): Built Java OOP backend services, Data Structures, & MySQL data architecture.<br>• <strong>AI & Full Stack NLP Intern</strong> at Study Owl Education (Jun 2025 – Aug 2025): Built SkillBuddy AI learning hub & custom Telegram AI Bot.<br>• <strong>Web Developer in PHP & MySQL Intern</strong> at ApexPlanet Software Pvt. Ltd. (Jun 2025 – Jul 2025, Cert ID: APSPL2508880): Engineered dynamic web apps and database schemas.<br>• <strong>Data Science Intern</strong> at Infotact Solutions (Apr 2025 – Jun 2025): Machine learning models & Theta processing tool.",
      contact: "You can reach Saritha via:<br>• <strong>Email:</strong> <a href='mailto:sarithakamatham2006@gmail.com' class='info-link'>sarithakamatham2006@gmail.com</a><br>• <strong>Phone:</strong> +91 7013833020<br>• <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/saritha-kamatham-0551402a9' target='_blank' class='info-link'>linkedin.com/in/saritha-kamatham-0551402a9</a><br>• <strong>GitHub:</strong> <a href='https://github.com/Saritha-kamatham' target='_blank' class='info-link'>github.com/Saritha-kamatham</a><br>• <strong>LeetCode:</strong> <a href='https://leetcode.com/u/Saritha-Kamatham/' target='_blank' class='info-link'>leetcode.com/u/Saritha-Kamatham/</a><br>• <strong>HackerRank:</strong> <a href='https://www.hackerrank.com/profile/sarithakamatham2' target='_blank' class='info-link'>hackerrank.com/profile/sarithakamatham2</a>",
      achievements: "Key Accolades include:<br>• Published co-authored paper in <strong>IEEE</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_research-conference-ieee-activity-7374625782599462913-Svyn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View IEEE Post</a>).<br>• <strong>Top 25 GDG Code Vipasana Achiever</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_top25-codevipassana-googlecloud-activity-7425245594689953792--tfo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View GDG Post</a>).<br>• <strong>Japanese Language Learning Milestone</strong> (<a href='https://www.linkedin.com/posts/saritha-kamatham-0551402a9_japanese-languagelearning-consistency-activity-7481394070142210049-_wbA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEo8oEEBmVZZ1AcjlxNHu6B2Y19FC9dxyEc' target='_blank' class='info-link'>View Japanese Post</a>).<br>• <strong>2nd Prize</strong> at AAPS Hackathon.<br>• <strong>100+ LeetCode Solved</strong> (<a href='https://leetcode.com/u/Saritha-Kamatham/' target='_blank' class='info-link'>View Profile</a>).<br>• <strong>5 Star HackerRank Badge</strong> (<a href='https://www.hackerrank.com/profile/sarithakamatham2' target='_blank' class='info-link'>View Profile</a>).<br>• <strong>32+ GitHub Repositories</strong>.<br>• Participant in Google Gemini Hackathon.",
      certifications: "She holds certifications in:<br>• AWS Cloud Foundations<br>• Generative AI (GeeksforGeeks)<br>• Generative AI (GUVI-HCL)<br>• Python Programming (Microsoft Skill India)<br>• DSA with C (Great Learning)<br>• Prompt Engineering (LinkedIn)"
    };
    
    this.setupListeners();
  }
  
  setupListeners() {
    this.toggleBtn.addEventListener('click', () => this.togglePanel());
    
    this.promptsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('prompt-chip')) {
        const query = e.target.getAttribute('data-query');
        this.input.value = query;
        this.handleSubmit();
      }
    });
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  togglePanel() {
    this.panel.classList.remove('hidden');
    const isActive = this.panel.classList.toggle('active');
    if (this.closeIcon) this.closeIcon.classList.toggle('hidden', !isActive);
    if (this.openIcon) this.openIcon.classList.toggle('hidden', isActive);
    
    if (isActive) {
      setTimeout(() => this.input.focus(), 300);
      const tooltip = this.toggleBtn.querySelector('.chatbot-tooltip');
      if (tooltip) tooltip.style.opacity = '0';
    } else {
      const tooltip = this.toggleBtn.querySelector('.chatbot-tooltip');
      if (tooltip) tooltip.style.opacity = '';
    }
  }
  
  handleSubmit() {
    const rawText = this.input.value.trim();
    if (!rawText) return;
    
    this.appendMessage(rawText, 'user');
    this.input.value = '';
    
    const loadingMessageId = this.appendLoading();
    
    setTimeout(() => {
      this.removeLoading(loadingMessageId);
      const reply = this.processQuery(rawText);
      this.appendMessage(reply, 'bot');
    }, 650);
  }
  
  processQuery(text) {
    const query = text.toLowerCase().trim();
    
    // 1. PROJECTS (Check first so phrases like "about her projects" return projects)
    if (query.includes('project') || query.includes('repo') || query.includes('codebase') || query.includes('build') || query.includes('work') || query.includes('skillbuddy') || query.includes('internastra') || query.includes('messagetrust') || query.includes('studysync') || query.includes('food') || query.includes('employee')) {
      return this.knowledgeBase.projects;
    }
    
    // 2. SKILLS & TECH
    if (query.includes('skill') || query.includes('stack') || query.includes('technology') || query.includes('technologies') || query.includes('program') || query.includes('python') || query.includes('java')) {
      return this.knowledgeBase.skills;
    }
    
    // 3. EXPERIENCE & INTERNSHIPS
    if (query.includes('experience') || query.includes('intern') || query.includes('job') || query.includes('history') || query.includes('company') || query.includes('alfido') || query.includes('study owl') || query.includes('infotact') || query.includes('apexplanet')) {
      return this.knowledgeBase.experience;
    }
    
    // 4. CONTACT & PROFILES
    if (query.includes('contact') || query.includes('reach') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('linkedin') || query.includes('github') || query.includes('leetcode') || query.includes('hackerrank')) {
      return this.knowledgeBase.contact;
    }
    
    // 5. ACHIEVEMENTS & AWARDS
    if (query.includes('achievement') || query.includes('hackathon') || query.includes('award') || query.includes('prize') || query.includes('ieee') || query.includes('gdg') || query.includes('japanese')) {
      return this.knowledgeBase.achievements;
    }
    
    // 6. CERTIFICATIONS
    if (query.includes('cert') || query.includes('credential') || query.includes('aws') || query.includes('course')) {
      return this.knowledgeBase.certifications;
    }
    
    // 7. GENERAL BIO (Only if specifically asking about Saritha)
    if (query.includes('who') || query.includes('about saritha') || query.includes('background') || query.includes('bio') || query.includes('tell me about saritha') || query.includes('who is she')) {
      return this.knowledgeBase.about;
    }
    
    // 8. GREETINGS
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "Hello! 👋 I am Saritha's AI Portfolio Assistant. Ask me about her 32+ GitHub projects, Java Enterprise skills, 4 verified internships, or contact links!";
    }
    
    return "I am Saritha's AI Portfolio Assistant! Try asking me about:<br>• Her <strong>Projects</strong> (Java E-Commerce, Servlets, SkillBuddy, StudySync)<br>• Her <strong>4 Internships</strong> (Alfido Tech Java, Study Owl AI, ApexPlanet Web, Infotact)<br>• Her <strong>Skills & CGPA</strong> (9.67/10 at MITS)<br>• Her <strong>Contact links</strong> (Email, LinkedIn, LeetCode, HackerRank).";
  }
  
  appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    
    if (sender === 'bot') {
      const container = document.createElement('div');
      container.classList.add('bot-msg-container');
      
      const avatar = document.createElement('div');
      avatar.classList.add('msg-bot-avatar');
      avatar.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2v1a7 7 0 0 1 7 7v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a7 7 0 0 1 7-7V4a2 2 0 0 1 2-2zm-5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8.5 17a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/></svg>`;
      
      const bubble = document.createElement('div');
      bubble.classList.add('chat-bubble');
      bubble.innerHTML = text;
      
      container.appendChild(avatar);
      container.appendChild(bubble);
      msgDiv.appendChild(container);
    } else {
      const bubble = document.createElement('div');
      bubble.classList.add('chat-bubble');
      bubble.innerHTML = text;
      msgDiv.appendChild(bubble);
    }
    
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }
  
  appendLoading() {
    const id = 'loading-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'bot');
    msgDiv.setAttribute('id', id);
    
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    bubble.style.opacity = '0.7';
    bubble.innerHTML = "<span class='typing-indicator'>System typing...</span>";
    
    msgDiv.appendChild(bubble);
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return id;
  }
  
  removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }
  
  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioBot();
});
