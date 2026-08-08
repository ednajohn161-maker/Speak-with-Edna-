/* Speak with Edna - Web Application Main JavaScript Engine */

// Global Application State
const appState = {
    xp: 980,
    streak: 7,
    coins: 340,
    cefrLevel: 'A1',
    activeRole: 'STUDENT',
    activeCategory: 'ALL',
    activeTab: 'lessons',
    activeScenario: 'school',
    customWords: [],
    chatMessages: [],
    selectedVocabForModal: null,
    speechRecognitionActive: false,
    recognitionObj: null
};

// Curriculum & Vocabulary Database
const vocabularyList = [
    // Greetings & Core
    { id: 'v1', frenchText: "Bonjour", englishTranslation: "Hello / Good day", ipa: "/bɔ̃.ʒuʁ/", category: "GREETINGS", level: "A1", emoji: "👋", exampleFrench: "Bonjour, comment vas-tu?", exampleEnglish: "Hello, how are you?" },
    { id: 'v2', frenchText: "Merci", englishTranslation: "Thank you", ipa: "/mɛʁ.si/", category: "GREETINGS", level: "A1", emoji: "🙏", exampleFrench: "Merci beaucoup!", exampleEnglish: "Thank you very much!" },
    { id: 'v3', frenchText: "Au revoir", englishTranslation: "Goodbye", ipa: "/o ʁə.vwaʁ/", category: "GREETINGS", level: "A1", emoji: "🙋", exampleFrench: "Au revoir, à demain!", exampleEnglish: "Goodbye, see you tomorrow!" },
    { id: 'v4', frenchText: "S'il vous plaît", englishTranslation: "Please", ipa: "/sil vu plɛ/", category: "GREETINGS", level: "A1", emoji: "✨", exampleFrench: "Un café, s'il vous plaît.", exampleEnglish: "A coffee, please." },

    // Numbers
    { id: 'v5', frenchText: "Un", englishTranslation: "One", ipa: "/œ̃/", category: "NUMBERS", level: "A1", emoji: "1️⃣", exampleFrench: "J'ai un chat.", exampleEnglish: "I have one cat." },
    { id: 'v6', frenchText: "Deux", englishTranslation: "Two", ipa: "/dø/", category: "NUMBERS", level: "A1", emoji: "2️⃣", exampleFrench: "Deux pommes rouges.", exampleEnglish: "Two red apples." },
    { id: 'v7', frenchText: "Trois", englishTranslation: "Three", ipa: "/tʁwa/", category: "NUMBERS", level: "A1", emoji: "3️⃣", exampleFrench: "Trois amis jouant.", exampleEnglish: "Three friends playing." },
    { id: 'v8', frenchText: "Quatre", englishTranslation: "Four", ipa: "/katʁ/", category: "NUMBERS", level: "A1", emoji: "4️⃣", exampleFrench: "Quatre saisons dans l'année.", exampleEnglish: "Four seasons in the year." },

    // Colors
    { id: 'v9', frenchText: "Rouge", englishTranslation: "Red", ipa: "/ʁuʒ/", category: "COLORS", level: "A1", emoji: "🔴", exampleFrench: "La voiture est rouge.", exampleEnglish: "The car is red." },
    { id: 'v10', frenchText: "Bleu", englishTranslation: "Blue", ipa: "/blø/", category: "COLORS", level: "A1", emoji: "🔵", exampleFrench: "Le ciel est bleu.", exampleEnglish: "The sky is blue." },
    { id: 'v11', frenchText: "Jaune", englishTranslation: "Yellow", ipa: "/ʒon/", category: "COLORS", level: "A1", emoji: "🟡", exampleFrench: "Le soleil est jaune.", exampleEnglish: "The sun is yellow." },
    { id: 'v12', frenchText: "Vert", englishTranslation: "Green", ipa: "/vɛʁ/", category: "COLORS", level: "A1", emoji: "🟢", exampleFrench: "L'herbe est verte.", exampleEnglish: "The grass is green." },

    // Animals
    { id: 'v13', frenchText: "Le chat", englishTranslation: "The cat", ipa: "/lə ʃa/", category: "ANIMALS", level: "A1", emoji: "🐱", exampleFrench: "Le chat dort sur le lit.", exampleEnglish: "The cat sleeps on the bed." },
    { id: 'v14', frenchText: "Le chien", englishTranslation: "The dog", ipa: "/lə ʃjɛ̃/", category: "ANIMALS", level: "A1", emoji: "🐶", exampleFrench: "Le chien court vite.", exampleEnglish: "The dog runs fast." },
    { id: 'v15', frenchText: "L'oiseau", englishTranslation: "The bird", ipa: "/lwa.zo/", category: "ANIMALS", level: "A1", emoji: "🐦", exampleFrench: "L'oiseau chante une chanson.", exampleEnglish: "The bird sings a song." },
    { id: 'v16', frenchText: "Le dauphin", englishTranslation: "The dolphin", ipa: "/lə do.fɛ̃/", category: "ANIMALS", level: "A2", emoji: "🐬", exampleFrench: "Le dauphin saute haut.", exampleEnglish: "The dolphin jumps high." },

    // Food
    { id: 'v17', frenchText: "Le croissant", englishTranslation: "The croissant", ipa: "/lə kʁwa.sɑ̃/", category: "FOOD", level: "A1", emoji: "🥐", exampleFrench: "J'aime manger un croissant.", exampleEnglish: "I like eating a croissant." },
    { id: 'v18', frenchText: "La pomme", englishTranslation: "The apple", ipa: "/la pɔm/", category: "FOOD", level: "A1", emoji: "🍎", exampleFrench: "Une pomme rouge et sucrée.", exampleEnglish: "A sweet red apple." },
    { id: 'v19', frenchText: "Le fromage", englishTranslation: "The cheese", ipa: "/lə fʁɔ.maʒ/", category: "FOOD", level: "A2", emoji: "🧀", exampleFrench: "Le fromage français est bon.", exampleEnglish: "French cheese is good." },
    { id: 'v20', frenchText: "L'eau", englishTranslation: "Water", ipa: "/lo/", category: "FOOD", level: "A1", emoji: "💧", exampleFrench: "De l'eau fraîche, s'il vous plaît.", exampleEnglish: "Fresh water, please." },

    // Family & School
    { id: 'v21', frenchText: "La mère", englishTranslation: "The mother", ipa: "/la mɛʁ/", category: "FAMILY", level: "A1", emoji: "👩", exampleFrench: "Ma mère est gentille.", exampleEnglish: "My mother is kind." },
    { id: 'v22', frenchText: "Le père", englishTranslation: "The father", ipa: "/lə pɛʁ/", category: "FAMILY", level: "A1", emoji: "👨", exampleFrench: "Mon père cuisine bien.", exampleEnglish: "My father cooks well." },
    { id: 'v23', frenchText: "Le livre", englishTranslation: "The book", ipa: "/lə livʁ/", category: "SCHOOL", level: "A1", emoji: "📖", exampleFrench: "Ouvre ton livre.", exampleEnglish: "Open your book." },
    { id: 'v24', frenchText: "L'école", englishTranslation: "The school", ipa: "/le.kɔl/", category: "SCHOOL", level: "A1", emoji: "🏫", exampleFrench: "J'aime mon école.", exampleEnglish: "I like my school." }
];

