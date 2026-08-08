package com.example.data.model

object CurriculumData {

    val allVocabulary: List<VocabularyItem> = listOf(
        // Alphabet & Sounds
        VocabularyItem("v1", "Bonjour", "Hello / Good day", "/bɔ̃.ʒuʁ/", LessonCategory.GREETINGS, CefrLevel.A1, "👋", "Bonjour, comment vas-tu?", "Hello, how are you?"),
        VocabularyItem("v2", "Merci", "Thank you", "/mɛʁ.si/", LessonCategory.GREETINGS, CefrLevel.A1, "🙏", "Merci beaucoup!", "Thank you very much!"),
        VocabularyItem("v3", "Au revoir", "Goodbye", "/o ʁə.vwaʁ/", LessonCategory.GREETINGS, CefrLevel.A1, "🙋", "Au revoir, à demain!", "Goodbye, see you tomorrow!"),
        VocabularyItem("v4", "S'il vous plaît", "Please", "/sil vu plɛ/", LessonCategory.GREETINGS, CefrLevel.A1, "✨", "Un café, s'il vous plaît.", "A coffee, please."),
        
        // Numbers
        VocabularyItem("v5", "Un", "One", "/œ̃/", LessonCategory.NUMBERS, CefrLevel.A1, "1️⃣", "J'ai un chat.", "I have one cat."),
        VocabularyItem("v6", "Deux", "Two", "/dø/", LessonCategory.NUMBERS, CefrLevel.A1, "2️⃣", "Deux pommes rouges.", "Two red apples."),
        VocabularyItem("v7", "Trois", "Three", "/tʁwa/", LessonCategory.NUMBERS, CefrLevel.A1, "3️⃣", "Trois amis jouant.", "Three friends playing."),
        VocabularyItem("v8", "Quatre", "Four", "/katʁ/", LessonCategory.NUMBERS, CefrLevel.A1, "4️⃣", "Quatre saisons dans l'année.", "Four seasons in the year."),
        VocabularyItem("v9", "Cinq", "Five", "/sɛ̃k/", LessonCategory.NUMBERS, CefrLevel.A1, "5️⃣", "Donne-moi cinq minutes.", "Give me five minutes."),
        VocabularyItem("v10", "Dix", "Ten", "/dis/", LessonCategory.NUMBERS, CefrLevel.A1, "🔟", "Dix étoiles brillantes.", "Ten bright stars."),

        // Colors
        VocabularyItem("v11", "Rouge", "Red", "/ʁuʒ/", LessonCategory.COLORS, CefrLevel.A1, "🔴", "La voiture est rouge.", "The car is red."),
        VocabularyItem("v12", "Bleu", "Blue", "/blø/", LessonCategory.COLORS, CefrLevel.A1, "🔵", "Le ciel est bleu.", "The sky is blue."),
        VocabularyItem("v13", "Jaune", "Yellow", "/ʒon/", LessonCategory.COLORS, CefrLevel.A1, "🟡", "Le soleil est jaune.", "The sun is yellow."),
        VocabularyItem("v14", "Vert", "Green", "/vɛʁ/", LessonCategory.COLORS, CefrLevel.A1, "🟢", "L'herbe est verte.", "The grass is green."),
        VocabularyItem("v15", "Blanc", "White", "/blɑ̃/", LessonCategory.COLORS, CefrLevel.A1, "⚪", "La neige est blanche.", "The snow is white."),

        // Animals
        VocabularyItem("v16", "Le chat", "The cat", "/lə ʃa/", LessonCategory.ANIMALS, CefrLevel.A1, "🐱", "Le chat dort sur le lit.", "The cat sleeps on the bed."),
        VocabularyItem("v17", "Le chien", "The dog", "/lə ʃjɛ̃/", LessonCategory.ANIMALS, CefrLevel.A1, "🐶", "Le chien court vite.", "The dog runs fast."),
        VocabularyItem("v18", "L'oiseau", "The bird", "/lwa.zo/", LessonCategory.ANIMALS, CefrLevel.A1, "🐦", "L'oiseau chante une chanson.", "The bird sings a song."),
        VocabularyItem("v19", "Le lion", "The lion", "/lə ljɔ̃/", LessonCategory.ANIMALS, CefrLevel.A2, "🦁", "Le lion est le roi de la jungle.", "The lion is king of the jungle."),
        VocabularyItem("v20", "Le dauphin", "The dolphin", "/lə do.fɛ̃/", LessonCategory.ANIMALS, CefrLevel.A2, "🐬", "Le dauphin saute haut.", "The dolphin jumps high."),

        // Food & Drinks
        VocabularyItem("v21", "Le croissant", "The croissant", "/lə kʁwa.sɑ̃/", LessonCategory.FOOD, CefrLevel.A1, "🥐", "J'aime manger un croissant frais.", "I like eating a fresh croissant."),
        VocabularyItem("v22", "La pomme", "The apple", "/la pɔm/", LessonCategory.FOOD, CefrLevel.A1, "🍎", "Une pomme rouge et sucrée.", "A sweet red apple."),
        VocabularyItem("v23", "Le fromage", "The cheese", "/lə fʁɔ.maʒ/", LessonCategory.FOOD, CefrLevel.A2, "🧀", "Le fromage français est délicieux.", "French cheese is delicious."),
        VocabularyItem("v24", "L'eau", "Water", "/lo/", LessonCategory.FOOD, CefrLevel.A1, "💧", "De l'eau fraîche, s'il vous plaît.", "Fresh water, please."),
        VocabularyItem("v25", "Le chocolat", "Chocolate", "/lə ʃɔ.kɔ.la/", LessonCategory.FOOD, CefrLevel.A1, "🍫", "Du chocolat chaud pour le petit-déjeuner.", "Hot chocolate for breakfast."),

        // Family
        VocabularyItem("v26", "La mère", "The mother", "/la mɛʁ/", LessonCategory.FAMILY, CefrLevel.A1, "👩", "Ma mère est très gentille.", "My mother is very kind."),
        VocabularyItem("v27", "Le père", "The father", "/lə pɛʁ/", LessonCategory.FAMILY, CefrLevel.A1, "👨", "Mon père cuisine bien.", "My father cooks well."),
        VocabularyItem("v28", "La sœur", "The sister", "/la sœʁ/", LessonCategory.FAMILY, CefrLevel.A1, "👧", "Ma sœur aime lire des livres.", "My sister likes reading books."),
        VocabularyItem("v29", "Le frère", "The brother", "/lə fʁɛʁ/", LessonCategory.FAMILY, CefrLevel.A1, "👦", "Mon frère joue au football.", "My brother plays football."),

        // School
        VocabularyItem("v30", "Le livre", "The book", "/lə livʁ/", LessonCategory.SCHOOL, CefrLevel.A1, "📖", "Ouvre ton livre à la page 10.", "Open your book to page 10."),
        VocabularyItem("v31", "Le stylo", "The pen", "/lə sti.lo/", LessonCategory.SCHOOL, CefrLevel.A1, "🖊️", "J'ai un stylo bleu.", "I have a blue pen."),
        VocabularyItem("v32", "L'école", "The school", "/le.kɔl/", LessonCategory.SCHOOL, CefrLevel.A1, "🏫", "L'école commence à huit heures.", "School starts at eight o'clock."),
        
        // Body
        VocabularyItem("v33", "La tête", "The head", "/la tɛt/", LessonCategory.BODY, CefrLevel.A1, "🗣️", "Tourne la tête à droite.", "Turn your head to the right."),
        VocabularyItem("v34", "La main", "The hand", "/la mɛ̃/", LessonCategory.BODY, CefrLevel.A1, "🤚", "Lave tes mains avant de manger.", "Wash your hands before eating."),

        // B1 Expressions & Travel
        VocabularyItem("v35", "Où se trouve l'hôtel?", "Where is the hotel?", "/u sə tʁuv lo.tɛl/", LessonCategory.EXPRESSIONS, CefrLevel.B1, "🏨", "Pardon monsieur, où se trouve l'hôtel?", "Excuse me sir, where is the hotel?"),
        VocabularyItem("v36", "Puis-je commander?", "Can I order?", "/pɥi ʒə kɔ.mɑ̃.de/", LessonCategory.FOOD, CefrLevel.B1, "🍽️", "Bonjour, puis-je commander le menu du jour?", "Hello, can I order the daily menu?")
    )

