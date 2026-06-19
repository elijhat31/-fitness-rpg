const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const XP_PER_EXERCISE = 12;
const DAILY_XP_BONUS = 60;
const DAILY_COIN_BONUS = 35;
const XP_PER_LEVEL = 140;
const STORAGE_KEY = 'fitness-rpg-complete-v2';
const RANKS = [
  { id: 'novice', name: 'Novice', range: 'Level 1–10', min: 1, max: 10, glow: 1 },
  { id: 'adventurer', name: 'Adventurer', range: 'Level 11–25', min: 11, max: 25, glow: 2 },
  { id: 'champion', name: 'Champion', range: 'Level 26–50', min: 26, max: 50, glow: 3 },
  { id: 'veteran', name: 'Veteran', range: 'Level 51–75', min: 51, max: 75, glow: 4 },
  { id: 'mythic', name: 'Mythic', range: 'Level 76–100', min: 76, max: 100, glow: 5 },
  { id: 'legend', name: 'Legend', range: 'Level 100+', min: 101, max: Infinity, glow: 6 },
];
const CAREER_XP = { strength: 0, endurance: 0, discipline: 0 };
const LOGIN_REWARDS = [
  { day: 1, label: '25 coins', coins: 25, icon: 'coins' },
  { day: 2, label: '50 coins', coins: 50, icon: 'wallet' },
  { day: 3, label: 'XP boost', boost: 1, icon: 'zap' },
  { day: 4, label: '75 coins', coins: 75, icon: 'coins' },
  { day: 5, label: 'Badge shard', badge: 'loginShard', icon: 'gem' },
  { day: 6, label: '100 coins', coins: 100, icon: 'landmark' },
  { day: 7, label: 'Epic reward', coins: 150, boost: 2, badge: 'epicLogin', icon: 'gift' },
];

const LOOT_BOXES = [
  { id: 'bronze', name: 'Bronze Training Cache', icon: 'package', weight: 58, coins: [18, 45], xp: [20, 55] },
  { id: 'silver', name: 'Silver Victory Chest', icon: 'briefcase', weight: 28, coins: [45, 90], xp: [45, 95] },
  { id: 'gold', name: 'Golden Champion Crate', icon: 'box', weight: 11, coins: [90, 170], xp: [90, 165] },
  { id: 'mythic', name: 'Mythic Dragon Hoard', icon: 'key', weight: 3, coins: [160, 280], xp: [150, 260], rareAvatarChance: .55 },
];
const RANDOM_REWARDS = [
  { id: 'coinRain', label: 'Coin Rain', icon: 'cloud-rain', coins: 35 },
  { id: 'focusSurge', label: 'Focus Surge', icon: 'brain', xp: 45 },
  { id: 'streakShield', label: 'Streak Shield', icon: 'shield', shield: 1 },
  { id: 'doubleTomorrow', label: 'Tomorrow XP Charm', icon: 'sparkles', boosts: 1 },
];
const RARE_AVATARS = [
  { id: 'phoenix', icon: 'flame', name: 'Phoenix Reborn' },
  { id: 'cosmicKnight', icon: 'orbit', name: 'Cosmic Knight' },
  { id: 'crystalGolem', icon: 'gem', name: 'Crystal Golem' },
  { id: 'shadowDragon', icon: 'dragon', name: 'Shadow Dragon' },
];
const SEASON_THEMES = ['Ember Trials', 'Frostforge Saga', 'Verdant Bloom', 'Stormpeak League', 'Solar Arena', 'Moonlit Odyssey'];

const WEEKLY_CHALLENGES = [
  { id: 'workouts4', title: 'Complete 4 workouts', target: 4, icon: 'dumbbell', metric: (s) => weekWorkouts(s).length },
  { id: 'steps20k', title: 'Walk 20,000 steps', target: 20000, icon: 'footprints', metric: (s) => weeklySteps(s) },
  { id: 'water7', title: 'Drink water goal 7 days', target: 7, icon: 'droplet', metric: (s) => weeklyWaterDays(s) },
];

