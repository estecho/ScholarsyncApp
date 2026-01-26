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
  // 如果提供了URL且不是占位符，直接使用
  if (providedUrl && !providedUrl.includes("via.placeholder.com")) {
    return providedUrl;
  }

  // 尝试从 mockup data 中查找
  const normalizedName = name.toLowerCase().trim();
  
  // 检查用户数据
  if (avatarsData.users.currentUser.name.toLowerCase() === normalizedName) {
    return avatarsData.users.currentUser.avatar;
  }

  // 检查群组成员
  const groupMember = avatarsData.users.groupMembers.find(
    (member) => member.name.toLowerCase() === normalizedName
  );
  if (groupMember) {
    return groupMember.avatar;
  }

  // 检查教授数据
  const professor = Object.values(avatarsData.professors).find(
    (prof) => prof.name.toLowerCase() === normalizedName
  );
  if (professor) {
    return professor.avatar;
  }

  // 检查学生数据
  const student = Object.values(avatarsData.students).find(
    (stud) => stud.name.toLowerCase() === normalizedName
  );
  if (student) {
    return student.avatar;
  }

  // 如果都找不到，使用 UI Avatars 生成
  const encodedName = encodeURIComponent(name);
  const bgColor = avatarsData.defaults.colors.background;
  const fgColor = avatarsData.defaults.colors.foreground;
  
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${bgColor}&color=${fgColor}&bold=true&format=png`;
}

/**
 * 获取用户头像URL（从 PROFILE_DATA）
 */
export function getCurrentUserAvatar(): string {
  return avatarsData.users.currentUser.avatar;
}

/**
 * 获取群组成员头像列表
 */
export function getGroupMemberAvatars(): string[] {
  return avatarsData.users.groupMembers.map((member) => member.avatar);
}

/**
 * 根据教授名称获取头像
 */
export function getProfessorAvatar(professorName: string): string {
  const normalizedName = professorName.toLowerCase().trim();
  const professor = Object.values(avatarsData.professors).find(
    (prof) => prof.name.toLowerCase() === normalizedName
  );
  
  if (professor) {
    return professor.avatar;
  }
  
  // 如果找不到，使用 UI Avatars
  return getAvatarUrl(professorName, 48);
}

/**
 * 根据学生名称获取头像
 */
export function getStudentAvatar(studentName: string): string {
  const normalizedName = studentName.toLowerCase().trim();
  const student = Object.values(avatarsData.students).find(
    (stud) => stud.name.toLowerCase() === normalizedName
  );
  
  if (student) {
    return student.avatar;
  }
  
  // 如果找不到，使用 UI Avatars
  return getAvatarUrl(studentName, 56);
}

