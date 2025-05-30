import './Home.css';
import Slider from "react-slick";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return (
    <div className="home-container">
      <h1>Bienvenue sur <span className="brand-name">YUMGUARD</span> 🥗</h1>
      <p className="intro-text">
        L'application qui veille sur ton frigo et réduit le gaspillage alimentaire 🍽️💡
      </p>

      <div className="slider-section">
        <Slider {...settings}>
          <div className="slide">
            <img src={slide1} alt="Slide 1" />
          </div>
          <div className="slide">
            <img src={slide2} alt="Slide 2" />
          </div>
          <div className="slide">
            <img src={slide3} alt="Slide 3" />
          </div>
          <div className="slide">
            <img src={slide4} alt="Slide 4" />
          </div>
        </Slider>
      </div>

      <section className="tips-section">
        <h2>🌟 Conseils pour mieux gérer ton alimentation :</h2>
        <ul>
          <li>🕐 Vérifie régulièrement les dates d’expiration de tes produits.</li>
          <li>🥗 Prépare des repas avec les aliments proches de la date limite.</li>
          <li>🧊 Range les aliments par ordre de péremption dans ton frigo.</li>
        </ul>
      </section>

      <section className="news-section">
        <h2>📰 Actualités</h2>
        <p>📅 Le saviez-vous ? En France, 10 millions de tonnes de nourriture sont gaspillées chaque année.</p>
        <p>💡 Avec YUMGUARD, tu fais un geste pour la planète et ton portefeuille !</p>
      </section>
    </div>
  );
};

export default Home;
