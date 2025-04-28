import { GrCodeSandbox } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav
        className={`relative top-0 w-full backdrop:blur-sm bg-stone-800 z-50 transition-all duration-300 `}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GrCodeSandbox className="w-7 h-7 text-white" />
              <span className="text-xl font-sans font-semibold text-white">
                CodeBlock
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/home"
                className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Menu
              </Link>
              <Link
                to="/checkout"
                className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Checkout
              </Link>
              <Link to="/auth/signin">
                <button className="rounded-full px-6 py-5 font-medium bg-white text-black hover:bg-zinc-200 transition-colors">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
  );
}
