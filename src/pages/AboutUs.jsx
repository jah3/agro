import React, {useState, useEffect} from 'react';
import {FaLeaf} from 'react-icons/fa';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar.jsx';
import productsData from '../data/products.json';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

const Counter = ({end, text}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = Math.ceil(end / 100);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [end]);

    return (
        <div className="text-center">
            <h1 className="display-4 fw-bold" style={{ color: '#5E8D66' }}>{count.toLocaleString()}+</h1>
            <p className="fs-4 text-muted"><FaLeaf className="text-success"/> {text}</p>
        </div>
    );
};

const AboutUs = () => {
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


    return (
        <div className="d-flex flex-column min-vh-100">
            <NavigationBar
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                productsData={productsData}
            />

            <div className="d-flex flex-column min-vh-100">

                <div className="container my-5">
                    <div className="text-center mb-5">
                        <h1 className="display-3 fw-bold">Питомник садовых деревьев</h1>
                        <p className="lead text-muted">
                            С 2005 года мы предлагаем жителям Москвы и области только качественные, здоровые и обработанные от вредителей саженцы. За эти годы мы зарекомендовали себя как надежный поставщик, с которым удобно работать и консультироваться. Мы обновили подход к бизнесу по выращиванию саженцев, сделав его более современным и ориентированным на удобство клиентов.
                        </p>
                    </div>

                    <div className="bg-light py-5 rounded-3">
                        <h2 className="text-center mb-4 display-5 fw-bold">Питомник ЭКО-ПИТОМНИК — это:</h2>
                        <div className="row text-center">
                            <div className="col-md-3">
                                <Counter end={17} text="лет на рынке"/>
                            </div>
                            <div className="col-md-3">
                                <Counter end={18} text="гектаров территории"/>
                            </div>
                            <div className="col-md-3">
                                <Counter end={70000} text="саженцев произведено"/>
                            </div>
                            <div className="col-md-3">
                                <Counter end={10000} text="счастливых клиентов"/>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 align-items-center">
                        <div className="col-md-6">
                            <img src="/categories/large-trees.jpg"
                                 className="img-fluid rounded"
                                 alt="nursery"/>
                        </div>
                        <div className="col-md-6">
                            <h3 className="mb-4">Только здоровые и крепкие растения</h3>
                            <p className="fs-5">
                                Это семейный бизнес, начатый еще нашими родителями. Сейчас у нас работает 15 опытных специалистов, а для ухода за растениями используется современное оборудование.
                            </p>
                            <p className="fs-5">
                                Мы стремимся предоставлять садоводам разнообразные саженцы по разумным ценам, а также развивать питомник и расширять ассортимент, чтобы каждый мог найти именно то, что ему нужно.
                            </p>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="p-5 rounded-3" style={{ backgroundColor: '#648c94', color: 'white' }}>
                                <h2 className="text-center mb-4">Наша основная цель</h2>
                                <p className="fs-5 text-center mb-0">
                                    Наша миссия — предоставлять садоводам разнообразие саженцев по доступным ценам, развивать питомник и постоянно расширять ассортимент, чтобы каждый клиент мог найти то, что ищет.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 g-4">
                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <Counter end={15} text="профессионалов"/>
                                    <p className="mt-3 fs-5">
                                        Наш питомник оснащен современным оборудованием и автоматической системой полива. В нашей команде работают 15 квалифицированных специалистов.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <Counter end={10000} text="удовлетворённых клиентов"/>
                                    <p className="mt-3 fs-5">
                                        Мы сосредоточены на производстве и продаже высококачественного посадочного материала, обеспечивая садоводов разнообразием саженцев по доступным ценам.
                                    </p>
                                </div>
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

export default AboutUs;