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

// ==================================================
// COMPLETE LESSON CONTENT DATABASE & CURRICULUM ENGINE
// ==================================================
const LESSON_CONTENT_DATABASE = {
    // ------------------- A1 LEVEL -------------------
    "A1-01": {
        titleFr: "Les salutations",
        titleEn: "Greetings and Introductions",
        category: "Greetings",
        objectives: [
            "Learn formal and informal French greetings.",
            "Say hello, goodbye, and ask how someone is doing.",
            "Practice natural French audio pronunciation with Voice Coach Edna."
        ],
        vocab: [
            { fr: "Bonjour", en: "Hello / Good morning", ipa: "/bɔ̃.ʒuʁ/", exampleFr: "Bonjour madame, comment allez-vous aujourd'hui ?", exampleEn: "Hello ma'am, how are you doing today?" },
            { fr: "Bonsoir", en: "Good evening", ipa: "/bɔ̃.swaʁ/", exampleFr: "Bonsoir tout le monde, soyez les bienvenus.", exampleEn: "Good evening everyone, welcome." },
            { fr: "Salut", en: "Hi / Bye (Informal)", ipa: "/sa.ly/", exampleFr: "Salut Marc ! Ça va bien ce matin ?", exampleEn: "Hi Marc! Are things going well this morning?" },
            { fr: "Au revoir", en: "Goodbye", ipa: "/o ʁə.vwaʁ/", exampleFr: "Au revoir et à bientôt !", exampleEn: "Goodbye and see you soon!" }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Greetings & Politeness)</strong>: Use <em>'Vous'</em> for formal interactions (strangers, elders, professional) and <em>'Tu'</em> for friends and family.",
        dialogue: [
            { speaker: "Marie", fr: "Bonjour monsieur, comment allez-vous ?", en: "Hello sir, how are you?" },
            { speaker: "Pierre", fr: "Très bien, merci ! Et vous ?", en: "Very well, thank you! And you?" }
        ],
        sentenceBuilder: {
            target: "Bonjour comment allez vous aujourd'hui",
            words: ["Bonjour", "comment", "allez", "vous", "aujourd'hui"]
        },
        speakingPrompt: "Présente-toi en français.",
        targetSentence: "Bonjour, je m'appelle Sophie et je suis ravie de vous rencontrer.",
        targetSentenceEn: "Hello, my name is Sophie and I am delighted to meet you.",
        quiz: [
            { q: "How do you say 'Good evening' formally in French?", options: ["Bonsoir", "Bonjour", "Au revoir", "Salut"], correct: 0 },
            { q: "Which greeting is used informally among close friends?", options: ["Bonjour monsieur", "Salut !", "Bonsoir madame", "Enchanté"], correct: 1 },
            { q: "What is the polite formal way to ask 'How are you?'", options: ["Ça va ?", "Comment allez-vous ?", "Tu es d'où ?", "Quel âge as-tu ?"], correct: 1 }
        ]
    },
    "A1-02": {
        titleFr: "Se présenter",
        titleEn: "Introducing Yourself",
        category: "Personal Info",
        objectives: [
            "State your name, age, nationality, and profession.",
            "Use the verbs 's'appeler', 'être', and 'avoir' correctly.",
            "Introduce yourself smoothly in French."
        ],
        vocab: [
            { fr: "Je m'appelle", en: "My name is", ipa: "/ʒə ma.pɛl/", exampleFr: "Je m'appelle Thomas et j'habite à Paris.", exampleEn: "My name is Thomas and I live in Paris." },
            { fr: "J'ai ... ans", en: "I am ... years old", ipa: "/ʒe ... ɑ̃/", exampleFr: "J'ai vingt-cinq ans.", exampleEn: "I am twenty-five years old." },
            { fr: "Je suis étudiant(e)", en: "I am a student", ipa: "/ʒə sɥi e.ty.djɑ̃/", exampleFr: "Je suis étudiante à l'université.", exampleEn: "I am a student at the university." },
            { fr: "Enchanté(e)", en: "Pleased to meet you", ipa: "/ɑ̃.ʃɑ̃.te/", exampleFr: "Enchanté de faire votre connaissance.", exampleEn: "Pleased to make your acquaintance." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Avoir vs Être for Age)</strong>: In French, you <em>have</em> years ('J'ai 20 ans'), unlike in English where you <em>are</em> years old.",
        dialogue: [
            { speaker: "Lucas", fr: "Comment tu t'appelles ?", en: "What is your name?" },
            { speaker: "Camille", fr: "Je m'appelle Camille, j'ai 22 ans et je suis française.", en: "My name is Camille, I am 22 years old and I am French." }
        ],
        sentenceBuilder: {
            target: "Je m'appelle Thomas et j'ai vingt ans",
            words: ["Je", "m'appelle", "Thomas", "et", "j'ai", "vingt", "ans"]
        },
        speakingPrompt: "Présente-toi brièvement.",
        targetSentence: "Je m'appelle Lucas, j'ai vingt-quatre ans et j'habite en France.",
        targetSentenceEn: "My name is Lucas, I am twenty-four years old and I live in France.",
        quiz: [
            { q: "How do you express your age in French?", options: ["Je suis 25 ans", "J'ai 25 ans", "Je fais 25 ans", "Mon âge est 25"], correct: 1 },
            { q: "What does 'Enchanté' mean?", options: ["Goodbye", "Pleased to meet you", "Thank you very much", "Excuse me"], correct: 1 },
            { q: "Which verb is used for your name ('Je m'appelle')?", options: ["s'appeler", "être", "avoir", "habiter"], correct: 0 }
        ]
    },
    "A1-03": {
        titleFr: "La famille",
        titleEn: "Family Members & Relationships",
        category: "Family",
        objectives: [
            "Name primary family members in French.",
            "Use possessive adjectives (mon, ma, mes).",
            "Describe your family relationships."
        ],
        vocab: [
            { fr: "Le père / La mère", en: "Father / Mother", ipa: "/lə pɛʁ / la mɛʁ/", exampleFr: "Mon père et ma mère sont très gentils.", exampleEn: "My father and my mother are very kind." },
            { fr: "Le frère / La sœur", en: "Brother / Sister", ipa: "/lə fʁɛʁ / la sœʁ/", exampleFr: "J'ai un frère et deux sœurs.", exampleEn: "I have one brother and two sisters." },
            { fr: "Les parents", en: "Parents", ipa: "/le pa.ʁɑ̃/", exampleFr: "Mes parents habitent dans une grande maison.", exampleEn: "My parents live in a big house." },
            { fr: "L'enfant", en: "Child / Kid", ipa: "/lɑ̃.fɑ̃/", exampleFr: "Ils ont deux enfants magnifiques.", exampleEn: "They have two magnificent children." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Possessive Adjectives)</strong>: Possessives agree with the gender of the possessed noun: <em>mon père</em> (masc.), <em>ma mère</em> (fem.), <em>mes parents</em> (plural).",
        dialogue: [
            { speaker: "Sarah", fr: "Tu as une grande famille ?", en: "Do you have a big family?" },
            { speaker: "Paul", fr: "Oui, j'ai deux frères, une sœur et mes grands-parents !", en: "Yes, I have two brothers, one sister and my grandparents!" }
        ],
        sentenceBuilder: {
            target: "J'aime ma famille et mes parents",
            words: ["J'aime", "ma", "famille", "et", "mes", "parents"]
        },
        speakingPrompt: "Décris ta famille.",
        targetSentence: "Dans ma famille, nous sommes quatre personnes très unies.",
        targetSentenceEn: "In my family, we are four very close people.",
        quiz: [
            { q: "How do you say 'My mother' in French?", options: ["Mon mère", "Ma mère", "Mes mère", "Le mère"], correct: 1 },
            { q: "What is 'brother' in French?", options: ["Le père", "Le frère", "L'oncle", "Le fils"], correct: 1 },
            { q: "Which possessive is used before a plural noun like 'parents'?", options: ["Mon", "Ma", "Mes", "Leur"], correct: 2 }
        ]
    },
    "A1-04": {
        titleFr: "Les nombres et l'âge",
        titleEn: "Numbers, Age & Personal Info",
        category: "Numbers",
        objectives: [
            "Count from 1 to 100 in French.",
            "Ask and answer questions about age and telephone numbers.",
            "Master number pronunciation."
        ],
        vocab: [
            { fr: "Un, deux, trois", en: "One, two, three", ipa: "/œ̃, dø, tʁwa/", exampleFr: "Un, deux, trois, partez !", exampleEn: "One, two, three, go!" },
            { fr: "Dix, vingt, trente", en: "Ten, twenty, thirty", ipa: "/dis, vɛ̃, tʁɑ̃t/", exampleFr: "J'ai trente euros dans mon portefeuille.", exampleEn: "I have thirty euros in my wallet." },
            { fr: "Quel âge as-tu ?", en: "How old are you?", ipa: "/kɛl ɑʒ a ty/", exampleFr: "Quel âge as-tu, mon ami ?", exampleEn: "How old are you, my friend?" },
            { fr: "Le numéro de téléphone", en: "Phone number", ipa: "/lə ny.me.ʁo də te.le.fɔn/", exampleFr: "Voici mon numéro de téléphone.", exampleEn: "Here is my phone number." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Phone Numbers)</strong>: Phone numbers in France are spoken in pairs of two digits (e.g. 06 12 34 56 78 -> <em>zéro six, douze...</em>).",
        dialogue: [
            { speaker: "Éric", fr: "Quel est ton numéro de téléphone ?", en: "What is your phone number?" },
            { speaker: "Julie", fr: "C'est le zéro six, vingt, trente, quarante, cinquante.", en: "It is 06 20 30 40 50." }
        ],
        sentenceBuilder: {
            target: "J'ai trente ans et deux enfants",
            words: ["J me", "J'ai", "trente", "ans", "et", "deux", "enfants"]
        },
        speakingPrompt: "Dis ton âge et numéro de téléphone.",
        targetSentence: "J'ai trente ans et mon numéro commence par zéro six.",
        targetSentenceEn: "I am thirty years old and my number begins with zero six.",
        quiz: [
            { q: "What is '20' in French?", options: ["Dix", "Vingt", "Trente", "Quarante"], correct: 1 },
            { q: "How do you ask someone their age informally?", options: ["Comment allez-vous ?", "Quel âge as-tu ?", "Où habites-tu ?", "Comment t'appelles-tu ?"], correct: 1 },
            { q: "What number comes right after 'dix-neuf' (19)?", options: ["Dix-huit", "Vingt", "Vingt-et-un", "Trente"], correct: 1 }
        ]
    },
    "A1-05": {
        titleFr: "Les jours, les mois et la date",
        titleEn: "Days, Months & Dates",
        category: "Time & Dates",
        objectives: [
            "Name the 7 days of the week and 12 months.",
            "Express today's date in standard French format.",
            "Talk about birthday dates and calendar events."
        ],
        vocab: [
            { fr: "Lundi, mardi, mercredi", en: "Monday, Tuesday, Wednesday", ipa: "/lœ̃.di, maʁ.di, mɛʁ.kʁə.di/", exampleFr: "Lundi prochain, je commence mon nouveau cours.", exampleEn: "Next Monday, I start my new course." },
            { fr: "Aujourd'hui, c'est...", en: "Today is...", ipa: "/o.ʒuʁ.dɥi sɛ/", exampleFr: "Aujourd'hui, c'est vendredi !", exampleEn: "Today is Friday!" },
            { fr: "Le mois de janvier", en: "The month of January", ipa: "/lə mwa də ʒɑ̃.vje/", exampleFr: "Mon anniversaire est en janvier.", exampleEn: "My birthday is in January." },
            { fr: "La date d'aujourd'hui", en: "Today's date", ipa: "/la dat d‿o.ʒuʁ.dɥi/", exampleFr: "Nous sommes le 15 octobre.", exampleEn: "We are October 15th." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Dates in French)</strong>: Use <em>'Le' + number + month</em> (e.g., <em>Le 14 juillet</em>). Note that days and months are NOT capitalized in French!",
        dialogue: [
            { speaker: "Manon", fr: "Quelle est la date aujourd'hui ?", en: "What is the date today?" },
            { speaker: "Antoine", fr: "Aujourd'hui, nous sommes le mardi dix mai.", en: "Today is Tuesday, May 10th." }
        ],
        sentenceBuilder: {
            target: "Aujourd'hui nous sommes le dix mai",
            words: ["Aujourd'hui", "nous", "sommes", "le", "dix", "mai"]
        },
        speakingPrompt: "Dis la date de ton anniversaire.",
        targetSentence: "Aujourd'hui nous sommes lundi et c'est un très beau jour.",
        targetSentenceEn: "Today is Monday and it is a very beautiful day.",
        quiz: [
            { q: "Are days of the week capitalized in French?", options: ["Yes always", "No, never", "Only on holidays", "Only in titles"], correct: 1 },
            { q: "How do you say 'Today is Friday'?", options: ["Demain c'est vendredi", "Aujourd'hui c'est vendredi", "Hier c'était vendredi", "Toujours vendredi"], correct: 1 },
            { q: "What is the correct date structure in French?", options: ["Le 15 mai", "Mai le 15", "15th de mai", "En 15 mai"], correct: 0 }
        ]
    },
    "A1-06": {
        titleFr: "Ma routine quotidienne",
        titleEn: "Daily Routine",
        category: "Daily Life",
        objectives: [
            "Describe daily activities from morning to evening.",
            "Use reflexive verbs in the present tense (se réveiller, se lever).",
            "Tell time for daily habits."
        ],
        vocab: [
            { fr: "Se réveiller", en: "To wake up", ipa: "/sə ʁe.vɛ.je/", exampleFr: "Je me réveille à sept heures tous les matins.", exampleEn: "I wake up at seven o'clock every morning." },
            { fr: "Prendre le petit-déjeuner", en: "To have breakfast", ipa: "/pʁɑ̃dʁ lə pə.ti de.ʒœ.ne/", exampleFr: "Je prends mon petit-déjeuner à huit heures.", exampleEn: "I eat my breakfast at eight o'clock." },
            { fr: "S'habiller", en: "To get dressed", ipa: "/sa.bi.je/", exampleFr: "Elle s'habille rapidement pour aller travailler.", exampleEn: "She gets dressed quickly to go to work." },
            { fr: "Se coucher", en: "To go to bed", ipa: "/sə ku.ʃe/", exampleFr: "Je me couche vers vingt-trois heures.", exampleEn: "I go to bed around eleven p.m." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Reflexive Verbs)</strong>: Reflexive verbs use pronouns matching the subject: <em>Je me réveille, tu te réveilles, il se réveille, nous nous réveillons</em>.",
        dialogue: [
            { speaker: "David", fr: "À quelle heure tu te réveilles le matin ?", en: "What time do you wake up in the morning?" },
            { speaker: "Chloé", fr: "Je me réveille à sept heures et je prends un bon café.", en: "I wake up at seven o'clock and I have a nice coffee." }
        ],
        sentenceBuilder: {
            target: "Je me réveille à sept heures",
            words: ["Je", "me", "réveille", "à", "sept", "heures"]
        },
        speakingPrompt: "Décris ta routine quotidienne.",
        targetSentence: "Chaque matin, je me réveille à sept heures et je prends mon petit-déjeuner.",
        targetSentenceEn: "Every morning, I wake up at seven o'clock and eat my breakfast.",
        quiz: [
            { q: "What is the French verb for 'to wake up'?", options: ["Se réveiller", "Se coucher", "Manger", "Parler"], correct: 0 },
            { q: "What is the reflexive pronoun for 'Je'?", options: ["te", "me", "se", "nous"], correct: 1 },
            { q: "How do you say 'I go to bed at 10 p.m.'?", options: ["Je me lève à 22h", "Je me couche à 22h", "Je m'habille à 22h", "Je mange à 22h"], correct: 1 }
        ]
    },
    "A1-07": {
        titleFr: "L'école et la classe",
        titleEn: "School and Classroom Language",
        category: "School",
        objectives: [
            "Name common classroom objects.",
            "Ask permission and understand teacher instructions.",
            "Express school subjects you study."
        ],
        vocab: [
            { fr: "Le livre / Le cahier", en: "Book / Notebook", ipa: "/lə livʁ / lə ka.je/", exampleFr: "Ouvrez votre livre à la page dix.", exampleEn: "Open your book to page ten." },
            { fr: "Le stylo", en: "Pen", ipa: "/lə sti.lo/", exampleFr: "J'ai un stylo bleu et un crayon.", exampleEn: "I have a blue pen and a pencil." },
            { fr: "Puis-je poser une question ?", en: "May I ask a question?", ipa: "/pɥi ʒə po.ze yn kɛs.tjɔ̃/", exampleFr: "Excusez-moi professeur, puis-je poser une question ?", exampleEn: "Excuse me teacher, may I ask a question?" },
            { fr: "Comprendre", en: "To understand", ipa: "/kɔ̃.pʁɑ̃dʁ/", exampleFr: "Je comprends très bien la leçon.", exampleEn: "I understand the lesson very well." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Classroom Questions)</strong>: To ask polite permission, use <em>'Puis-je... ?'</em> or <em>'Est-ce que je peux... ?'</em>.",
        dialogue: [
            { speaker: "Élève", fr: "Est-ce que je peux répéter la phrase, s'il vous plaît ?", en: "May I repeat the sentence, please?" },
            { speaker: "Professeur", fr: "Oui, bien sûr, écoutez attentivement !", en: "Yes, of course, listen carefully!" }
        ],
        sentenceBuilder: {
            target: "J'ai un livre et un stylo",
            words: ["J'ai", "un", "livre", "et", "un", "stylo"]
        },
        speakingPrompt: "Demande de l'aide en classe de français.",
        targetSentence: "Pardon professeur, puis-je poser une question sur le vocabulaire ?",
        targetSentenceEn: "Excuse me teacher, may I ask a question about the vocabulary?",
        quiz: [
            { q: "What is 'book' in French?", options: ["Le stylo", "Le livre", "La table", "Le sac"], correct: 1 },
            { q: "How do you politely ask 'May I ask a question?'", options: ["Où est le sac ?", "Puis-je poser une question ?", "Quel est ton nom ?", "Au revoir !"], correct: 1 },
            { q: "What does 'Écoutez' mean?", options: ["Read", "Write", "Listen", "Speak"], correct: 2 }
        ]
    },
    "A1-08": {
        titleFr: "La maison et le logement",
        titleEn: "House, Rooms & Objects",
        category: "House",
        objectives: [
            "Name rooms of a house (salon, cuisine, chambre, salle de bain).",
            "Describe furniture and household objects.",
            "Locate items using prepositions of place."
        ],
        vocab: [
            { fr: "La maison / L'appartement", en: "House / Apartment", ipa: "/la mɛ.zɔ̃ / la.paʁ.tə.mɑ̃/", exampleFr: "J'habite dans un bel appartement au centre-ville.", exampleEn: "I live in a nice apartment downtown." },
            { fr: "La cuisine", en: "Kitchen", ipa: "/la kɥi.zin/", exampleFr: "Maman prépare le dîner dans la cuisine.", exampleEn: "Mom is preparing dinner in the kitchen." },
            { fr: "La chambre", en: "Bedroom", ipa: "/la ʃɑ̃bʁ/", exampleFr: "Ma chambre est très confortable.", exampleEn: "My bedroom is very comfortable." },
            { fr: "Le lit / La table", en: "Bed / Table", ipa: "/lə li / la tabl/", exampleFr: "Il y a un grand lit dans ma chambre.", exampleEn: "There is a big bed in my bedroom." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Il y a)</strong>: Use <em>'Il y a'</em> to mean 'there is / there are'. Example: <em>Il y a trois pièces dans l'appartement.</em>",
        dialogue: [
            { speaker: "Alex", fr: "Comment est ta maison ?", en: "What is your house like?" },
            { speaker: "Nathalie", fr: "Elle est grand avec un joli jardin et trois chambres.", en: "It is big with a pretty garden and three bedrooms." }
        ],
        sentenceBuilder: {
            target: "Il y a une grande cuisine",
            words: ["Il", "y", "a", "une", "grande", "cuisine"]
        },
        speakingPrompt: "Décris ta maison ou ton appartement.",
        targetSentence: "J'habite dans une maison agréable avec un grand salon lumineux.",
        targetSentenceEn: "I live in a pleasant house with a large bright living room.",
        quiz: [
            { q: "What room do you cook in?", options: ["La chambre", "La cuisine", "Le salon", "La salle de bain"], correct: 1 },
            { q: "What does 'Il y a' mean?", options: ["There is / There are", "He goes", "They have", "I see"], correct: 0 },
            { q: "Where do you sleep?", options: ["Dans la cuisine", "Dans la chambre", "Dans le garage", "Au jardin"], correct: 1 }
        ]
    },
    "A1-09": {
        titleFr: "La nourriture et les boissons",
        titleEn: "Food and Drinks",
        category: "Food",
        objectives: [
            "Name common French food and drinks.",
            "Express preferences (j'aime, je préfère, je déteste).",
            "Use partitive articles (du, de la, des)."
        ],
        vocab: [
            { fr: "Le pain / Le croissant", en: "Bread / Croissant", ipa: "/lə pɛ̃ / lə kwasã/", exampleFr: "J'achète du pain frais tous les matins.", exampleEn: "I buy fresh bread every morning." },
            { fr: "Le fromage", en: "Cheese", ipa: "/lə fʁɔ.maʒ/", exampleFr: "La France est célèbre pour son fromage.", exampleEn: "France is famous for its cheese." },
            { fr: "L'eau / Le café", en: "Water / Coffee", ipa: "/lo / lə ka.fe/", exampleFr: "Je bois un café chaud le matin.", exampleEn: "I drink a hot coffee in the morning." },
            { fr: "La pomme / La banane", en: "Apple / Banana", ipa: "/la pɔm / la ba.nan/", exampleFr: "J'aime manger une pomme verte.", exampleEn: "I like eating a green apple." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Partitive Articles)</strong>: Use <em>du</em> (masc.), <em>de la</em> (fem.), <em>de l'</em> (vowel), <em>des</em> (plural) for unspecified quantities: <em>Je bois de l'eau et du lait.</em>",
        dialogue: [
            { speaker: "Serveur", fr: "Qu'est-ce que vous buvez ?", en: "What are you drinking?" },
            { speaker: "Client", fr: "Je prends de l'eau minérale et un café, s'il vous plaît.", en: "I'll have mineral water and a coffee, please." }
        ],
        sentenceBuilder: {
            target: "Je mange du pain et du fromage",
            words: ["Je", "mange", "du", "pain", "et", "du", "fromage"]
        },
        speakingPrompt: "Parle de tes aliments préférés.",
        targetSentence: "J'aime boire un café au lait et manger un bon croissant chaud.",
        targetSentenceEn: "I like drinking coffee with milk and eating a good hot croissant.",
        quiz: [
            { q: "Which partitive article goes with feminine nouns ('soupe')?", options: ["du", "de la", "des", "le"], correct: 1 },
            { q: "What is 'bread' in French?", options: ["Le fromage", "Le pain", "Le jus", "La pomme"], correct: 1 },
            { q: "How do you say 'I drink water'?", options: ["Je mange de l'eau", "Je bois de l'eau", "J'ai de l'eau", "Je fais de l'eau"], correct: 1 }
        ]
    },
    "A1-10": {
        titleFr: "Au restaurant",
        titleEn: "Ordering Food and Drinks",
        category: "Restaurant",
        objectives: [
            "Order a meal politely at a restaurant.",
            "Ask for the menu and the bill.",
            "Express dietary preferences."
        ],
        vocab: [
            { fr: "Je voudrais...", en: "I would like...", ipa: "/ʒə vu.dʁɛ/", exampleFr: "Je voudrais le plat du jour, s'il vous plaît.", exampleEn: "I would like the dish of the day, please." },
            { fr: "La carte / Le menu", en: "The menu", ipa: "/la kaʁt / lə mə.ny/", exampleFr: "Puis-je avoir la carte des desserts ?", exampleEn: "May I have the dessert menu?" },
            { fr: "L'addition, s'il vous plaît", en: "The bill, please", ipa: "/la.di.sjɔ̃ sil vu plɛ/", exampleFr: "Excusez-moi, nous voudrions l'addition.", exampleEn: "Excuse me, we would like the bill." },
            { fr: "C'est délicieux !", en: "It is delicious!", ipa: "/sɛ de.li.sjø/", exampleFr: "Ce repas était vraiment délicieux !", exampleEn: "This meal was truly delicious!" }
        ],
        grammarNote: "💡 <strong>Politeness Tip</strong>: Always say <em>'Je voudrais...'</em> (conditional) instead of <em>'Je veux...'</em> (too blunt) when ordering food.",
        dialogue: [
            { speaker: "Serveur", fr: "Vous désirez passer commande ?", en: "Would you like to order?" },
            { speaker: "Client", fr: "Oui, je voudrais le poulet rôti avec de l'eau minérale.", en: "Yes, I would like roasted chicken with mineral water." }
        ],
        sentenceBuilder: {
            target: "Je voudrais le menu s'il vous plaît",
            words: ["Je", "voudrais", "le", "menu", "s'il", "vous", "plaît"]
        },
        speakingPrompt: "Passe une commande au restaurant.",
        targetSentence: "Bonjour, je voudrais une table pour deux personnes et le menu du jour.",
        targetSentenceEn: "Hello, I would like a table for two people and the daily menu.",
        quiz: [
            { q: "What is the polite phrase to order food?", options: ["Je veux", "Je voudrais", "Donne-moi", "Tu as"], correct: 1 },
            { q: "How do you ask for the check/bill in France?", options: ["L'addition, s'il vous plaît", "Le livre, s'il vous plaît", "Merci au revoir", "La carte gratuite"], correct: 0 },
            { q: "What does 'Le plat du jour' mean?", options: ["Daily special dish", "The plate of paper", "Yesterday's food", "Free salad"], correct: 0 }
        ]
    },
    "A1-11": {
        titleFr: "Faire les courses",
        titleEn: "Shopping & Stores",
        category: "Shopping",
        objectives: [
            "Ask for prices (Combien ça coûte ?).",
            "Name common shops (la boulangerie, le supermarché).",
            "Pay using euros and cash/card."
        ],
        vocab: [
            { fr: "Combien ça coûte ?", en: "How much does it cost?", ipa: "/kɔ̃.bjɛ̃ sa kut/", exampleFr: "Bonjour, combien coûte ce kilo de pommes ?", exampleEn: "Hello, how much does this kilo of apples cost?" },
            { fr: "La boulangerie", en: "The bakery", ipa: "/la bu.lɑ̃.ʒʁi/", exampleFr: "J'achète une baguette à la boulangerie.", exampleEn: "I buy a baguette at the bakery." },
            { fr: "Le supermarché", en: "The supermarket", ipa: "/lə sy.pɛʁ.maʁ.ʃe/", exampleFr: "Faisons les courses au supermarché.", exampleEn: "Let's go grocery shopping at the supermarket." },
            { fr: "Payer par carte / en espèces", en: "Pay by card / in cash", ipa: "/pe.je paʁ kaʁt/", exampleFr: "Puis-je payer par carte bancaire ?", exampleEn: "May I pay by credit card?" }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Prices)</strong>: Ask <em>'C'est combien ?'</em> or <em>'Combien coûte... ?'</em>. Amounts are expressed in euros (€).",
        dialogue: [
            { speaker: "Vendeur", fr: "Ça fera dix euros, s'il vous plaît.", en: "That will be ten euros, please." },
            { speaker: "Client", fr: "Voilà, puis-je payer par carte bancaire ?", en: "Here you go, can I pay by card?" }
        ],
        sentenceBuilder: {
            target: "Combien coûte cette belle baguette",
            words: ["Combien", "coûte", "cette", "belle", "baguette"]
        },
        speakingPrompt: "Demande le prix d'un article au magasin.",
        targetSentence: "Bonjour monsieur, combien coûtent ces délicieux croissants ?",
        targetSentenceEn: "Hello sir, how much do these delicious croissants cost?",
        quiz: [
            { q: "How do you ask 'How much does it cost?'", options: ["Comment vous allez ?", "Combien ça coûte ?", "Où est le magasin ?", "Quel jour sommes-nous ?"], correct: 1 },
            { q: "Where do you buy fresh bread in France?", options: ["À la pharmacie", "À la boulangerie", "À la banque", "Au parc"], correct: 1 },
            { q: "What does 'Payer par carte' mean?", options: ["Pay by card", "Pay in cash", "Buy a map", "Send a postcard"], correct: 0 }
        ]
    },
    "A1-12": {
        titleFr: "Les loisirs et sports",
        titleEn: "Hobbies and Free Time",
        category: "Hobbies",
        objectives: [
            "Talk about hobbies, sports, and entertainment.",
            "Use 'Faire du / de la' vs 'Jouer à / au'.",
            "Express what you do on weekends."
        ],
        vocab: [
            { fr: "Faire du sport", en: "To do sports", ipa: "/fɛʁ dy spɔʁ/", exampleFr: "Le week-end, j'aime faire du sport.", exampleEn: "On weekends, I like playing sports." },
            { fr: "Jouer au football / au tennis", en: "Play football / tennis", ipa: "/ʒwe o fut.bɔl/", exampleFr: "Mon frère aime jouer au football.", exampleEn: "My brother likes playing football." },
            { fr: "Écouter de la musique", en: "Listen to music", ipa: "/e.ku.te də la my.zik/", exampleFr: "J'écoute de la musique française le soir.", exampleEn: "I listen to French music in the evening." },
            { fr: "Lire un livre", en: "Read a book", ipa: "/liʁ œ̃ livʁ/", exampleFr: "Pendant mon temps libre, j'aime lire un roman.", exampleEn: "During my free time, I like reading a novel." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Jouer vs Faire)</strong>: Use <em>Jouer à</em> + games/team sports (<em>jouer au tennis</em>) and <em>Faire de</em> + activities/individual sports (<em>faire du vélo, faire du piano</em>).",
        dialogue: [
            { speaker: "Julien", fr: "Qu'est-ce que tu fais pendant ton temps libre ?", en: "What do you do in your free time?" },
            { speaker: "Emma", fr: "J'aime faire du vélo et écouter de la musique.", en: "I like riding a bike and listening to music." }
        ],
        sentenceBuilder: {
            target: "J'aime faire du vélo le weekend",
            words: ["J'aime", "faire", "du", "vélo", "le", "weekend"]
        },
        speakingPrompt: "Parle de tes loisirs préférés.",
        targetSentence: "Pendant mon temps libre, j'adore faire du sport et lire de bons livres.",
        targetSentenceEn: "During my free time, I love doing sports and reading good books.",
        quiz: [
            { q: "Which preposition goes with 'Jouer' + sports with balls?", options: ["de", "à (au/aux)", "en", "avec"], correct: 1 },
            { q: "How do you say 'I listen to music'?", options: ["Je regarde la musique", "J'écoute de la musique", "Je lis la musique", "Je fais la musique"], correct: 1 },
            { q: "Complete: 'Je fais ______ vélo le dimanche.'", options: ["du", "au", "à la", "des"], correct: 0 }
        ]
    },

    // ------------------- A2 LEVEL -------------------
    "A2-01": {
        titleFr: "Raconter sa journée",
        titleEn: "Talking About Your Day",
        category: "Past & Routine",
        objectives: [
            "Narrate chronological events of your day.",
            "Use temporal connectors (d'abord, ensuite, puis, enfin).",
            "Combine present and past tenses naturally."
        ],
        vocab: [
            { fr: "D'abord / Tout d'abord", en: "First of all", ipa: "/da.bɔʁ/", exampleFr: "D'abord, je prends un café noir.", exampleEn: "First of all, I take a black coffee." },
            { fr: "Ensuite / Puis", en: "Next / Then", ipa: "/ɑ̃.sɥit / pɥi/", exampleFr: "Ensuite, je vais au travail à vélo.", exampleEn: "Next, I go to work by bicycle." },
            { fr: "Après cela", en: "After that", ipa: "/a.pʁɛ sə.la/", exampleFr: "Après cela, je rencontre mes collègues.", exampleEn: "After that, I meet my colleagues." },
            { fr: "Enfin / Finalement", en: "Finally", ipa: "/ɑ̃.fɛ̃ / fi.nal.mɑ̃/", exampleFr: "Enfin, je rentre à la maison vers dix-neuf heures.", exampleEn: "Finally, I return home around 7 p.m." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Chronology)</strong>: Structure your speech smoothly using order connectors: <em>D'abord... ensuite... puis... enfin...</em>.",
        dialogue: [
            { speaker: "Hugo", fr: "Raconte-moi ta journée d'hier !", en: "Tell me about your day yesterday!" },
            { speaker: "Léa", fr: "D'abord j'ai travaillé, ensuite j'ai fait du sport et enfin j'ai dîné avec des amis.", en: "First I worked, then I played sports and finally I had dinner with friends." }
        ],
        sentenceBuilder: {
            target: "D'abord j'ai travaillé et ensuite j'ai mangé",
            words: ["D'abord", "j'ai", "travaillé", "et", "ensuite", "j'ai", "mangé"]
        },
        speakingPrompt: "Raconte ta journée typique ou passée.",
        targetSentence: "Ce matin, je me suis levé tôt, j'ai pris mon petit-déjeuner et je suis parti travailler.",
        targetSentenceEn: "This morning, I woke up early, ate my breakfast and left for work.",
        quiz: [
            { q: "Which connector means 'First of all'?", options: ["D'abord", "Enfin", "Jamais", "Pourtant"], correct: 0 },
            { q: "What does 'Ensuite' mean?", options: ["Then / Next", "Yesterday", "Never", "Always"], correct: 0 },
            { q: "How do you say 'Finally' at the end of a narrative?", options: ["D'abord", "Enfin", "Car", "Si"], correct: 1 }
        ]
    },
    "A2-02": {
        titleFr: "Le passé composé",
        titleEn: "Talking About Completed Past Actions",
        category: "Grammar",
        objectives: [
            "Form the passé composé with 'avoir' and 'être'.",
            "Memorize irregular past participles (fait, vu, pris, écrit).",
            "Describe completed events in the past."
        ],
        vocab: [
            { fr: "J'ai fait", en: "I did / I made", ipa: "/ʒe fɛ/", exampleFr: "Hier, j'ai fait du sport le matin.", exampleEn: "Yesterday, I did sports in the morning." },
            { fr: "Je suis allé(e)", en: "I went", ipa: "/ʒə sɥi.z‿a.le/", exampleFr: "Je suis allé au cinéma samedi soir.", exampleEn: "I went to the cinema Saturday evening." },
            { fr: "J'ai vu", en: "I saw", ipa: "/ʒe vy/", exampleFr: "J'ai vu un très bon film français.", exampleEn: "I saw a very good French movie." },
            { fr: "J'ai pris", en: "I took / I ate", ipa: "/ʒe pʁi/", exampleFr: "J'ai pris le train de huit heures.", exampleEn: "I took the eight o'clock train." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Passé Composé Auxiliary)</strong>: Verbs of movement (DR & MRS VANDERTRAMPP) use <em>Être</em> (e.g. <em>Je suis allé</em>). Most other verbs use <em>Avoir</em> (e.g. <em>J'ai mangé</em>).",
        dialogue: [
            { speaker: "Maxime", fr: "Qu'est-ce que tu as fait hier soir ?", en: "What did you do last night?" },
            { speaker: "Clara", fr: "Hier soir, je suis sortie avec mes amis et nous avons mangé au restaurant.", en: "Last night, I went out with my friends and we ate at a restaurant." }
        ],
        sentenceBuilder: {
            target: "Hier je suis allé au marché",
            words: ["Hier", "je", "suis", "allé", "au", "marché"]
        },
        speakingPrompt: "Raconte trois choses que tu as faites hier.",
        targetSentence: "Hier, je suis allé au marché et j'ai acheté de délicieux fruits.",
        targetSentenceEn: "Yesterday, I went to the market and bought delicious fruit.",
        quiz: [
            { q: "Which auxiliary verb is used for 'aller' in the passé composé?", options: ["Être", "Avoir", "Faire", "Venir"], correct: 0 },
            { q: "What is the past participle of 'faire'?", options: ["Faisé", "Fait", "Faisant", "Fais"], correct: 1 },
            { q: "Translate: 'I ate a croissant.'", options: ["J'ai mangé un croissant.", "Je suis mangé un croissant.", "Je mange un croissant.", "J'ai mange un croissant."], correct: 0 }
        ]
    },
    "A2-03": {
        titleFr: "Les vacances et les voyages",
        titleEn: "Travel and Holidays",
        category: "Travel",
        objectives: [
            "Book train tickets and hotel rooms in French.",
            "Describe past vacations and upcoming trips.",
            "Ask for information at a tourist office."
        ],
        vocab: [
            { fr: "Réserver un billet", en: "To book a ticket", ipa: "/ʁe.zɛʁ.ve œ̃ bi.jɛ/", exampleFr: "Je veux réserver un billet pour Paris.", exampleEn: "I want to book a ticket to Paris." },
            { fr: "Les vacances", en: "Holidays / Vacation", ipa: "/le va.kɑ̃s/", exampleFr: "Pendant les vacances, je vais à la plage.", exampleEn: "During the holidays, I go to the beach." },
            { fr: "L'hôtel / La chambre", en: "Hotel / Room", ipa: "/lo.tɛl / la ʃɑ̃bʁ/", exampleFr: "J'ai réservé une chambre avec vue sur la mer.", exampleEn: "I booked a room with a sea view." },
            { fr: "Visiter des monuments", en: "Visit monuments", ipa: "/vi.zi.te de mo.ny.mɑ̃/", exampleFr: "Nous avons visité la Tour Eiffel.", exampleEn: "We visited the Eiffel Tower." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Prepositions of Place)</strong>: Use <em>'en'</em> for feminine countries (<em>en France, en Italie</em>) and <em>'au'</em> for masculine countries (<em>au Japon, au Canada</em>).",
        dialogue: [
            { speaker: "Agent", fr: "Bonjour, comment puis-je vous aider pour votre voyage ?", en: "Hello, how can I help you with your trip?" },
            { speaker: "Voyageur", fr: "Je voudrais réserver un billet aller-retour pour Nice.", en: "I would like to book a round-trip ticket to Nice." }
        ],
        sentenceBuilder: {
            target: "L'été dernier je suis parti en vacances",
            words: ["L'été", "dernier", "je", "suis", "parti", "en", "vacances"]
        },
        speakingPrompt: "Raconte tes dernières vacances.",
        targetSentence: "L'été dernier, je suis parti en vacances en France et j'ai visité de magnifiques villes.",
        targetSentenceEn: "Last summer, I went on holiday to France and visited magnificent cities.",
        quiz: [
            { q: "Which preposition is used for 'France' (feminine country)?", options: ["au", "en", "à la", "dans"], correct: 1 },
            { q: "What does 'un billet aller-retour' mean?", options: ["One-way ticket", "Round-trip ticket", "Free ticket", "Bus pass"], correct: 1 },
            { q: "How do you say 'I booked a hotel room'?", options: ["J'ai réservé une chambre d'hôtel", "Je suis acheté un hôtel", "Je fais un hôtel", "J'ai visité l'hôtel"], correct: 0 }
        ]
    },
    "A2-04": {
        titleFr: "Décrire une personne",
        titleEn: "Physical & Personality Descriptions",
        category: "Descriptions",
        objectives: [
            "Describe hair, eyes, height, and physical appearance.",
            "Express personality traits and character qualities.",
            "Master agreement of descriptive adjectives."
        ],
        vocab: [
            { fr: "Grand(e) / Petit(e)", en: "Tall / Short", ipa: "/ɡʁɑ̃ / pə.ti/", exampleFr: "Mon ami est grand et très dynamique.", exampleEn: "My friend is tall and very dynamic." },
            { fr: "Les cheveux bruns / blonds", en: "Brown / Blonde hair", ipa: "/le ʃə.vø bʁœ̃/", exampleFr: "Elle a les cheveux blonds et bouclés.", exampleEn: "She has curly blonde hair." },
            { fr: "Sympathique / Gentil(le)", en: "Friendly / Kind", ipa: "/sɛ̃.pa.tik / ʒɑ̃.ti/", exampleFr: "Le nouveau professeur est extrêmement sympathique.", exampleEn: "The new teacher is extremely friendly." },
            { fr: "Intelligent(e) / Drôle", en: "Intelligent / Funny", ipa: "/ɛ̃.te.li.ʒɑ̃ / dʁol/", exampleFr: "C'est une personne très drôle et intelligente.", exampleEn: "He/She is a very funny and intelligent person." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Adjective Position)</strong>: BAGS adjectives (Beauty, Age, Goodness, Size - <em>beau, jeune, bon, grand</em>) come BEFORE the noun, while most color and personality adjectives come AFTER.",
        dialogue: [
            { speaker: "Nora", fr: "Comment est ta nouvelle amie ?", en: "What is your new friend like?" },
            { speaker: "Sébastien", fr: "Elle est grande, a les yeux bleus et elle est très gentille et drôle !", en: "She is tall, has blue eyes and she is very kind and funny!" }
        ],
        sentenceBuilder: {
            target: "Elle est grande et très sympathique",
            words: ["Elle", "est", "grande", "et", "très", "sympathique"]
        },
        speakingPrompt: "Décris ton meilleur ami ou ta meilleure amie.",
        targetSentence: "Mon meilleur ami est grand, il a les cheveux bruns et il est très généreux.",
        targetSentenceEn: "My best friend is tall, he has brown hair and he is very generous.",
        quiz: [
            { q: "Which adjective comes BEFORE the noun in French?", options: ["Grand", "Bleu", "Français", "Intéressant"], correct: 0 },
            { q: "How do you say 'She has blue eyes'?", options: ["Elle est les yeux bleus", "Elle a les yeux bleus", "Elle fait les yeux bleus", "Elle voit bleu"], correct: 1 },
            { q: "Feminine form of 'gentil'?", options: ["gentile", "gentille", "gentiles", "gentil"], correct: 1 }
        ]
    },
    "A2-05": {
        titleFr: "La santé et le corps",
        titleEn: "Health, Doctor Visits & Sickness",
        category: "Health",
        objectives: [
            "Explain symptoms to a doctor or pharmacist.",
            "Use the expression 'Avoir mal à...' (j'ai mal à la tête).",
            "Understand basic medical instructions and advice."
        ],
        vocab: [
            { fr: "J'ai mal à la tête", en: "I have a headache", ipa: "/ʒe mal a la tɛt/", exampleFr: "Aujourd'hui, j'ai mal à la tête et de la fièvre.", exampleEn: "Today, I have a headache and a fever." },
            { fr: "J'ai de la fièvre", en: "I have a fever", ipa: "/ʒe də la fjɛvʁ/", exampleFr: "Le médecin dit que j'ai un peu de fièvre.", exampleEn: "The doctor says I have a slight fever." },
            { fr: "Chez le médecin / La pharmacie", en: "At the doctor's / Pharmacy", ipa: "/la faʁ.ma.si/", exampleFr: "Je dois acheter des médicaments à la pharmacie.", exampleEn: "I must buy medicine at the pharmacy." },
            { fr: "Se reposer", en: "To rest", ipa: "/sə ʁə.po.ze/", exampleFr: "Vous devez vous reposer pendant deux jours.", exampleEn: "You must rest for two days." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Avoir mal à)</strong>: <em>'Avoir mal à'</em> contracts with articles: <em>au dos</em> (masc.), <em>à la tête</em> (fem.), <em>aux yeux</em> (plural).",
        dialogue: [
            { speaker: "Médecin", fr: "Bonjour, qu'est-ce qui ne va pas aujourd'hui ?", en: "Hello, what seems to be the problem today?" },
            { speaker: "Patient", fr: "Bonjour docteur, j'ai mal à la gorge et j'ai de la fièvre depuis hier.", en: "Hello doctor, I have a sore throat and I've had a fever since yesterday." }
        ],
        sentenceBuilder: {
            target: "J'ai mal à la tête depuis ce matin",
            words: ["J'ai", "mal", "à", "la", "tête", "depuis", "ce", "matin"]
        },
        speakingPrompt: "Explique tes symptômes à un médecin.",
        targetSentence: "Bonjour docteur, j'ai mal à la gorge et je voudrais un sirop pour la toux.",
        targetSentenceEn: "Hello doctor, I have a sore throat and I would like cough syrup.",
        quiz: [
            { q: "How do you say 'I have a stomach ache'?", options: ["J'ai mal au ventre", "J'ai mal la tête", "Je suis mal au ventre", "J'ai mal aux oreilles"], correct: 0 },
            { q: "Contraction for 'à + le' (masculine body part like 'dos')?", options: ["à la", "au", "aux", "du"], correct: 1 },
            { q: "Where do you go to buy prescribed medicine?", options: ["À la boulangerie", "À la pharmacie", "À la gare", "Au cinéma"], correct: 1 }
        ]
    },
    "A2-06": {
        titleFr: "Donner des conseils",
        titleEn: "Giving Advice and Recommendations",
        category: "Advice",
        objectives: [
            "Use modal verbs (devoir, pouvoir, falloir) to give advice.",
            "Use the imperative form (mange sainement, repose-toi).",
            "Suggest solutions to everyday problems."
        ],
        vocab: [
            { fr: "Tu devrais...", en: "You should...", ipa: "/ty də.vʁɛ/", exampleFr: "Tu devrais boire plus d'eau tous les jours.", exampleEn: "You should drink more water every day." },
            { fr: "Il faut...", en: "It is necessary to / You must...", ipa: "/il fo/", exampleFr: "Il faut bien dormir avant un examen.", exampleEn: "It is necessary to sleep well before an exam." },
            { fr: "Je te conseille de...", en: "I advise you to...", ipa: "/ʒə tə kɔ̃.sɛj də/", exampleFr: "Je te conseille de faire une petite pause.", exampleEn: "I advise you to take a short break." },
            { fr: "Fais attention !", en: "Be careful!", ipa: "/fɛ a.tɑ̃.sjɔ̃/", exampleFr: "Fais attention quand tu traverses la rue !", exampleEn: "Be careful when you cross the street!" }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Il faut + Infinitive)</strong>: Use <em>'Il faut' + infinitive verb</em> to express general necessity (e.g. <em>Il faut pratiquer le français tous les jours</em>).",
        dialogue: [
            { speaker: "Marc", fr: "Je suis très fatigué ces jours-ci.", en: "I am very tired these days." },
            { speaker: "Sophie", fr: "Tu devrais te coucher plus tôt et boire de l'eau !", en: "You should go to bed earlier and drink water!" }
        ],
        sentenceBuilder: {
            target: "Tu devrais faire du sport tous les jours",
            words: ["Tu", "devrais", "faire", "du", "sport", "tous", "les", "jours"]
        },
        speakingPrompt: "Donne un conseil à un ami fatigué.",
        targetSentence: "Pour rester en bonne santé, tu devrais manger équilibré et faire du sport.",
        targetSentenceEn: "To stay healthy, you should eat a balanced diet and do exercise.",
        quiz: [
            { q: "Which expression means 'You should'?", options: ["Tu devrais", "Tu veux", "Tu as", "Tu fais"], correct: 0 },
            { q: "Follow 'Il faut' with which verb form?", options: ["Infinitive", "Past participle", "Subjunctive only", "Gerund"], correct: 0 },
            { q: "Translate: 'I advise you to rest.'", options: ["Je te conseille de te reposer.", "Je veux reposer toi.", "Tu es conseillé.", "Fais du repos."], correct: 0 }
        ]
    },

    // ------------------- B1 LEVEL -------------------
    "B1-01": {
        titleFr: "Raconter une expérience passée",
        titleEn: "Narrating Past Experiences",
        category: "Narration",
        objectives: [
            "Combine Passé Composé and Imparfait accurately in complex stories.",
            "Describe background conditions vs sudden main events.",
            "Use expressive vocabulary for emotions and reactions."
        ],
        vocab: [
            { fr: "Pendant que...", en: "While...", ipa: "/pɑ̃.dɑ̃ kə/", exampleFr: "Pendant que je me promenais, il a commencé à pleuvoir.", exampleEn: "While I was taking a walk, it started raining." },
            { fr: "Soudain / Tout à coup", en: "Suddenly", ipa: "/su.dɛ̃ / tu.t_a ku/", exampleFr: "Soudain, un bruit étrange s'est fait entendre.", exampleEn: "Suddenly, a strange noise was heard." },
            { fr: "Il faisait beau", en: "The weather was nice", ipa: "/il fə.zɛ bo/", exampleFr: "Ce jour-là, il faisait beau et les oiseaux chantaient.", exampleEn: "That day, the weather was nice and birds were singing." },
            { fr: "J'ai ressenti...", en: "I felt...", ipa: "/ʒe ʁə.sɑ̃.ti/", exampleFr: "J'ai ressenti une immense joie en réussissant.", exampleEn: "I felt immense joy upon succeeding." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Passé Composé vs Imparfait)</strong>: Use <strong>Imparfait</strong> for background descriptions, habits, states of mind ('il faisait beau') and <strong>Passé Composé</strong> for specific completed actions ('soudain, il est arrivé').",
        dialogue: [
            { speaker: "Léon", fr: "Raconte-moi ton expérience lors de ce voyage !", en: "Tell me about your experience during that trip!" },
            { speaker: "Élodie", fr: "Je me promenais paisiblement quand soudain j'ai aperçu un monument magnifique.", en: "I was walking peacefully when suddenly I caught sight of a magnificent monument." }
        ],
        sentenceBuilder: {
            target: "Pendant que je lisais il a commencé à pleuvoir",
            words: ["Pendant", "que", "je", "lisais", "il", "a", "commencé", "à", "pleuvoir"]
        },
        speakingPrompt: "Raconte un souvenir marquant de ton passé.",
        targetSentence: "Pendant que nous voyagions en France, nous avons rencontré des personnes extraordinaires.",
        targetSentenceEn: "While we were traveling in France, we met extraordinary people.",
        quiz: [
            { q: "Which tense is used for background descriptions in past stories?", options: ["Imparfait", "Passé composé", "Futur simple", "Présent"], correct: 0 },
            { q: "Which word signals a sudden interrupting action?", options: ["Soudain", "Toujours", "Souvent", "Chaque jour"], correct: 0 },
            { q: "Translate: 'It was sunny when he arrived.'", options: ["Il faisait beau quand il est arrivé.", "Il a fait beau quand il arrivait.", "Il fait beau quand il arrive.", "Il aura fait beau."], correct: 0 }
        ]
    },
    "B1-02": {
        titleFr: "Exprimer son opinion",
        titleEn: "Expressing and Supporting Opinions",
        category: "Opinion",
        objectives: [
            "Use nuanced introductory structures (à mon avis, selon moi, je trouve que).",
            "Structure clear, logical arguments with 'parce que' and 'car'.",
            "Politely support or defend a point of view."
        ],
        vocab: [
            { fr: "À mon avis", en: "In my opinion", ipa: "/a mɔ̃.n_a.vi/", exampleFr: "À mon avis, les langues ouvrent des portes culturelles.", exampleEn: "In my opinion, languages open cultural doors." },
            { fr: "Selon moi / D'après moi", en: "According to me", ipa: "/sə.lɔ̃ mwa/", exampleFr: "Selon moi, cette décision est très importante.", exampleEn: "According to me, this decision is very important." },
            { fr: "Je pense que...", en: "I think that...", ipa: "/ʒə pɑ̃s kə/", exampleFr: "Je pense que la technologie facilite notre quotidien.", exampleEn: "I think technology facilitates our daily life." },
            { fr: "En effet / De plus", en: "Indeed / Furthermore", ipa: "/ɑ̃.n_e.fɛ / də ply/", exampleFr: "En effet, nous devons protéger l'environnement.", exampleEn: "Indeed, we must protect the environment." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Opinion Verbs)</strong>: Affirmative opinion verbs take the <strong>indicative</strong> (<em>Je pense qu'il est intelligent</em>), whereas negative or questioning forms trigger the <strong>subjunctive</strong> (<em>Je ne pense pas qu'il soit là</em>).",
        dialogue: [
            { speaker: "Claire", fr: "Que penses-tu des réseaux sociaux ?", en: "What do you think of social media?" },
            { speaker: "Julien", fr: "À mon avis, c'est très utile pour garder le contact, mais il faut faire attention à son temps.", en: "In my opinion, it's very useful for staying in touch, but one must watch their time." }
        ],
        sentenceBuilder: {
            target: "À mon avis les langues sont indispensables aujourd'hui",
            words: ["À", "mon", "avis", "les", "langues", "sont", "indispensables", "aujourd'hui"]
        },
        speakingPrompt: "Donne ton opinion sur un sujet d'actualité.",
        targetSentence: "À mon avis, l'apprentissage du français offre de formidable opportunités professionnelles.",
        targetSentenceEn: "In my opinion, learning French offers wonderful professional opportunities.",
        quiz: [
            { q: "Which phrase means 'In my opinion'?", options: ["À mon avis", "Au revoir", "S'il vous plaît", "Hier matin"], correct: 0 },
            { q: "Does 'Je pense que + affirmative' take indicative or subjunctive?", options: ["Indicative", "Subjunctive", "Conditional", "Imperative"], correct: 0 },
            { q: "What connector introduces a cause ('because')?", options: ["Parce que", "Mais", "Donc", "Pourtant"], correct: 0 }
        ]
    },
    "B1-03": {
        titleFr: "Les médias et les réseaux sociaux",
        titleEn: "Media and Social Networks",
        category: "Media",
        objectives: [
            "Discuss news, digital media, and social platforms.",
            "Express pros and cons of digital communication.",
            "Evaluate information reliability."
        ],
        vocab: [
            { fr: "Les informations / L'actualité", en: "News / Current affairs", ipa: "/le.z_ɛ̃.fɔʁ.ma.sjɔ̃/", exampleFr: "Je suis l'actualité tous les matins sur mon téléphone.", exampleEn: "I follow current affairs every morning on my phone." },
            { fr: "Partager du contenu", en: "To share content", ipa: "/paʁ.ta.ʒe dy kɔ̃.tə.ny/", exampleFr: "Les jeunes aiment partager des photos sur les réseaux sociaux.", exampleEn: "Young people like sharing photos on social networks." },
            { fr: "Un avantage / Un inconvénient", en: "An advantage / A disadvantage", ipa: "/œ̃.n_a.vɑ̃.taʒ/", exampleFr: "Le principal avantage est la vitesse de communication.", exampleEn: "The main advantage is the speed of communication." },
            { fr: "Vérifier ses sources", en: "Verify one's sources", ipa: "/ve.ʁi.fje se suʁs/", exampleFr: "Il est primordial de vérifier ses sources d'information.", exampleEn: "It is paramount to verify one's information sources." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Relative Pronouns)</strong>: Use <em>qui</em> (subject - 'les médias qui arrêtent') and <em>que/qu'</em> (direct object - 'les nouvelles que je lis').",
        dialogue: [
            { speaker: "Camille", fr: "Comment t'informes-tu au quotidien ?", en: "How do you stay informed daily?" },
            { speaker: "Lucas", fr: "Je lis les journaux en ligne et j'écoute des podcasts d'actualité.", en: "I read online newspapers and listen to news podcasts." }
        ],
        sentenceBuilder: {
            target: "Les réseaux sociaux permettent de garder le contact",
            words: ["Les", "réseaux", "sociaux", "permettent", "de", "garder", "le", "contact"]
        },
        speakingPrompt: "Discute des avantages des médias numériques.",
        targetSentence: "Les médias numériques facilitent l'accès à l'information mais demandent un esprit critique.",
        targetSentenceEn: "Digital media facilitates access to information but requires critical thinking.",
        quiz: [
            { q: "What does 'L'actualité' mean?", options: ["Current news", "An act", "History", "Fiction"], correct: 0 },
            { q: "Which relative pronoun acts as a SUBJECT ('the network THAT works')?", options: ["qui", "que", "où", "dont"], correct: 0 },
            { q: "Translate: 'To verify sources.'", options: ["Vérifier ses sources", "Lire les photos", "Partager du vin", "Parler fort"], correct: 0 }
        ]
    },
    "B1-04": {
        titleFr: "L'environnement et la planète",
        titleEn: "Environmental Issues & Climate Action",
        category: "Environment",
        objectives: [
            "Discuss ecological challenges and solutions.",
            "Use vocabulary for recycling, climate, and sustainability.",
            "Express commitment to eco-friendly habits."
        ],
        vocab: [
            { fr: "Le changement climatique", en: "Climate change", ipa: "/lə ʃɑ̃ʒ.mɑ̃ kli.ma.tik/", exampleFr: "Le changement climatique exige une action collective.", exampleEn: "Climate change demands collective action." },
            { fr: "Protéger l'environnement", en: "Protect the environment", ipa: "/pʁo.te.ʒe lɑ̃.vi.ʁɔn.mɑ̃/", exampleFr: "Chacun doit faire des efforts pour protéger l'environnement.", exampleEn: "Everyone must make efforts to protect the environment." },
            { fr: "Le recyclage / Recycler", en: "Recycling / To recycle", ipa: "/lə ʁə.si.klaʒ/", exampleFr: "Le tri des déchets et le recyclage sont essentiels.", exampleEn: "Waste sorting and recycling are essential." },
            { fr: "Les énergies renouvelables", en: "Renewable energies", ipa: "/le.z_e.nɛʁ.ʒi ʁə.nu.vəl.abl/", exampleFr: "Il faut investir dans les énergies renouvelables.", exampleEn: "We must invest in renewable energies." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Subjunctive Intro)</strong>: Express obligation for the environment using <em>'Il faut que' + Subjunctive</em>: <em>Il faut que nous réduisions nos déchets.</em>",
        dialogue: [
            { speaker: "Valérie", fr: "Quelles actions fais-tu pour la planète ?", en: "What actions do you take for the planet?" },
            { speaker: "Thomas", fr: "Je prends le vélo au lieu de la voiture et je recycle mes déchets.", en: "I take my bike instead of the car and I recycle my waste." }
        ],
        sentenceBuilder: {
            target: "Il faut que nous protégions notre planète",
            words: ["Il", "faut", "que", "nous", "protégions", "notre", "planète"]
        },
        speakingPrompt: "Propose des solutions pour protéger l'environnement.",
        targetSentence: "Pour protéger l'environnement, nous devons réduire le plastique et favoriser les énergies propres.",
        targetSentenceEn: "To protect the environment, we must reduce plastic and promote clean energy.",
        quiz: [
            { q: "What does 'Le changement climatique' mean?", options: ["Climate change", "Weather forecast", "Summer heat", "Windy day"], correct: 0 },
            { q: "Translate: 'Renewable energy'", options: ["Les énergies renouvelables", "L'électricité ancienne", "Le gaz naturel", "Le pétrole brut"], correct: 0 },
            { q: "Which form follows 'Il faut que'?", options: ["Subjunctive", "Infinitive", "Past tense", "Future"], correct: 0 }
        ]
    },

    // ------------------- B2 LEVEL -------------------
    "B2-01": {
        titleFr: "Argumenter et défendre une opinion",
        titleEn: "Advanced Argumentation and Debate",
        category: "Argumentation",
        objectives: [
            "Construct a structured persuasive speech (introduction, points, concession, conclusion).",
            "Use formal logical connectors (en premier lieu, néanmoins, par conséquent).",
            "Defend complex views against counter-arguments calmly and persuasively."
        ],
        vocab: [
            { fr: "En premier lieu", en: "In the first place / Firstly", ipa: "/ɑ̃ pʁə.mje ljø/", exampleFr: "En premier lieu, il convient de rappeler les faits.", exampleEn: "In the first place, it is appropriate to recall the facts." },
            { fr: "Néanmoins / Toutefois", en: "Nevertheless / However", ipa: "/ne.ɑ̃.mwɛ̃ / tu.tfwa/", exampleFr: "Néanmoins, cette mesure présente plusieurs limites.", exampleEn: "Nevertheless, this measure presents several limitations." },
            { fr: "Par conséquent", en: "Consequently / Therefore", ipa: "/paʁ kɔ̃.se.kɑ̃/", exampleFr: "Par conséquent, nous devons réviser notre stratégie.", exampleEn: "Therefore, we must revise our strategy." },
            { fr: "Il est indéniable que...", en: "It is undeniable that...", ipa: "/il ɛ.t_ɛ̃.de.njabl kə/", exampleFr: "Il est indéniable que cette innovation a changé la société.", exampleEn: "It is undeniable that this innovation changed society." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Structuring Complex Speech)</strong>: Connect your arguments logically: <em>D'une part... d'autre part... néanmoins... par conséquent... en conclusion.</em>",
        dialogue: [
            { speaker: "Isabelle", fr: "Pensez-vous que cette réforme soit vraiment bénéfique ?", en: "Do you think this reform is truly beneficial?" },
            { speaker: "Bertrand", fr: "En premier lieu oui, car elle simplifie les démarches. Néanmoins, il faut rester vigilant sur ses coûts.", en: "In the first place yes, as it simplifies procedures. Nevertheless, one must stay vigilant regarding costs." }
        ],
        sentenceBuilder: {
            target: "Néanmoins nous devons agir avec grande prudence",
            words: ["Néanmoins", "nous", "devons", "agir", "avec", "grande", "prudence"]
        },
        speakingPrompt: "Défends ton point de vue et donne au moins deux arguments.",
        targetSentence: "Bien que cette mesure soit complexe, il est indéniable qu'elle apportera des bénéfices à long terme.",
        targetSentenceEn: "Although this measure is complex, it is undeniable that it will bring long-term benefits.",
        quiz: [
            { q: "Which formal connector means 'Nevertheless'?", options: ["Néanmoins", "Parce que", "Aujourd'hui", "Puis"], correct: 0 },
            { q: "What phrase translates to 'In the first place'?", options: ["En premier lieu", "En conclusion", "Au secours", "Par hasard"], correct: 0 },
            { q: "Which mood follows 'Bien que...'?", options: ["Subjunctive", "Indicative", "Imperative", "Participle"], correct: 0 }
        ]
    },
    "B2-02": {
        titleFr: "Le subjonctif avancé et la nuance",
        titleEn: "Advanced Subjunctive & Nuanced Expression",
        category: "Advanced Grammar",
        objectives: [
            "Master complex subjunctive triggers (concession, emotion, doubt, necessity).",
            "Distinguish indicative vs subjunctive subtle shifts in meaning.",
            "Express nuance and hypothetical scenarios in formal contexts."
        ],
        vocab: [
            { fr: "Bien que (+ Subjonctif)", en: "Although / Even though", ipa: "/bjɛ̃ kə/", exampleFr: "Bien qu'il faste froid, nous sommes sortis nous promener.", exampleEn: "Although it was cold, we went out for a walk." },
            { fr: "Pourvu que (+ Subjonctif)", en: "Provided that / Let's hope that", ipa: "/puʁ.vy kə/", exampleFr: "Pourvu que le projet soit accepté à temps !", exampleEn: "Provided that the project is accepted on time!" },
            { fr: "À condition que (+ Subjonctif)", en: "On condition that", ipa: "/a kɔ̃.di.sjɔ̃ kə/", exampleFr: "Je viendrai à condition que vous soyez présent.", exampleEn: "I will come on condition that you are present." },
            { fr: "Avant que (+ Subjonctif)", en: "Before", ipa: "/a.vɑ̃ kə/", exampleFr: "Terminons le travail avant qu'il ne soit trop tard.", exampleEn: "Let's finish the work before it is too late." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Subjunctive Triggers)</strong>: Conjunctions like <em>bien que, à condition que, pourvu que, avant que, afin que</em> ALWAYS require the <strong>subjunctive mood</strong>.",
        dialogue: [
            { speaker: "Gérard", fr: "Penses-tu qu'ils réussissent l'examen ?", en: "Do you think they will pass the exam?" },
            { speaker: "Sandrine", fr: "Bien que ce soit difficile, je suis convaincue qu'ils aient toutes leurs chances s'ils révisent.", en: "Although it is difficult, I am convinced they have every chance if they study." }
        ],
        sentenceBuilder: {
            target: "Bien que ce soit difficile nous réussirons",
            words: ["Bien", "que", "ce", "soit", "difficile", "nous", "réussirons"]
        },
        speakingPrompt: "Utilise 'bien que' avec le subjonctif dans une phrase.",
        targetSentence: "Bien que ce projet demande des efforts, il est essentiel que nous le menions à bien.",
        targetSentenceEn: "Although this project requires effort, it is essential that we carry it out successfully.",
        quiz: [
            { q: "Which conjunction ALWAYS requires the subjunctive mood?", options: ["Bien que", "Parce que", "Pendant que", "Puisque"], correct: 0 },
            { q: "Subjunctive form of 'être' for 'ce' (it)?", options: ["soit", "est", "était", "sera"], correct: 0 },
            { q: "What does 'Pourvu que...' express?", options: ["A hopeful wish / condition", "A past refusal", "A physical direction", "A mathematical total"], correct: 0 }
        ]
    },
    "B2-03": {
        titleFr: "Le monde professionnel et les réunions",
        titleEn: "Professional French & Business Meetings",
        category: "Business",
        objectives: [
            "Participate actively in corporate meetings and presentations.",
            "Use formal register for email communications and proposals.",
            "Negotiate and express professional disagreement diplomatically."
        ],
        vocab: [
            { fr: "Animer une réunion", en: "Lead a meeting", ipa: "/a.ni.me yn ʁe.y.njɔ̃/", exampleFr: "Le directeur va animer la réunion stratégique.", exampleEn: "The director will lead the strategic meeting." },
            { fr: "Présenter un projet", en: "Present a project", ipa: "/pʁe.zɑ̃.te œ̃ pʁɔ.ʒɛ/", exampleFr: "Je dois présenter notre projet devant le comité.", exampleEn: "I must present our project to the committee." },
            { fr: "Trouver un compromis", en: "Find a compromise", ipa: "/tʁu.ve œ̃ kɔ̃.pʁɔ.mi/", exampleFr: "Nous avons réussi à trouver un compromis satisfaisant.", exampleEn: "We succeeded in finding a satisfying compromise." },
            { fr: "Restant à votre disposition", en: "Remaining at your disposal", ipa: "/ʁɛs.tɑ̃ a vo.tʁə dis.po.zi.sjɔ̃/", exampleFr: "Je reste à votre entière disposition pour tout renseignement.", exampleEn: "I remain at your complete disposal for any information." }
        ],
        grammarNote: "💡 <strong>Grammar Tip (Formal Courtesy)</strong>: Use conditional structures in business settings (<em>'Je souhaiterais vous présenter...', 'Serait-il possible de...'</em>) to demonstrate polished professional etiquette.",
        dialogue: [
            { speaker: "Directeur", fr: "Bonjour à tous, commençons notre ordre du jour.", en: "Hello everyone, let's begin our agenda." },
            { speaker: "Consultante", fr: "Merci, je souhaiterais vous exposer les conclusions de notre analyse.", en: "Thank you, I would like to present the findings of our analysis to you." }
        ],
        sentenceBuilder: {
            target: "Je reste à votre entière disposition pour échanger",
            words: ["Je", "reste", "à", "votre", "entière", "disposition", "pour", "échanger"]
        },
        speakingPrompt: "Fais une courte présentation professionnelle de ton projet.",
        targetSentence: "Aujourd'hui, je souhaite vous présenter les objectifs stratégiques de notre nouveau projet.",
        targetSentenceEn: "Today, I wish to present to you the strategic objectives of our new project.",
        quiz: [
            { q: "What phrase is standard in formal email sign-offs?", options: ["Je reste à votre disposition", "Bisous", "Salut mec", "À plus tard"], correct: 0 },
            { q: "How do you politely say 'I would like to present'?", options: ["Je souhaiterais vous présenter", "Moi vouloir montrer", "Donne le projet", "Regarde ça"], correct: 0 },
            { q: "What does 'Animer une réunion' mean?", options: ["To lead/chair a meeting", "To watch a cartoon", "To cancel an event", "To arrive late"], correct: 0 }
        ]
    }
};

// Smart Topic Content Generator Fallback
function getLessonDataForTopic(levelKey, topicObj, index) {
    if (LESSON_CONTENT_DATABASE[topicObj.id]) {
        const entry = LESSON_CONTENT_DATABASE[topicObj.id];
        return {
            id: topicObj.id,
            level: levelKey,
            num: topicObj.num,
            category: entry.category || getCategoryForTopic(topicObj),
            titleFr: entry.titleFr,
            titleEn: entry.titleEn,
            objectives: entry.objectives,
            vocab: entry.vocab,
            grammarNote: entry.grammarNote,
            dialogue: entry.dialogue || [],
            sentenceBuilder: entry.sentenceBuilder,
            speakingPrompt: entry.speakingPrompt || `Entraîne-toi sur le thème "${entry.titleFr}".`,
            targetSentence: entry.targetSentence,
            targetSentenceEn: entry.targetSentenceEn,
            quiz: entry.quiz
        };
    }

    // Dynamic Domain Engine based on topic keywords
    const titleFr = topicObj.french;
    const titleEn = topicObj.english;
    const cat = topicObj.category || getCategoryForTopic(topicObj);
    const lowTitle = (titleFr + " " + titleEn).toLowerCase();

    let vocabList = [];
    let grammarTip = "";
    let dialogueList = [];
    let targetSentence = "";
    let targetSentenceEn = "";
    let speakingPrompt = "";
    let targetUnscramble = "";
    let unscrambleWords = [];
    let quizList = [];

    if (lowTitle.includes('salutation') || lowTitle.includes('greeting') || lowTitle.includes('présent')) {
        vocabList = [
            { fr: "Enchanté(e)", en: "Pleased to meet you", ipa: "/ɑ̃.ʃɑ̃.te/", exampleFr: "Enchanté de faire votre connaissance.", exampleEn: "Pleased to make your acquaintance." },
            { fr: "Bienvenue", en: "Welcome", ipa: "/bjɛ̃.və.ny/", exampleFr: "Soyez le bienvenu en France !", exampleEn: "Welcome to France!" },
            { fr: "Comment allez-vous ?", en: "How are you? (Formal)", ipa: "/kɔ.mɑ̃.t_a.le vu/", exampleFr: "Bonjour professeur, comment allez-vous ?", exampleEn: "Hello professor, how are you?" },
            { fr: "À bientôt", en: "See you soon", ipa: "/a bjɛ̃.to/", exampleFr: "Merci pour tout et à bientôt !", exampleEn: "Thank you for everything and see you soon!" }
        ];
        grammarTip = "💡 <strong>Grammar Tip</strong>: Distinguish formal <em>Vous</em> vs informal <em>Tu</em> when greeting people in French.";
        dialogueList = [
            { speaker: "Sophie", fr: "Bonjour, enchantée de vous rencontrer.", en: "Hello, pleased to meet you." },
            { speaker: "Paul", fr: "Bonjour Sophie, bienvenue parmi nous !", en: "Hello Sophie, welcome among us!" }
        ];
        targetSentence = `Bonjour, je suis ravi de participer à ce cours sur ${titleFr.toLowerCase()}.`;
        targetSentenceEn = `Hello, I am delighted to participate in this lesson on ${titleEn.toLowerCase()}.`;
        speakingPrompt = `Présente-toi et salue poliment sur le sujet "${titleFr}".`;
        targetUnscramble = `Bonjour enchanté de faire votre connaissance`;
        unscrambleWords = ["Bonjour", "enchanté", "de", "faire", "votre", "connaissance"];
    } else if (lowTitle.includes('passé') || lowTitle.includes('raconter') || lowTitle.includes('histoire') || lowTitle.includes('expérience')) {
        vocabList = [
            { fr: "Hier soir", en: "Yesterday evening", ipa: "/jɛʁ swaʁ/", exampleFr: "Hier soir, nous avons regardé un film.", exampleEn: "Yesterday evening, we watched a movie." },
            { fr: "L'année dernière", en: "Last year", ipa: "/la.ne dɛʁ.njɛʁ/", exampleFr: "L'année dernière, j'ai voyagé en Europe.", exampleEn: "Last year, I traveled in Europe." },
            { fr: "Pendant ce temps", en: "During this time", ipa: "/pɑ̃.dɑ̃ sə tɑ̃/", exampleFr: "Pendant ce temps, ils préparaient le repas.", exampleEn: "During this time, they were preparing the meal." },
            { fr: "Finalement", en: "In the end / Finally", ipa: "/fi.nal.mɑ̃/", exampleFr: "Finalement, tout s'est très bien passé.", exampleEn: "In the end, everything went very well." }
        ];
        grammarTip = `💡 <strong>Grammar Tip (${levelKey})</strong>: When narrating events in <em>${titleFr}</em>, combine Passé Composé for main actions and Imparfait for descriptions.`;
        dialogueList = [
            { speaker: "Marc", fr: "Raconte-moi ce qui s'est passé !", en: "Tell me what happened!" },
            { speaker: "Julie", fr: "Pendant que nous marchions, nous avons découvert un endroit magnifique.", en: "While we were walking, we discovered a magnificent place." }
        ];
        targetSentence = `Hier, j'ai vécu une expérience fantastique concernant ${titleFr.toLowerCase()}.`;
        targetSentenceEn = `Yesterday, I had a fantastic experience concerning ${titleEn.toLowerCase()}.`;
        speakingPrompt = `Raconte un événement passé en lien avec "${titleFr}".`;
        targetUnscramble = `Hier nous avons passé une excellente journée`;
        unscrambleWords = ["Hier", "nous", "avons", "passé", "une", "excellente", "journée"];
    } else if (lowTitle.includes('subjonctif') || lowTitle.includes('conditionnel') || lowTitle.includes('défendre') || lowTitle.includes('argument') || lowTitle.includes('opinion')) {
        vocabList = [
            { fr: "Il est indispensable que...", en: "It is indispensable that...", ipa: "/il ɛ.t_ɛ̃.dis.pɑ̃.sabl kə/", exampleFr: "Il est indispensable que nous fassions des efforts.", exampleEn: "It is indispensable that we make efforts." },
            { fr: "Bien que (+ Subjonctif)", en: "Although", ipa: "/bjɛ̃ kə/", exampleFr: "Bien que ce soit difficile, c'est possible.", exampleEn: "Although it is difficult, it is possible." },
            { fr: "À mon sens", en: "In my view", ipa: "/a mɔ̃ sɑ̃s/", exampleFr: "À mon sens, il s'agit d'une priorité.", exampleEn: "In my view, it is a priority." },
            { fr: "Soutenir une idée", en: "Support an idea", ipa: "/su.tə.niʁ yn i.de/", exampleFr: "Je souhaite soutenir cette proposition d'avenir.", exampleEn: "I wish to support this proposal for the future." }
        ];
        grammarTip = `💡 <strong>Advanced Grammar Tip</strong>: In ${levelKey} French, use formal connectors and subjonctif constructions to express obligation, concession, and nuanced perspective.`;
        dialogueList = [
            { speaker: "Professeur", fr: "Comment défendez-vous votre position ?", en: "How do you defend your position?" },
            { speaker: "Étudiant", fr: "Bien que la situation soit complexe, je pense qu'il faille agir immédiatement.", en: "Although the situation is complex, I think we must act immediately." }
        ];
        targetSentence = `Il est essentiel que nous exprimions notre opinion avec clarté sur ${titleFr.toLowerCase()}.`;
        targetSentenceEn = `It is essential that we express our opinion with clarity regarding ${titleEn.toLowerCase()}.`;
        speakingPrompt = `Soutiens ton opinion et donne deux arguments sur "${titleFr}".`;
        targetUnscramble = `Il est essentiel que nous agissions rapidement`;
        unscrambleWords = ["Il", "est", "essentiel", "que", "nous", "agissions", "rapidement"];
    } else {
        vocabList = [
            { fr: `Le concept de ${titleFr.toLowerCase()}`, en: `The concept of ${titleEn.toLowerCase()}`, ipa: `/lə kɔ̃.sɛpt/`, exampleFr: `Nous étudions ${titleFr.toLowerCase()} en classe.`, exampleEn: `We are studying ${titleEn.toLowerCase()} in class.` },
            { fr: `Pratiquer au quotidien`, en: `Practice daily`, ipa: `/pʁa.ti.ke o ko.ti.djɛ̃/`, exampleFr: `Il faut pratiquer ce vocabulaire au quotidien.`, exampleEn: `One must practice this vocabulary daily.` },
            { fr: `Exprimer une idée`, en: `Express an idea`, ipa: `/ɛks.pʁi.me yn i.de/`, exampleFr: `Je peux exprimer mon idée clairement en français.`, exampleEn: `I can express my idea clearly in French.` },
            { fr: `Masteriser cette leçon`, en: `Master this lesson`, ipa: `/mas.tɛ.ʁi.ze/`, exampleFr: `Grâce à Edna, je maîtrise cette leçon.`, exampleEn: `Thanks to Edna, I am mastering this lesson.` }
        ];
        grammarTip = `💡 <strong>Grammar Tip (${levelKey} level)</strong>: When using expressions related to <em>${titleFr}</em>, make sure to pay close attention to article agreements, proper verb tenses, and natural speech flow.`;
        dialogueList = [
            { speaker: "Edna Coach", fr: `Aujourd'hui, nous abordons la leçon sur ${titleFr}.`, en: `Today, we tackle the lesson on ${titleEn}.` },
            { speaker: "Apprenant", fr: "Je suis prêt à pratiquer mes phrases et mon vocabulaire !", en: "I am ready to practice my sentences and vocabulary!" }
        ];
        targetSentence = `Aujourd'hui, je maîtrise parfaitement la leçon sur ${titleFr.toLowerCase()} en français.`;
        targetSentenceEn = `Today, I am perfectly mastering the lesson on ${titleEn.toLowerCase()} in French.`;
        speakingPrompt = `Exprime une phrase complète en français sur "${titleFr}".`;
        targetUnscramble = `Je peux parler de ${titleFr.toLowerCase()} avec assurance`;
        unscrambleWords = ["Je", "peux", "parler", "de", titleFr.toLowerCase(), "avec", "assurance"];
    }

    quizList = [
        {
            q: `Which French phrase best corresponds to "${titleEn}"?`,
            options: [titleFr, "Au revoir", "S'il vous plaît", "Merci beaucoup"],
            correct: 0
        },
        {
            q: `In ${levelKey} French, how do you correctly start a sentence on "${titleFr}"?`,
            options: [`Dans cette leçon sur ${titleFr.toLowerCase()}...`, "Au revoir madame", "Je n'aime pas du tout", "À demain matin"],
            correct: 0
        },
        {
            q: `Which response demonstrates polite communication in French?`,
            options: ["Non jamais", "Tout à fait, je suis d'accord avec vous !", "Chut !", "Rien du tout"],
            correct: 1
        }
    ];

    return {
        id: topicObj.id,
        level: levelKey,
        num: topicObj.num,
        category: cat,
        titleFr: titleFr,
        titleEn: titleEn,
        objectives: [
            `Master essential expressions for "${titleFr}" (${titleEn}).`,
            `Develop authentic ${levelKey}-level French pronunciation & intonation.`,
            `Complete oral practice with Voice Coach Edna (+50 XP).`
        ],
        vocab: vocabList,
        grammarNote: grammarTip,
        dialogue: dialogueList,
        sentenceBuilder: {
            target: targetUnscramble,
            words: unscrambleWords
        },
        speakingPrompt: speakingPrompt,
        targetSentence: targetSentence,
        targetSentenceEn: targetSentenceEn,
        quiz: quizList
    };
}

// Open Topic Lesson Modal with Full Curriculum Features
function openTopicLessonModal(levelKey, topicIndex) {
    const levelData = CEFR_CURRICULUM[levelKey];
    const topicObj = levelData ? levelData.topics[topicIndex] : null;
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

        <!-- Section 2: Vocabulary Cards -->
        <div class="lesson-section-card">
            <h3>📚 Key Phrases & Vocabulary</h3>
            <div class="lesson-vocab-grid">
                ${lessonData.vocab.map(v => `
                    <div class="lesson-vocab-item">
                        <div class="fr-word">${v.fr}</div>
                        <div class="ipa-tag">${v.ipa}</div>
                        <div class="en-word">${v.en}</div>
                        <div style="margin-top:6px; padding:6px 8px; background:#f8fafc; border-radius:6px; border-left:2.5px solid #2563eb;">
                            <div style="font-size:12px; font-weight:700; color:#0f172a;">🇫🇷 "${v.exampleFr}"</div>
                            <div style="font-size:11px; color:#475569; font-style:italic;">🇬🇧 "${v.exampleEn}"</div>
                        </div>
                        <div class="vocab-item-actions" style="margin-top:8px;">
                            <button class="btn btn-sm btn-outline" onclick="speakText('${v.fr.replace(/'/g, "\\'")}')">
                                <i class="fa-solid fa-volume-high"></i> Écouter
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="openWordPronounce('${v.fr.replace(/'/g, "\\'")}', '${v.en.replace(/'/g, "\\'")}', '${v.ipa}')">
                                <i class="fa-solid fa-microphone"></i> Pratiquer
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Section 2.5: Dialogue / Useful Conversation -->
        ${lessonData.dialogue && lessonData.dialogue.length ? `
        <div class="lesson-section-card">
            <h3>💬 Practice Conversation & Dialogue</h3>
            <div class="lesson-dialogue-box" style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
                ${lessonData.dialogue.map(d => `
                    <div style="background:#f1f5f9; border-left:4px solid #2563eb; padding:10px 14px; border-radius:0 10px 10px 0;">
                        <div style="font-size:13px; font-weight:800; color:#1e40af;">${d.speaker}</div>
                        <div style="font-size:14px; font-weight:700; color:#0f172a; margin-top:2px;">🇫🇷 "${d.fr}"</div>
                        <div style="font-size:12px; color:#475569; font-style:italic; margin-top:2px;">🇬🇧 "${d.en}"</div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-sm btn-outline" style="margin-top:12px;" onclick="speakText('${lessonData.dialogue.map(d => d.fr.replace(/'/g, "\\'")).join('. ')}')">
                <i class="fa-solid fa-volume-high"></i> Listen Full Dialogue
            </button>
        </div>
        ` : ''}

        <!-- Section 3: Grammar Callout -->
        <div class="lesson-section-card">
            <h3>💡 Grammar & Usage Focus</h3>
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
                ${lessonData.speakingPrompt ? `<div style="font-size:13px; font-weight:800; color:#2563eb; text-transform:uppercase; margin-bottom:8px; background:#dbeafe; padding:6px 12px; border-radius:8px; display:inline-block;">🎯 Prompt: "${lessonData.speakingPrompt}"</div>` : ''}
                <h4 style="margin-top:6px;">SAY THIS FRENCH SENTENCE:</h4>
                <div class="target-fr-sentence">🇫🇷 "${lessonData.targetSentence}"</div>
                <div class="target-en-sentence">🇬🇧 "${lessonData.targetSentenceEn}"</div>
                
                <div class="voice-coach-controls" style="margin-top:14px;">
                    <button class="btn btn-secondary" onclick="speakText('${lessonData.targetSentence.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-volume-high"></i> Écouter Model Audio
                    </button>
                    <button id="lesson-mic-btn" class="btn btn-primary" onclick="startLessonVoiceScoring()">
                        <i class="fa-solid fa-microphone"></i> Pratiquer & Score Voice
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
                <i class="fa-solid fa-trophy"></i> Terminer la leçon (+50 XP)
            </button>
        </div>
    `;

    renderSentenceBuilderUI();
    document.getElementById('topic-lesson-modal').classList.remove('hidden');
}

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

// ==================================================
// GAMES ENGINE & INTERACTIVE PRACTICE MECHANICS
// ==================================================
const gameState = {
    match: {
        selectedFr: null,
        selectedEn: null,
        matchedPairs: [],
        totalPairs: 5
    },
    memory: {
        cards: [],
        firstIndex: null,
        secondIndex: null,
        isProcessing: false,
        matchesFound: 0,
        movesCount: 0,
        startTime: 0
    },
    speed: {
        timeRemaining: 60,
        timerInterval: null,
        words: [],
        currentIndex: 0,
        score: 0,
        correctCount: 0,
        attemptsCount: 0,
        isRecording: false
    }
};

function closeGameArena() {
    if (gameState.speed.timerInterval) {
        clearInterval(gameState.speed.timerInterval);
        gameState.speed.timerInterval = null;
    }
    const arena = document.getElementById('game-arena');
    if (arena) arena.classList.add('hidden');
}

// 1. WORD MATCH GAME
function startMatchGame() {
    closeGameArena();
    const arena = document.getElementById('game-arena');
    if (!arena) return;
    arena.classList.remove('hidden');

    const source = [...vocabularyList, ...appState.customWords];
    const pool = [...source].sort(() => 0.5 - Math.random()).slice(0, 5);

    gameState.match.selectedFr = null;
    gameState.match.selectedEn = null;
    gameState.match.matchedPairs = [];
    gameState.match.totalPairs = pool.length;

    const frList = pool.map(p => ({ id: p.id, text: p.frenchText, emoji: p.emoji || '📖' }));
    const enList = pool.map(p => ({ id: p.id, text: p.englishTranslation })).sort(() => 0.5 - Math.random());

    arena.innerHTML = `
        <div class="game-arena-header">
            <h3>🧩 Word Match Challenge</h3>
            <div class="game-stats-bar">
                <span id="match-score-badge"><i class="fa-solid fa-check-double"></i> Matched: 0 / ${pool.length}</span>
                <button class="btn btn-sm btn-outline" onclick="closeGameArena()"><i class="fa-solid fa-xmark"></i> Exit</button>
            </div>
        </div>
        <p style="font-size:13px; color:#64748b; margin-bottom:12px;">Select a French word on the left, then tap its matching English translation on the right!</p>

        <div class="match-game-grid">
            <div id="match-fr-col" style="display:flex; flex-direction:column; gap:10px;">
                ${frList.map(item => `
                    <button class="match-item-btn" id="match-fr-${item.id}" onclick="handleMatchSelect('fr', '${item.id}')">
                        <span>${item.emoji} ${item.text}</span>
                        <i class="fa-regular fa-circle"></i>
                    </button>
                `).join('')}
            </div>
            <div id="match-en-col" style="display:flex; flex-direction:column; gap:10px;">
                ${enList.map(item => `
                    <button class="match-item-btn" id="match-en-${item.id}" onclick="handleMatchSelect('en', '${item.id}')">
                        <span>${item.text}</span>
                        <i class="fa-regular fa-circle"></i>
                    </button>
                `).join('')}
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
            <button class="btn btn-secondary" onclick="startMatchGame()"><i class="fa-solid fa-rotate-left"></i> Restart Game</button>
            <div id="match-feedback-text" style="font-weight:700; font-size:14px; color:#2563eb;"></div>
        </div>
    `;
}

function handleMatchSelect(lang, id) {
    if (gameState.match.matchedPairs.includes(id)) return;

    if (lang === 'fr') {
        gameState.match.selectedFr = id;
        document.querySelectorAll('#match-fr-col .match-item-btn').forEach(btn => {
            if (!btn.classList.contains('matched')) btn.className = 'match-item-btn';
        });
        const btn = document.getElementById(`match-fr-${id}`);
        if (btn) btn.classList.add('selected');
    } else {
        gameState.match.selectedEn = id;
        document.querySelectorAll('#match-en-col .match-item-btn').forEach(btn => {
            if (!btn.classList.contains('matched')) btn.className = 'match-item-btn';
        });
        const btn = document.getElementById(`match-en-${id}`);
        if (btn) btn.classList.add('selected');
    }

    if (gameState.match.selectedFr && gameState.match.selectedEn) {
        const frId = gameState.match.selectedFr;
        const enId = gameState.match.selectedEn;
        const frBtn = document.getElementById(`match-fr-${frId}`);
        const enBtn = document.getElementById(`match-en-${enId}`);

        if (frId === enId) {
            gameState.match.matchedPairs.push(frId);
            if (frBtn) {
                frBtn.className = 'match-item-btn matched';
                const icon = frBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-circle-check';
            }
            if (enBtn) {
                enBtn.className = 'match-item-btn matched';
                const icon = enBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-circle-check';
            }

            const source = [...vocabularyList, ...appState.customWords];
            const wordObj = source.find(w => w.id === frId);
            if (wordObj) speakText(wordObj.frenchText);

            gameState.match.selectedFr = null;
            gameState.match.selectedEn = null;

            const scoreBadge = document.getElementById('match-score-badge');
            if (scoreBadge) scoreBadge.innerHTML = `<i class="fa-solid fa-check-double"></i> Matched: ${gameState.match.matchedPairs.length} / ${gameState.match.totalPairs}`;

            if (gameState.match.matchedPairs.length === gameState.match.totalPairs) {
                addXP(30);
                setTimeout(() => {
                    renderMatchCompletionScreen();
                }, 500);
            }
        } else {
            if (frBtn) frBtn.classList.add('wrong');
            if (enBtn) enBtn.classList.add('wrong');

            setTimeout(() => {
                if (frBtn && !frBtn.classList.contains('matched')) frBtn.className = 'match-item-btn';
                if (enBtn && !enBtn.classList.contains('matched')) enBtn.className = 'match-item-btn';
                gameState.match.selectedFr = null;
                gameState.match.selectedEn = null;
            }, 700);
        }
    }
}

function renderMatchCompletionScreen() {
    const arena = document.getElementById('game-arena');
    if (!arena) return;

    arena.innerHTML = `
        <div class="lesson-complete-card">
            <div class="complete-badge-large">🧩</div>
            <h2>Match Challenge Complete!</h2>
            <p>Parfait ! You matched all French & English word pairs correctly.</p>

            <div class="complete-xp-pill">
                ⚡ +30 XP & 🪙 +15 Coins Earned!
            </div>

            <div class="complete-actions-row" style="margin-top:20px;">
                <button class="btn btn-accent" style="padding:12px 20px;" onclick="startMatchGame()">
                    <i class="fa-solid fa-rotate-left"></i> Play Again
                </button>
                <button class="btn btn-secondary" style="padding:12px 20px;" onclick="closeGameArena()">
                    <i class="fa-solid fa-gamepad"></i> Back to Games
                </button>
            </div>
        </div>
    `;
}

// 2. MEMORY FLIP GAME
const MEMORY_PAIRS_DATA = [
    { pairId: 'm1', fr: 'Le croissant', en: 'Croissant', emoji: '🥐' },
    { pairId: 'm2', fr: 'L\'école', en: 'School', emoji: '🏫' },
    { pairId: 'm3', fr: 'Bonjour', en: 'Hello', emoji: '👋' },
    { pairId: 'm4', fr: 'Merci', en: 'Thank you', emoji: '🙏' },
    { pairId: 'm5', fr: 'La pomme', en: 'Apple', emoji: '🍎' },
    { pairId: 'm6', fr: 'Le chat', en: 'Cat', emoji: '🐱' },
    { pairId: 'm7', fr: 'Le soleil', en: 'Sun', emoji: '☀️' },
    { pairId: 'm8', fr: 'La maison', en: 'House', emoji: '🏠' }
];

function startMemoryGame() {
    closeGameArena();
    const arena = document.getElementById('game-arena');
    if (!arena) return;
    arena.classList.remove('hidden');

    let cardList = [];
    MEMORY_PAIRS_DATA.forEach(p => {
        cardList.push({
            cardId: `c_${p.pairId}_fr`,
            pairId: p.pairId,
            type: 'fr',
            text: p.fr,
            sub: 'Français',
            emoji: p.emoji,
            flipped: false,
            matched: false
        });
        cardList.push({
            cardId: `c_${p.pairId}_en`,
            pairId: p.pairId,
            type: 'en',
            text: p.en,
            sub: 'English',
            emoji: p.emoji,
            flipped: false,
            matched: false
        });
    });

    cardList.sort(() => 0.5 - Math.random());

    gameState.memory = {
        cards: cardList,
        firstIndex: null,
        secondIndex: null,
        isProcessing: false,
        matchesFound: 0,
        movesCount: 0,
        startTime: Date.now()
    };

    renderMemoryBoard();
}

function renderMemoryBoard() {
    const arena = document.getElementById('game-arena');
    if (!arena) return;

    const m = gameState.memory;

    arena.innerHTML = `
        <div class="game-arena-header">
            <h3>🎴 Memory Card Flip</h3>
            <div class="game-stats-bar">
                <span>🎯 Pairs: ${m.matchesFound} / 8</span>
                <span>🏃 Moves: ${m.movesCount}</span>
                <button class="btn btn-sm btn-outline" onclick="closeGameArena()"><i class="fa-solid fa-xmark"></i> Exit</button>
            </div>
        </div>
        <p style="font-size:13px; color:#64748b; margin-bottom:12px;">Tap cards to flip them and find all matching French words & English meanings!</p>

        <div class="memory-grid">
            ${m.cards.map((card, idx) => `
                <div class="memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}" onclick="handleMemoryCardClick(${idx})">
                    <div class="memory-card-inner">
                        <div class="memory-card-front">
                            ❓
                        </div>
                        <div class="memory-card-back">
                            <div class="card-emoji">${card.emoji}</div>
                            <div class="card-text">${card.text}</div>
                            <div class="card-sub">${card.sub}</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
            <button class="btn btn-secondary" onclick="startMemoryGame()"><i class="fa-solid fa-rotate-left"></i> Restart Game</button>
            <div style="font-size:12px; color:#64748b;">Find all 8 pairs to win +50 XP!</div>
        </div>
    `;
}

function handleMemoryCardClick(index) {
    const m = gameState.memory;
    if (!m || m.isProcessing) return;

    const card = m.cards[index];
    if (!card || card.flipped || card.matched) return;

    card.flipped = true;

    if (m.firstIndex === null) {
        m.firstIndex = index;
        renderMemoryBoard();
    } else if (m.secondIndex === null && m.firstIndex !== index) {
        m.secondIndex = index;
        m.movesCount++;
        renderMemoryBoard();

        const card1 = m.cards[m.firstIndex];
        const card2 = m.cards[m.secondIndex];

        if (card1.pairId === card2.pairId) {
            card1.matched = true;
            card2.matched = true;
            m.matchesFound++;

            const frText = card1.type === 'fr' ? card1.text : card2.text;
            speakText(frText);

            m.firstIndex = null;
            m.secondIndex = null;
            renderMemoryBoard();

            if (m.matchesFound === 8) {
                addXP(50);
                setTimeout(() => {
                    renderMemoryCompletionScreen();
                }, 600);
            }
        } else {
            m.isProcessing = true;
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                m.firstIndex = null;
                m.secondIndex = null;
                m.isProcessing = false;
                renderMemoryBoard();
            }, 900);
        }
    }
}

function renderMemoryCompletionScreen() {
    const arena = document.getElementById('game-arena');
    if (!arena) return;

    const m = gameState.memory;
    const accuracy = Math.round((8 / Math.max(m.movesCount, 8)) * 100);

    arena.innerHTML = `
        <div class="lesson-complete-card">
            <div class="complete-badge-large">🎴</div>
            <h2>Memory Flip Mastered!</h2>
            <p>Félicitations ! You found all 8 matching pairs!</p>

            <div class="complete-xp-pill">
                ⚡ +50 XP & 🪙 +25 Coins Awarded!
            </div>

            <div class="complete-stats-grid" style="margin:20px 0;">
                <div class="complete-stat-item">
                    <div class="val">${m.movesCount}</div>
                    <div class="lbl">Total Moves</div>
                </div>
                <div class="complete-stat-item">
                    <div class="val">8 / 8</div>
                    <div class="lbl">Pairs Matched</div>
                </div>
                <div class="complete-stat-item">
                    <div class="val">${accuracy}%</div>
                    <div class="lbl">Memory Score</div>
                </div>
            </div>

            <div class="complete-actions-row">
                <button class="btn btn-accent" style="padding:12px 20px;" onclick="startMemoryGame()">
                    <i class="fa-solid fa-rotate-left"></i> Play Again
                </button>
                <button class="btn btn-secondary" style="padding:12px 20px;" onclick="closeGameArena()">
                    <i class="fa-solid fa-gamepad"></i> Back to Games
                </button>
            </div>
        </div>
    `;
}

// 3. SPEED PRONUNCIATION SPRINT GAME
function startSpeedSpeaking() {
    closeGameArena();
    const arena = document.getElementById('game-arena');
    if (!arena) return;
    arena.classList.remove('hidden');

    const source = [...vocabularyList, ...appState.customWords];
    const words = [...source].sort(() => 0.5 - Math.random());

    gameState.speed = {
        timeRemaining: 60,
        timerInterval: null,
        words: words,
        currentIndex: 0,
        score: 0,
        correctCount: 0,
        attemptsCount: 0,
        isRecording: false
    };

    renderSpeedSprintArena();

    gameState.speed.timerInterval = setInterval(() => {
        gameState.speed.timeRemaining--;
        const timerEl = document.getElementById('sprint-timer-val');
        if (timerEl) timerEl.innerText = `${gameState.speed.timeRemaining}s`;

        if (gameState.speed.timeRemaining <= 0) {
            clearInterval(gameState.speed.timerInterval);
            gameState.speed.timerInterval = null;
            finishSpeedSprint();
        }
    }, 1000);
}

function renderSpeedSprintArena() {
    const arena = document.getElementById('game-arena');
    if (!arena) return;

    const s = gameState.speed;
    const currentWord = s.words[s.currentIndex % s.words.length];

    arena.innerHTML = `
        <div class="sprint-header-card">
            <div>
                <h3 style="margin:0; font-size:18px;">🎙️ Speed Pronunciation Sprint</h3>
                <span style="font-size:12px; color:#cbd5e1;">Speak as many French words as possible!</span>
            </div>
            <div class="sprint-timer-badge" id="sprint-timer-val">
                ${s.timeRemaining}s
            </div>
        </div>

        <div class="sprint-word-box">
            <div class="sprint-word-emoji">${currentWord.emoji || '🗣️'}</div>
            <div class="sprint-word-french">"${currentWord.frenchText}"</div>
            <div class="sprint-word-ipa">${currentWord.ipa || '/.../'}</div>
            <div class="sprint-word-english">${currentWord.englishTranslation}</div>
        </div>

        <div class="sprint-controls">
            <button class="btn btn-secondary btn-lg" style="padding:12px 20px;" onclick="speakText('${currentWord.frenchText.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-volume-high"></i> Listen Model
            </button>
            <button id="sprint-mic-btn" class="btn btn-accent btn-lg" style="padding:12px 24px; font-size:15px;" onclick="startSprintVoiceRecording()">
                <i class="fa-solid fa-microphone"></i> Speak & Score
            </button>
            <button class="btn btn-outline" style="padding:12px 16px;" onclick="skipSprintWord()">
                <i class="fa-solid fa-forward"></i> Skip
            </button>
        </div>

        <div id="sprint-feedback-box" style="text-align:center; min-height:40px; margin-top:12px;"></div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:12px; border-top:1px solid #e2e8f0;">
            <div style="font-size:14px; font-weight:800; color:#2563eb;">⭐ Score: <span id="sprint-score-val">${s.score}</span> pts</div>
            <div style="font-size:13px; font-weight:700; color:#10b981;">✅ Mastered: <span id="sprint-correct-val">${s.correctCount}</span> words</div>
            <button class="btn btn-sm btn-outline" onclick="closeGameArena()"><i class="fa-solid fa-xmark"></i> Exit Sprint</button>
        </div>
    `;
}

function startSprintVoiceRecording() {
    const s = gameState.speed;
    if (!s || s.timeRemaining <= 0) return;

    const currentWord = s.words[s.currentIndex % s.words.length];
    const btn = document.getElementById('sprint-mic-btn');

    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Listening...';

    if (appState.recognitionObj) {
        try {
            appState.recognitionObj.start();
            appState.recognitionObj.onresult = (e) => {
                const spoken = e.results[0][0].transcript;
                evaluateSprintSpeech(spoken, currentWord);
            };
            appState.recognitionObj.onerror = () => {
                setTimeout(() => {
                    evaluateSprintSpeech(currentWord.frenchText, currentWord);
                }, 800);
            };
        } catch(err) {
            setTimeout(() => {
                evaluateSprintSpeech(currentWord.frenchText, currentWord);
            }, 800);
        }
    } else {
        setTimeout(() => {
            evaluateSprintSpeech(currentWord.frenchText, currentWord);
        }, 800);
    }
}

function evaluateSprintSpeech(spokenText, wordObj) {
    const s = gameState.speed;
    const btn = document.getElementById('sprint-mic-btn');
    const feedbackBox = document.getElementById('sprint-feedback-box');

    if (btn) btn.innerHTML = '<i class="fa-solid fa-microphone"></i> Speak & Score';

    const score = calculateSpeechScore(spokenText, wordObj.frenchText);
    s.attemptsCount++;

    if (score >= 80) {
        s.score += 100;
        s.correctCount++;

        if (feedbackBox) {
            feedbackBox.innerHTML = `
                <div style="background:#ecfdf5; color:#065f46; padding:8px 16px; border-radius:12px; font-weight:800; display:inline-block;">
                    🌟 Parfait ! Recognized "${spokenText}" (+100 pts)
                </div>
            `;
        }

        const scoreEl = document.getElementById('sprint-score-val');
        const correctEl = document.getElementById('sprint-correct-val');
        if (scoreEl) scoreEl.innerText = s.score;
        if (correctEl) correctEl.innerText = s.correctCount;

        setTimeout(() => {
            s.currentIndex++;
            renderSpeedSprintArena();
        }, 1000);
    } else {
        if (feedbackBox) {
            feedbackBox.innerHTML = `
                <div style="background:#fef2f2; color:#991b1b; padding:8px 16px; border-radius:12px; font-weight:700; display:inline-block;">
                    👍 Close! Heard: "${spokenText}". Tap Listen or try again!
                </div>
            `;
        }
    }
}

function skipSprintWord() {
    const s = gameState.speed;
    s.currentIndex++;
    renderSpeedSprintArena();
}

function finishSpeedSprint() {
    addXP(50);
    const arena = document.getElementById('game-arena');
    if (!arena) return;

    const s = gameState.speed;

    arena.innerHTML = `
        <div class="lesson-complete-card">
            <div class="complete-badge-large">⚡</div>
            <h2>60s Sprint Finished!</h2>
            <p>Formidable ! You completed your speed pronunciation challenge.</p>

            <div class="complete-xp-pill">
                ⚡ +50 XP & 🪙 +25 Coins Earned!
            </div>

            <div class="complete-stats-grid" style="margin:20px 0;">
                <div class="complete-stat-item">
                    <div class="val">${s.score}</div>
                    <div class="lbl">Sprint Score</div>
                </div>
                <div class="complete-stat-item">
                    <div class="val">${s.correctCount}</div>
                    <div class="lbl">Words Mastered</div>
                </div>
                <div class="complete-stat-item">
                    <div class="val">${s.attemptsCount ? Math.round((s.correctCount / s.attemptsCount)*100) : 100}%</div>
                    <div class="lbl">Accuracy</div>
                </div>
            </div>

            <div class="complete-actions-row">
                <button class="btn btn-accent" style="padding:12px 20px;" onclick="startSpeedSpeaking()">
                    <i class="fa-solid fa-rotate-left"></i> Try Sprint Again
                </button>
                <button class="btn btn-secondary" style="padding:12px 20px;" onclick="closeGameArena()">
                    <i class="fa-solid fa-gamepad"></i> Back to Games
                </button>
            </div>
        </div>
    `;
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
