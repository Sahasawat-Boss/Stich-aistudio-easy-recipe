import { useState, useEffect } from 'react';
import { Recipe, RECIPES, INITIAL_FAVORITES } from './data/recipes';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { RecipeDetailScreen } from './components/RecipeDetailScreen';
import { CookingModeScreen } from './components/CookingModeScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>(INITIAL_FAVORITES);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast notification
  const [toast, setToast] = useState<{ message: string; icon?: string; visible: boolean }>({
    message: '',
    icon: 'favorite',
    visible: false,
  });

  const showToast = (message: string, icon = 'favorite') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
  };

  // Synchronize dark class on documentElement for Tailwind
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    showToast(
      next === 'dark' ? 'Warm Obsidian Dark Mode' : 'Warm Sage Light Mode',
      next === 'dark' ? 'dark_mode' : 'light_mode'
    );
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const exists = favorites.includes(id);
    const targetRecipe = RECIPES.find((r) => r.id === id);
    const title = targetRecipe?.title || 'Recipe';

    if (exists) {
      setFavorites((prev) => prev.filter((item) => item !== id));
      showToast(`Removed "${title}" from favorites`, 'heart_broken');
    } else {
      setFavorites((prev) => [...prev, id]);
      showToast(`Saved "${title}" to favorites!`, 'favorite');
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCooking = (recipe: Recipe) => {
    setCookingRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (cookingRecipe) {
      setCookingRecipe(null);
    } else if (selectedRecipe) {
      setSelectedRecipe(null);
    }
  };

  const handleShare = (recipe: Recipe) => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      showToast(`Recipe link copied to clipboard!`, 'share');
    }
  };

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
    setSelectedRecipe(null);
    setCookingRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedRecipe(null);
    setCookingRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  // Determine header title
  const headerTitle = cookingRecipe
    ? 'Cooking Mode'
    : selectedRecipe
    ? 'Recipe Detail'
    : activeTab === 'favorites'
    ? 'Favorites'
    : activeTab === 'search'
    ? 'Search'
    : activeTab === 'profile'
    ? 'Profile'
    : undefined;

  const showBackInHeader = !!cookingRecipe || !!selectedRecipe;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#121413] text-[#f4f5f4]' : 'bg-[#f6fbf5] text-[#181d1a]'
      }`}
    >
      {/* Top Header */}
      <Header
        title={headerTitle}
        showBack={showBackInHeader}
        onBack={handleBack}
        onProfileClick={() => handleTabChange('profile')}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 max-w-lg mx-auto">
        {cookingRecipe ? (
          <CookingModeScreen
            recipe={cookingRecipe}
            onExit={handleBack}
            theme={theme}
            onShowToast={showToast}
          />
        ) : selectedRecipe ? (
          <RecipeDetailScreen
            recipe={selectedRecipe}
            onBack={handleBack}
            onStartCooking={handleStartCooking}
            isFavorite={favorites.includes(selectedRecipe.id)}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
            theme={theme}
          />
        ) : activeTab === 'home' ? (
          <HomeScreen
            onSelectRecipe={handleSelectRecipe}
            onSearchQuery={handleSearchFromHome}
            onSeeAllClick={() => handleTabChange('search')}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            theme={theme}
          />
        ) : activeTab === 'search' ? (
          <SearchScreen
            onSelectRecipe={handleSelectRecipe}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            theme={theme}
            initialQuery={searchQuery}
          />
        ) : activeTab === 'favorites' ? (
          <FavoritesScreen
            favorites={favorites}
            onSelectRecipe={handleSelectRecipe}
            onCookRecipe={handleStartCooking}
            onToggleFavorite={handleToggleFavorite}
            onExploreRecipes={() => handleTabChange('search')}
            theme={theme}
          />
        ) : (
          <ProfileScreen
            savedCount={favorites.length}
            theme={theme}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation (visible on main screens) */}
      {!cookingRecipe && !selectedRecipe && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          theme={theme}
          favoritesCount={favorites.length}
        />
      )}

      {/* Interactive Toast Notification */}
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-semibold ${
          toast.visible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-6 opacity-0 scale-95'
        } ${
          isDark
            ? 'bg-[#282c2a] text-[#f4f5f4] border border-[#303532]'
            : 'bg-[#181d1a] text-white'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[18px] ${
            isDark ? 'text-[#ea580c]' : 'text-amber-400'
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {toast.icon}
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