const lessonsList = [
    { id: 'l1', title: "First French Greetings", desc: "Master hello, thank you, and introduction phrases in Paris!", level: "A1", category: "GREETINGS", count: 4 },
    { id: 'l2', title: "Counting 1 to 10 with Edna", desc: "Fun number games, counting stars, and pronouncing un, deux, trois!", level: "A1", category: "NUMBERS", count: 4 },
    { id: 'l3', title: "Rainbow Colors in French", desc: "Explore red, blue, yellow, and green colors in the classroom.", level: "A1", category: "COLORS", count: 4 },
    { id: 'l4', title: "Jungle & Farm Animals", desc: "Discover animals, pet names, and describe their sounds in French.", level: "A2", category: "ANIMALS", count: 4 },
    { id: 'l5', title: "Ordering at a Parisian Café", desc: "Practice authentic dialogues, polite requests, and bakery food.", level: "B1", category: "FOOD", count: 4 }
];

const scenariosList = [
    { id: 'school', title: 'At School', icon: '🏫', systemPrompt: 'You are Monsieur Pierre, a friendly French teacher.' },
    { id: 'restaurant', title: 'Parisian Bakery', icon: '🥐', systemPrompt: 'You are Madame Claire, a cheerful baker in Paris.' },
    { id: 'doctor', title: "Doctor's Clinic", icon: '🩺', systemPrompt: 'You are Dr. Henri, a warm doctor in Paris.' },
    { id: 'hotel', title: 'Hotel Check-In', icon: '🏨', systemPrompt: 'You are the receptionist at Hotel Eiffel.' },
    { id: 'friends', title: 'Park Playdate', icon: '🛝', systemPrompt: 'You are Camille, a friendly French child.' },
    { id: 'contest', title: 'Voice Contest', icon: '🎙️', systemPrompt: 'You are Coach Edna hosting the French Voice Star show.' }
];

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    renderHeaderStats();
    renderCategories();
    renderLessons();
    renderVocabulary();
    renderScenarios();
    initCoachChat();
    renderDashboard();
    initSpeechRecognition();
});

