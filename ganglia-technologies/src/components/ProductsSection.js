import React from 'react';
import '../styles/ProductsSection.css'; // Assuming you have a CSS file for styling

const ProductsSection = () => {
  const topRowProducts = [
    {
      id: 'anushtaan',
      title: 'Anushtaan',
      subtitle: 'Data-driven Project Management Tool',
      category: 'blue',
      video: require('../assets/Anusthaan.mp4'),
      isAvailable: true
    },
    {
      id: 'tripmachaai',
      title: 'TripMachaAI',
      subtitle: 'AI-powered short distance travel planner',
      category: 'dark',
      video: require('../assets/tripmacha.mp4'),
      isAvailable: true
    },
    {
      id: 'medical-log-book',
      title: 'Medical Log Book',
      subtitle: 'AI-powered clinical reporting and evaluation platform',
      category: 'blue',
      video: require('../assets/Medlog Book.mp4'),
      isAvailable: true
    }
  ];

  const bottomRowProducts = [
    {
      id: 'smart-laryngoscope',
      title: 'Smart Video',
      subtitle: 'Laryngoscope',
      category: 'dark',
      image: require('../assets/lanyngoscope.png'),
      isAvailable: true
    },
    {
      id: 'medical-drone',
      title: 'Medical Drone',
      subtitle: '',
      category: 'blue',
      image: require('../assets/drone.png'),
      isAvailable: false
    },
    {
      id: 'mobile-icu',
      title: 'Mobile ICU',
      subtitle: '',
      category: 'dark',
      image: require('../assets/mobile icu.png'),
      isAvailable: false
    },
    {
      id: 'thermal-imaging',
      title: 'Thermal-Imaging',
      subtitle: 'System',
      category: 'blue',
      image: require('../assets/thermal image.png'),
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
                className={`product-card ${product.category}`}
                data-product={product.id}
              >
                <div className="product-content">
                  <div className="product-header">
                    <h3 className="product-title">{product.title}</h3>
                    {product.subtitle && (
                      <p className="product-subtitle">{product.subtitle}</p>
                    )}
                  </div>

                  <div className="product-image-container">
                    <video
                      src={product.video}
                      className="product-image"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
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
                    <h3 className="product-title">{product.title}</h3>
                    {product.subtitle && (
                      <p className="product-subtitle">{product.subtitle}</p>
                    )}
                  </div>

                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                  </div>

                  {!product.isAvailable && (
                    <div className="coming-soon-text" style={{ marginTop: '10px', textAlign: 'center' }}>
                      UNLOCKING SOON!
                    </div>
                  )}
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