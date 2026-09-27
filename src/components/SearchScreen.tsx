import React, { useState, useMemo } from 'react';
import { Recipe, RECIPES } from '../data/recipes';

interface SearchScreenProps {
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  theme: 'light' | 'dark';
  initialQuery?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  theme,
  initialQuery = '',
}) => {
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'Popular' | 'Quickest' | 'Rating'>('Popular');
  const [filterUnder30, setFilterUnder30] = useState(false);
  const [filterEasyPrep, setFilterEasyPrep] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const popularTags = [
    { emoji: '🍗', label: 'Chicken' },
    { emoji: '🍚', label: 'Rice' },
    { emoji: '🍝', label: 'Pasta' },
    { emoji: '🌶️', label: 'Thai' },
    { emoji: '🥗', label: 'Healthy' },
    { emoji: '🥞', label: 'Breakfast' },
    { emoji: '⚡', label: 'Quick meals' },
    { emoji: '🥑', label: 'Avocado' },
  ];

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery('Quick chicken skillet');
    }, 1400);
  };

  const handleSortToggle = () => {
    const orders: ('Popular' | 'Quickest' | 'Rating')[] = ['Popular', 'Quickest', 'Rating'];
    const nextIdx = (orders.indexOf(sortBy) + 1) % orders.length;
    setSortBy(orders[nextIdx]);
  };

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // Query match
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.subtitle.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.tags.some((t) => t.toLowerCase().includes(query)) ||
        recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(query));

      if (!matchesQuery) return false;

      // Under 30 mins
      if (filterUnder30 && recipe.prepMinutes > 30) return false;

      // Easy prep
      if (filterEasyPrep && recipe.difficulty !== 'Easy') return false;

      // Difficulty from modal
      if (selectedDifficulty !== 'All' && recipe.difficulty !== selectedDifficulty) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Quickest') return a.prepMinutes - b.prepMinutes;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // Popular
    });
  }, [searchQuery, filterUnder30, filterEasyPrep, selectedDifficulty, sortBy]);

  const activeFilterCount = (filterUnder30 ? 1 : 0) + (filterEasyPrep ? 1 : 0) + (selectedDifficulty !== 'All' ? 1 : 0);

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      <div className="px-4 md:px-6 pt-2 pb-4 flex flex-col gap-2">
        <h1
          className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
          }`}
        >
          Find your next meal
        </h1>
        <p
          className={`text-xs md:text-sm ${
            isDark ? 'text-[#9ea3a0]' : 'text-[#434841]'
          }`}
        >
          Search over 2,000+ tested recipes and ingredients
        </p>

        {/* Search Input Bar */}
        <div className="mt-2 relative flex items-center">
          <div
            className={`absolute left-4 flex items-center pointer-events-none ${
              isDark ? 'text-[#ea580c]' : 'text-[#476143]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients, chefs..."
            className={`w-full h-12 pl-12 pr-24 rounded-2xl text-sm shadow-sm outline-none transition-all duration-200 ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4] placeholder:text-[#686d69] focus:border-[#ea580c] focus:shadow-md'
                : 'bg-white border border-black/[0.04] text-[#181d1a] placeholder:text-gray-400 focus:border-[#476143] focus:shadow-md'
            }`}
          />
          <div className="absolute right-3 flex items-center gap-1">
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear input"
                onClick={() => setSearchQuery('')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Voice search"
              onClick={handleVoiceSearch}
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all ${
                isVoiceActive
                  ? 'bg-red-500 text-white animate-pulse'
                  : isDark
                  ? 'text-[#ea580c] hover:bg-[#252927]'
                  : 'text-[#476143] hover:bg-[#f0f5f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isVoiceActive ? 'record_voice_over' : 'mic'}
              </span>
            </button>
          </div>
        </div>

        {/* Filter & Sort Quick Controls */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className={`flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-all shrink-0 ${
              activeFilterCount > 0
                ? isDark
                  ? 'bg-[#ea580c] text-white'
                  : 'bg-[#476143] text-white'
                : isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4]'
                : 'bg-white border border-black/[0.04] text-[#181d1a]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                activeFilterCount > 0 ? 'text-white' : isDark ? 'text-[#ea580c]' : 'text-[#476143]'
              }`}
            >
              tune
            </span>
            <span>Filters</span>
            <span
              className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                activeFilterCount > 0
                  ? 'bg-white text-gray-900'
                  : isDark
                  ? 'bg-[#ea580c]/20 text-[#ea580c]'
                  : 'bg-[#cdebc4] text-[#082008]'
              }`}
            >
              {activeFilterCount || 2}
            </span>
          </button>

          <button
            type="button"
            onClick={handleSortToggle}
            className={`flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-all shrink-0 ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4]'
                : 'bg-white border border-black/[0.04] text-[#181d1a]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-gray-400">swap_vert</span>
            <span>
              Sort:{' '}
              <strong className={isDark ? 'text-[#ea580c]' : 'text-[#476143]'}>
                {sortBy}
              </strong>
            </span>
            <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterUnder30(!filterUnder30)}
            className={`h-9 px-3.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              filterUnder30
                ? isDark
                  ? 'bg-[#ea580c] text-white shadow-sm'
                  : 'bg-[#476143] text-white shadow-sm'
                : isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#9ea3a0] hover:bg-[#252927]'
                : 'bg-[#f0f5f0] text-[#5a6058] hover:bg-[#e5e9e4]'
            }`}
          >
            Under 30m
          </button>

          <button
            type="button"
            onClick={() => setFilterEasyPrep(!filterEasyPrep)}
            className={`h-9 px-3.5 rounded-full text-xs font-medium transition-all shrink-0 ${
              filterEasyPrep
                ? isDark
                  ? 'bg-[#ea580c] text-white shadow-sm'
                  : 'bg-[#476143] text-white shadow-sm'
                : isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#9ea3a0] hover:bg-[#252927]'
                : 'bg-[#f0f5f0] text-[#5a6058] hover:bg-[#e5e9e4]'
            }`}
          >
            Easy prep
          </button>
        </div>
      </div>

      {/* Popular Searches Section */}
      <div className="px-4 md:px-6 pb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2
            className={`text-base font-bold ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            Popular Searches
          </h2>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-0.5 ${
              isDark ? 'text-[#ea580c]' : 'text-[#476143]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Trending
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {popularTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => setSearchQuery(tag.label)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs active:scale-95 transition-all ${
                searchQuery.toLowerCase() === tag.label.toLowerCase()
                  ? isDark
                    ? 'bg-[#ea580c] text-white'
                    : 'bg-[#476143] text-white'
                  : isDark
                  ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4] hover:bg-[#252927]'
                  : 'bg-white border border-black/[0.04] text-[#181d1a] hover:bg-[#f0f5f0]'
              }`}
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="px-4 md:px-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2
              className={`text-lg font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {searchQuery ? `Results for "${searchQuery}"` : 'Recommended for you'}
            </h2>
            <span
              className={`text-xs ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
              }`}
            >
              {searchQuery
                ? `${filteredRecipes.length} recipes found`
                : 'Handpicked seasonal favorites'}
            </span>
          </div>
          <button
            type="button"
            aria-label="Filter recommendations"
            onClick={() => setShowFilterModal(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-gray-400 hover:text-[#ea580c]'
                : 'bg-white border border-black/[0.04] text-gray-600 hover:text-[#476143]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>

        {/* 2-Column Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className={`flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer ${
                  isDark
                    ? 'bg-[#1e211f] border border-[#303532]'
                    : 'bg-white border border-black/[0.04]'
                }`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <button
                    type="button"
                    aria-label={`Favorite ${recipe.title}`}
                    onClick={(e) => onToggleFavorite(recipe.id, e)}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center active:scale-75 transition-all shadow-sm ${
                      isDark
                        ? 'bg-[#161817]/85 border border-[#303532]'
                        : 'bg-white/90 text-gray-700'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] transition-colors ${
                        favorites.includes(recipe.id)
                          ? isDark
                            ? 'text-[#ea580c]'
                            : 'text-[#ba1a1a]'
                          : isDark
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                      style={favorites.includes(recipe.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                  <div
                    className={`absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-sm text-[10px] font-bold ${
                      isDark
                        ? 'bg-[#121413]/85 text-white border border-white/10'
                        : 'bg-black/70 text-white'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[12px] text-amber-400"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                  <h3
                    className={`text-xs md:text-sm font-semibold line-clamp-2 leading-tight ${
                      isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                    }`}
                  >
                    {recipe.title}
                  </h3>
                  <div
                    className={`flex items-center justify-between text-xs pt-1 border-t ${
                      isDark
                        ? 'border-[#303532]/60 text-[#9ea3a0]'
                        : 'border-black/[0.04] text-[#5a6058]'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                        }`}
                      >
                        schedule
                      </span>{' '}
                      {recipe.prepTime}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        recipe.difficulty === 'Easy'
                          ? isDark
                            ? 'bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/20'
                            : 'bg-[#ebefea] text-[#476143]'
                          : isDark
                          ? 'bg-[#2a2e2c] text-[#9ea3a0] border border-[#303532]'
                          : 'bg-[#dfe4df] text-[#5a6058]'
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`p-8 text-center rounded-2xl flex flex-col items-center gap-3 ${
              isDark ? 'bg-[#1e211f] border border-[#303532]' : 'bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            <p className={`font-semibold ${isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'}`}>
              No recipes match your search
            </p>
            <p className="text-xs text-gray-400">
              Try searching for &quot;Pad Thai&quot;, &quot;Chicken&quot;, or tap one of the popular tags.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterUnder30(false);
                setFilterEasyPrep(false);
                setSelectedDifficulty('All');
              }}
              className={`mt-2 px-4 py-2 rounded-full text-xs font-semibold text-white ${
                isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
              }`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Filter Drawer Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs p-0 animate-fadeIn">
          <div
            className={`w-full max-w-lg rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-slideUp ${
              isDark ? 'bg-[#1e211f] text-[#f4f5f4]' : 'bg-white text-[#181d1a]'
            }`}
          >
            <div className="w-10 h-1 rounded-full bg-gray-400/40 mx-auto" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Filter Recipes</h3>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200/20"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Difficulty Level
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['All', 'Easy', 'Medium'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedDifficulty === lvl
                        ? isDark
                          ? 'bg-[#ea580c] text-white shadow-sm'
                          : 'bg-[#476143] text-white shadow-sm'
                        : isDark
                        ? 'bg-[#252927] text-gray-300'
                        : 'bg-[#f0f5f0] text-gray-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Cooking Duration
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-500/10">
                <span className="text-sm font-medium">Quick recipes under 30 mins</span>
                <input
                  type="checkbox"
                  checked={filterUnder30}
                  onChange={(e) => setFilterUnder30(e.target.checked)}
                  className="w-5 h-5 rounded text-[#ea580c] focus:ring-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('All');
                  setFilterUnder30(false);
                  setFilterEasyPrep(false);
                }}
                className="flex-1 py-3 text-xs font-semibold rounded-xl bg-gray-500/15"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className={`flex-1 py-3 text-xs font-bold rounded-xl text-white ${
                  isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
                }`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
