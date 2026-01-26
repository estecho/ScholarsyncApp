export interface ProfileData {
  user: {
    name: string;
    avatar: string;
    major: string;
    year: string;
  };
  mode: string;
  gpa: {
    value: number;
  };
  wellness: {
    stressLevel: string; // "低" | "中等" | "高"
    stressValue: number; // 0-100，用于压力条宽度百分比
  };
  deepWork: {
    totalHours: number;
  };
  smartTasks: {
    id: string;
    icon: string;
    iconBg: string;
    title: string;
    description: string;
    badge: string;
    badgeColor: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  user: {
    name: "Alex Chen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmR5FOVS4dxhl_KsU_i9HQehd1vcIJ-8hBka7-eWzGgFEAoh6Ui7-M0NSxdbW1Wgml70H7e4jyHIteh1PrePY8yTnBYaLWW3uTr_gcsiSvvZU547NER6thIgFeP-7zfzvt65mBuMKJJsELK_ACJLwofR1A1lLJCk-DGftjkBNBadVc3M7nFPREg_It8dihQ7IKv3W9apAhpRFiKxwh5T5luLSE0ojuv2LZcCXne7A1BJkemDRsMdTQutVZ267Tu4LK_mFWVXAq2o4",
    major: "计算机科学",
    year: "大三",
  },
  mode: "备考模式",
  gpa: {
    value: 3.8,
  },
  wellness: {
    stressLevel: "中等压力",
    stressValue: 65, // 压力条宽度百分比
  },
  deepWork: {
    totalHours: 24,
  },
  smartTasks: [
    {
      id: "task-1",
      icon: "priority_high",
      iconBg: "bg-red-50 dark:bg-red-900/20",
      title: "微积分测验",
      description: "第 4 章：导数",
      badge: "紧急",
      badgeColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    },
    {
      id: "task-2",
      icon: "menu_book",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      title: "归还图书馆书籍",
      description: "2 天后到期",
      badge: "校园",
      badgeColor: "bg-blue-100 text-primary dark:bg-blue-900/40 dark:text-blue-300",
    },
  ],
};

