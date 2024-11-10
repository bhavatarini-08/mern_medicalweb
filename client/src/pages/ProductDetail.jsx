import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, ArrowRight, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  // Mock product data - in a real app, you'd fetch this based on the ID
  const product = {
    id: 1,
    name: 'Paracetamol 500mg Tablets',
    brand: 'HealthCare Pharmaceuticals',
    price: 9.99,
    originalPrice: 12.99,
    discount: 23,
    stock: 50,
    description: 'Effective pain relief tablets for headaches, toothaches, and fever. Fast-acting formula that provides up to 6 hours of relief.',
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ],
    details: {
      'Active Ingredient': 'Paracetamol',
      'Strength': '500mg',
      'Pack Size': '20 tablets',
      'Form': 'Tablet',
      'Storage': 'Store below 25°C',
      'Expiry': 'December 2025'
    },
    usage: {
      'Dosage': 'Take 1-2 tablets every 4-6 hours as needed',
      'Maximum Dose': 'Do not exceed 8 tablets in 24 hours',
      'Age Group': 'Adults and children over 12 years',
      'Take With': 'Can be taken with or without food'
    },
    warnings: [
      'Do not exceed stated dose',
      'Avoid alcohol while taking this medication',
      'Consult doctor if symptoms persist',
      'Keep out of reach of children'
    ],
    reviews: [
      {
        id: 1,
        user: 'John D.',
        rating: 5,
        date: '2024-03-15',
        comment: 'Very effective for headaches. Works quickly with no side effects.',
        verified: true
      },
      {
        id: 2,
        user: 'Sarah M.',
        rating: 4,
        date: '2024-03-10',
        comment: 'Good product, but packaging could be better.',
        verified: true
      }
    ],
    relatedProducts: [
      {
        id: 2,
        name: 'Ibuprofen 200mg',
        price: 8.99,
        image: '/api/placeholder/200/200'
      },
      {
        id: 3,
        name: 'Aspirin 300mg',
        price: 7.99,
        image: '/api/placeholder/200/200'
      },
      {
        id: 4,
        name: 'Cold & Flu Relief',
        price: 11.99,
        image: '/api/placeholder/200/200'
      }
    ]
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.brand}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {renderStars(4.5)}
                <span className="ml-2 text-gray-500">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border-r hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 border-l hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </p>
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Genuine Product</p>
                <p className="text-xs text-gray-500">100% Authentic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-12">
        <div className="border-b">
          <nav className="flex gap-8">
            {['description', 'details', 'usage', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-4 text-sm font-medium border-b-2 -mb-px ${
                  selectedTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'description' && (
            <p className="text-gray-600">{product.description}</p>
          )}

          {selectedTab === 'details' && (
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex gap-4">
                  <dt className="font-medium text-gray-900 min-w-[120px]">{key}:</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {selectedTab === 'usage' && (
            <dl className="space-y-4">
              {Object.entries(product.usage).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-medium text-gray-900 mb-1">{key}</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Warnings</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </dl>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct.id}
              to={`/products/${relatedProduct.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600">${relatedProduct.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail