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
                    <h1 className="display-3 fw-bold">Наша гарантия — ваше уверенность</h1>
                    <p className="lead text-muted">
                        Мы уверены, что каждое растение, которое мы предлагаем, будет здоровым, а наш ассортимент всегда актуален.
                    </p>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaLeaf /> Обеспечиваем продажу только здоровых растений</h2>
                        <p className="fs-5">
                            Мы предлагаем саженцы, выращенные на нашей территории. Мы гарантируем аккуратное обращение с растениями на каждом этапе доставки.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaTruck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaLeaf /> Обеспечиваем широкий выбор растений</h2>
                        <p className="fs-5">
                            В нашем каталоге представлено множество видов растений, включая плодово-ягодные, лиственные и хвойные деревья, декоративные кустарники. Мы регулярно обновляем ассортимент.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaCheck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaCheck /> Гарантируем точность сорта</h2>
                        <p className="fs-5">
                            На каждом саженце имеется ярлык с полным описанием — вид, сорт, возраст. Мы гарантируем, что заказанный сорт соответствует указанному на ярлыке. За этим строго следят наши специалисты.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <FaCheck size={80} className="d-block mx-auto text-success" />
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-md-6">
                        <h2 className="fw-bold"><FaChalkboardTeacher /> Предоставляем экспертные консультации</h2>
                        <p className="fs-5">
                            Мы являемся экспертами в области растений и с радостью поделимся знаниями о посадке и уходе за растениями. Также мы оказываем консультации и после покупки по вопросам ухода за растениями.
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
