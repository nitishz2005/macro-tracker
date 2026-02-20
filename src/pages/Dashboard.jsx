import { useEffect, useState } from "react";

export default function Dashboard() {
 

  const [meals, setMeals] = useState([]);


  useEffect(() => {
  function loadMeals() {
    const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
    setMeals(storedMeals);
  }

  loadMeals();

  // refresh when tab regains focus
  window.addEventListener("focus", loadMeals);

  // refresh when localStorage changes (another page)
  window.addEventListener("storage", loadMeals);

  return () => {
    window.removeEventListener("focus", loadMeals);
    window.removeEventListener("storage", loadMeals);
  };
}, []);



  const today = new Date().toISOString().slice(0, 10);

  const todayMeals = meals.filter((meal) => meal.date === today);

  const totals = todayMeals.reduce(
    (acc, meal) => {
      acc.calories += Number(meal.calories || 0);
      acc.protein += Number(meal.protein || 0);
      acc.carbs += Number(meal.carbs || 0);
      acc.fats += Number(meal.fats || 0);
      acc.fiber += Number(meal.fiber || 0);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );


  const last7DaysMeals = meals.filter((meal) => {
  const mealDate = new Date(meal.date);
  const today = new Date();

  const diffDays =
    (today - mealDate) / (1000 * 60 * 60 * 24);

  return diffDays <= 7;
});


const weeklyTotals = last7DaysMeals.reduce(
  (acc, meal) => {
    acc.calories += Number(meal.calories || 0);
    acc.protein += Number(meal.protein || 0);
    return acc;
  },
  { calories: 0, protein: 0 }
);

const daysLogged = new Set(last7DaysMeals.map(m => m.date)).size || 1;

const avgCalories = Math.round(weeklyTotals.calories / daysLogged);




   const DAILY_GOAL = 2400; // change anytime
const progress = Math.min((totals.calories / DAILY_GOAL) * 100, 100);

  function handleClearToday() {
  const allMeals = JSON.parse(localStorage.getItem("meals")) || [];

  const today = new Date().toISOString().slice(0, 10);

  const filteredMeals = allMeals.filter((meal) => meal.date !== today);

  localStorage.setItem("meals", JSON.stringify(filteredMeals));

  setMeals(filteredMeals);
}


  return (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Today's Totals</h2>

    <button
  onClick={handleClearToday}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4"
>
  Clear Today
</button>

<div className="mb-6">
  <p className="text-gray-400 mb-2">
    Goal: {DAILY_GOAL} kcal • Consumed: {totals.calories} kcal
  </p>

  <div className="w-full bg-gray-700 rounded-full h-3">
    <div
      className="bg-blue-500 h-3 rounded-full transition-all"
      style={{ width: `${progress}%` }}
    />
  </div>

  <p className="text-sm mt-2 text-gray-400">
    {Math.round(progress)}% of daily goal
  </p>
</div>

    <div className="mt-8 mb-8 bg-gray-800 text-white p-4 rounded-xl">
  <h3 className="text-xl font-semibold mb-2">Weekly Summary</h3>

  <p>Average Calories / day: {avgCalories}</p>
  <p>Total Weekly Protein: {weeklyTotals.protein} g</p>
</div>



    {todayMeals.length === 0 && (
  <p className="text-gray-500 italic">
    No meals logged today. Start by adding one.
  </p>
)}


    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <p className="text-gray-400">Calories</p>
        <p className="text-2xl font-bold">{totals.calories}</p>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <p className="text-gray-400">Protein</p>
        <p className="text-2xl font-bold">{totals.protein} g</p>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <p className="text-gray-400">Carbs</p>
        <p className="text-2xl font-bold">{totals.carbs} g</p>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <p className="text-gray-400">Fats</p>
        <p className="text-2xl font-bold">{totals.fats} g</p>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <p className="text-gray-400">Fiber</p>
        <p className="text-2xl font-bold">{totals.fiber} g</p>
      </div>
    </div>
  </div>
);

}
