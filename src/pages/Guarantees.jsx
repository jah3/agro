import React, { useState, useEffect } from 'react';
import { FaLeaf, FaTruck, FaCheck, FaChalkboardTeacher } from 'react-icons/fa';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar.jsx';
import productsData from '../data/products.json';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Guarantees = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCartItems = Cookies.get('cartItems');
        if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
    }, []);

    useEffect(() => {
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
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

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavigationBar
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                productsData={productsData}
            />

            <div className="container my-5">
                <div className="text-center mb-5">
                    <h1 className="display-3 fw-bold">Наши гарантии — ваше спокойствие</h1>
                    <p className="lead text-muted">
                        Мы гарантируем, что каждое растение, которое мы продаём, будет здоровым, а ассортимент всегда актуальным.
                    </p>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaLeaf /> Гарантируем продажу здоровых растений</h2>
                        <p className="fs-5">
                            Мы продаем саженцы, которые выращиваются на территории нашего питомника. На всех этапах транспортировки обеспечивается бережное отношение к посадочному материалу.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaTruck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaLeaf /> Гарантируем разнообразный ассортимент</h2>
                        <p className="fs-5">
                            В каталоге представлены тысячи наименований растений - это плодово-ягодные культуры, лиственные и хвойные деревья, декоративные кустарники. Ассортимент регулярно обновляется.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaCheck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaCheck /> Гарантируем соответствие сорта</h2>
                        <p className="fs-5">
                            На каждом саженце присутствует бирка с информацией - вид, сорт, возраст. Мы гарантируем 100% соответствие заказанному сорту. За этим тщательно следят наши сотрудники.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaCheck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaChalkboardTeacher /> Гарантируем экспертную помощь</h2>
                        <p className="fs-5">
                            Мы — настоящие эксперты своего дела и расскажем обо всех тонкостях посадки и ухода за растениями. Также мы оказываем поддержку и после покупки, консультируя по вопросам ухода за зелеными насаждениями.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaChalkboardTeacher size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>
            </div>

            <Footer />
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

export default Guarantees;
