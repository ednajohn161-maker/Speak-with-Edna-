package com.example.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.model.CefrLevel
import com.example.data.model.ChatMessage
import com.example.data.model.Lesson
import com.example.data.model.LessonCategory
import com.example.data.model.PronunciationResult
import com.example.data.model.RolePlayScenario
import com.example.data.model.UserRole
import com.example.data.model.VocabularyItem
import com.example.data.repository.AppRepository
import com.example.util.TextToSpeechHelper
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(application: Application) : AndroidViewModel(application) {
    val repository = AppRepository(application)
    val tts = TextToSpeechHelper(application)

    private val _currentRole = MutableStateFlow(UserRole.STUDENT)
    val currentRole: StateFlow<UserRole> = _currentRole.asStateFlow()

    private val _selectedLevel = MutableStateFlow(CefrLevel.A1)
    val selectedLevel: StateFlow<CefrLevel> = _selectedLevel.asStateFlow()

    private val _selectedCategory = MutableStateFlow<LessonCategory?>(null)
    val selectedCategory: StateFlow<LessonCategory?> = _selectedCategory.asStateFlow()

    private val _selectedLesson = MutableStateFlow<Lesson?>(null)
    val selectedLesson: StateFlow<Lesson?> = _selectedLesson.asStateFlow()

    // AI Voice Coach State
    private val _activeScenario = MutableStateFlow<RolePlayScenario?>(null)
    val activeScenario: StateFlow<RolePlayScenario?> = _activeScenario.asStateFlow()

    private val _chatMessages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val chatMessages: StateFlow<List<ChatMessage>> = _chatMessages.asStateFlow()

    private val _isRecording = MutableStateFlow(false)
    val isRecording: StateFlow<Boolean> = _isRecording.asStateFlow()

    private val _pronunciationResult = MutableStateFlow<PronunciationResult?>(null)
    val pronunciationResult: StateFlow<PronunciationResult?> = _pronunciationResult.asStateFlow()

    private val _isEvaluating = MutableStateFlow(false)
    val isEvaluating: StateFlow<Boolean> = _isEvaluating.asStateFlow()

    val userProgress = repository.userProgress.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = null
    )

    val completedLessons = repository.completedLessons.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5000),
        initialValue = emptyList()
    )

    fun switchRole(role: UserRole) {
        _currentRole.value = role
        viewModelScope.launch {
            repository.updateRole(role)
        }
    }

    fun selectLevel(level: CefrLevel) {
        _selectedLevel.value = level
    }

    fun selectCategory(category: LessonCategory?) {
        _selectedCategory.value = category
    }

    fun selectLesson(lesson: Lesson?) {
        _selectedLesson.value = lesson
    }

    fun playFrenchText(text: String) {
        tts.speakFrench(text)
    }

    // AI Voice Coach & Role Play Functions
    fun startRolePlay(scenario: RolePlayScenario) {
        _activeScenario.value = scenario
        val greeting = ChatMessage(
            id = "init_0",
            sender = "Edna",
            frenchText = "Bonjour! Bienvenue à la conversation '${scenario.frenchTitle}'. Je suis Edna!",
            englishTranslation = "(Hello! Welcome to '${scenario.title}' conversation. I am Edna!)",
            isUser = false
        )
        _chatMessages.value = listOf(greeting)
        tts.speakFrench("Bonjour! Bienvenue!")
    }

    fun sendUserMessage(text: String) {
        if (text.isBlank()) return
        val userMsg = ChatMessage(
            id = "usr_${System.currentTimeMillis()}",
            sender = "Student",
            frenchText = text,
            englishTranslation = "(Your speech in French)",
            isUser = true
        )
        _chatMessages.value = _chatMessages.value + userMsg

        val scenario = _activeScenario.value ?: return
        viewModelScope.launch {
            val reply = repository.gemini.getConversationReply(scenario, _chatMessages.value, text)
            _chatMessages.value = _chatMessages.value + reply
            tts.speakFrench(reply.frenchText)
        }
    }

    fun testPronunciation(spokenText: String, targetItem: VocabularyItem) {
        _isEvaluating.value = true
        viewModelScope.launch {
            val result = repository.gemini.evaluatePronunciation(
                spokenText = spokenText,
                targetPhrase = targetItem.frenchText,
                targetIpa = targetItem.ipa
            )
            _pronunciationResult.value = result
            _isEvaluating.value = false
            if (result.score >= 80) {
                repository.addXpAndCoins(15, 5)
            }
        }
    }

    fun clearPronunciationResult() {
        _pronunciationResult.value = null
    }

    fun completeLesson(lessonId: String, score: Int) {
        viewModelScope.launch {
            repository.markLessonCompleted(lessonId, score)
        }
    }

    override fun onCleared() {
        super.onCleared()
        tts.shutdown()
    }
}
