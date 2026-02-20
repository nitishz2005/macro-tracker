import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
           <h1 className="text-xl font-bold" >Macro Tracker</h1>

            <div className="flex gap-6">
            <NavLink to="/"
            className={({isActive})=>
              isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
          
          }
            >Dashboard</NavLink>



            <NavLink to="meal"
            className={({isActive})=>
          isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
          }
            >Add Meal</NavLink>




            <NavLink to="history"
            className={({isActive})=>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
            }
            >History</NavLink>



            </div>
        </nav>
    </div>
  )
}
