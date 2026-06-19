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

const LOOT_BOXES = [
  { id: 'bronze', name: 'Bronze Training Cache', icon: '📦', weight: 58, coins: [18, 45], xp: [20, 55] },
  { id: 'silver', name: 'Silver Victory Chest', icon: '🎒', weight: 28, coins: [45, 90], xp: [45, 95] },
  { id: 'gold', name: 'Golden Champion Crate', icon: '🧰', weight: 11, coins: [90, 170], xp: [90, 165] },
  { id: 'mythic', name: 'Mythic Dragon Hoard', icon: '🗝️', weight: 3, coins: [160, 280], xp: [150, 260], rareAvatarChance: .55 },
];
const RANDOM_REWARDS = [
  { id: 'coinRain', label: 'Coin Rain', icon: '🌧️', coins: 35 },
  { id: 'focusSurge', label: 'Focus Surge', icon: '🧠', xp: 45 },
  { id: 'streakShield', label: 'Streak Shield', icon: '🛡️', shield: 1 },
  { id: 'doubleTomorrow', label: 'Tomorrow XP Charm', icon: '🔮', boosts: 1 },
];
const RARE_AVATARS = [
  { id: 'phoenix', icon: '🔥', name: 'Phoenix Reborn' },
  { id: 'cosmicKnight', icon: '🌌', name: 'Cosmic Knight' },
  { id: 'crystalGolem', icon: '💠', name: 'Crystal Golem' },
  { id: 'shadowDragon', icon: '🐲', name: 'Shadow Dragon' },
];
const SEASON_THEMES = ['Ember Trials', 'Frostforge Saga', 'Verdant Bloom', 'Stormpeak League', 'Solar Arena', 'Moonlit Odyssey'];

const WEEKLY_CHALLENGES = [
  { id: 'workouts4', title: 'Complete 4 workouts', target: 4, icon: '🏋️', metric: (s) => weekWorkouts(s).length },
  { id: 'steps20k', title: 'Walk 20,000 steps', target: 20000, icon: '👟', metric: (s) => weeklySteps(s) },
  { id: 'water7', title: 'Drink water goal 7 days', target: 7, icon: '💧', metric: (s) => weeklyWaterDays(s) },
];

