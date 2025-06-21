// services/geminiService.ts

// Define the Cloudflare Worker URL.
// IMPORTANT: Ensure this is your EXACT deployed Cloudflare Worker URL.
const WORKER_URL = "https://y-ai.m-hassouna-mk.workers.dev/";

/**
 * Sends a message to Gemini via the Cloudflare Worker and receives a single response.
 * This function is for non-streaming interactions.
 * @param message The user's message/prompt.
 * @returns A promise that resolves with the Gemini's response text.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // REMOVED: "Authorization": "Bearer YOUR_API_KEY" - API key is handled securely by the Worker.
      },
      // Send the prompt in a 'prompt' field, as expected by the Worker.
      body: JSON.stringify({ prompt: message })
    });

    // Check if the HTTP response was successful.
    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error details
      throw new Error(`Worker error: ${response.status} ${response.statusText || ''} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    // The Worker sends back a JSON object with a 'response' field.
    return data.response || "No response from Gemini.";
  } catch (error) {
    console.error("Error sending message to Gemini via Worker:", error);
    // Provide a user-friendly error message.
    return `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}. Please try again later.`;
  }
};

/**
 * Sends a message to Gemini via the Cloudflare Worker and handles a streaming response.
 * @param message The user's message/prompt.
 * @param onChunk Callback function called with each received text chunk.
 * @param onError Callback function called if an error occurs during streaming.
 * @param onComplete Callback function called when the stream is complete.
 * @returns A promise that resolves when the streaming process is set up.
 */
export const sendMessageToGeminiStream = async (
  message: string,
  onChunk: (chunkText: string) => void,
  onError: (errorMessage: string) => void,
  onComplete: () => void
): Promise<void> => {
  try {
    // Append '?stream=true' to the Worker URL to signal a streaming request.
    const response = await fetch(WORKER_URL + "?stream=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // REMOVED: "Authorization": "Bearer YOUR_API_KEY" - API key is handled securely by the Worker.
      },
      // Send the prompt in a 'prompt' field for the Worker.
      body: JSON.stringify({ prompt: message })
    });

    // Check for HTTP errors before attempting to read the stream.
    if (!response.ok) {
      const errorText = await response.text(); // Get raw error response
      throw new Error(`Worker streaming error: ${response.status} ${response.statusText || ''} - ${errorText}`);
    }

    // Ensure there's a readable body to stream.
    if (!response.body) {
      throw new Error("No response body for streaming.");
    }

    // Get a reader for the response body stream.
    const reader = response.body.getReader();
    // TextDecoder decodes bytes to strings. 'stream: true' allows incremental decoding.
    const decoder = new TextDecoder("utf-8");
    let done = false;

    // Loop to read chunks from the stream until it's done.
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading; // Update the 'done' flag for the loop.

      if (value) {
        // Decode the chunk value (Uint8Array) into a string.
        const chunkText = decoder.decode(value, { stream: !done });
        // Call the onChunk callback with the decoded text.
        onChunk(chunkText);
      }
    }
    // Call the onComplete callback when the stream is fully read.
    onComplete();
  } catch (error) {
    console.error("Error streaming message to Gemini via Worker:", error);
    // Call the onError callback with a user-friendly message.
    onError(`Sorry, I encountered an error during streaming: ${error instanceof Error ? error.message : String(error)}. Please try again.`);
  }
};

/**
 * Resets the chat state.
 * Currently a no-op as the Worker API is stateless from the frontend perspective.
 */
export const resetChat = (): void => {
  // No-op for stateless worker API
};
