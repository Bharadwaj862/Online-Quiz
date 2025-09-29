import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Quiz from "@/pages/quiz";
import Results from "@/pages/results";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz/:categoryId" component={Quiz} />
      <Route path="/results/:sessionId" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="bg-card border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <i className="fas fa-graduation-cap text-2xl text-primary mr-3"></i>
                  <h1 className="text-xl font-bold text-foreground">QuizMaster</h1>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">My Quizzes</a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Statistics</a>
                  <a href="#" className="text-primary font-medium">Profile</a>
                </nav>
                <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </header>
          
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