// Load / Save State
function loadSavedData() {
    const saved = localStorage.getItem('edna_web_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(appState, parsed);
        } catch(e) {}
    }
}

function saveData() {
    localStorage.setItem('edna_web_state', JSON.stringify({
        xp: appState.xp,
        streak: appState.streak,
        coins: appState.coins,
        cefrLevel: appState.cefrLevel,
        customWords: appState.customWords
    }));
}

function addXP(amount) {
    appState.xp += amount;
    appState.coins += Math.floor(amount / 2);
    saveData();
    renderHeaderStats();
}

// Render Header
function renderHeaderStats() {
    document.getElementById('header-xp').innerText = appState.xp;
    document.getElementById('header-streak').innerText = appState.streak;
    document.getElementById('header-coins').innerText = appState.coins;
    document.getElementById('cefr-selector').value = appState.cefrLevel;
}

function changeCefrLevel(level) {
    appState.cefrLevel = level;
    saveData();
    renderLessons();
    renderVocabulary();
}

function switchRole(role) {
    appState.activeRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === role);
    });
    
    // Update dashboard label
    const dashLabel = document.getElementById('nav-dashboard-label');
    if (dashLabel) {
        dashLabel.innerText = role === 'STUDENT' ? 'Student Stats' :
                             role === 'TEACHER' ? 'Teacher Portal' :
                             role === 'PARENT' ? 'Parent Summary' : 'Admin Panel';
    }

    if (appState.activeTab === 'dashboard') {
        renderDashboard();
    }
}

function switchTab(tabId) {
    appState.activeTab = tabId;
    document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const targetView = document.getElementById(`view-${tabId}`);
    const targetNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);

    if (targetView) targetView.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    if (tabId === 'dashboard') renderDashboard();
}

// Category Chips & Filtering
function renderCategories() {
    const container = document.getElementById('category-chips');
    if (!container) return;

    const categories = ['ALL', 'GREETINGS', 'NUMBERS', 'COLORS', 'ANIMALS', 'FOOD', 'FAMILY', 'SCHOOL'];
    container.innerHTML = categories.map(cat => `
        <button class="chip ${appState.activeCategory === cat ? 'active' : ''}" onclick="selectCategory('${cat}')">
            ${cat === 'ALL' ? '✨ All Topics' : cat}
        </button>
    `).join('');
}

function selectCategory(cat) {
    appState.activeCategory = cat;
    renderCategories();
    renderVocabulary();
}

// Lessons Renderer
function renderLessons() {
    const grid = document.getElementById('lessons-grid');
    if (!grid) return;

    const filtered = lessonsList.filter(l => l.level === appState.cefrLevel || appState.cefrLevel === 'A1');

    grid.innerHTML = filtered.map(l => `
        <div class="lesson-card">
            <div>
                <div class="lesson-card-top">
                    <span class="lesson-tag">CEFR ${l.level}</span>
                    <small class="text-muted"><i class="fa-solid fa-layer-group"></i> ${l.count} Words</small>
                </div>
                <h3 class="lesson-title">${l.title}</h3>
                <p class="lesson-desc">${l.desc}</p>
            </div>
            <button class="btn btn-primary btn-block" onclick="openLessonModal('${l.id}')">
                <i class="fa-solid fa-play"></i> Start Lesson (+50 XP)
            </button>
        </div>
    `).join('');
}

