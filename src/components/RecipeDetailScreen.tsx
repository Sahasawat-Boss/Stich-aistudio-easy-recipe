import React, { useState } from 'react';
import { Recipe } from '../data/recipes';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: (recipe: Recipe) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onShare: (recipe: Recipe) => void;
  theme: 'light' | 'dark';
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  recipe,
  onBack,
  onStartCooking,
  isFavorite,
  onToggleFavorite,
  onShare,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [servings, setServings] = useState(recipe.baseServings || 2);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '0': true,
    '1': true,
  });

  const handleServingChange = (delta: number) => {
    setServings((prev) => {
      const next = prev + delta;
      return next >= 1 && next <= 12 ? next : prev;
    });
  };

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleResetIngredients = () => {
    setCheckedItems({});
  };

  const scaleQuantity = (base: number) => {
    const scaled = (base * servings) / recipe.baseServings;
    return scaled % 1 === 0 ? scaled : scaled.toFixed(1);
  };

  return (
    <div className="flex flex-col w-full relative pb-32">
      {/* Top Visual Banner with Image */}
      <div className="relative w-full h-80 overflow-hidden bg-gray-900">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            isDark
              ? 'from-black/70 via-black/20 to-[#121413]'
              : 'from-black/50 via-transparent to-black/30'
          } pointer-events-none`}
        />

        {/* Floating Top Overlay Controls */}
        <div className="absolute top-4 inset-x-0 px-4 md:px-6 flex items-center justify-between pointer-events-auto">
          <button
            type="button"
            aria-label="Back to recipes"
            onClick={onBack}
            className={`w-11 h-11 rounded-full backdrop-blur-md shadow-md flex items-center justify-center active:scale-95 transition-all ${
              isDark
                ? 'bg-[#1e211f]/85 border border-[#303532] text-[#f4f5f4] hover:bg-[#252926]'
                : 'bg-white/85 text-gray-900 hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <button
            type="button"
            aria-label="Favorite recipe"
            onClick={() => onToggleFavorite(recipe.id)}
            className={`w-11 h-11 rounded-full backdrop-blur-md shadow-md flex items-center justify-center active:scale-90 transition-all ${
              isDark
                ? 'bg-[#1e211f]/85 border border-[#303532] hover:bg-[#252926]'
                : 'bg-white/85 hover:bg-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[24px] ${
                isFavorite
                  ? isDark
                    ? 'text-[#ea580c]'
                    : 'text-[#ba1a1a]'
                  : isDark
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}
              style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Quick dietary badge pill on image */}
        {recipe.dietary && (
          <div className="absolute bottom-10 left-4 md:left-6">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold shadow-md ${
                isDark
                  ? 'bg-[#1e211f]/90 border border-[#303532] text-[#ea580c]'
                  : 'bg-white/90 text-[#476143]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
              {recipe.dietary}
            </span>
          </div>
        )}
      </div>

      {/* Content Sheet Overlapping Container */}
      <div
        className={`relative -mt-6 z-10 rounded-t-[28px] px-4 md:px-6 pt-6 flex flex-col gap-6 shadow-xl ${
          isDark
            ? 'bg-[#121413] border-t border-[#303532]'
            : 'bg-[#f6fbf5] border-t border-black/[0.04]'
        }`}
      >
        {/* Title & Short Description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h1
              className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {recipe.title}
            </h1>
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? 'bg-[#252926] border border-[#303532] text-gray-300'
                  : 'bg-[#e5e9e4] text-[#434841]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[15px] text-amber-500"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className={`font-bold ${isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'}`}>
                {recipe.rating}
              </span>
              <span className="text-gray-400">
                ({recipe.reviewCount > 1000 ? `${(recipe.reviewCount / 1000).toFixed(1)}k` : recipe.reviewCount})
              </span>
            </div>
          </div>
          <p
            className={`text-sm leading-relaxed ${
              isDark ? 'text-[#c5c8c5]' : 'text-[#434841]'
            }`}
          >
            {recipe.description}
          </p>
        </div>

        {/* 4 High-Contrast Compact Metric Cards */}
        <div className="grid grid-cols-4 gap-2">
          <div
            className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532]'
                : 'bg-white border border-black/[0.04]'
            }`}
          >
            <span className="text-lg mb-1 leading-none">⏱️</span>
            <span className="text-[11px] font-semibold text-gray-400">Prep</span>
            <span
              className={`text-xs md:text-sm font-bold mt-0.5 ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {recipe.prepTime}
            </span>
          </div>
          <div
            className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532]'
                : 'bg-white border border-black/[0.04]'
            }`}
          >
            <span className="text-lg mb-1 leading-none">⚡</span>
            <span className="text-[11px] font-semibold text-gray-400">Level</span>
            <span
              className={`text-xs md:text-sm font-bold mt-0.5 ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
          <div
            className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532]'
                : 'bg-white border border-black/[0.04]'
            }`}
          >
            <span className="text-lg mb-1 leading-none">👥</span>
            <span className="text-[11px] font-semibold text-gray-400">Yield</span>
            <span
              className={`text-xs md:text-sm font-bold mt-0.5 ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {servings} Serv
            </span>
          </div>
          <div
            className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532]'
                : 'bg-white border border-black/[0.04]'
            }`}
          >
            <span className="text-lg mb-1 leading-none">🔥</span>
            <span className="text-[11px] font-semibold text-gray-400">Energy</span>
            <span
              className={`text-xs md:text-sm font-bold mt-0.5 ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {Math.round((recipe.calories * servings) / recipe.baseServings)} kcal
            </span>
          </div>
        </div>

        {/* Interactive Serving Size Stepper Widget */}
        <div
          className={`p-4 rounded-2xl flex items-center justify-between ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532]'
              : 'bg-[#f0f5f0]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark
                  ? 'bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/30'
                  : 'bg-[#cdebc4] text-[#082008]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            </div>
            <div>
              <p
                className={`text-sm font-bold ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                Adjust Portions
              </p>
              <p className="text-xs text-gray-400">Ingredients scale automatically</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 px-2 py-1.5 rounded-full shadow-xs ${
              isDark
                ? 'bg-[#252926] border border-[#2f3431]'
                : 'bg-white'
            }`}
          >
            <button
              type="button"
              aria-label="Decrease serving count"
              onClick={() => handleServingChange(-1)}
              disabled={servings <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform ${
                servings <= 1 ? 'opacity-30 cursor-not-allowed' : ''
              } ${
                isDark
                  ? 'bg-[#181a19] text-white border border-[#303532]'
                  : 'bg-[#ebefea] text-gray-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span
              className={`text-sm font-bold min-w-[1.25rem] text-center ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {servings}
            </span>
            <button
              type="button"
              aria-label="Increase serving count"
              onClick={() => handleServingChange(1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform text-white ${
                isDark
                  ? 'bg-[#ea580c] shadow-md shadow-[#ea580c]/30'
                  : 'bg-[#476143]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>

        {/* Ingredients Checklist Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h3
                className={`text-lg font-bold ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                Ingredients
              </h3>
              <span className="text-xs text-gray-400">
                ({recipe.ingredients.length} items)
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetIngredients}
              className={`text-xs font-semibold transition-colors py-1 px-2 ${
                isDark ? 'text-[#ea580c] hover:text-[#f97316]' : 'text-[#476143]'
              }`}
            >
              Reset All
            </button>
          </div>

          {/* Ingredient Items List */}
          <div className="flex flex-col gap-2">
            {recipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <label
                  key={ing.name}
                  onClick={() => toggleItem(idx)}
                  className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer select-none transition-all duration-200 active:scale-[0.99] ${
                    isDark
                      ? 'bg-[#1e211f] border border-[#303532] hover:bg-[#252926]'
                      : 'bg-white border border-black/[0.04] hover:bg-[#f0f5f0]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isChecked
                          ? isDark
                            ? 'bg-[#ea580c] text-white border border-[#ea580c]'
                            : 'bg-[#476143] text-white'
                          : isDark
                          ? 'bg-[#252926] border border-[#303532] text-transparent'
                          : 'bg-[#ebefea] text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px] leading-none">
                        check
                      </span>
                    </div>
                    <span
                      className={`text-sm truncate transition-all ${
                        isChecked
                          ? isDark
                            ? 'text-gray-500 line-through'
                            : 'text-gray-400 line-through'
                          : isDark
                          ? 'text-[#f4f5f4]'
                          : 'text-[#181d1a]'
                      }`}
                    >
                      <span className="font-bold mr-1">
                        {scaleQuantity(ing.baseAmount)} {ing.unit}
                      </span>
                      {ing.name}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 ml-2 ${
                      ing.category === 'Seafood'
                        ? isDark
                          ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                          : 'bg-amber-100 text-amber-800'
                        : ing.category === 'Produce'
                        ? isDark
                          ? 'bg-[#ea580c]/15 text-[#ea580c]'
                          : 'bg-green-100 text-green-800'
                        : isDark
                        ? 'bg-[#252926] text-gray-400'
                        : 'bg-[#ebefea] text-[#5a6058]'
                    }`}
                  >
                    {ing.category}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* How to Cook / Step-by-Step Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3
              className={`text-lg font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              How to Cook
            </h3>
            <span className="text-xs text-gray-400">
              {recipe.steps.length} Steps · {recipe.prepMinutes} mins active
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {recipe.steps.map((st) => (
              <div
                key={st.stepNumber}
                className={`p-4 rounded-2xl shadow-xs flex gap-3.5 items-start ${
                  isDark
                    ? 'bg-[#1e211f] border border-[#303532]'
                    : 'bg-white border border-black/[0.04]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#ea580c] text-white shadow-sm shadow-[#ea580c]/20'
                      : 'bg-[#dee4da] text-[#181d1a]'
                  }`}
                >
                  {String(st.stepNumber).padStart(2, '0')}
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span
                    className={`text-sm font-bold ${
                      isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                    }`}
                  >
                    {st.title}
                  </span>
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      isDark ? 'text-[#c5c8c5]' : 'text-[#434841]'
                    }`}
                  >
                    {st.instruction}
                  </p>
                  {st.timerLabel && st.timerSeconds && (
                    <div
                      className={`inline-flex items-center gap-1.5 mt-1 text-xs font-semibold ${
                        isDark ? 'text-[#ea580c]' : 'text-[#894a00]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">timer</span>
                      <span>
                        {Math.floor(st.timerSeconds / 60)} min {st.timerLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chef's Secret Card */}
        {recipe.chefsSecret && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3.5 ${
              isDark
                ? 'bg-[#252926] border border-[#303532]'
                : 'bg-[#ebefea]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                isDark
                  ? 'bg-[#ea580c]/20 text-[#ea580c]'
                  : 'bg-white text-[#894a00]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                tips_and_updates
              </span>
            </div>
            <div>
              <p
                className={`text-xs font-bold ${
                  isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                }`}
              >
                Chef&apos;s Secret
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  isDark ? 'text-[#c5c8c5]' : 'text-[#434841]'
                }`}
              >
                {recipe.chefsSecret}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar with Frosted Glass */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 pb-safe shadow-lg px-4 md:px-6 pt-3 pb-4 backdrop-blur-xl ${
          isDark
            ? 'bg-[#121413]/90 border-t border-[#303532]'
            : 'bg-[#f6fbf5]/90 border-t border-black/[0.04]'
        }`}
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Share recipe"
            onClick={() => onShare(recipe)}
            className={`w-13 h-13 min-w-[52px] min-h-[52px] rounded-2xl flex items-center justify-center active:scale-95 transition-all ${
              isDark
                ? 'bg-[#1e211f] border border-[#303532] text-gray-300 hover:bg-[#252927]'
                : 'bg-[#ebefea] text-gray-700 hover:bg-[#dfe4df]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">share</span>
          </button>
          <button
            type="button"
            onClick={() => onStartCooking(recipe)}
            className={`flex-1 h-[52px] rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all text-white ${
              isDark
                ? 'bg-[#ea580c] hover:bg-[#c2410c] shadow-[#ea580c]/30'
                : 'bg-[#476143] hover:bg-[#344d31] shadow-[#476143]/25'
            }`}
          >
            <span>Start Cooking (Step-by-Step)</span>
            <span className="text-lg leading-none">👨‍🍳</span>
          </button>
        </div>
      </div>
    </div>
  );
};
