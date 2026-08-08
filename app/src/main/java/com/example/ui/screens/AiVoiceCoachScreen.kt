package com.example.ui.screens

import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.ChatMessage
import com.example.data.model.RolePlayScenario
import com.example.ui.MainViewModel
import com.example.ui.components.AudioPlayerButton
import com.example.ui.components.PronunciationScoreCard
import com.example.ui.theme.FrenchBlue
import com.example.ui.theme.FrenchGold
import com.example.ui.theme.FrenchRed

@Composable
fun AiVoiceCoachScreen(
    viewModel: MainViewModel,
    modifier: Modifier = Modifier
) {
    val scenarios = viewModel.repository.getRolePlayScenarios()
    val activeScenario by viewModel.activeScenario.collectAsState()
    val messages by viewModel.chatMessages.collectAsState()
    val pronunciationResult by viewModel.pronunciationResult.collectAsState()
    val isEvaluating by viewModel.isEvaluating.collectAsState()

    var inputSpeechText by remember { mutableStateOf("") }

    if (activeScenario == null && scenarios.isNotEmpty()) {
        viewModel.startRolePlay(scenarios[0])
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .testTag("ai_voice_coach_screen")
    ) {
        // Scenarios Horizontal Bar
        Column(modifier = Modifier.padding(vertical = 8.dp)) {
            Text(
                text = "Select French Role-Play Scenario:",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                modifier = Modifier.padding(horizontal = 16.dp)
            )
            Spacer(modifier = Modifier.height(6.dp))
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(scenarios) { scenario ->
                    val isSelected = scenario == activeScenario
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(16.dp))
                            .clickable { viewModel.startRolePlay(scenario) }
                            .testTag("scenario_pill_${scenario.id}"),
                        color = if (isSelected) FrenchBlue else MaterialTheme.colorScheme.surfaceVariant,
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = scenario.iconEmoji, fontSize = 18.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = scenario.frenchTitle,
                                style = MaterialTheme.typography.labelMedium.copy(fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal),
                                color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurface
                            )
                        }
                    }
                }
            }
        }

        // Active Pronunciation Result Card if available
        pronunciationResult?.let { result ->
            PronunciationScoreCard(
                result = result,
                onDismiss = { viewModel.clearPronunciationResult() },
                onPlayAudio = { viewModel.playFrenchText(result.targetText) }
            )
        }

        // Chat Message Feed
        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(vertical = 8.dp)
        ) {
            items(messages) { msg ->
                ChatMessageBubble(
                    message = msg,
                    onPlayAudio = { viewModel.playFrenchText(msg.frenchText) }
                )
            }

            if (isEvaluating) {
                item {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CircularProgressIndicator(modifier = Modifier.size(24.dp), color = FrenchBlue)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Edna is evaluating pronunciation...",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }

        // Suggested French Sample Phrases for Kids
        activeScenario?.let { sc ->
            Text(
                text = "Tap a suggested sentence to practice:",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(start = 16.dp, top = 4.dp, end = 16.dp, bottom = 0.dp)
            )
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                items(sc.samplePhrases) { phrase ->
                    Surface(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .clickable {
                                inputSpeechText = phrase
                                viewModel.sendUserMessage(phrase)
                            }
                            .testTag("sample_phrase_chip"),
                        color = MaterialTheme.colorScheme.surfaceVariant,
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = "💬 \"$phrase\"",
                            style = MaterialTheme.typography.labelSmall,
                            color = MaterialTheme.colorScheme.onSurface,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }

        // Voice Input & Send Controls
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                OutlinedTextField(
                    value = inputSpeechText,
                    onValueChange = { inputSpeechText = it },
                    placeholder = { Text("Speak or type French...", fontSize = 13.sp) },
                    modifier = Modifier
                        .weight(1f)
                        .testTag("speech_text_input"),
                    shape = RoundedCornerShape(16.dp),
                    singleLine = true
                )

                Spacer(modifier = Modifier.width(6.dp))

                // Microphone button
                IconButton(
                    onClick = {
                        if (inputSpeechText.isNotBlank()) {
                            viewModel.sendUserMessage(inputSpeechText)
                            inputSpeechText = ""
                        } else {
                            val defaultMicPhrase = "Bonjour Edna! Je veux parler français!"
                            inputSpeechText = defaultMicPhrase
                            viewModel.sendUserMessage(defaultMicPhrase)
                        }
                    },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(FrenchRed)
                        .testTag("mic_record_button")
                ) {
                    Icon(imageVector = Icons.Default.Mic, contentDescription = "Mic Record", tint = Color.White)
                }

                Spacer(modifier = Modifier.width(4.dp))

                // Send button
                IconButton(
                    onClick = {
                        if (inputSpeechText.isNotBlank()) {
                            viewModel.sendUserMessage(inputSpeechText)
                            inputSpeechText = ""
                        }
                    },
                    modifier = Modifier
                        .size(44.dp)
                        .clip(CircleShape)
                        .background(FrenchBlue)
                        .testTag("send_message_button")
                ) {
                    Icon(imageVector = Icons.Default.Send, contentDescription = "Send Message", tint = Color.White)
                }
            }
        }
    }
}

@Composable
private fun ChatMessageBubble(
    message: ChatMessage,
    onPlayAudio: () -> Unit
) {
    val isUser = message.isUser
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start,
        verticalAlignment = Alignment.Top
    ) {
        if (!isUser) {
            Surface(
                modifier = Modifier.size(36.dp),
                shape = CircleShape,
                color = FrenchBlue.copy(alpha = 0.2f)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text(text = "🦉", fontSize = 20.sp)
                }
            }
            Spacer(modifier = Modifier.width(8.dp))
        }

        Card(
            shape = RoundedCornerShape(
                topStart = 16.dp,
                topEnd = 16.dp,
                bottomStart = if (isUser) 16.dp else 4.dp,
                bottomEnd = if (isUser) 4.dp else 16.dp
            ),
            colors = CardDefaults.cardColors(
                containerColor = if (isUser) FrenchBlue else MaterialTheme.colorScheme.surfaceVariant
            ),
            modifier = Modifier
                .width(280.dp)
                .testTag("chat_bubble_${message.id}")
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = if (isUser) "You" else message.sender,
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                        color = if (isUser) Color.White.copy(alpha = 0.8f) else FrenchBlue
                    )

                    AudioPlayerButton(onClick = onPlayAudio, size = 28)
                }

                Spacer(modifier = Modifier.height(4.dp))

                Text(
                    text = message.frenchText,
                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold),
                    color = if (isUser) Color.White else MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(2.dp))

                Text(
                    text = message.englishTranslation,
                    style = MaterialTheme.typography.bodySmall,
                    color = if (isUser) Color.White.copy(alpha = 0.7f) else MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
