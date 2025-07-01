import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

function QuickLinks() {
  const [links, setLinks] = useState([
    { id: 1, name: "Gmail", url: "https://gmail.com" },
    { id: 2, name: "GitHub", url: "https://github.com" },
    { id: 3, name: "YouTube", url: "https://youtube.com" },
  ]);
  const [newLink, setNewLink] = useState({ name: "", url: "" });

  const addLink = () => {
    if (newLink.name.trim() && newLink.url.trim()) {
      setLinks([...links, { id: Date.now(), ...newLink }]);
      setNewLink({ name: "", url: "" });
    }
  };

  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="link-name">Name</Label>
              <Input
                id="link-name"
                value={newLink.name}
                onChange={(e) =>
                  setNewLink({ ...newLink, name: e.target.value })
                }
                placeholder="Link name..."
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink({ ...newLink, url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addLink}>Add</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between gap-2 rounded-md border p-2"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center gap-1 text-blue-500 hover:underline"
                >
                   <ExternalLink className="h-4 w-4" />
                  {link.name}
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteLink(link.id)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickLinks; 