package com.example.data.model

enum class UserRole(val displayName: String) {
    STUDENT("Student"),
    TEACHER("Teacher"),
    PARENT("Parent"),
    ADMIN("Admin")
}

enum class CefrLevel(val code: String, val title: String, val description: String) {
    A1("A1", "Beginner", "Foundational French words, simple greetings, alphabet & core vocabulary"),
    A2("A2", "Elementary", "Everyday expressions, shopping, dining out & basic role-play dialogues"),
    B1("B1", "Intermediate", "Fluent conversations, complex grammar, debate & real-world scenarios")
}

enum class LessonCategory(val title: String, val emoji: String) {
    ALPHABET("Alphabet", "🔤"),
    NUMBERS("Numbers", "🔢"),
    COLORS("Colors", "🎨"),
    ANIMALS("Animals", "🦁"),
    FOOD("Food & Drinks", "🥐"),
    FAMILY("Family", "👨‍👩‍👧‍👦"),
    SCHOOL("School & Classroom", "📚"),
    BODY("Body Parts", "👁️"),
    CLOTHING("Clothing", "👕"),
    GREETINGS("Greetings", "👋"),
    EXPRESSIONS("Common Expressions", "💬")
}

data class VocabularyItem(
    val id: String,
    val frenchText: String,
    val englishTranslation: String,
    val ipa: String,
    val category: LessonCategory,
    val level: CefrLevel,
    val emoji: String,
    val exampleFrench: String,
    val exampleEnglish: String
)

data class Lesson(
    val id: String,
    val title: String,
    val description: String,
    val level: CefrLevel,
    val category: LessonCategory,
    val vocabList: List<VocabularyItem>,
    val grammarTitle: String,
    val grammarExplanation: String,
    val dialogueFrench: String,
    val dialogueEnglish: String
)

data class RolePlayScenario(
    val id: String,
    val title: String,
    val frenchTitle: String,
    val iconEmoji: String,
    val category: String,
    val systemPrompt: String,
    val samplePhrases: List<String>
)

data class PronunciationResult(
    val score: Int, // 0-100
    val recognizedText: String,
    val targetText: String,
    val ipaTarget: String,
    val feedbackMessage: String,
    val mistakeHighlight: String,
    val tipForImprovement: String
)

data class ChatMessage(
    val id: String,
    val sender: String, // "Edna" or "Student"
    val frenchText: String,
    val englishTranslation: String,
    val isUser: Boolean,
    val audioScore: Int? = null,
    val ipa: String? = null
)

data class BadgeItem(
    val id: String,
    val title: String,
    val description: String,
    val iconEmoji: String,
    val isUnlocked: Boolean = false,
    val unlockedDate: String? = null
)

data class LeaderboardUser(
    val rank: Int,
    val name: String,
    val avatarEmoji: String,
    val xp: Int,
    val streak: Int,
    val isCurrentUser: Boolean = false
)
