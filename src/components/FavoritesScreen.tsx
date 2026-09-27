import React, { useState, useMemo } from 'react';
import { Recipe, RECIPES } from '../data/recipes';

interface FavoritesScreenProps {
  favorites: string[];
  onSelectRecipe: (recipe: Recipe) => void;
  onCookRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onExploreRecipes: () => void;
  theme: 'light' | 'dark';
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  onSelectRecipe,
  onCookRecipe,
  onToggleFavorite,
  onExploreRecipes,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [searchVal, setSearchVal] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'quick' | 'thai' | 'healthy' | 'comfort'>('all');
  const [previewEmpty, setPreviewEmpty] = useState(false);

  // Filter saved recipes
  const favoriteRecipes = useMemo(() => {
    return RECIPES.filter((r) => favorites.includes(r.id));
  }, [favorites]);

  const filteredList = useMemo(() => {
    if (previewEmpty) return [];

    return favoriteRecipes.filter((recipe) => {
      // Category filter
      if (activeCategory === 'quick' && recipe.prepMinutes > 25) return false;
      if (activeCategory === 'thai' && recipe.category !== 'Thai' && !recipe.tags.includes('Thai')) return false;
      if (activeCategory === 'healthy' && recipe.category !== 'Healthy' && !recipe.tags.includes('healthy')) return false;
      if (activeCategory === 'comfort' && !recipe.tags.includes('comfort') && recipe.category !== 'Italian') return false;

      // Text query
      if (searchVal.trim()) {
        const q = searchVal.toLowerCase();
        return (
          recipe.title.toLowerCase().includes(q) ||
          recipe.subtitle.toLowerCase().includes(q) ||
          recipe.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [favoriteRecipes, activeCategory, searchVal, previewEmpty]);

  const isActuallyEmpty = previewEmpty || favoriteRecipes.length === 0;

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Title & Preview Toggle */}
      <div className="px-4 md:px-6 pt-2 pb-2 flex items-center justify-between">
        <div>
          <h1
            className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            Your Favorites
          </h1>
          <p
            className={`text-xs md:text-sm mt-0.5 ${
              isDark ? 'text-[#9ea3a0]' : 'text-[#434841]'
            }`}
          >
            Recipes you saved for later (
            <span
              className={`font-semibold ${
                isDark ? 'text-[#ea580c]' : 'text-[#476143]'
              }`}
            >
              {previewEmpty ? '0' : favoriteRecipes.length} saved
            </span>
            )
          </p>
        </div>

        {/* Quick State Preview Toggle */}
        <button
          type="button"
          aria-label="Toggle preview empty state"
          onClick={() => setPreviewEmpty(!previewEmpty)}
          className={`h-9 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 active:scale-95 shadow-xs transition-all ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532] text-gray-300 hover:bg-[#252927]'
              : 'bg-[#ebefea] text-gray-700 hover:bg-[#dfe4df]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {previewEmpty ? 'visibility' : 'visibility_off'}
          </span>
          <span>{previewEmpty ? 'Show Saved' : 'Preview Empty'}</span>
        </button>
      </div>

      {/* Search & Filter Controls (visible when not forced empty) */}
      {!isActuallyEmpty && (
        <section className="px-4 md:px-6 mt-2 space-y-3">
          <div className="relative w-full shadow-xs rounded-xl">
            <span
              className={`material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[22px] ${
                isDark ? 'text-[#ea580c]' : 'text-[#476143]'
              }`}
            >
              search
            </span>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search your saved recipes..."
              className={`w-full h-12 pl-11 pr-10 rounded-2xl text-sm outline-none transition-all duration-200 ${
                isDark
                  ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4] placeholder:text-[#686d69] focus:border-[#ea580c]'
                  : 'bg-white border border-black/[0.04] text-[#181d1a] placeholder:text-gray-400 focus:border-[#476143]'
              }`}
            />
            {searchVal && (
              <button
                type="button"
                onClick={() => setSearchVal('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar whitespace-nowrap scroll-smooth">
            {[
              { id: 'all', label: `All (${favoriteRecipes.length})` },
              { id: 'quick', label: '⚡ Quick (<25m)' },
              { id: 'thai', label: '🌶️ Thai' },
              { id: 'healthy', label: '🥗 Healthy' },
              { id: 'comfort', label: '🍜 Comfort Food' },
            ].map((chip) => {
              const isSelected = activeCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setActiveCategory(chip.id as typeof activeCategory)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? isDark
                        ? 'bg-[#ea580c] text-white shadow-sm'
                        : 'bg-[#476143] text-white shadow-sm'
                      : isDark
                      ? 'bg-[#1e211f] border border-[#303532] text-[#9ea3a0] hover:text-[#f4f5f4]'
                      : 'bg-white border border-black/[0.04] text-[#5a6058] hover:text-[#181d1a]'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Content: 2-Column Bento Grid */}
      {!isActuallyEmpty && filteredList.length > 0 && (
        <section className="px-4 md:px-6 mt-4">
          <div className="grid grid-cols-2 gap-3.5">
            {filteredList.map((recipe) => (
              <article
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isDark
                    ? 'bg-[#1e211f] border border-[#303532]'
                    : 'bg-white border border-black/[0.04]'
                }`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? 'from-[#121413]/90 via-transparent to-black/20'
                        : 'from-black/60 via-transparent to-black/20'
                    }`}
                  />

                  {/* Favorite Heart Button */}
                  <button
                    type="button"
                    aria-label="Remove from favorites"
                    onClick={(e) => onToggleFavorite(recipe.id, e)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-transform ${
                      isDark
                        ? 'bg-[#161817]/85 border border-[#303532]'
                        : 'bg-white/90'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[19px] ${
                        isDark ? 'text-[#ea580c]' : 'text-[#ba1a1a]'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Time badge */}
                  <span
                    className={`absolute bottom-2 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md text-[11px] font-bold shadow-xs ${
                      isDark
                        ? 'bg-[#161817]/95 border border-[#303532] text-[#f4f5f4]'
                        : 'bg-white/95 text-[#181d1a]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[13px] ${
                        isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                      }`}
                    >
                      schedule
                    </span>
                    {recipe.prepTime}
                  </span>
                </div>

                <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <h2
                      className={`text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors ${
                        isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                      }`}
                    >
                      {recipe.title}
                    </h2>
                    <div
                      className={`flex items-center gap-1.5 mt-1 text-xs ${
                        isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
                      }`}
                    >
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          recipe.difficulty === 'Easy'
                            ? isDark
                              ? 'bg-[#ea580c]/15 text-[#ea580c]'
                              : 'bg-[#ebefea] text-[#476143]'
                            : isDark
                            ? 'bg-[#2a2e2c] text-[#9ea3a0]'
                            : 'bg-[#dfe4df] text-[#5a6058]'
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                      <span>•</span>
                      <span className="truncate">{recipe.subtitle.split('&')[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-500/10">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                        }`}
                      >
                        {recipe.rating}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label={`Cook ${recipe.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCookRecipe(recipe);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-90 ${
                        isDark
                          ? 'bg-[#2a2e2c] hover:bg-[#ea580c] text-[#ea580c] hover:text-white'
                          : 'bg-[#ebefea] hover:bg-[#476143] text-[#476143] hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">skillet</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Empty State View */}
      {isActuallyEmpty && (
        <section className="px-4 md:px-6 mt-4 flex flex-col items-center justify-center text-center">
          <div
            className={`w-full rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532]'
                : 'bg-white border border-black/[0.04]'
            }`}
          >
            {/* Whimsical Kitchen Illustration */}
            <div
              className={`relative w-36 h-36 flex items-center justify-center rounded-full mb-4 ${
                isDark ? 'bg-[#252927]' : 'bg-[#f0f5f0]'
              }`}
            >
              <div
                className={`absolute inset-2 rounded-full animate-pulse ${
                  isDark ? 'bg-[#ea580c]/10' : 'bg-[#476143]/10'
                }`}
              />
              <svg
                className={`w-20 h-20 relative z-10 ${
                  isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                }`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z"
                  fill={isDark ? '#1a1c1b' : '#F0F5F0'}
                />
                <path d="M19 12a7 7 0 0 1-7 7" stroke={isDark ? '#ea580c' : '#5F7A5A'} strokeDasharray="2 3" />
                <path
                  d="M12 8c-1.5-2.5-5-1.5-5 1.5 0 2.8 5 5.5 5 5.5s5-2.7 5-5.5c0-3-3.5-4-5-1.5z"
                  fill="#ffb77a"
                  stroke="#ea580c"
                />
                <circle cx="8" cy="16" fill={isDark ? '#ea580c' : '#5F7A5A'} r="1.5" />
                <circle cx="16" cy="16" fill={isDark ? '#ea580c' : '#5F7A5A'} r="1.5" />
                <path d="M10 18h4" stroke={isDark ? '#ea580c' : '#5F7A5A'} />
              </svg>
              <span
                className={`material-symbols-outlined absolute top-3 right-3 text-[22px] animate-bounce ${
                  isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                }`}
              >
                auto_awesome
              </span>
              <span
                className={`material-symbols-outlined absolute bottom-4 left-3 text-[18px] ${
                  isDark ? 'text-amber-400' : 'text-[#476143]'
                }`}
              >
                cookie
              </span>
            </div>

            <h2
              className={`text-xl font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              No favorite recipes yet?
            </h2>
            <p
              className={`text-xs md:text-sm max-w-xs mt-2 leading-relaxed ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#434841]'
              }`}
            >
              Save recipes you love by tapping the heart icon and find them here anytime for quick dinner inspiration.
            </p>

            {/* Actionable CTA */}
            <button
              type="button"
              onClick={onExploreRecipes}
              className={`mt-6 w-full max-w-xs h-[52px] rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all text-white ${
                isDark
                  ? 'bg-[#ea580c] hover:bg-[#c2410c] shadow-[#ea580c]/25'
                  : 'bg-[#476143] hover:bg-[#344d31] shadow-[#476143]/20'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Explore Trending Recipes</span>
            </button>

            {/* Quick Helpful Tip Card */}
            <div
              className={`mt-5 w-full max-w-xs rounded-2xl p-3.5 flex items-start gap-2.5 text-left ${
                isDark ? 'bg-[#252927] border border-[#303532]' : 'bg-[#f0f5f0]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                  isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                }`}
              >
                tips_and_updates
              </span>
              <p
                className={`text-xs ${
                  isDark ? 'text-gray-300' : 'text-[#434841]'
                }`}
              >
                <strong className={isDark ? 'text-white' : 'text-[#181d1a]'}>
                  Pro tip:
                </strong>{' '}
                Tap the heart on any recipe card to quickly save it to your collection!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
