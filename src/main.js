const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const XP_PER_EXERCISE = 10;
const DAILY_XP_BONUS = 50;
const DAILY_COIN_BONUS = 25;
const XP_PER_LEVEL = 100;
const STORAGE_KEY = 'fitness-rpg-weekly-workout-v1';

const DEFAULT_WEEKLY_PLAN = {
  Monday: { title: 'Push Day', theme: 'forge', exercises: [['Bench Press', '3 sets x 8 reps'], ['Incline Dumbbell Press', '3 sets x 10 reps'], ['Shoulder Press', '3 sets x 10 reps'], ['Lateral Raises', '3 sets x 12 reps'], ['Tricep Pushdowns', '3 sets x 12 reps']] },
  Tuesday: { title: 'Pull Day', theme: 'forest', exercises: [['Lat Pulldown', '3 sets x 10 reps'], ['Seated Row', '3 sets x 10 reps'], ['Dumbbell Curls', '3 sets x 12 reps'], ['Hammer Curls', '3 sets x 12 reps'], ['Face Pulls', '3 sets x 15 reps']] },
  Wednesday: { title: 'Recovery Day', theme: 'sanctuary', exercises: [['30-minute walk', 'Low intensity movement'], ['Stretching', '10 minutes'], ['Light core workout', '3 rounds']] },
  Thursday: { title: 'Leg Day', theme: 'mountain', exercises: [['Leg Press', '4 sets x 8 reps'], ['Romanian Deadlift', '3 sets x 10 reps'], ['Leg Curls', '3 sets x 12 reps'], ['Calf Raises', '4 sets x 15 reps'], ['Walking Lunges', '3 sets x 12 reps']] },
  Friday: { title: 'Upper Body', theme: 'arena', exercises: [['Bench Press', '3 sets x 8 reps'], ['Row Machine', '3 sets x 10 reps'], ['Shoulder Press', '3 sets x 10 reps'], ['Lat Pulldown', '3 sets x 10 reps'], ['Bicep Curls', '3 sets x 12 reps']] },
  Saturday: { title: 'Cardio Challenge', theme: 'storm', exercises: [['Walk or jog', '30 minutes'], ['Bike or treadmill', '20 minutes'], ['Plank', '3 rounds']] },
  Sunday: { title: 'Rest Day', theme: 'inn', exercises: [['Rest', 'Recharge your hero'], ['Optional 20-minute walk', 'Easy pace'], ['Stretching', '5 minutes']] },
};

const TEMPLATE_POOLS = {
  Push: [['Bench Press', '3 sets x 8 reps'], ['Incline Dumbbell Press', '3 sets x 10 reps'], ['Push-ups', '3 sets x 12 reps'], ['Shoulder Press', '3 sets x 10 reps'], ['Lateral Raises', '3 sets x 12 reps'], ['Tricep Pushdowns', '3 sets x 12 reps'], ['Dips', '3 sets x 8 reps']],
  Pull: [['Lat Pulldown', '3 sets x 10 reps'], ['Seated Row', '3 sets x 10 reps'], ['One-arm Dumbbell Row', '3 sets x 10 reps'], ['Dumbbell Curls', '3 sets x 12 reps'], ['Hammer Curls', '3 sets x 12 reps'], ['Face Pulls', '3 sets x 15 reps'], ['Rear Delt Fly', '3 sets x 12 reps']],
  Recovery: [['30-minute walk', 'Low intensity movement'], ['Stretching', '10 minutes'], ['Light core workout', '3 rounds'], ['Yoga flow', '15 minutes'], ['Foam rolling', '10 minutes']],
  Legs: [['Leg Press', '4 sets x 8 reps'], ['Romanian Deadlift', '3 sets x 10 reps'], ['Goblet Squat', '3 sets x 10 reps'], ['Leg Curls', '3 sets x 12 reps'], ['Calf Raises', '4 sets x 15 reps'], ['Walking Lunges', '3 sets x 12 reps'], ['Step-ups', '3 sets x 10 reps']],
  Upper: [['Bench Press', '3 sets x 8 reps'], ['Row Machine', '3 sets x 10 reps'], ['Shoulder Press', '3 sets x 10 reps'], ['Lat Pulldown', '3 sets x 10 reps'], ['Bicep Curls', '3 sets x 12 reps'], ['Cable Fly', '3 sets x 12 reps'], ['Assisted Pull-ups', '3 sets x 8 reps']],
  Cardio: [['Walk or jog', '30 minutes'], ['Bike or treadmill', '20 minutes'], ['Rowing machine', '12 minutes'], ['Plank', '3 rounds'], ['Jump rope', '6 rounds'], ['Stair climber', '10 minutes']],
  Rest: [['Rest', 'Recharge your hero'], ['Optional 20-minute walk', 'Easy pace'], ['Stretching', '5 minutes'], ['Breathing drill', '5 minutes']],
};
const DAY_TEMPLATES = { Monday: 'Push', Tuesday: 'Pull', Wednesday: 'Recovery', Thursday: 'Legs', Friday: 'Upper', Saturday: 'Cardio', Sunday: 'Rest' };
const root = document.querySelector('#root');
let state = loadState();
state = { plan: DEFAULT_WEEKLY_PLAN, selectedDay: todayName(), checked: {}, completedWorkouts: {}, xp: 0, coins: 0, ...state };

