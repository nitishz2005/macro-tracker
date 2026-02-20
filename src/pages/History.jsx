import { useEffect, useState } from "react";

export default function History() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];
    setMeals(storedMeals);
  }, []);

  function handleDelete(id) {
    const updatedMeals = meals.filter((meal) => meal.id !== id);

    localStorage.setItem("meals", JSON.stringify(updatedMeals));
    setMeals(updatedMeals);
  }

  return (
  <div className="p-6">
    <h2 className="text-3xl font-bold mb-6">Meal History</h2>

    {meals.length === 0 && (
      <p className="text-gray-400">No meals yet.</p>
    )}

    <div className="space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="bg-gray-800 text-white p-4 rounded-xl flex justify-between items-start"
        >
          <div>
            <p className="text-gray-400 text-sm">{meal.date}</p>
            <p className="font-semibold">{meal.name}</p>

            <div className="grid grid-cols-2 gap-x-6 mt-2 text-sm">
              <p>Calories: {meal.calories}</p>
              <p>Protein: {meal.protein} g</p>
              <p>Carbs: {meal.carbs} g</p>
              <p>Fats: {meal.fats} g</p>
              <p>Fiber: {meal.fiber} g</p>
            </div>
          </div>

          <button
            onClick={() => handleDelete(meal.id)}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

}