const GOALS = {
  muscle: { label: 'Muscle Building', focus: 'Strength', icon: '💪' },
  fatLoss: { label: 'Fat Loss', focus: 'Fat Burn', icon: '🔥' },
  strength: { label: 'Strength', focus: 'Strength', icon: '⚔️' },
  endurance: { label: 'Endurance', focus: 'Endurance', icon: '🏃' },
  general: { label: 'General Fitness', focus: 'Endurance', icon: '✨' },
};
const STYLE_PREFERENCES = { male: 'Male', female: 'Female', neutral: 'Neutral' };
const THEME_COLORS = { default: 'Default RPG', pink: 'Pink', purple: 'Purple', dark: 'Dark' };
const TRAINING_FOCUS = { muscle: 'Muscle Building', fatLoss: 'Fat Loss', strength: 'Strength', endurance: 'Endurance', legsCore: 'Legs + Core' };
const LEVELS = {
  beginner: { label: 'Beginner Adventurer' },
  intermediate: { label: 'Seasoned Squire' },
  advanced: { label: 'Elite Guardian' },
};
const AVATARS = ['🛡️', '🧙', '🥷', '🦊', '🐉', '🤖'];
const THEME_AVATARS = ['🌸', '🧚', '🦄', '💜', '🌙', '👑'];
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
  { id: 'lootHunter', name: 'Loot Hunter', icon: '🎁', desc: 'Open 5 workout loot boxes.', test: (s) => (s.lootOpened || 0) >= 5 },
  { id: 'seasonHero', name: 'Season Hero', icon: '🏰', desc: 'Earn 1,000 seasonal XP.', test: (s) => currentSeason(s).xp >= 1000 },
  { id: 'rareAvatar', name: 'Rare Form', icon: '🦄', desc: 'Unlock a rare avatar.', test: (s) => Object.keys(s.rareAvatars || {}).length >= 1 },
];
const QUESTS = [
  ['Hydration Rune', 'Drink water before training', 8],
  ['Warm-up Ritual', 'Move for 5 minutes before the quest', 10],
  ['Protein Feast', 'Eat a protein-forward meal', 12],
];
const WORKOUT_PROGRAM = {
  Monday: {
    title: 'Upper Body A',
    focus: 'Strength',
    theme: 'strength',
    exercises: [
      ['Chest Press Machine', '3', '10', 'Sit tall, keep your shoulder blades back, and press the handles forward with control.', 'Machine push-ups or lighter chest press.', 'Dumbbell bench press.'],
      ['Lat Pulldown', '3', '10', 'Grip the bar just outside shoulder width and pull to your upper chest without leaning back hard.', 'Use a lighter weight or assisted band pulldown.', 'Assisted pull-ups or strict pull-ups.'],
      ['Seated Row', '3', '10', 'Pull the handle toward your ribs, squeeze your shoulder blades, then return slowly.', 'Use a lighter cable row.', 'Single-arm cable row with a pause.'],
      ['Dumbbell Shoulder Press', '3', '10', 'Start at shoulder height and press overhead while keeping your ribs down.', 'Seated machine shoulder press.', 'Standing dumbbell shoulder press.'],
      ['Dumbbell Curl', '3', '12', 'Keep elbows near your sides and curl without swinging.', 'Cable curl with light weight.', 'Alternating incline dumbbell curl.'],
      ['Tricep Pushdown', '3', '12', 'Pin elbows to your sides and press the rope or bar down until arms are straight.', 'Single-arm band pushdown.', 'Overhead cable tricep extension.'],
    ],
  },
  Tuesday: {
    title: 'Lower Body A',
    focus: 'Strength',
    theme: 'strength',
    exercises: [
      ['Leg Press', '4', '10', 'Place feet about shoulder width and lower the sled until knees bend comfortably, then press through mid-foot.', 'Bodyweight box squat.', 'Hack squat or heavier leg press.'],
      ['Leg Curl', '3', '12', 'Curl smoothly, pause briefly, and lower the weight under control.', 'Stability ball hamstring curl.', 'Single-leg machine curl.'],
      ['Leg Extension', '3', '12', 'Lift until knees are straight without locking hard, then lower slowly.', 'Terminal knee extensions with a band.', 'Single-leg leg extension.'],
      ['Walking Lunges', '3', '10 each leg', 'Step forward, lower with control, and push through the front foot to stand tall.', 'Static split squat holding support.', 'Dumbbell walking lunges.'],
      ['Calf Raises', '4', '15', 'Rise onto the balls of your feet, pause at the top, and lower fully.', 'Seated bodyweight calf raises.', 'Single-leg calf raises.'],
    ],
  },
  Wednesday: {
    title: 'Cardio + Core',
    focus: 'Endurance',
    theme: 'endurance',
    exercises: [
      ['Treadmill Walk', '1', '20 minutes', 'Walk at a pace where you can talk but still feel warm and focused.', 'Flat easy walk.', 'Incline walk or brisk walk.'],
      ['Bicycle Crunches', '3', '20', 'Rotate your torso slowly and reach opposite elbow toward opposite knee.', 'Dead bug.', 'Slow bicycle crunch with a pause.'],
      ['Plank', '3', '30 seconds', 'Brace your abs, squeeze glutes, and keep a straight line from shoulders to ankles.', 'Knee plank.', 'Long-lever plank.'],
      ['Leg Raises', '3', '15', 'Keep your low back controlled as you raise and lower your legs.', 'Bent-knee reverse crunch.', 'Hanging knee raises.'],
    ],
  },
  Thursday: {
    title: 'Push Day',
    focus: 'Strength',
    theme: 'strength',
    exercises: [
      ['Bench Press', '3', '8', 'Keep feet planted, lower the bar to your mid-chest, and press up smoothly.', 'Chest press machine.', 'Paused bench press.'],
      ['Incline Dumbbell Press', '3', '10', 'Press from upper-chest height while keeping wrists stacked over elbows.', 'Incline machine press.', 'Low-incline dumbbell press with slower tempo.'],
      ['Shoulder Press', '3', '10', 'Press overhead with a braced core and lower to shoulder level.', 'Machine shoulder press.', 'Standing barbell overhead press.'],
      ['Lateral Raises', '3', '12', 'Raise dumbbells to shoulder height with soft elbows and no shrugging.', 'Cable lateral raise with light weight.', 'Lean-away lateral raise.'],
      ['Tricep Pushdown', '3', '12', 'Keep elbows still and finish each rep by straightening your arms.', 'Band pushdown.', 'Rope pushdown with a 2-second squeeze.'],
    ],
  },
  Friday: {
    title: 'Pull Day',
    focus: 'Strength',
    theme: 'strength',
    exercises: [
      ['Lat Pulldown', '3', '10', 'Pull your elbows down toward your ribs and control the return.', 'Light wide-grip pulldown.', 'Assisted pull-up.'],
      ['Seated Row', '3', '10', 'Sit tall and row to your torso without yanking with your lower back.', 'Chest-supported machine row.', 'Single-arm dumbbell row.'],
      ['Face Pulls', '3', '15', 'Pull the rope toward your face with elbows high and squeeze rear shoulders.', 'Band pull-aparts.', 'Cable face pull with external rotation.'],
      ['Dumbbell Curl', '3', '12', 'Curl with palms up and keep your upper arms quiet.', 'Light cable curl.', 'Incline dumbbell curl.'],
      ['Hammer Curl', '3', '12', 'Curl with thumbs up and control the weight down.', 'Alternating light hammer curl.', 'Cross-body hammer curl.'],
    ],
  },
  Saturday: {
    title: 'Legs + Conditioning',
    focus: 'Fat Burn',
    theme: 'fat-burn',
    exercises: [
      ['Leg Press', '4', '8', 'Use a strong but controlled press and avoid bouncing at the bottom.', 'Goblet squat to a box.', 'Heavier leg press.'],
      ['Romanian Deadlift', '3', '10', 'Hinge at the hips, keep the weights close, and feel the stretch in hamstrings.', 'Dumbbell hip hinge practice.', 'Barbell Romanian deadlift.'],
      ['Leg Curl', '3', '12', 'Curl, pause briefly, then lower slowly to train the hamstrings.', 'Stability ball leg curl.', 'Single-leg curl.'],
      ['Calf Raises', '4', '15', 'Move through a full range of motion and pause at the top.', 'Bodyweight calf raises.', 'Weighted standing calf raises.'],
      ['Incline Treadmill Walk', '1', '15 minutes', 'Walk uphill at a steady pace while keeping posture tall.', 'Flat treadmill walk.', 'Higher incline or faster pace.'],
    ],
  },
  Sunday: {
    title: 'Recovery',
    focus: 'Mobility',
    theme: 'mobility',
    exercises: [
      ['Stretching', '1', '15 minutes', 'Move through gentle full-body stretches and breathe slowly.', 'Short 5-minute mobility flow.', 'Longer yoga-style recovery flow.'],
      ['Easy Walk', '1', '20 minutes', 'Keep the pace relaxed and use the walk to recover, not compete.', '10-minute easy walk.', '30-minute easy walk.'],
    ],
  },
};

