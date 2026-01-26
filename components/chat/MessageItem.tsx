import { Message } from "@/constants/chat";
import Link from "next/link";
import { getAvatarUrl } from "@/lib/avatarUtils";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isEmail = message.type === "email";
  const isChat = message.type === "chat";
  const avatarUrl = message.avatar ? getAvatarUrl(message.sender, 56, message.avatar) : null;

  return (
    <Link href={`/chat/${message.id}`}>
      <div className="group relative flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800/50 last:border-0">
        <div className="relative shrink-0">
          {avatarUrl ? (
            <div
              className="h-14 w-14 rounded-full bg-cover bg-center shadow-sm"
              style={{ backgroundImage: `url('${avatarUrl}')` }}
            ></div>
          ) : isChat ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                school
              </span>
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-sm">
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                book
              </span>
            </div>
          )}
          {message.unread && (
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 ring-2 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined text-white" style={{ fontSize: "12px" }}>
                mail
              </span>
            </div>
          )}
          {isChat && message.badge === "摘要可用" && (
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary ring-2 ring-white dark:ring-background-dark"></div>
          )}
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex items-center justify-between mb-0.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <p className="text-base font-semibold text-slate-900 dark:text-white truncate min-w-0">{message.sender}</p>
              {message.badge && (
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                    isEmail
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-blue-700/10"
                      : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ring-purple-700/10"
                  }`}
                >
                  {message.badge === "摘要可用" && (
                    <span className="material-symbols-outlined mr-1" style={{ fontSize: "10px" }}>
                      auto_awesome
                    </span>
                  )}
                  {message.badge}
                </span>
              )}
            </div>
            <span
              className={`text-xs whitespace-nowrap ${
                message.unread ? "text-primary font-medium" : "text-slate-400"
              }`}
            >
              {message.timestamp}
            </span>
          </div>
          {isChat && message.preview.includes(":") ? (
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-900/30 pl-1.5 pr-2 py-0.5 text-[10px] font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10">
                <span className="material-symbols-outlined" style={{ fontSize: "10px" }}>
                  auto_awesome
                </span>
                摘要可用
              </span>
            </div>
          ) : null}
          <p className={`text-sm line-clamp-1 break-words ${isChat && message.badge === "摘要可用" ? "text-slate-900 dark:text-slate-200 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
            {isChat && message.preview.includes(":") ? (
              <>
                <span className="text-slate-500 font-normal">
                  {message.preview.split(":")[0]}:
                </span>{" "}
                {message.preview.split(":")[1]}
              </>
            ) : (
              message.preview
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}