    val lessonsList: List<Lesson> = listOf(
        Lesson(
            id = "lesson_a1_greetings",
            title = "First French Greetings",
            description = "Master how to say hello, thank you, and introduction phrases in Paris!",
            level = CefrLevel.A1,
            category = LessonCategory.GREETINGS,
            vocabList = allVocabulary.filter { it.category == LessonCategory.GREETINGS },
            grammarTitle = "Subject Pronouns (Je, Tu, Vous)",
            grammarExplanation = "In French, use 'Je' for I, 'Tu' for informal you (friends & kids), and 'Vous' for polite formal you or plural!",
            dialogueFrench = "Edna: Bonjour! Comment tu t'appelles?\nÉlève: Bonjour Edna! Je m'appelle Léo.\nEdna: Enchantée Léo!",
            dialogueEnglish = "Edna: Hello! What is your name?\nStudent: Hello Edna! My name is Léo.\nEdna: Nice to meet you Léo!"
        ),
        Lesson(
            id = "lesson_a1_numbers",
            title = "Counting 1 to 10 with Edna",
            description = "Fun number games, counting stars, and pronouncing un, deux, trois!",
            level = CefrLevel.A1,
            category = LessonCategory.NUMBERS,
            vocabList = allVocabulary.filter { it.category == LessonCategory.NUMBERS },
            grammarTitle = "Plural Nouns S ending",
            grammarExplanation = "Add 's' to most French words when there are multiple items! (e.g. un chat -> deux chats)",
            dialogueFrench = "Edna: Combien de pommes as-tu?\nÉlève: J'ai trois pommes rouges!\nEdna: Bravo! C'est parfait.",
            dialogueEnglish = "Edna: How many apples do you have?\nStudent: I have three red apples!\nEdna: Bravo! That's perfect."
        ),
        Lesson(
            id = "lesson_a1_colors",
            title = "Rainbow Colors in French",
            description = "Explore red, blue, yellow, and green colors around the classroom.",
            level = CefrLevel.A1,
            category = LessonCategory.COLORS,
            vocabList = allVocabulary.filter { it.category == LessonCategory.COLORS },
            grammarTitle = "Adjective Agreement with Gender",
            grammarExplanation = "Feminine nouns turn colors feminine! Example: le livre bleu (m) vs la voiture bleue (f).",
            dialogueFrench = "Edna: Quelle est ta couleur préférée?\nÉlève: Ma couleur préférée est le bleu!\nEdna: C'est la couleur du ciel!",
            dialogueEnglish = "Edna: What is your favorite color?\nStudent: My favorite color is blue!\nEdna: It's the color of the sky!"
        ),
        Lesson(
            id = "lesson_a2_animals",
            title = "Jungle & Farm Animal Safari",
            description = "Discover animals, pet names, and describe their sounds in French.",
            level = CefrLevel.A2,
            category = LessonCategory.ANIMALS,
            vocabList = allVocabulary.filter { it.category == LessonCategory.ANIMALS },
            grammarTitle = "Definite Articles (Le, La, Les)",
            grammarExplanation = "'Le' is masculine, 'La' is feminine, and 'Les' is plural. For vowels use 'L''!",
            dialogueFrench = "Edna: As-tu un animal à la maison?\nÉlève: Oui, j'ai un petit chien et un chat.\nEdna: Super! Comment ils s'appellent?",
            dialogueEnglish = "Edna: Do you have a pet at home?\nStudent: Yes, I have a small dog and a cat.\nEdna: Great! What are their names?"
        ),
        Lesson(
            id = "lesson_b1_restaurant",
            title = "Ordering at a Parisian Café",
            description = "Practice authentic dialogues, polite requests, menu ordering, and payment.",
            level = CefrLevel.B1,
            category = LessonCategory.FOOD,
            vocabList = allVocabulary.filter { it.level == CefrLevel.B1 || it.category == LessonCategory.FOOD },
            grammarTitle = "Polite Conditional (Je voudrais)",
            grammarExplanation = "Instead of 'Je veux' (I want), politely say 'Je voudrais...' (I would like...).",
            dialogueFrench = "Serveur: Bonjour monsieur, vous désirez?\nClient: Bonjour, je voudrais un croissant et un chocolat chaud, s'il vous plaît.\nServeur: Très bien, tout de suite!",
            dialogueEnglish = "Waiter: Hello sir, what would you like?\nCustomer: Hello, I would like a croissant and a hot chocolate, please.\nWaiter: Very well, right away!"
        )
    )

