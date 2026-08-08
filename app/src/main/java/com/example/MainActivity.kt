package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Analytics
import androidx.compose.material.icons.filled.Games
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.data.model.Lesson
import com.example.data.model.UserRole
import com.example.ui.MainViewModel
import com.example.ui.components.RoleSelectorHeader
import com.example.ui.components.UserStatsHeaderCard
import com.example.ui.screens.AdminPanelScreen
import com.example.ui.screens.AiVoiceCoachScreen
import com.example.ui.screens.GamesScreen
import com.example.ui.screens.LessonDetailScreen
import com.example.ui.screens.ParentDashboardScreen
import com.example.ui.screens.StudentDashboardScreen
import com.example.ui.screens.StudentHomeScreen
import com.example.ui.screens.TeacherDashboardScreen
import com.example.ui.theme.FrenchBlue
import com.example.ui.theme.FrenchGold
import com.example.ui.theme.SpeakWithEdnaTheme

enum class MainTab(val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    HOME("Lessons", Icons.Default.Home),
    GAMES("Games", Icons.Default.Games),
    VOICE_COACH("AI Voice", Icons.Default.Mic),
    DASHBOARD("Dashboard", Icons.Default.Analytics)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SpeakWithEdnaTheme {
                val viewModel: MainViewModel = viewModel()
                SpeakWithEdnaApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun SpeakWithEdnaApp(viewModel: MainViewModel) {
    val currentRole by viewModel.currentRole.collectAsState()
    val progress by viewModel.userProgress.collectAsState()
    val activeLesson by viewModel.selectedLesson.collectAsState()

    var selectedTab by remember { mutableStateOf(MainTab.HOME) }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            if (activeLesson == null) {
                NavigationBar(
                    containerColor = Color.White,
                    tonalElevation = 8.dp,
                    modifier = Modifier.testTag("main_bottom_nav_bar")
                ) {
                    MainTab.entries.forEach { tab ->
                        val isSelected = tab == selectedTab
                        val navTitle = if (tab == MainTab.DASHBOARD) "${currentRole.displayName} Stats" else tab.title

                        NavigationBarItem(
                            selected = isSelected,
                            onClick = { selectedTab = tab },
                            icon = {
                                Icon(
                                    imageVector = tab.icon,
                                    contentDescription = tab.title,
                                    modifier = Modifier.size(24.dp)
                                )
                            },
                            label = {
                                Text(
                                    text = navTitle,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                                )
                            },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = FrenchBlue,
                                selectedTextColor = FrenchBlue,
                                indicatorColor = FrenchBlue.copy(alpha = 0.15f)
                            ),
                            modifier = Modifier.testTag("nav_tab_${tab.name.lowercase()}")
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            if (activeLesson == null) {
                // Header Stats & Role Switcher Header
                UserStatsHeaderCard(
                    xp = progress?.xp ?: 980,
                    coins = progress?.coins ?: 340,
                    streak = progress?.streakDays ?: 7,
                    levelCode = progress?.levelCode ?: "A1"
                )

                RoleSelectorHeader(
                    currentRole = currentRole,
                    onRoleSelected = { viewModel.switchRole(it) }
                )
            }

            // Screen Content Area
            if (activeLesson != null) {
                LessonDetailScreen(
                    lesson = activeLesson!!,
                    viewModel = viewModel,
                    onBack = { viewModel.selectLesson(null) }
                )
            } else {
                when (selectedTab) {
                    MainTab.HOME -> StudentHomeScreen(
                        viewModel = viewModel,
                        onNavigateToLesson = { viewModel.selectLesson(it) },
                        onNavigateToGames = { selectedTab = MainTab.GAMES },
                        onNavigateToVoiceCoach = { selectedTab = MainTab.VOICE_COACH }
                    )
                    MainTab.GAMES -> GamesScreen(viewModel = viewModel)
                    MainTab.VOICE_COACH -> AiVoiceCoachScreen(viewModel = viewModel)
                    MainTab.DASHBOARD -> when (currentRole) {
                        UserRole.STUDENT -> StudentDashboardScreen(viewModel = viewModel)
                        UserRole.TEACHER -> TeacherDashboardScreen()
                        UserRole.PARENT -> ParentDashboardScreen()
                        UserRole.ADMIN -> AdminPanelScreen()
                    }
                }
            }
        }
    }
}
