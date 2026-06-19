const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const XP_PER_EXERCISE = 12;
const DAILY_XP_BONUS = 60;
const DAILY_COIN_BONUS = 35;
const XP_PER_LEVEL = 140;
const STORAGE_KEY = 'fitness-rpg-complete-v2';
const RANKS = ['Rookie', 'Gym Apprentice', 'Iron Warrior', 'Elite Athlete', 'Champion', 'Legend'];
const CAREER_XP = { strength: 0, endurance: 0, discipline: 0 };
const LOGIN_REWARDS = [
  { day: 1, label: '25 coins', coins: 25, icon: '🪙' },
  { day: 2, label: '50 coins', coins: 50, icon: '💰' },
  { day: 3, label: 'XP boost', boost: 1, icon: '⚡' },
  { day: 4, label: '75 coins', coins: 75, icon: '🪙' },
  { day: 5, label: 'Badge shard', badge: 'loginShard', icon: '💎' },
  { day: 6, label: '100 coins', coins: 100, icon: '🏦' },
  { day: 7, label: 'Epic reward', coins: 150, boost: 2, badge: 'epicLogin', icon: '🎁' },
];
const WEEKLY_CHALLENGES = [
  { id: 'workouts4', title: 'Complete 4 workouts', target: 4, icon: '🏋️', metric: (s) => weekWorkouts(s).length },
  { id: 'steps20k', title: 'Walk 20,000 steps', target: 20000, icon: '👟', metric: (s) => weeklySteps(s) },
  { id: 'water7', title: 'Drink water goal 7 days', target: 7, icon: '💧', metric: (s) => weeklyWaterDays(s) },
];

