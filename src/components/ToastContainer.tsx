import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCafe();

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto p-3.5 rounded-2xl bg-[#1e130d] border border-[#c6894c]/50 text-[#f5ece3] shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {toast.type === 'warning' && (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#e5ab6b] shrink-0" />
              )}
              <span className="text-xs font-medium leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#a89080] hover:text-white shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
