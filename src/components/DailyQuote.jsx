import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

function DailyQuote() {
  const [quote, setQuote] = useState({
    text: "Loading...",
    author: "",
  });

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://api.quotable.io/random?tags=inspirational"
      );
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      setQuote({
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Inspiration</CardTitle>
        <Button variant="ghost" size="icon" onClick={fetchQuote}>
          <RotateCw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent>
        <blockquote className="space-y-2">
          <p className="text-lg italic">"{quote.text}"</p>
          <footer className="text-sm text-muted-foreground">
            — {quote.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default DailyQuote; 