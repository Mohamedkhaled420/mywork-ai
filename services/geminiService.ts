
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_CHAT_SYSTEM_INSTRUCTION, GEMINI_MODEL_CHAT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be caught by the UI when getAiClient fails.
  console.error("Gemini API Key not found. Please set the API_KEY environment variable.");
}

let ai: GoogleGenAI | null = null;
try {
    if(API_KEY) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    // UI should handle the case where `ai` is null.
}


export const getAiClient = (): GoogleGenAI | null => {
    if (!ai) {
        if (!API_KEY) {
            // This is a fallback if the initial console error wasn't sufficient.
            throw new Error("Gemini API Key not found. Cannot initialize AI client.");
        }
        try {
            ai = new GoogleGenAI({ apiKey: API_KEY });
        } catch (error) {
            console.error("Retry: Failed to initialize GoogleGenAI:", error);
            throw new Error("Failed to initialize Gemini AI client. Please check your API key and network connection.");
        }
    }
    return ai;
};

let chatInstance: Chat | null = null;

export const startOrGetChat = (): Chat => {
  const currentAi = getAiClient();
  if (!currentAi) {
      throw new Error("AI Client not available for chat.");
  }
  if (!chatInstance) {
    chatInstance = currentAi.chats.create({
      model: GEMINI_MODEL_CHAT,
      config: {
        systemInstruction: GEMINI_CHAT_SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatInstance;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = startOrGetChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        return "Error: The API key is not valid. Please check your configuration.";
    }
    return "Sorry, I encountered an error. Please try again later.";
  }
};

export const sendMessageToGeminiStream = async (
  message: string,
  onChunk: (chunkText: string) => void,
  onError: (errorMessage: string) => void,
  onComplete: () => void
): Promise<void> => {
  try {
    const chat = startOrGetChat();
    // Corrected type: chat.sendMessageStream returns AsyncIterable<GenerateContentResponse>
    const result: AsyncIterable<GenerateContentResponse> = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) { // chunk is of type GenerateContentResponse
      onChunk(chunk.text);
    }
    onComplete();
  } catch (error) {
    console.error("Error streaming message to Gemini:", error);
    let errorMsg = "Sorry, I encountered an error during streaming. Please try again.";
    if (error instanceof Error && error.message.includes("API key not valid")) {
        errorMsg = "Error: The API key is not valid. Please check your configuration.";
    }
    onError(errorMsg);
  }
};

export const resetChat = (): void => {
  chatInstance = null;
};