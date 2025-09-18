import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap, CheckCircle, Cpu, Server } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security monitoring and threat detection",
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "24/7 surveillance of your cloud infrastructure",
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "Immediate notifications for security events and anomalies",
    },
    {
      icon: Lock,
      title: "Compliance Ready",
      description: "Meet industry standards with automated compliance reporting",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold">CloudGuardian</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to="/signin"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <CheckCircle className="h-4 w-4 mr-1" /> Trusted by 10,000+ businesses worldwide
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Secure Your <span className="text-primary">Infrastructure</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-10 sm:mb-12">
              CloudGuardian helps you safeguard critical infrastructure with real-time monitoring,
              instant alerts, and enterprise-grade compliance — so you can focus on innovation, not
              security risks.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 shadow-md"
              >
                <Link to="/signup">Start Free Trial</Link>
              </Button>

              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            {/* Logos Row - Wide Horizontal */}
            <div className="w-full flex justify-center mt-10">
              <div className="flex flex-nowrap items-center justify-between w-2/3 gap-12 overflow-x-auto">
                {['aws', 'azure', 'gcp', 'docker'].map((logo) => (
                  <div key={logo} className="flex flex-col items-center">
                    <img
                      src={`/logos/${logo}.svg`}
                      alt={logo.toUpperCase()}
                      className="h-32 sm:h-36 md:h-40 transition-transform duration-300 hover:scale-105"
                    />
                    <p className="text-sm text-muted-foreground mt-2">{logo.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row (extra trust signals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-12">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <Cpu className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h3 className="text-2xl font-bold text-primary">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Threat Detection</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h3 className="text-2xl font-bold text-primary">256-bit</h3>
                <p className="text-sm text-muted-foreground">Encryption</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <Server className="w-6 h-6 mx-auto mb-2 text-primary" />
                <h3 className="text-2xl font-bold text-primary">99.99%</h3>
                <p className="text-sm text-muted-foreground">Uptime SLA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Enterprise Security Features
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Comprehensive protection for your cloud infrastructure with cutting-edge security
                tools
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="shadow-md border-0 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <feature.icon className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CloudGuardian. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
