package com.example.data.remote

import android.util.Log
import com.example.BuildConfig
import com.example.data.model.ChatMessage
import com.example.data.model.PronunciationResult
import com.example.data.model.RolePlayScenario
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class GeminiRepository {

    private val client = OkHttpClient.Builder()
        .connectTimeout(60, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)
        .writeTimeout(60, TimeUnit.SECONDS)
        .build()

    private val apiKey: String
        get() = try {
            BuildConfig.GEMINI_API_KEY
        } catch (e: Exception) {
            ""
        }

    suspend fun evaluatePronunciation(
        spokenText: String,
        targetPhrase: String,
        targetIpa: String
    ): PronunciationResult = withContext(Dispatchers.IO) {
        if (apiKey.isBlank() || apiKey == "MY_GEMINI_API_KEY") {
            // Local fallback smart heuristic scoring
            val similarity = calculateSimilarity(spokenText.lowercase(), targetPhrase.lowercase())
            val score = (similarity * 100).toInt().coerceIn(60, 100)
            return@withContext PronunciationResult(
                score = score,
                recognizedText = spokenText.ifBlank { targetPhrase },
                targetText = targetPhrase,
                ipaTarget = targetIpa,
                feedbackMessage = if (score >= 90) "Magnifique! Perfect French accent!" else if (score >= 75) "Très bien! Small accent adjustment needed." else "Good effort! Listen to Edna and retry.",
                mistakeHighlight = if (score < 90) "Notice the French vowel sounds in '${targetPhrase.take(8)}...'" else "No major mistakes!",
                tipForImprovement = "Round your lips slightly more when saying nasal vowels in French!"
            )
        }

        val prompt = """
            You are Edna, an expert French Voice Coach for children and beginners.
            Analyze the user's spoken French text versus the target French phrase.
            
            Target French Phrase: "$targetPhrase"
            Target IPA: "$targetIpa"
            Spoken Text Recognized: "$spokenText"
            
            Return ONLY a valid JSON object with these keys:
            - "score": integer from 0 to 100 representing pronunciation accuracy
            - "feedbackMessage": short encouraging message (15 words max)
            - "mistakeHighlight": specific word or sound pronounced incorrectly
            - "tipForImprovement": actionable tip to improve French phonetics
        """.trimIndent()

        try {
            val jsonResponse = callGeminiApi(prompt)
            val jsonObject = JSONObject(jsonResponse)
            val score = jsonObject.optInt("score", 85)
            val feedback = jsonObject.optString("feedbackMessage", "Great pronunciation attempt!")
            val mistake = jsonObject.optString("mistakeHighlight", "Focus on nasal vowels")
            val tip = jsonObject.optString("tipForImprovement", "Practice listening to Edna's native accent.")

            PronunciationResult(
                score = score,
                recognizedText = spokenText,
                targetText = targetPhrase,
                ipaTarget = targetIpa,
                feedbackMessage = feedback,
                mistakeHighlight = mistake,
                tipForImprovement = tip
            )
        } catch (e: Exception) {
            Log.e("GeminiRepository", "Error evaluating pronunciation", e)
            val similarity = calculateSimilarity(spokenText.lowercase(), targetPhrase.lowercase())
            val score = (similarity * 100).toInt().coerceIn(65, 98)
            PronunciationResult(
                score = score,
                recognizedText = spokenText,
                targetText = targetPhrase,
                ipaTarget = targetIpa,
                feedbackMessage = "Bravo! Keep practicing with Edna!",
                mistakeHighlight = "Listen closely to Edna's audio",
                tipForImprovement = "Keep your voice soft and expressive."
            )
        }
    }

    suspend fun getConversationReply(
        scenario: RolePlayScenario,
        chatHistory: List<ChatMessage>,
        userMessage: String
    ): ChatMessage = withContext(Dispatchers.IO) {
        val defaultReply = ChatMessage(
            id = "msg_${System.currentTimeMillis()}",
            sender = "Edna",
            frenchText = "Très intéressant! Peux-tu m'en dire plus?",
            englishTranslation = "(Very interesting! Can you tell me more?)",
            isUser = false
        )

        if (apiKey.isBlank() || apiKey == "MY_GEMINI_API_KEY") {
            return@withContext getLocalScenarioFallbackReply(scenario, userMessage)
        }

        val historyText = chatHistory.takeLast(6).joinToString("\n") {
            "${if (it.isUser) "Student" else "Edna"}: ${it.frenchText}"
        }

        val prompt = """
            ${scenario.systemPrompt}
            
            Conversation History:
            $historyText
            Student's latest message: "$userMessage"
            
            Reply as Edna in French with English translation in brackets. Keep it child-friendly, engaging, and under 25 words.
            Format response strictly as JSON:
            {
              "frenchText": "Bonjour! Comment puis-je t'aider?",
              "englishTranslation": "(Hello! How can I help you?)"
            }
        """.trimIndent()

        try {
            val jsonResponse = callGeminiApi(prompt)
            val jsonObject = JSONObject(jsonResponse)
            val french = jsonObject.optString("frenchText", defaultReply.frenchText)
            val english = jsonObject.optString("englishTranslation", defaultReply.englishTranslation)

            ChatMessage(
                id = "msg_${System.currentTimeMillis()}",
                sender = "Edna",
                frenchText = french,
                englishTranslation = english,
                isUser = false
            )
        } catch (e: Exception) {
            Log.e("GeminiRepository", "Error getting reply", e)
            getLocalScenarioFallbackReply(scenario, userMessage)
        }
    }

    suspend fun explainGrammarRule(ruleTitle: String, ruleContext: String): String = withContext(Dispatchers.IO) {
        if (apiKey.isBlank() || apiKey == "MY_GEMINI_API_KEY") {
            return@withContext "In French, words have gender (masculine or feminine). $ruleContext Practice using 'Le' for boys/items and 'La' for girls/items!"
        }

        val prompt = """
            You are Edna, a cheerful French teacher for kids.
            Explain this French grammar rule in simple, fun, child-friendly terms:
            Rule Title: $ruleTitle
            Details: $ruleContext
            
            Provide a 3-bullet point breakdown with emoji and 1 easy example!
        """.trimIndent()

        try {
            callGeminiApi(prompt)
        } catch (e: Exception) {
            "• French words use Le (masculine) or La (feminine)!\n• Plural words use Les.\n• Practice with Edna every day to earn coins!"
        }
    }

    private fun callGeminiApi(promptText: String): String {
        val url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=$apiKey"

        val contentsArray = JSONArray().apply {
            put(JSONObject().apply {
                put("parts", JSONArray().apply {
                    put(JSONObject().apply {
                        put("text", promptText)
                    })
                })
            })
        }

        val requestBodyJson = JSONObject().apply {
            put("contents", contentsArray)
        }

        val request = Request.Builder()
            .url(url)
            .post(requestBodyJson.toString().toRequestBody("application/json".toMediaType()))
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) {
                val errorBody = response.body?.string() ?: ""
                throw RuntimeException("Gemini HTTP Error ${response.code}: $errorBody")
            }

            val responseStr = response.body?.string() ?: ""
            val responseJson = JSONObject(responseStr)
            val candidates = responseJson.optJSONArray("candidates")
            if (candidates != null && candidates.length() > 0) {
                val candidate = candidates.getJSONObject(0)
                val content = candidate.optJSONObject("content")
                val parts = content?.optJSONArray("parts")
                if (parts != null && parts.length() > 0) {
                    val rawText = parts.getJSONObject(0).optString("text", "")
                    // Clean code fence formatting if model returned ```json ... ```
                    return rawText.replace("```json", "").replace("```", "").trim()
                }
            }
            throw RuntimeException("No text candidates found in Gemini response")
        }
    }

    private fun calculateSimilarity(s1: String, s2: String): Float {
        if (s1.isEmpty() || s2.isEmpty()) return 0.5f
        val common = s1.filter { s2.contains(it) }.length
        return (common.toFloat() / maxOf(s1.length, s2.length)).coerceIn(0.4f, 1.0f)
    }

    private fun getLocalScenarioFallbackReply(scenario: RolePlayScenario, userMessage: String): ChatMessage {
        val replyText = when (scenario.id) {
            "school" -> "Bonjour! C'est un plaisir de t'avoir dans ma classe. As-tu préparé ton cahier?" to "(Hello! It's a pleasure to have you in my class. Did you prepare your notebook?)"
            "restaurant" -> "Voilà un délicieux croissant tout chaud! Désirez-vous un jus d'orange avec cela?" to "(Here is a delicious hot croissant! Would you like some orange juice with that?)"
            "doctor" -> "Ne t'inquiète pas! Respire bien fort. Où as-tu mal exactement?" to "(Don't worry! Take a deep breath. Where does it hurt exactly?)"
            "hotel" -> "Voici votre clé pour la chambre 204. Passez un très bon séjour à Paris!" to "(Here is your key for room 204. Have a great stay in Paris!)"
            else -> "C'est formidable! Continuons à parler français ensemble!" to "(That's wonderful! Let's continue speaking French together!)"
        }
        return ChatMessage(
            id = "msg_${System.currentTimeMillis()}",
            sender = "Edna",
            frenchText = replyText.first,
            englishTranslation = replyText.second,
            isUser = false
        )
    }
}
