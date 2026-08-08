package com.example.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.MainViewModel
import com.example.ui.components.AudioPlayerButton
import com.example.ui.theme.FrenchBlue
import com.example.ui.theme.FrenchGold
import com.example.ui.theme.FrenchRed

enum class GameType(val title: String, val emoji: String) {
    FLASHCARDS("Flashcards", "🎴"),
    MATCHING("Matching Game", "🧩"),
    LISTENING("Listening Quiz", "🎧"),
    SPELLING("Spelling Bee", "✏️")
}

@Composable
fun GamesScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    var selectedGame by remember { mutableStateOf(GameType.FLASHCARDS) }
    val vocabList = remember { viewModel.repository.getAllVocabulary().shuffled().take(8) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .testTag("games_screen")
    ) {
        // Game Selector Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            GameType.entries.forEach { game ->
                val isSelected = game == selectedGame
                Surface(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .clickable { selectedGame = game }
                        .testTag("game_tab_${game.name.lowercase()}"),
                    color = if (isSelected) FrenchBlue else MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(vertical = 8.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(text = game.emoji, fontSize = 18.sp)
                        Text(
                            text = game.title,
                            style = MaterialTheme.typography.labelSmall.copy(fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal),
                            color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface,
                            fontSize = 10.sp,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }

        when (selectedGame) {
            GameType.FLASHCARDS -> FlashcardsGameMode(vocabList = vocabList, viewModel = viewModel)
            GameType.MATCHING -> MatchingGameMode(vocabList = vocabList.take(4), viewModel = viewModel)
            GameType.LISTENING -> ListeningQuizGameMode(vocabList = vocabList, viewModel = viewModel)
            GameType.SPELLING -> SpellingGameMode(vocabList = vocabList, viewModel = viewModel)
        }
    }
}

@Composable
private fun FlashcardsGameMode(
    vocabList: List<com.example.data.model.VocabularyItem>,
    viewModel: MainViewModel
) {
    var currentIndex by remember { mutableIntStateOf(0) }
    var isFlipped by remember { mutableStateOf(false) }
    val currentWord = vocabList[currentIndex]

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Flashcard ${currentIndex + 1} of ${vocabList.size}",
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.height(12.dp))

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .height(260.dp)
                .clickable { isFlipped = !isFlipped }
                .testTag("flashcard_card"),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = if (isFlipped) FrenchGold else FrenchBlue
            ),
            elevation = CardDefaults.cardElevation(defaultElevation = 6.dp)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = currentWord.emoji, fontSize = 56.sp)
                    Spacer(modifier = Modifier.height(12.dp))

                    if (!isFlipped) {
                        Text(
                            text = currentWord.frenchText,
                            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "IPA: ${currentWord.ipa}",
                            style = MaterialTheme.typography.bodyMedium,
                            color = Color.White.copy(alpha = 0.8f)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "(Tap card to flip for English)",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White.copy(alpha = 0.6f)
                        )
                    } else {
                        Text(
                            text = currentWord.englishTranslation,
                            style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                            color = Color.Black
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "\"${currentWord.exampleFrench}\"",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.Black.copy(alpha = 0.8f),
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AudioPlayerButton(onClick = { viewModel.playFrenchText(currentWord.frenchText) }, size = 48)

            Button(
                onClick = {
                    isFlipped = false
                    currentIndex = (currentIndex + 1) % vocabList.size
                },
                colors = ButtonDefaults.buttonColors(containerColor = FrenchBlue),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.height(48.dp)
            ) {
                Text("Next Flashcard", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun MatchingGameMode(
    vocabList: List<com.example.data.model.VocabularyItem>,
    viewModel: MainViewModel
) {
    var selectedFrenchId by remember { mutableStateOf<String?>(null) }
    var matchedIds by remember { mutableStateOf(setOf<String>()) }
    val englishShuffled = remember(vocabList) { vocabList.shuffled() }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "🧩 Match French Words to English",
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
        )
        Text(
            text = "Tap a French word on the left, then its translation on the right!",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(20.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // French Left Column
            Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                vocabList.forEach { item ->
                    val isMatched = matchedIds.contains(item.id)
                    val isSelected = selectedFrenchId == item.id

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(64.dp)
                            .clickable(enabled = !isMatched) { selectedFrenchId = item.id }
                            .testTag("match_french_${item.id}"),
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isMatched) Color(0xFF10B981) else if (isSelected) FrenchGold else FrenchBlue
                        )
                    ) {
                        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                            Text(
                                text = "${item.emoji} ${item.frenchText}",
                                style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                                color = Color.White
                            )
                        }
                    }
                }
            }

            // English Right Column
            Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                englishShuffled.forEach { item ->
                    val isMatched = matchedIds.contains(item.id)

                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(64.dp)
                            .clickable(enabled = !isMatched && selectedFrenchId != null) {
                                if (selectedFrenchId == item.id) {
                                    matchedIds = matchedIds + item.id
                                    selectedFrenchId = null
                                    viewModel.playFrenchText("Bravo!")
                                }
                            }
                            .testTag("match_english_${item.id}"),
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isMatched) Color(0xFF10B981) else MaterialTheme.colorScheme.surfaceVariant
                        )
                    ) {
                        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                            Text(
                                text = item.englishTranslation,
                                style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                                color = if (isMatched) Color.White else MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ListeningQuizGameMode(
    vocabList: List<com.example.data.model.VocabularyItem>,
    viewModel: MainViewModel
) {
    var currentIndex by remember { mutableIntStateOf(0) }
    var selectedAnswer by remember { mutableStateOf<String?>(null) }
    val currentWord = vocabList[currentIndex]
    val options = remember(currentWord) {
        (listOf(currentWord) + vocabList.filter { it.id != currentWord.id }.take(3)).shuffled()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "🎧 Listening Comprehension Quiz",
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
        )
        Text(
            text = "Listen to Edna's French audio and pick the correct item!",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Large Audio Play Button
        Surface(
            modifier = Modifier
                .size(90.dp)
                .clip(CircleShape)
                .clickable { viewModel.playFrenchText(currentWord.frenchText) },
            color = FrenchBlue
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(imageVector = Icons.Default.VolumeUp, contentDescription = "Play", tint = Color.White, modifier = Modifier.size(44.dp))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        options.forEach { option ->
            val isSelected = selectedAnswer == option.id
            val isCorrect = option.id == currentWord.id

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp)
                    .clickable {
                        selectedAnswer = option.id
                        if (isCorrect) viewModel.playFrenchText("Très bien!")
                    }
                    .testTag("listening_option_${option.id}"),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (selectedAnswer != null && isCorrect) Color(0xFF10B981) else if (isSelected) FrenchRed else MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = option.emoji, fontSize = 24.sp)
                    Spacer(modifier = Modifier.width(12.dp))
                    Text(
                        text = option.englishTranslation,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = if (selectedAnswer != null && (isCorrect || isSelected)) Color.White else MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (selectedAnswer != null) {
            Button(
                onClick = {
                    selectedAnswer = null
                    currentIndex = (currentIndex + 1) % vocabList.size
                },
                colors = ButtonDefaults.buttonColors(containerColor = FrenchBlue)
            ) {
                Text("Next Question")
            }
        }
    }
}

@Composable
private fun SpellingGameMode(
    vocabList: List<com.example.data.model.VocabularyItem>,
    viewModel: MainViewModel
) {
    var currentIndex by remember { mutableIntStateOf(0) }
    val currentWord = vocabList[currentIndex]
    val targetFrench = currentWord.frenchText
    var userSpelling by remember(currentWord) { mutableStateOf("") }

    val scrambledLetters = remember(currentWord) {
        targetFrench.uppercase().replace(" ", "").toList().shuffled()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "✏️ French Spelling Bee",
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
        )
        Text(
            text = "Arrange the letters to spell '${currentWord.englishTranslation}' in French!",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(text = currentWord.emoji, fontSize = 60.sp)

        Spacer(modifier = Modifier.height(16.dp))

        // User Input Box
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp),
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.surfaceVariant
        ) {
            Box(contentAlignment = Alignment.Center) {
                Text(
                    text = userSpelling.ifBlank { "Tap letters below..." },
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                    color = if (userSpelling.isBlank()) MaterialTheme.colorScheme.onSurfaceVariant else FrenchBlue
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Letter Tiles
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(horizontal = 8.dp)
        ) {
            scrambledLetters.forEachIndexed { idx, char ->
                Surface(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .clickable { userSpelling += char }
                        .testTag("spelling_tile_$idx"),
                    color = FrenchBlue,
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(text = char.toString(), style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold), color = Color.White)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Button(
                onClick = { userSpelling = "" },
                colors = ButtonDefaults.buttonColors(containerColor = FrenchRed)
            ) {
                Text("Clear")
            }

            Button(
                onClick = {
                    if (userSpelling.equals(targetFrench.replace(" ", ""), ignoreCase = true)) {
                        viewModel.playFrenchText("Bravo! Excellent!")
                        userSpelling = ""
                        currentIndex = (currentIndex + 1) % vocabList.size
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981))
            ) {
                Text("Check")
            }
        }
    }
}
