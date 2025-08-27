import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import TestConfiguration from "@/components/TestConfiguration";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const handleStartTest = () => {
    setActiveView("configure");
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onStartTest={handleStartTest} />;
      case "configure":
        return <TestConfiguration onStartTest={() => setActiveView("test")} />;
      case "test":
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold">Running Tests...</h3>
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </div>
          </div>
        );
      case "results":
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Test Results</h3>
              <p className="text-muted-foreground">Results will appear here after running tests!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onStartTest={handleStartTest} />;
    }
  };

  return (
    <div className="min-h-screen bg-animated">
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="container mx-auto px-6 py-8">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Index;
