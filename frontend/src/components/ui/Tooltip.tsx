import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 500,
  disabled = false,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipOffset = 8;

    let x = 0;
    let y = 0;

    switch (placement) {
      case 'top':
        x = rect.left + rect.width / 2;
        y = rect.top - tooltipOffset;
        break;
      case 'bottom':
        x = rect.left + rect.width / 2;
        y = rect.bottom + tooltipOffset;
        break;
      case 'left':
        x = rect.left - tooltipOffset;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right + tooltipOffset;
        y = rect.top + rect.height / 2;
        break;
    }

    setPosition({ x, y });
  };

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const getTooltipTransform = () => {
    switch (placement) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0%)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0%, -50%)';
      default:
        return 'translate(-50%, -100%)';
    }
  };

  return (
    <div 
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {createPortal(
        <AnimatePresence>
          {isVisible && !disabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className={clsx(
                'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-zinc-900 border border-zinc-700 rounded shadow-lg pointer-events-none max-w-xs',
                className
              )}
              style={{
                left: position.x,
                top: position.y,
                transform: getTooltipTransform(),
              }}
            >
              {content}
              
              {/* Arrow */}
              <div
                className={clsx(
                  'absolute w-2 h-2 bg-zinc-900 border transform rotate-45',
                  {
                    'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-0 border-l-0 border-zinc-700': placement === 'top',
                    'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-0 border-r-0 border-zinc-700': placement === 'bottom',
                    'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0 border-zinc-700': placement === 'left',
                    'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-b-0 border-r-0 border-zinc-700': placement === 'right',
                  }
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}