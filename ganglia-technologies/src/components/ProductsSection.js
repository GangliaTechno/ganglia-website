import React from 'react';
import '../styles/ProductsSection.css'; // Assuming you have a CSS file for styling

const ProductsSection = () => {
  const topRowProducts = [
    {
      id: 'anushtaan',
      title: 'Anushtaan',
      subtitle: 'Data-driven Project Management Tool',
      category: 'blue',
      image: '/api/placeholder/300/200',
      isAvailable: true
    },
    {
      id: 'tripmachaai',
      title: 'TripMachaAI',
      subtitle: 'AI-powered short distance travel planner',
      category: 'dark',
      image: '/api/placeholder/300/200',
      isAvailable: true
    },
    {
      id: 'medical-log-book',
      title: 'Medical Log Book',
      subtitle: 'AI-powered clinical reporting and evaluation platform',
      category: 'blue',
      image: '/api/placeholder/300/200',
      isAvailable: true
    }
  ];

  const bottomRowProducts = [
    {
      id: 'smart-laryngoscope',
      title: 'Smart Video',
      subtitle: 'Laryngoscope',
      category: 'dark',
      image: '/api/placeholder/300/200',
      isAvailable: true
    },
    {
      id: 'medical-drone',
      title: 'Medical Drone',
      subtitle: '',
      category: 'blue',
      image: '/api/placeholder/300/200',
      isAvailable: false
    },
    {
      id: 'mobile-icu',
      title: 'Mobile ICU',
      subtitle: 'UNLOCKING SOON!',
      category: 'dark',
      image: '/api/placeholder/300/200',
      isAvailable: false
    },
    {
      id: 'thermal-imaging',
      title: 'Thermal-Imaging',
      subtitle: 'System',
      category: 'blue',
      image: '/api/placeholder/300/200',
      isAvailable: false
    }
  ];

  return (
    <section className="products-section" id="products">
      <div className="products-background">
        <div className="products-container">
          <h2 className="products-title">Our Valuable Products</h2>
          
          {/* Top Row - 3 Cards */}
          <div className="products-grid-top">
            {topRowProducts.map((product) => (
              <div 
                key={product.id}
                className={`product-card ${product.category} ${!product.isAvailable ? 'coming-soon' : ''}`}
                data-product={product.id}
              >
                <div className="product-content">
                  <div className="product-header">
                    <h3 className="product-title">
                      {product.title}
                    </h3>
                    {product.subtitle && (
                      <p className="product-subtitle">
                        {product.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="product-image"
                    />
                    {!product.isAvailable && (
                      <div className="coming-soon-overlay">
                        <span className="coming-soon-text">UNLOCKING SOON!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - 4 Cards */}
          <div className="products-grid-bottom">
            {bottomRowProducts.map((product) => (
              <div 
                key={product.id}
                className={`product-card ${product.category} ${!product.isAvailable ? 'coming-soon' : ''}`}
                data-product={product.id}
              >
                <div className="product-content">
                  <div className="product-header">
                    <h3 className="product-title">
                      {product.title}
                    </h3>
                    {product.subtitle && (
                      <p className="product-subtitle">
                        {product.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="product-image"
                    />
                    {!product.isAvailable && (
                      <div className="coming-soon-overlay">
                        <span className="coming-soon-text">UNLOCKING SOON!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;