const GOALS = {
  strength: { label: 'Build Strength', focus: 'Strength', icon: '⚔️' },
  endurance: { label: 'Boost Endurance', focus: 'Endurance', icon: '🏃' },
  weightLoss: { label: 'Lose Weight', focus: 'Fat Burn', icon: '🔥' },
  mobility: { label: 'Move Better', focus: 'Mobility', icon: '🌿' },
};
const LEVELS = {
  beginner: { label: 'Beginner Adventurer', sets: 2, intensity: 'steady pace', count: 4 },
  intermediate: { label: 'Seasoned Squire', sets: 3, intensity: 'moderate intensity', count: 5 },
  advanced: { label: 'Elite Guardian', sets: 4, intensity: 'heroic intensity', count: 6 },
};
const AVATARS = ['🛡️', '🧙', '🥷', '🦊', '🐉', '🤖'];
const CLASSES = ['Paladin', 'Ranger', 'Mage', 'Monk'];
const SHOP_ITEMS = [
  { id: 'aura', name: 'Golden Aura', price: 90, icon: '✨', perk: 'Cosmetic hero glow' },
  { id: 'potion', name: 'Recovery Potion', price: 65, icon: '🧪', perk: 'Mark a rest day legendary' },
  { id: 'mount', name: 'Cardio Mount', price: 140, icon: '🐺', perk: '+5 bonus coins on cardio days' },
  { id: 'crown', name: 'Boss Crown', price: 220, icon: '👑', perk: 'Endgame bragging rights' },
  { id: 'frameNeon', name: 'Neon Avatar Frame', price: 180, icon: '🟪', perk: 'Unlockable avatar frame' },
  { id: 'titleBeast', name: 'Title: Hydration Beast', price: 120, icon: '🏷️', perk: 'Equippable title' },
];
const ACHIEVEMENTS = [
  { id: 'firstQuest', name: 'First Quest', icon: '🌟', desc: 'Complete your first workout.', test: (s) => historyEntries(s).length >= 1 },
  { id: 'level2', name: 'Level 2 Hero', icon: '⬆️', desc: 'Reach level 2.', test: (s) => getLevel(s.xp) >= 2 },
  { id: 'coinCollector', name: 'Coin Collector', icon: '🪙', desc: 'Earn 150 total coins.', test: (s) => s.lifetimeCoins >= 150 },
  { id: 'streak3', name: 'Triple Streak', icon: '🔥', desc: 'Build a 3-day streak.', test: (s) => getStreak(s) >= 3 },
  { id: 'bossSlayer', name: 'Boss Slayer', icon: '🐲', desc: 'Win a weekly boss battle.', test: (s) => s.bossWins >= 1 },
  { id: 'careerApprentice', name: 'Gym Apprentice', icon: '🎖️', desc: 'Reach the Gym Apprentice career rank.', test: (s) => getRankIndex(s) >= 1 },
  { id: 'waterLegend', name: 'Water Legend', icon: '💧', desc: 'Hit the water goal 7 days this week.', test: (s) => weeklyWaterDays(s) >= 7 },
];
const QUESTS = [
  ['Hydration Rune', 'Drink water before training', 8],
  ['Warm-up Ritual', 'Move for 5 minutes before the quest', 10],
  ['Protein Feast', 'Eat a protein-forward meal', 12],
];
const EXERCISE_POOLS = {
  Strength: [['Goblet Squat', 'controlled reps'], ['Push-ups', 'clean form'], ['Dumbbell Row', 'each side'], ['Romanian Deadlift', 'hinge focus'], ['Overhead Press', 'strong core'], ['Farmer Carry', '30 seconds']],
  Endurance: [['Zone 2 Walk/Jog', 'minutes'], ['Bike Intervals', 'rounds'], ['Row Machine', 'meters'], ['Step-ups', 'total reps'], ['Mountain Climbers', 'seconds'], ['Plank', 'seconds']],
  'Fat Burn': [['Incline Walk', 'minutes'], ['Kettlebell Swings', 'reps'], ['Squat to Press', 'reps'], ['Jump Rope', 'rounds'], ['Reverse Lunges', 'each side'], ['Dead Bug', 'reps']],
  Mobility: [['Yoga Flow', 'minutes'], ['World’s Greatest Stretch', 'each side'], ['Glute Bridge', 'reps'], ['Bird Dog', 'each side'], ['Cossack Squat', 'each side'], ['Breathing Reset', 'minutes']],
};
const DAY_ARCS = {
  Monday: ['Strength', 'Guild Initiation'], Tuesday: ['Endurance', 'Forest Run'], Wednesday: ['Mobility', 'Sanctuary Reset'], Thursday: ['Strength', 'Forge Trial'], Friday: ['Fat Burn', 'Arena Rush'], Saturday: ['Endurance', 'Dragon Chase'], Sunday: ['Mobility', 'Inn Recovery'],
};
const root = document.querySelector('#root');
let lastCompletion = null;
let state = normalizeState(loadState());

