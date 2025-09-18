import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ScriptHelper from "@/components/ScriptHelper";
import AuditLog from "@/components/AuditLog";
import IncidentAlert from "@/components/IncidentAlert";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "incidents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Incident Management</h2>
                <p className="text-muted-foreground">Monitor and respond to infrastructure alerts</p>
              </div>
            </div>
            <div className="space-y-4">
              <IncidentAlert
                id="INC-001"
                severity="critical"
                title="High CPU Utilization Detected"
                description="EC2 instance i-0abc123def456789 has been running at 85% CPU for the last 8 minutes."
                timestamp="2 minutes ago"
                resource="i-0abc123def456789 (web-server-01)"
                metric="CPUUtilization: 85%"
                suggestedAction="Scale out Auto Scaling Group by +1 instance to distribute load"
              />
              <IncidentAlert
                id="INC-002"
                severity="warning"
                title="Memory Usage Alert"
                description="RDS instance database-prod is showing elevated memory usage patterns."
                timestamp="5 minutes ago"
                resource="database-prod (db.t3.large)"
                metric="DatabaseConnections: 78/80"
                suggestedAction="Monitor connection pooling and consider instance upgrade"
              />
            </div>
          </div>
        );
      case "scripts":
        return <ScriptHelper />;
      case "audit":
        return <AuditLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
