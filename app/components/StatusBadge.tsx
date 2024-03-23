import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  DONE: { label: 'Done', color: 'green' },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  );
};

export default StatusBadge;
