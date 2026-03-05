import React, { createContext, useContext, useState } from 'react';
import Toast from '@/src/components/alerts/Toast';

const ToastContext = createContext<{ push: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void }>({ push: () => null });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' }>({ open: false, message: '', severity: 'info' });
  const push = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info') => setToast({ open: true, message, severity });

  return <ToastContext.Provider value={{ push }}>{children}<Toast open={toast.open} message={toast.message} severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))} /></ToastContext.Provider>;
}

export const useToast = () => useContext(ToastContext);