    val rolePlayScenarios: List<RolePlayScenario> = listOf(
        RolePlayScenario(
            id = "school",
            title = "At School & Classroom",
            frenchTitle = "À l'École",
            iconEmoji = "🏫",
            category = "School",
            systemPrompt = "You are Monsieur Pierre, a friendly French school teacher welcoming a new student. Keep sentences short, clear, encouraging, suitable for children, with English translation in brackets.",
            samplePhrases = listOf(
                "Bonjour Monsieur, où est ma classe?",
                "J'ai oublié mon livre de français.",
                "Puis-je tailler mon crayon, s'il vous plaît?"
            )
        ),
        RolePlayScenario(
            id = "restaurant",
            title = "Parisian Bakery & Bistro",
            frenchTitle = "Au Restaurant / La Boulangerie",
            iconEmoji = "🥐",
            category = "Food",
            systemPrompt = "You are Madame Claire, a cheerful baker in Paris. Ask the student what delicious French pastries they would like to buy today.",
            samplePhrases = listOf(
                "Bonjour! Je voudrais deux croissants s'il vous plaît.",
                "Combien coûte cette tarte aux pommes?",
                "C'est délicieux, merci beaucoup!"
            )
        ),
        RolePlayScenario(
            id = "doctor",
            title = "At the Doctor's Clinic",
            frenchTitle = "Chez le Médecin",
            iconEmoji = "🩺",
            category = "Health",
            systemPrompt = "You are Dr. Henri, a warm doctor in Paris. Ask the child how they are feeling today and where it hurts.",
            samplePhrases = listOf(
                "Bonjour Docteur, j'ai mal à la tête.",
                "J'ai un peu de fièvre aujourd'hui.",
                "Merci pour les conseils, au revoir!"
            )
        ),
        RolePlayScenario(
            id = "hotel",
            title = "Hotel Check-In",
            frenchTitle = "À l'Hôtel",
            iconEmoji = "🏨",
            category = "Travel",
            systemPrompt = "You are the receptionist at Hotel Eiffel in Paris. Help the guest with their reservation and key.",
            samplePhrases = listOf(
                "Bonjour, j'ai une réservation pour deux nuits.",
                "À quelle heure est le petit-déjeuner?",
                "Où se trouve l'ascenseur, s'il vous plaît?"
            )
        ),
        RolePlayScenario(
            id = "friends",
            title = "Park Playdate with Friends",
            frenchTitle = "Au Parc avec des Amis",
            iconEmoji = "🛝",
            category = "Social",
            systemPrompt = "You are Camille, a friendly French child at the Luxembourg Gardens. Invite the user to play games or sail toy boats.",
            samplePhrases = listOf(
                "Salut! Tu veux jouer au ballon avec moi?",
                "Regarde ce joli oiseau sur l'arbre!",
                "On va prendre une glace au chocolat?"
            )
        ),
        RolePlayScenario(
            id = "interview",
            title = "Junior Voice Star Contest",
            frenchTitle = "Le Concours de Voix",
            iconEmoji = "🎙️",
            category = "Speaking",
            systemPrompt = "You are Coach Edna hosting the French Voice Star show! Ask the student questions about their hobbies and favorite foods in French.",
            samplePhrases = listOf(
                "Je m'appelle Léo et j'adore chanter en français!",
                "J'apprends le français tous les jours avec Edna.",
                "Mon plat préféré est les crêpes au chocolat!"
            )
        )
    )

