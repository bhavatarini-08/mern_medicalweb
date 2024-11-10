import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="text-gray-400" size={16} />
            {index === items.length - 1 ? (
              <span className="ml-2 text-gray-900">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
