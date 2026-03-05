import React, { createContext, useContext, useState } from 'react';

const AIContext = createContext<any>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [conversationId, setConversationId] = useState(`conv_${Date.now()}`);
  return <AIContext.Provider value={{ conversationId, setConversationId }}>{children}</AIContext.Provider>;
}

export const useAI = () => useContext(AIContext);
