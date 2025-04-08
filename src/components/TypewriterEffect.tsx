"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  repeat?: boolean;
  onComplete?: () => void;
}

export default function TypewriterEffect({
  texts,
  speed = 50,
  delay = 1500,
  className = "",
  cursorClassName = "bg-orange-500 ml-1 w-2 h-[1.1em] inline-block relative animate-blink top-[0.1em]",
  repeat = false,
  onComplete,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  // const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: !repeat,
    threshold: 0.1,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef<string>("");
  const phaseRef = useRef<"typing" | "waiting" | "deleting">("typing");

  useEffect(() => {
    currentTextRef.current = texts[textIndex];
  }, [texts, textIndex]);

  useEffect(() => {
    if (!inView || isComplete || typeof window === "undefined") return;

    const handleTyping = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Phase: Typing
      if (phaseRef.current === "typing") {
        if (displayText.length < currentTextRef.current.length) {
          setDisplayText(
            currentTextRef.current.slice(0, displayText.length + 1),
          );
          timeoutRef.current = setTimeout(handleTyping, speed);
        } else {
          phaseRef.current = "waiting";
          timeoutRef.current = setTimeout(handleTyping, delay);
        }
      }
      // Phase: Waiting before deletion
      else if (phaseRef.current === "waiting") {
        phaseRef.current = "deleting";
        timeoutRef.current = setTimeout(handleTyping, speed);
      }
      // Phase: Deleting
      else if (phaseRef.current === "deleting") {
        if (displayText.length > 0) {
          setDisplayText((prevText) => prevText.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, speed / 2);
        } else {
          // Move to next text
          const nextIndex = (textIndex + 1) % texts.length;

          if (nextIndex === 0 && !repeat) {
            setIsComplete(true);
            onComplete?.();
          } else {
            setTextIndex(nextIndex);
            phaseRef.current = "typing";
            timeoutRef.current = setTimeout(handleTyping, speed);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    inView,
    isComplete,
    onComplete,
    repeat,
    speed,
    delay,
    textIndex,
    texts,
  ]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className={cursorClassName}>&nbsp;</span>
    </span>
  );
}
