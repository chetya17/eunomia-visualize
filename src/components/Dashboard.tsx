import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface DashboardProps {
  onStartTest: () => void;
}

const Dashboard = ({ onStartTest }: DashboardProps) => {
  // Mock data for demonstration
  const metrics = [
    {
      title: "Average Score",
      value: "8.4/10",
      change: "+12%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Tests Completed",
      value: "247",
      change: "+23",
      icon: CheckCircle,
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: Target,
      trend: "up"
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      icon: Clock,
      trend: "down"
    }
  ];

  const recentTests = [
    {
      id: "1",
      name: "Customer Support Bot",
      score: 8.7,
      status: "completed",
      timestamp: "2 hours ago",
      scenarios: 15
    },
    {
      id: "2", 
      name: "E-commerce Assistant",
      score: 9.1,
      status: "completed", 
      timestamp: "5 hours ago",
      scenarios: 12
    },
    {
      id: "3",
      name: "Healthcare Chatbot",
      score: 7.8,
      status: "failed",
      timestamp: "1 day ago", 
      scenarios: 8
    }
  ];

  const statusColors = {
    completed: "status-success",
    failed: "status-error",
    running: "status-warning"
  };

  const statusIcons = {
    completed: CheckCircle,
    failed: XCircle,
    running: Clock
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-to-r from-primary/90 to-primary-glow/90 p-8 text-primary-foreground">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">
              Advanced Chatbot Evaluation Platform
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              Test, analyze, and optimize your AI chatbots with comprehensive evaluation metrics and real-world scenarios.
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={onStartTest}
                size="lg" 
                className="btn-hero gap-2"
              >
                <Zap className="h-5 w-5" />
                Start New Test
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge 
                    variant="secondary" 
                    className={metric.trend === 'up' ? 'status-success' : 'status-warning'}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tests & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tests */}
        <Card className="lg:col-span-2 metric-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Tests
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => {
                const StatusIcon = statusIcons[test.status as keyof typeof statusIcons];
                return (
                  <div key={test.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <StatusIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{test.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {test.scenarios} scenarios • {test.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[test.status as keyof typeof statusColors]}>
                        {test.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {test.score}/10
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={onStartTest}
              className="w-full justify-start gap-2 btn-hero"
            >
              <Play className="h-4 w-4" />
              Run Quick Test
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Target className="h-4 w-4" />
              Create Test Suite
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="h-4 w-4" />
              View Analytics
            </Button>
            
            {/* System Status */}
            <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
              <h4 className="text-sm font-medium mb-3">System Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Health</span>
                  <Badge className="status-success">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Queue Load</span>
                  <div className="flex items-center gap-2">
                    <Progress value={35} className="w-16" />
                    <span className="text-xs text-muted-foreground">35%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;