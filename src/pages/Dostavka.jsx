import React, {useState, useEffect} from 'react';
import {Truck, CreditCard, MapPin, Clock, CheckCircle} from 'react-feather';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar.jsx';
import productsData from '../data/products.json';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

const Dostavka = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
        setSelectedProduct(product);
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

            <main className="flex-grow-1">
                <div className="container mt-4 mb-5">
                    <h1 className="text-center mb-4">Условия доставки и оплаты</h1>

                    {/* Sectiunea Despre Livrare */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">
                                <Truck size={24} className="me-2"/>
                                Доставка саженцев
                            </h2>
                            <p className="card-text">
                                Оформляйте заказ в нашем интернет-магазине «Эко Питомник» с доставкой по Москве и
                                Московской области. Минимальная сумма заказа от 5000 рублей.
                            </p>
                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <MapPin size={20} className="me-2"/>
                                                Доставка по Москве
                                            </h5>
                                            <p className="card-text">
                                                Стоимость доставки от 500 рублей в зависимости от заказа и
                                                расстояния от нашего питомника.
                                                <br/>
                                                <strong>Бесплатная доставка</strong> при сумме заказа от 25000 рублей в
                                                пределах МКАД.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <MapPin size={20} className="me-2"/>
                                                По Московской области
                                            </h5>
                                            <p className="card-text">
                                                Стоимость доставки 500 рублей + 50 рублей/км от МКАД.
                                                <br/>
                                                <strong>Точную стоимость доставки уточняйте у менеджера.</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Clock size={20} className="me-2"/>
                                        График доставки
                                    </h5>
                                    <p className="card-text">
                                        Служба доставки работает ежедневно с 8:00 до 20:00.
                                        <br/>
                                        Срок доставки обычно составляет от 1 до 3 дней.
                                        <br/>
                                        Чаще всего мы формируем и отправляем несколько заказов по одному маршруту, что
                                        делает стоимость доставки крайне выгодной для вас.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sectiunea Despre Plata */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">
                                <CreditCard size={24} className="me-2"/>
                                Об оплате
                            </h2>
                            <p className="card-text">
                                Оплатить оформленный заказ можно несколькими способами:
                            </p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <CheckCircle size={16} className="me-2 text-success"/>
                                    Наличными курьеру при получении
                                </li>
                                <li className="list-group-item">
                                    <CheckCircle size={16} className="me-2 text-success"/>
                                    Банковской картой
                                </li>
                                <li className="list-group-item">
                                    <CheckCircle size={16} className="me-2 text-success"/>
                                    Переводом на банковскую карту
                                </li>
                                <li className="list-group-item">
                                    <CheckCircle size={16} className="me-2 text-success"/>
                                    Безналичным переводом на расчётный счёт
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNavigationBar
                cartItemsCount={cartItems.length}
                favoritesCount={0}
                searchResults={searchResults}
                onSearchQueryChange={handleSearchQueryChange}
                onResultClick={handleSearchResultClick}
            />
            <Footer/>
        </div>
    );
};

export default Dostavka;