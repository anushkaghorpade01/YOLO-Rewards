import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkModal = ({ isOpen, onClose }: BookmarkModalProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app: save to Supabase yolo_notifications table
    toast({
      description: "You're on the list for the next drop.",
    });
    
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-light-bg rounded-card p-8 shadow-elegant">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-text/60 hover:text-dark-text transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-3xl font-display text-dark-text mb-6">
          Get notified for the next experience
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-dark-text placeholder:text-dark-text/40 focus:outline-none focus:ring-2 focus:ring-coral"
          />
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-coral text-light-text rounded-lg font-sans font-semibold hover:bg-coral-hover transition-colors"
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
};