    val defaultBadges: List<BadgeItem> = listOf(
        BadgeItem("b1", "Bonjour Pioneer", "Completed your very first French lesson!", "🐣", true, "2026-08-01"),
        BadgeItem("b2", "Voice Star 100", "Scored 100% on a pronunciation challenge!", "🌟", true, "2026-08-03"),
        BadgeItem("b3", "7-Day Streak Hero", "Practiced French 7 days in a row!", "🔥", true, "2026-08-07"),
        BadgeItem("b4", "Vocab Master 50", "Learned over 50 French words!", "📖", false),
        BadgeItem("b5", "Café Ordering Pro", "Completed the Restaurant Role-Play scenario!", "🥐", false),
        BadgeItem("b6", "A1 Certificate", "Passed the CEFR A1 Final Assessment!", "🎓", false)
    )

    val defaultLeaderboard: List<LeaderboardUser> = listOf(
        LeaderboardUser(1, "Sophie M.", "👧", 1450, 14),
        LeaderboardUser(2, "Lucas B.", "👦", 1320, 10),
        LeaderboardUser(3, "You (Student)", "🦉", 980, 7, isCurrentUser = true),
        LeaderboardUser(4, "Camille R.", "🎨", 890, 5),
        LeaderboardUser(5, "Antoine G.", "⚽", 760, 4)
    )
}
