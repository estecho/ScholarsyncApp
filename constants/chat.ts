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
  badge?: string; // "邮件", "摘要可用" 等
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
    sender: "史密斯教授",
    preview: "已批准您的延期申请。",
    icon: "mail",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    sender: "项目小组",
    preview: "提议下午 4 点开会。",
    icon: "groups",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
  },
  {
    sender: "Alex",
    preview: "已发送课程文件给您。",
    icon: "person",
    iconBg: "bg-slate-100 dark:bg-slate-700",
  },
];

export const MESSAGES: Message[] = [
  {
    id: "prof-smith-1",
    sender: "史密斯教授",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3djOlcfHwtOUIyrfYXdmOewtPZLuEaTOapCmR1MdOITthjZVDC17pF7fGdGmkmF_zevIIS78bqudEaBxrlAWXXhyS_CipNjGRUCJjrMdBLSPtn6Y256eFV8U3PaeP_6iTHt-gwE0mUvASJWQ9CcL5WP4OVOv_i9QHa9CJQFjLXtF-7OFoT-51RbQ1hx53brWzG5B9XloZiPrd_cgLftOty-rdhpsmsvB6saRHZFk80AUhV1izmQg46jYXpihbrFE86j1lRxu70_Q",
    preview: "可以，我在办公时间见您...",
    type: "email",
    priority: "high",
    timestamp: "10:30 AM",
    unread: true,
    badge: "邮件",
  },
  {
    id: "library-service",
    sender: "图书馆服务",
    preview: "您的书籍《算法导论》即将到期。",
    type: "email",
    priority: "low",
    timestamp: "昨天",
    badge: "邮件",
  },
  {
    id: "prof-jenkins",
    sender: "詹金斯教授",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlIePsXRGnX5r9ciFxThTLnKXswSNAyGVecOhwgOjd-ExY25qLgXhI-YfPrVGb8A4jDeFt2Z6X-dtF63IBTF5-5_sdPr7UchjY7RP5-os9bGDqjNgMkgeKRSDKwivdlf8WgLGWhroUqKTKnd95PBvS8rioIK82r1pQ3GRsznMxMXDohKP6yb2fO-PEal6Y-srE7qKGkfXmmtI3BzaKt1s2LlG3Oo9ifEJPEuvNeB2mWjpOibEGPx6aIVSXy0uD5t3ug6jWFdIPtEg",
    preview: "亲爱的同学，请于周五前提交您的草稿。",
    type: "email",
    priority: "high",
    timestamp: "9:41 AM",
    unread: true,
    badge: "邮件",
  },
  {
    id: "cs101-group-scheduling",
    sender: "CS 101 小组",
    preview: "大家，我们什么时候讨论实验报告？",
    type: "chat",
    priority: "high",
    timestamp: "今天 9:41 AM",
    hasSchedulingCard: true,
  },
];

export function getMessageById(id: string): Message | undefined {
  return MESSAGES.find((message) => message.id === id);
}

