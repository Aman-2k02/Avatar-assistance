// === Avatar Static Responses ===
export const AVATAR_RESPONSES = {
  hello: 'Hello! Nice to meet you!',
  'how are you': "I'm doing great, thanks for asking!",
  'what is your name': 'My name is Avatar!',
  bye: 'Goodbye! Have a great day!',
  help: 'I can help you with basic questions. Try asking me something!',
  default: "That's interesting! Tell me more.",
};

// === Avatar Response Helper Function ===
export function getAvatarResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(AVATAR_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  return AVATAR_RESPONSES.default;
} 