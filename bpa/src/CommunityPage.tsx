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
