import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="container mx-auto px-4 z-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            EATSOnclick
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Delicious food delivered to your doorstep
          </p>
          <Link 
            href="/menu" 
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered within 30 minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">Fresh ingredients and delicious recipes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Easy Payment</h3>
              <p className="text-gray-600">Multiple payment options available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                    alt="Food item"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Delicious Dish {item}</h3>
                  <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">$12.99</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 