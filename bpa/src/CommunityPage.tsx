import {
  MessageCircle,
  Users,
  X,
  Shield,
  Clock,
  Send,
  Loader,
} from "lucide-react";
import { useState } from "react";

const username = "User";

const rooms = [
  {
    title: "Anxiety Support",
    description:
      "A safe space to share experiences and coping strategies for anxiety",
    activeUsers: 24,
    moderator: "Dr. Sarah Chen",
  },
  {
    title: "Depression & Recovery",
    description: "Connect with others on the journey to healing and recovery",
    activeUsers: 18,
    moderator: "Dr. Michael Torres",
  },
  {
    title: "Mindfulness & Meditation",
    description: "Practice mindfulness techniques and share peaceful moments",
    activeUsers: 31,
    moderator: "Lisa Anderson",
  },
  {
    title: "Young Adults (18-25)",
    description: "Navigate the challenges of early adulthood together",
    activeUsers: 15,
    moderator: "Dr. James Wu",
  },
];

interface NewPost {
  topic: string;
  content: string;
}

interface ForumPost {
  id: number;
  author: string;
  topic: string;
  content: string;
  created_at: string;
  replies?: number;
}

interface CommunityPageProps {
  showPostForm: boolean;
  setShowPostForm: (show: boolean) => void;
  newPost: NewPost;
  setNewPost: (post: NewPost | ((prev: NewPost) => NewPost)) => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  setShowRoomsLobby: (show: boolean) => void;
  showRoomsLobby: boolean;
}

