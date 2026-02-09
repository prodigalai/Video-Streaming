import { useState } from "react";
import { Image, Video, Paperclip, BarChart2, Send, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function CreatorPostInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f0f14] border border-white/10 sm:rounded-2xl overflow-hidden mb-8 shadow-2xl"
    >
      <div className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 border border-white/10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <textarea
              placeholder="What's happening? (Post to your fans...)"
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-muted-foreground resize-none text-base min-h-[40px] pt-2"
              rows={isExpanded ? 3 : 1}
              onFocus={() => setIsExpanded(true)}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {(isExpanded || content.length > 0) && (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between border-t border-white/5 pt-3"
                >
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-violet-400 hover:bg-violet-500/10">
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-blue-400 hover:bg-blue-500/10">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-green-400 hover:bg-green-500/10">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-orange-400 hover:bg-orange-500/10">
                      <BarChart2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                        <ShieldCheck className="h-3 w-3 text-green-500" />
                        Fans Only
                    </div>
                    <Button 
                      disabled={content.length === 0}
                      className="bg-violet-600 hover:bg-violet-700 text-white font-black rounded-full px-6 h-9 transition-all active:scale-95 shadow-lg shadow-violet-500/20"
                    >
                      Post
                      <Send className="h-3.5 w-3.5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