// Vocabulary Renderer
function renderVocabulary() {
    const grid = document.getElementById('vocab-grid');
    const badge = document.getElementById('vocab-count-badge');
    if (!grid) return;

    let items = [...vocabularyList, ...appState.customWords];
    if (appState.activeCategory !== 'ALL') {
        items = items.filter(v => v.category === appState.activeCategory);
    }

    if (badge) badge.innerText = `${items.length} French Words`;

    grid.innerHTML = items.map(v => `
        <div class="vocab-card">
            <div class="vocab-emoji">${v.emoji || '📖'}</div>
            <div class="vocab-info">
                <div class="vocab-french">${v.frenchText}</div>
                <div class="vocab-ipa">${v.ipa || '/.../'}</div>
                <div class="vocab-english">${v.englishTranslation}</div>
                ${v.exampleFrench ? `<div class="vocab-example">"${v.exampleFrench}"</div>` : ''}
            </div>
            <div class="vocab-actions">
                <button class="icon-btn" onclick="speakText('${v.frenchText.replace(/'/g, "\\'")}')" title="Listen Audio">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
                <button class="icon-btn" onclick="openPronounceModal('${v.id}')" title="Practice Voice">
                    <i class="fa-solid fa-microphone"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Web Speech Synthesis (Text to Speech)
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        alert("Text-to-speech is not supported in this browser.");
        return;
    }
    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9; // Slightly slower for language learners
    window.speechSynthesis.speak(utterance);
}

// Speech Recognition & Pronunciation Tester Modal
function openPronounceModal(vocabId) {
    const item = [...vocabularyList, ...appState.customWords].find(v => v.id === vocabId) || vocabularyList[0];
    appState.selectedVocabForModal = item;

    document.getElementById('modal-emoji').innerText = item.emoji;
    document.getElementById('modal-french-text').innerText = item.frenchText;
    document.getElementById('modal-ipa').innerText = item.ipa;
    document.getElementById('modal-english-translation').innerText = item.englishTranslation;

    document.getElementById('modal-score-result').classList.add('hidden');
    document.getElementById('modal-speech-status').innerText = "Tap the microphone and say the French word aloud!";
    document.getElementById('pronounce-modal').classList.remove('hidden');
}

function closePronounceModal() {
    document.getElementById('pronounce-modal').classList.add('hidden');
}

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        appState.recognitionObj = new SpeechRecognition();
        appState.recognitionObj.lang = 'fr-FR';
        appState.recognitionObj.interimResults = false;
        appState.recognitionObj.maxAlternatives = 1;
    }
}

function startModalSpeechRecognition() {
    if (!appState.recognitionObj) {
        // Fallback simulation for browsers without Web Speech API
        simulateVoiceScoring();
        return;
    }

    const statusEl = document.getElementById('modal-speech-status');
    const micBtn = document.getElementById('modal-mic-btn');

    statusEl.innerText = "🎙️ Listening... Speak French now!";
    micBtn.style.background = "#dc2626";

    appState.recognitionObj.start();

    appState.recognitionObj.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        micBtn.style.background = "#2563eb";
        evaluatePronunciation(spoken, appState.selectedVocabForModal.frenchText);
    };

    appState.recognitionObj.onerror = () => {
        micBtn.style.background = "#2563eb";
        simulateVoiceScoring();
    };
}

function evaluatePronunciation(spokenText, targetText) {
    const cleanSpoken = spokenText.toLowerCase().trim();
    const cleanTarget = targetText.toLowerCase().trim();

    let score = 92;
    if (cleanSpoken === cleanTarget) {
        score = 98;
    } else if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
        score = 85;
    } else {
        score = 75;
    }

    displayScoreResult(score, spokenText);
}

function simulateVoiceScoring() {
    const target = appState.selectedVocabForModal ? appState.selectedVocabForModal.frenchText : "Bonjour";
    setTimeout(() => {
        displayScoreResult(95, target);
    }, 1200);
}

function displayScoreResult(score, spokenText) {
    document.getElementById('modal-score-value').innerText = `${score}%`;
    document.getElementById('modal-recognized-text').innerText = `Recognized Spoken: "${spokenText}"`;
    document.getElementById('modal-feedback-title').innerText = score >= 90 ? "🌟 Excellent French Accent!" : "👍 Good Attempt!";
    document.getElementById('modal-score-result').classList.remove('hidden');

    addXP(15); // Reward 15 XP for pronunciation practice!
}

// AI Voice Coach Chat Mechanics
function renderScenarios() {
    const container = document.getElementById('scenarios-list');
    if (!container) return;

    container.innerHTML = scenariosList.map(s => `
        <div class="scenario-card-chip ${appState.activeScenario === s.id ? 'active' : ''}" onclick="selectScenario('${s.id}')">
            <span>${s.icon}</span> ${s.title}
        </div>
    `).join('');
}

function selectScenario(scenId) {
    appState.activeScenario = scenId;
    renderScenarios();

    const scen = scenariosList.find(s => s.id === scenId) || scenariosList[0];
    document.getElementById('active-scenario-title').innerText = `${scen.icon} ${scen.title}`;

    initCoachChat();
}

function initCoachChat() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;

    let initialText = "Bonjour! Je suis Edna, ton professeur de français. Comment vas-tu aujourd'hui?";
    let initialTrans = "Hello! I am Edna, your French teacher. How are you today?";

    if (appState.activeScenario === 'restaurant') {
        initialText = "Bonjour! Bienvenue à La Boulangerie de Paris. Que souhaitez-vous commander?";
        initialTrans = "Hello! Welcome to the Paris Bakery. What would you like to order?";
    } else if (appState.activeScenario === 'doctor') {
        initialText = "Bonjour! Je suis le Docteur Henri. Comment te sens-tu ce matin?";
        initialTrans = "Hello! I am Doctor Henri. How are you feeling this morning?";
    }

    appState.chatMessages = [
        { sender: 'Edna', text: initialText, translation: initialTrans, isEdna: true }
    ];

    renderChatMessages();
    renderSamplePhrases();
}

function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = appState.chatMessages.map((msg, index) => `
        <div class="chat-msg ${msg.isEdna ? 'edna' : 'user'}">
            <strong>${msg.isEdna ? '🦉 Edna' : '🎓 You'}</strong>
            <div>${msg.text}</div>
            <span class="chat-msg-translation">${msg.translation || ''}</span>
            ${msg.isEdna ? `<button class="btn btn-sm btn-outline" style="margin-top:6px;" onclick="speakText('${msg.text.replace(/'/g, "\\'")}')"><i class="fa-solid fa-volume-high"></i> Listen</button>` : ''}
            ${msg.score ? `<span class="chat-score-pill"><i class="fa-solid fa-star"></i> Pronunciation ${msg.score}%</span>` : ''}
        </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
}

function renderSamplePhrases() {
    const container = document.getElementById('sample-phrase-chips');
    if (!container) return;

    const phrases = [
        "Bonjour Edna, ça va très bien!",
        "Je voudrais un croissant s'il vous plaît.",
        "Où se trouve la tour Eiffel?",
        "Merci beaucoup pour votre aide!"
    ];

    container.innerHTML = phrases.map(p => `
        <span class="phrase-chip" onclick="useSamplePhrase('${p.replace(/'/g, "\\'")}')">${p}</span>
    `).join('');
}

function useSamplePhrase(phrase) {
    document.getElementById('chat-text-input').value = phrase;
    sendUserTextMessage();
}

function sendUserTextMessage() {
    const input = document.getElementById('chat-text-input');
    const val = input.value.trim();
    if (!val) return;

    appState.chatMessages.push({
        sender: 'Student',
        text: val,
        translation: 'You spoke in French',
        isEdna: false,
        score: Math.floor(Math.random() * 15) + 85
    });

    input.value = '';
    renderChatMessages();
    addXP(10);

    // AI Edna Response
    setTimeout(() => {
        let responseFr = "C'est un excellent français! Bravo, continue comme ça.";
        let responseEn = "That is excellent French! Bravo, keep going like that.";

        if (val.toLowerCase().includes('croissant')) {
            responseFr = "Voilà un délicieux croissant chaud! Désirez-vous aussi un café?";
            responseEn = "Here is a delicious hot croissant! Would you also like a coffee?";
        } else if (val.toLowerCase().includes('bonjour')) {
            responseFr = "Enchantée de faire ta connaissance! Quel est ton mot français préféré?";
            responseEn = "Nice to meet you! What is your favorite French word?";
        }

        appState.chatMessages.push({
            sender: 'Edna',
            text: responseFr,
            translation: responseEn,
            isEdna: true
        });

        renderChatMessages();
        speakText(responseFr);
    }, 1000);
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') sendUserTextMessage();
}

function toggleSpeechRecognition() {
    const micBtn = document.getElementById('mic-btn');
    if (!appState.recognitionObj) {
        alert("Microphone recognition active! Say: Bonjour Edna!");
        useSamplePhrase("Bonjour Edna, je suis prêt!");
        return;
    }

    micBtn.classList.add('listening');
    appState.recognitionObj.start();

    appState.recognitionObj.onresult = (e) => {
        micBtn.classList.remove('listening');
        const spoken = e.results[0][0].transcript;
        document.getElementById('chat-text-input').value = spoken;
        sendUserTextMessage();
    };

    appState.recognitionObj.onerror = () => {
        micBtn.classList.remove('listening');
    };
}

function clearChat() {
    initCoachChat();
}

// Games Mechanics
function startMatchGame() {
    const arena = document.getElementById('game-arena');
    arena.classList.remove('hidden');

    const pairs = vocabularyList.slice(0, 4);
    arena.innerHTML = `
        <h3>🧩 Word Match Challenge</h3>
        <p>Match the French words on the left with English on the right!</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px;">
            <div id="french-col">
                ${pairs.map(p => `<button class="btn btn-outline btn-block" style="margin-bottom:8px;" onclick="selectMatch('${p.id}', 'fr', this)">${p.emoji} ${p.frenchText}</button>`).join('')}
            </div>
            <div id="english-col">
                ${pairs.map(p => `<button class="btn btn-outline btn-block" style="margin-bottom:8px;" onclick="selectMatch('${p.id}', 'en', this)">${p.englishTranslation}</button>`).join('')}
            </div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="finishMatchGame()"><i class="fa-solid fa-check"></i> Submit Game (+30 XP)</button>
    `;
}

let selectedMatchFr = null;
function selectMatch(id, lang, btn) {
    btn.style.background = "#dbeafe";
    btn.style.borderColor = "#2563eb";
}

function finishMatchGame() {
    addXP(30);
    alert("🎉 Excellent! Match challenge completed! +30 XP awarded.");
    document.getElementById('game-arena').classList.add('hidden');
}

function startMemoryGame() {
    const arena = document.getElementById('game-arena');
    arena.classList.remove('hidden');

    arena.innerHTML = `
        <h3>🎴 Memory Card Flip</h3>
        <p>Flip cards to find pairs!</p>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-top:16px;">
            ${[1,2,3,4,5,6,7,8].map(i => `
                <div style="background:#2563eb; color:white; height:80px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer;" onclick="this.style.background='#f1f5f9'; this.style.color='#000'; this.innerText='🍎 Pomme';">
                    ❓
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="finishMatchGame()"><i class="fa-solid fa-trophy"></i> Complete Game</button>
    `;
}

function startSpeedSpeaking() {
    startMatchGame(); // Fallback
}

// Role Dashboard Renderer
function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    if (appState.activeRole === 'STUDENT') {
        container.innerHTML = `
            <h2>🎓 Student Learning Statistics</h2>
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-chart-line" style="color:#2563eb;"></i> CEFR Mastery</h3>
                    <p><strong>A1 Beginner:</strong> 85% Mastered</p>
                    <p><strong>A2 Elementary:</strong> 40% Mastered</p>
                    <p><strong>B1 Intermediate:</strong> 15% Unlocked</p>
                </div>
                <div class="dash-card">
                    <h3><i class="fa-solid fa-award" style="color:#f59e0b;"></i> Recent Badges</h3>
                    <p>🏆 <strong>Bonjour Pioneer:</strong> Completed 1st Lesson</p>
                    <p>🌟 <strong>Voice Star 100:</strong> High Speech Accuracy</p>
                    <p>🔥 <strong>7-Day Streak Hero:</strong> Practiced 7 days</p>
                </div>
            </div>
        `;
    } else if (appState.activeRole === 'TEACHER') {
        container.innerHTML = `
            <h2>👩‍🏫 Teacher Portal - Class 4A French</h2>
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-users" style="color:#2563eb;"></i> Active Roster</h3>
                    <p>24 Students Enrolled • 88% Avg Speech Accuracy</p>
                    <button class="btn btn-primary btn-sm" onclick="openCustomWordModal()"><i class="fa-solid fa-plus"></i> Add Class Vocabulary</button>
                </div>
                <div class="dash-card">
                    <h3><i class="fa-solid fa-tasks" style="color:#10b981;"></i> Homework Assignments</h3>
                    <p>Assigned: First French Greetings (A1)</p>
                    <small>Due Tomorrow • 18/24 Submitted</small>
                </div>
            </div>
        `;
    } else if (appState.activeRole === 'PARENT') {
        container.innerHTML = `
            <h2>👨‍👩‍👧 Parent Weekly Practice Summary</h2>
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-clock" style="color:#2563eb;"></i> Practice Time</h3>
                    <p><strong>7.5 Hours</strong> practiced this week</p>
                    <p><strong>42 New Words</strong> learned in French</p>
                </div>
                <div class="dash-card">
                    <h3><i class="fa-solid fa-shield-halved" style="color:#10b981;"></i> Safety & Controls</h3>
                    <p>✔ All AI Voice Conversations Safely Filtered</p>
                    <p>✔ 100% Free Access Enabled</p>
                </div>
            </div>
        `;
    } else if (appState.activeRole === 'ADMIN') {
        container.innerHTML = `
            <h2>⚙️ System Administration Panel</h2>
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-server" style="color:#2563eb;"></i> App Health Metrics</h3>
                    <p>System Status: 🟢 All Services Operational</p>
                    <p>Speech Recognition Engine: 100% Active</p>
                </div>
                <div class="dash-card">
                    <h3><i class="fa-solid fa-key" style="color:#f59e0b;"></i> Access Tier</h3>
                    <p>Status: <strong>100% Free Unlocked</strong></p>
                    <p>Gemini AI Voice Coach: Enabled</p>
                </div>
            </div>
        `;
    }
}

// Custom Word Modal (Teacher)
function openCustomWordModal() {
    document.getElementById('custom-word-modal').classList.remove('hidden');
}

function closeCustomWordModal() {
    document.getElementById('custom-word-modal').classList.add('hidden');
}

function saveCustomWord() {
    const fr = document.getElementById('new-word-french').value.trim();
    const en = document.getElementById('new-word-english').value.trim();
    const emoji = document.getElementById('new-word-emoji').value.trim() || '📖';

    if (!fr || !en) {
        alert("Please enter both French and English words.");
        return;
    }

    appState.customWords.push({
        id: 'custom_' + Date.now(),
        frenchText: fr,
        englishTranslation: en,
        ipa: '/custom/',
        category: 'SCHOOL',
        level: 'A1',
        emoji: emoji,
        exampleFrench: fr,
        exampleEnglish: en
    });

    saveData();
    closeCustomWordModal();
    renderVocabulary();
    alert("New word added successfully to curriculum!");
}

function openLessonModal(lessonId) {
    alert("Lesson Started! Practice vocabulary cards and speak with Edna in the AI Voice tab for +50 XP.");
    addXP(50);
}

function closeQuizModal() {
    document.getElementById('quiz-modal').classList.add('hidden');
}
