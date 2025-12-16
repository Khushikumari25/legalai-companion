import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import {
  Send,
  Plus,
  Menu,
  X,
  MessageSquare,
  Trash2,
  LogOut,
  Settings,
  Scale,
  BookOpen,
  FileText,
  HelpCircle,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              title:
                c.messages.length === 0
                  ? inputValue.slice(0, 30) + "..."
                  : c.title,
            }
          : c
      )
    );

    setInputValue("");
    setIsTyping(true);

    // Simulate AI response - will be replaced with actual AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateLegalResponse(inputValue),
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, aiResponse] }
            : c
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const generateLegalResponse = (query: string): string => {
    const responses = [
      `Based on your query about "${query.slice(0, 50)}...", I can provide the following legal guidance:\n\nUnder Indian law, this matter typically falls under the jurisdiction of civil courts. The relevant provisions can be found in the Indian Contract Act, 1872 and the Code of Civil Procedure, 1908.\n\n**Key Points:**\n1. You have the right to seek legal remedy through proper channels\n2. Documentation is crucial for any legal proceedings\n3. Consultation with a qualified advocate is recommended for specific advice\n\nWould you like me to elaborate on any specific aspect?`,
      `Regarding your question about "${query.slice(0, 50)}...", here's what Indian law says:\n\nThe Constitution of India, under Article 21, guarantees the right to life and personal liberty. This fundamental right has been interpreted broadly by the Supreme Court to include various aspects of dignified living.\n\n**Relevant Statutes:**\n- The Indian Penal Code, 1860\n- The Criminal Procedure Code, 1973\n- Specific state laws may also apply\n\nShall I provide more details on any particular statute?`,
      `Thank you for your query about "${query.slice(0, 50)}..."\n\nThis is a matter that requires careful consideration of multiple legal provisions. In India, such cases are typically governed by:\n\n**Civil Law Framework:**\n- The Specific Relief Act, 1963\n- The Limitation Act, 1963\n- Relevant High Court rules\n\n**Important Note:** Legal matters can be complex, and outcomes depend on specific facts. I recommend documenting all relevant details and consulting with a licensed advocate.\n\nIs there a specific aspect you'd like me to focus on?`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleDeleteConversation = (id: string) => {
    if (conversations.length === 1) {
      handleNewChat();
    }
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(
        conversations.find((c) => c.id !== id)?.id || "1"
      );
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const suggestedQueries = [
    {
      icon: Scale,
      title: "Rights under Constitution",
      query: "What are my fundamental rights under the Indian Constitution?",
    },
    {
      icon: BookOpen,
      title: "Property Laws",
      query: "Explain the process of property registration in India",
    },
    {
      icon: FileText,
      title: "Contract Basics",
      query: "What makes a contract legally valid in India?",
    },
    {
      icon: HelpCircle,
      title: "Consumer Rights",
      query: "How can I file a consumer complaint?",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } bg-sidebar transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <Logo variant="light" />
        </div>

        <div className="p-3">
          <Button
            variant="ghost"
            onClick={handleNewChat}
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          <p className="text-xs text-sidebar-foreground/60 px-3 py-2 font-medium">
            Recent Conversations
          </p>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                activeConversationId === conversation.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
              onClick={() => setActiveConversationId(conversation.id)}
            >
              <MessageSquare className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 truncate text-sm">{conversation.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConversation(conversation.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <h1 className="font-serif font-semibold text-foreground">
              {activeConversation?.title || "New Chat"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <User className="h-4 w-4 text-accent-foreground" />
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {activeConversation?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="text-center space-y-4 max-w-2xl animate-fade-in">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Scale className="h-10 w-10 text-accent" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground">
                  Welcome to LegalAI
                </h2>
                <p className="text-muted-foreground text-lg">
                  Your AI-powered assistant for Indian legal queries. Ask me
                  anything about laws, rights, procedures, or legal documents.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 max-w-xl mx-auto">
                  {suggestedQueries.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(item.query)}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/5 hover:border-accent/30 transition-all text-left group"
                    >
                      <item.icon className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {item.query}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-6">
              {activeConversation?.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-4 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "assistant"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Scale className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="font-medium text-sm text-foreground">
                      {message.role === "assistant" ? "LegalAI" : "You"}
                    </p>
                    <div
                      className={`prose prose-sm max-w-none ${
                        message.role === "assistant"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.content.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Scale className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">LegalAI</p>
                    <div className="flex gap-1.5 py-3">
                      <span className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask me about Indian law..."
                  className="pr-12 h-12 bg-background"
                />
                <Button
                  variant="chat"
                  size="icon"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              LegalAI provides general legal information. For specific legal
              advice, consult a qualified advocate.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
