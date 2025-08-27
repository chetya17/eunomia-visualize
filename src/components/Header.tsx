import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Settings, 
  Download, 
  Play,
  BarChart3
} from "lucide-react";

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ activeView, onViewChange }: HeaderProps) => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Eunomia
              </h1>
              <p className="text-sm text-muted-foreground">AI Chatbot Evaluation Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button 
              variant={activeView === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onViewChange('dashboard')}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeView === 'configure' ? 'default' : 'ghost'}
              onClick={() => onViewChange('configure')}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Configure
            </Button>
            <Button 
              variant={activeView === 'test' ? 'default' : 'ghost'}
              onClick={() => onViewChange('test')}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Test
            </Button>
            <Button 
              variant={activeView === 'results' ? 'default' : 'ghost'}
              onClick={() => onViewChange('results')}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Results
            </Button>
          </nav>

          {/* Status Badge */}
          <Badge variant="secondary" className="gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            System Ready
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;