const ENDURANCE_LEGS_CORE_PROGRAM = {
  Monday: { title: 'Glutes + Legs Endurance', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Leg Press', '4', '15', 'Set your feet shoulder-width on the platform, lower with control, then press through your heels without locking your knees.', 'Use a lighter weight or bodyweight box squats.', 'Use a slower 3-second lower or add weight.'],
    ['Hip Thrust Machine or Glute Bridge', '4', '12', 'Drive through your heels, squeeze glutes at the top, and keep your ribs down.', 'Bodyweight glute bridge on the floor.', 'Pause 2 seconds at the top or use a heavier machine setting.'],
    ['Walking Lunges', '3', '12 each leg', 'Step forward, lower until both knees bend, then push through the front foot to stand tall.', 'Static split squats holding a rail.', 'Hold dumbbells or add a longer walking path.'],
    ['Leg Curl', '3', '15', 'Curl smoothly, pause briefly, then lower the pad with control.', 'Use a lighter weight or stability ball hamstring curls.', 'Try single-leg curls.'],
    ['Stairmaster', '1', '10 minutes', 'Climb at a steady pace with tall posture and light hands on the rails.', 'Use a lower speed or do an incline walk.', 'Increase speed or add 2-5 minutes.'],
  ] },
  Tuesday: { title: 'Core + Cardio', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Treadmill Incline Walk', '1', '25 minutes', 'Walk uphill at a conversational pace while keeping shoulders relaxed.', 'Use flat treadmill walking.', 'Increase incline or add short brisk intervals.'],
    ['Plank', '3', '45 seconds', 'Brace your abs, squeeze glutes, and keep a straight line from head to heels.', 'Knee plank for 30 seconds.', 'Long-lever plank or add shoulder taps.'],
    ['Bicycle Crunches', '3', '20', 'Rotate slowly and bring opposite elbow toward opposite knee without pulling your neck.', 'Dead bugs.', 'Slow the tempo and pause each twist.'],
    ['Leg Raises', '3', '15', 'Keep your lower back controlled as your legs move up and down.', 'Bent-knee reverse crunches.', 'Hanging knee raises.'],
    ['Russian Twists', '3', '20', 'Sit tall, brace, and rotate side to side with controlled breathing.', 'Keep heels on the floor with no weight.', 'Hold a medicine ball or dumbbell.'],
  ] },
  Wednesday: { title: 'Lower Body Conditioning', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Goblet Squats', '3', '15', 'Hold the weight close to your chest, sit between your hips, and stand by driving through mid-foot.', 'Bodyweight squats to a box.', 'Use a heavier dumbbell or slow tempo.'],
    ['Step-Ups', '3', '12 each leg', 'Place your whole foot on the step, drive through the working leg, and lower gently.', 'Use a lower step or hold a rail.', 'Hold dumbbells or use a higher box.'],
    ['Cable Kickbacks', '3', '15 each leg', 'Keep hips square and kick back by squeezing the glute, not arching your back.', 'Bodyweight donkey kicks.', 'Add a pause at the top or more cable weight.'],
    ['Calf Raises', '4', '20', 'Rise onto your toes, pause, and lower through a full range.', 'Bodyweight calf raises holding support.', 'Single-leg or weighted calf raises.'],
    ['Bike', '1', '15 minutes', 'Pedal steadily at moderate effort with smooth breathing.', 'Lower resistance easy cycling.', 'Add resistance or alternate 1 minute hard, 1 minute easy.'],
  ] },
  Thursday: { title: 'Endurance Full Body', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Dumbbell Squat to Press', '3', '12', 'Squat with dumbbells at shoulders, stand, then press overhead with a braced core.', 'Bodyweight squat plus light shoulder press.', 'Use heavier dumbbells or reduce rest.'],
    ['Lat Pulldown', '3', '12', 'Pull the bar to your upper chest while keeping shoulders down and chest lifted.', 'Use lighter weight.', 'Assisted pull-ups or slower eccentrics.'],
    ['Seated Row', '3', '12', 'Row toward your ribs, squeeze shoulder blades, and return slowly.', 'Light cable row.', 'Pause each rep or use single-arm rows.'],
    ['Kettlebell Swings', '3', '15', 'Hinge at the hips and snap them forward to float the kettlebell to chest height.', 'Dumbbell Romanian deadlift practice.', 'Heavier swings or extra set.'],
    ['Treadmill Walk/Jog Intervals', '1', '15 minutes', 'Alternate comfortable walking and light jogging intervals.', 'Walk the full time.', 'Use longer jog intervals or a slight incline.'],
  ] },
  Friday: { title: 'Glutes + Core', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Hip Thrust', '4', '10', 'Set upper back on a bench, tuck ribs, and squeeze glutes hard at the top.', 'Floor glute bridges.', 'Barbell hip thrust or 2-second top pause.'],
    ['Romanian Deadlift', '3', '12', 'Hinge hips back with a soft knee bend and keep weights close to your legs.', 'Light dumbbell hip hinge.', 'Heavier dumbbells or barbell RDL.'],
    ['Abductor Machine', '4', '15', 'Sit tall and press knees outward with controlled tempo.', 'Side-lying clamshells.', 'Add a pause at the outer range.'],
    ['Cable Crunches', '3', '15', 'Kneel, brace, and curl ribs toward hips without pulling with arms.', 'Floor crunches.', 'Use more cable weight with strict control.'],
    ['Plank', '3', '60 seconds', 'Hold a strong brace and steady breathing without letting hips sag.', 'Knee plank or shorter holds.', 'Weighted plank or plank reaches.'],
  ] },
  Saturday: { title: 'Cardio Challenge', focus: 'Endurance', theme: 'soft-rpg', exercises: [
    ['Stairmaster', '1', '15 minutes', 'Climb steadily and keep pressure through your full foot.', 'Use a lower speed or step-ups.', 'Increase speed or add intervals.'],
    ['Incline Treadmill Walk', '1', '20 minutes', 'Walk with a tall chest, relaxed grip, and consistent breathing.', 'Flat walk.', 'Higher incline or brisk pace.'],
    ['Core Finisher', '3', '3 rounds', 'Cycle through 30 seconds each of plank, mountain climbers, and crunches with clean form.', 'Do 2 rounds with longer breaks.', 'Add a fourth round or shorten breaks.'],
  ] },
  Sunday: { title: 'Recovery', focus: 'Mobility', theme: 'soft-rpg', exercises: [
    ['Stretching', '1', '15 minutes', 'Move through gentle lower-body and back stretches with slow breathing.', 'Stretch for 5-10 minutes.', 'Add a guided yoga flow.'],
    ['Easy Walk', '1', '20 minutes', 'Keep effort easy and use the walk to recover.', 'Walk 10 minutes.', 'Walk 30 minutes.'],
    ['Mobility work', '1', '10 minutes', 'Do controlled hip circles, ankle rocks, and thoracic rotations.', 'Pick two easy mobility drills.', 'Add deep squat holds and longer flows.'],
  ] },
};