const GOALS = {
  muscle: { label: 'Muscle Building', focus: 'Strength', icon: 'biceps' },
  fatLoss: { label: 'Fat Loss', focus: 'Fat Burn', icon: 'flame' },
  strength: { label: 'Strength', focus: 'Strength', icon: 'swords' },
  endurance: { label: 'Endurance', focus: 'Endurance', icon: 'runner' },
  general: { label: 'General Fitness', focus: 'Endurance', icon: 'sparkles' },
};
const STYLE_PREFERENCES = { male: 'Male', female: 'Female', neutral: 'Neutral' };
const THEME_COLORS = { default: 'Default RPG', pink: 'Pink', purple: 'Purple', dark: 'Dark' };
const TRAINING_FOCUS = { muscle: 'Muscle Building', fatLoss: 'Fat Loss', strength: 'Strength', endurance: 'Endurance', legsCore: 'Legs + Core' };
const LEVELS = {
  beginner: { label: 'Beginner Adventurer' },
  intermediate: { label: 'Seasoned Squire' },
  advanced: { label: 'Elite Guardian' },
};
const AVATARS = ['gladiator', 'shadow', 'berserker', 'paladin', 'voidwalker', 'ranger'];
const THEME_AVATARS = ['nova', 'pulse', 'apex', 'onyx', 'lunar', 'regal'];
const CLASSES = ['Gladiator', 'Shadow', 'Berserker', 'Paladin', 'Voidwalker', 'Ranger'];
const AVATAR_ARCHETYPES = {
  gladiator: { name: 'Gladiator', focus: 'Strength', icon: 'shield', desc: 'Heavy arena armor, shield discipline, and relentless strength training.', stats: { Strength: 96, Endurance: 70, Agility: 45, Recovery: 52, Focus: 64 }, accents: ['#ffd36a', '#b32222'] },
  shadow: { name: 'Shadow', focus: 'Agility + Endurance', icon: 'swords', desc: 'Hooded rogue armor built for speed, stamina, and controlled movement.', stats: { Strength: 52, Endurance: 82, Agility: 96, Recovery: 56, Focus: 78 }, accents: ['#8f5bff', '#111827'] },
  berserker: { name: 'Berserker', focus: 'Power + Intensity', icon: 'flame', desc: 'Aggressive crimson plate for explosive lifts and high-intensity battles.', stats: { Strength: 94, Endurance: 66, Agility: 58, Recovery: 42, Focus: 60 }, accents: ['#ff453a', '#f7b733'] },
  paladin: { name: 'Paladin', focus: 'Recovery + Balance', icon: 'medal', desc: 'Knight armor with gold-blue wards for balanced fitness and resilient recovery.', stats: { Strength: 74, Endurance: 72, Agility: 58, Recovery: 92, Focus: 76 }, accents: ['#7db7ff', '#ffe08a'] },
  voidwalker: { name: 'Voidwalker', focus: 'Endurance + Control', icon: 'orbit', desc: 'Dark purple mystical armor for composed endurance and deep training control.', stats: { Strength: 60, Endurance: 94, Agility: 68, Recovery: 62, Focus: 96 }, accents: ['#b875ff', '#15102b'] },
  ranger: { name: 'Ranger', focus: 'Precision + Hybrid', icon: 'runner', desc: 'Athletic fantasy armor for precise hybrid strength, cardio, and mobility work.', stats: { Strength: 70, Endurance: 84, Agility: 86, Recovery: 66, Focus: 82 }, accents: ['#37d8a6', '#4e7dff'] },
};
const SHOP_ITEMS = [
  { id: 'aura', name: 'Golden Aura', price: 90, icon: 'sparkles', perk: 'Cosmetic hero glow' },
  { id: 'potion', name: 'Recovery Potion', price: 65, icon: 'flask', perk: 'Mark a rest day legendary' },
  { id: 'mount', name: 'Cardio Mount', price: 140, icon: 'route', perk: '+5 bonus coins on cardio days' },
  { id: 'crown', name: 'Boss Crown', price: 220, icon: 'crown', perk: 'Endgame bragging rights' },
  { id: 'frameNeon', name: 'Neon Avatar Frame', price: 180, icon: 'frame', perk: 'Unlockable avatar frame' },
  { id: 'titleBeast', name: 'Title: Hydration Beast', price: 120, icon: 'tag', perk: 'Equippable title' },
];
const ACHIEVEMENTS = [
  { id: 'firstQuest', name: 'First Quest', icon: 'star', desc: 'Complete your first workout.', test: (s) => historyEntries(s).length >= 1 },
  { id: 'level2', name: 'Level 2 Hero', icon: 'arrow-up', desc: 'Reach level 2.', test: (s) => getLevel(s.xp) >= 2 },
  { id: 'coinCollector', name: 'Coin Collector', icon: 'coins', desc: 'Earn 150 total coins.', test: (s) => s.lifetimeCoins >= 150 },
  { id: 'streak3', name: 'Triple Streak', icon: 'flame', desc: 'Build a 3-day streak.', test: (s) => getStreak(s) >= 3 },
  { id: 'bossSlayer', name: 'Boss Slayer', icon: 'dragon', desc: 'Win a weekly boss battle.', test: (s) => s.bossWins >= 1 },
  { id: 'careerApprentice', name: 'Gym Apprentice', icon: 'medal', desc: 'Reach the Gym Apprentice career rank.', test: (s) => getRankIndex(s) >= 1 },
  { id: 'waterLegend', name: 'Water Legend', icon: 'droplet', desc: 'Hit the water goal 7 days this week.', test: (s) => weeklyWaterDays(s) >= 7 },
  { id: 'lootHunter', name: 'Loot Hunter', icon: 'gift', desc: 'Open 5 workout loot boxes.', test: (s) => (s.lootOpened || 0) >= 5 },
  { id: 'seasonHero', name: 'Season Hero', icon: 'castle', desc: 'Earn 1,000 seasonal XP.', test: (s) => currentSeason(s).xp >= 1000 },
  { id: 'rareAvatar', name: 'Rare Form', icon: 'sparkles', desc: 'Unlock a rare avatar.', test: (s) => Object.keys(s.rareAvatars || {}).length >= 1 },
];
const QUESTS = [
  ['Hydration Rune', 'Drink water before training', 8],
  ['Warm-up Ritual', 'Move for 5 minutes before the quest', 10],
  ['Protein Feast', 'Eat a protein-forward meal', 12],
];
const PLAN_LIBRARY = {
  muscle: {
    Monday: ['Chest + Triceps Hypertrophy', 'Strength', 'strength', [['Machine Chest Press', '4', '8–12'], ['Incline Dumbbell Press', '3', '10–12'], ['Pec Deck Fly', '3', '12–15'], ['Cable Tricep Pushdown', '3', '10–12'], ['Overhead Dumbbell Extension', '3', '12']]],
    Tuesday: ['Back + Biceps Volume', 'Strength', 'strength', [['Lat Pulldown', '4', '8–12'], ['Chest-Supported Row', '3', '10–12'], ['Single-Arm Dumbbell Row', '3', '10 each'], ['Preacher Curl Machine', '3', '10–12'], ['Hammer Curl', '3', '12']]],
    Wednesday: ['Leg Hypertrophy', 'Strength', 'strength', [['Leg Press', '4', '10–12'], ['Romanian Deadlift', '3', '8–10'], ['Leg Extension', '3', '12–15'], ['Seated Leg Curl', '3', '12–15'], ['Standing Calf Raise', '4', '12–15']]],
    Thursday: ['Shoulders + Arms Pump', 'Strength', 'strength', [['Dumbbell Shoulder Press', '4', '8–12'], ['Cable Lateral Raise', '4', '12–15'], ['Rear Delt Fly Machine', '3', '12–15'], ['EZ-Bar Curl', '3', '10–12'], ['Rope Tricep Extension', '3', '12']]],
    Friday: ['Upper Progressive Overload', 'Strength', 'strength', [['Dumbbell Bench Press', '4', '8–10'], ['Seated Cable Row', '4', '8–10'], ['Machine Shoulder Press', '3', '10'], ['Lat Pulldown', '3', '10–12'], ['Cable Curl + Pushdown Superset', '3', '12 each']]],
    Saturday: ['Lower + Glute Volume', 'Strength', 'strength', [['Hack Squat', '4', '8–12'], ['Hip Thrust Machine', '4', '10–12'], ['Walking Lunges', '3', '12 each'], ['Leg Curl', '3', '12–15'], ['Calf Press', '4', '15']]],
    Sunday: ['Hypertrophy Recovery', 'Mobility', 'mobility', [['Easy Bike', '1', '20 minutes'], ['Full-Body Mobility Flow', '1', '15 minutes'], ['Band Pull-Aparts', '2', '20']]],
  },
  fatLoss: {
    Monday: ['Metabolic Upper Supersets', 'Fat Burn', 'fat-burn', [['Push-Up + Row Superset', '4', '12 each'], ['Dumbbell Thrusters', '3', '15'], ['Battle Ropes', '5', '30 seconds'], ['Incline Walk Finisher', '1', '15 minutes']]],
    Tuesday: ['Lower Body Circuit', 'Fat Burn', 'fat-burn', [['Goblet Squat', '4', '15'], ['Reverse Lunge', '3', '12 each'], ['Kettlebell Swings', '4', '20'], ['Calf Raise', '3', '20'], ['Bike Sprints', '8', '20 seconds']]],
    Wednesday: ['Cardio Core Burn', 'Endurance', 'fat-burn', [['Treadmill Intervals', '1', '25 minutes'], ['Mountain Climbers', '4', '40 seconds'], ['Plank Jacks', '3', '30 seconds'], ['Bicycle Crunches', '3', '25']]],
    Thursday: ['Full-Body Density Circuit', 'Fat Burn', 'fat-burn', [['Dumbbell Deadlift to Row', '4', '12'], ['Step-Up to Press', '3', '12 each'], ['Cable Woodchop', '3', '15 each'], ['Row Erg Finisher', '1', '10 minutes']]],
    Friday: ['HIIT + Upper Tone', 'Fat Burn', 'fat-burn', [['Lat Pulldown', '3', '15'], ['Machine Chest Press', '3', '15'], ['Seated Row', '3', '15'], ['Assault Bike Intervals', '10', '30 seconds']]],
    Saturday: ['Calorie Burn Challenge', 'Fat Burn', 'fat-burn', [['Sled Push or Treadmill Push', '6', '30 seconds'], ['Walking Lunges', '4', '20 steps'], ['Medicine Ball Slams', '4', '15'], ['Incline Walk', '1', '20 minutes']]],
    Sunday: ['Active Recovery Walk', 'Mobility', 'mobility', [['Easy Walk', '1', '30 minutes'], ['Stretching', '1', '15 minutes']]],
  },
  strength: {
    Monday: ['Heavy Squat Day', 'Strength', 'strength', [['Back Squat or Leg Press', '5', '3–5'], ['Romanian Deadlift', '4', '5–6'], ['Split Squat', '3', '6 each'], ['Heavy Calf Raise', '4', '8']]],
    Tuesday: ['Heavy Bench Day', 'Strength', 'strength', [['Bench Press', '5', '3–5'], ['Incline Dumbbell Press', '4', '6'], ['Barbell Row', '4', '5–6'], ['Weighted Dip or Pushdown', '3', '6–8']]],
    Wednesday: ['Strength Recovery + Core', 'Mobility', 'mobility', [['Easy Bike', '1', '15 minutes'], ['Dead Bug', '3', '8 each'], ['Side Plank', '3', '30 seconds'], ['Hip Mobility', '1', '10 minutes']]],
    Thursday: ['Heavy Deadlift Day', 'Strength', 'strength', [['Deadlift', '5', '3'], ['Front Squat', '4', '4–6'], ['Hamstring Curl', '3', '8'], ['Farmer Carry', '4', '40 yards']]],
    Friday: ['Heavy Overhead + Pull', 'Strength', 'strength', [['Overhead Press', '5', '3–5'], ['Pull-Up or Lat Pulldown', '4', '5–6'], ['Seated Row', '4', '6'], ['Barbell Curl', '3', '6–8']]],
    Saturday: ['Power Accessories', 'Strength', 'strength', [['Box Squat', '4', '3'], ['Paused Bench Press', '4', '4'], ['Hip Thrust', '4', '5'], ['Loaded Carry', '5', '30 yards']]],
    Sunday: ['Long Rest + Mobility', 'Mobility', 'mobility', [['Stretching', '1', '20 minutes'], ['Easy Walk', '1', '20 minutes']]],
  },
  endurance: {
    Monday: ['Aerobic Base Run/Walk', 'Endurance', 'endurance', [['Treadmill Run/Walk', '1', '35 minutes'], ['Walking Lunges', '3', '20 steps'], ['Plank', '3', '60 seconds']]],
    Tuesday: ['Cardio Circuit', 'Endurance', 'endurance', [['Row Erg', '4', '5 minutes'], ['Bodyweight Squats', '4', '20'], ['Push-Ups', '4', '15'], ['Mountain Climbers', '4', '45 seconds']]],
    Wednesday: ['Bike Endurance + Core', 'Endurance', 'endurance', [['Stationary Bike', '1', '40 minutes'], ['Russian Twists', '3', '30'], ['Leg Raises', '3', '20']]],
    Thursday: ['Tempo Intervals', 'Endurance', 'endurance', [['Treadmill Tempo Intervals', '6', '3 minutes'], ['Step-Ups', '3', '15 each'], ['Cable Row', '3', '15']]],
    Friday: ['Full-Body Endurance Lift', 'Endurance', 'endurance', [['Dumbbell Squat to Press', '4', '15'], ['Lat Pulldown', '3', '15'], ['Kettlebell Swings', '4', '20'], ['Battle Ropes', '5', '30 seconds']]],
    Saturday: ['Long Cardio Quest', 'Endurance', 'endurance', [['Outdoor Walk/Jog or Elliptical', '1', '50 minutes'], ['Core Circuit', '3', '4 rounds']]],
    Sunday: ['Recovery Cardio', 'Mobility', 'mobility', [['Easy Walk', '1', '30 minutes'], ['Mobility Flow', '1', '15 minutes']]],
  },
  general: {
    Monday: ['Balanced Upper Body', 'Strength', 'strength', [['Chest Press Machine', '3', '10'], ['Lat Pulldown', '3', '10'], ['Seated Row', '3', '12'], ['Dumbbell Shoulder Press', '3', '10']]],
    Tuesday: ['Balanced Lower Body', 'Strength', 'strength', [['Leg Press', '3', '10'], ['Romanian Deadlift', '3', '10'], ['Leg Curl', '3', '12'], ['Calf Raise', '3', '15']]],
    Wednesday: ['Cardio + Core Balance', 'Endurance', 'endurance', [['Treadmill Walk', '1', '25 minutes'], ['Plank', '3', '40 seconds'], ['Bicycle Crunches', '3', '20']]],
    Thursday: ['Functional Full Body', 'Endurance', 'endurance', [['Goblet Squat', '3', '12'], ['Dumbbell Row', '3', '12'], ['Push-Ups', '3', '10'], ['Farmer Carry', '3', '40 yards']]],
    Friday: ['Machines + Mobility', 'Strength', 'strength', [['Machine Chest Press', '3', '12'], ['Cable Row', '3', '12'], ['Leg Extension', '3', '12'], ['Stretching', '1', '10 minutes']]],
    Saturday: ['Conditioning Mix', 'Fat Burn', 'fat-burn', [['Incline Walk', '1', '20 minutes'], ['Kettlebell Deadlift', '3', '12'], ['Step-Ups', '3', '12 each'], ['Core Circuit', '3', '3 rounds']]],
    Sunday: ['Restorative Recovery', 'Mobility', 'mobility', [['Easy Walk', '1', '20 minutes'], ['Full-Body Mobility', '1', '15 minutes']]],
  },
};

