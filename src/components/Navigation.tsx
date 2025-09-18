import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Code, 
  History, 
  Settings,
  Activity,
  Bell,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";  // ✅ import auth

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();  // ✅ get signOut

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard", 
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "incidents",
      label: "Incidents",
      icon: AlertTriangle,
      badge: "2"
    },
    {
      id: "scripts", 
      label: "Script Helper",
      icon: Code,
      badge: null
    },
    {
      id: "audit",
      label: "Audit Log",
      icon: History,
      badge: null
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();    // ✅ clear auth state
      navigate("/");      // ✅ go back to landing page
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <nav className="bg-sidebar h-full w-64 p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-sidebar-foreground",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-soft" 
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    isActive
                      ? "text-primary-foreground border-primary-foreground/30" 
                      : "text-warning border-warning/30 bg-warning/10"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-sidebar-border">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Activity className="h-4 w-4" />
            <span>System Status</span>
            <div className="ml-auto h-2 w-2 bg-success rounded-full" />
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>

          {/* ✅ Proper Sign Out button */}
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
