import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Server, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface IncidentAlertProps {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  resource: string;
  metric: string;
  suggestedAction: string;
  onApprove?: () => void;
  onDismiss?: () => void;
}

const IncidentAlert = ({
  id,
  severity,
  title,
  description,
  timestamp,
  resource,
  metric,
  suggestedAction,
  onApprove,
  onDismiss
}: IncidentAlertProps) => {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      badge: "critical",
      border: "border-l-critical"
    },
    warning: {
      icon: AlertTriangle,
      badge: "warning", 
      border: "border-l-warning"
    },
    info: {
      icon: Server,
      badge: "info",
      border: "border-l-info"
    }
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "p-4 border-l-4 hover:shadow-medium transition-all duration-300",
      config.border
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              severity === "critical" && "bg-critical/10",
              severity === "warning" && "bg-warning/10", 
              severity === "info" && "bg-info/10"
            )}>
              <Icon className={cn(
                "h-5 w-5",
                severity === "critical" && "text-critical",
                severity === "warning" && "text-warning",
                severity === "info" && "text-info"
              )} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {config.badge}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-foreground">Resource:</span>
              <span className="ml-2 text-muted-foreground">{resource}</span>
            </div>
            <div>
              <span className="font-medium text-foreground">Metric:</span>
              <span className="ml-2 text-muted-foreground">{metric}</span>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium text-foreground">Suggested Action:</span>
              <span className="ml-2 text-muted-foreground">{suggestedAction}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button 
            variant="approve" 
            size="sm"
            onClick={onApprove}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Approve & Execute
          </Button>
          <Button 
            variant="dismiss" 
            size="sm"
            onClick={onDismiss}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Dismiss
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IncidentAlert;