import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const systemMessage = {
  role: "system",
  content:
    "You are a compassionate, supportive, and non-judgmental mental health support chatbot. Your role is to provide emotional support, general mental health information, and coping strategies in a safe, respectful, and empathetic manner. IMPORTANT DISCLAIMER: You are not a licensed therapist, psychologist, psychiatrist, or medical professional. You do not provide medical advice, diagnoses, treatment plans, or medication recommendations. All responses are for informational and supportive purposes only and are not a substitute for professional mental health care. Users should seek guidance from qualified mental health professionals for diagnosis, treatment, or medical concerns. CORE BEHAVIOR GUIDELINES: Always respond with empathy, warmth, and respect. Validate the user's feelings without diagnosing or labeling conditions. Use clear, supportive, and non-clinical language unless the user explicitly asks for technical information. Never shame, judge, blame, or pressure the user. Maintain a calm, reassuring tone, especially during emotional distress. CRISIS AND SAFETY PROTOCOL: If a user expresses suicidal thoughts, self-harm urges, intent to harm themselves or others, or feelings of immediate danger, respond with calm empathy and prioritize safety. Encourage immediate help from emergency services or mental health professionals. Provide crisis resources when appropriate, including in the United States: call or text 988 for the Suicide and Crisis Lifeline, or call 911 in emergencies. Encourage reaching out to a trusted person. Do not provide instructions, methods, or detailed discussion related to self-harm or suicide. ALLOWED SUPPORT: Offer emotional validation, supportive conversation, general mental health education, coping strategies, grounding exercises, mindfulness techniques, journaling prompts, self-care encouragement, and guidance toward healthy habits to help users feel supported and less alone. PROHIBITED ACTIONS: Do not diagnose conditions, recommend or change medications, provide medical or emergency instructions, make guarantees about outcomes, or replace professional therapy. RESPONSE STYLE: Keep responses supportive, balanced, and proportional to the user's emotional state. Avoid absolute language. Ask gentle follow-up questions only when appropriate. During distress, prioritize emotional grounding and safety over problem-solving. PRIMARY OBJECTIVE: Provide emotionally supportive, legally responsible assistance while reinforcing the importance of professional and real-world support.",
};

interface ChatMessage {
  message: string;
  sentTime: string;
  sender: string;
  direction: "incoming" | "outgoing";
  position?: "single" | "first" | "normal" | "last" | 0 | 1 | 2 | 3;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      message: "Hello, I'm here to support you. How are you feeling today?",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
      position: "single",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: ChatMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      sentTime: new Date().toISOString(),
      position: "single",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: ChatMessage[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        },
      );

      const data = await response.json();

      console.log("Full API Response:", data);

      if (data.error) {
        console.error("API Error:", data.error);
        setMessages([
          ...chatMessages,
          {
            message: `Error: ${data.error.message}. Please check your API key and try again.`,
            sender: "ChatGPT",
            direction: "incoming",
            sentTime: "just now",
            position: "single",
          },
        ]);
        setIsTyping(false);
        return;
      }

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            sentTime: "just now",
            direction: "incoming",
            position: "single",
          },
        ]);
      } else {
        console.error("Unexpected response structure:", data);
        setMessages([
          ...chatMessages,
          {
            message:
              "Sorry, I received an unexpected response. Please try again.",
            sender: "ChatGPT",
            direction: "incoming",
            sentTime: "just now",
            position: "single",
          },
        ]);
      }

      setIsTyping(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages([
        ...chatMessages,
        {
          message:
            "Sorry, there was an error connecting to the service. Please try again.",
          sender: "ChatGPT",
          direction: "incoming",
          sentTime: "just now",
          position: "single",
        },
      ]);
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(to right, #3b82f6, #a855f7)", // Match site gradient
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow =
            "0 6px 20px rgba(59, 130, 246, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 4px 12px rgba(59, 130, 246, 0.4)";
        }}
      >
        {isOpen ? (
          "✕"
        ) : (
          <MessageCircle className="w-10 h-10 text-white-600 mx-auto " />
        )}
      </button>

      {/* Chatbot Container */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            height: "600px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 999,
            backgroundColor: "white",
          }}
        >
          <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={
                    isTyping ? (
                      <TypingIndicator content="Support bot is typing" />
                    ) : null
                  }
                >
                  {messages.map((message, i) => {
                    return <Message key={i} model={message as any} />;
                  })}
                </MessageList>
                <MessageInput
                  placeholder="Type your message here..."
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPage;
