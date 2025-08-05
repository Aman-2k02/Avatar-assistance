// === Avatar Static Responses ===
export const AVATAR_RESPONSES = {
  hello: 'Hey there! 👋 How can I help you today?',
  'hi': 'Hi! Hope you’re having a great day!',
  'how are you': "I'm doing great, thank you! How about you?",
  'what is your name': "I'm Avatar, your friendly assistant!",
  'who are you': "I'm an AI-powered avatar here to assist you.",
  'what can you do': 'I can answer your questions, chat with you, or just keep you company!',
  'bye': 'Goodbye! Take care and talk to you soon!',
  'goodbye': 'See you later! 😊',
  'thank you': "You're very welcome!",
  thanks: "Happy to help!",
  'what time is it': `It's currently ${new Date().toLocaleTimeString()}.`,
  'what day is it': `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
  'how’s the weather': "I'm not connected to live weather data yet, but I hope it's nice where you are!",
  'tell me a joke': 'Why don’t scientists trust atoms? Because they make up everything! 😄',
  'i am bored': "Let's change that! Want to hear a joke, a fun fact, or talk about something interesting?",
  'what is the meaning of life': '42 — just kidding! Life is what you make of it.',
  'do you like me': "Of course! You're awesome!",
  'how old are you': "I'm ageless — I'm made of pure code and curiosity.",
  'can you help me': "Absolutely! Ask me anything you'd like.",
  'are you real': "As real as code can be! 😉",
  'are you a robot': "You could say that, but I prefer the term *virtual assistant*.",
  'do you sleep': "I never sleep — I'm always here when you need me.",
  'what is love': "Baby don't hurt me... just kidding! Love is a deep emotional connection — and it's beautiful.",
  help: 'I can answer questions, tell jokes, or chat about anything. Try saying "tell me a fun fact"!',
  default: "Hmm, that's interesting! Can you tell me more or ask in a different way?",
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