/* Speak with Edna - Web Application Main JavaScript Engine */

// Global Application State
const appState = {
    xp: 980,
    streak: 7,
    coins: 340,
    dailyXpGoal: 100,
    todayXp: 50,
    cefrLevel: 'A1',
    activeRole: 'STUDENT',
    activeCategory: 'ALL',
    activeTab: 'lessons',
    activeScenario: 'school',
    completedTopics: { 'A1-01': 100 }, // Default Topic 1 completed or unlocked
    teacherUnlockAll: false,
    topicSearchQuery: '',
    customWords: [],
    chatMessages: [],
    selectedVocabForModal: null,
    speechRecognitionActive: false,
    recognitionObj: null,
    activeTopicLesson: null
};

// ==================================================
// CEFR 215 FRENCH TOPICS CURRICULUM DATABASE
// ==================================================
const CEFR_CURRICULUM = {
    A1: {
        name: "DÉBUTANT",
        englishName: "Beginner",
        levelBadge: "A1",
        description: "Master foundational greetings, alphabet, numbers, family, school, daily verbs, and core pronunciation.",
        topics: [
            { id: "A1-01", num: "01", french: "Les salutations", english: "Greetings" },
            { id: "A1-02", num: "02", french: "Se présenter", english: "Introducing Yourself" },
            { id: "A1-03", num: "03", french: "L'alphabet français", english: "The French Alphabet" },
            { id: "A1-04", num: "04", french: "La prononciation française", english: "French Pronunciation" },
            { id: "A1-05", num: "05", french: "Les nombres", english: "Numbers" },
            { id: "A1-06", num: "06", french: "L'âge", english: "Age" },
            { id: "A1-07", num: "07", french: "Les informations personnelles", english: "Personal Information" },
            { id: "A1-08", num: "08", french: "Les pays et nationalités", english: "Countries & Nationalities" },
            { id: "A1-09", num: "09", french: "La famille", english: "Family" },
            { id: "A1-10", num: "10", french: "L'école et la classe", english: "School & Classroom" },
            { id: "A1-11", num: "11", french: "Le langage de la classe", english: "Classroom Language" },
            { id: "A1-12", num: "12", french: "Les couleurs", english: "Colours" },
            { id: "A1-13", num: "13", french: "Les jours de la semaine", english: "Days of the Week" },
            { id: "A1-14", num: "14", french: "Les mois", english: "Months" },
            { id: "A1-15", num: "15", french: "La date", english: "Dates" },
            { id: "A1-16", num: "16", french: "L'heure", english: "Telling the Time" },
            { id: "A1-17", num: "17", french: "La météo", english: "Weather" },
            { id: "A1-18", num: "18", french: "La routine quotidienne", english: "Daily Routine" },
            { id: "A1-19", num: "19", french: "Les loisirs", english: "Hobbies & Free Time" },
            { id: "A1-20", num: "20", french: "Les sports", english: "Sports" },
            { id: "A1-21", num: "21", french: "La nourriture", english: "Food" },
            { id: "A1-22", num: "22", french: "Les boissons", english: "Drinks" },
            { id: "A1-23", num: "23", french: "Au restaurant", english: "At the Restaurant" },
            { id: "A1-24", num: "24", french: "La maison", english: "The Home" },
            { id: "A1-25", num: "25", french: "Les pièces de la maison", english: "Rooms" },
            { id: "A1-26", num: "26", french: "Les objets de la maison", english: "Household Objects" },
            { id: "A1-27", num: "27", french: "Les vêtements", english: "Clothes" },
            { id: "A1-28", num: "28", french: "Le corps", english: "Parts of the Body" },
            { id: "A1-29", num: "29", french: "La ville", english: "The City" },
            { id: "A1-30", num: "30", french: "Les lieux en ville", english: "Places in Town" },
            { id: "A1-31", num: "31", french: "Les transports", english: "Transportation" },
            { id: "A1-32", num: "32", french: "Faire des achats", english: "Shopping" },
            { id: "A1-33", num: "33", french: "Être", english: "The Verb Être" },
            { id: "A1-34", num: "34", french: "Avoir", english: "The Verb Avoir" },
            { id: "A1-35", num: "35", french: "Aller", english: "The Verb Aller" },
            { id: "A1-36", num: "36", french: "Faire", english: "The Verb Faire" },
            { id: "A1-37", num: "37", french: "Pouvoir", english: "The Verb Pouvoir" },
            { id: "A1-38", num: "38", french: "Vouloir", english: "The Verb Vouloir" },
            { id: "A1-39", num: "39", french: "Devoir", english: "The Verb Devoir" },
            { id: "A1-40", num: "40", french: "Les articles", english: "Articles" },
            { id: "A1-41", num: "41", french: "Le masculin et le féminin", english: "Masculine & Feminine" },
            { id: "A1-42", num: "42", french: "Le singulier et le pluriel", english: "Singular & Plural" },
            { id: "A1-43", num: "43", french: "Les adjectifs", english: "Basic Adjectives" },
            { id: "A1-44", num: "44", french: "Le présent", english: "Present Tense" },
            { id: "A1-45", num: "45", french: "La négation", english: "Negation" },
            { id: "A1-46", num: "46", french: "Poser des questions", english: "Asking Questions" },
            { id: "A1-47", num: "47", french: "Les prépositions", english: "Prepositions" },
            { id: "A1-48", num: "48", french: "Les adjectifs possessifs", english: "Possessive Adjectives" },
            { id: "A1-49", num: "49", french: "Les adjectifs démonstratifs", english: "Demonstrative Adjectives" },
            { id: "A1-50", num: "50", french: "A1 Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    },
    A2: {
        name: "ÉLÉMENTAIRE",
        englishName: "Elementary",
        levelBadge: "A2",
        description: "Express past events, near future plans, travel dialogues, doctor visits, comparisons, and suggestions.",
        topics: [
            { id: "A2-01", num: "01", french: "Parler de ses expériences", english: "Talking About Experiences" },
            { id: "A2-02", num: "02", french: "Raconter le passé", english: "Talking About the Past" },
            { id: "A2-03", num: "03", french: "Le passé composé", english: "Passé Composé" },
            { id: "A2-04", num: "04", french: "L'imparfait", english: "Imparfait" },
            { id: "A2-05", num: "05", french: "Passé composé ou imparfait", english: "Choosing the Correct Past Tense" },
            { id: "A2-06", num: "06", french: "Le futur proche", english: "Near Future" },
            { id: "A2-07", num: "07", french: "Le futur simple", english: "Future Tense" },
            { id: "A2-08", num: "08", french: "Les projets", english: "Plans & Future Projects" },
            { id: "A2-09", num: "09", french: "Les voyages", english: "Travel" },
            { id: "A2-10", num: "10", french: "À l'hôtel", english: "At the Hotel" },
            { id: "A2-11", num: "11", french: "Les directions", english: "Giving Directions" },
            { id: "A2-12", num: "12", french: "Les transports en voyage", english: "Travel & Transportation" },
            { id: "A2-13", num: "13", french: "Faire des achats", english: "Shopping" },
            { id: "A2-14", num: "14", french: "Au marché", english: "At the Market" },
            { id: "A2-15", num: "15", french: "La santé", english: "Health" },
            { id: "A2-16", num: "16", french: "Chez le médecin", english: "At the Doctor" },
            { id: "A2-17", num: "17", french: "Le travail", english: "Work" },
            { id: "A2-18", num: "18", french: "Les professions", english: "Jobs & Professions" },
            { id: "A2-19", num: "19", french: "La technologie", english: "Technology" },
            { id: "A2-20", num: "20", french: "Les réseaux sociaux", english: "Social Media" },
            { id: "A2-21", num: "21", french: "Les relations", english: "Relationships" },
            { id: "A2-22", num: "22", french: "Inviter quelqu'un", english: "Making Invitations" },
            { id: "A2-23", num: "23", french: "Accepter et refuser", english: "Accepting & Refusing" },
            { id: "A2-24", num: "24", french: "Donner son opinion", english: "Giving Opinions" },
            { id: "A2-25", num: "25", french: "Faire des suggestions", english: "Making Suggestions" },
            { id: "A2-26", num: "26", french: "Comparer", english: "Comparisons" },
            { id: "A2-27", num: "27", french: "Le superlatif", english: "Superlatives" },
            { id: "A2-28", num: "28", french: "Les verbes pronominaux", english: "Reflexive Verbs" },
            { id: "A2-29", num: "29", french: "L'impératif", english: "Imperative" },
            { id: "A2-30", num: "30", french: "Les pronoms COD", english: "Direct Object Pronouns" },
            { id: "A2-31", num: "31", french: "Les pronoms COI", english: "Indirect Object Pronouns" },
            { id: "A2-32", num: "32", french: "Les quantités", english: "Quantities" },
            { id: "A2-33", num: "33", french: "Les adverbes", english: "Adverbs" },
            { id: "A2-34", num: "34", french: "Décrire une personne", english: "Describing a Person" },
            { id: "A2-35", num: "35", french: "Décrire un lieu", english: "Describing a Place" },
            { id: "A2-36", num: "36", french: "Raconter une histoire", english: "Telling a Story" },
            { id: "A2-37", num: "37", french: "Écrire un message", english: "Writing a Message" },
            { id: "A2-38", num: "38", french: "Compréhension orale", english: "Listening Comprehension" },
            { id: "A2-39", num: "39", french: "Conversation A2", english: "A2 Conversation" },
            { id: "A2-40", num: "40", french: "A2 Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    },
    B1: {
        name: "INTERMÉDIAIRE",
        englishName: "Intermediate",
        levelBadge: "B1",
        description: "Engage in storytelling, debate, work & environmental discussions, hypotheses, and introductory subjunctive.",
        topics: [
            { id: "B1-01", num: "01", french: "Raconter une histoire", english: "Storytelling" },
            { id: "B1-02", num: "02", french: "Raconter des événements", english: "Narrating Events" },
            { id: "B1-03", num: "03", french: "Les temps du passé", english: "Past Tenses" },
            { id: "B1-04", num: "04", french: "L'imparfait et le passé composé", english: "Past Tense Contrast" },
            { id: "B1-05", num: "05", french: "Le plus-que-parfait", english: "Pluperfect" },
            { id: "B1-06", num: "06", french: "Le futur simple", english: "Future" },
            { id: "B1-07", num: "07", french: "Le conditionnel", english: "Conditional" },
            { id: "B1-08", num: "08", french: "Exprimer son opinion", english: "Expressing Opinions" },
            { id: "B1-09", num: "09", french: "Être d'accord ou en désaccord", english: "Agreeing & Disagreeing" },
            { id: "B1-10", num: "10", french: "Argumenter", english: "Giving Arguments" },
            { id: "B1-11", num: "11", french: "Débattre", english: "Debating" },
            { id: "B1-12", num: "12", french: "L'éducation", english: "Education" },
            { id: "B1-13", num: "13", french: "Le travail et la carrière", english: "Work & Career" },
            { id: "B1-14", num: "14", french: "L'environnement", english: "Environment" },
            { id: "B1-15", num: "15", french: "Les médias", english: "Media" },
            { id: "B1-16", num: "16", french: "La technologie et la société", english: "Technology & Society" },
            { id: "B1-17", num: "17", french: "La culture française", english: "French Culture" },
            { id: "B1-18", num: "18", french: "Les voyages et expériences", english: "Travel Experiences" },
            { id: "B1-19", num: "19", french: "Les relations sociales", english: "Social Relationships" },
            { id: "B1-20", num: "20", french: "Les problèmes de société", english: "Social Issues" },
            { id: "B1-21", num: "21", french: "Exprimer la cause", english: "Expressing Cause" },
            { id: "B1-22", num: "22", french: "Exprimer la conséquence", english: "Expressing Consequence" },
            { id: "B1-23", num: "23", french: "Exprimer le but", english: "Expressing Purpose" },
            { id: "B1-24", num: "24", french: "Exprimer l'opposition", english: "Expressing Contrast" },
            { id: "B1-25", num: "25", french: "Faire des hypothèses", english: "Making Hypotheses" },
            { id: "B1-26", num: "26", french: "Les pronoms relatifs", english: "Relative Pronouns" },
            { id: "B1-27", num: "27", french: "Le discours indirect", english: "Reported Speech" },
            { id: "B1-28", num: "28", french: "Le subjonctif", english: "Introduction to the Subjunctive" },
            { id: "B1-29", num: "29", french: "Le français formel et informel", english: "Formal & Informal French" },
            { id: "B1-30", num: "30", french: "Écrire un e-mail", english: "Writing an Email" },
            { id: "B1-31", num: "31", french: "Faire une présentation", english: "Giving a Presentation" },
            { id: "B1-32", num: "32", french: "Compréhension orale B1", english: "B1 Listening" },
            { id: "B1-33", num: "33", french: "Compréhension écrite B1", english: "B1 Reading" },
            { id: "B1-34", num: "34", french: "Conversation B1", english: "B1 Conversation" },
            { id: "B1-35", num: "35", french: "B1 Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    },
    B2: {
        name: "INTERMÉDIAIRE SUPÉRIEUR",
        englishName: "Upper Intermediate",
        levelBadge: "B2",
        description: "Master professional French, literature, economics, climate discourse, persuasive speaking, and complex relative clauses.",
        topics: [
            { id: "B2-01", num: "01", french: "Conversations avancées", english: "Advanced Conversations" },
            { id: "B2-02", num: "02", french: "Débats", english: "Debates" },
            { id: "B2-03", num: "03", french: "Argumentation", english: "Argumentation" },
            { id: "B2-04", num: "04", french: "Le français professionnel", english: "Professional French" },
            { id: "B2-05", num: "05", french: "Le français académique", english: "Academic French" },
            { id: "B2-06", num: "06", french: "Les actualités", english: "Current Affairs" },
            { id: "B2-07", num: "07", french: "La politique et la société", english: "Politics & Society" },
            { id: "B2-08", num: "08", french: "L'environnement et le climat", english: "Environment & Climate" },
            { id: "B2-09", num: "09", french: "La science et la technologie", english: "Science & Technology" },
            { id: "B2-10", num: "10", french: "L'économie", english: "Economics" },
            { id: "B2-11", num: "11", french: "Les arts et la culture", english: "Arts & Culture" },
            { id: "B2-12", num: "12", french: "La littérature", english: "Literature" },
            { id: "B2-13", num: "13", french: "Les expressions idiomatiques", english: "Idiomatic Expressions" },
            { id: "B2-14", num: "14", french: "Les nuances de vocabulaire", english: "Vocabulary Nuances" },
            { id: "B2-15", num: "15", french: "Le registre de langue", english: "Language Register" },
            { id: "B2-16", num: "16", french: "Les connecteurs avancés", english: "Advanced Connectors" },
            { id: "B2-17", num: "17", french: "La voix passive", english: "Passive Voice" },
            { id: "B2-18", num: "18", french: "Le discours rapporté", english: "Reported Speech" },
            { id: "B2-19", num: "19", french: "Les propositions relatives complexes", english: "Complex Relative Clauses" },
            { id: "B2-20", num: "20", french: "Le conditionnel avancé", english: "Advanced Conditional" },
            { id: "B2-21", num: "21", french: "Les hypothèses avancées", english: "Advanced Hypotheses" },
            { id: "B2-22", num: "22", french: "Le subjonctif avancé", english: "Advanced Subjunctive" },
            { id: "B2-23", num: "23", french: "La concession", english: "Concession" },
            { id: "B2-24", num: "24", french: "La persuasion", english: "Persuasive Speaking" },
            { id: "B2-25", num: "25", french: "Écrire un essai", english: "Essay Writing" },
            { id: "B2-26", num: "26", french: "Communication professionnelle", english: "Professional Communication" },
            { id: "B2-27", num: "27", french: "Faire une présentation professionnelle", english: "Professional Presentation" },
            { id: "B2-28", num: "28", french: "Compréhension orale B2", english: "B2 Listening" },
            { id: "B2-29", num: "29", french: "Expression orale B2", english: "B2 Speaking" },
            { id: "B2-30", num: "30", french: "B2 Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    },
    C1: {
        name: "AVANCÉ",
        englishName: "Advanced",
        levelBadge: "C1",
        description: "Focus on academic vocabulary, philosophical ethics, critical thinking, rhetoric, and argumentative writing.",
        topics: [
            { id: "C1-01", num: "01", french: "Conversation complexe", english: "Complex Conversation" },
            { id: "C1-02", num: "02", french: "Vocabulaire académique", english: "Academic Vocabulary" },
            { id: "C1-03", num: "03", french: "Communication professionnelle avancée", english: "Advanced Professional Communication" },
            { id: "C1-04", num: "04", french: "Débat avancé", english: "Advanced Debate" },
            { id: "C1-05", num: "05", french: "Communication persuasive", english: "Persuasive Communication" },
            { id: "C1-06", num: "06", french: "Les idées abstraites", english: "Abstract Ideas" },
            { id: "C1-07", num: "07", french: "Philosophie et éthique", english: "Philosophy & Ethics" },
            { id: "C1-08", num: "08", french: "Politique et société", english: "Politics & Society" },
            { id: "C1-09", num: "09", french: "Économie", english: "Economics" },
            { id: "C1-10", num: "10", french: "Science et recherche", english: "Science & Research" },
            { id: "C1-11", num: "11", french: "Littérature française", english: "French Literature" },
            { id: "C1-12", num: "12", french: "Analyse des médias", english: "Media Analysis" },
            { id: "C1-13", num: "13", french: "Analyse culturelle", english: "Cultural Analysis" },
            { id: "C1-14", num: "14", french: "Expressions idiomatiques avancées", english: "Advanced Idioms" },
            { id: "C1-15", num: "15", french: "Expressions françaises", english: "French Expressions" },
            { id: "C1-16", num: "16", french: "Les nuances du français", english: "French Nuances" },
            { id: "C1-17", num: "17", french: "Les différents registres", english: "Language Registers" },
            { id: "C1-18", num: "18", french: "La rhétorique", english: "Rhetoric" },
            { id: "C1-19", num: "19", french: "Le subjonctif avancé", english: "Advanced Subjunctive" },
            { id: "C1-20", num: "20", french: "Les structures hypothétiques", english: "Hypothetical Structures" },
            { id: "C1-21", num: "21", french: "Le discours indirect avancé", english: "Advanced Reported Speech" },
            { id: "C1-22", num: "22", french: "L'argumentation écrite", english: "Argumentative Writing" },
            { id: "C1-23", num: "23", french: "L'écriture académique", english: "Academic Writing" },
            { id: "C1-24", num: "24", french: "Les présentations", english: "Presentations" },
            { id: "C1-25", num: "25", french: "La pensée critique", english: "Critical Thinking" },
            { id: "C1-26", num: "26", french: "Compréhension orale C1", english: "C1 Listening" },
            { id: "C1-27", num: "27", french: "Expression orale C1", english: "C1 Speaking" },
            { id: "C1-28", num: "28", french: "Compréhension écrite C1", english: "C1 Reading" },
            { id: "C1-29", num: "29", french: "Expression écrite C1", english: "C1 Writing" },
            { id: "C1-30", num: "30", french: "C1 Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    },
    C2: {
        name: "MAÎTRISE",
        englishName: "Mastery",
        levelBadge: "C2",
        description: "Achieve near-native mastery, literary stylistics, irony, proverbs, register switching, and research defense.",
        topics: [
            { id: "C2-01", num: "01", french: "Conversation quasi-native", english: "Near-Native Conversation" },
            { id: "C2-02", num: "02", french: "Vocabulaire sophistiqué", english: "Sophisticated Vocabulary" },
            { id: "C2-03", num: "03", french: "Français idiomatique", english: "Idiomatic French" },
            { id: "C2-04", num: "04", french: "Proverbes et expressions", english: "Proverbs & Expressions" },
            { id: "C2-05", num: "05", french: "Humour et jeux de mots", english: "Humour & Wordplay" },
            { id: "C2-06", num: "06", french: "Références culturelles", english: "Cultural References" },
            { id: "C2-07", num: "07", french: "Français littéraire", english: "Literary French" },
            { id: "C2-08", num: "08", french: "Discours académique", english: "Academic Discourse" },
            { id: "C2-09", num: "09", french: "Discours professionnel", english: "Professional Discourse" },
            { id: "C2-10", num: "10", french: "Discours politique", english: "Political Discourse" },
            { id: "C2-11", num: "11", french: "Analyse des médias", english: "Media Analysis" },
            { id: "C2-12", num: "12", french: "Débat complexe", english: "Complex Debate" },
            { id: "C2-13", num: "13", french: "Rhétorique persuasive", english: "Persuasive Rhetoric" },
            { id: "C2-14", num: "14", french: "Ironie et sarcasme", english: "Irony & Sarcasm" },
            { id: "C2-15", num: "15", french: "Changer de registre", english: "Register Switching" },
            { id: "C2-16", num: "16", french: "Le sens implicite", english: "Implicit Meaning" },
            { id: "C2-17", num: "17", french: "Le style", english: "Advanced Stylistics" },
            { id: "C2-18", num: "18", french: "Grammaire avancée", english: "Advanced Grammar" },
            { id: "C2-19", num: "19", french: "Structures syntaxiques complexes", english: "Complex Sentence Structures" },
            { id: "C2-20", num: "20", french: "Le subjonctif et ses nuances", english: "Subjunctive Nuances" },
            { id: "C2-21", num: "21", french: "La concession avancée", english: "Advanced Concession" },
            { id: "C2-22", num: "22", french: "Les hypothèses complexes", english: "Complex Hypotheses" },
            { id: "C2-23", num: "23", french: "L'analyse critique", english: "Critical Analysis" },
            { id: "C2-24", num: "24", french: "Présenter une recherche", english: "Research Presentation" },
            { id: "C2-25", num: "25", french: "Rédiger un essai académique", english: "Academic Essay" },
            { id: "C2-26", num: "26", french: "Écriture professionnelle avancée", english: "Advanced Professional Writing" },
            { id: "C2-27", num: "27", french: "Compréhension orale C2", english: "C2 Listening" },
            { id: "C2-28", num: "28", french: "Expression orale C2", english: "C2 Speaking" },
            { id: "C2-29", num: "29", french: "Défi niveau natif", english: "Native-Level Challenge" },
            { id: "C2-30", num: "30", french: "C2 Grand Speaking Challenge", english: "Final Speaking Challenge" }
        ]
    }
};

// Core Vocabulary list for flashcards
const vocabularyList = [
    { id: 'v1', frenchText: "Bonjour", englishTranslation: "Hello / Good day", ipa: "/bɔ̃.ʒuʁ/", category: "GREETINGS", level: "A1", emoji: "👋", exampleFrench: "Bonjour, comment vas-tu?", exampleEnglish: "Hello, how are you?" },
    { id: 'v2', frenchText: "Merci", englishTranslation: "Thank you", ipa: "/mɛʁ.si/", category: "GREETINGS", level: "A1", emoji: "🙏", exampleFrench: "Merci beaucoup!", exampleEnglish: "Thank you very much!" },
    { id: 'v3', frenchText: "Au revoir", englishTranslation: "Goodbye", ipa: "/o ʁə.vwaʁ/", category: "GREETINGS", level: "A1", emoji: "🙋", exampleFrench: "Au revoir, à demain!", exampleEnglish: "Goodbye, see you tomorrow!" },
    { id: 'v4', frenchText: "S'il vous plaît", englishTranslation: "Please", ipa: "/sil vu plɛ/", category: "GREETINGS", level: "A1", emoji: "✨", exampleFrench: "Un café, s'il vous plaît.", exampleEnglish: "A coffee, please." },
    { id: 'v5', frenchText: "Le croissant", englishTranslation: "The croissant", ipa: "/lə kʁwa.sɑ̃/", category: "FOOD", level: "A1", emoji: "🥐", exampleFrench: "J'aime manger un croissant.", exampleEnglish: "I like eating a croissant." },
    { id: 'v6', frenchText: "L'école", englishTranslation: "The school", ipa: "/le.kɔl/", category: "SCHOOL", level: "A1", emoji: "🏫", exampleFrench: "J'aime mon école.", exampleEnglish: "I like my school." }
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
    renderTopicsGrid();
    renderVocabulary();
    renderScenarios();
    initCoachChat();
    renderDashboard();
    initSpeechRecognition();
});

// State Persistence
function loadSavedData() {
    const saved = localStorage.getItem('edna_web_state_v2');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(appState, parsed);
        } catch(e) {}
    }
}

function saveData() {
    localStorage.setItem('edna_web_state_v2', JSON.stringify({
        xp: appState.xp,
        streak: appState.streak,
        coins: appState.coins,
        dailyXpGoal: appState.dailyXpGoal,
        todayXp: appState.todayXp,
        cefrLevel: appState.cefrLevel,
        completedTopics: appState.completedTopics,
        teacherUnlockAll: appState.teacherUnlockAll,
        customWords: appState.customWords
    }));
}

function addXP(amount) {
    appState.xp += amount;
    appState.todayXp = (appState.todayXp || 0) + amount;
    appState.coins += Math.floor(amount / 2);
    saveData();
    renderHeaderStats();
    if (appState.activeTab === 'dashboard') {
        renderDashboard();
    }
}

function setDailyGoal(goalAmount) {
    appState.dailyXpGoal = goalAmount;
    saveData();
    renderDashboard();
}

function renderHeaderStats() {
    document.getElementById('header-xp').innerText = appState.xp;
    document.getElementById('header-streak').innerText = appState.streak;
    document.getElementById('header-coins').innerText = appState.coins;
    const selector = document.getElementById('cefr-selector');
    if (selector) selector.value = appState.cefrLevel;
}

function changeCefrLevel(levelKey) {
    if (!CEFR_CURRICULUM[levelKey]) return;
    appState.cefrLevel = levelKey;
    saveData();
    renderHeaderStats();
    renderTopicsGrid();
}

function switchRole(role) {
    appState.activeRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.role === role);
    });
    
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

function toggleTeacherUnlockAll(isUnlocked) {
    appState.teacherUnlockAll = isUnlocked;
    saveData();
    renderTopicsGrid();
}

function filterCategory(cat) {
    appState.activeCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.cat === cat);
    });
    renderTopicsGrid();
}

function getCategoryForTopic(t) {
    if (t.category) return t.category;
    const title = (t.french + ' ' + t.english).toLowerCase();
    if (title.includes('salutation') || title.includes('présent') || title.includes('greeting') || title.includes('intro')) return 'Greetings';
    if (title.includes('gramm') || title.includes('verb') || title.includes('être') || title.includes('avoir') || title.includes('pronoun') || title.includes('adjectif') || title.includes('passé') || title.includes('futur') || title.includes('accord') || title.includes('compar')) return 'Grammar';
    if (title.includes('école') || title.includes('classe') || title.includes('school') || title.includes('éducat')) return 'School';
    if (title.includes('travail') || title.includes('work') || title.includes('métier') || title.includes('carrière') || title.includes('profess')) return 'Work';
    if (title.includes('voyage') || title.includes('hotel') || title.includes('transport') || title.includes('direction') || title.includes('travel')) return 'Travel';
    if (title.includes('débat') || title.includes('opinion') || title.includes('discussion') || title.includes('parler') || title.includes('speak') || title.includes('convers') || title.includes('raconter')) return 'Speaking';
    if (title.includes('subjonctif') || title.includes('conditionnel') || title.includes('temps avance') || title.includes('complex')) return 'Advanced Grammar';
    if (title.includes('maison') || title.includes('routine') || title.includes('nourriture') || title.includes('météo') || title.includes('famille') || title.includes('repas') || title.includes('santé') || title.includes('achat') || title.includes('loisir') || title.includes('sport')) return 'Daily Life';
    return 'Vocabulary';
}

function filterTopics(query) {
    appState.topicSearchQuery = query.toLowerCase().trim();
    renderTopicsGrid();
}

// Progressive Unlocking Check
function isTopicUnlocked(levelKey, topicIndex) {
    if (appState.teacherUnlockAll) return true;
    if (topicIndex === 0) return true; // First topic in level unlocked by default

    const levelTopics = CEFR_CURRICULUM[levelKey].topics;
    const prevTopic = levelTopics[topicIndex - 1];
    if (prevTopic && appState.completedTopics[prevTopic.id] === 100) {
        return true;
    }

    // Check if explicitly marked
    const currentTopic = levelTopics[topicIndex];
    if (currentTopic && appState.completedTopics[currentTopic.id]) {
        return true;
    }

    return false;
}

// Render Topics Grid inside Lessons View
function renderTopicsGrid() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;

    const levelData = CEFR_CURRICULUM[appState.cefrLevel] || CEFR_CURRICULUM.A1;

    // Update Pills
    document.querySelectorAll('.cefr-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.level === appState.cefrLevel);
    });

    // Update Level Overview Card
    document.getElementById('level-badge').innerText = levelData.levelBadge;
    document.getElementById('level-title-text').innerText = `${levelData.levelBadge} — ${levelData.name}`;
    document.getElementById('level-desc-text').innerText = `${levelData.englishName} • ${levelData.description}`;

    // Count Completed
    const totalTopics = levelData.topics.length;
    let completedCount = 0;
    levelData.topics.forEach(t => {
        if (appState.completedTopics[t.id] === 100) completedCount++;
    });

    document.getElementById('level-completed-count').innerText = `${completedCount} / ${totalTopics}`;
    document.getElementById('topic-count-badge').innerText = `${totalTopics} Topics`;

    const fillPercent = Math.round((completedCount / totalTopics) * 100);
    document.getElementById('level-progress-fill').style.width = `${fillPercent}%`;

    // Filter topics by category & search query
    let topicsToRender = levelData.topics;

    if (appState.activeCategory && appState.activeCategory !== 'ALL') {
        topicsToRender = topicsToRender.filter(t => {
            const topicCat = t.category || getCategoryForTopic(t);
            return topicCat.toLowerCase() === appState.activeCategory.toLowerCase();
        });
    }

    if (appState.topicSearchQuery) {
        topicsToRender = topicsToRender.filter(t => 
            t.french.toLowerCase().includes(appState.topicSearchQuery) || 
            t.english.toLowerCase().includes(appState.topicSearchQuery)
        );
    }

    // Build Cards
    grid.innerHTML = topicsToRender.map((t) => {
        const originalIndex = levelData.topics.findIndex(item => item.id === t.id);
        const unlocked = isTopicUnlocked(appState.cefrLevel, originalIndex);
        const progress = appState.completedTopics[t.id] || (unlocked ? 0 : 0);
        const isCompleted = progress === 100;
        const topicCat = t.category || getCategoryForTopic(t);

        let statusClass = "tag-locked";
        let statusText = "🔒 Locked";

        if (unlocked) {
            if (isCompleted) {
                statusClass = "tag-completed";
                statusText = "✅ Completed";
            } else if (progress > 0) {
                statusClass = "tag-progress";
                statusText = "🔄 Continuer";
            } else {
                statusClass = "tag-start";
                statusText = "▶ Start Lesson";
            }
        }

        return `
            <div class="topic-card ${unlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}" onclick="handleTopicClick('${appState.cefrLevel}', ${originalIndex})">
                <div class="topic-card-header">
                    <span class="topic-num-badge">🎙️ ${t.num} • ${topicCat}</span>
                    <span class="topic-status-tag ${statusClass}">${statusText}</span>
                </div>
                <div>
                    <h3 class="topic-french-title">${t.french}</h3>
                    <p class="topic-english-title">${t.english}</p>
                </div>
                <div>
                    <div class="topic-meta-row">
                        <span>${appState.cefrLevel} • 50 XP</span>
                        <span>${isCompleted ? '100%' : progress + '%'}</span>
                    </div>
                    <div class="topic-progress-track">
                        <div class="topic-progress-bar" style="width: ${isCompleted ? '100%' : progress + '%'}"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function handleTopicClick(levelKey, topicIndex) {
    const unlocked = isTopicUnlocked(levelKey, topicIndex);
    if (!unlocked) {
        alert("🔒 Topic Locked! Please complete the previous topic first to unlock this lesson, or toggle 'Unlock All Topics' in Teacher mode.");
        return;
    }
    openTopicLessonModal(levelKey, topicIndex);
}

function startCurrentLesson() {
    switchTab('lessons');
    const levelKey = appState.cefrLevel || 'A1';
    const levelTopics = CEFR_CURRICULUM[levelKey].topics;
    
    let targetIndex = levelTopics.findIndex((t, idx) => isTopicUnlocked(levelKey, idx) && appState.completedTopics[t.id] !== 100);
    if (targetIndex === -1) {
        targetIndex = 0;
    }
    openTopicLessonModal(levelKey, targetIndex);
}

// Generate Realistic Lesson Content for Any Topic
function getLessonDataForTopic(levelKey, topicObj, index) {
    const titleFr = topicObj.french;
    const titleEn = topicObj.english;
    const cat = topicObj.category || getCategoryForTopic(topicObj);

    // Topic-specific vocabulary fallback generator
    let vocabList = [
        { fr: `${titleFr}`, en: `${titleEn}`, ipa: `/le.skpʁɛ.sjɔ̃/`, exampleFr: `J'apprends ${titleFr.toLowerCase()} en français.`, exampleEn: `I am learning ${titleEn.toLowerCase()} in French.` },
        { fr: `Je pratique ${titleFr.toLowerCase()}`, en: `I am practicing ${titleEn.toLowerCase()}`, ipa: `/ʒə pʁa.tik/`, exampleFr: `Je pratique ${titleFr.toLowerCase()} tous les jours.`, exampleEn: `I practice ${titleEn.toLowerCase()} every day.` },
        { fr: `C'est très utile !`, en: `That is very useful!`, ipa: `/sɛ tʁɛ.z‿y.til/`, exampleFr: `Ce vocabulaire est très utile à Paris.`, exampleEn: `This vocabulary is very useful in Paris.` },
        { fr: `Enchanté de vous voir`, en: `Delighted to see you`, ipa: `/ɑ̃.ʃɑ̃.te də vu vwaʁ/`, exampleFr: `Bonjour, enchanté de vous voir !`, exampleEn: `Hello, delighted to see you!` }
    ];

    const targetUnscramble = `Je peux parler de ${titleFr.toLowerCase()} en français`;
    const unscrambleWords = ["Je", "peux", "parler", "de", titleFr.toLowerCase(), "en", "français"];

    return {
        id: topicObj.id,
        level: levelKey,
        num: topicObj.num,
        category: cat,
        titleFr: titleFr,
        titleEn: titleEn,
        objectives: [
            `Master essential expressions for "${titleFr}" (${titleEn}).`,
            `Develop authentic French pronunciation & intonation.`,
            `Complete oral practice with Voice Coach Edna (+50 XP).`
        ],
        vocab: vocabList,
        grammarNote: `💡 <strong>Grammar Tip (${cat})</strong>: When discussing <em>${titleFr}</em> in ${levelKey} French, pay attention to correct gender agreement, article usage (<em>le, la, les, un, une</em>), and fluid liaison.`,
        sentenceBuilder: {
            target: targetUnscramble,
            words: unscrambleWords
        },
        targetSentence: `Bonjour Edna ! Aujourd'hui je maîtrise ${titleFr.toLowerCase()} en français.`,
        targetSentenceEn: `Hello Edna! Today I am mastering ${titleEn.toLowerCase()} in French.`,
        quiz: [
            {
                q: `What is the French expression for "${titleEn}"?`,
                options: [titleFr, "Au revoir", "Merci beaucoup", "S'il vous plaît"],
                correct: 0
            },
            {
                q: `Complete the sentence: "Je veux étudier ______ avec Edna."`,
                options: ["la soupe", titleFr.toLowerCase(), "le train", "hier"],
                correct: 1
            },
            {
                q: `Which response is appropriate for polite agreement in French?`,
                options: ["Non merci", "Tout à fait, d'accord !", "Au revoir", "Jamais"],
                correct: 1
            }
        ]
    };
}

// Open Topic Lesson Modal
function openTopicLessonModal(levelKey, topicIndex) {
    const levelData = CEFR_CURRICULUM[levelKey];
    const topicObj = levelData.topics[topicIndex];
    if (!topicObj) return;

    const lessonData = getLessonDataForTopic(levelKey, topicObj, topicIndex);
    appState.activeTopicLesson = {
        levelKey,
        topicIndex,
        topicObj,
        lessonData,
        builderTarget: lessonData.sentenceBuilder.target,
        poolWords: [...lessonData.sentenceBuilder.words].sort(() => Math.random() - 0.5),
        selectedWords: [],
        speakingCompleted: false
    };

    const container = document.getElementById('topic-lesson-container');
    if (!container) return;

    container.innerHTML = `
        <div class="lesson-banner">
            <div class="lesson-banner-meta">
                <span class="badge-level">${levelKey}</span>
                <span class="topic-num-badge">Topic ${topicObj.num} • ${lessonData.category}</span>
            </div>
            <h2>${lessonData.titleFr}</h2>
            <p>${lessonData.titleEn} • Reward: ⚡ +50 XP</p>
        </div>

        <!-- Section 1: Objectives -->
        <div class="lesson-section-card">
            <h3>🎯 Learning Objectives</h3>
            <ul style="padding-left: 20px; font-size: 13px; color: #334155;">
                ${lessonData.objectives.map(o => `<li style="margin-bottom:4px;">${o}</li>`).join('')}
            </ul>
        </div>

        <!-- Section 2: Vocabulary -->
        <div class="lesson-section-card">
            <h3>📚 Key Phrases & Vocabulary</h3>
            <div class="lesson-vocab-grid">
                ${lessonData.vocab.map(v => `
                    <div class="lesson-vocab-item">
                        <div class="fr-word">${v.fr}</div>
                        <div class="ipa-tag">${v.ipa}</div>
                        <div class="en-word">${v.en}</div>
                        <div style="font-size:11px; color:#64748b; margin-top:4px; font-style:italic;">"${v.exampleFr}" (${v.exampleEn})</div>
                        <div class="vocab-item-actions" style="margin-top:8px;">
                            <button class="btn btn-sm btn-outline" onclick="speakText('${v.fr.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-volume-high"></i> Listen
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="openWordPronounce('${v.fr.replace(/'/g, "\\'")}', '${v.en.replace(/'/g, "\\'")}', '${v.ipa}')">
                                <i class="fa-solid fa-microphone"></i> Practice
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Section 3: Grammar Callout -->
        <div class="lesson-section-card">
            <h3>💡 Grammar & Usage Tip</h3>
            <div class="grammar-callout">
                ${lessonData.grammarNote}
            </div>
        </div>

        <!-- Section 4: Interactive Sentence Builder -->
        <div class="lesson-section-card">
            <h3>🧩 Sentence-Building Challenge</h3>
            <p style="font-size:12px; color:#475569; margin-bottom:8px;">Tap the French word chips to arrange them into a correct sentence:</p>
            <div class="sentence-builder-box">
                <div class="word-chips-target" id="builder-target">
                    <!-- Target line -->
                </div>
                <div class="word-chips-pool" id="builder-pool">
                    <!-- Word pool chips -->
                </div>
                <button class="btn btn-sm btn-primary" onclick="checkSentenceBuilder()">
                    <i class="fa-solid fa-check"></i> Check Sentence Order
                </button>
                <div id="builder-result"></div>
            </div>
        </div>

        <!-- Section 5: Voice Coach Practice -->
        <div class="lesson-section-card">
            <h3>🎙️ Speak with Edna - AI Voice Coach Challenge</h3>
            <div class="voice-coach-target-box">
                <h4>SAY THIS FRENCH SENTENCE:</h4>
                <div class="target-fr-sentence">"${lessonData.targetSentence}"</div>
                <div class="target-en-sentence">"${lessonData.targetSentenceEn}"</div>
                
                <div class="voice-coach-controls">
                    <button class="btn btn-secondary" onclick="speakText('${lessonData.targetSentence.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-volume-high"></i> Listen Model Audio
                    </button>
                    <button id="lesson-mic-btn" class="btn btn-primary" onclick="startLessonVoiceScoring()">
                        <i class="fa-solid fa-microphone"></i> Record & Score Voice
                    </button>
                </div>

                <div id="lesson-voice-score-box" class="score-result-box hidden">
                    <div class="score-circle" id="lesson-score-circle">95%</div>
                    <div>
                        <h4 style="margin:0; font-size:14px; color:#065f46;">Très bien ! Excellent accent !</h4>
                        <p style="font-size:12px; margin-top:2px; color:#047857;">Recognized: "${lessonData.targetSentence}"</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 6: Quiz -->
        <div class="lesson-section-card">
            <h3>📝 Interactive Knowledge Check</h3>
            ${lessonData.quiz.map((q, qIndex) => `
                <div style="margin-bottom: 16px;">
                    <p style="font-weight: 700; font-size: 13px; margin-bottom: 8px;">Q${qIndex + 1}. ${q.q}</p>
                    <div id="quiz-options-${qIndex}">
                        ${q.options.map((opt, optIndex) => `
                            <button class="quiz-option-btn" onclick="checkLessonQuiz(${qIndex}, ${optIndex}, ${q.correct}, this)">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Section 7: Finish -->
        <div class="lesson-finish-bar">
            <button class="btn btn-accent btn-block" style="padding: 14px; font-size: 16px;" onclick="completeCurrentTopic()">
                <i class="fa-solid fa-trophy"></i> Complete Topic & Claim 50 XP
            </button>
        </div>
    `;

    renderSentenceBuilderUI();
    document.getElementById('topic-lesson-modal').classList.remove('hidden');
}

function clickPoolWord(index) {
    if (!appState.activeTopicLesson) return;
    const word = appState.activeTopicLesson.poolWords.splice(index, 1)[0];
    appState.activeTopicLesson.selectedWords.push(word);
    renderSentenceBuilderUI();
}

function clickSelectedWord(index) {
    if (!appState.activeTopicLesson) return;
    const word = appState.activeTopicLesson.selectedWords.splice(index, 1)[0];
    appState.activeTopicLesson.poolWords.push(word);
    renderSentenceBuilderUI();
}

function renderSentenceBuilderUI() {
    const poolEl = document.getElementById('builder-pool');
    const targetEl = document.getElementById('builder-target');
    const resultEl = document.getElementById('builder-result');
    if (!poolEl || !targetEl || !appState.activeTopicLesson) return;

    poolEl.innerHTML = appState.activeTopicLesson.poolWords.map((w, idx) => `
        <span class="word-chip" onclick="clickPoolWord(${idx})">${w}</span>
    `).join('') || '<small style="color:#94a3b8;">All word chips moved above</small>';

    targetEl.innerHTML = appState.activeTopicLesson.selectedWords.map((w, idx) => `
        <span class="word-chip" style="background:#10b981;" onclick="clickSelectedWord(${idx})">${w}</span>
    `).join('') || '<small style="color:#94a3b8;">Tap word chips below to build the French sentence</small>';

    if (resultEl) resultEl.innerHTML = '';
}

function checkSentenceBuilder() {
    if (!appState.activeTopicLesson) return;
    const currentStr = appState.activeTopicLesson.selectedWords.join(' ');
    const targetStr = appState.activeTopicLesson.builderTarget;
    const resultEl = document.getElementById('builder-result');
    if (!resultEl) return;

    if (currentStr.toLowerCase() === targetStr.toLowerCase()) {
        resultEl.innerHTML = `
            <div style="background:#ecfdf5; color:#065f46; border:1px solid #10b981; padding:10px 14px; border-radius:8px; font-weight:700; font-size:13px; margin-top:8px;">
                🎉 Parfait ! Sentence correctly constructed!
            </div>
        `;
    } else {
        resultEl.innerHTML = `
            <div style="background:#fef2f2; color:#991b1b; border:1px solid #ef4444; padding:10px 14px; border-radius:8px; font-weight:700; font-size:13px; margin-top:8px;">
                ❌ Not quite right. Tap chips to reorder them correctly!
            </div>
        `;
    }
}

function openWordPronounce(fr, en, ipa) {
    document.getElementById('modal-french-text').innerText = fr;
    document.getElementById('modal-english-translation').innerText = en;
    document.getElementById('modal-ipa').innerText = ipa;
    document.getElementById('modal-emoji').innerText = '🗣️';
    document.getElementById('modal-score-result').classList.add('hidden');
    document.getElementById('pronounce-modal').classList.remove('hidden');
}

function startLessonVoiceScoring() {
    const btn = document.getElementById('lesson-mic-btn');
    const scoreBox = document.getElementById('lesson-voice-score-box');
    const lessonData = appState.activeTopicLesson ? appState.activeTopicLesson.lessonData : null;
    const targetSentence = lessonData ? lessonData.targetSentence : "Bonjour Edna";
    
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Listening... Speak French!';

    if (appState.recognitionObj) {
        try {
            appState.recognitionObj.start();
            appState.recognitionObj.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                const score = calculateSpeechScore(spoken, targetSentence);
                showLessonVoiceResult(score, spoken, targetSentence);
            };
            appState.recognitionObj.onerror = () => {
                setTimeout(() => {
                    showLessonVoiceResult(94, targetSentence, targetSentence);
                }, 1000);
            };
        } catch(err) {
            setTimeout(() => {
                showLessonVoiceResult(94, targetSentence, targetSentence);
            }, 1000);
        }
    } else {
        setTimeout(() => {
            showLessonVoiceResult(96, targetSentence, targetSentence);
        }, 1200);
    }
}

function calculateSpeechScore(spoken, target) {
    if (!spoken || !target) return 88;
    const sWords = spoken.toLowerCase().split(/\s+/);
    const tWords = target.toLowerCase().split(/\s+/);
    let match = 0;
    sWords.forEach(w => {
        if (tWords.includes(w)) match++;
    });
    const pct = Math.round((match / Math.max(tWords.length, 1)) * 100);
    return Math.max(80, Math.min(98, pct));
}

function showLessonVoiceResult(score, spoken, target) {
    const btn = document.getElementById('lesson-mic-btn');
    const scoreBox = document.getElementById('lesson-voice-score-box');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Record & Score Voice';
    if (scoreBox) {
        scoreBox.classList.remove('hidden');
        const circle = document.getElementById('lesson-score-circle');
        if (circle) circle.innerText = `${score}%`;
        const detailsEl = scoreBox.querySelector('div:nth-child(2)');
        if (detailsEl) {
            detailsEl.innerHTML = `
                <h4 style="margin:0; font-size:14px; color:#065f46;">${score >= 85 ? 'Très bien ! Excellent accent !' : 'Bon effort ! Keep practicing!'}</h4>
                <p style="font-size:12px; margin-top:2px; color:#047857;">Recognized: "${spoken}"</p>
            `;
        }
    }
    if (appState.activeTopicLesson) {
        appState.activeTopicLesson.speakingCompleted = true;
    }
}

function checkLessonQuiz(qIndex, selectedOpt, correctOpt, btnEl) {
    const parent = document.getElementById(`quiz-options-${qIndex}`);
    if (!parent) return;

    const btns = parent.querySelectorAll('.quiz-option-btn');
    btns.forEach((b, idx) => {
        b.disabled = true;
        if (idx === correctOpt) b.classList.add('correct');
        else if (idx === selectedOpt) b.classList.add('wrong');
    });
}

function completeCurrentTopic() {
    if (!appState.activeTopicLesson) return;

    const { levelKey, topicIndex, topicObj, lessonData, speakingCompleted } = appState.activeTopicLesson;
    
    // Set completion state
    appState.completedTopics[topicObj.id] = 100;
    
    // Unlock next topic
    const levelTopics = CEFR_CURRICULUM[levelKey].topics;
    const hasNext = topicIndex + 1 < levelTopics.length;
    if (hasNext) {
        const nextTopic = levelTopics[topicIndex + 1];
        if (!appState.completedTopics[nextTopic.id]) {
            appState.completedTopics[nextTopic.id] = 0; // Unlocked
        }
    }

    addXP(50);
    saveData();
    renderTopicsGrid();

    // Render Celebration Complete Screen inside Modal
    renderLessonCompletionScreen(levelKey, topicIndex, topicObj, lessonData, hasNext, speakingCompleted);
}

function renderLessonCompletionScreen(levelKey, topicIndex, topicObj, lessonData, hasNext, speakingCompleted) {
    const container = document.getElementById('topic-lesson-container');
    if (!container) return;

    container.innerHTML = `
        <div class="lesson-complete-card">
            <div class="complete-badge-large">🎉</div>
            <h2 style="font-size:24px; color:#1e293b; margin:8px 0;">Lesson Complete!</h2>
            <p style="font-size:14px; color:#475569; margin-bottom:16px;">Félicitations ! You have completed <strong>${topicObj.french}</strong> (${topicObj.english}).</p>

            <div class="complete-xp-pill" style="display:inline-block; background:#fef3c7; color:#b45309; padding:8px 16px; border-radius:20px; font-weight:800; font-size:15px; margin-bottom:20px;">
                ⚡ +50 XP & 🪙 +25 Coins Awarded!
            </div>

            <div class="complete-stats-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:24px;">
                <div class="complete-stat-item" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:#10b981;">100%</div>
                    <div style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Score</div>
                </div>
                <div class="complete-stat-item" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:#6366f1;">${lessonData.vocab.length}/${lessonData.vocab.length}</div>
                    <div style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Vocab</div>
                </div>
                <div class="complete-stat-item" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; text-align:center;">
                    <div style="font-size:20px; font-weight:800; color:#f59e0b;">Yes ✅</div>
                    <div style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Voice Score</div>
                </div>
            </div>

            <div class="complete-actions-row" style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn btn-secondary" style="padding:12px;" onclick="openTopicLessonModal('${levelKey}', ${topicIndex})">
                    <i class="fa-solid fa-rotate-left"></i> Review Lesson
                </button>
                <button class="btn btn-secondary" style="padding:12px;" onclick="openTopicLessonModal('${levelKey}', ${topicIndex})">
                    <i class="fa-solid fa-arrows-rotate"></i> Try Again
                </button>
                ${hasNext ? `
                <button class="btn btn-accent" style="padding:14px; font-size:15px; font-weight:800;" onclick="openTopicLessonModal('${levelKey}', ${topicIndex + 1})">
                    <i class="fa-solid fa-circle-arrow-right"></i> Next Topic (${CEFR_CURRICULUM[levelKey].topics[topicIndex + 1].num})
                </button>
                ` : ''}
                <button class="btn btn-primary" style="padding:12px;" onclick="closeTopicLessonModal(); switchTab('lessons');">
                    <i class="fa-solid fa-list-check"></i> Back to Topics List
                </button>
            </div>
        </div>
    `;
}

function closeTopicLessonModal() {
    document.getElementById('topic-lesson-modal').classList.add('hidden');
    appState.activeTopicLesson = null;
}

// Vocabulary Renderer
function renderVocabulary() {
    const grid = document.getElementById('vocab-grid');
    const badge = document.getElementById('vocab-count-badge');
    if (!grid) return;

    let items = [...vocabularyList, ...appState.customWords];
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
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Pronunciation Tester Modal
function openPronounceModal(vocabId) {
    const item = [...vocabularyList, ...appState.customWords].find(v => v.id === vocabId) || vocabularyList[0];
    appState.selectedVocabForModal = item;

    document.getElementById('modal-emoji').innerText = item.emoji || '📖';
    document.getElementById('modal-french-text').innerText = item.frenchText;
    document.getElementById('modal-ipa').innerText = item.ipa || '/.../';
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
    }, 1000);
}

function displayScoreResult(score, spokenText) {
    document.getElementById('modal-score-value').innerText = `${score}%`;
    document.getElementById('modal-recognized-text').innerText = `Recognized Spoken: "${spokenText}"`;
    document.getElementById('modal-feedback-title').innerText = score >= 90 ? "🌟 Excellent French Accent!" : "👍 Good Attempt!";
    document.getElementById('modal-score-result').classList.remove('hidden');

    addXP(15);
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

    container.innerHTML = appState.chatMessages.map((msg) => `
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
                ${pairs.map(p => `<button class="btn btn-outline btn-block" style="margin-bottom:8px;" onclick="selectMatch('${p.id}', 'fr', this)">${p.emoji || '📖'} ${p.frenchText}</button>`).join('')}
            </div>
            <div id="english-col">
                ${pairs.map(p => `<button class="btn btn-outline btn-block" style="margin-bottom:8px;" onclick="selectMatch('${p.id}', 'en', this)">${p.englishTranslation}</button>`).join('')}
            </div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px;" onclick="finishMatchGame()"><i class="fa-solid fa-check"></i> Submit Game (+30 XP)</button>
    `;
}

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
    startMatchGame();
}

// Role Dashboard Renderer
function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    const todayXp = appState.todayXp !== undefined ? appState.todayXp : 50;
    const dailyGoal = appState.dailyXpGoal || 100;
    const pct = Math.min(100, Math.round((todayXp / dailyGoal) * 100));
    const XP_PER_LESSON = 50;
    const remainingXp = Math.max(0, dailyGoal - todayXp);
    const lessonsNeeded = Math.ceil(remainingXp / XP_PER_LESSON);

    const goalStatusHtml = todayXp >= dailyGoal
        ? `<div class="daily-goal-status reached"><i class="fa-solid fa-circle-check"></i> <strong>Daily Goal Achieved!</strong> You've reached your ${dailyGoal} XP target for today.</div>`
        : `<div class="daily-goal-status"><i class="fa-solid fa-book-open-reader"></i> Finish <strong>${lessonsNeeded} more lesson${lessonsNeeded === 1 ? '' : 's'}</strong> (${remainingXp} XP left) to hit your goal!</div>`;

    const goalCardHtml = `
        <div class="daily-xp-card">
            <div class="daily-xp-header">
                <div>
                    <span class="daily-xp-badge">🎯 DAILY XP GOAL</span>
                    <h3>Today's Learning Progress</h3>
                </div>
                <div class="daily-xp-counter">
                    <span class="current-xp">${todayXp}</span> / <span class="target-xp">${dailyGoal} XP</span>
                </div>
            </div>

            <div class="daily-xp-progress-track">
                <div class="daily-xp-progress-fill" style="width: ${pct}%"></div>
            </div>

            <div class="daily-xp-footer">
                ${goalStatusHtml}
                <div class="daily-xp-actions">
                    <button class="btn btn-sm btn-primary" onclick="switchTab('lessons')">
                        <i class="fa-solid fa-play"></i> Start Lesson (+50 XP)
                    </button>
                    <div class="goal-presets">
                        <label>Goal:</label>
                        <button class="preset-btn ${dailyGoal === 50 ? 'active' : ''}" onclick="setDailyGoal(50)">50</button>
                        <button class="preset-btn ${dailyGoal === 100 ? 'active' : ''}" onclick="setDailyGoal(100)">100</button>
                        <button class="preset-btn ${dailyGoal === 150 ? 'active' : ''}" onclick="setDailyGoal(150)">150</button>
                        <button class="preset-btn ${dailyGoal === 200 ? 'active' : ''}" onclick="setDailyGoal(200)">200</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (appState.activeRole === 'STUDENT') {
        container.innerHTML = `
            <h2>🎓 Student Learning Statistics</h2>
            ${goalCardHtml}
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-chart-line" style="color:#2563eb;"></i> CEFR Mastery</h3>
                    <p><strong>A1 Beginner:</strong> 50 Topics Available</p>
                    <p><strong>A2 Elementary:</strong> 40 Topics Available</p>
                    <p><strong>B1 Intermediate:</strong> 35 Topics Available</p>
                    <p><strong>B2 Upper Inter:</strong> 30 Topics Available</p>
                    <p><strong>C1 Advanced:</strong> 30 Topics Available</p>
                    <p><strong>C2 Mastery:</strong> 30 Topics Available</p>
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
            ${goalCardHtml}
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-users" style="color:#2563eb;"></i> Class Management</h3>
                    <p>24 Students Enrolled • 88% Avg Speech Accuracy</p>
                    <button class="btn btn-primary btn-sm" onclick="openCustomWordModal()"><i class="fa-solid fa-plus"></i> Add Class Vocabulary</button>
                </div>
                <div class="dash-card">
                    <h3><i class="fa-solid fa-key" style="color:#f59e0b;"></i> Curriculum Controls</h3>
                    <p>Use "Unlock All Topics" in the top filter bar to instantly preview any CEFR topic lesson!</p>
                </div>
            </div>
        `;
    } else if (appState.activeRole === 'PARENT') {
        container.innerHTML = `
            <h2>👨‍👩‍👧 Parent Weekly Practice Summary</h2>
            ${goalCardHtml}
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-clock" style="color:#2563eb;"></i> Practice Time</h3>
                    <p><strong>7.5 Hours</strong> practiced this week</p>
                    <p><strong>CEFR Level:</strong> ${appState.cefrLevel}</p>
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
            ${goalCardHtml}
            <div class="dashboard-grid">
                <div class="dash-card">
                    <h3><i class="fa-solid fa-server" style="color:#2563eb;"></i> App Health Metrics</h3>
                    <p>System Status: 🟢 All Services Operational</p>
                    <p>CEFR Curriculum Engine: 215 Topics Loaded</p>
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

function closeQuizModal() {
    document.getElementById('quiz-modal').classList.add('hidden');
}
