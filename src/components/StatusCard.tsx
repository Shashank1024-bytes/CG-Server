import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string;
  status: "operational" | "warning" | "critical";
  description?: string;
  trend?: "up" | "down" | "stable";
}

const StatusCard = ({ title, value, status, description, trend }: StatusCardProps) => {
  const statusColors = {
    operational: "text-operational border-operational/20 bg-operational/5",
    warning: "text-warning border-warning/20 bg-warning/5",
    critical: "text-critical border-critical/20 bg-critical/5"
  };

  const trendIcons = {
    up: "↗",
    down: "↘", 
    stable: "→"
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 border-border/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Badge variant="outline" className={cn("text-xs", statusColors[status])}>
          {status}
        </Badge>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {trend && (
          <span className="text-sm text-muted-foreground mb-1">
            {trendIcons[trend]}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      )}
    </Card>
  );
};

export default StatusCard;