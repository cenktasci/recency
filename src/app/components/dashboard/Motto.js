'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Motto() {
  const [text, setText] = useState('');
  const [isTypingRecency, setIsTypingRecency] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingLessIsMore, setIsTypingLessIsMore] = useState(false);
  const [showHeartbeat, setShowHeartbeat] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mottoRef = useRef(null);
  
  const recencyText = 'Recency';
  const lessIsMoreText = 'less is more';
  const typingSpeed = 400;
  const deletingSpeed = 200;
  const pauseDuration = 1000;

  // Set up intersection observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsTypingRecency(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (mottoRef.current) {
      observer.observe(mottoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation logic
  useEffect(() => {
    if (!isVisible) return;
    
    let timer;

    if (isTypingRecency) {
      if (text.length < recencyText.length) {
        timer = setTimeout(() => {
          setText(recencyText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setIsTypingRecency(false);
        }, pauseDuration);
      }
    }

    if (isDeleting) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIsTypingLessIsMore(true);
        setText('');
      }
    }

    if (isTypingLessIsMore) {
      if (text.length < lessIsMoreText.length) {
        timer = setTimeout(() => {
          setText(lessIsMoreText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        setIsTypingLessIsMore(false);
        setShowHeartbeat(true);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isTypingRecency, isDeleting, isTypingLessIsMore, isVisible]);

  return (
    <div className="py-16 bg-gray-50" ref={mottoRef}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent mx-auto mb-12"></div>
        <div className="relative h-16">
          <div className="absolute w-full">
            <h3 className={`text-4xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#1e2f4d] ${showHeartbeat ? 'animate-heartbeat' : ''}`}>
              {text}
              {!showHeartbeat && (
                <span className="inline-block w-0.5 h-8 bg-sky-400 animate-blink"></span>
              )}
            </h3>
          </div>
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent mx-auto mt-12"></div>
      </div>
    </div>
  );
} 