import React, { useState, useEffect, useMemo } from 'react';
import '../styles/awardsresearch.css';
import award1 from '../assets/award1.png';
import award2 from '../assets/award2.png';
import award3 from '../assets/award3.png';
import award4 from '../assets/award4.png';


const AwardsResearchPage = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Awards data with real images (unchanged)
  const awardsData = useMemo(() => [
   
    {
      id: 'award2',
      title: "Certificate of Excellence in Product Design",
      awardedBy: "3rd Elets Startup Awards 2024 – India AI Summit",
      venue: "Bengaluru, India",
      date: "August 10, 2024",
      year: "2024",
      category: "Innovation & Product Design",
      description: "Honored for excellence in innovative product design at the India AI Summit 2024 in Bengaluru. We are thrilled to share that Ganglia Technologies Pvt. Ltd. has been honoured with the Certificate of Excellence in Product Design at the 3rd Elets Startup Awards 2024. This recognition at the prestigious #IndiaAISummit2024 in Bengaluru highlights our commitment to innovation and excellence in the tech industry through cutting-edge product design methodologies and innovative approaches to solving complex technical challenges.",
      image: award2
    },
    {
      id: 'award3',
      title: "Best Stall Award – Medical Computing & Intelligence",
      awardedBy: "MAHE",
      venue: "KMC Greens, Manipal, Karnataka",
      date: "November 13-14, 2024",
      year: "2024",
      category: "Exhibition & Innovation Showcase",
      description: "Awarded for the Best Stall in the Medical Computing and Intelligence theme during the Collaborate Section of MAHE Research Day 2024. We are glad to share that Ganglia Technologies Pvt. Ltd. was honored with the Best Stall Award in the Medical Computing and Intelligence theme during the Collaborate Section of MAHE Research Day 2024, held on November 13th and 14th, 2024. Our innovative showcase demonstrated cutting-edge medical computing solutions and intelligence systems that impressed judges and visitors alike with our comprehensive approach to healthcare technology innovation.",
      image: award3
    },
     {
      id: 'award1',
      title: "Promising & Innovative Technology Company of the Year 2023",
      awardedBy: "23rd Great Indian Entrepreneurship, Design, Business & Startup Awards & Conference",
      venue: "The Taj West End, The Grand Ballroom, Bengaluru. Karnataka",
      date: "March 15, 2023",
      year: "2023",
      category: "Futuristic Product Development & Research",
      description: "Awarded for excellence in futuristic product development and research in healthcare technology. Ganglia Technologies Pvt. Ltd., housed in the Manipal GoK Bioincubator, Karnataka, was honored with the 'Promising & Innovative Technology Company of the Year 2023' award in the 'Futuristic Product Development & Research' category. The recognition was presented at the 23rd Great Indian Entrepreneurship, Design, Business & Startup Awards & Conference, a prestigious platform celebrating innovation and leadership. The award was conferred by renowned scientist Rajah Vijay Kumar and former ICAI President CA K. Raghu. Representing Ganglia were Dr. Jayaraj Mymbillly Balakrishnan (Chairman) and Dr. Dasharathraj K Shetty (Managing Director), accompanied by core design team members Shreyas Holla, Prithvi Tilwani (former intern), and Shreepathy Rangabhatta. The team expressed deep gratitude to MAHE, KMC, MIT, and Manipal-GoK Bioincubator for their constant support, mentorship, and encouragement throughout their journey.",
      image: award1
    },
    {
      id: 'award4',
      title: "Finalist – Singapore-India Hackathon 2023",
      awardedBy: "Nanyang Technological University & AICTE",
      venue: "Gandhinagar, Gujarat",
      date: "September 20, 2023",
      year: "2023",
      category: "Startup Innovation",
      description: "Ganglia Technologies Pvt. Ltd. was selected as one of the top 12 startups from India for their AI-based travel solutions at the prestigious Singapore-India Hackathon 2023. Exciting news! Ganglia Technologies Pvt. Ltd. is among the 12 startups chosen from participants in India's startup category. It is also one of the 24 startups shortlisted from India and Singapore for the prestigious Singapore-India Hackathon 2023, organized during India's G20 Presidency in Gandhinagar, Gujarat. This achievement represents our excellence in innovative AI solutions and startup development capabilities on an international platform.",
      image: award4
    }
  ], []);

  // News data with source links
  const newsData = useMemo(() => [
    {
  id: 'news1',
  title: "Namesh Malarout Appointed CEO of Ganglia Technologies Pvt. Ltd.",
  date: "May 9, 2025",
  summary: "Ganglia Technologies announces the appointment of Namesh Malarout as its new Chief Executive Officer in a strategic leadership move endorsed by the board.",
  content: "Manipal, [India], May 9, 2025: In a strategic leadership move, Ganglia Technologies Pvt. Ltd. has announced the appointment of Namesh Malarout as its Chief Executive Officer, effective immediately. The decision was officially endorsed during the company’s board meeting. Mr. Malarout, who previously worked as a data analyst in Canada, brings significant expertise to the role with a Master’s degree in Engineering Management from MIT and a Postgraduate Diploma in Management from Canada. During the ceremony, Co-Founder Dr. Dasharathraj K Shetty presented Mr. Malarout with a commemorative memento. The board meeting outlined strategic goals for 2025 and delineated the new CEO’s responsibilities. The ceremony was attended by the company’s leadership team and representatives from Team Manipal GoK Bio-Incubator, including Dr. Jayaraj Mymbilly Balakrishnan, Dr. Sandeep S Shenoy, Dr. Balakrishna Srinivas Maddodi, Mr. Shreepathy Ranga Bhatta, Mr. Krishna P Bhat, Dr. Komal Rana, Mr. Dheeraj Poojary, and Dr. Clavian Larry Miranda.",
  sourceLink: "https://business.republicnewsindia.com/namesh-malarout-appointed-ceo-of-ganglia-technologies/",
  sourceName: "Republic News India"
},

   {
  id: 'news2',
  title: "Ganglia Technologies Selected for Prestigious Singapore-India Hackathon 2023",
  date: "June 26, 2023",
  summary: "Ganglia Technologies Pvt. Ltd. has been shortlisted as one of 12 Indian startups and among the 24 finalists for the prestigious Singapore-India Hackathon 2023.",
  content: "Udupi, Jun 26: Ganglia Technologies Pvt Ltd is among the 12 start-ups shortlisted for India's start-up category and has been chosen as one of the 24 start-ups for the prestigious Singapore-India Hackathon 2023. The company is an outcome of the research, innovation, and entrepreneurial ecosystem of Kasturba Medical College (KMC) and Manipal Institute of Technology (MIT), Manipal Academy of Higher Education (MAHE). The achievement was made possible by the efforts of chairman Dr. Jayaraj Mymbilly Balakrishnan (KMC), managing director and CEO Dr. Dasharathraj K Shetty (MIT), and support from the Manipal-GoK Bioincubator and Centre for Disaster Management, MAHE. Ganglia Technologies also contributes by offering part-time and full-time job opportunities to students and locals. This milestone showcases MAHE’s commitment to research, innovation, and global collaboration through initiatives like the Singapore-India Hackathon.",
  sourceLink: "https://daijiworld.com/news/newsDisplay?newsID=1093857",
  sourceName: "Daijiworld"
}

  ], []);

  // Animation effects
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.awrd-fade-in-element');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll effects
  useEffect(() => {
    let ticking = false;
    
    const updateScrollEffects = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.awrd-hero-wrapper');
      
      parallaxElements.forEach(el => {
        const speed = 0.5;
        if (el) {
          el.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  // Award Card Component (unchanged)
  const AwardCard = ({ award }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to truncate text to approximately 2 lines (around 150 characters)
    const getTruncatedText = (text, maxLength = 150) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + '...';
    };

    const shortDescription = getTruncatedText(award.description);
    const shouldShowReadMore = award.description.length > 150;

    return (
      <div className="awrd-award-card" data-award-id={award.id}>
        <div className="awrd-award-image-container">
          <img 
            src={award.image} 
            alt={award.title}
            className="awrd-award-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMDAwNDI2Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjODdjZWViIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzg3Y2VlYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij5Bd2FyZCBJbWFnZTwvdGV4dD4KPC9zdmc+';
            }}
          />
          <div className="awrd-award-overlay">
            <span className="awrd-award-year">{award.year}</span>
          </div>
        </div>

        <div className="awrd-award-content">
          <div className="awrd-award-header">
            <h3 className="awrd-award-title">{award.title}</h3>
            <span className="awrd-award-category">{award.category}</span>
          </div>

          <div className="awrd-award-organization">
            <h4 className="awrd-section-subtitle">Awarded By:</h4>
            <p className="awrd-organization-text">{award.awardedBy}</p>
          </div>

          <div className="awrd-award-venue">
            <h4 className="awrd-section-subtitle">Venue:</h4>
            <p className="awrd-venue-text">{award.venue}</p>
          </div>

          <div className="awrd-award-date">
            <h4 className="awrd-section-subtitle">Date:</h4>
            <p className="awrd-date-text">{award.date}</p>
          </div>

          <div className="awrd-award-description">
            <h4 className="awrd-section-subtitle">Description:</h4>
            <div className="awrd-description-content">
              <p className="awrd-description-text">
                {showFullDescription ? award.description : shortDescription}
              </p>
              {shouldShowReadMore && (
                <button 
                  className="awrd-read-more-btn"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // News Card Component with source links
  const NewsCard = ({ news }) => {
    const [showFullContent, setShowFullContent] = useState(false);

    const handleSourceClick = () => {
      window.open(news.sourceLink, '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="awrd-news-card" data-news-id={news.id}>
        <div className="awrd-news-content">
          <div className="awrd-news-header">
            <h3 className="awrd-news-title">{news.title}</h3>
            <span className="awrd-news-date">{news.date}</span>
          </div>

          <div className="awrd-news-summary">
            <p className="awrd-news-summary-text">{news.summary}</p>
          </div>

          {showFullContent && (
            <div className="awrd-news-full-content">
              <p className="awrd-news-content-text">{news.content}</p>
            </div>
          )}

          <div className="awrd-news-actions">
            <button 
              className="awrd-news-read-more-btn"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? 'Show Less' : 'Read More'}
            </button>
            
            <button 
              className="awrd-news-source-btn"
              onClick={handleSourceClick}
              title={`Visit ${news.sourceName}`}
            >
              <span className="awrd-source-icon">🔗</span>
              View Source
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="awards-research-main-container">
      {/* Hero Section */}
      <div className="awrd-hero-wrapper">
        <div 
          id="hero-content"
          className={`awrd-hero-content awrd-fade-in-element ${visibleElements.has('hero-content') ? 'awrd-visible' : ''}`}
        >
          <h1 className="awrd-main-heading">Awards & News</h1>
          <p className="awrd-hero-description">
            Celebrating excellence in medical research and innovation
          </p>
          <div className="awrd-hero-divider"></div>
        </div>
      </div>

      {/* Awards Section */}
      <div 
        id="awards-section"
        className={`awrd-awards-wrapper awrd-fade-in-element ${visibleElements.has('awards-section') ? 'awrd-visible' : ''}`}
      >
        <div className="awrd-awards-container">
          <h2 className="awrd-section-heading">Awards & Recognition</h2>
          <div className="awrd-awards-grid">
            {awardsData.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div 
        id="news-section"
        className={`awrd-news-wrapper awrd-fade-in-element ${visibleElements.has('news-section') ? 'awrd-visible' : ''}`}
      >
        <div className="awrd-news-container">
          <h2 className="awrd-section-heading">News</h2>
          <div className="awrd-news-grid">
            {newsData.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default AwardsResearchPage;
