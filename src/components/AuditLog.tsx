import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, User, Shield, CheckCircle, X, Settings } from "lucide-react";

const AuditLog = () => {
  const auditEntries = [
    {
      id: "AUD-001",
      timestamp: "2024-08-28 14:23:15 UTC",
      user: "john.doe@company.com",
      action: "approved_remediation", 
      resource: "Auto Scaling Group: web-servers-asg",
      details: "Scaled out by +1 instance (i-0def456ghi789012)",
      status: "success",
      ip: "192.168.1.100",
      userAgent: "Slack Bot Approval"
    },
    {
      id: "AUD-002", 
      timestamp: "2024-08-28 14:20:42 UTC",
      user: "sarah.smith@company.com",
      action: "dismissed_alert",
      resource: "RDS Instance: database-prod",
      details: "Dismissed memory usage warning after investigation",
      status: "acknowledged",
      ip: "10.0.1.50",
      userAgent: "Web Dashboard"
    },
    {
      id: "AUD-003",
      timestamp: "2024-08-28 14:15:30 UTC", 
      user: "CloudGuardian Bot",
      action: "script_generated",
      resource: "Lambda Function Template",
      details: "Generated S3 duplicate cleanup script for mike.wilson@company.com",
      status: "success",
      ip: "AWS Lambda",
      userAgent: "Automated"
    },
    {
      id: "AUD-004",
      timestamp: "2024-08-28 14:10:18 UTC",
      user: "mike.wilson@company.com", 
      action: "login_2fa",
      resource: "Authentication System",
      details: "Successful 2FA verification for privileged action approval",
      status: "success",
      ip: "172.16.0.25",
      userAgent: "Chrome 128.0.0.0"
    },
    {
      id: "AUD-005",
      timestamp: "2024-08-28 14:05:55 UTC",
      user: "CloudGuardian Bot",
      action: "incident_detected",
      resource: "EC2 Instance: i-0abc123def456789",
      details: "High CPU utilization detected (85% for 8 minutes)",
      status: "triggered",
      ip: "AWS CloudWatch",
      userAgent: "Automated"
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved_remediation":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "dismissed_alert":
        return <X className="h-4 w-4 text-warning" />;
      case "script_generated":
        return <Settings className="h-4 w-4 text-info" />;
      case "login_2fa":
        return <Shield className="h-4 w-4 text-primary" />;
      case "incident_detected":
        return <Calendar className="h-4 w-4 text-critical" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "success",
      acknowledged: "warning", 
      triggered: "critical",
      failed: "critical"
    };
    
    return (
      <Badge variant="outline" className={
        status === "success" ? "text-success border-success/20 bg-success/5" :
        status === "acknowledged" ? "text-warning border-warning/20 bg-warning/5" :
        status === "triggered" ? "text-critical border-critical/20 bg-critical/5" :
        "text-muted-foreground border-border"
      }>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Audit Log</h2>
            <p className="text-sm text-muted-foreground">Complete history of all CloudGuardian actions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search audit logs..."
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {auditEntries.map((entry) => (
            <Card key={entry.id} className="p-4 hover:shadow-medium transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getActionIcon(entry.action)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">{entry.user}</span>
                      <span className="text-sm text-muted-foreground">{entry.action.replace(/_/g, ' ')}</span>
                      {getStatusBadge(entry.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Resource:</span> {entry.resource}
                    </p>
                    <p className="text-sm text-muted-foreground">{entry.details}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span>{entry.timestamp}</span>
                      <span>IP: {entry.ip}</span>
                      <span>User Agent: {entry.userAgent}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 5 of 47 entries
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuditLog;