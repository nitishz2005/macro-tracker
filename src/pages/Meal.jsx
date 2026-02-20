import { useState } from "react"

export default function Meal() {
 
    const[meal,setMeal]= useState({
        name:"",
        calories:"",
        protein:"",
        carbs:"",
        fats:"",
        fiber:"",
    })
 
    function handleChange(e){
        setMeal({...meal,[e.target.name]:e.target.value})
    }

 function handlesubmit(e) {
  e.preventDefault();

  // BASIC VALIDATION
  if (
    !meal.name ||
    !meal.calories ||
    !meal.protein ||
    !meal.carbs ||
    !meal.fats
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const existingMeals = JSON.parse(localStorage.getItem("meals")) || [];

  const newMeal = {
    ...meal,
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
  };

  localStorage.setItem("meals", JSON.stringify([...existingMeals, newMeal]));

  setMeal({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    fiber: "",
  });

  alert("Meal added!");


}

const storedMeals = JSON.parse(localStorage.getItem("meals")) || [];

const today = new Date().toISOString().slice(0, 10);

const todayMeals = storedMeals.filter((meal) => meal.date === today);

const totals = todayMeals.reduce(
  (acc, meal) => {
    acc.calories += Number(meal.calories || 0);
    acc.protein += Number(meal.protein || 0);
    acc.carbs += Number(meal.carbs || 0);
    acc.fats += Number(meal.fats || 0);
    return acc;
  },
  { calories: 0, protein: 0, carbs: 0, fats: 0 }
);

return (
  <div className="grid md:grid-cols-2 gap-8 p-6">

  <div className="max-w-md mt-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg">

    <h2 className="text-2xl font-bold mb-4 text-center">Add Meal</h2>

    <form onSubmit={handlesubmit} className="flex flex-col gap-1">
      
      <label className="text-sm text-gray-400">Food Name</label>
      <input
        name="name"
        value={meal.name}
        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />

      <label className="text-sm text-gray-400">Calories</label>
      <input
        type="number"
        name="calories"
        
        value={meal.calories}
        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />

      <label className="text-sm text-gray-400">Protein</label>
      <input
      type="number"
        name="protein"
        value={meal.protein}
        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />
      
      <label className="text-sm text-gray-400">Carbs</label>
      <input
      type="number"
        name="carbs"
        value={meal.carbs}

        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />
      
      <label className="text-sm text-gray-400">Fats</label>
      <input
      type="number"
        name="fats"
        value={meal.fats}
        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />

      <label className="text-sm text-gray-400">Fiber</label>
      <input
      type="number"
        name="fiber"
        value={meal.fiber}
        onChange={handleChange}
        className="p-1.5 rounded bg-gray-700 outline-none text-sm"

      />

      <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded font-semibold mt-2">
        Add Meal
      </button>
    </form>
    
    </div>

 <div className="bg-gray-800 max-w-md mt-4 text-white p-6 rounded-xl shadow-lg">
  <h3 className="text-xl font-semibold mb-4">Today at a glance</h3>

  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gray-700 p-3 rounded-lg">
      <p className="text-xs text-gray-400">Calories</p>
      <p className="text-lg font-bold">{totals.calories}</p>
    </div>

    <div className="bg-gray-700 p-3 rounded-lg">
      <p className="text-xs text-gray-400">Protein</p>
      <p className="text-lg font-bold">{totals.protein} g</p>
    </div>

    <div className="bg-gray-700 p-3 rounded-lg">
      <p className="text-xs text-gray-400">Carbs</p>
      <p className="text-lg font-bold">{totals.carbs} g</p>
    </div>

    <div className="bg-gray-700 p-3 rounded-lg">
      <p className="text-xs text-gray-400">Fats</p>
      <p className="text-lg font-bold">{totals.fats} g</p>
    </div>
  </div>

  <p className="text-sm text-gray-300 mt-4" >
    Live summary updates as you log meals.
  </p>
</div>

    
  </div>
  
);

}