const CommunityPage = ({
  showPostForm,
  setShowPostForm,
  newPost,
  setNewPost,
  showChat,
  setShowChat,
  setShowRoomsLobby,
  showRoomsLobby,
}: CommunityPageProps) => {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 1,
      author: "Alex Johnson",
      topic: "Starting my recovery journey",
      content:
        "Today marks my first step towards healing. Looking for support and advice from others who've been through this.",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      replies: 5,
    },
    {
      id: 2,
      author: "Maria Garcia",
      topic: "Coping strategies that work",
      content:
        "I've found meditation and journaling really helpful. What strategies work for you?",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      replies: 12,
    },
  ]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleForumPostSubmit = () => {
    if (!newPost?.topic?.trim() || !newPost?.content?.trim()) {
      alert("Please fill in both topic and content");
      return;
    }

    setSubmitLoading(true);
    setError(null);

    // Simulate post submission
    setTimeout(() => {
      const savedPost: ForumPost = {
        id: forumPosts.length + 1,
        author: username,
        topic: newPost.topic,
        content: newPost.content,
        created_at: new Date().toISOString(),
        replies: 0,
      };

      setForumPosts([savedPost, ...forumPosts]);
      setNewPost({ topic: "", content: "" });
      setShowPostForm(false);
      setSubmitLoading(false);
    }, 500);
  };

  if (showRoomsLobby) {
    return (
      <RoomsLobbyPage
        rooms={rooms}
        setShowRoomsLobby={setShowRoomsLobby}
        showChat={showChat}
        setShowChat={setShowChat}
      />
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-slideDown">
        Support Community
      </h2>
      <p
        className="text-lg text-gray-600 mb-8 animate-slideDown opacity-0"
        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
      >
        Connect with others who understand. Our moderated forums and chat rooms
        provide a safe space for support and discussion.
      </p>

      <div className="mb-8">
        <div
          className="flex justify-between items-center mb-4 animate-slideUp opacity-0"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <h3 className="text-2xl font-bold text-gray-800">Community Forum</h3>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
          >
            <MessageCircle className="w-5 h-5" />
            <span>New Post</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg animate-slideDown">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {showPostForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-slideDown">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              Create New Post
            </h4>
            <div className="space-y-4">
              <div
                className="animate-fadeInUp opacity-0"
                style={{
                  animationDelay: "0.1s",
                  animationFillMode: "forwards",
                }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={newPost?.topic || ""}
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      topic: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300"
                  placeholder="What would you like to discuss?"
                  disabled={submitLoading}
                />
              </div>
              <div
                className="animate-fadeInUp opacity-0"
                style={{
                  animationDelay: "0.2s",
                  animationFillMode: "forwards",
                }}
              >
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  value={newPost?.content || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 transition-all duration-300 hover:border-blue-300 resize-none"
                  placeholder="Share your thoughts, ask questions, or offer support..."
                  disabled={submitLoading}
                />
              </div>
              <div
                className="flex space-x-3 animate-fadeInUp opacity-0"
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                <button
                  onClick={handleForumPostSubmit}
                  disabled={submitLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Post</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowPostForm(false);
                    setNewPost({ topic: "", content: "" });
                  }}
                  disabled={submitLoading}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {forumPosts?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No posts yet. Be the first to start a conversation!
              </p>
            </div>
          ) : (
            forumPosts?.map((post, index) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-slideUp opacity-0"
                style={{
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 transition-transform duration-300 hover:scale-110">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-bold text-gray-800">{post.author}</h4>
                      <span className="text-sm text-gray-500">
                        • {new Date(post.created_at).toLocaleString()}
                      </span>
                    </div>
                    <h5 className="font-semibold text-gray-700 mb-2">
                      {post.topic}
                    </h5>
                    <p className="text-gray-600 mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.replies || 0} replies</span>
                      <button className="text-blue-600 hover:underline transition-all duration-300 hover:translate-x-1">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className="bg-white rounded-xl shadow-md p-6 
  flex flex-col items-center text-center
  hover:shadow-xl transition-all duration-300 
  hover:scale-[1.02] animate-slideUp opacity-0 md:col-span-2"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <Users
            className="w-12 h-12 text-purple-600 mb-4 animate-bounce-gentle"
            style={{ animationDelay: "0.2s" }}
          />
          <h3 className="text-2xl font-bold mb-3 text-gray-800">
            Live Chat Rooms
          </h3>
          <p className="text-gray-600 mb-4">
            Connect in real-time with peers who understand. All chats are
            moderated for safety and support.
          </p>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
            onClick={() => setShowRoomsLobby(true)}
          >
            Enter Chat
          </button>
        </div>
      </div>

      <div
        className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg animate-slideUp opacity-0"
        style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
      >
        <h3 className="font-bold text-gray-800 mb-2">Community Guidelines</h3>
        <p className="text-gray-700">
          Our community is built on respect, empathy, and support. Be kind,
          maintain confidentiality, and remember that everyone is on their own
          unique journey. Professional moderators ensure a safe environment
          24/7.
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;

interface Room {
  title: string;
  description: string;
  activeUsers: number;
  moderator: string;
}

interface RoomsLobbyPageProps {
  rooms: Room[];
  setShowRoomsLobby: (show: boolean) => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const RoomsLobbyPage = ({
  rooms,
  setShowRoomsLobby,
  showChat,
  setShowChat,
}: RoomsLobbyPageProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  if (showChat && selectedRoom) {
    return <ChatRoom setShowChat={setShowChat} room={selectedRoom} />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <div className="inline-block mb-4">
            <MessageCircle className="w-16 h-16 text-blue-600 mx-auto animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
          <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-[slideDown_0.8s_ease-out]">
            Chat Rooms
          </h2>
          <p className="text-gray-600 text-lg animate-[fadeIn_0.8s_ease-out_0.3s_backwards]">
            Join supportive communities and connect with others
          </p>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6 rounded-r-xl shadow-md mb-10 animate-[slideInLeft_0.8s_ease-out_0.5s_backwards] hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1 animate-[pulse_2s_ease-in-out_infinite]" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">
                Community Guidelines
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our community is built on respect, empathy, and support. Be
                kind, maintain confidentiality, and remember that everyone is on
                their own unique journey. Professional moderators ensure a safe
                environment 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {rooms.map((room, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_backwards] hover:scale-[1.03] cursor-pointer border border-transparent hover:border-blue-200"
              style={{
                animationDelay: `${0.7 + idx * 0.15}s`,
              }}
            >
              {/* Room Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              {/* Room Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{room.activeUsers} active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>24/7 Support</span>
                </div>
              </div>

              {/* Moderator Info */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-500">
                  Moderated by{" "}
                  <span className="font-semibold text-gray-700">
                    {room.moderator}
                  </span>
                </p>
              </div>

              {/* Join Button */}
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transform group-hover:scale-105"
                onClick={() => {
                  setSelectedRoom(room);
                  setShowChat(true);
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Join Room
                  <MessageCircle className="w-4 h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Exit Button */}
        <button
          onClick={() => setShowRoomsLobby(false)}
          className="w-full max-w-md mx-auto block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold  hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 animate-[slideUp_0.8s_ease-out_1.5s_backwards]"
        >
          Exit Rooms Lobby
        </button>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

interface User {
  id: number;
  name: string;
}

interface Message {
  user: { name: string };
  date: Date;
  text: string;
}

interface ChatRoomProps {
  setShowChat: (show: boolean) => void;
  room: Room;
}

const ChatRoom = ({ setShowChat, room }: ChatRoomProps) => {
  // Generate users based on the room's active user count
  const generateUsers = () => {
    const userPool = [
      "Sarah Chen",
      "Mike Rodriguez",
      "Emma Thompson",
      "Alex Johnson",
      "Maria Garcia",
      "David Lee",
      "Lisa Anderson",
      "James Wu",
      "Rachel Brown",
      "Tom Wilson",
      "Nina Patel",
      "Chris Taylor",
      "Sofia Martinez",
      "Ryan Kim",
      "Jessica Moore",
      "Daniel Park",
    ];

    // Always include the moderator and current user
    const users: User[] = [
      { id: 1, name: username },
      { id: 2, name: room.moderator },
    ];

    // Add random users to match the room's active user count
    const availableUsers = userPool.filter(
      (name) => name !== room.moderator && name !== username,
    );

    const numAdditionalUsers = Math.min(
      room.activeUsers - 2, // Subtract moderator and current user
      availableUsers.length,
    );

    for (let i = 0; i < numAdditionalUsers; i++) {
      users.push({
        id: users.length + 1,
        name: availableUsers[i],
      });
    }

    return users;
  };

  const [users] = useState<User[]>(generateUsers());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      user: { name: room.moderator },
      date: new Date(Date.now() - 300000),
      text: `Welcome to ${room.title}! This is a safe space to share and support each other. ${room.description}`,
    },
    {
      user: { name: users[2]?.name || "Community Member" },
      date: new Date(Date.now() - 240000),
      text: "Thanks for being here. It's comforting to know we're not alone.",
    },
    {
      user: { name: users[3]?.name || "Community Member" },
      date: new Date(Date.now() - 180000),
      text: "I've been practicing the mindfulness techniques we discussed. They're really helping!",
    },
  ]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          user: { name: username },
          date: new Date(),
          text: message,
        },
      ]);
      setMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">{room.title}</h2>
              <p className="text-blue-100 text-sm">
                Moderated by {room.moderator}
              </p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-0 h-[600px]">
          {/* Messages Section */}
          <div className="md:col-span-8 flex flex-col h-full border-r border-gray-200 overflow-hidden">
            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 animate-slideUp ${
                    msg.user.name === username ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${
                      msg.user.name === username
                        ? "bg-blue-600"
                        : "bg-purple-600"
                    }`}
                  >
                    {msg.user.name.charAt(0)}
                  </div>
                  <div
                    className={`flex-1 ${
                      msg.user.name === username ? "text-right" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-semibold text-gray-800 ${
                          msg.user.name === username ? "order-2" : "order-1"
                        }`}
                      >
                        {msg.user.name}
                      </span>
                      <span
                        className={`text-xs text-gray-500 ${
                          msg.user.name === username ? "order-1" : "order-2"
                        }`}
                      >
                        {formatTime(msg.date)}
                      </span>
                    </div>
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl ${
                        msg.user.name === username
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={submit} className="flex gap-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setMessage(e.currentTarget.value)}
                  value={message}
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Users Section */}
          <div className="md:col-span-4 bg-gray-50 p-6 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Active Users
              </h3>
              <p className="text-sm text-gray-600">{users.length} online</p>
            </div>
            <ul className="space-y-2">
              {users.map(({ name, id }) => (
                <li
                  key={id}
                  className="bg-white rounded-lg p-3 hover:bg-blue-50 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {name.charAt(0)}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {name}
                      </p>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Chat Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Safe Space
                  </p>
                  <p className="text-xs text-gray-600">
                    All conversations are moderated and confidential. Be
                    respectful and supportive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
