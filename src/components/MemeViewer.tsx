import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MemeViewer = () => {
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMeme = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://meme-api.com/gimme");
      const data = await response.json();
      setMemeUrl(data.url);
    } catch (error) {
      console.error("Failed to fetch meme:", error);
      setMemeUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col items-center gap-4 mt-4 p-4">
      <Button
        onClick={fetchMeme}
        disabled={loading}
        variant="secondary"
        className="text-white text-base font-bold uppercase px-6 py-3"
      >
        {loading ? "Loading..." : "Next Meme"}
      </Button>

      {memeUrl && (
        <img
          src={memeUrl}
          alt="Random Meme"
          className="rounded-xl mt-4 max-w-full max-h-[500px]"
        />
      )}
    </Card>
  );
};

export default MemeViewer;