const LEGACY_GOAL_MAP = { weightLoss: 'fatLoss', mobility: 'general' };
const FOCUS_LABEL_PREFIX = { muscle: 'Hypertrophy', fatLoss: 'Fat-Loss', strength: 'Strength', endurance: 'Endurance', legsCore: 'Legs + Core' };
const FOCUS_DETAIL = {
  muscle: 'moderate reps, machines and dumbbells, progressive overload',
  fatLoss: 'supersets, cardio finishers, circuits, and short rest',
  strength: 'heavier lifts, lower reps, and longer rest',
  endurance: 'more cardio, circuits, higher reps, and shorter rest',
  legsCore: 'glutes, quads, hamstrings, calves, abs, and conditioning',
};
const EXPERIENCE_MODS = {
  beginner: 'Choose conservative loads and leave 2–3 reps in reserve.',
  intermediate: 'Add load or reps weekly when form stays clean.',
  advanced: 'Push the final set hard while preserving strict technique.',
};

function normalizeProfileForPlan(profile = state?.profile || {}) {
  const fitnessGoal = LEGACY_GOAL_MAP[profile.fitnessGoal || profile.goal] || profile.fitnessGoal || profile.goal || 'general';
  return {
    genderStyle: profile.genderStyle || profile.stylePreference || 'neutral',
    themeColor: profile.themeColor || 'default',
    fitnessGoal,
    trainingFocus: LEGACY_GOAL_MAP[profile.trainingFocus] || profile.trainingFocus || fitnessGoal,
    experienceLevel: profile.experienceLevel || profile.experience || 'beginner',
  };
}

function planTypeLabel(profile = state.profile) {
  const planProfile = normalizeProfileForPlan(profile);
  return `${GOALS[planProfile.fitnessGoal]?.label || 'General Fitness'} + ${TRAINING_FOCUS[planProfile.trainingFocus] || 'General Fitness'}`;
}

function workoutInstruction(name, focus, profile) {
  const focusText = FOCUS_DETAIL[focus] || FOCUS_DETAIL[profile.fitnessGoal] || 'balanced training';
  const experienceText = EXPERIENCE_MODS[profile.experienceLevel] || EXPERIENCE_MODS.beginner;
  const styleText = profile.genderStyle === 'female' ? 'Prioritize controlled tempo, posture, and confident form.' : 'Use clean form and steady breathing.';
  const themeText = profile.themeColor !== 'default' ? `Keep the ${THEME_COLORS[profile.themeColor] || profile.themeColor} quest energy high.` : 'Keep the RPG quest pace steady.';
  return `${name} emphasis: ${focusText}. ${experienceText} ${styleText} ${themeText}`;
}

