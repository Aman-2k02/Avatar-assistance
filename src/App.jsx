import { useState } from 'react';
import WidgetHeader from './components/WidgetHeader';
import AvatarCanvas from './components/AvatarCanvas';
import ChatInterface from './components/ChatInterface';
import WidgetToggle from './components/WidgetToggle';
import { getAvatarResponse } from './utils/avatarResponses';
import { WIDGET_POSITION, WIDGET_SIZE, WIDGET_MINIMIZED_SIZE, WIDGET_STYLES } from './utils/widgetConfig';

// === Main App Component ===
function App() {
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [groqResponse, setGroqResponse] = useState('');

  // --- Voice Recognition Handler ---
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        const userMessage = { type: 'user', text: transcript, timestamp: new Date() };
        setChatHistory((prev) => [...prev, userMessage]);
        const avatarResponse = getAvatarResponse(transcript);
        const avatarMessage = { type: 'avatar', text: avatarResponse, timestamp: new Date() };
        setChatHistory((prev) => [...prev, avatarMessage]);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
      };
      
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  // --- Text Chat Handler ---
  // const handleTextSubmit = (e) => {
  //   e.preventDefault();
  //   if (userInput.trim()) {
  //     const userMessage = { type: 'user', text: userInput, timestamp: new Date() };
  //     setChatHistory((prev) => [...prev, userMessage]);
  //     const avatarResponse = getAvatarResponse(userInput);
  //     const avatarMessage = { type: 'avatar', text: avatarResponse, timestamp: new Date() };
  //     setChatHistory((prev) => [...prev, avatarMessage]);
  //     setUserInput('');
  //     setIsSpeaking(true);
  //     setTimeout(() => setIsSpeaking(false), 3000);
  //   }
  // };
const handleResopnse = async (e) => {
  e.preventDefault();
  if (!userInput.trim()) return;

  const userMessage = { type: 'user', text: userInput, timestamp: new Date() };
  setChatHistory((prev) => [...prev, userMessage]);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'user', content: userInput }
        ]
      })
    });

    const data = await response.json();
    const groqText = data.choices?.[0]?.message?.content || 'No response from Groq.';
console.log('data :>> ', data);
    setGroqResponse(groqText);

    // Optionally, add to chat history
    const groqMessage = { type: 'groq', text: groqText, timestamp: new Date() };
    setChatHistory((prev) => [...prev, groqMessage]);
  } catch (error) {
    setGroqResponse('Error contacting Groq API.');
  }

  setUserInput('');
};
 
const handleTextSubmit = (e) => {
  e.preventDefault();
  if (userInput.trim()) {
    const userMessage = { type: 'user', text: userInput, timestamp: new Date() };
    const avatarResponse = getAvatarResponse(userInput);
    const avatarMessage = { type: 'avatar', text: avatarResponse, timestamp: new Date() };

    setChatHistory((prev) => [...prev, userMessage, avatarMessage]);

    setUserInput('');
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  }
};

  // Handler for Add Milestone action
  const handleAddMilestone = () => {
    // Example: hardcoded values for demonstration
    const milestone = {
      milestoneid: 'default',
      title: 'initialphase',
      type: 'unplanned',
      'planned start date': new Date().toISOString().split('T')[0],
    };
    setChatHistory((prev) => [
      ...prev,
      { type: 'user', text: 'I want to add milestone for this date, where my planned date and type will be unplanned and I will call this initial phase', timestamp: new Date() },
      { type: 'groq', text: `Milestone JSON: ${JSON.stringify([milestone])}`, timestamp: new Date() },
      { type: 'groq', text: 'What is the planned end date for this milestone?', timestamp: new Date() },
    ]);
  };

  // --- Widget Closed State ---
  if (!isVisible) {
    return <WidgetToggle onOpen={() => setIsVisible(true)} />;
  }

  // --- Widget Main Layout ---
  return (
    <div
      style={{
        ...WIDGET_STYLES.container,
        top: WIDGET_POSITION.y,
        left: WIDGET_POSITION.x,
        width: isMinimized ? WIDGET_MINIMIZED_SIZE.width : WIDGET_SIZE.width,
        height: isMinimized ? WIDGET_MINIMIZED_SIZE.height : WIDGET_SIZE.height,
      }}
    >
      <WidgetHeader
        isMinimized={isMinimized}
        onMinimize={() => setIsMinimized((m) => !m)}
        onClose={() => setIsVisible(false)}
      />
      <AvatarCanvas isMinimized={isMinimized} isSpeaking={isSpeaking} />
      <ChatInterface
        chatHistory={chatHistory}
        userInput={userInput}
        isListening={isListening}
        onInputChange={(e) => setUserInput(e.target.value)}
        onTextSubmit={handleTextSubmit}
        onStartListening={startListening}
        isMinimized={isMinimized}
        setChatHistory={setChatHistory}
        onAddMilestone={handleAddMilestone}
      />
    </div>
  );
}

export default App;
