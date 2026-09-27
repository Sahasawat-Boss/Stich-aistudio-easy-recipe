import React, { useState } from 'react';

interface ProfileScreenProps {
  savedCount: number;
  theme: 'light' | 'dark';
  onShowToast: (msg: string, icon?: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  savedCount,
  theme,
  onShowToast,
}) => {
  const isDark = theme === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [measurementUnit, setMeasurementUnit] = useState<'metric' | 'imperial'>('metric');
  const [skillLevel, setSkillLevel] = useState('Intermediate Home Cook');
  const [dietary, setDietary] = useState('Gluten-free, Nut allergy');
  const [equipment] = useState('Air fryer, Wok, Blender');

  // Modals for editing preferences
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('Emma Wilson');
  const [bio, setBio] = useState('Cooking enthusiast & recipe collector');

  const handleToggleNotifications = () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    onShowToast(
      next ? 'Kitchen timers & sound alerts ON' : 'Notifications muted',
      next ? 'notifications_active' : 'notifications_off'
    );
  };

  const handleToggleUnits = () => {
    const next = measurementUnit === 'metric' ? 'imperial' : 'metric';
    setMeasurementUnit(next);
    onShowToast(`Units switched to ${next === 'metric' ? 'Metric (g, ml)' : 'Imperial (oz, cups)'}`, 'straighten');
  };

  const handleSkillCycle = () => {
    const levels = ['Beginner Cook', 'Intermediate Home Cook', 'Master Home Chef'];
    const idx = (levels.indexOf(skillLevel) + 1) % levels.length;
    setSkillLevel(levels[idx]);
    onShowToast(`Skill level updated: ${levels[idx]}`, 'military_tech');
  };

  const handleDietaryCycle = () => {
    const diets = ['Gluten-free, Nut allergy', 'Vegetarian, Dairy-free', 'Keto & Low Carb', 'None (Standard)'];
    const idx = (diets.indexOf(dietary) + 1) % diets.length;
    setDietary(diets[idx]);
    onShowToast(`Dietary preferences: ${diets[idx]}`, 'eco');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditModal(false);
    onShowToast('Profile details updated successfully', 'check_circle');
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 md:px-6">
      {/* Top Greeting & Header */}
      <div className="flex items-center justify-between mt-1 mb-4">
        <div>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#ea580c]' : 'text-[#476143]'
            }`}
          >
            Kitchen Pass
          </span>
          <h1
            className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            Your Profile
          </h1>
        </div>

        <button
          type="button"
          aria-label="Quick Settings"
          onClick={() => onShowToast('Kitchen settings are up to date', 'tune')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532] text-gray-300 hover:bg-[#252927]'
              : 'bg-[#ebefea] text-gray-700 hover:bg-[#dfe4df]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </div>

      {/* Profile Card */}
      <div
        className={`rounded-3xl p-5 shadow-md flex items-center gap-4 mb-5 relative overflow-hidden ${
          isDark
            ? 'bg-[#1e211f] border border-[#303532]'
            : 'bg-white border border-black/[0.04]'
        }`}
      >
        <div
          className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-xl pointer-events-none ${
            isDark ? 'bg-[#ea580c]/10' : 'bg-[#cdebc4]/30'
          }`}
        />

        <div className="relative shrink-0">
          <div
            className={`w-16 h-16 rounded-full p-0.5 shadow-sm flex items-center justify-center ${
              isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
            }`}
          >
            <img
              alt={name}
              className="w-full h-full rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgcqsGOJlIXQ-B1hIVHkfGQGQnt_t9C9EjN_pwhv7DyK6Dbbr_5yPVcwuVZ8insLaZWVbTk2cv0vnIH4l23DJsbld_sZEIl-HHfSYn4kDw90T6VTN2mKcTDiB6avfrAcxhfbt-y7sWAeoVMc3cIlW4prn0anOymL60E9k7pkvMIGiVwsmFPcBVv7rH502KABKFosWcfFkeyJOrrrWH1MkENX5U8fdY_YPUr24dmctjXr9ZCxk51us3Xw"
            />
          </div>
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] ${
              isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
            }`}
          >
            <span className="material-symbols-outlined text-[10px]">verified</span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2
              className={`text-base md:text-lg font-bold truncate ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              {name}
            </h2>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                isDark
                  ? 'bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/25'
                  : 'bg-[#cdebc4] text-[#082008]'
              }`}
            >
              Food Lover
            </span>
          </div>
          <p
            className={`text-xs truncate mt-0.5 ${
              isDark ? 'text-[#9ea3a0]' : 'text-[#5a6058]'
            }`}
          >
            {bio}
          </p>
        </div>

        <button
          type="button"
          aria-label="Edit Profile"
          onClick={() => setShowEditModal(true)}
          className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xs ${
            isDark
              ? 'bg-[#252927] border border-[#303532] text-[#ea580c] hover:bg-[#303532]'
              : 'bg-[#f0f5f0] text-[#476143] hover:bg-[#ebefea]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </div>

      {/* Cooking Stats Row */}
      <div
        className={`rounded-2xl p-4 shadow-sm grid grid-cols-3 gap-2 mb-5 ${
          isDark
            ? 'bg-[#1e211f] border border-[#303532]'
            : 'bg-white border border-black/[0.04]'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center text-center p-2 rounded-xl transition-colors ${
            isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
              isDark
                ? 'bg-[#ea580c]/15 text-[#ea580c]'
                : 'bg-[#cdebc4]/50 text-[#476143]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
          <span
            className={`text-lg md:text-xl font-extrabold ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            {savedCount || 12}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">
            Recipes Saved
          </span>
        </div>

        <div
          className={`flex flex-col items-center justify-center text-center p-2 rounded-xl transition-colors ${
            isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
              isDark
                ? 'bg-amber-500/15 text-amber-500'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              skillet
            </span>
          </div>
          <span
            className={`text-lg md:text-xl font-extrabold ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            5
          </span>
          <span className="text-[11px] text-gray-400 font-medium">Cooked</span>
        </div>

        <div
          className={`flex flex-col items-center justify-center text-center p-2 rounded-xl transition-colors ${
            isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
              isDark ? 'bg-gray-500/15 text-gray-400' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">schedule</span>
          </div>
          <span
            className={`text-lg md:text-xl font-extrabold ${
              isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
            }`}
          >
            18
          </span>
          <span className="text-[11px] text-gray-400 font-medium">
            Kitchen Hours
          </span>
        </div>
      </div>

      {/* Weekly Chef Delight Banner */}
      <div
        className={`mb-6 rounded-2xl p-4 flex items-center justify-between shadow-xs ${
          isDark
            ? 'bg-gradient-to-r from-[#ea580c]/15 via-[#ea580c]/5 to-[#1e211f] border border-[#ea580c]/20'
            : 'bg-gradient-to-r from-[#cdebc4]/40 via-[#ebefea] to-[#f0f5f0] border border-black/[0.04]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#ea580c] text-white' : 'bg-[#476143] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
          </div>
          <div>
            <h4
              className={`text-xs md:text-sm font-bold ${
                isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
              }`}
            >
              3-Day Cooking Streak!
            </h4>
            <p className="text-xs text-gray-400">
              Cook once more to earn &quot;Weekend Maestro&quot;
            </p>
          </div>
        </div>
        <span
          className={`text-[11px] px-2.5 py-1 rounded-full font-bold shadow-xs whitespace-nowrap ${
            isDark
              ? 'bg-[#1e211f] text-[#ea580c] border border-[#ea580c]/30'
              : 'bg-white text-[#476143]'
          }`}
        >
          Keep it up!
        </span>
      </div>

      {/* Settings Group 1: Cooking Preferences */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
            Cooking Preferences
          </span>
          <span
            className={`text-xs font-semibold ${
              isDark ? 'text-[#ea580c]' : 'text-[#476143]'
            }`}
          >
            Customized
          </span>
        </div>

        <div
          className={`rounded-2xl p-1.5 shadow-sm flex flex-col gap-1 ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532]'
              : 'bg-white border border-black/[0.04]'
          }`}
        >
          {/* Dietary & Allergies */}
          <button
            type="button"
            onClick={handleDietaryCycle}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">eco</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Dietary &amp; Allergies
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  {dietary}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="material-symbols-outlined text-gray-400 text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Skill Level */}
          <button
            type="button"
            onClick={handleSkillCycle}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">military_tech</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Skill Level
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  {skillLevel}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0 ml-2">
              chevron_right
            </span>
          </button>

          {/* Kitchen Equipment */}
          <button
            type="button"
            onClick={() => onShowToast(`Kitchen setup: ${equipment}`, 'soup_kitchen')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">soup_kitchen</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Kitchen Equipment
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  {equipment}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0 ml-2">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Settings Group 2: App & System */}
      <div className="mb-6">
        <div className="mb-2.5 px-1">
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
            App &amp; System
          </span>
        </div>

        <div
          className={`rounded-2xl p-1.5 shadow-sm flex flex-col gap-1 ${
            isDark
              ? 'bg-[#1e211f] border border-[#303532]'
              : 'bg-white border border-black/[0.04]'
          }`}
        >
          {/* Notifications & Timers */}
          <div
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">notifications_active</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Notifications &amp; Timers
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  {notificationsEnabled ? 'Loud step alerts enabled' : 'Alerts muted'}
                </span>
              </div>
            </div>

            {/* Custom Accessible Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={notificationsEnabled}
              onClick={handleToggleNotifications}
              className={`shrink-0 w-12 h-7 rounded-full relative transition-colors focus:outline-none ml-2 p-0.5 ${
                notificationsEnabled
                  ? isDark
                    ? 'bg-[#ea580c]'
                    : 'bg-[#476143]'
                  : isDark
                  ? 'bg-[#333734]'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`w-6 h-6 bg-white rounded-full shadow-sm block transform transition-transform duration-200 ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Measurement Units */}
          <button
            type="button"
            onClick={handleToggleUnits}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">straighten</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Measurement Units
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  {measurementUnit === 'metric' ? 'Metric (g, ml)' : 'Imperial (oz, cups)'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  isDark ? 'bg-[#252927] text-gray-300' : 'bg-[#ebefea] text-gray-700'
                }`}
              >
                {measurementUnit === 'metric' ? 'g / ml' : 'oz / cup'}
              </span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* Offline Recipes */}
          <button
            type="button"
            onClick={() => onShowToast('All 5 offline recipes are synced locally', 'cloud_done')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">download_done</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  Offline Recipes
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  5 recipes downloaded
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span
                className={`text-[11px] font-bold ${
                  isDark ? 'text-[#ea580c]' : 'text-[#476143]'
                }`}
              >
                24 MB
              </span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">
                chevron_right
              </span>
            </div>
          </button>

          {/* About Easy Cooking */}
          <button
            type="button"
            onClick={() => onShowToast('Easy Cooking v2.4.0 • Built with passion for home cooks', 'info')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-colors text-left group ${
              isDark ? 'hover:bg-[#252927]' : 'hover:bg-[#f0f5f0]'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-[#252927] text-[#ea580c]'
                    : 'bg-[#ebefea] text-[#476143]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">favorite_border</span>
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold block truncate ${
                    isDark ? 'text-[#f4f5f4]' : 'text-[#181d1a]'
                  }`}
                >
                  About Easy Cooking
                </span>
                <span className="text-xs text-gray-400 block truncate">
                  v2.4.0 • Made with ❤️ for food lovers
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0 ml-2">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Sign Out & Account Actions */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => onShowToast('Logged out of demo session', 'logout')}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-red-500 hover:bg-red-500/10 transition-colors active:scale-95 text-sm font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out / Switch Account</span>
        </button>
        <span className="text-xs text-gray-400">User ID: ec-89240-wls</span>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleSaveProfile}
            className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col gap-4 ${
              isDark ? 'bg-[#1e211f] text-[#f4f5f4]' : 'bg-white text-[#181d1a]'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Edit Chef Profile</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-500/10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-400">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`p-3 rounded-xl text-sm outline-none ${
                  isDark ? 'bg-[#252927] text-white border border-[#303532]' : 'bg-gray-100'
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-400">Tagline / Bio</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`p-3 rounded-xl text-sm outline-none ${
                  isDark ? 'bg-[#252927] text-white border border-[#303532]' : 'bg-gray-100'
                }`}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gray-500/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white ${
                  isDark ? 'bg-[#ea580c]' : 'bg-[#476143]'
                }`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