const LEGACY_GOAL_MAP = { weightLoss: 'fatLoss', mobility: 'general' };
const root = document.querySelector('#root');
let lastCompletion = null;
let state = normalizeState(loadState());

function normalizeState(saved = {}) {
  const base = { onboarded: false, profile: { stylePreference: 'neutral', themeColor: 'default', trainingFocus: 'endurance' }, character: { name: 'Rookie', class: 'Paladin', avatar: '🛡️', title: 'Level 1 Rookie', frame: 'Bronze Frame' }, plan: {}, selectedDay: todayName(), checked: {}, quests: {}, completedWorkouts: {}, xp: 0, coins: 0, lifetimeCoins: 0, spentCoins: 0, inventory: [], achievements: {}, bossWins: 0, careerXp: { ...CAREER_XP }, steps: {}, water: {}, login: { lastClaim: '', streak: 0, boosts: 0 }, weightLog: [], strengthLog: [], notifications: { enabled: false, questHour: '08:00' }, rareAvatars: {}, seasons: {}, penalties: {}, shields: 0, lootOpened: 0 };
  const next = { ...base, ...saved };
  next.careerXp = { ...CAREER_XP, ...(next.careerXp || {}) };
  next.login = { lastClaim: '', streak: 0, boosts: 0, ...(next.login || {}) };
  next.notifications = { enabled: false, questHour: '08:00', ...(next.notifications || {}) }; next.rareAvatars = next.rareAvatars || {}; next.seasons = next.seasons || {}; next.penalties = next.penalties || {}; next.steps = next.steps || {}; next.water = next.water || {}; next.weightLog = next.weightLog || []; next.strengthLog = next.strengthLog || [];
  next.profile.goal = LEGACY_GOAL_MAP[next.profile.goal] || next.profile.goal || 'endurance';
  next.profile.stylePreference = next.profile.stylePreference || 'neutral';
  next.profile.themeColor = next.profile.themeColor || 'default';
  next.profile.trainingFocus = next.profile.trainingFocus || next.profile.goal || 'endurance';
  next.plan = generatePlan(next.profile);
  return next;
}
function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { console.warn('Unable to persist Fitness RPG state:', error); } }
function todayName() { return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()); }
function dateKey(date = new Date()) {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString().slice(0, 10);
}
function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}
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
function historyEntries(s = state) {
  const entries = Object.values(s.completedWorkouts || {}).filter((item) => item && item.day);
  return [...new Map(entries.map((item) => [item.id || `${item.date}-${item.day}`, item])).values()];
}
function getStreak(s = state) { let count = 0; const cursor = new Date(); while (s.completedWorkouts[dateKey(cursor)]) { count++; cursor.setDate(cursor.getDate() - 1); } return count; }
function goalFocus(profile = state.profile) { return GOALS[profile.goal]?.focus || 'Endurance'; }
function goalModifier(profile = state.profile) { return LEGACY_GOAL_MAP[profile.goal] || profile.goal || 'endurance'; }
function isSoftTheme(profile = state.profile) { return profile.stylePreference === 'female' || ['pink', 'purple'].includes(profile.themeColor); }
function isEnduranceLegsCore(profile = state.profile) { return profile.stylePreference === 'female' && goalModifier(profile) === 'endurance' && profile.trainingFocus === 'legsCore'; }
function themeClass(profile = state.profile) { return `theme-${profile.themeColor || 'default'} ${isSoftTheme(profile) ? 'soft-rpg-mode' : ''}`.trim(); }
function restTime(goal = goalModifier()) {
  if (goal === 'strength') return '2–3 minutes';
  if (goal === 'fatLoss') return '45–60 seconds';
  if (goal === 'muscle') return '60–90 seconds';
  return '60–90 seconds';
}
function repsForGoal(baseReps, goal = goalModifier()) {
  if (goal !== 'strength') return baseReps;
  if (/minute|second|each leg/i.test(baseReps)) return baseReps;
  return '5–8';
}
function goalCue(goal = goalModifier()) {
  if (goal === 'muscle') return 'Goal: increase weight when all reps are completed.';
  if (goal === 'fatLoss') return 'Goal: add 15 minutes cardio after this workout.';
  if (goal === 'strength') return 'Goal: use lower reps with heavier, controlled sets.';
  return 'Goal: keep the standard workout structure.';
}
function exerciseDetail([, sets, reps, instructions, easier, harder], profile = state.profile) {
  const goal = goalModifier(profile);
  return `Sets: ${sets} • Reps: ${repsForGoal(reps, goal)} • Rest: ${restTime(goal)} • Instructions: ${instructions} • Easier: ${easier} • Harder: ${harder} • ${goalCue(goal)}`;
}
function generatePlan(profile = state.profile) {
  return Object.fromEntries(DAYS.map((day) => {
    const sourceProgram = isEnduranceLegsCore(profile) ? ENDURANCE_LEGS_CORE_PROGRAM : WORKOUT_PROGRAM;
    const workout = sourceProgram[day];
    const exercises = workout.exercises.map((exercise) => [exercise[0], exerciseDetail(exercise, profile)]);
    return [day, { title: workout.title, focus: workout.focus, exercises, bossDamage: exercises.length * 10, theme: workout.theme }];
  }));
}
function addRewards(xp, coins) { const old = getLevel(); state.xp += xp; state.coins += coins; state.lifetimeCoins += coins; return getLevel() > old; }
function checkAchievements() { const unlocked = []; ACHIEVEMENTS.forEach((a) => { if (!state.achievements[a.id] && a.test(state)) { state.achievements[a.id] = dateKey(); unlocked.push(a); } }); return unlocked; }
function dailyQuestKey(index) { return `${dateKey()}-${index}`; }

