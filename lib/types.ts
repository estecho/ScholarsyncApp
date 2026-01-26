// 课程组件类型（LEC, LAB等）
export interface Component {
  class_number: string;
  type: string; // "LEC", "LAB", etc.
  section?: string; // 可选，如 "L01"
  meeting_dates: string[]; // 日期数组，如 ["1/5", "1/12", ...]
  day: string; // 星期几，如 "Monday", "Friday"
  start_time: string; // 开始时间，格式 "HH:MM"，如 "18:45"
  end_time: string; // 结束时间，格式 "HH:MM"，如 "21:30"
  room: string; // 教室，如 "Science Centre L2"
}

// 课程数据
export interface Course {
  code: string; // 课程代码，如 "BMEG 5530"
  name: string; // 课程名称，如 "Tissue Engineering"
  status: string; // 状态，如 "Enrolled"
  units: number; // 学分，如 3.0
  grading_basis: string; // 评分基础，如 "Graded"
  components: Component[]; // 课程组件数组
}

// 完整的时间表数据
export interface TimetableData {
  semester: string;
  courses: Course[];
}

// 课程审核状态
export type CourseReviewStatus = "approved" | "editing" | "conflict";

// 扩展的课程类型，包含审核状态和编辑字段
export interface ReviewCourse extends Course {
  id: string; // 唯一标识符
  reviewStatus: CourseReviewStatus; // 审核状态
  professor?: string; // 教授信息（可选，可编辑）
  isExpanded?: boolean; // 是否展开编辑表单
  conflictWith?: string[]; // 冲突的课程名称数组
}





