import React, {useEffect, useState} from 'react';
import {FaPhone, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {useNavigate} from 'react-router-dom';
import productsData from "../data/products.json";
import Cookies from "js-cookie";

const Contacts = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCartItems = Cookies.get('cartItems');
        if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
    }, []);

    useEffect(() => {
        Cookies.set('cartItems', JSON.stringify(cartItems), {expires: 7});
    }, [cartItems]);

    useEffect(() => {
        window.scrollTo = () => {
        }; // Anulează scrollTo global
    }, []);

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        if (!query.trim()) return setSearchResults([]);

        const results = Object.values(productsData).flatMap(category =>
            category.subcategories ?
                Object.values(category.subcategories).flatMap(subcategory =>
                    subcategory.products?.filter(product =>
                        product.name.toLowerCase().includes(query.toLowerCase())
                    ) || []
                ) : []
        );
        setSearchResults(results);
    };

    const handleSearchResultClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    const removeFromCart = (item) => {
        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.init(import.meta.env.VITE_APP_EMAILJS_CONTACTS_EMAIL_DATA_KEY);

        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_CONTACTS_EMAIL_DATA_KEY,
            {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            },
            import.meta.env.VITE_APP_EMAILJS_EMAIL_DATA_KEY
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setFormSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('A apărut o eroare la trimiterea formularului. Vă rugăm încercați din nou.');
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavigationBar
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                productsData={productsData}
            />

            <div className="container my-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">Оставайтесь на связи с нами</h1>
                    <p className="lead text-muted">
                        Оставьте заявку на сайте или свяжитесь с нами любым удобным для Вас способом

                    </p>
                    <p className="lead text-muted">Время работы
                        Понедельник-Воскресенье:
                        08:00 - 20:00
                        Без выходных</p>
                </div>

                {/* Contact Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaMapMarkerAlt className="mb-3" size={32} style={{color: '#5E8D66'}}/>
                                <h3 className="card-title mb-3">Адрес</h3>
                                <p className="card-text fs-5">
                                    Московская область<br/>
                                    село Михеево, 119
                                </p>
                                <a href="https://www.google.com/maps/place/Eko+Pitomnik+-+Rasteniya+Dlya+Sada/@55.3791495,38.4637093,2337m/data=!3m1!1e3!4m15!1m8!3m7!1s0x414a8dd5355f11e3:0x4782cbb344cc33eb!2sMikheevo,+Regiunea+Moscova,+Rusia,+140167!3b1!8m2!3d55.3821847!4d38.4585382!16s%2Fg%2F1hb_g8rwd!3m5!1s0x414a8fbf644b56f3:0x27f5f9f5080242d0!8m2!3d55.3772504!4d38.4712046!16s%2Fg%2F11rhqk_gk6?entry=ttu&g_ep=EgoyMDI1MDIwMy4wIKXMDSoASAFQAw%3D%3D"
                                   className="btn btn-outline-primary"
                                   style={{
                                       color: '#5E8D66',
                                       borderColor: '#5E8D66'
                                   }}
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    Построить маршрут
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaPhone className="mb-3" size={32} style={{color: '#5E8D66'}}/>
                                <h3 className="card-title mb-3">Телефоны</h3>
                                <p className="card-text fs-5">
                                    +7(495)532-07-00<br/>
                                    +7(926)239-63-83
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaEnvelope className="mb-3" size={32} style={{color: '#5E8D66'}}/>
                                <h3 className="card-title mb-3">Email</h3>
                                <p className="card-text fs-5">
                                    <a href="mailto:info@eco-pitomnik.ru"
                                       className="text-decoration-none"
                                       style={{color: '#5E8D66'}}>
                                        info@eco-pitomnik.ru
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ... other content ... */}
                <iframe width="100%" height="400" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%D1%81%D0%B5%D0%BB%D0%BE%20%D0%9C%D0%B8%D1%85%D0%B5%D0%B5%D0%B2%D0%BE,%20119%20Moscow%20+(Location)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                <a href='https://www.acadoo.de/leistungen/ghostwriter-doktorarbeit/'></a>
                <script type='text/javascript'
                        src='https://embedmaps.com/google-maps-authorization/script.js?id=80325c94ab0a3a3289bcefe2ac06b4dc07586543'></script>
                {/* Centered Form */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <h2 className="text-center mb-4">Свяжитесь с нами</h2>
                                <p className="lead text-muted">Время работы
                                    Оставьте заявку и мы свяжемся с Вами в ближайшее время!</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label fs-5">
                                            <FaPhone className="me-2" style={{color: '#5E8D66'}}/>
                                            Ваше имя *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fs-5">
                                            <FaEnvelope className="me-2" style={{color: '#5E8D66'}}/>
                                            Ваш Email *
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="phone" className="form-label fs-5">
                                            <FaPhone className="me-2" style={{color: '#5E8D66'}}/>
                                            Ваш телефон *
                                        </label>
                                        <input
                                            inputMode={"tel"}
                                            inputMode="numeric"
                                            name="phone"
                                            className="form-control form-control-lg"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="message" className="form-label fs-5">
                                            Сообщение
                                        </label>
                                        <textarea
                                            className="form-control form-control-lg"
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-4 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="acceptTerms"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="acceptTerms">
                                            Принимаю условия политики конфиденциальности
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-success btn-lg">
                                            Отправить сообщение
                                        </button>
                                    </div>
                                </form>

                                {formSubmitted && (
                                    <div className="alert alert-success mt-4" role="alert">
                                        Спасибо! Ваше сообщение отправлено.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
            <BottomNavigationBar
                cartItemsCount={cartItems.length}
                favoritesCount={0}
                searchResults={searchResults}
                onSearchQueryChange={handleSearchQueryChange}
                onResultClick={handleSearchResultClick}
            />

        </div>
    );
};

export default Contacts;
