import PomodoroTimer from "@/components/PomodoroTimer";
import TodoList from "@/components/TodoList";
import DailyQuote from "@/components/DailyQuote";
import QuickLinks from "@/components/QuickLinks";
import { Settings, Home } from "lucide-react";
import { Link } from "react-router-dom";

function Index() {
  // Function to get the current date in a readable format
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">FocusFlow</h1>
          <p className="text-muted-foreground text-sm">{getCurrentDate()}</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Home className="h-6 w-6" />
          </Link>
          <Link to="/settings">
            <Settings className="h-6 w-6" />
          </Link>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 lg:col-span-1">
          <PomodoroTimer />
        </div>
        <div className="md:col-span-2">
          <TodoList />
        </div>
        <div>
          <DailyQuote />
        </div>
        <div className="md:col-span-3">
          <QuickLinks />
        </div>
      </main>
    </div>
  );
}

export default Index; 