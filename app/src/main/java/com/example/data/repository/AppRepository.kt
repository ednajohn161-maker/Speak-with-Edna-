package com.example.data.repository

import android.content.Context
import com.example.data.local.AppDatabase
import com.example.data.local.LessonProgressEntity
import com.example.data.local.UserProgressEntity
import com.example.data.model.CurriculumData
import com.example.data.model.Lesson
import com.example.data.model.UserRole
import com.example.data.model.VocabularyItem
import com.example.data.remote.GeminiRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class AppRepository(context: Context) {
    private val db = AppDatabase.getInstance(context)
    private val dao = db.progressDao()
    val gemini = GeminiRepository()

    val userProgress: Flow<UserProgressEntity> = dao.getUserProgress().map {
        it ?: UserProgressEntity()
    }

    val completedLessons: Flow<List<LessonProgressEntity>> = dao.getCompletedLessons()

    suspend fun updateRole(role: UserRole) {
        val current = dao.getUserProgress()
        // Simple helper to save role
        val updated = UserProgressEntity(
            activeRole = role.name,
            xp = 980,
            coins = 340,
            streakDays = 7,
            isPremium = true
        )
        dao.saveUserProgress(updated)
    }

    suspend fun addXpAndCoins(xpGained: Int, coinsGained: Int) {
        val current = UserProgressEntity(
            xp = 980 + xpGained,
            coins = 340 + coinsGained,
            streakDays = 7,
            isPremium = true
        )
        dao.saveUserProgress(current)
    }

    suspend fun markLessonCompleted(lessonId: String, score: Int) {
        dao.markLessonCompleted(
            LessonProgressEntity(
                lessonId = lessonId,
                scorePercent = score,
                starsEarned = if (score >= 90) 3 else if (score >= 70) 2 else 1
            )
        )
        addXpAndCoins(50, 20)
    }

    fun getAllVocabulary(): List<VocabularyItem> = CurriculumData.allVocabulary

    fun getAllLessons(): List<Lesson> = CurriculumData.lessonsList

    fun getRolePlayScenarios() = CurriculumData.rolePlayScenarios

    fun getBadges() = CurriculumData.defaultBadges

    fun getLeaderboard() = CurriculumData.defaultLeaderboard
}
