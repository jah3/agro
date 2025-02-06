import React, {useEffect, useState} from 'react';
import {FaPhone, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';
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
        setFormSubmitted(true);
        // You can add further functionality to handle form submission (e.g., send to an API)
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
                </div>

                {/* Contact Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaMapMarkerAlt className="text-primary mb-3" size={32}/>
                                <h3 className="card-title mb-3">Адрес</h3>
                                <p className="card-text fs-5">
                                    Московская область<br/>
                                    село Михеево, 119
                                </p>
                                <a href="https://www.google.com/maps"
                                   className="btn btn-outline-primary"
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
                                <FaPhone className="text-primary mb-3" size={32}/>
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
                                <FaEnvelope className="text-primary mb-3" size={32}/>
                                <h3 className="card-title mb-3">Email</h3>
                                <p className="card-text fs-5">
                                    <a href="mailto:info@eco-pitomnik.ru" className="text-decoration-none">
                                        info@eco-pitomnik.ru
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="row mb-5">
                    <div className="col-md-8 mx-auto">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center bg-light">
                                <h2 className="mb-4">Время работы</h2>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <p className="fs-5 mb-0">
                                            <strong>Пн-Вс:</strong> 08:00 - 20:00<br/>
                                            Без выходных
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="fs-5 mb-0">
                                            Перед визитом согласуйте время<br/>
                                            и наличие позиций с агрономом
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered Form */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <h2 className="text-center mb-4">Напишите нам</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label fs-5">
                                            <FaPhone className="me-2"/>
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
                                            <FaEnvelope className="me-2"/>
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
                                            <FaPhone className="me-2"/>
                                            Ваш телефон *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="phone"
                                            name="phone"
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
                                        <button type="submit" className="btn btn-primary btn-lg">
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
