import { createContext, useContext, useState, type ReactNode } from "react";

export interface ChatMessage {
  id: string;
  from: string; // user id
  text: string;
  time: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  participants: string[]; // user ids
  propertyName: string;
  messages: ChatMessage[];
}

interface MessagingContextType {
  conversations: Conversation[];
  getConversationsForUser: (userId: string) => Conversation[];
  sendMessage: (conversationId: string, fromUserId: string, text: string) => void;
  getOrCreateConversation: (user1Id: string, user2Id: string, propertyName: string) => string;
  markAsRead: (conversationId: string, userId: string) => void;
  readStatus: Record<string, Record<string, number>>; // convId -> userId -> lastReadTimestamp
}

const MessagingContext = createContext<MessagingContextType | null>(null);

function getTimeString() {
  const now = new Date();
  let hours = now.getHours();
  const mins = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${mins} ${ampm}`;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    participants: ["user-1", "owner-1"],
    propertyName: "Sunshine PG",
    messages: [
      { id: "m1", from: "owner-1", text: "Hello! Welcome to Sunshine PG.", time: "10:00 AM", timestamp: Date.now() - 360000 },
      { id: "m2", from: "user-1", text: "Hi! I'm interested in the single room.", time: "10:15 AM", timestamp: Date.now() - 300000 },
      { id: "m3", from: "owner-1", text: "Great! When would you like to visit?", time: "10:20 AM", timestamp: Date.now() - 240000 },
      { id: "m4", from: "owner-1", text: "We have availability from March 1st.", time: "10:21 AM", timestamp: Date.now() - 200000 },
      { id: "m5", from: "user-1", text: "Can I visit this Saturday?", time: "10:25 AM", timestamp: Date.now() - 160000 },
      { id: "m6", from: "owner-1", text: "When can you visit?", time: "10:30 AM", timestamp: Date.now() - 120000 },
    ],
  },
  {
    id: "conv-2",
    participants: ["user-1", "user-sunita"],
    propertyName: "Royal Girls Hostel",
    messages: [
      { id: "m7", from: "user-sunita", text: "Hello! Thank you for your interest in Royal Girls Hostel.", time: "Yesterday", timestamp: Date.now() - 86400000 },
      { id: "m8", from: "user-1", text: "Hi! Is there a double sharing room available?", time: "Yesterday", timestamp: Date.now() - 82800000 },
      { id: "m9", from: "user-sunita", text: "Room is available from March", time: "Yesterday", timestamp: Date.now() - 80000000 },
    ],
  },
  {
    id: "conv-3",
    participants: ["user-1", "user-amit"],
    propertyName: "Urban Living",
    messages: [
      { id: "m10", from: "user-amit", text: "Hi there! Welcome to Urban Living Bachelor Flat.", time: "2 days ago", timestamp: Date.now() - 172800000 },
      { id: "m11", from: "user-1", text: "Hello! I'm looking for a 1BHK flat.", time: "2 days ago", timestamp: Date.now() - 170000000 },
      { id: "m12", from: "user-amit", text: "Thanks for your interest!", time: "2 days ago", timestamp: Date.now() - 168000000 },
    ],
  },
  {
    id: "conv-4",
    participants: ["user-2", "owner-1"],
    propertyName: "Sunshine PG",
    messages: [
      { id: "m13", from: "user-2", text: "Hi, I saw the triple sharing room listing. Is it still available?", time: "11:00 AM", timestamp: Date.now() - 60000 },
      { id: "m14", from: "owner-1", text: "Yes, we have 2 triple sharing rooms available. Would you like to visit?", time: "11:15 AM", timestamp: Date.now() - 30000 },
    ],
  },
];

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [readStatus, setReadStatus] = useState<Record<string, Record<string, number>>>({});

  const getConversationsForUser = (userId: string) => {
    return conversations.filter((c) => c.participants.includes(userId));
  };

  const sendMessage = (conversationId: string, fromUserId: string, text: string) => {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      from: fromUserId,
      text,
      time: getTimeString(),
      timestamp: Date.now(),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, messages: [...c.messages, msg] } : c
      )
    );
    // Auto-mark as read for sender
    setReadStatus((prev) => ({
      ...prev,
      [conversationId]: {
        ...(prev[conversationId] || {}),
        [fromUserId]: Date.now(),
      },
    }));
  };

  const getOrCreateConversation = (user1Id: string, user2Id: string, propertyName: string) => {
    const existing = conversations.find(
      (c) => c.participants.includes(user1Id) && c.participants.includes(user2Id) && c.propertyName === propertyName
    );
    if (existing) return existing.id;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      participants: [user1Id, user2Id],
      propertyName,
      messages: [],
    };
    setConversations((prev) => [...prev, newConv]);
    return newConv.id;
  };

  const markAsRead = (conversationId: string, userId: string) => {
    setReadStatus((prev) => ({
      ...prev,
      [conversationId]: {
        ...(prev[conversationId] || {}),
        [userId]: Date.now(),
      },
    }));
  };

  return (
    <MessagingContext.Provider
      value={{ conversations, getConversationsForUser, sendMessage, getOrCreateConversation, markAsRead, readStatus }}
    >
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const ctx = useContext(MessagingContext);
  if (!ctx) throw new Error("useMessaging must be used within MessagingProvider");
  return ctx;
}
