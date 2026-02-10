import React, { useState } from "react";
import {
  Heart,
  Phone,
  Calendar,
  MessageCircle,
  BookOpen,
  Users,
  Menu,
  X,
  ChevronRight,
  Star,
  Send,
  CheckCircle,
  User as UserIcon,
} from "lucide-react";
import logo from "./assets/mental_health_logo.png";
import { useEffect, useRef } from "react";
import "./animations.css";
import CommunityPage from "./CommunityPage";
import TestimonialsPage from "./TestimonialsPage";
import BlogPage from "./BlogPage";
import ResourcesPage from "./ResourcesPage";
import AppointmentsPage from "./AppointmentsPage";
import LoginPage from "./LoginPage";
import AccountPage from "./AccountPage";
import ChatbotPage from "./ChatbotPage";
import HelplinesPage from "./HelplinesPage";

interface User {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface AppointmentForm {
  name: string;
  email: string;
  date: string;
  time: string;
  issue: string;
}

interface ConfirmedDetails {
  name: string;
  email: string;
  date: string;
  time: string;
  issue: string;
}

export default function MentalHealthHub() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDisorder, setSelectedDisorder] = useState<string | null>(null);
  const [showRoomsLobby, setShowRoomsLobby] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    name: "",
    email: "",
    date: "",
    time: "",
    issue: "",
  });
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] =
    useState<ConfirmedDetails | null>(null);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginPage, setShowLoginPage] = useState(false);

  // Forum state - removed since CommunityPage manages its own state
  const [newPost, setNewPost] = useState({ topic: "", content: "" });
  const [showPostForm, setShowPostForm] = useState(false);

  const disorders = [
    {
      name: "Anxiety Disorders",
      description:
        "Characterized by excessive worry, fear, or nervousness that interferes with daily activities.",
      symptoms: [
        "Restlessness",
        "Rapid heartbeat",
        "Difficulty concentrating",
        "Sleep problems",
      ],
      resources:
        "Cognitive Behavioral Therapy (CBT), mindfulness practices, and medication can help manage anxiety.",
    },
    {
      name: "Depression",
      description:
        "A mood disorder causing persistent feelings of sadness and loss of interest in activities.",
      symptoms: [
        "Persistent sadness",
        "Loss of energy",
        "Changes in appetite",
        "Difficulty concentrating",
      ],
      resources:
        "Treatment includes therapy, medication, lifestyle changes, and support groups.",
    },
    {
      name: "PTSD",
      description:
        "Post-Traumatic Stress Disorder develops after experiencing or witnessing a traumatic event.",
      symptoms: [
        "Flashbacks",
        "Nightmares",
        "Severe anxiety",
        "Avoidance behaviors",
      ],
      resources:
        "Trauma-focused therapies, EMDR, and medication can effectively treat PTSD.",
    },
    {
      name: "Bipolar Disorder",
      description:
        "Causes extreme mood swings including emotional highs (mania) and lows (depression).",
      symptoms: [
        "Mood swings",
        "Energy changes",
        "Impulsive behavior",
        "Sleep disturbances",
      ],
      resources:
        "Combination of medication, therapy, and lifestyle management is most effective.",
    },
  ];

  const helplines = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      available: "24/7",
      type: "national",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      available: "24/7",
      type: "national",
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      available: "24/7",
      type: "national",
    },
    {
      name: "NAMI Helpline",
      number: "1-800-950-6264",
      available: "Mon-Fri, 10am-10pm ET",
      type: "national",
    },
    {
      name: "Veterans Crisis Line",
      number: "988 (Press 1)",
      available: "24/7",
      type: "national",
    },
    {
      name: "Trevor Project (LGBTQ Youth)",
      number: "1-866-488-7386",
      available: "24/7",
      type: "national",
    },
  ];

  const blogPosts = [
    {
      title: "Breaking the Stigma: Why Talking About Mental Health Matters",
      excerpt:
        "Open conversations about mental health can save lives. Learn how to start the dialogue.",
      date: "2025-10-15",
    },
    {
      title: "5 Self-Care Practices for Better Mental Wellness",
      excerpt:
        "Simple daily habits that can significantly improve your mental health and overall wellbeing.",
      date: "2025-10-12",
    },
    {
      title: "Understanding the Mind-Body Connection",
      excerpt: "How physical health influences mental wellness and vice versa.",
      date: "2025-10-08",
    },
  ];

  // Authentication handlers
  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setShowLoginPage(false);
    setActiveTab("home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab("home");
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedData });
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedDetails({ ...appointmentForm });
    setAppointmentConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewAppointment = () => {
    setAppointmentConfirmed(false);
    setAppointmentForm({ name: "", email: "", date: "", time: "", issue: "" });
    setConfirmedDetails(null);
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-6">
            {[
              "home",
              "resources",
              "helplines",
              "appointments",
              "community",
              "blog",
              "stories",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "appointments") {
                    setAppointmentConfirmed(false);
                    handleNewAppointment();
                  }
                }}
                className={`capitalize px-3 py-2 rounded-md transition ${
                  activeTab === tab ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                {tab === "stories" ? "Testimonials" : tab}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && currentUser ? (
              <button
                onClick={() => setActiveTab("account")}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
              >
                <UserIcon className="w-5 h-5" />
                <span>{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowLoginPage(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Login
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {[
              "home",
              "resources",
              "helplines",
              "appointments",
              "community",
              "blog",
              "stories",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                  if (tab === "appointments") {
                    setAppointmentConfirmed(false);
                  }
                }}
                className="block w-full text-left capitalize px-3 py-2 rounded-md hover:bg-white/10"
              >
                {tab === "stories" ? "Testimonials" : tab}
              </button>
            ))}
            <div className="border-t border-white/20 mt-2 pt-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setActiveTab("account");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-white/10"
                >
                  My Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginPage(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-white/10"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // ─── Scroll-trigger hook ────────────────────────────────────────────
  function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
  }

  function useCounter(target: number, duration = 1800, visible = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!visible) return;
      const start = performance.now();
      let frame: number;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [visible, target, duration]);
    return count;
  }

  const Hero = ({ setActiveTab }: { setActiveTab: (t: string) => void }) => {
    const [logoVisible, setLogoVisible] = useState(true);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
      const logoTimer = setTimeout(() => {
        setLogoVisible(false);
      }, 2000);

      const contentTimer = setTimeout(() => {
        setContentVisible(true);
      }, 2500);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(contentTimer);
      };
    }, []);

    return (
      <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-12 text-center overflow-hidden min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 z-10 pointer-events-none"
          style={{
            opacity: logoVisible ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: logoVisible ? "scale(1)" : "scale(1.1)",
              transition:
                "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <img
              src={logo}
              alt="Open Circle Logo"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>

        <div className="relative z-0 w-full">
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s 0.15s cubic-bezier(.22,1,.36,1), transform 0.7s 0.15s cubic-bezier(.22,1,.36,1)",
            }}
          >
            You Are Not Alone
          </h1>
          <p
            className="text-xl mb-6 max-w-2xl mx-auto"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.7s 0.3s cubic-bezier(.22,1,.36,1), transform 0.7s 0.3s cubic-bezier(.22,1,.36,1)",
            }}
          >
            Mental health matters. Whether you're struggling or supporting
            someone who is, we're here to help.
          </p>
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(14px)",
              transition:
                "opacity 0.7s 0.45s cubic-bezier(.22,1,.36,1), transform 0.7s 0.45s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <button
              onClick={() => setActiveTab("helplines")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              Get Immediate Help
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/15 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  const cards = [
    {
      Icon: Phone,
      color: "blue",
      title: "24/7 Crisis Support",
      desc: "Immediate help is available. You don't have to face this alone.",
    },
    {
      Icon: BookOpen,
      color: "purple",
      title: "Educational Resources",
      desc: "Learn about mental health conditions and treatment options.",
    },
    {
      Icon: Users,
      color: "pink",
      title: "Supportive Community",
      desc: "Connect with others who understand what you're going through.",
    },
  ];

  const colorMap: Record<string, { border: string; icon: string }> = {
    blue: { border: "#3b82f6", icon: "#3b82f6" },
    purple: { border: "#a855f7", icon: "#a855f7" },
    pink: { border: "#ec4899", icon: "#ec4899" },
  };

  const FeatureCards = () => {
    const { ref, visible } = useScrollReveal(0.1);
    return (
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {cards.map(({ Icon, color, title, desc }, i) => (
          <div
            key={title}
            className="bg-white rounded-xl p-6 shadow-md"
            style={{
              borderTop: `4px solid ${colorMap[color].border}`,
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.95)",
              transition: `opacity 0.6s ${
                i * 0.13
              }s cubic-bezier(.22,1,.36,1), transform 0.6s ${
                i * 0.13
              }s cubic-bezier(.22,1,.36,1), box-shadow 0.3s`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 30px rgba(0,0,0,.12)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-4px) scale(1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0) scale(1)";
            }}
          >
            <Icon
              className="w-12 h-12 mb-4"
              style={{
                color: colorMap[color].icon,
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "scale(1) rotate(0deg)"
                  : "scale(0.5) rotate(-10deg)",
                transition: `opacity 0.5s ${
                  i * 0.13 + 0.2
                }s cubic-bezier(.22,1,.36,1), transform 0.5s ${
                  i * 0.13 + 0.2
                }s cubic-bezier(.22,1,.36,1)`,
              }}
            />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    );
  };

  const stats = [
    {
      value: 5,
      label: "Adults experience mental illness yearly",
      prefix: "1 in ",
      color: "#2563eb",
    },
    {
      value: 50,
      label: "Of mental illness begins by age 14",
      suffix: "%",
      color: "#9333ea",
    },
    {
      value: 43,
      label: "Recovery rate with proper treatment",
      suffix: "%",
      color: "#db2777",
    },
    {
      value: 24,
      label: "Crisis support available",
      suffix: "/7",
      color: "#4f46e5",
    },
  ];

  const StatItem = ({
    value,
    label,
    prefix = "",
    suffix = "",
    color,
    visible,
  }: (typeof stats)[0] & { visible: boolean }) => {
    const count = useCounter(value, 1600, visible);
    return (
      <div
        className="text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition:
            "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="text-4xl font-bold" style={{ color }}>
          {prefix}
          {count}
          {suffix}
        </div>
        <div className="text-gray-600 mt-2">{label}</div>
      </div>
    );
  };

  const StatsSection = () => {
    const { ref, visible } = useScrollReveal(0.15);
    return (
      <div
        ref={ref}
        className="bg-blue-50 rounded-xl p-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(50px)",
          transition:
            "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <h2
          className="text-3xl font-bold mb-4 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.6s 0.1s cubic-bezier(.22,1,.36,1), transform 0.6s 0.1s cubic-bezier(.22,1,.36,1)",
          }}
        >
          Mental Health Statistics
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ${
                  i * 0.12 + 0.2
                }s cubic-bezier(.22,1,.36,1), transform 0.6s ${
                  i * 0.12 + 0.2
                }s cubic-bezier(.22,1,.36,1)`,
              }}
            >
              <StatItem {...s} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const HomePage = () => {
    return (
      <div className="space-y-12">
        <Hero setActiveTab={setActiveTab} />
        <FeatureCards />
        <StatsSection />
      </div>
    );
  };

  const AppointmentConfirmationPage = ({
    setActiveTab,
  }: {
    setActiveTab: (tab: string) => void;
  }) => {
    const handleNewAppointment = () => {
      setActiveTab("appointments");
      setAppointmentConfirmed(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center overflow-hidden">
            <div className="mb-6 animate-[fadeInScale_0.6s_ease-out]">
              <div className="relative inline-block">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-[drawCheck_0.8s_ease-out_0.2s_backwards]" />
                <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-[ping_1s_ease-out_0.3s]"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-[slideUp_0.6s_ease-out_0.4s_backwards]">
                Appointment Request Confirmed!
              </h2>
              <p className="text-lg text-gray-600 animate-[slideUp_0.6s_ease-out_0.5s_backwards]">
                Thank you for taking this important step toward better mental
                health.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6 text-left animate-[slideUp_0.6s_ease-out_0.6s_backwards]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Appointment Details:
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Name:",
                    value: confirmedDetails?.name,
                    delay: "0.7s",
                  },
                  {
                    label: "Email:",
                    value: confirmedDetails?.email,
                    delay: "0.8s",
                  },
                  {
                    label: "Date:",
                    value: confirmedDetails?.date,
                    delay: "0.9s",
                  },
                  {
                    label: "Time:",
                    value: confirmedDetails?.time,
                    delay: "1s",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between animate-[slideInRight_0.5s_ease-out_backwards] hover:bg-white/50 p-2 rounded transition-all duration-300"
                    style={{ animationDelay: item.delay }}
                  >
                    <span className="font-semibold text-gray-700">
                      {item.label}
                    </span>
                    <span className="text-gray-600">{item.value}</span>
                  </div>
                ))}
                {confirmedDetails?.issue && (
                  <div className="pt-3 border-t animate-[slideInRight_0.5s_ease-out_1.1s_backwards]">
                    <span className="font-semibold text-gray-700 block mb-2">
                      Reason for Visit:
                    </span>
                    <span className="text-gray-600">
                      {confirmedDetails.issue}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-4 mb-6 text-left animate-[slideInLeft_0.6s_ease-out_1.2s_backwards]">
              <h4 className="font-bold text-gray-800 mb-2">
                What Happens Next?
              </h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                {[
                  `You will receive a confirmation email at ${confirmedDetails?.email} within 24 hours`,
                  "A licensed counselor will contact you to confirm the appointment details",
                  "If you need to reschedule, you can reply to the confirmation email",
                  "Prepare any questions or concerns you'd like to discuss during your session",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="animate-[slideInLeft_0.5s_ease-out_backwards] hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                  >
                    • {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[slideUp_0.6s_ease-out_1.7s_backwards]">
              <button
                onClick={() => setActiveTab("home")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Return to Home
              </button>
              <button
                onClick={handleNewAppointment}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                Schedule Another Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If showing login page, render only that
  if (showLoginPage && !isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onClose={() => setShowLoginPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full flex flex-col">
        {activeTab === "home" && <HomePage />}
        {activeTab === "resources" && <ResourcesPage />}
        {activeTab === "helplines" && <HelplinesPage helplines={helplines} />}
        {activeTab === "appointments" && (
          <AppointmentsPage
            appointmentConfirmed={appointmentConfirmed}
            setAppointmentForm={setAppointmentForm}
            appointmentForm={appointmentForm}
            handleAppointmentSubmit={handleAppointmentSubmit}
            AppointmentConfirmationPage={
              <AppointmentConfirmationPage setActiveTab={setActiveTab} />
            }
          />
        )}
        {activeTab === "community" && (
          <CommunityPage
            showPostForm={showPostForm}
            setShowPostForm={setShowPostForm}
            newPost={newPost}
            setNewPost={setNewPost}
            setShowRoomsLobby={setShowRoomsLobby}
            showRoomsLobby={showRoomsLobby}
            setShowChat={setShowChat}
            showChat={showChat}
          />
        )}
        {activeTab === "blog" && <BlogPage blogPosts={blogPosts} />}
        {activeTab === "stories" && <TestimonialsPage />}
        {activeTab === "account" && isAuthenticated && currentUser && (
          <AccountPage
            user={currentUser}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>
      <ChatbotPage />
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">© 2025 MindWell Hub.</p>
          <p className="text-gray-400 text-sm">
            If you're in crisis, call 988 immediately or visit your nearest
            emergency room.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            This website is the work of Siddharth Rajen, Saamiya Merali, Lucas
            Tong, and Sukanya Pal
          </p>
        </div>
      </footer>
    </div>
  );
}
