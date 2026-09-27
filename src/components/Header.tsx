import React from 'react';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  onProfileClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack,
  onProfileClick,
  theme,
  onToggleTheme
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 w-full z-50 pt-safe backdrop-blur-xl transition-colors duration-200 ${
        isDark
          ? 'bg-[#121413]/90 border-b border-[#303532]/70 shadow-[0_1px_8px_rgba(0,0,0,0.4)]'
          : 'bg-[#f6fbf5]/85 border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="h-16 px-4 md:px-6 max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && onBack ? (
            <button
              aria-label="Go back"
              onClick={onBack}
              className={`w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full transition-all active:scale-95 ${
                isDark
                  ? 'text-[#f4f5f4] hover:bg-[#1e211f]'
                  : 'text-[#181d1a] hover:bg-[#ebefea]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          {!showBack ? (
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${
                  isDark
                    ? 'bg-[#ea580c]/20 border border-[#ea580c]/30 text-[#ea580c]'
                    : 'bg-[#476143] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">outdoor_grill</span>
              </div>
              <span
                className={`text-lg font-bold tracking-tight ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                Easy Cooking
              </span>
            </div>
          ) : (
            <h1
              className={`text-lg font-bold tracking-tight truncate ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {title || 'Easy Cooking'}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'Sage Light' : 'Obsidian Dark'} style`}
            onClick={onToggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90 ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#f59e0b] hover:bg-[#252927]'
                : 'bg-[#ebefea] text-[#476143] hover:bg-[#dfe4df]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Profile Avatar */}
          <button
            aria-label="View Profile"
            onClick={onProfileClick}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 ${
              isDark ? 'hover:bg-[#1e211f]' : 'hover:bg-[#ebefea]'
            }`}
          >
            <img
              alt="Emma Wilson"
              className={`w-8 h-8 rounded-full object-cover ring-2 ${
                isDark ? 'ring-[#ea580c]/40' : 'ring-[#476143]/30'
              }`}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgcqsGOJlIXQ-B1hIVHkfGQGQnt_t9C9EjN_pwhv7DyK6Dbbr_5yPVcwuVZ8insLaZWVbTk2cv0vnIH4l23DJsbld_sZEIl-HHfSYn4kDw90T6VTN2mKcTDiB6avfrAcxhfbt-y7sWAeoVMc3cIlW4prn0anOymL60E9k7pkvMIGiVwsmFPcBVv7rH502KABKFosWcfFkeyJOrrrWH1MkENX5U8fdY_YPUr24dmctjXr9ZCxk51us3Xw"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
