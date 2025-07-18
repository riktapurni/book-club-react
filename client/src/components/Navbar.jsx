import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    // { to: "/ebooks", label: "Ebooks" },
    { to: "/membership", label: "Membership" },
    { to: "/books/add", label: "Add Book" },
    
  ];
  return (
    <nav className="bg-white fixed w-full top-0 z-50 py-4">
      <div className="container mx-auto px-4 border">
        <div className="flex items-center justify-between">
          {/* logo  */}
          <Link className="uppercase font-bold text-xl tracking-wider">
            Book<span className="text-amber-500">club.</span>
          </Link>
          {/* navLinks  */}
          {/* desktop menu  */}
          <ul className="hidden sm:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-bold capitalize hover:text-amber-500 ${
                    isActive ? "text-amber-500" : "text-gray-700 "
                  }`
                }
                key={to}
                to={to}
              >
                {label}
                
              </NavLink>
            ))}
          </ul>
          {/* right menu  */}
          <div className="flex">
           <Link to="/cart"><FaShoppingCart className="h-5 w-5" /></Link> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
