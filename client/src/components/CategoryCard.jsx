// components/CategoryCard.jsx
import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.name.toLowerCase()}`}
      className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-16 h-16 mx-auto mb-4 object-contain"
      />
      <h3 className="font-semibold text-gray-800">{category.name}</h3>
      {category.itemCount && (
        <p className="text-sm text-gray-500 mt-1">{category.itemCount} items</p>
      )}
    </Link>
  )
}

export default CategoryCard