function mulberry32(seed) { return function() { let t = seed += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hashString(value) { return [...String(value)].reduce((hash, char) => Math.imul(31, hash) + char.charCodeAt(0) | 0, 7); }
function pickWeighted(items, rand = Math.random) { const total = items.reduce((sum, item) => sum + item.weight, 0); let roll = rand() * total; return items.find((item) => (roll -= item.weight) <= 0) || items[0]; }
function rangeRoll([min, max], rand = Math.random) { return Math.round(min + rand() * (max - min)); }
function monthKey(date = new Date()) { return date.toISOString().slice(0, 7); }
function currentSeason(s = state) { const key = monthKey(); if (!s.seasons[key]) s.seasons[key] = { xp: 0, claimed: {}, theme: SEASON_THEMES[Math.abs(hashString(key)) % SEASON_THEMES.length] }; return s.seasons[key]; }
function seasonLevel(s = state) { return Math.floor(currentSeason(s).xp / 250) + 1; }
function seasonProgress(s = state) { return Math.round((currentSeason(s).xp % 250) / 250 * 100); }
function previousDateKey(daysBack = 1) { const d = new Date(); d.setDate(d.getDate() - daysBack); return dateKey(d); }
function missedPenaltyDue() { const yesterday = previousDateKey(); return !state.completedWorkouts[yesterday] && state.penalties.lastChecked !== dateKey() && state.onboarded; }
function applyMissedPenalty() { if (!missedPenaltyDue()) return null; state.penalties.lastChecked = dateKey(); if (state.shields > 0) { state.shields--; state.penalties.last = { date: dateKey(), shielded: true, coins: 0 }; saveState(); return state.penalties.last; } const loss = Math.min(state.coins, 20); state.coins -= loss; state.penalties.last = { date: dateKey(), shielded: false, coins: loss }; saveState(); return state.penalties.last; }
function rewardStreak() { let count = 0; const cursor = new Date(); cursor.setDate(cursor.getDate() - 1); while (state.completedWorkouts[dateKey(cursor)]) { count++; cursor.setDate(cursor.getDate() - 1); } return count; }
function streakMultiplier() { const streak = Math.max(getStreak(), rewardStreak()); if (streak >= 14) return 2; if (streak >= 7) return 1.75; if (streak >= 3) return 1.35; return 1; }
function rollWorkoutLoot(seedKey) { const rand = mulberry32(hashString(seedKey)); const box = pickWeighted(LOOT_BOXES, rand); const reward = RANDOM_REWARDS[Math.floor(rand() * RANDOM_REWARDS.length)]; const loot = { box, reward, xp: rangeRoll(box.xp, rand), coins: rangeRoll(box.coins, rand), rareAvatar: null };
  if (box.rareAvatarChance && rand() < box.rareAvatarChance) loot.rareAvatar = RARE_AVATARS.find((a) => !state.rareAvatars[a.id]) || null;
  return loot;
}
function grantLoot(loot) { addRewards(loot.xp + (loot.reward.xp || 0), loot.coins + (loot.reward.coins || 0)); currentSeason().xp += loot.xp + (loot.reward.xp || 0); if (loot.reward.boosts) state.login.boosts = (state.login.boosts || 0) + loot.reward.boosts; if (loot.reward.shield) state.shields = (state.shields || 0) + loot.reward.shield; if (loot.rareAvatar) { state.rareAvatars[loot.rareAvatar.id] = dateKey(); state.character.avatar = loot.rareAvatar.icon; } state.lootOpened = (state.lootOpened || 0) + 1; }
function requestQuestNotifications() { state.notifications.enabled = true; if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission().then(() => render()); saveState(); render(); }
function setQuestHour(value) { state.notifications.questHour = value || '08:00'; saveState(); render(); }


function submitOnboarding(form) {
  state.profile = { name: form.name.value.trim() || 'Hero', age: form.age.value, height: form.height.value, weight: form.weight.value, goal: form.goal.value, experience: form.experience.value, stylePreference: form.stylePreference.value, themeColor: form.themeColor.value, trainingFocus: form.trainingFocus.value };
  state.character = { name: form.heroName.value.trim() || `${state.profile.name}'s Hero`, class: form.heroClass.value, avatar: form.avatar.value, title: 'Level 1 Rookie', frame: isSoftTheme(state.profile) ? 'Bloom Frame' : 'Bronze Frame' };
  state.plan = generatePlan(state.profile); state.onboarded = true; state.checked = {}; state.completedWorkouts = {}; saveState(); render();
}
function toggleExercise(index, checked) {
  const key = workoutKey();
  const workout = state.plan[state.selectedDay];
  if (state.completedWorkouts[key] || !workout?.exercises?.[index]) return;
  const checks = [...(state.checked[key] || [])];
  const wasChecked = Boolean(checks[index]);
  const shouldCheck = typeof checked === 'boolean' ? checked : !wasChecked;
  checks[index] = shouldCheck;
  state.checked[key] = checks;
  if (shouldCheck && !wasChecked) addRewards(XP_PER_EXERCISE, 0);
  checkAchievements();
  saveState();
  render();
}
function toggleQuest(index) { const key = dailyQuestKey(index); if (state.quests[key]) return; state.quests[key] = true; const leveled = addRewards(QUESTS[index][2], 5); const unlocked = checkAchievements(); lastCompletion = { title: QUESTS[index][0], xp: QUESTS[index][2], coins: 5, leveled, unlocked }; saveState(); render(); }
function completeWorkout() {
  const key = workoutKey(); const workout = state.plan[state.selectedDay]; const allDone = workout.exercises.every((_, index) => Boolean((state.checked[key] || [])[index]));
  if (!allDone || state.completedWorkouts[key]) return;
  const bossBonus = state.selectedDay === 'Sunday' ? 90 : 0; const coinBonus = state.selectedDay === 'Sunday' ? 60 : 0; const boost = (state.login.boosts > 0 ? 1.25 : 1) * streakMultiplier(); const earnedXp = Math.round((DAILY_XP_BONUS + bossBonus) * boost); if (state.login.boosts > 0) state.login.boosts--; grantCareerWorkout(workout); const leveled = addRewards(earnedXp, DAILY_COIN_BONUS + coinBonus); currentSeason().xp += earnedXp; const loot = rollWorkoutLoot(key); grantLoot(loot);
  const entry = { id: key, date: dateKey(), day: state.selectedDay, title: workout.title, xp: earnedXp, coins: DAILY_COIN_BONUS + coinBonus, completed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  state.completedWorkouts[key] = entry; if (state.selectedDay === todayName()) state.completedWorkouts[dateKey()] = entry; if (state.selectedDay === 'Sunday') state.bossWins++;
  const unlocked = checkAchievements(); lastCompletion = { title: workout.title, xp: entry.xp + loot.xp + (loot.reward.xp || 0), coins: entry.coins + loot.coins + (loot.reward.coins || 0), leveled, unlocked, loot, multiplier: boost }; saveState(); render();
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
function stat(label, value, hint, icon) { return `<div class="stat-card"><span>${escapeHtml(icon)} ${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></div>`; }
function progressBar(value) { const width = Math.max(0, Math.min(100, Number(value) || 0)); return `<div class="progress"><span style="width:${width}%"></span></div>`; }

function optionList(items, selected = '') { return Object.entries(items).map(([value, label]) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${label}</option>`).join(''); }
function avatarChoices(selected = AVATARS[0]) { return [...AVATARS, ...THEME_AVATARS].map((a, i) => `<label class="avatar-choice"><input type="radio" name="avatar" value="${a}" ${selected === a || (!selected && i === 0) ? 'checked' : ''}/><span>${a}</span></label>`).join(''); }
function renderOnboarding() { root.innerHTML = `<main class="onboarding ${themeClass(state.profile)}"><section class="hero-card onboarding-card"><p class="eyebrow">Fitness RPG Setup</p><h1>Forge your fitness hero</h1><p>Choose your style, theme, and training focus. Female style plus Endurance and Legs + Core unlocks the new glutes, core, and cardio questline.</p><form id="onboardingForm" class="onboarding-grid"><label>Name<input name="name" required placeholder="Alex" value="${escapeHtml(state.profile.name || '')}" /></label><label>Age<input name="age" type="number" min="10" max="100" required value="${escapeHtml(state.profile.age || '')}" /></label><label>Height<input name="height" placeholder="5'10 or 178 cm" required value="${escapeHtml(state.profile.height || '')}" /></label><label>Weight<input name="weight" placeholder="170 lb or 77 kg" required value="${escapeHtml(state.profile.weight || '')}" /></label><label>Gender/style preference<select name="stylePreference">${optionList(STYLE_PREFERENCES, state.profile.stylePreference)}</select></label><label>Theme color<select name="themeColor">${optionList(THEME_COLORS, state.profile.themeColor)}</select></label><label>Fitness goal<select name="goal">${Object.entries(GOALS).map(([k,g]) => `<option value="${k}" ${state.profile.goal === k ? 'selected' : ''}>${g.icon} ${g.label}</option>`).join('')}</select></label><label>Training focus<select name="trainingFocus">${optionList(TRAINING_FOCUS, state.profile.trainingFocus)}</select></label><label>Experience<select name="experience">${Object.entries(LEVELS).map(([k,l]) => `<option value="${k}" ${state.profile.experience === k ? 'selected' : ''}>${l.label}</option>`).join('')}</select></label><label>Hero name<input name="heroName" placeholder="Sir Sweatsalot" value="${escapeHtml(state.character.name || '')}" /></label><label>Class<select name="heroClass">${CLASSES.map((c) => `<option ${state.character.class === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label><fieldset><legend>Avatar</legend>${avatarChoices(state.character.avatar)}</fieldset><button class="generate-button">Start Adventure</button></form></section></main>`; }
function render() { if (!state.onboarded) return renderOnboarding(); applyMissedPenalty(); if (!DAYS.includes(state.selectedDay)) state.selectedDay = todayName(); if (!state.plan?.[state.selectedDay]) state.plan = generatePlan(state.profile); const today = todayName(); const workout = state.plan[state.selectedDay]; const key = workoutKey(); const checks = state.checked[key] || []; const done = checks.filter(Boolean).length; const allDone = workout.exercises.every((_, index) => Boolean(checks[index])); const completed = Boolean(state.completedWorkouts[key]); const history = historyEntries().sort((a,b) => b.id.localeCompare(a.id)); const bossHp = Math.max(0, 100 - DAYS.reduce((sum, d) => sum + (state.completedWorkouts[`${dateKey()}-${d}`] ? 14 : 0), 0));
  root.innerHTML = `<main class="app-shell ${themeClass(state.profile)}"><section id="home" class="hero-card top-hero"><div class="character"><div class="avatar game-frame">${escapeHtml(state.character.avatar)}</div><div><p class="eyebrow">${escapeHtml(state.character.title || 'Level 1 Rookie')} • ${escapeHtml(state.character.class)} • ${escapeHtml(GOALS[state.profile.goal]?.label || 'Custom Goal')}</p><h1>${escapeHtml(state.character.name)}</h1><div class="rank-track"><b>${currentRank()}</b>${progressBar(rankProgress())}</div><p>${escapeHtml(state.profile.name)}, age ${escapeHtml(state.profile.age)} • ${escapeHtml(state.profile.height)} • ${escapeHtml(state.profile.weight)}</p>${progressBar(levelProgress())}<small>${state.xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP to next level</small></div></div><div class="hero-actions"><button class="ghost-button" data-action="reset">Edit Settings</button><button class="generate-button" data-action="generate">Regenerate Plan</button></div></section>${lastCompletion ? `<section class="loot-modal reward-screen"><div class="confetti">✦ ✧ ✦ ✧ ✦</div><h2>Quest Complete: ${lastCompletion.title}</h2>${lastCompletion.loot ? `<div class="chest-pop"><span>${lastCompletion.loot.box.icon}</span><b>${lastCompletion.loot.box.name}</b><small>${lastCompletion.loot.reward.icon} Random reward: ${lastCompletion.loot.reward.label}</small></div>` : ''}<div class="loot-row"><b>+${lastCompletion.xp} XP</b><b>+${lastCompletion.coins} coins</b><b>${lastCompletion.multiplier ? `${lastCompletion.multiplier}× streak XP` : `Level ${getLevel()} • ${levelProgress()}%`}</b></div>${lastCompletion.loot?.rareAvatar ? `<p class="rare-unlock">🦄 Rare avatar unlocked: ${lastCompletion.loot.rareAvatar.name} ${lastCompletion.loot.rareAvatar.icon}</p>` : ''}${lastCompletion.unlocked.length ? `<p>🏅 Unlocked: ${lastCompletion.unlocked.map((a) => a.name).join(', ')}</p>` : '<p>No new badges this time. Keep grinding!</p>'}<button data-action="dismiss" class="complete-button">Continue</button></section>` : ''}<section class="dashboard">${stat('Rank', currentRank(), `Career ${rankProgress()}%`, '🎖️')}${stat('Level', getLevel(), 'Hero power', '⭐')}${stat('XP', state.xp, `+${XP_PER_EXERCISE} per exercise`, '⚡')}${stat('Coins', state.coins, 'Spend in reward shop', '🪙')}${stat('Streak', `${getStreak()} days`, `${streakMultiplier()}× XP multiplier`, '🔥')}${stat('Style', STYLE_PREFERENCES[state.profile.stylePreference] || 'Neutral', `${THEME_COLORS[state.profile.themeColor] || 'Default RPG'} theme`, '🎨')}${stat('Season', `Lv ${seasonLevel()}`, `${currentSeason().theme} • ${seasonProgress()}%`, '🏰')}</section><section class="content-grid"><div><section id="quest" class="weekly-page"><div class="section-title"><p class="eyebrow">Personalized weekly map</p><h2>Monday-Sunday workout plan</h2></div><div class="day-tabs">${DAYS.map((day) => `<button class="day-tab ${state.selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}" data-day="${day}"><span>${day.slice(0,3)}</span><strong>${escapeHtml(state.plan[day].title)}</strong><em>${state.completedWorkouts[`${dateKey()}-${day}`] ? 'Cleared' : today === day ? 'Today' : 'Quest'}</em></button>`).join('')}</div><article class="workout-card ${workout.theme}"><div class="workout-header"><div><p class="eyebrow">${state.selectedDay} ${state.selectedDay === 'Sunday' ? '• Weekly Boss' : '• Daily Dungeon'}</p><h2>${escapeHtml(workout.title)}</h2><p>${done}/${workout.exercises.length} moves completed • Boss damage ${workout.bossDamage}</p></div><div class="reward-badge">Clear: +${Math.round((DAILY_XP_BONUS + (state.selectedDay === 'Sunday' ? 90 : 0)) * streakMultiplier())} XP · +${DAILY_COIN_BONUS + (state.selectedDay === 'Sunday' ? 60 : 0)} coins</div></div><div class="exercise-list">${workout.exercises.map(([name, detail], i) => `<label class="exercise-row ${checks[i] ? 'done' : ''}"><input type="checkbox" data-exercise="${i}" ${checks[i] ? 'checked' : ''} ${completed ? 'disabled' : ''}/><span class="exercise-copy"><strong>${escapeHtml(name)}</strong><small>${escapeHtml(detail)}</small></span><span class="xp-pill">+${XP_PER_EXERCISE} XP</span></label>`).join('')}</div><button class="complete-button" data-action="complete" ${!allDone || completed ? 'disabled' : ''}>${completed ? 'Workout Completed' : 'Complete Workout'}</button></article></section><section id="progress" class="stats-page"><div class="section-title"><p class="eyebrow">Career statistics</p><h2>Hero record book</h2></div><div class="stats-grid">${stat('Workouts completed', historyEntries().length, 'All-time clears', '✅')}${stat('Current streak', `${getStreak()} days`, 'Active chain', '🔥')}${stat('Longest streak', `${longestStreak()} days`, 'Personal best', '🏆')}${stat('Total XP', state.xp + totalCareerXp(), 'Hero + career XP', '⚡')}${stat('Total coins', state.lifetimeCoins, 'Lifetime earned', '🪙')}${stat('Weight progress', trend(state.weightLog, state.profile.weight || 'Add a log'), 'Latest change', '⚖️')}${stat('Strength progress', trend(state.strengthLog, 'Add a PR'), 'Latest lift score', '💪')}</div><div class="log-row"><label>Log weight<input data-log="weight" placeholder="178 lb"></label><label>Log strength<input data-log="strength" placeholder="Bench 135"></label></div></section><section class="history-card"><h2>Workout history</h2><div class="history-list">${history.slice(0,8).map((entry) => `<div><b>${escapeHtml(entry.day)}</b><span>${escapeHtml(entry.title)}</span><small>${escapeHtml(entry.date)} ${escapeHtml(entry.completed)} • +${entry.xp} XP • +${entry.coins} coins</small></div>`).join('') || '<p>No completed workouts yet. Your quest log is waiting.</p>'}</div></section></div><aside id="rewards" class="side-panel"><section class="panel notification-panel"><h2>Daily quest notifications</h2><p>Get a daily nudge to keep your streak alive and avoid missed-workout penalties.</p><label class="mini-input">Reminder time<input type="time" value="${state.notifications.questHour}" data-notify-hour></label><button class="complete-button" data-action="notify">${state.notifications.enabled ? 'Notifications armed' : 'Enable quest reminders'}</button><small>${'Notification' in window ? `Browser permission: ${Notification.permission}` : 'Browser notifications unavailable here'} • Shields: ${state.shields || 0}</small>${state.penalties.last?.date === dateKey() ? `<p class="penalty">${state.penalties.last.shielded ? '🛡️ Streak shield blocked yesterday’s penalty.' : `💔 Missed workout penalty: -${state.penalties.last.coins} coins.`}</p>` : ''}</section><section class="panel season-panel"><h2>Monthly season</h2><p>${currentSeason().theme} resets each month. Earn season XP from workouts and loot.</p>${progressBar(seasonProgress())}<strong>Season level ${seasonLevel()} • ${currentSeason().xp} XP</strong></section><section class="panel avatar-panel"><h2>Rare avatars</h2><div class="rare-grid">${RARE_AVATARS.map((a) => `<div class="rare-avatar ${state.rareAvatars[a.id] ? 'unlocked' : ''}"><span>${state.rareAvatars[a.id] ? a.icon : '❔'}</span><b>${a.name}</b></div>`).join('')}</div></section><section class="panel login-panel"><h2>Daily login rewards</h2><div class="login-track">${LOGIN_REWARDS.map((r, i) => `<div class="login-day ${(state.login.streak || 0) > i ? 'claimed' : ''}"><span>${r.icon}</span><b>Day ${r.day}</b><small>${r.label}</small></div>`).join('')}</div><button class="complete-button" data-action="login" ${!canClaimLogin() ? 'disabled' : ''}>${canClaimLogin() ? `Claim ${currentLoginReward().label}` : 'Claimed today'}</button></section><section class="panel"><h2>Weekly challenges</h2>${WEEKLY_CHALLENGES.map((c) => { const value = c.metric(state); return `<div class="challenge"><b>${c.icon} ${c.title}</b><small>${Math.min(value, c.target).toLocaleString()} / ${c.target.toLocaleString()}</small>${progressBar((value / c.target) * 100)}</div>`; }).join('')}<label class="mini-input">Today steps<input type="number" min="0" value="${state.steps[dateKey()] || ''}" data-track="steps" placeholder="0"></label><label class="water-toggle"><input type="checkbox" data-track="water" ${state.water[dateKey()] ? 'checked' : ''}> Water goal complete today</label></section><section class="panel"><h2>Daily quests</h2>${QUESTS.map((q,i) => `<button class="quest ${state.quests[dailyQuestKey(i)] ? 'done' : ''}" data-quest="${i}" ${state.quests[dailyQuestKey(i)] ? 'disabled' : ''}><b>${q[0]}</b><span>${q[1]}</span><em>+${q[2]} XP • +5 coins</em></button>`).join('')}</section><section class="panel boss"><h2>Weekly boss battle 🐲</h2><p>Complete daily dungeons to weaken the Sunday dragon.</p>${progressBar(100 - bossHp)}<strong>${bossHp} HP remaining</strong></section><section class="panel"><h2>Reward shop</h2>${SHOP_ITEMS.map((item) => `<button class="shop-item" data-buy="${item.id}" ${state.inventory.includes(item.id) || state.coins < item.price ? 'disabled' : ''}><span>${item.icon}</span><b>${item.name}</b><small>${state.inventory.includes(item.id) ? 'Owned' : `${item.price} coins`} • ${item.perk}</small></button>`).join('')}</section><section class="panel"><h2>Achievement badges</h2><div class="badges">${ACHIEVEMENTS.map((a) => `<div class="badge ${state.achievements[a.id] ? 'unlocked' : ''}"><span>${a.icon}</span><b>${a.name}</b><small>${a.desc}</small></div>`).join('')}</div></section><section class="panel"><h2>Progress charts</h2><div class="bars">${DAYS.map((d) => { const c = state.completedWorkouts[`${dateKey()}-${d}`] ? 100 : 0; return `<label>${d.slice(0,3)}${progressBar(c)}</label>`; }).join('')}</div><p>Lifetime coins: ${state.lifetimeCoins} • Boss wins: ${state.bossWins}</p></section></aside></section><nav class="bottom-nav" aria-label="Primary mobile navigation"><a href="#home"><span>🏠</span>Home</a><a href="#quest"><span>⚔️</span>Quest</a><a href="#progress"><span>📈</span>Stats</a><a href="#rewards"><span>🎁</span>Loot</a></nav></main>`; }

root.addEventListener('submit', (event) => { if (event.target.id === 'onboardingForm') { event.preventDefault(); submitOnboarding(event.target); } });
root.addEventListener('click', (event) => { const day = event.target.closest('[data-day]'); if (day) { state.selectedDay = day.dataset.day; saveState(); render(); } if (event.target.matches('[data-action="generate"]')) { state.plan = generatePlan(state.profile); state.checked = {}; saveState(); render(); } if (event.target.matches('[data-action="complete"]')) completeWorkout(); if (event.target.matches('[data-action="dismiss"]')) { lastCompletion = null; render(); } if (event.target.matches('[data-action="reset"]')) resetOnboarding(); if (event.target.matches('[data-action="login"]')) claimLoginReward(); if (event.target.matches('[data-action="notify"]')) requestQuestNotifications(); const quest = event.target.closest('[data-quest]'); if (quest) toggleQuest(Number(quest.dataset.quest)); const buy = event.target.closest('[data-buy]'); if (buy) buyItem(buy.dataset.buy); });
root.addEventListener('change', (event) => { if (event.target.matches('[data-exercise]')) { const idx = Number(event.target.dataset.exercise); toggleExercise(idx, event.target.checked); } if (event.target.matches('[data-track="water"]')) updateTracker('water', event.target.checked); if (event.target.matches('[data-track="steps"]')) updateTracker('steps', event.target.value); if (event.target.matches('[data-notify-hour]')) setQuestHour(event.target.value); });
root.addEventListener('keydown', (event) => { if (event.key === 'Enter' && event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); });
root.addEventListener('blur', (event) => { if (event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); }, true);
render();
