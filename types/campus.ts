export type CampusItemType = "event" | "marketplace" | "social" | "announcement";
export type InteractionMode = "talk" | "photo" | "type";

export interface CampusItem {
  id: string;
  title: string;
  type: CampusItemType;
  description?: string;
  price?: string;
  seller?: string;
  image?: string;
  tags?: string[];
  location?: string;
  time?: string;
}

/**
 * 根据卡片类型智能判断初始交互模式
 */
export function getInitialMode(item: CampusItem | null): InteractionMode {
  if (!item) return "talk";
  
  if (item.type === "marketplace") {
    return "type"; // 商品类默认使用文本模式，方便填写价格等信息
  }
  
  if (item.type === "event" || item.type === "social") {
    return "talk"; // 活动和社交类默认使用语音模式
  }
  
  return "talk"; // 默认使用语音模式
}


