"use client";

import { useRouter } from "next/navigation";
import { SimpleHeader } from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { useState, useEffect, useMemo } from "react";
import { motion, PanInfo } from "framer-motion";
import { ReviewCourse, CourseReviewStatus } from "@/lib/types";
import {
  loadTimetableData,
  formatScheduleDisplay,
  detectConflicts,
} from "@/lib/courseUtils";

export default function ReviewPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<ReviewCourse[]>([]);
  const [swipedCardId, setSwipedCardId] = useState<string | null>(null);

  // 加载初始数据
  useEffect(() => {
    const initialCourses = loadTimetableData();
    // 初始加载后检测冲突
    const coursesWithConflicts = detectConflicts(initialCourses);
    setCourses(coursesWithConflicts);
  }, []);

  // 辅助函数：更新课程并重新检测冲突
  const updateCoursesWithConflictDetection = (
    updater: (prev: ReviewCourse[]) => ReviewCourse[]
  ) => {
    setCourses((prev) => {
      const updated = updater(prev);
      return detectConflicts(updated);
    });
  };

  // 检查课程内容是否完整
  const isCourseComplete = (course: ReviewCourse): boolean => {
    // 检查课程名称是否非空
    if (!course.name || course.name.trim() === "") {
      return false;
    }
    // 检查所有 components 的 room 字段是否都有值
    if (course.components.length === 0) {
      return false;
    }
    for (const component of course.components) {
      if (!component.room || component.room.trim() === "") {
        return false;
      }
    }
    // 检查教授信息是否有值（可选，但建议有值）
    // 这里我们要求教授信息必须有值才算完整
    if (!course.professor || course.professor.trim() === "") {
      return false;
    }
    return true;
  };

  // 切换课程展开状态
  const toggleExpand = (courseId: string) => {
    setCourses((prev) => {
      // 先更新展开状态
      const updatedCourses = prev.map((course) => {
        if (course.id !== courseId) {
          return course;
        }
        const wasExpanded = course.isExpanded || false;
        const willBeExpanded = !wasExpanded;

        // 展开时：设置状态为 editing
        if (willBeExpanded) {
          return {
            ...course,
            isExpanded: true,
            reviewStatus: "editing" as CourseReviewStatus,
          };
        }

        // 收起时：先更新 isExpanded，状态稍后根据冲突和完整性设置
        return {
          ...course,
          isExpanded: false,
        };
      });

      // 检测冲突
      const coursesWithConflicts = detectConflicts(updatedCourses);

      // 对于收起状态的课程，根据冲突和内容完整性设置最终状态
      return coursesWithConflicts.map((course) => {
        if (course.id !== courseId || course.isExpanded) {
          return course;
        }

        // 检查是否有冲突
        const hasConflict =
          course.conflictWith && course.conflictWith.length > 0;
        if (hasConflict) {
          return {
            ...course,
            reviewStatus: "conflict" as CourseReviewStatus,
          };
        }

        // 检查内容完整性
        const isComplete = isCourseComplete(course);
        return {
          ...course,
          reviewStatus: isComplete
            ? ("approved" as CourseReviewStatus)
            : ("editing" as CourseReviewStatus),
        };
      });
    });
  };

  // 更新课程名称
  const updateCourseName = (courseId: string, newName: string) => {
    updateCoursesWithConflictDetection((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, name: newName } : course
      )
    );
  };

  // 更新课程地点（更新所有 components 的地点）
  const updateCourseLocation = (courseId: string, newLocation: string) => {
    updateCoursesWithConflictDetection((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              components: course.components.map((comp) => ({
                ...comp,
                room: newLocation,
              })),
            }
          : course
      )
    );
  };

  // 更新单个 component 的地点
  const updateComponentLocation = (
    courseId: string,
    componentIndex: number,
    newLocation: string
  ) => {
    updateCoursesWithConflictDetection((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              components: course.components.map((comp, idx) =>
                idx === componentIndex ? { ...comp, room: newLocation } : comp
              ),
            }
          : course
      )
    );
  };

  // 更新教授信息
  const updateProfessor = (courseId: string, professor: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, professor } : course
      )
    );
  };


  // 删除课程
  const deleteCourse = (courseId: string) => {
    if (confirm("确定要删除这门课程吗？")) {
      updateCoursesWithConflictDetection((prev) =>
        prev.filter((course) => course.id !== courseId)
      );
    }
  };

  // 添加新课程
  const addNewCourse = () => {
    const newCourse: ReviewCourse = {
      id: `new-course-${Date.now()}`,
      code: "",
      name: "",
      status: "Enrolled",
      units: 0,
      grading_basis: "Graded",
      components: [
        {
          class_number: "",
          type: "LEC",
          meeting_dates: [],
          day: "Monday",
          start_time: "09:00",
          end_time: "10:00",
          room: "",
        },
      ],
      reviewStatus: "editing",
      isExpanded: true,
      conflictWith: [],
    };

    setCourses((prev) => {
      const updated = [...prev, newCourse];
      return detectConflicts(updated);
    });
  };

  // 计算已批准的课程数量
  const approvedCount = useMemo(
    () => courses.filter((c) => c.reviewStatus === "approved").length,
    [courses]
  );

  // 渲染课程状态图标
  const renderStatusIcon = (course: ReviewCourse) => {
    // 如果有冲突，显示冲突图标
    if (course.reviewStatus === "conflict") {
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 shrink-0">
          <span className="material-symbols-outlined">event_busy</span>
        </div>
      );
    }

    // 否则根据内容完整性显示图标
    const isComplete = isCourseComplete(course);
    if (isComplete) {
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shrink-0">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shrink-0">
          <span className="material-symbols-outlined">warning</span>
        </div>
      );
    }
  };

  // 处理滑动结束
  const handleDragEnd = (courseId: string, info: PanInfo) => {
    const threshold = -60; // 滑动阈值
    if (info.offset.x < threshold) {
      // 滑动超过阈值，显示删除按钮
      setSwipedCardId(courseId);
    } else {
      // 滑动未超过阈值，恢复原位置
      setSwipedCardId(null);
    }
  };

  // 处理卡片点击（展开/收起）
  const handleCardClick = (course: ReviewCourse, e: React.MouseEvent) => {
    // 如果点击的是按钮、输入框或其他交互元素，不处理
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('label') ||
      target.closest('.space-y-5') // 编辑表单区域
    ) {
      return;
    }
    // 如果卡片已滑动，先恢复位置
    if (swipedCardId === course.id) {
      setSwipedCardId(null);
      return;
    }
    
    // 如果卡片已展开，点击卡片头部区域则收起
    if (course.isExpanded) {
      // 检查点击的是否是卡片头部区域（不是编辑表单区域）
      if (!target.closest('.space-y-5')) {
        toggleExpand(course.id);
      }
    } else {
      // 如果卡片未展开，则展开
      toggleExpand(course.id);
    }
  };

  // 点击外部区域重置滑动状态和收起展开的卡片
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 重置滑动状态
      if (swipedCardId && !target.closest('.swipeable-card')) {
        setSwipedCardId(null);
      }
      
      // 收起所有展开的卡片（如果点击的是卡片外的区域）
      if (!target.closest('.swipeable-card')) {
        setCourses((prev) => {
          const hasExpanded = prev.some((course) => course.isExpanded);
          if (!hasExpanded) return prev;
          
          // 检测冲突
          const coursesWithConflicts = detectConflicts(prev);
          
          return coursesWithConflicts.map((course) => {
            if (!course.isExpanded) return course;
            
            // 收起卡片并更新状态
            const hasConflict =
              course.conflictWith && course.conflictWith.length > 0;
            if (hasConflict) {
              return {
                ...course,
                isExpanded: false,
                reviewStatus: "conflict" as CourseReviewStatus,
              };
            }
            
            const isComplete = isCourseComplete(course);
            return {
              ...course,
              isExpanded: false,
              reviewStatus: isComplete
                ? ("approved" as CourseReviewStatus)
                : ("editing" as CourseReviewStatus),
            };
          });
        });
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [swipedCardId]);

  // 渲染课程卡片
  const renderCourseCard = (course: ReviewCourse) => {
    const scheduleText = formatScheduleDisplay(course.components);
    const isEditing = course.reviewStatus === "editing";
    const isConflict = course.reviewStatus === "conflict";
    const isApproved = course.reviewStatus === "approved";
    const isSwiped = swipedCardId === course.id;

    return (
      <div className="relative overflow-hidden rounded-2xl swipeable-card">
        {/* 删除按钮区域 */}
        <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center bg-red-500 z-0 rounded-r-2xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteCourse(course.id);
              setSwipedCardId(null);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-2xl">
              delete
            </span>
          </button>
        </div>
        {/* 可滑动的卡片 */}
        <motion.div
          key={course.id}
          drag="x"
          dragConstraints={{ left: -80, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => handleDragEnd(course.id, info)}
          animate={{ x: isSwiped ? -80 : 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => handleCardClick(course, e)}
          className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm transition-all cursor-pointer z-10 ${
            isEditing
              ? "shadow-lg ring-2 ring-primary/20 dark:ring-primary/40 border border-transparent"
              : isConflict
              ? "ring-2 ring-red-500/20 dark:ring-red-500/40"
              : "border border-slate-100 dark:border-slate-700 hover:shadow-md"
          }`}
        >
        {/* 课程头部 */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4 flex-1 min-w-0 justify-center items-center">
            {renderStatusIcon(course)}
            <div className="flex flex-col pt-1 flex-1 min-w-0">
              <h3 className="font-bold text-base text-slate-900 dark:text-white break-words">
                {course.name}
              </h3>
              {/* 时间显示 */}
              {scheduleText ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 break-words">
                  {scheduleText}
                </p>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic break-words">
                  Time not set
                </p>
              )}
              {/* 教室显示 */}
              {(() => {
                // 只显示第一个有效的教室
                const firstRoom = course.components.find(
                  (c) => c.room && c.room.trim() !== ""
                )?.room;
                if (firstRoom) {
                  return (
                    <p className="text-sm text-slate-500 dark:text-slate-400 break-words">
                      {firstRoom}
                    </p>
                  );
                }
                return (
                  <p className="text-sm text-slate-400 dark:text-slate-500 italic break-words">
                    Location not set
                  </p>
                );
              })()}
              {/* 教授显示 */}
              {course.professor && course.professor.trim() !== "" ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 break-words">
                  {course.professor}
                </p>
              ) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 italic break-words">
                  Professor not set
                </p>
              )}
              {isConflict && course.conflictWith && course.conflictWith.length > 0 && (
                <p className="text-sm text-red-500 font-medium mt-1 break-words">
                  Overlaps with &apos;{course.conflictWith[0]}&apos;
                  {course.conflictWith.length > 1 &&
                    ` and ${course.conflictWith.length - 1} more`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 编辑表单 */}
        {course.isExpanded && (
          <div className="space-y-5 animate-fade-in-down">
            {/* 课程名称编辑 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">
                Course Name
              </label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 shadow-sm transition-all"
                type="text"
                value={course.name}
                onChange={(e) => updateCourseName(course.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* 地点编辑 - 如果有多个 components，分别编辑 */}
            {course.components.map((component, compIndex) => (
              <div key={compIndex} className="relative space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Location {course.components.length > 1 ? `(${component.type})` : ""}
                  </label>
                  {!component.room && (
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <span className="text-[10px] font-bold text-primary tracking-wide uppercase">
                        AI Suggestion
                      </span>
                    </div>
                  )}
                </div>
                {component.room ? (
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 shadow-sm transition-all"
                    type="text"
                    value={component.room}
                    onChange={(e) =>
                      updateComponentLocation(course.id, compIndex, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="relative group/location">
                    <input
                      className="w-full bg-white dark:bg-slate-900 border-2 border-primary/30 dark:border-primary/50 rounded-t-xl rounded-b-none text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary h-12 px-4 shadow-sm z-20 relative"
                      placeholder="Enter location..."
                      type="text"
                      value={component.room || ""}
                      onChange={(e) =>
                        updateComponentLocation(course.id, compIndex, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="bg-primary/5 dark:bg-primary/10 border-x-2 border-b-2 border-primary/30 dark:border-primary/50 rounded-b-xl p-3 flex gap-3 items-start backdrop-blur-sm z-10 relative">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-1.5 shrink-0 shadow-sm mt-0.5 ring-1 ring-slate-100 dark:ring-slate-700">
                        <span className="material-symbols-outlined text-primary text-base leading-none">
                          magic_button
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                          System did not capture location, but based on previous
                          years&apos; data, usually in{" "}
                          <button
                            onClick={() =>
                              updateComponentLocation(
                                course.id,
                                compIndex,
                                "Building C"
                              )
                            }
                            className="inline-flex items-center gap-0.5 font-bold text-primary hover:text-blue-700 dark:hover:text-blue-400 hover:underline decoration-2 underline-offset-2 transition-all ml-0.5"
                          >
                            Building C{" "}
                            <span className="material-symbols-outlined text-sm">
                              add_circle
                            </span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 教授信息编辑 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">
                Professor
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-xl pointer-events-none">
                  person
                </span>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 pr-4 shadow-sm transition-all"
                  placeholder="e.g. Dr. Johnson"
                  type="text"
                  value={course.professor || ""}
                  onChange={(e) => updateProfessor(course.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        )}
        </motion.div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased text-slate-900 dark:text-white">
        <SimpleHeader title="审核课程" backHref="/scan" />
        <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pb-32 pt-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
              我们从您的上传中找到了 {courses.length} 门课程。
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              请在保存到日历前审核详细信息。
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {courses.map((course) => renderCourseCard(course))}
            {/* 手动添加课程按钮 */}
            <button
              onClick={addNewCourse}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm transition-all cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:shadow-md flex items-center justify-center gap-3 min-h-[80px]"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-2xl">add</span>
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium text-base">
                Add Course Manually
              </span>
            </button>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
          <div className="max-w-lg mx-auto w-full p-4 pb-8">
            <button
              onClick={() => router.push("/dashboard/day")}
              className="w-full bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-base h-14 rounded-2xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>
                确认并添加 {courses.length} 门课程
              </span>
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