function normalizeState(saved = {}) {
  const base = { onboarded: false, profile: {}, character: { name: 'Rookie', class: 'Paladin', avatar: '🛡️', title: 'Level 1 Rookie', frame: 'Bronze Frame' }, plan: {}, selectedDay: todayName(), checked: {}, quests: {}, completedWorkouts: {}, xp: 0, coins: 0, lifetimeCoins: 0, spentCoins: 0, inventory: [], achievements: {}, bossWins: 0, careerXp: { ...CAREER_XP }, steps: {}, water: {}, login: { lastClaim: '', streak: 0, boosts: 0 }, weightLog: [], strengthLog: [] };
  const next = { ...base, ...saved };
  next.careerXp = { ...CAREER_XP, ...(next.careerXp || {}) };
  next.login = { lastClaim: '', streak: 0, boosts: 0, ...(next.login || {}) };
  next.steps = next.steps || {}; next.water = next.water || {}; next.weightLog = next.weightLog || []; next.strengthLog = next.strengthLog || [];
  if (!Object.keys(next.plan || {}).length) next.plan = generatePlan(next.profile);
  return next;
}
function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function todayName() { return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()); }
function dateKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function workoutKey(day = state.selectedDay) { return `${dateKey()}-${day}`; }
function getLevel(xp = state.xp) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
function levelProgress() { return Math.round(((state.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100); }
function totalCareerXp(s = state) { return Object.values(s.careerXp || {}).reduce((sum, value) => sum + Number(value || 0), 0); }
function getRankIndex(s = state) { return Math.min(RANKS.length - 1, Math.floor(totalCareerXp(s) / 220)); }
function currentRank(s = state) { return RANKS[getRankIndex(s)]; }
function rankProgress(s = state) { return getRankIndex(s) === RANKS.length - 1 ? 100 : Math.round((totalCareerXp(s) % 220) / 220 * 100); }
function weekStart(date = new Date()) { const d = new Date(date); const day = (d.getDay() + 6) % 7; d.setDate(d.getDate() - day); d.setHours(0,0,0,0); return d; }
function isThisWeek(date) { return new Date(date) >= weekStart(); }
function weekWorkouts(s = state) { return historyEntries(s).filter((item) => isThisWeek(item.date)); }
function weeklySteps(s = state) { return Object.entries(s.steps || {}).filter(([date]) => isThisWeek(date)).reduce((sum, [,v]) => sum + Number(v || 0), 0); }
function weeklyWaterDays(s = state) { return Object.entries(s.water || {}).filter(([date, v]) => v && isThisWeek(date)).length; }
function longestStreak(s = state) { const dates = [...new Set(historyEntries(s).map((h) => h.date))].sort(); let best = 0, run = 0, prev = null; dates.forEach((date) => { const cur = new Date(date); run = prev && (cur - prev) === 86400000 ? run + 1 : 1; best = Math.max(best, run); prev = cur; }); return best; }
function trend(list = [], fallback = 'No logs yet') { if (!list.length) return fallback; const first = Number.parseFloat(list[0].value); const last = Number.parseFloat(list[list.length - 1].value); if (Number.isNaN(first) || Number.isNaN(last)) return list[list.length - 1].value; const delta = last - first; return `${list[list.length - 1].value} (${delta >= 0 ? '+' : ''}${delta})`; }
function canClaimLogin() { return state.login.lastClaim !== dateKey(); }
function currentLoginReward() { return LOGIN_REWARDS[Math.min((state.login.streak || 0), LOGIN_REWARDS.length - 1)]; }
function historyEntries(s = state) { return Object.values(s.completedWorkouts || {}).filter((item) => item && item.day); }
function getStreak(s = state) { let count = 0; const cursor = new Date(); while (s.completedWorkouts[dateKey(cursor)]) { count++; cursor.setDate(cursor.getDate() - 1); } return count; }
function goalFocus(profile = state.profile) { return GOALS[profile.goal]?.focus || 'Strength'; }
function choose(pool, count) { return [...pool].sort(() => Math.random() - 0.5).slice(0, count); }
function repText(base, level) { return base.includes('minutes') ? `${level.sets * 8}-${level.sets * 10} ${base}` : base.includes('seconds') ? `${level.sets * 20}-${level.sets * 30} ${base}` : `${level.sets} sets • ${level.intensity} • ${base}`; }
function generatePlan(profile = state.profile) {
  const focus = goalFocus(profile);
  const level = LEVELS[profile.experience] || LEVELS.beginner;
  return Object.fromEntries(DAYS.map((day) => {
    const [fallbackFocus, arc] = DAY_ARCS[day];
    const dayFocus = day === 'Sunday' ? 'Mobility' : (day === 'Friday' ? 'Fat Burn' : (fallbackFocus === 'Strength' ? focus : fallbackFocus));
    const exercises = choose(EXERCISE_POOLS[dayFocus], level.count).map(([name, detail]) => [name, repText(detail, level)]);
    return [day, { title: `${arc}: ${dayFocus}`, focus: dayFocus, exercises, bossDamage: exercises.length * 10, theme: dayFocus.toLowerCase().replace(' ', '-') }];
  }));
}
function addRewards(xp, coins) { const old = getLevel(); state.xp += xp; state.coins += coins; state.lifetimeCoins += coins; return getLevel() > old; }
function checkAchievements() { const unlocked = []; ACHIEVEMENTS.forEach((a) => { if (!state.achievements[a.id] && a.test(state)) { state.achievements[a.id] = dateKey(); unlocked.push(a); } }); return unlocked; }
function dailyQuestKey(index) { return `${dateKey()}-${index}`; }

function submitOnboarding(form) {
  state.profile = { name: form.name.value.trim() || 'Hero', age: form.age.value, height: form.height.value, weight: form.weight.value, goal: form.goal.value, experience: form.experience.value };
  state.character = { name: form.heroName.value.trim() || `${state.profile.name}'s Hero`, class: form.heroClass.value, avatar: form.avatar.value, title: 'Level 1 Rookie', frame: 'Bronze Frame' };
  state.plan = generatePlan(state.profile); state.onboarded = true; state.checked = {}; state.completedWorkouts = {}; saveState(); render();
}
function toggleExercise(index) { const key = workoutKey(); if (state.completedWorkouts[key]) return; const checks = [...(state.checked[key] || [])]; checks[index] = !checks[index]; state.checked[key] = checks; saveState(); render(); }
function toggleQuest(index) { const key = dailyQuestKey(index); if (state.quests[key]) return; state.quests[key] = true; const leveled = addRewards(QUESTS[index][2], 5); const unlocked = checkAchievements(); lastCompletion = { title: QUESTS[index][0], xp: QUESTS[index][2], coins: 5, leveled, unlocked }; saveState(); render(); }
function completeWorkout() {
  const key = workoutKey(); const workout = state.plan[state.selectedDay]; const allDone = (state.checked[key] || []).filter(Boolean).length === workout.exercises.length;
  if (!allDone || state.completedWorkouts[key]) return;
  const bossBonus = state.selectedDay === 'Sunday' ? 90 : 0; const coinBonus = state.selectedDay === 'Sunday' ? 60 : 0; const boost = state.login.boosts > 0 ? 1.25 : 1; const earnedXp = Math.round((DAILY_XP_BONUS + bossBonus) * boost); if (state.login.boosts > 0) state.login.boosts--; grantCareerWorkout(workout); const leveled = addRewards(earnedXp, DAILY_COIN_BONUS + coinBonus);
  const entry = { id: key, date: dateKey(), day: state.selectedDay, title: workout.title, xp: earnedXp, coins: DAILY_COIN_BONUS + coinBonus, completed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  state.completedWorkouts[key] = entry; if (state.selectedDay === todayName()) state.completedWorkouts[dateKey()] = entry; if (state.selectedDay === 'Sunday') state.bossWins++;
  const unlocked = checkAchievements(); lastCompletion = { title: workout.title, xp: entry.xp, coins: entry.coins, leveled, unlocked }; saveState(); render();
}
function grantCareerWorkout(workout) {
  const map = { Strength: ['strength', 35], Endurance: ['endurance', 35], Mobility: ['discipline', 30], 'Fat Burn': ['endurance', 20] };
  const [primary, amount] = map[workout.focus] || ['discipline', 25];
  state.careerXp[primary] = (state.careerXp[primary] || 0) + amount;
  state.careerXp.discipline = (state.careerXp.discipline || 0) + 20;
  state.careerXp.strength = (state.careerXp.strength || 0) + 10;
  state.careerXp.endurance = (state.careerXp.endurance || 0) + 10;
}
function claimLoginReward() { if (!canClaimLogin()) return; const reward = currentLoginReward(); state.login.lastClaim = dateKey(); state.login.streak = Math.min((state.login.streak || 0) + 1, 7); if (reward.coins) { state.coins += reward.coins; state.lifetimeCoins += reward.coins; } if (reward.boost) state.login.boosts = (state.login.boosts || 0) + reward.boost; if (reward.badge) state.achievements[reward.badge] = dateKey(); lastCompletion = { title: `Daily Login Day ${reward.day}`, xp: reward.boost ? 'XP Boost' : 0, coins: reward.coins || 0, leveled: false, unlocked: [] }; saveState(); render(); }
function updateTracker(type, value) { if (type === 'steps') state.steps[dateKey()] = Math.max(0, Number(value || 0)); if (type === 'water') state.water[dateKey()] = value; saveState(); render(); }
function logProgress(type, value) { if (!value) return; const item = { date: dateKey(), value }; const key = type === 'weight' ? 'weightLog' : 'strengthLog'; state[key] = [...(state[key] || []).filter((x) => x.date !== item.date), item]; saveState(); render(); }
function buyItem(id) { const item = SHOP_ITEMS.find((i) => i.id === id); if (!item || state.inventory.includes(id) || state.coins < item.price) return; state.coins -= item.price; state.spentCoins += item.price; state.inventory.push(id); saveState(); render(); }
function resetOnboarding() { state.onboarded = false; saveState(); render(); }
function stat(label, value, hint, icon) { return `<div class="stat-card"><span>${icon} ${label}</span><strong>${value}</strong><small>${hint}</small></div>`; }
function progressBar(value) { return `<div class="progress"><span style="width:${Math.min(100, value)}%"></span></div>`; }

function renderOnboarding() { root.innerHTML = `<main class="onboarding"><section class="hero-card onboarding-card"><p class="eyebrow">Fitness RPG Setup</p><h1>Forge your fitness hero</h1><p>Answer a few questions and your Monday-Sunday quest plan will be personalized to your goal and experience.</p><form id="onboardingForm" class="onboarding-grid"><label>Name<input name="name" required placeholder="Alex" /></label><label>Age<input name="age" type="number" min="10" max="100" required /></label><label>Height<input name="height" placeholder="5'10 or 178 cm" required /></label><label>Weight<input name="weight" placeholder="170 lb or 77 kg" required /></label><label>Fitness goal<select name="goal">${Object.entries(GOALS).map(([k,g]) => `<option value="${k}">${g.icon} ${g.label}</option>`).join('')}</select></label><label>Experience<select name="experience">${Object.entries(LEVELS).map(([k,l]) => `<option value="${k}">${l.label}</option>`).join('')}</select></label><label>Hero name<input name="heroName" placeholder="Sir Sweatsalot" /></label><label>Class<select name="heroClass">${CLASSES.map((c) => `<option>${c}</option>`).join('')}</select></label><fieldset><legend>Avatar</legend>${AVATARS.map((a, i) => `<label class="avatar-choice"><input type="radio" name="avatar" value="${a}" ${i === 0 ? 'checked' : ''}/><span>${a}</span></label>`).join('')}</fieldset><button class="generate-button">Start Adventure</button></form></section></main>`; }
function render() { if (!state.onboarded) return renderOnboarding(); const today = todayName(); const workout = state.plan[state.selectedDay]; const key = workoutKey(); const checks = state.checked[key] || []; const done = checks.filter(Boolean).length; const allDone = done === workout.exercises.length; const completed = Boolean(state.completedWorkouts[key]); const history = historyEntries().sort((a,b) => b.id.localeCompare(a.id)); const bossHp = Math.max(0, 100 - DAYS.reduce((sum, d) => sum + (state.completedWorkouts[`${dateKey()}-${d}`] ? 14 : 0), 0));
  root.innerHTML = `<main class="app-shell"><section class="hero-card top-hero"><div class="character"><div class="avatar game-frame">${state.character.avatar}</div><div><p class="eyebrow">${state.character.title || 'Level 1 Rookie'} • ${state.character.class} • ${GOALS[state.profile.goal]?.label}</p><h1>${state.character.name}</h1><div class="rank-track"><b>${currentRank()}</b>${progressBar(rankProgress())}</div><p>${state.profile.name}, age ${state.profile.age} • ${state.profile.height} • ${state.profile.weight}</p>${progressBar(levelProgress())}<small>${state.xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP to next level</small></div></div><div class="hero-actions"><button class="ghost-button" data-action="reset">Edit Onboarding</button><button class="generate-button" data-action="generate">Regenerate Plan</button></div></section>${lastCompletion ? `<section class="loot-modal"><h2>Quest Complete: ${lastCompletion.title}</h2><div class="loot-row"><b>+${lastCompletion.xp} XP</b><b>+${lastCompletion.coins} coins</b><b>Level ${getLevel()} • ${levelProgress()}%</b></div>${lastCompletion.unlocked.length ? `<p>🏅 Unlocked: ${lastCompletion.unlocked.map((a) => a.name).join(', ')}</p>` : '<p>No new badges this time. Keep grinding!</p>'}<button data-action="dismiss" class="complete-button">Continue</button></section>` : ''}<section class="dashboard">${stat('Rank', currentRank(), `Career ${rankProgress()}%`, '🎖️')}${stat('Level', getLevel(), 'Hero power', '⭐')}${stat('XP', state.xp, `+${XP_PER_EXERCISE} per exercise`, '⚡')}${stat('Coins', state.coins, 'Spend in reward shop', '🪙')}${stat('Streak', `${getStreak()} days`, 'Daily clears', '🔥')}</section><section class="content-grid"><div><section class="weekly-page"><div class="section-title"><p class="eyebrow">Personalized weekly map</p><h2>Monday-Sunday workout plan</h2></div><div class="day-tabs">${DAYS.map((day) => `<button class="day-tab ${state.selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}" data-day="${day}"><span>${day.slice(0,3)}</span><strong>${state.plan[day].title}</strong><em>${state.completedWorkouts[`${dateKey()}-${day}`] ? 'Cleared' : today === day ? 'Today' : 'Quest'}</em></button>`).join('')}</div><article class="workout-card ${workout.theme}"><div class="workout-header"><div><p class="eyebrow">${state.selectedDay} ${state.selectedDay === 'Sunday' ? '• Weekly Boss' : '• Daily Dungeon'}</p><h2>${workout.title}</h2><p>${done}/${workout.exercises.length} moves completed • Boss damage ${workout.bossDamage}</p></div><div class="reward-badge">Clear: +${DAILY_XP_BONUS + (state.selectedDay === 'Sunday' ? 90 : 0)} XP · +${DAILY_COIN_BONUS + (state.selectedDay === 'Sunday' ? 60 : 0)} coins</div></div><div class="exercise-list">${workout.exercises.map(([name, detail], i) => `<label class="exercise-row ${checks[i] ? 'done' : ''}"><input type="checkbox" data-exercise="${i}" ${checks[i] ? 'checked' : ''} ${completed ? 'disabled' : ''}/><span class="exercise-copy"><strong>${name}</strong><small>${detail}</small></span><span class="xp-pill">+${XP_PER_EXERCISE} XP</span></label>`).join('')}</div><button class="complete-button" data-action="complete" ${!allDone || completed ? 'disabled' : ''}>${completed ? 'Workout Completed' : 'Complete Workout'}</button></article></section><section class="stats-page"><div class="section-title"><p class="eyebrow">Career statistics</p><h2>Hero record book</h2></div><div class="stats-grid">${stat('Workouts completed', historyEntries().length, 'All-time clears', '✅')}${stat('Current streak', `${getStreak()} days`, 'Active chain', '🔥')}${stat('Longest streak', `${longestStreak()} days`, 'Personal best', '🏆')}${stat('Total XP', state.xp + totalCareerXp(), 'Hero + career XP', '⚡')}${stat('Total coins', state.lifetimeCoins, 'Lifetime earned', '🪙')}${stat('Weight progress', trend(state.weightLog, state.profile.weight || 'Add a log'), 'Latest change', '⚖️')}${stat('Strength progress', trend(state.strengthLog, 'Add a PR'), 'Latest lift score', '💪')}</div><div class="log-row"><label>Log weight<input data-log="weight" placeholder="178 lb"></label><label>Log strength<input data-log="strength" placeholder="Bench 135"></label></div></section><section class="history-card"><h2>Workout history</h2><div class="history-list">${history.slice(0,8).map((h) => `<div><b>${h.day}</b><span>${h.title}</span><small>${h.date} ${h.completed} • +${h.xp} XP • +${h.coins} coins</small></div>`).join('') || '<p>No completed workouts yet. Your quest log is waiting.</p>'}</div></section></div><aside class="side-panel"><section class="panel login-panel"><h2>Daily login rewards</h2><div class="login-track">${LOGIN_REWARDS.map((r, i) => `<div class="login-day ${(state.login.streak || 0) > i ? 'claimed' : ''}"><span>${r.icon}</span><b>Day ${r.day}</b><small>${r.label}</small></div>`).join('')}</div><button class="complete-button" data-action="login" ${!canClaimLogin() ? 'disabled' : ''}>${canClaimLogin() ? `Claim ${currentLoginReward().label}` : 'Claimed today'}</button></section><section class="panel"><h2>Weekly challenges</h2>${WEEKLY_CHALLENGES.map((c) => { const value = c.metric(state); return `<div class="challenge"><b>${c.icon} ${c.title}</b><small>${Math.min(value, c.target).toLocaleString()} / ${c.target.toLocaleString()}</small>${progressBar((value / c.target) * 100)}</div>`; }).join('')}<label class="mini-input">Today steps<input type="number" min="0" value="${state.steps[dateKey()] || ''}" data-track="steps" placeholder="0"></label><label class="water-toggle"><input type="checkbox" data-track="water" ${state.water[dateKey()] ? 'checked' : ''}> Water goal complete today</label></section><section class="panel"><h2>Daily quests</h2>${QUESTS.map((q,i) => `<button class="quest ${state.quests[dailyQuestKey(i)] ? 'done' : ''}" data-quest="${i}" ${state.quests[dailyQuestKey(i)] ? 'disabled' : ''}><b>${q[0]}</b><span>${q[1]}</span><em>+${q[2]} XP • +5 coins</em></button>`).join('')}</section><section class="panel boss"><h2>Weekly boss battle 🐲</h2><p>Complete daily dungeons to weaken the Sunday dragon.</p>${progressBar(100 - bossHp)}<strong>${bossHp} HP remaining</strong></section><section class="panel"><h2>Reward shop</h2>${SHOP_ITEMS.map((item) => `<button class="shop-item" data-buy="${item.id}" ${state.inventory.includes(item.id) || state.coins < item.price ? 'disabled' : ''}><span>${item.icon}</span><b>${item.name}</b><small>${state.inventory.includes(item.id) ? 'Owned' : `${item.price} coins`} • ${item.perk}</small></button>`).join('')}</section><section class="panel"><h2>Achievement badges</h2><div class="badges">${ACHIEVEMENTS.map((a) => `<div class="badge ${state.achievements[a.id] ? 'unlocked' : ''}"><span>${a.icon}</span><b>${a.name}</b><small>${a.desc}</small></div>`).join('')}</div></section><section class="panel"><h2>Progress charts</h2><div class="bars">${DAYS.map((d) => { const c = state.completedWorkouts[`${dateKey()}-${d}`] ? 100 : 0; return `<label>${d.slice(0,3)}${progressBar(c)}</label>`; }).join('')}</div><p>Lifetime coins: ${state.lifetimeCoins} • Boss wins: ${state.bossWins}</p></section></aside></section></main>`; }

root.addEventListener('submit', (event) => { if (event.target.id === 'onboardingForm') { event.preventDefault(); submitOnboarding(event.target); } });
root.addEventListener('click', (event) => { const day = event.target.closest('[data-day]'); if (day) { state.selectedDay = day.dataset.day; saveState(); render(); } if (event.target.matches('[data-action="generate"]')) { state.plan = generatePlan(); state.checked = {}; saveState(); render(); } if (event.target.matches('[data-action="complete"]')) completeWorkout(); if (event.target.matches('[data-action="dismiss"]')) { lastCompletion = null; render(); } if (event.target.matches('[data-action="reset"]')) resetOnboarding(); if (event.target.matches('[data-action="login"]')) claimLoginReward(); const quest = event.target.closest('[data-quest]'); if (quest) toggleQuest(Number(quest.dataset.quest)); const buy = event.target.closest('[data-buy]'); if (buy) buyItem(buy.dataset.buy); });
root.addEventListener('change', (event) => { if (event.target.matches('[data-exercise]')) { const idx = Number(event.target.dataset.exercise); if (event.target.checked) addRewards(XP_PER_EXERCISE, 0); toggleExercise(idx); checkAchievements(); saveState(); } if (event.target.matches('[data-track="water"]')) updateTracker('water', event.target.checked); if (event.target.matches('[data-track="steps"]')) updateTracker('steps', event.target.value); });
root.addEventListener('keydown', (event) => { if (event.key === 'Enter' && event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); });
root.addEventListener('blur', (event) => { if (event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); }, true);
render();
