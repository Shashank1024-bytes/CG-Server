import { Button } from "@/components/ui/button";
import { Shield, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";  // ✅ bring in auth hook

const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth(); // ✅ get signOut function

  const handleSignOut = async () => {
    try {
      await signOut();            // clear auth state (token, session, etc.)
      navigate("/");              // send user back to landing page
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <header className="border-b border-border bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section: Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-medium">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  CloudGuardian Bot
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered DevOps Automation
                </p>
              </div>
            </div>
          </div>

          {/* Right section: Action buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              Profile
            </Button>
            {/* ✅ Proper sign-out */}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
