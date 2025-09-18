import { useState, useEffect } from "react";
import StatusCard from "./StatusCard";
import IncidentAlert from "./IncidentAlert";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Database, Shield, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([
    {
      id: "INC-001",
      severity: "critical" as const,
      title: "High CPU Utilization Detected",
      description: "EC2 instance i-0abc123def456789 has been running at 85% CPU for the last 8 minutes, exceeding the 80% threshold.",
      timestamp: "2 minutes ago",
      resource: "i-0abc123def456789 (web-server-01)",
      metric: "CPUUtilization: 85%",
      suggestedAction: "Scale out Auto Scaling Group by +1 instance to distribute load"
    },
    {
      id: "INC-002", 
      severity: "warning" as const,
      title: "Memory Usage Alert",
      description: "RDS instance database-prod is showing elevated memory usage patterns.",
      timestamp: "5 minutes ago",
      resource: "database-prod (db.t3.large)",
      metric: "DatabaseConnections: 78/80",
      suggestedAction: "Monitor connection pooling and consider instance upgrade"
    }
  ]);

  const [metrics, setMetrics] = useState({
    totalIncidents: 2,
    activeAlerts: 1,
    systemHealth: "85%",
    responseTime: "1.2s"
  });

  const { toast } = useToast();

  const handleApprove = (incidentId: string) => {
    setIncidents(prev => prev.filter(inc => inc.id !== incidentId));
    setMetrics(prev => ({ 
      ...prev, 
      totalIncidents: prev.totalIncidents - 1,
      activeAlerts: Math.max(0, prev.activeAlerts - 1)
    }));
    
    toast({
      title: "Remediation Approved",
      description: "Auto Scaling Group will scale out by +1 instance. ETA: 2-3 minutes.",
    });
  };

  const handleDismiss = (incidentId: string) => {
    setIncidents(prev => prev.filter(inc => inc.id !== incidentId));
    setMetrics(prev => ({ 
      ...prev, 
      totalIncidents: prev.totalIncidents - 1
    }));
    
    toast({
      title: "Incident Dismissed",
      description: "Alert has been marked as acknowledged.",
    });
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        systemHealth: `${Math.floor(Math.random() * 10) + 85}%`,
        responseTime: `${(Math.random() * 0.5 + 1).toFixed(1)}s`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="relative p-8 bg-gradient-hero">
          <div className="text-center text-primary-foreground">
            <h1 className="text-3xl font-bold mb-2">CloudGuardian Bot Active</h1>
            <p className="text-lg opacity-90">AI-powered monitoring and automation protecting your infrastructure</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="outline" className="text-primary-foreground border-primary-foreground/30">
                <Activity className="h-3 w-3 mr-1" />
                Real-time Monitoring
              </Badge>
              <Badge variant="outline" className="text-primary-foreground border-primary-foreground/30">
                <Shield className="h-3 w-3 mr-1" />
                Auto-remediation
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          title="Active Incidents"
          value={metrics.totalIncidents.toString()}
          status={metrics.totalIncidents > 2 ? "critical" : metrics.totalIncidents > 0 ? "warning" : "operational"}
          description="Open incidents requiring attention"
          trend="down"
        />
        <StatusCard
          title="System Health"
          value={metrics.systemHealth}
          status="operational"
          description="Overall infrastructure health score"
          trend="up"
        />
        <StatusCard
          title="Response Time"
          value={metrics.responseTime}
          status="operational"
          description="Average API response time"
          trend="stable"
        />
        <StatusCard
          title="Auto-fixes Applied"
          value="12"
          status="operational"
          description="Successful remediations today"
          trend="up"
        />
      </div>

      {/* Active Incidents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Active Incidents</h2>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
        
        {incidents.length > 0 ? (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentAlert
                key={incident.id}
                {...incident}
                onApprove={() => handleApprove(incident.id)}
                onDismiss={() => handleDismiss(incident.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-success/10 rounded-full">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-lg font-medium text-foreground">All Systems Operational</h3>
              <p className="text-muted-foreground">No active incidents detected. Your infrastructure is running smoothly.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <Server className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">EC2 Instances</p>
              <p className="text-xl font-semibold text-foreground">24 Running</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Database className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">RDS Instances</p>
              <p className="text-xl font-semibold text-foreground">3 Active</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Clock className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg MTTR</p>
              <p className="text-xl font-semibold text-foreground">4.2 min</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;