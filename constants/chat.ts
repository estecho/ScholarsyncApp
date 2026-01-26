export type MessageType = "email" | "chat";
export type MessagePriority = "high" | "low";

export interface Message {
  id: string;
  sender: string;
  avatar?: string;
  preview: string;
  type: MessageType;
  priority: MessagePriority;
  timestamp: string;
  unread?: boolean;
  badge?: string; // "Email", "Summary Available" 等
  hasSchedulingCard?: boolean; // 标记包含调度卡片
}

export interface PriorityItem {
  sender: string;
  preview: string;
  icon: string; // Material Symbol name
  iconBg: string; // Tailwind color class (e.g., "bg-blue-100")
}

export const PRIORITY_ITEMS: PriorityItem[] = [
  {
    sender: "Prof. Smith",
    preview: "Approved your extension request.",
    icon: "mail",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    sender: "Project Group",
    preview: "Meeting at 4 PM proposed.",
    icon: "groups",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
  },
  {
    sender: "Alex",
    preview: "Sent you the lecture file.",
    icon: "person",
    iconBg: "bg-slate-100 dark:bg-slate-700",
  },
];

export const MESSAGES: Message[] = [
  {
    id: "prof-smith-1",
    sender: "Prof. Smith",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3djOlcfHwtOUIyrfYXdmOewtPZLuEaTOapCmR1MdOITthjZVDC17pF7fGdGmkmF_zevIIS78bqudEaBxrlAWXXhyS_CipNjGRUCJjrMdBLSPtn6Y256eFV8U3PaeP_6iTHt-gwE0mUvASJWQ9CcL5WP4OVOv_i9QHa9CJQFjLXtF-7OFoT-51RbQ1hx53brWzG5B9XloZiPrd_cgLftOty-rdhpsmsvB6saRHZFk80AUhV1izmQg46jYXpihbrFE86j1lRxu70_Q",
    preview: "That works for me. See you in office hours...",
    type: "email",
    priority: "high",
    timestamp: "10:30 AM",
    unread: true,
    badge: "Email",
  },
  {
    id: "library-service",
    sender: "Library Service",
    preview: "Your book \"Intro to Algorithms\" is due soon.",
    type: "email",
    priority: "low",
    timestamp: "Yesterday",
    badge: "Email",
  },
  {
    id: "prof-jenkins",
    sender: "Prof. Jenkins",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlIePsXRGnX5r9ciFxThTLnKXswSNAyGVecOhwgOjd-ExY25qLgXhI-YfPrVGb8A4jDeFt2Z6X-dtF63IBTF5-5_sdPr7UchjY7RP5-os9bGDqjNgMkgeKRSDKwivdlf8WgLGWhroUqKTKnd95PBvS8rioIK82r1pQ3GRsznMxMXDohKP6yb2fO-PEal6Y-srE7qKGkfXmmtI3BzaKt1s2LlG3Oo9ifEJPEuvNeB2mWjpOibEGPx6aIVSXy0uD5t3ug6jWFdIPtEg",
    preview: "Dear Student, please submit your draft by Friday.",
    type: "email",
    priority: "high",
    timestamp: "9:41 AM",
    unread: true,
    badge: "Email",
  },
  {
    id: "cs101-group-scheduling",
    sender: "CS 101 Group",
    preview: "Guys, when are we meeting for the lab report?",
    type: "chat",
    priority: "high",
    timestamp: "Today 9:41 AM",
    hasSchedulingCard: true,
  },
];

export function getMessageById(id: string): Message | undefined {
  return MESSAGES.find((message) => message.id === id);
}

