// eslint-disable-next-line @typescript-eslint/no-require-imports
const avatarsData = require("../MockupData/avatars.json") as {
  users: {
    currentUser: {
      name: string;
      avatar: string;
    };
    groupMembers: Array<{
      name: string;
      avatar: string;
    }>;
  };
  professors: Record<string, {
    name: string;
    avatar: string;
  }>;
  students: Record<string, {
    name: string;
    avatar: string;
  }>;
  defaults: {
    fallbackService: string;
    colors: {
      background: string;
      foreground: string;
    };
  };
};

/**
 * 根据名称生成头像URL
 * 优先使用真实头像URL，缺失时使用 UI Avatars 服务
 * 
 * @param name - 用户名称
 * @param size - 头像尺寸（默认32）
 * @param providedUrl - 如果提供了URL，优先使用
 * @returns 头像URL
 */
export function getAvatarUrl(
  name: string,
  size: number = 32,
  providedUrl?: string
): string {
  // 始终使用 UI Avatars 生成占位符头像
  const encodedName = encodeURIComponent(name || "User");
  const bgColor = avatarsData.defaults?.colors?.background || "6366f1";
  const fgColor = avatarsData.defaults?.colors?.foreground || "ffffff";
  
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${bgColor}&color=${fgColor}&bold=true&format=png`;
}

/**
 * 获取用户头像URL（从 PROFILE_DATA）
 */
export function getCurrentUserAvatar(): string {
  const name = avatarsData.users.currentUser.name || "User";
  return getAvatarUrl(name, 40);
}

/**
 * 获取群组成员头像列表
 */
export function getGroupMemberAvatars(): string[] {
  return avatarsData.users.groupMembers.map((member, index) => 
    getAvatarUrl(member.name || `User${index + 1}`, 20)
  );
}

/**
 * 根据教授名称获取头像
 */
export function getProfessorAvatar(professorName: string): string {
  // 始终使用 UI Avatars 生成占位符头像
  return getAvatarUrl(professorName, 48);
}

/**
 * 根据学生名称获取头像
 */
export function getStudentAvatar(studentName: string): string {
  // 始终使用 UI Avatars 生成占位符头像
  return getAvatarUrl(studentName, 56);
}

