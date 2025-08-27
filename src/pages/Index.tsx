import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import TestConfiguration from "@/components/TestConfiguration";

interface TestConfig {
  chatbotType: string;
  systemPrompt: string;
  testCases: number;
  conversationTurns: number;
  apiKey: string;
  customMetrics: string[];
}

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartTest = () => {
    setActiveView("configure");
  };

  const handleRunTest = async (config: TestConfig) => {
    setTestConfig(config);
    setActiveView("test");
    setIsRunning(true);
    
    // Simulate test execution
    setTimeout(() => {
      setIsRunning(false);
      setActiveView("results");
    }, 5000);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onStartTest={handleStartTest} />;
      case "configure":
        return <TestConfiguration onStartTest={handleRunTest} />;
      case "test":
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4 max-w-lg">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold">Running Tests...</h3>
              {testConfig && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Testing {testConfig.chatbotType} chatbot</p>
                  <p>Running {testConfig.testCases} test cases with {testConfig.conversationTurns} turns each</p>
                  <p>Evaluating {testConfig.customMetrics.length} metrics</p>
                </div>
              )}
              <div className="w-full bg-secondary rounded-full h-2 mt-4">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        );
      case "results":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Test Results</h2>
                <p className="text-muted-foreground">
                  {testConfig ? `Results for ${testConfig.chatbotType} chatbot` : "Test completed successfully"}
                </p>
              </div>
            </div>
            {testConfig && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testConfig.customMetrics.map((metric, index) => (
                  <div key={index} className="metric-card p-4">
                    <h3 className="font-semibold text-sm text-muted-foreground">{metric}</h3>
                    <p className="text-2xl font-bold mt-2">{(0.7 + Math.random() * 0.3).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Score out of 1.0</p>
                  </div>
                ))}
              </div>
            )}
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