function detailFromPlanExercise([name, sets, reps], focus, profile) {
  return [name, sets, reps, workoutInstruction(name, focus, profile), `Reduce load, reps, or rounds for ${profile.experienceLevel} recovery.`, `Add load, reps, rounds, or shorten rest when all work is crisp.`];
}

function applyTrainingFocus(goalDay, day, profile) {
  const focus = profile.trainingFocus;
  if (focus === profile.fitnessGoal && profile.genderStyle !== 'female') return goalDay;
  const [title, dayFocus, theme, exercises] = goalDay;
  const prefix = FOCUS_LABEL_PREFIX[focus] || 'Focused';
  const focusBlocks = {
    muscle: [['Machine Chest Press', '3', '10–12'], ['Dumbbell Row', '3', '10–12'], ['Cable Lateral Raise', '3', '12–15']],
    fatLoss: [['Superset Circuit', '4', '12–15'], ['Battle Ropes', '5', '30 seconds'], ['Cardio Finisher', '1', '12 minutes']],
    strength: [['Main Heavy Lift', '5', '3–5'], ['Accessory Lift', '4', '5–6'], ['Loaded Carry', '4', '30 yards']],
    endurance: [['Steady Cardio', '1', day === 'Saturday' ? '45 minutes' : '30 minutes'], ['High-Rep Circuit', '4', '15–20'], ['Core Conditioning', '3', '45 seconds']],
    legsCore: [['Hip Thrust or Glute Bridge', '4', '12–15'], ['Quad/Hamstring Superset', '3', '15 each'], ['Calves + Abs Circuit', '4', '20 reps']]
  };
  const selected = focusBlocks[focus] || focusBlocks.endurance;
  const merged = day === 'Sunday' ? [...exercises, selected[2]] : [...selected, ...exercises.slice(0, 2)];
  const resolvedTheme = focus === 'fatLoss' ? 'fat-burn' : focus === 'endurance' ? 'endurance' : (focus === 'legsCore' && profile.genderStyle === 'female') ? 'soft-rpg' : theme;
  const resolvedFocus = focus === 'fatLoss' ? 'Fat Burn' : focus === 'strength' || focus === 'muscle' ? 'Strength' : focus === 'legsCore' ? 'Endurance' : dayFocus;
  return [`${prefix} ${title}`, resolvedFocus, resolvedTheme, merged];
}

function generateWorkoutPlan(profile = state.profile) {
  const planProfile = normalizeProfileForPlan(profile);
  const source = PLAN_LIBRARY[planProfile.fitnessGoal] || PLAN_LIBRARY.general;
  return Object.fromEntries(DAYS.map((day) => {
    const workout = applyTrainingFocus(source[day], day, planProfile);
    const [title, focus, theme, rawExercises] = workout;
    const exercises = rawExercises.map((exercise) => [exercise[0], exerciseDetail(detailFromPlanExercise(exercise, planProfile.trainingFocus, planProfile), planProfile)]);
    return [day, { title, focus, exercises, bossDamage: exercises.length * 10, theme }];
  }));
}


const root = document.querySelector('#root');
let lastCompletion = null;
let state = normalizeState(loadState());

