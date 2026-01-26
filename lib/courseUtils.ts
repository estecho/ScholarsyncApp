import { Course, ReviewCourse, Component } from "./types";
import timetableData from "@/MockupData/timetable.json";

/**
 * 将 24 小时制时间转换为 12 小时制
 * @param time24 24小时制时间，格式 "HH:MM"，如 "18:45"
 * @returns 12小时制时间，格式 "H:MM AM/PM"，如 "6:45 PM"
 */
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/**
 * 将完整星期名称转换为缩写
 * @param day 完整星期名称，如 "Monday"
 * @returns 缩写，如 "Mon"
 */
export function formatDayAbbr(day: string): string {
  const dayMap: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };
  return dayMap[day] || day.substring(0, 3);
}

/**
 * 生成课程时间显示文本（24小时制）
 * @param components 课程组件数组
 * @returns 格式化的时间显示，如 "Mon 18:45" 或 "Mon 18:45, Wed 14:30"
 */
export function formatScheduleDisplay(components: Component[]): string {
  if (components.length === 0) return "";

  // 按天分组
  const dayMap = new Map<
    string,
    Array<{ time: string; room: string; type: string }>
  >();

  components.forEach((component) => {
    const dayAbbr = formatDayAbbr(component.day);
    // 直接使用 24 小时制时间（已经是 "HH:MM" 格式）
    const timeStr = component.start_time;

    if (!dayMap.has(dayAbbr)) {
      dayMap.set(dayAbbr, []);
    }
    dayMap.get(dayAbbr)!.push({
      time: timeStr,
      room: component.room,
      type: component.type,
    });
  });

  // 构建显示文本
  const parts: string[] = [];
  dayMap.forEach((schedules, day) => {
    // 如果同一天有多个时间，显示所有时间
    const times = schedules.map((s) => s.time).join(", ");
    parts.push(`${day} ${times}`);
  });

  return parts.join("/");
}

/**
 * 将时间字符串转换为分钟数（用于比较）
 * @param time 时间字符串，格式 "HH:MM"
 * @returns 总分钟数
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * 检查两个时间段是否重叠
 * @param day1 第一个时间段的天
 * @param start1 第一个时间段的开始时间
 * @param end1 第一个时间段的结束时间
 * @param day2 第二个时间段的天
 * @param start2 第二个时间段的开始时间
 * @param end2 第二个时间段的结束时间
 * @returns 是否重叠
 */
function isTimeOverlapping(
  day1: string,
  start1: string,
  end1: string,
  day2: string,
  start2: string,
  end2: string
): boolean {
  // 必须是同一天
  if (day1 !== day2) return false;

  const start1Min = timeToMinutes(start1);
  const end1Min = timeToMinutes(end1);
  const start2Min = timeToMinutes(start2);
  const end2Min = timeToMinutes(end2);

  // 检查是否有重叠
  return !(end1Min <= start2Min || end2Min <= start1Min);
}

/**
 * 检测课程之间的时间冲突
 * @param courses 课程数组
 * @returns 更新后的课程数组，包含冲突信息
 */
export function detectConflicts(courses: ReviewCourse[]): ReviewCourse[] {
  const updatedCourses = courses.map((course) => ({
    ...course,
    conflictWith: [] as string[],
  }));

  // 检查每对课程
  for (let i = 0; i < updatedCourses.length; i++) {
    const course1 = updatedCourses[i];
    if (course1.reviewStatus === "approved") continue; // 已批准的课程不参与冲突检测

    for (let j = i + 1; j < updatedCourses.length; j++) {
      const course2 = updatedCourses[j];
      if (course2.reviewStatus === "approved") continue;

      // 检查所有组件组合
      let hasConflict = false;
      for (const comp1 of course1.components) {
        for (const comp2 of course2.components) {
          if (
            isTimeOverlapping(
              comp1.day,
              comp1.start_time,
              comp1.end_time,
              comp2.day,
              comp2.start_time,
              comp2.end_time
            )
          ) {
            hasConflict = true;
            break;
          }
        }
        if (hasConflict) break;
      }

      if (hasConflict) {
        if (!course1.conflictWith) course1.conflictWith = [];
        if (!course2.conflictWith) course2.conflictWith = [];
        course1.conflictWith.push(course2.name);
        course2.conflictWith.push(course1.name);

        // 更新状态为冲突
        if (course1.reviewStatus !== "editing") {
          course1.reviewStatus = "conflict";
        }
        if (course2.reviewStatus !== "editing") {
          course2.reviewStatus = "conflict";
        }
      }
    }
  }

  return updatedCourses;
}

/**
 * 加载时间表数据并转换为 ReviewCourse 格式
 * @returns ReviewCourse 数组
 */
export function loadTimetableData(): ReviewCourse[] {
  const data = timetableData as { semester: string; courses: Course[] };
  
  return data.courses.map((course, index) => ({
    ...course,
    id: `${course.code}-${index}`,
    reviewStatus: "approved" as const, // 默认已批准
    isExpanded: false,
    conflictWith: [],
    // 为第一个课程（Tissue Engineering）设置默认教授信息
    professor: index === 0 ? "Emily" : undefined,
  }));
}

