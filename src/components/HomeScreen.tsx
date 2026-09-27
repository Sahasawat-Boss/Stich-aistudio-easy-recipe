import React, { useState } from 'react';
import { Recipe, RECIPES } from '../data/recipes';

interface HomeScreenProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onSearchQuery: (query: string) => void;
  onSeeAllClick: () => void;
  favorites: string[];
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  theme: 'light' | 'dark';
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectRecipe,
  onSearchQuery,
  onSeeAllClick,
  favorites,
  onToggleFavorite,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchVal, setSearchVal] = useState('');

  const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Quick & Easy',
    'Thai',
    'Italian',
    'Healthy',
    'Dessert',
  ];

  const featuredRecipe = RECIPES.find((r) => r.isFeatured) || RECIPES[1];
  
  // Popular carousel recipes
  const popularRecipes = [
    RECIPES.find((r) => r.id === 'pad-thai') || RECIPES[0],
    RECIPES.find((r) => r.id === 'tom-yum-goong') || RECIPES[2],
    RECIPES.find((r) => r.id === 'carbonara') || RECIPES[3],
    RECIPES.find((r) => r.id === 'salmon-rice-bowl') || RECIPES[4],
  ];

  // Quick & Easy grid recipes
  const quickRecipes = [
    RECIPES.find((r) => r.id === 'fried-rice') || RECIPES[5],
    RECIPES.find((r) => r.id === 'pancakes') || RECIPES[6],
    RECIPES.find((r) => r.id === 'chicken-stir-fry') || RECIPES[7],
    RECIPES.find((r) => r.id === 'beef-burger') || RECIPES[8],
  ];

  // Filter recipes based on selected pill category
  const filteredPopular = selectedCategory === 'All' 
    ? popularRecipes 
    : RECIPES.filter(r => r.category.toLowerCase().includes(selectedCategory.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase())));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchQuery(searchVal.trim());
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Friendly Top Greeting & Search Header */}
      <section className="px-4 md:px-6 pt-2 flex flex-col gap-y-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-sm ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
              }`}
            >
              Good evening
            </span>
            <span className="inline-block animate-bounce text-base">👋</span>
          </div>
          <h1
            className={`text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5 ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            What are you cooking today?
          </h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full mt-1">
          <div
            className={`w-full rounded-2xl shadow-sm px-4 py-3.5 flex items-center gap-3 transition-all duration-200 focus-within:shadow-md ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] focus-within:border-[#ea580c]'
                : 'bg-white border border-black/[0.04] focus-within:border-[#476143]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isDark ? 'text-[#ea580c]' : 'text-[#476143]'
              }`}
            >
              search
            </span>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className={`w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400 ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            />
            {searchVal ? (
              <button
                type="button"
                onClick={() => setSearchVal('')}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-200"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : null}
            <button
              type="button"
              aria-label="Filter options"
              onClick={onSeeAllClick}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-[#272b29] text-[#ea580c] hover:bg-[#303532]'
                  : 'bg-[#f0f5f0] text-[#476143] hover:bg-[#ebefea]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </form>
      </section>

      {/* Horizontally Scrollable Category Pills */}
      <section className="mt-5 w-full">
        <div className="flex items-center gap-2 overflow-x-auto px-4 md:px-6 no-scrollbar py-1 whitespace-nowrap scroll-smooth">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? isDark
                      ? 'bg-[#ea580c] text-white shadow-md shadow-[#ea580c]/25'
                      : 'bg-[#476143] text-white shadow-sm'
                    : isDark
                    ? 'bg-[#1e211f] border border-[#303532] text-[#f4f5f4] hover:bg-[#252927]'
                    : 'bg-white border border-black/[0.04] text-[#181d1a] hover:bg-[#f0f5f0] shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Recipe Hero Card */}
      <section className="px-4 md:px-6 mt-6">
        <div
          onClick={() => onSelectRecipe(featuredRecipe)}
          className={`relative w-full rounded-3xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300 active:scale-[0.99] group ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532]'
              : 'bg-white border border-black/[0.04]'
          }`}
        >
          {/* Media Cover */}
          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={featuredRecipe.image}
              alt={featuredRecipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                isDark
                  ? 'from-[#121413] via-black/40 to-transparent'
                  : 'from-black/60 via-black/10 to-transparent'
              }`}
            />

            {/* Badges & Action */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                  isDark
                    ? 'bg-[#ea580c] text-white shadow-[#ea580c]/30'
                    : 'bg-[#476143]/95 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                Featured of the Day
              </span>
              <button
                type="button"
                aria-label={`Favorite ${featuredRecipe.title}`}
                onClick={(e) => onToggleFavorite(featuredRecipe.id, e)}
                className={`pointer-events-auto w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-transform active:scale-75 ${
                  isDark
                    ? 'bg-[#161817]/85 border border-[#303532] hover:bg-[#252927]'
                    : 'bg-white/90 hover:bg-white text-gray-800'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    favorites.includes(featuredRecipe.id)
                      ? isDark
                        ? 'text-[#ea580c]'
                        : 'text-[#ba1a1a]'
                      : 'text-gray-400'
                  }`}
                  style={favorites.includes(featuredRecipe.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Ambient Badge Overlay */}
            <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
              <span
                className={`backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 ${
                  isDark
                    ? 'bg-[#161817]/85 border border-[#303532] text-[#f4f5f4]'
                    : 'bg-white/90 text-[#181d1a]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-amber-500 text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {featuredRecipe.rating}{' '}
                <span className={isDark ? 'text-gray-400 font-normal' : 'text-[#5a6058] font-normal'}>
                  ({featuredRecipe.reviewCount})
                </span>
              </span>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2
                className={`text-lg font-bold tracking-tight ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                {featuredRecipe.title}
              </h2>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isDark
                    ? 'bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/25'
                    : 'bg-[#dee4da] text-[#60665e]'
                }`}
              >
                Popular
              </span>
            </div>
            <p
              className={`text-xs line-clamp-1 ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#434841]'
              }`}
            >
              {featuredRecipe.description}
            </p>
            <div
              className={`flex items-center gap-3 mt-1.5 pt-2 text-xs font-medium border-t ${
                isDark
                  ? 'border-[#303532]/60 text-[#9ea3a0]'
                  : 'border-black/[0.04] text-[#5a6058]'
              }`}
            >
              <div className="flex items-center gap-1">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                  }`}
                >
                  schedule
                </span>
                <span>{featuredRecipe.prepTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                  }`}
                >
                  skillet
                </span>
                <span>Easy Prep</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                  }`}
                >
                  whatshot
                </span>
                <span>{featuredRecipe.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Carousel */}
      <section className="mt-7 w-full">
        <div className="px-4 md:px-6 flex items-center justify-between mb-3">
          <div>
            <h2
              className={`text-lg font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              Popular Recipes
            </h2>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
              }`}
            >
              Loved by home cooks this week
            </p>
          </div>
          <button
            type="button"
            onClick={onSeeAllClick}
            className={`text-xs font-semibold flex items-center gap-0.5 hover:underline ${
              isDark ? 'text-[#ea580c]' : 'text-[#476143]'
            }`}
          >
            See all
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Cards Scroll */}
        <div className="flex gap-3.5 overflow-x-auto px-4 md:px-6 no-scrollbar py-2 scroll-smooth">
          {filteredPopular.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className={`min-w-[220px] max-w-[220px] rounded-2xl shadow-sm overflow-hidden flex flex-col cursor-pointer transition-transform active:scale-[0.98] group ${
                isDark
                  ? 'bg-[#1e211f] border border-[#303532]'
                  : 'bg-white border border-black/[0.04]'
              }`}
            >
              <div className="relative w-full h-32 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  aria-label={`Add ${recipe.title} to favorites`}
                  onClick={(e) => onToggleFavorite(recipe.id, e)}
                  className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-transform active:scale-75 ${
                    isDark
                      ? 'bg-[#161817]/80 border border-[#303532]'
                      : 'bg-white/90'
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
                <span
                  className={`absolute bottom-2 left-2 backdrop-blur-md text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${
                    isDark
                      ? 'bg-[#161817]/85 border border-[#303532] text-[#f4f5f4]'
                      : 'bg-white/90 text-[#181d1a]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-amber-500 text-[12px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {recipe.rating}
                </span>
              </div>
              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    className={`text-sm font-semibold truncate ${
                      isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                    }`}
                  >
                    {recipe.title}
                  </h3>
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
                    }`}
                  >
                    {recipe.subtitle}
                  </p>
                </div>
                <div
                  className={`flex items-center justify-between mt-3 pt-2 text-xs border-t ${
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
                    </span>
                    {recipe.prepTime}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${
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
      </section>

      {/* Quick & Easy 2-Column Grid */}
      <section className="px-4 md:px-6 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2
              className={`text-lg font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              Quick &amp; Easy
            </h2>
            <p
              className={`text-xs mt-0.5 ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
              }`}
            >
              Delicious meals in 25 minutes or less
            </p>
          </div>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-[#ea580c]'
                : 'bg-[#ebefea] text-[#476143]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </span>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {quickRecipes.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectRecipe(item)}
              className={`rounded-2xl p-2.5 shadow-sm flex flex-col cursor-pointer transition-all active:scale-[0.98] group ${
                isDark
                  ? 'bg-[#1e211f] border border-[#303532]'
                  : 'bg-white border border-black/[0.04]'
              }`}
            >
              <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  aria-label={`Add ${item.title} to favorites`}
                  onClick={(e) => onToggleFavorite(item.id, e)}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center shadow-sm transition-transform active:scale-75 ${
                    isDark
                      ? 'bg-[#161817]/80 border border-[#303532]'
                      : 'bg-white/90'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[15px] transition-colors ${
                      favorites.includes(item.id)
                        ? isDark
                          ? 'text-[#ea580c]'
                          : 'text-[#ba1a1a]'
                        : isDark
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                    style={favorites.includes(item.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>
              </div>
              <h3
                className={`text-xs md:text-sm font-bold truncate ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                {item.title}
              </h3>
              <div
                className={`flex items-center justify-between mt-1 text-xs ${
                  isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                    }`}
                  >
                    timer
                  </span>
                  {item.prepTime}
                </span>
                <span
                  className={`font-semibold ${
                    isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                  }`}
                >
                  Easy
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Cooking Inspiration Quote / Tip Card */}
      <section className="px-4 md:px-6 mt-7">
        <div
          className={`w-full rounded-2xl p-4 flex items-center gap-3.5 shadow-sm ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532]'
              : 'bg-[#f0f5f0]'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDark
                ? 'bg-[#ea580c]/20 border border-[#ea580c]/30 text-[#ea580c]'
                : 'bg-[#476143] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'text-[#ea580c]' : 'text-[#476143]'
              }`}
            >
              Chef's Daily Tip
            </span>
            <p
              className={`text-xs mt-0.5 leading-snug ${
                isDark ? 'text-[#9ea3a0]' : 'text-[#434841]'
              }`}
            >
              Pat meat dry with paper towels before searing to guarantee a deeply golden, caramelized crust!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
