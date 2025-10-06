import { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIHelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to help you navigate NDG. Ask me about our products, courses, or how to get started!',
    },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'What courses do you offer?',
    'How much does it cost?',
    'What\'s the refund policy?',
    'How do I book a call?',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'I understand you\'re asking about "' + input + '". Let me help you with that! Our team offers comprehensive digital growth programmes starting from £97/month. Would you like to book a free strategy call?',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);

    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="AI Help"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>

      {/* AI Panel */}
      {isOpen && (
        <Card className="fixed bottom-40 right-6 z-50 w-80 sm:w-96 h-[500px] shadow-2xl flex flex-col">
          <div className="p-4 border-b border-border bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-semibold">NDG AI Assistant</h3>
            </div>
            <p className="text-xs opacity-90 mt-1">
              Ask me anything about NDG
            </p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs p-2 rounded-lg bg-muted hover:bg-muted/70 text-left transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="bg-input-background"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}