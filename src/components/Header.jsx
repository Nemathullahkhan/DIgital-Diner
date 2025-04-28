import { UtensilsCrossed } from "lucide-react";
import { GrCodeSandbox } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav
      className={`relative top-0 w-full backdrop:blur-sm text-green-800 z-50 transition-all duration-300 py-2  `}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-md tracking-tight text-emerald-800 ">
        <div className="flex justify-between items-center">
          <Link to="/home">
            <div className="flex items-center gap-2 ">
              <UtensilsCrossed className="w-7 h-7 text-green-500" />
              <span className="text-2xl font-sans font-bold  tracking-tighter">
                DigitalDiner
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/home"
              className="text-md font-medium  hover:text-emerald-950 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/checkout"
              className="text-md font-medium  hover:text-emerald-950 transition-colors"
            >
              Checkout
            </Link>
            <Link
              to="/MyOrders"
              className="text-md font-medium  hover:text-emerald-950 transition-colors"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
