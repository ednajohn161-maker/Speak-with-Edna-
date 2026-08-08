package com.example.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_progress")
data class UserProgressEntity(
    @PrimaryKey val id: Int = 1,
    val activeRole: String = "STUDENT",
    val xp: Int = 980,
    val coins: Int = 340,
    val streakDays: Int = 7,
    val lastActiveDate: String = "2026-08-07",
    val isPremium: Boolean = true,
    val levelCode: String = "A1",
    val name: String = "Léo",
    val avatarEmoji: String = "🦉"
)

@Entity(tableName = "completed_lessons")
data class LessonProgressEntity(
    @PrimaryKey val lessonId: String,
    val completedTimestamp: Long = System.currentTimeMillis(),
    val scorePercent: Int = 100,
    val starsEarned: Int = 3
)

@Entity(tableName = "saved_vocab")
data class SavedWordEntity(
    @PrimaryKey val wordId: String,
    val frenchText: String,
    val englishTranslation: String,
    val masteryScore: Int = 1, // 1 to 5
    val isFavorite: Boolean = false
)

@Entity(tableName = "user_badges")
data class BadgeEntity(
    @PrimaryKey val badgeId: String,
    val isUnlocked: Boolean = true,
    val unlockedDate: String = "2026-08-07"
)