function todayName() { return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()); }
function dateKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function dayStorageKey(day = state.selectedDay) { return `${dateKey()}-${day}`; }
function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function level() { return Math.floor(state.xp / XP_PER_LEVEL) + 1; }
function streak() {
  let count = 0;
  const cursor = new Date();
  while (state.completedWorkouts[dateKey(cursor)]) { count += 1; cursor.setDate(cursor.getDate() - 1); }
  return count;
}
function addXp(amount) {
  const oldLevel = level();
  state.xp += amount;
  if (level() > oldLevel) showLevelPopup();
}
function showLevelPopup() {
  const popup = document.createElement('div');
  popup.className = 'level-popup';
  popup.textContent = `✨ Level Up! You reached Level ${level()}! ✨`;
  document.body.append(popup);
  setTimeout(() => popup.remove(), 2200);
}
function choose(pool, count) { return [...pool].sort(() => Math.random() - 0.5).slice(0, count); }
function generateNewPlan() {
  state.plan = Object.fromEntries(DAYS.map((day) => {
    const type = DAY_TEMPLATES[day];
    const count = ['Recovery', 'Cardio', 'Rest'].includes(type) ? 3 : 5;
    return [day, { ...DEFAULT_WEEKLY_PLAN[day], exercises: choose(TEMPLATE_POOLS[type], count), generated: true }];
  }));
  state.checked = {};
  state.completedWorkouts = {};
  saveState();
  render();
}
function toggleExercise(index) {
  const key = dayStorageKey();
  if (state.completedWorkouts[key]) return;
  const checks = [...(state.checked[key] || [])];
  if (!checks[index]) addXp(XP_PER_EXERCISE);
  checks[index] = !checks[index];
  state.checked[key] = checks;
  saveState();
  render();
}
function completeWorkout() {
  const key = dayStorageKey();
  const workout = state.plan[state.selectedDay];
  const allDone = (state.checked[key] || []).filter(Boolean).length === workout.exercises.length;
  if (!allDone || state.completedWorkouts[key]) return;
  addXp(DAILY_XP_BONUS);
  state.coins += DAILY_COIN_BONUS;
  state.completedWorkouts[key] = true;
  if (state.selectedDay === todayName()) state.completedWorkouts[dateKey()] = true;
  saveState();
  render();
}
function stat(label, value, hint) { return `<div class="stat-card"><span>${label}</span><strong>${value}</strong><small>${hint}</small></div>`; }
function render() {
  const today = todayName();
  const workout = state.plan[state.selectedDay];
  const key = dayStorageKey();
  const checks = state.checked[key] || [];
  const completedCount = checks.filter(Boolean).length;
  const allDone = completedCount === workout.exercises.length;
  const workoutCompleted = Boolean(state.completedWorkouts[key]);
  root.innerHTML = `
    <main class="app-shell">
      <section class="hero-card"><div><p class="eyebrow">Fitness RPG</p><h1>Weekly Workout Quest Board</h1><p>Complete exercises, claim daily rewards, and keep your streak alive from Monday through Sunday.</p></div><button class="generate-button" data-action="generate">Generate New Weekly Plan</button></section>
      <section class="dashboard" aria-label="Hero stats dashboard">${stat('Level', level(), `${state.xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP to next`)}${stat('Total XP', state.xp, `+${XP_PER_EXERCISE} per exercise`)}${stat('Coins', state.coins, `+${DAILY_COIN_BONUS} per full workout`)}${stat('Streak', `${streak()} day${streak() === 1 ? '' : 's'}`, 'Daily workouts completed')}</section>
      <section class="weekly-page"><div class="section-title"><p class="eyebrow">Weekly Workout Page</p><h2>Choose a day quest</h2></div><div class="day-tabs">${DAYS.map((day) => `<button class="day-tab ${state.selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}" data-day="${day}"><span>${day.slice(0, 3)}</span><strong>${state.plan[day].title}</strong>${today === day ? '<em>Today</em>' : ''}</button>`).join('')}</div>
        <article class="workout-card ${workout.theme}"><div class="workout-header"><div><p class="eyebrow">${state.selectedDay}${today === state.selectedDay ? ' • Today' : ''}</p><h2>${workout.title}</h2><p>${completedCount}/${workout.exercises.length} exercises completed • ${completedCount * XP_PER_EXERCISE} XP earned from exercises</p></div><div class="reward-badge">Full clear: +${DAILY_XP_BONUS} XP · +${DAILY_COIN_BONUS} coins</div></div>
        <div class="exercise-list">${workout.exercises.map(([name, detail], index) => `<label class="exercise-row ${checks[index] ? 'done' : ''}"><input type="checkbox" data-exercise="${index}" ${checks[index] ? 'checked' : ''} ${workoutCompleted ? 'disabled' : ''}/><span class="exercise-copy"><strong>${name}</strong><small>${detail}</small></span><span class="xp-pill">+${XP_PER_EXERCISE} XP</span></label>`).join('')}</div><button class="complete-button" data-action="complete" ${!allDone || workoutCompleted ? 'disabled' : ''}>${workoutCompleted ? 'Workout Completed' : 'Complete Workout'}</button></article>
      </section>
      <section class="history-card"><h2>Completed Workout Log</h2><p>${Object.keys(state.completedWorkouts).filter((item) => state.completedWorkouts[item]).join(' · ') || 'No completed workouts yet. Your quest log is waiting.'}</p></section>
    </main>`;
}
root.addEventListener('click', (event) => {
  const dayButton = event.target.closest('[data-day]');
  if (dayButton) { state.selectedDay = dayButton.dataset.day; saveState(); render(); }
  if (event.target.matches('[data-action="generate"]')) generateNewPlan();
  if (event.target.matches('[data-action="complete"]')) completeWorkout();
});
root.addEventListener('change', (event) => {
  if (event.target.matches('[data-exercise]')) toggleExercise(Number(event.target.dataset.exercise));
});
render();
