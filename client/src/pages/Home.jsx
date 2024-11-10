import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Star, TrendingUp } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const [hoveredProduct, setHoveredProduct] = useState(null)

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Multivitamin Complex",
      price: 29.99,
      rating: 4.8,
      reviews: 128,
      image: "/api/placeholder/400/300",
      description: "Complete daily nutrition with essential vitamins and minerals",
      discount: 15,
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Advanced Pain Relief Gel",
      price: 19.99,
      rating: 4.9,
      reviews: 246,
      image: "/api/placeholder/400/300",
      description: "Fast-acting relief for muscle and joint pain",
      discount: 20,
      tag: "New"
    },
    {
      id: 3,
      name: "Immune Support Bundle",
      price: 34.99,
      rating: 4.7,
      reviews: 89,
      image: "/api/placeholder/400/300",
      description: "Vitamin C, D3, and Zinc for immune health",
      discount: 10,
      tag: "Popular"
    },
    {
      id: 4,
      name: "Natural Sleep Aid",
      price: 24.99,
      rating: 4.6,
      reviews: 156,
      image: "/api/placeholder/400/300",
      description: "Melatonin and herbal blend for better sleep",
      discount: 5,
      tag: "Trending"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-[600px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white space-y-8 max-w-2xl">
            <h1 className="text-5xl font-bold leading-tight">
              Your Health Journey Starts Here
            </h1>
            <p className="text-xl opacity-90">
              Discover premium healthcare products delivered to your doorstep. 
              Quality assured, trusted by millions.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2 group"
              >
                Shop Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-600 mt-2">Handpicked selections for your wellness</p>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            View All <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-1">
                  {product.tag === "Trending" && <TrendingUp size={16} />}
                  {product.tag}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star className="fill-current" size={16} />
                    <span className="text-gray-900 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-gray-500 line-through text-sm">
                        ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg transition-all ${
                      hoveredProduct === product.id
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-600 border border-blue-600'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home