function normalizeState(saved = {}) {
  const base = { onboarded: false, profile: { stylePreference: 'neutral', themeColor: 'default', trainingFocus: 'endurance' }, character: { name: 'Rookie', class: 'Paladin', avatar: 'vanguard', title: 'Level 1 Rookie', frame: 'Bronze Frame' }, plan: {}, selectedDay: todayName(), checked: {}, quests: {}, completedWorkouts: {}, xp: 0, coins: 0, lifetimeCoins: 0, spentCoins: 0, inventory: [], achievements: {}, bossWins: 0, careerXp: { ...CAREER_XP }, steps: {}, water: {}, login: { lastClaim: '', streak: 0, boosts: 0 }, weightLog: [], strengthLog: [], notifications: { enabled: false, questHour: '08:00' }, rareAvatars: {}, seasons: {}, penalties: {}, shields: 0, lootOpened: 0 };
  const next = { ...base, ...saved };
  next.careerXp = { ...CAREER_XP, ...(next.careerXp || {}) };
  next.login = { lastClaim: '', streak: 0, boosts: 0, ...(next.login || {}) };
  next.notifications = { enabled: false, questHour: '08:00', ...(next.notifications || {}) }; next.rareAvatars = next.rareAvatars || {}; next.seasons = next.seasons || {}; next.penalties = next.penalties || {}; next.steps = next.steps || {}; next.water = next.water || {}; next.weightLog = next.weightLog || []; next.strengthLog = next.strengthLog || [];
  next.profile.goal = LEGACY_GOAL_MAP[next.profile.fitnessGoal || next.profile.goal] || next.profile.fitnessGoal || next.profile.goal || 'endurance';
  next.profile.fitnessGoal = next.profile.goal;
  next.profile.stylePreference = next.profile.genderStyle || next.profile.stylePreference || 'neutral';
  next.profile.genderStyle = next.profile.stylePreference;
  next.profile.themeColor = next.profile.themeColor || 'default';
  next.profile.trainingFocus = LEGACY_GOAL_MAP[next.profile.trainingFocus] || next.profile.trainingFocus || next.profile.goal || 'endurance';
  next.profile.experience = next.profile.experienceLevel || next.profile.experience || 'beginner';
  next.profile.experienceLevel = next.profile.experience;
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
function getRankIndex(s = state) { const level = getLevel(s.xp); return Math.max(0, RANKS.findIndex((rank) => level >= rank.min && level <= rank.max)); }
function currentRank(s = state) { return RANKS[getRankIndex(s)]?.name || 'Novice'; }
function currentRankMeta(s = state) { return RANKS[getRankIndex(s)] || RANKS[0]; }
function rankProgress(s = state) { const rank = currentRankMeta(s); if (rank.id === 'legend') return 100; const level = getLevel(s.xp); return Math.round(((level - rank.min) / Math.max(1, rank.max - rank.min + 1)) * 100); }
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
function generatePlan(profile = state.profile) { return generateWorkoutPlan(profile); }
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
function grantLoot(loot) { addRewards(loot.xp + (loot.reward.xp || 0), loot.coins + (loot.reward.coins || 0)); currentSeason().xp += loot.xp + (loot.reward.xp || 0); if (loot.reward.boosts) state.login.boosts = (state.login.boosts || 0) + loot.reward.boosts; if (loot.reward.shield) state.shields = (state.shields || 0) + loot.reward.shield; if (loot.rareAvatar) { state.rareAvatars[loot.rareAvatar.id] = dateKey(); state.character.avatar = loot.rareAvatar.id; } state.lootOpened = (state.lootOpened || 0) + 1; }
function requestQuestNotifications() { state.notifications.enabled = true; if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission().then(() => render()); saveState(); render(); }
function setQuestHour(value) { state.notifications.questHour = value || '08:00'; saveState(); render(); }


function submitOnboarding(form) {
  const selectedAvatar = form.avatar.value;
  const archetype = AVATAR_ARCHETYPES[selectedAvatar] || AVATAR_ARCHETYPES.paladin;
  state.profile = { name: form.name.value.trim() || 'Hero', age: form.age.value, height: form.height.value, weight: form.weight.value, goal: form.goal.value, fitnessGoal: form.goal.value, experience: form.experience.value, experienceLevel: form.experience.value, stylePreference: form.stylePreference.value, genderStyle: form.stylePreference.value, themeColor: form.themeColor.value, trainingFocus: form.trainingFocus.value };
  state.character = { name: form.heroName.value.trim() || `${state.profile.name}'s Hero`, class: archetype.name, avatar: selectedAvatar, gender: form.avatarGender.value, title: `${currentRank()} ${archetype.name}`, frame: `${currentRank()} Frame` };
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

const ICON_PATHS = {
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18 9.5c2.2.7 3.5 1.9 3.5 3.5 0 2.8-4 5-9 5-1.7 0-3.3-.3-4.6-.8"/><path d="M8 14v4c0 2.2 3.6 4 8 4 2.7 0 5.1-.8 6.4-2"/>',
  wallet: '<path d="M19 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"/><path d="M16 14h.01"/>',
  zap: '<path d="M13 2 3 14h8l-1 8 11-14h-8l1-6z"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M8 3l4 18 4-18"/>',
  landmark: '<path d="m3 21 18 0"/><path d="M5 21V10h3v11M10 21V10h4v11M16 21V10h3v11"/><path d="m2 10 10-7 10 7H2z"/>',
  gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2.5 0-4-1-4-2.5S9.5 3 12 8c2.5-5 4-4 4-2.5S14.5 8 12 8z"/>',
  package: '<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="M3.3 7 12 12l8.7-5M12 22V12"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
  box: '<path d="M4 9h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z"/><path d="M4 9 6 2h12l2 7M9 13h6"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m12 11 9-9M17 6l2 2M14 9l2 2"/>',
  'cloud-rain': '<path d="M4 14.9A7 7 0 1 1 15.7 8H17a5 5 0 0 1 0 10H6a4 4 0 0 1-2-.5"/><path d="M8 19v2M12 19v2M16 19v2"/>',
  brain: '<path d="M8 6a3 3 0 0 1 6 0v12a3 3 0 0 1-6 0V6z"/><path d="M14 7a4 4 0 1 1 3.7 6M8 7a4 4 0 1 0-3.7 6"/><path d="M12 6v12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="m5 16 .8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16z"/>',
  flame: '<path d="M8.5 14.5A4 4 0 0 0 12 22a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-4 4-4 7-1.5-1-2-2.5-2-4-2 1.5-3 3.5-3 6"/>',
  orbit: '<circle cx="12" cy="12" r="3"/><path d="M3 12c3-6 15-6 18 0-3 6-15 6-18 0z"/><path d="M12 3c6 3 6 15 0 18-6-3-6-15 0-18z"/>',
  dragon: '<path d="M4 14c2-5 6-8 11-8l2-3 1 4 4 1-4 2c-.3 6-4 10-10 11 2-2 2-4 1-6-1.5 1-3 1-5-1z"/>',
  dumbbell: '<path d="M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12"/>',
  footprints: '<path d="M6 4c2 0 3 2 3 4s-1 4-3 4-3-2-3-4 1-4 3-4zM17 12c2 0 3 2 3 4s-1 4-3 4-3-2-3-4 1-4 3-4z"/>',
  droplet: '<path d="M12 2s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12z"/>',
  biceps: '<path d="M7 21c-2-2-2-5 0-7l3-3V7l3-3 2 2-2 3 3 3c4 0 6 2 6 5 0 2-2 4-5 4H7z"/>',
  swords: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M3 21l6-6M14 6l4-4h3v3l-4 4M21 21l-6-6"/>',
  runner: '<circle cx="13" cy="4" r="2"/><path d="M4 17l4-3 2-5 4 2 3 4M10 21l2-5M7 8l3-2 3 2"/>',
  flask: '<path d="M9 2h6M10 2v6l-6 10a3 3 0 0 0 2.6 4h10.8A3 3 0 0 0 20 18L14 8V2"/><path d="M7 16h10"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M8.5 17C13 13 11 9 15.5 7"/>',
  crown: '<path d="M3 7l5 5 4-8 4 8 5-5-2 12H5L3 7z"/>',
  frame: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 4v16M16 4v16M4 8h16M4 16h16"/>',
  tag: '<path d="M20 10 12 2H4v8l8 8 8-8z"/><circle cx="7.5" cy="7.5" r="1"/>',
  star: '<path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8l3-6z"/>',
  'arrow-up': '<path d="m12 19V5M5 12l7-7 7 7"/>',
  medal: '<path d="M8 2h8l-2 6h-4L8 2z"/><circle cx="12" cy="15" r="6"/><path d="m10 15 1.3 1.3L15 12.5"/>',
  castle: '<path d="M4 22V8l3 2 3-2 3 2 3-2 3 2 1-2v14H4z"/><path d="M8 22v-5a4 4 0 0 1 8 0v5M4 14h16"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-6h6v6"/>', chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>', check: '<path d="m20 6-11 11-5-5"/>', scale: '<path d="M12 3v18M5 7h14M6 7l-3 7h6L6 7zM18 7l-3 7h6l-3-7z"/>'
};
function icon(name, cls = 'ui-icon') { const path = ICON_PATHS[name] || ICON_PATHS.sparkles; return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`; }
const AVATAR_META = {
  gladiator: ['Gladiator', 'shield'], shadow: ['Shadow', 'swords'], berserker: ['Berserker', 'flame'], paladin: ['Paladin', 'medal'], voidwalker: ['Voidwalker', 'orbit'], ranger: ['Ranger', 'runner'],
  vanguard: ['Gladiator', 'shield'], trailblazer: ['Ranger', 'runner'], striker: ['Berserker', 'zap'], sentinel: ['Paladin', 'dumbbell'], tactician: ['Voidwalker', 'brain'],
  nova: ['Nova', 'sparkles'], pulse: ['Pulse', 'droplet'], apex: ['Apex', 'crown'], onyx: ['Onyx', 'gem'], lunar: ['Lunar', 'orbit'], regal: ['Regal', 'medal'],
  phoenix: ['Phoenix', 'flame'], cosmicKnight: ['Cosmic Knight', 'orbit'], crystalGolem: ['Crystal Golem', 'gem'], shadowDragon: ['Shadow Dragon', 'dragon']
};
const legacyAvatarEntries = [[0x1F6E1, 'gladiator'], [0x1F9D9, 'ranger'], [0x1F977, 'shadow'], [0x1F98A, 'berserker'], [0x1F409, 'paladin'], [0x1F916, 'voidwalker'], [0x1F525, 'phoenix'], [0x1F30C, 'cosmicKnight'], [0x1F4A0, 'crystalGolem'], [0x1F432, 'shadowDragon'], [0x1F338, 'nova'], [0x1F9DA, 'pulse'], [0x1F984, 'apex'], [0x1F49C, 'onyx'], [0x1F319, 'lunar'], [0x1F451, 'regal']];
const LEGACY_AVATAR_MAP = Object.fromEntries(legacyAvatarEntries.map(([code, id]) => [String.fromCodePoint(code), id]));
const AVATAR_ALIASES = { vanguard: 'gladiator', trailblazer: 'ranger', striker: 'berserker', sentinel: 'paladin', tactician: 'voidwalker' };
function avatarId(value) { return AVATAR_ALIASES[LEGACY_AVATAR_MAP[value] || value] || LEGACY_AVATAR_MAP[value] || value || 'paladin'; }
function avatarMeta(value) { return AVATAR_ARCHETYPES[avatarId(value)] || AVATAR_ARCHETYPES.paladin; }
function rankClass(s = state) { return `rank-${currentRankMeta(s).id}`; }
function avatarCard(value, label = '', opts = {}) { const id = avatarId(value); const meta = avatarMeta(id); const gender = opts.gender || state.character?.gender || state.profile?.genderStyle || 'male'; const rank = opts.rank || currentRankMeta(); return `<div class="avatar-figure avatar-${id} avatar-${gender} ${rankClass()}" style="--accent-a:${meta.accents[0]};--accent-b:${meta.accents[1]};--rank-glow:${rank.glow}"><div class="avatar-aura"></div><div class="avatar-cape"></div><div class="avatar-head"></div><div class="avatar-shoulders"></div><div class="avatar-body">${icon(meta.icon, 'avatar-mark')}</div><div class="avatar-weapon"></div></div>${label ? `<span class="avatar-name">${escapeHtml(label === true ? meta.name : label)}</span>` : ''}`; }
function StatBars(stats = {}) { return `<div class="stat-bars">${Object.entries(stats).map(([name, value]) => `<label><span>${escapeHtml(name)}</span><b>${value}</b>${progressBar(value)}</label>`).join('')}</div>`; }
function AvatarPreview({ avatar = state.character.avatar, gender = state.character.gender || state.profile.genderStyle || 'male', compact = false } = {}) { const meta = avatarMeta(avatar); return `<article class="avatar-preview ${compact ? 'compact' : ''}"><div class="rank-frame ${rankClass()}">${avatarCard(avatar, '', { gender })}</div><p class="avatar-title">${currentRank()} ${meta.name}</p><h3>${escapeHtml(meta.name)}</h3><p>${escapeHtml(meta.desc)}</p><small>Fitness focus: ${escapeHtml(meta.focus)}</small>${compact ? '' : StatBars(meta.stats)}</article>`; }
function AvatarSelect(selected = state.character.avatar, gender = state.character.gender || state.profile.stylePreference || 'male') { const chosen = avatarId(selected); return `<section class="avatar-select"><div class="gender-toggle" role="radiogroup" aria-label="Avatar gender"><label><input type="radio" name="avatarGender" value="male" ${gender !== 'female' ? 'checked' : ''}><span>Male</span></label><label><input type="radio" name="avatarGender" value="female" ${gender === 'female' ? 'checked' : ''}><span>Female</span></label></div><div class="avatar-select-layout"><div class="avatar-cards">${AVATARS.map((a, i) => { const meta = avatarMeta(a); return `<label class="avatar-choice rpg-avatar-card"><input type="radio" name="avatar" value="${a}" ${chosen === a || (!chosen && i === 0) ? 'checked' : ''}/><span>${avatarCard(a, true, { gender })}<small>${escapeHtml(meta.focus)}</small></span></label>`; }).join('')}</div>${AvatarPreview({ avatar: chosen, gender })}</div></section>`; }
function RankEvolution() { return `<section class="rank-evolution"><div class="section-title"><p class="eyebrow">Rank evolution</p><h2>Armor progression</h2></div><div class="rank-steps">${RANKS.map((rank) => `<div class="rank-step ${rank.id === currentRankMeta().id ? 'active' : ''}"><div class="mini-frame rank-${rank.id}">${avatarCard(state.character.avatar, '', { gender: state.character.gender, rank })}</div><b>${rank.name}</b><small>${rank.range}</small></div>`).join('')}</div></section>`; }
function HeroPreviewCard() { const meta = avatarMeta(state.character.avatar); return `<section class="hero-preview-card"><div>${AvatarPreview({ avatar: state.character.avatar, gender: state.character.gender, compact: true })}</div><dl><div><dt>Name</dt><dd>${escapeHtml(state.character.name)}</dd></div><div><dt>Class</dt><dd>${escapeHtml(meta.name)}</dd></div><div><dt>Goal</dt><dd>${escapeHtml(GOALS[state.profile.goal]?.label || 'Custom Goal')}</dd></div><div><dt>Training focus</dt><dd>${escapeHtml(meta.focus)}</dd></div><div><dt>Experience</dt><dd>${escapeHtml(LEVELS[state.profile.experience]?.label || state.profile.experience)}</dd></div></dl></section>`; }
function stat(label, value, hint, iconName) { return `<div class="stat-card"><span>${icon(iconName, 'stat-icon')} ${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></div>`; }
function progressBar(value) { const width = Math.max(0, Math.min(100, Number(value) || 0)); return `<div class="progress"><span style="width:${width}%"></span></div>`; }

function optionList(items, selected = '') { return Object.entries(items).map(([value, label]) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${label}</option>`).join(''); }
function renderOnboarding() { const gender = state.character.gender || state.profile.stylePreference || 'male'; root.innerHTML = `<main class="onboarding ${themeClass(state.profile)}"><section class="hero-card onboarding-card"><p class="eyebrow">Fantasy character select</p><h1>Forge your RPG hero</h1><p>Choose a cinematic dark-fantasy archetype. Armor, glow, frame, and title evolve as your training level rises.</p><form id="onboardingForm" class="onboarding-grid"><label>Name<input name="name" required placeholder="Alex" value="${escapeHtml(state.profile.name || '')}" /></label><label>Age<input name="age" type="number" min="10" max="100" required value="${escapeHtml(state.profile.age || '')}" /></label><label>Height<input name="height" placeholder="5'10 or 178 cm" required value="${escapeHtml(state.profile.height || '')}" /></label><label>Weight<input name="weight" placeholder="170 lb or 77 kg" required value="${escapeHtml(state.profile.weight || '')}" /></label><label>Theme color<select name="themeColor">${optionList(THEME_COLORS, state.profile.themeColor)}</select></label><label>Fitness goal<select name="goal">${Object.entries(GOALS).map(([k,g]) => `<option value="${k}" ${state.profile.goal === k ? 'selected' : ''}>${g.label}</option>`).join('')}</select></label><label>Training focus<select name="trainingFocus">${optionList(TRAINING_FOCUS, state.profile.trainingFocus)}</select></label><label>Experience<select name="experience">${Object.entries(LEVELS).map(([k,l]) => `<option value="${k}" ${state.profile.experience === k ? 'selected' : ''}>${l.label}</option>`).join('')}</select></label><label>Hero name<input name="heroName" placeholder="Aurelia Nightguard" value="${escapeHtml(state.character.name || '')}" /></label><input type="hidden" name="stylePreference" value="${gender === 'female' ? 'female' : 'male'}"><input type="hidden" name="heroClass" value="${escapeHtml(avatarMeta(state.character.avatar).name)}"><fieldset class="avatar-field"><legend>Avatar archetype</legend>${AvatarSelect(state.character.avatar, gender)}</fieldset><div class="onboarding-hero-preview">${HeroPreviewCard()}</div><button class="generate-button">Select Avatar</button></form></section></main>`; }
function render() { if (!state.onboarded) return renderOnboarding(); applyMissedPenalty(); if (!DAYS.includes(state.selectedDay)) state.selectedDay = todayName(); if (!state.plan?.[state.selectedDay]) state.plan = generatePlan(state.profile); const today = todayName(); const workout = state.plan[state.selectedDay]; const key = workoutKey(); const checks = state.checked[key] || []; const done = checks.filter(Boolean).length; const allDone = workout.exercises.every((_, index) => Boolean(checks[index])); const completed = Boolean(state.completedWorkouts[key]); const history = historyEntries().sort((a,b) => b.id.localeCompare(a.id)); const bossHp = Math.max(0, 100 - DAYS.reduce((sum, d) => sum + (state.completedWorkouts[`${dateKey()}-${d}`] ? 14 : 0), 0));
  root.innerHTML = `<main class="app-shell ${themeClass(state.profile)}"><section id="home" class="hero-card top-hero"><div class="character"><div class="avatar game-frame">${avatarCard(state.character.avatar)}</div><div><p class="eyebrow">${escapeHtml(state.character.title || 'Level 1 Rookie')} • ${escapeHtml(state.character.class)} • ${escapeHtml(GOALS[state.profile.goal]?.label || 'Custom Goal')}</p><h1>${escapeHtml(state.character.name)}</h1><div class="rank-track"><b>${currentRank()}</b>${progressBar(rankProgress())}</div><p>${escapeHtml(state.profile.name)}, age ${escapeHtml(state.profile.age)} • ${escapeHtml(state.profile.height)} • ${escapeHtml(state.profile.weight)}</p>${progressBar(levelProgress())}<small>${state.xp % XP_PER_LEVEL}/${XP_PER_LEVEL} XP to next level</small></div></div><div class="hero-actions"><button class="ghost-button" data-action="reset">Edit Settings</button><button class="generate-button" data-action="generate">Regenerate Plan</button></div></section>${lastCompletion ? `<section class="loot-modal reward-screen"><div class="confetti">✦ ✧ ✦ ✧ ✦</div><h2>Quest Complete: ${lastCompletion.title}</h2>${lastCompletion.loot ? `<div class="chest-pop"><span>${icon(lastCompletion.loot.box.icon, 'feature-icon')}</span><b>${lastCompletion.loot.box.name}</b><small>${icon(lastCompletion.loot.reward.icon, 'inline-icon')} Random reward: ${lastCompletion.loot.reward.label}</small></div>` : ''}<div class="loot-row"><b>+${lastCompletion.xp} XP</b><b>+${lastCompletion.coins} coins</b><b>${lastCompletion.multiplier ? `${lastCompletion.multiplier}× streak XP` : `Level ${getLevel()} • ${levelProgress()}%`}</b></div>${lastCompletion.loot?.rareAvatar ? `<p class="rare-unlock">${icon('sparkles', 'inline-icon')} Rare avatar unlocked: ${lastCompletion.loot.rareAvatar.name}</p>` : ''}${lastCompletion.unlocked.length ? `<p>${icon('medal', 'inline-icon')} Unlocked: ${lastCompletion.unlocked.map((a) => a.name).join(', ')}</p>` : '<p>No new badges this time. Keep grinding!</p>'}<button data-action="dismiss" class="complete-button">Continue</button></section>` : ''}${HeroPreviewCard()}<section class="dashboard">${stat('Rank', currentRank(), `Career ${rankProgress()}%`, 'medal')}${stat('Level', getLevel(), 'Hero power', 'star')}${stat('XP', state.xp, `+${XP_PER_EXERCISE} per exercise`, 'zap')}${stat('Coins', state.coins, 'Spend in reward shop', 'coins')}${stat('Streak', `${getStreak()} days`, `${streakMultiplier()}× XP multiplier`, 'flame')}${stat('Style', STYLE_PREFERENCES[state.profile.stylePreference] || 'Neutral', `${THEME_COLORS[state.profile.themeColor] || 'Default RPG'} theme`, 'sparkles')}${stat('Season', `Lv ${seasonLevel()}`, `${currentSeason().theme} • ${seasonProgress()}%`, 'castle')}</section><section class="content-grid"><div><section id="quest" class="weekly-page"><div class="section-title"><p class="eyebrow">Personalized weekly map</p><h2>Monday-Sunday workout plan</h2></div><div class="day-tabs">${DAYS.map((day) => `<button class="day-tab ${state.selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}" data-day="${day}"><span>${day.slice(0,3)}</span><strong>${escapeHtml(state.plan[day].title)}</strong><em>${state.completedWorkouts[`${dateKey()}-${day}`] ? 'Cleared' : today === day ? 'Today' : 'Quest'}</em></button>`).join('')}</div><article class="workout-card ${workout.theme}"><div class="workout-header"><div><p class="eyebrow">${state.selectedDay} ${state.selectedDay === 'Sunday' ? '• Weekly Boss' : '• Daily Dungeon'}</p><h2>${escapeHtml(workout.title)}</h2><p class="plan-type-label">Plan Type: ${escapeHtml(planTypeLabel(state.profile))}</p><p>${done}/${workout.exercises.length} moves completed • Boss damage ${workout.bossDamage}</p></div><div class="reward-badge">Clear: +${Math.round((DAILY_XP_BONUS + (state.selectedDay === 'Sunday' ? 90 : 0)) * streakMultiplier())} XP · +${DAILY_COIN_BONUS + (state.selectedDay === 'Sunday' ? 60 : 0)} coins</div></div><div class="exercise-list">${workout.exercises.map(([name, detail], i) => `<label class="exercise-row ${checks[i] ? 'done' : ''}"><input type="checkbox" data-exercise="${i}" ${checks[i] ? 'checked' : ''} ${completed ? 'disabled' : ''}/><span class="exercise-copy"><strong>${escapeHtml(name)}</strong><small>${escapeHtml(detail)}</small></span><span class="xp-pill">+${XP_PER_EXERCISE} XP</span></label>`).join('')}</div><button class="complete-button" data-action="complete" ${!allDone || completed ? 'disabled' : ''}>${completed ? 'Workout Completed' : 'Complete Workout'}</button></article></section><section id="progress" class="stats-page"><div class="section-title"><p class="eyebrow">Career statistics</p><h2>Hero record book</h2></div><div class="stats-grid">${stat('Workouts completed', historyEntries().length, 'All-time clears', 'check')}${stat('Current streak', `${getStreak()} days`, 'Active chain', 'flame')}${stat('Longest streak', `${longestStreak()} days`, 'Personal best', 'crown')}${stat('Total XP', state.xp + totalCareerXp(), 'Hero + career XP', 'zap')}${stat('Total coins', state.lifetimeCoins, 'Lifetime earned', 'coins')}${stat('Weight progress', trend(state.weightLog, state.profile.weight || 'Add a log'), 'Latest change', 'scale')}${stat('Strength progress', trend(state.strengthLog, 'Add a PR'), 'Latest lift score', 'biceps')}</div>${RankEvolution()}<div class="log-row"><label>Log weight<input data-log="weight" placeholder="178 lb"></label><label>Log strength<input data-log="strength" placeholder="Bench 135"></label></div></section><section class="history-card"><h2>Workout history</h2><div class="history-list">${history.slice(0,8).map((entry) => `<div><b>${escapeHtml(entry.day)}</b><span>${escapeHtml(entry.title)}</span><small>${escapeHtml(entry.date)} ${escapeHtml(entry.completed)} • +${entry.xp} XP • +${entry.coins} coins</small></div>`).join('') || '<p>No completed workouts yet. Your quest log is waiting.</p>'}</div></section></div><aside id="rewards" class="side-panel"><section class="panel notification-panel"><h2>Daily quest notifications</h2><p>Get a daily nudge to keep your streak alive and avoid missed-workout penalties.</p><label class="mini-input">Reminder time<input type="time" value="${state.notifications.questHour}" data-notify-hour></label><button class="complete-button" data-action="notify">${state.notifications.enabled ? 'Notifications armed' : 'Enable quest reminders'}</button><small>${'Notification' in window ? `Browser permission: ${Notification.permission}` : 'Browser notifications unavailable here'} • Shields: ${state.shields || 0}</small>${state.penalties.last?.date === dateKey() ? `<p class="penalty">${state.penalties.last.shielded ? `${icon('shield', 'inline-icon')} Streak shield blocked yesterday’s penalty.` : `${icon('zap', 'inline-icon')} Missed workout penalty: -${state.penalties.last.coins} coins.`}</p>` : ''}</section><section class="panel season-panel"><h2>Monthly season</h2><p>${currentSeason().theme} resets each month. Earn season XP from workouts and loot.</p>${progressBar(seasonProgress())}<strong>Season level ${seasonLevel()} • ${currentSeason().xp} XP</strong></section><section class="panel avatar-panel"><h2>Rare avatars</h2><div class="rare-grid">${RARE_AVATARS.map((a) => `<div class="rare-avatar ${state.rareAvatars[a.id] ? 'unlocked' : ''}"><span>${state.rareAvatars[a.id] ? avatarCard(a.id) : icon('lock', 'feature-icon')}</span><b>${a.name}</b></div>`).join('')}</div></section><section class="panel login-panel"><h2>Daily login rewards</h2><div class="login-track">${LOGIN_REWARDS.map((r, i) => `<div class="login-day ${(state.login.streak || 0) > i ? 'claimed' : ''}"><span>${icon(r.icon, 'feature-icon')}</span><b>Day ${r.day}</b><small>${r.label}</small></div>`).join('')}</div><button class="complete-button" data-action="login" ${!canClaimLogin() ? 'disabled' : ''}>${canClaimLogin() ? `Claim ${currentLoginReward().label}` : 'Claimed today'}</button></section><section class="panel"><h2>Weekly challenges</h2>${WEEKLY_CHALLENGES.map((c) => { const value = c.metric(state); return `<div class="challenge"><b>${icon(c.icon, 'inline-icon')} ${c.title}</b><small>${Math.min(value, c.target).toLocaleString()} / ${c.target.toLocaleString()}</small>${progressBar((value / c.target) * 100)}</div>`; }).join('')}<label class="mini-input">Today steps<input type="number" min="0" value="${state.steps[dateKey()] || ''}" data-track="steps" placeholder="0"></label><label class="water-toggle"><input type="checkbox" data-track="water" ${state.water[dateKey()] ? 'checked' : ''}> Water goal complete today</label></section><section class="panel"><h2>Daily quests</h2>${QUESTS.map((q,i) => `<button class="quest ${state.quests[dailyQuestKey(i)] ? 'done' : ''}" data-quest="${i}" ${state.quests[dailyQuestKey(i)] ? 'disabled' : ''}><b>${q[0]}</b><span>${q[1]}</span><em>+${q[2]} XP • +5 coins</em></button>`).join('')}</section><section class="panel boss"><h2>${icon('dragon', 'inline-icon')} Weekly boss battle</h2><p>Complete daily dungeons to weaken the Sunday dragon.</p>${progressBar(100 - bossHp)}<strong>${bossHp} HP remaining</strong></section><section class="panel"><h2>Reward shop</h2>${SHOP_ITEMS.map((item) => `<button class="shop-item" data-buy="${item.id}" ${state.inventory.includes(item.id) || state.coins < item.price ? 'disabled' : ''}><span>${icon(item.icon, 'feature-icon')}</span><b>${item.name}</b><small>${state.inventory.includes(item.id) ? 'Owned' : `${item.price} coins`} • ${item.perk}</small></button>`).join('')}</section><section class="panel"><h2>Achievement badges</h2><div class="badges">${ACHIEVEMENTS.map((a) => `<div class="badge ${state.achievements[a.id] ? 'unlocked' : ''}"><span>${icon(a.icon, 'feature-icon')}</span><b>${a.name}</b><small>${a.desc}</small></div>`).join('')}</div></section><section class="panel"><h2>Progress charts</h2><div class="bars">${DAYS.map((d) => { const c = state.completedWorkouts[`${dateKey()}-${d}`] ? 100 : 0; return `<label>${d.slice(0,3)}${progressBar(c)}</label>`; }).join('')}</div><p>Lifetime coins: ${state.lifetimeCoins} • Boss wins: ${state.bossWins}</p></section></aside></section><nav class="bottom-nav" aria-label="Primary mobile navigation"><a href="#home"><span>${icon('home', 'nav-icon')}</span>Home</a><a href="#quest"><span>${icon('swords', 'nav-icon')}</span>Quest</a><a href="#progress"><span>${icon('chart', 'nav-icon')}</span>Stats</a><a href="#rewards"><span>${icon('gift', 'nav-icon')}</span>Loot</a></nav></main>`; }

root.addEventListener('submit', (event) => { if (event.target.id === 'onboardingForm') { event.preventDefault(); submitOnboarding(event.target); } });
root.addEventListener('click', (event) => { const day = event.target.closest('[data-day]'); if (day) { state.selectedDay = day.dataset.day; saveState(); render(); } if (event.target.matches('[data-action="generate"]')) { state.plan = generatePlan(state.profile); state.checked = {}; saveState(); render(); } if (event.target.matches('[data-action="complete"]')) completeWorkout(); if (event.target.matches('[data-action="dismiss"]')) { lastCompletion = null; render(); } if (event.target.matches('[data-action="reset"]')) resetOnboarding(); if (event.target.matches('[data-action="login"]')) claimLoginReward(); if (event.target.matches('[data-action="notify"]')) requestQuestNotifications(); const quest = event.target.closest('[data-quest]'); if (quest) toggleQuest(Number(quest.dataset.quest)); const buy = event.target.closest('[data-buy]'); if (buy) buyItem(buy.dataset.buy); });
root.addEventListener('change', (event) => { if (event.target.name === 'avatar' || event.target.name === 'avatarGender') { const form = event.target.closest('#onboardingForm'); if (form) { state.character.avatar = form.avatar.value; state.character.gender = form.avatarGender.value; state.character.name = form.heroName.value; state.profile = { ...state.profile, name: form.name.value, age: form.age.value, height: form.height.value, weight: form.weight.value, goal: form.goal.value, fitnessGoal: form.goal.value, experience: form.experience.value, experienceLevel: form.experience.value, trainingFocus: form.trainingFocus.value, themeColor: form.themeColor.value, stylePreference: form.avatarGender.value, genderStyle: form.avatarGender.value }; renderOnboarding(); return; } } if (event.target.matches('[data-exercise]')) { const idx = Number(event.target.dataset.exercise); toggleExercise(idx, event.target.checked); } if (event.target.matches('[data-track="water"]')) updateTracker('water', event.target.checked); if (event.target.matches('[data-track="steps"]')) updateTracker('steps', event.target.value); if (event.target.matches('[data-notify-hour]')) setQuestHour(event.target.value); });
root.addEventListener('keydown', (event) => { if (event.key === 'Enter' && event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); });
root.addEventListener('blur', (event) => { if (event.target.matches('[data-log]')) logProgress(event.target.dataset.log, event.target.value); }, true);
render();
