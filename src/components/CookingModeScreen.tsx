import React, { useState, useEffect } from 'react';
import { Recipe } from '../data/recipes';
import { playChime } from '../utils/sound';

interface CookingModeScreenProps {
  recipe: Recipe;
  onExit: () => void;
  theme: 'light' | 'dark';
  onShowToast: (msg: string, icon?: string) => void;
}

export const CookingModeScreen: React.FC<CookingModeScreenProps> = ({
  recipe,
  onExit,
  theme,
  onShowToast,
}) => {
  const isDark = theme === 'dark';
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // Default to Step 2 (index 1) to match the screenshot!
  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIndex] || steps[0];

  // Timer State
  const initialDuration = currentStep.timerSeconds || 120;
  const [totalTime, setTotalTime] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('Say "Next Step" or "Start Timer"');

  // When step changes, update timer duration
  useEffect(() => {
    const dur = currentStep.timerSeconds || 120;
    setTotalTime(dur);
    setTimeLeft(dur);
    setIsTimerRunning(false);
  }, [currentStepIndex, currentStep]);

  // Timer Interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsTimerRunning(false);
            playChime();
            onShowToast(`${currentStep.timerLabel || 'Timer'} finished!`, 'alarm_on');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, currentStep, onShowToast]);

  const toggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
    } else {
      if (timeLeft === 0) {
        setTimeLeft(totalTime);
      }
      setIsTimerRunning(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onShowToast('Cooking completed! Bon appétit!', 'celebration');
      onExit();
    }
  };

  const handleSimulateVoice = () => {
    setVoiceNotice('Listening: "Start Timer"...');
    setTimeout(() => {
      toggleTimer();
      setVoiceNotice('Timer triggered by voice command!');
      setTimeout(() => {
        setVoiceNotice('Say "Next Step" or "Start Timer"');
      }, 3000);
    }, 1200);
  };

  // Circular timer math
  const circumference = 2 * Math.PI * 20;
  const progressOffset = circumference - (timeLeft / (totalTime || 1)) * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const remainingEstMins = Math.max(1, Math.round(((steps.length - currentStepIndex) * recipe.prepMinutes) / steps.length));

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Top Header Progress */}
      <div className="px-4 md:px-6 pt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
              }`}
            />
            <span
              className={`text-sm md:text-base font-bold tracking-tight ${
                isDark ? 'text-[#f97316]' : 'text-[#476143]'
              }`}
            >
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDark
                ? 'bg-[#1e211f] border border-[#2f3431] text-gray-300'
                : 'bg-[#ebefea] text-[#434841]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isDark ? 'text-[#f97316]' : 'text-[#476143]'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              timer
            </span>
            <span className="text-xs font-semibold">
              Est. {remainingEstMins} mins left
            </span>
          </div>
        </div>

        {/* Step Progress Segments */}
        <div className="flex items-center gap-1.5 w-full mt-1">
          {steps.map((_, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full relative overflow-hidden transition-all duration-300 ${
                  isCompleted
                    ? isDark
                      ? 'bg-[#ea580c]'
                      : 'bg-[#476143]'
                    : isActive
                    ? isDark
                      ? 'bg-[#ea580c]'
                      : 'bg-[#5f7a5a]'
                    : isDark
                    ? 'bg-[#262a27]'
                    : 'bg-[#dfe4df]'
                }`}
              >
                {isActive && (
                  <div
                    className={`absolute inset-0 animate-pulse ${
                      isDark ? 'bg-[#f97316]/50' : 'bg-[#cdebc4]/60'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Card */}
      <div className="px-4 md:px-6 mt-4 flex flex-col gap-4">
        <div
          className={`rounded-3xl p-5 shadow-lg flex flex-col gap-4 ${
            isDark
              ? 'bg-[#1e211f] border border-[#2f3431]'
              : 'bg-white border border-black/[0.04]'
          }`}
        >
          {/* Step Photo */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-black/40">
            <img
              src={
                currentStep.image ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_RzckeEStCFKDr7T2rq0JsaiuJfyS4tGJ9E7RXpcrJTexwpDi6gKZmvlS0Jr6T_L9pN09-eIRPSjD_yLO9Os7Tk_UZpBI18mfCLbWytBXY3PHMjvkB1o4WynjPGwc3vIa1CgpUXhu0Z36kSnF-joitJ2y3sMp-uTINwSw51V9mvwrPRAJGSoNdNDeue6Q1hLAo9MyVoAgjPcQT9kY79XqyVEI-Q3WeJ9h7x1bQjsTXL8W0XoK3AFFA'
              }
              alt={currentStep.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute top-3 left-3 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm ${
                isDark
                  ? 'bg-[#121413]/85 border border-white/10'
                  : 'bg-black/70 text-white'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isDark ? 'text-[#f97316]' : 'text-amber-400'
                }`}
              >
                local_fire_department
              </span>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                {currentStep.heatLevel || 'MEDIUM-HIGH HEAT'}
              </span>
            </div>
            <div
              className={`absolute bottom-3 right-3 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                isDark
                  ? 'bg-[#121413]/90 border border-white/10'
                  : 'bg-white/90 text-gray-800'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[14px] ${
                  isDark ? 'text-[#f97316]' : 'text-[#476143]'
                }`}
              >
                soup_kitchen
              </span>
              <span className="text-[11px] font-semibold">
                {currentStep.stageBadge || 'Prep & Sear'}
              </span>
            </div>
          </div>

          {/* Title & Instruction */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  isDark
                    ? 'bg-[#262a27] text-[#f97316] border border-[#2f3431]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                {currentStep.stepNumber}
              </span>
              <span
                className={`text-sm font-semibold ${
                  isDark ? 'text-gray-400' : 'text-[#5a6058]'
                }`}
              >
                {currentStep.title}
              </span>
            </div>
            <h2
              className={`text-lg md:text-xl font-bold leading-relaxed ${
                isDark ? 'text-white' : 'text-[#181d1a]'
              }`}
            >
              {currentStep.instruction}
            </h2>
          </div>

          {/* Chef's Tip */}
          <div
            className={`p-4 rounded-2xl flex items-start gap-3 ${
              isDark
                ? 'bg-[#262a27] border border-[#2f3431]'
                : 'bg-[#f0f5f0]'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                isDark
                  ? 'bg-[#ea580c]/15 text-[#f97316] border border-[#ea580c]/30'
                  : 'bg-[#476143] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className={`text-xs font-bold ${
                  isDark ? 'text-[#f97316]' : 'text-[#476143]'
                }`}
              >
                Chef&apos;s Tip
              </span>
              <p
                className={`text-xs md:text-sm leading-snug ${
                  isDark ? 'text-gray-300' : 'text-[#434841]'
                }`}
              >
                {currentStep.tip ||
                  "Don't overcrowd the pan so the proteins get a nice golden sear instead of steaming in their own juices."}
              </p>
            </div>
          </div>
        </div>

        {/* Step Timer Widget */}
        <div
          className={`rounded-3xl p-5 shadow-lg flex items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#1e211f] border border-[#2f3431]'
              : 'bg-white border border-black/[0.04]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`relative flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ${
                isDark
                  ? 'bg-[#262a27] border border-[#2f3431]'
                  : 'bg-[#f0f5f0]'
              }`}
            >
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  className={isDark ? 'text-[#333734]' : 'text-[#dfe4df]'}
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle
                  className={`transition-all duration-1000 ease-linear ${
                    isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                  }`}
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
              <span
                className={`material-symbols-outlined absolute text-[20px] ${
                  isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                }`}
              >
                {timeLeft === 0 ? 'check' : isTimerRunning ? 'pause' : 'timer'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                {currentStep.timerLabel || 'Step Timer'}
              </span>
              <span
                className={`text-2xl md:text-3xl font-extrabold tabular-nums leading-none mt-1 ${
                  isDark ? 'text-white' : 'text-[#181d1a]'
                }`}
              >
                {formattedTime}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTimer}
            className={`h-12 px-5 rounded-xl text-sm font-bold flex items-center gap-2 active:scale-95 transition-all text-white shrink-0 ${
              isDark
                ? 'bg-[#ea580c] hover:bg-[#c2410c] shadow-md shadow-[#ea580c]/25'
                : 'bg-[#476143] hover:bg-[#344d31] shadow-md shadow-[#476143]/20'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isTimerRunning ? 'pause' : timeLeft === 0 ? 'replay' : 'play_arrow'}
            </span>
            <span>{isTimerRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : timeLeft < totalTime ? 'Resume' : 'Start'}</span>
          </button>
        </div>

        {/* Voice Control Indicator */}
        <div
          onClick={handleSimulateVoice}
          className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
            isDark
              ? 'bg-[#1e211f] border border-[#2f3431] hover:bg-[#252927]'
              : 'bg-[#f0f5f0] hover:bg-[#ebefea]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-gray-400 text-[22px]">mic</span>
            <div className="flex flex-col">
              <span
                className={`text-xs md:text-sm font-bold ${
                  isDark ? 'text-white' : 'text-[#181d1a]'
                }`}
              >
                Voice Control Active
              </span>
              <span className="text-xs text-gray-400">{voiceNotice}</span>
            </div>
          </div>
          <div
            className={`w-2.5 h-2.5 rounded-full animate-ping ${
              isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
            }`}
          />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 pb-safe px-4 md:px-6 pt-3 shadow-xl backdrop-blur-xl ${
          isDark
            ? 'bg-[#121413]/90 border-t border-[#2f3431]'
            : 'bg-[#f6fbf5]/90 border-t border-black/[0.04]'
        }`}
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto w-full py-2">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={handlePrevStep}
            className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-1.5 text-sm font-bold active:scale-95 transition-all ${
              currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
            } ${
              isDark
                ? 'bg-[#2c302d] hover:bg-[#383d39] text-[#f4f5f4] border border-[#3a3f3b]'
                : 'bg-[#e5e9e4] hover:bg-[#dfe4df] text-gray-800'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className={`flex-[1.5] h-14 rounded-2xl flex items-center justify-center gap-1.5 text-sm font-bold text-white shadow-lg active:scale-95 transition-all ${
              isDark
                ? 'bg-[#ea580c] hover:bg-[#c2410c] shadow-[#ea580c]/30'
                : 'bg-[#476143] hover:bg-[#344d31] shadow-[#476143]/20'
            }`}
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Finish & Enjoy! 🎉' : 'Next Step'}</span>
            {currentStepIndex < steps.length - 1 && (
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
