const STORAGE_KEY = 'fitness-rpg-weekly-workouts';
const EXERCISE_XP = 10;
const DAY_BONUS_XP = 50;
const DAY_BONUS_COINS = 25;

const weeklyWorkouts = [
  { day: 'Monday', exercises: ['Push-ups', 'Squats', 'Plank'] },
  { day: 'Tuesday', exercises: ['Jumping jacks', 'Lunges', 'Mountain climbers'] },
  { day: 'Wednesday', exercises: ['Sit-ups', 'Glute bridges', 'Wall sit'] },
  { day: 'Thursday', exercises: ['Burpees', 'Calf raises', 'Side plank'] },
  { day: 'Friday', exercises: ['High knees', 'Tricep dips', 'Bicycle crunches'] },
  { day: 'Saturday', exercises: ['Bodyweight rows', 'Step-ups', 'Russian twists'] },
  { day: 'Sunday', exercises: ['Light walk', 'Stretching', 'Deep breathing'] },
];

const xpTotal = document.querySelector('#xp-total');
const coinTotal = document.querySelector('#coin-total');
const workoutGrid = document.querySelector('#workout-grid');

function createFreshProgress() {
  return weeklyWorkouts.reduce((progress, workout) => {
    progress[workout.day] = {
      completedExercises: [],
      bonusAwarded: false,
    };
    return progress;
  }, {});
}

function loadGame() {
  const defaultGame = { xp: 0, coins: 0, progress: createFreshProgress() };

  try {
    const savedGame = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!savedGame) return defaultGame;

    return {
      xp: savedGame.xp || 0,
      coins: savedGame.coins || 0,
      progress: { ...createFreshProgress(), ...savedGame.progress },
    };
  } catch (error) {
    return defaultGame;
  }
}

let game = loadGame();

function saveGame() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
}

function updateStats() {
  xpTotal.textContent = `${game.xp} XP`;
  coinTotal.textContent = `${game.coins} Coins`;
}

function toggleExercise(day, exercise) {
  const dayProgress = game.progress[day];
  const alreadyCompleted = dayProgress.completedExercises.includes(exercise);

  dayProgress.completedExercises = alreadyCompleted
    ? dayProgress.completedExercises.filter((item) => item !== exercise)
    : [...dayProgress.completedExercises, exercise];

  game.xp += alreadyCompleted ? -EXERCISE_XP : EXERCISE_XP;

  const workout = weeklyWorkouts.find((item) => item.day === day);
  const dayIsComplete = dayProgress.completedExercises.length === workout.exercises.length;

  if (dayIsComplete && !dayProgress.bonusAwarded) {
    game.xp += DAY_BONUS_XP;
    game.coins += DAY_BONUS_COINS;
    dayProgress.bonusAwarded = true;
  }

  saveGame();
  renderWorkouts();
}

function renderWorkouts() {
  updateStats();
  workoutGrid.innerHTML = '';

  weeklyWorkouts.forEach((workout) => {
    const dayProgress = game.progress[workout.day];
    const dayIsComplete = dayProgress.completedExercises.length === workout.exercises.length;
    const card = document.createElement('article');
    card.className = `workout-card${dayIsComplete ? ' complete' : ''}`;

    const title = document.createElement('h2');
    title.textContent = workout.day;
    card.append(title);

    const list = document.createElement('ul');

    workout.exercises.forEach((exercise) => {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      const text = document.createElement('span');

      checkbox.type = 'checkbox';
      checkbox.checked = dayProgress.completedExercises.includes(exercise);
      checkbox.addEventListener('change', () => toggleExercise(workout.day, exercise));
      text.textContent = exercise;

      label.append(checkbox, text);
      item.append(label);
      list.append(item);
    });

    const reward = document.createElement('p');
    reward.className = 'reward';
    reward.textContent = dayIsComplete
      ? 'Day complete! Bonus earned.'
      : '+50 XP and +25 coins when complete';

    card.append(list, reward);
    workoutGrid.append(card);
  });
}

renderWorkouts();
