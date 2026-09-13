import { Building2, Monitor, Shuffle, ClipboardList, Zap } from "lucide-react";
import { BATCH_BADGE_CONFIG } from "../../config/constants";

const iconMap = {
  OFFLINE: Building2,
  ONLINE: Monitor,
  HYBRID: Shuffle,
  EXAM_ONLY: ClipboardList,
  CRASH_COURSE: Zap,
};

const StudentBadge = ({ batchType = "OFFLINE" }) => {
  const config = BATCH_BADGE_CONFIG[batchType] || BATCH_BADGE_CONFIG.OFFLINE;
  const Icon = iconMap[batchType] || Building2;

  return (
    <span className={`badge ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export default StudentBadge;
