import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, X, Search } from 'lucide-react';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: 'all',
    sort: 'popular',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Premium Vitamin C',
      description: '1000mg Immunity Booster',
      price: 24.99,
      category: 'vitamins',
      stock: 45,
      rating: 4.8,
      image: '/api/placeholder/400/300'
    },
    // Add more products
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 text-blue-600"
        >
          {showFilters ? <X size={20} /> : <Filter size={20} />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={filters.category === category.value}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4">Price Range</h3>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50+">$50+</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const categories = [
  { label: 'All Products', value: 'all' },
  { label: 'Vitamins & Supplements', value: 'vitamins' },
  { label: 'Pain Relief', value: 'pain-relief' },
  { label: 'Cold & Flu', value: 'cold-flu' },
  { label: 'First Aid', value: 'first-aid' }
];

export default Products;