import React from 'react';

export type TabType = 'home' | 'search' | 'favorites' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: 'light' | 'dark';
  favoritesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  theme,
  favoritesCount = 0,
}) => {
  const isDark = theme === 'dark';

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'favorites', label: 'Favorites', icon: 'favorite' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      className={`fixed bottom-0 w-full z-50 pb-safe backdrop-blur-xl transition-colors duration-200 ${
        isDark
          ? 'bg-[#121413]/90 border-t border-[#303532]/70 shadow-[0_-1px_12px_rgba(0,0,0,0.5)]'
          : 'bg-[#f6fbf5]/85 border-t border-black/[0.04] shadow-[0_-1px_12px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-colors relative active:scale-95 ${
                isActive
                  ? isDark
                    ? 'text-[#ea580c] font-bold'
                    : 'text-[#476143] font-bold'
                  : isDark
                  ? 'text-[#9ea3a0] hover:text-[#f4f5f4]'
                  : 'text-[#5a6058] hover:text-[#181d1a]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px] relative"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
                {tab.id === 'favorites' && favoritesCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
                      isDark
                        ? 'bg-[#ea580c] text-white'
                        : 'bg-[#476143] text-white'
                    }`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </span>
              <span className="text-[11px] tracking-wide mt-0.5 font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
