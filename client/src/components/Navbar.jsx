import { Link } from 'react-router-dom'
import { ShoppingCart, User, Search } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">MediCare</span>
          </Link>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-600 hover:text-blue-600">
              <ShoppingCart size={24} />
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar