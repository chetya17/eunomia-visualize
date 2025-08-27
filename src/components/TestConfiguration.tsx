import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Bot, 
  Settings2, 
  MessageSquare,
  Target,
  Play,
  Wand2,
  Users,
  Clock,
  Key,
  Plus,
  X
} from "lucide-react";

interface TestConfigurationProps {
  onStartTest: (config: TestConfig) => void;
}

interface TestConfig {
  chatbotType: string;
  systemPrompt: string;
  testCases: number;
  conversationTurns: number;
  apiKey: string;
  customMetrics: string[];
}

const TestConfiguration = ({ onStartTest }: TestConfigurationProps) => {
  const [chatbotType, setChatbotType] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [testCases, setTestCases] = useState([5]);
  const [conversationTurns, setConversationTurns] = useState([3]);
  const [apiKey, setApiKey] = useState("");
  const [customMetrics, setCustomMetrics] = useState([
    "Response Accuracy",
    "Helpfulness", 
    "Professionalism",
    "Problem Resolution",
    "User Satisfaction"
  ]);
  const [newMetric, setNewMetric] = useState("");

  const chatbotTypes = [
    { value: "customer-support", label: "Customer Support", icon: "🎧" },
    { value: "food-delivery", label: "Food Delivery", icon: "🍕" },
    { value: "ecommerce", label: "E-commerce", icon: "🛒" },
    { value: "banking", label: "Banking", icon: "🏦" },
    { value: "healthcare", label: "Healthcare", icon: "🏥" },
    { value: "travel", label: "Travel", icon: "✈️" },
    { value: "education", label: "Educational", icon: "📚" },
    { value: "custom", label: "Custom", icon: "⚙️" }
  ];

  const defaultPrompts = {
    "customer-support": "You are a helpful customer support agent for a technology company. Be empathetic, professional, and solution-oriented. Always try to resolve customer issues efficiently while maintaining a friendly tone.",
    "food-delivery": "You are a food delivery assistant. Help customers with orders, track deliveries, handle complaints, and provide information about restaurants and menus. Be quick and efficient.",
    "ecommerce": "You are an e-commerce shopping assistant. Help customers find products, answer questions about items, assist with orders, and handle returns or exchanges professionally.",
    "banking": "You are a banking assistant. Help customers with account inquiries, transactions, loan information, and financial services. Always prioritize security and privacy.",
    "healthcare": "You are a healthcare assistant. Provide general health information, help with appointment scheduling, and answer questions about services. Never provide medical diagnoses.",
    "travel": "You are a travel assistant. Help customers with bookings, travel information, destination guides, and trip planning. Be knowledgeable about various destinations.",
    "education": "You are an educational assistant. Help students with learning resources, course information, and academic guidance. Be patient and encouraging."
  };

  const handleChatbotTypeChange = (value: string) => {
    setChatbotType(value);
    if (value in defaultPrompts) {
      setSystemPrompt(defaultPrompts[value as keyof typeof defaultPrompts]);
    } else {
      setSystemPrompt("");
    }
  };

  const generateMetrics = () => {
    // Simulate generating custom metrics
    console.log("Generating custom metrics for", chatbotType);
  };

  const addCustomMetric = () => {
    if (newMetric.trim() && !customMetrics.includes(newMetric.trim())) {
      setCustomMetrics([...customMetrics, newMetric.trim()]);
      setNewMetric("");
    }
  };

  const removeMetric = (index: number) => {
    setCustomMetrics(customMetrics.filter((_, i) => i !== index));
  };

  const handleStartTest = () => {
    const config: TestConfig = {
      chatbotType,
      systemPrompt,
      testCases: testCases[0],
      conversationTurns: conversationTurns[0],
      apiKey,
      customMetrics
    };
    onStartTest(config);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Test Configuration</h2>
          <p className="text-muted-foreground">Set up your chatbot testing parameters</p>
        </div>
        <Button 
          onClick={handleStartTest} 
          className="btn-hero gap-2"
          disabled={!chatbotType || !systemPrompt || !apiKey}
        >
          <Play className="h-4 w-4" />
          Start Testing
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chatbot Type Selection */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chatbot Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {chatbotTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={chatbotType === type.value ? "default" : "outline"}
                    className="h-auto p-4 flex flex-col gap-2"
                    onClick={() => handleChatbotTypeChange(type.value)}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm">{type.label}</span>
                  </Button>
                ))}
              </div>
              
              {chatbotType && (
                <Badge variant="secondary" className="mt-4">
                  Selected: {chatbotTypes.find(t => t.value === chatbotType)?.label}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* System Prompt */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                System Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">Customize your chatbot's behavior</Label>
                <Textarea
                  id="system-prompt"
                  placeholder="Enter your system prompt..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generateMetrics}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Metrics
                </Button>
                <Button variant="ghost" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your chatbot API key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Required to connect to your chatbot service for testing
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Test Parameters */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                Test Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Test Cases: {testCases[0]}
                  </Label>
                  <Slider
                    value={testCases}
                    onValueChange={setTestCases}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Conversation Turns: {conversationTurns[0]}
                  </Label>
                  <Slider
                    value={conversationTurns}
                    onValueChange={setConversationTurns}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scoring Metrics */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Scoring Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {customMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                    <span className="text-sm font-medium">{metric}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">0.0-1.0</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive/20"
                        onClick={() => removeMetric(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom metric..."
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomMetric()}
                />
                <Button variant="outline" size="sm" onClick={addCustomMetric}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Preview */}
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg">Test Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{chatbotType ? chatbotTypes.find(t => t.value === chatbotType)?.label : "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Test Cases:</span>
                  <span>{testCases[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Turns:</span>
                  <span>{conversationTurns[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Metrics:</span>
                  <span>{customMetrics.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Duration:</span>
                  <span>{Math.ceil(testCases[0] * conversationTurns[0] * 0.5)} min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestConfiguration;