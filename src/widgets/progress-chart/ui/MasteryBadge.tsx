import { Badge } from '@/components/ui/badge';
import {
  getMasteryLevel,
  masteryLabel,
  masteryBadgeVariant,
} from '@/entities/progress';

interface MasteryBadgeProps {
  level: number;
}

export function MasteryBadge({ level }: MasteryBadgeProps) {
  const mastery = getMasteryLevel(level);
  return (
    <Badge variant={masteryBadgeVariant(mastery)}>
      {masteryLabel(mastery)}
    </Badge>
  );
}
