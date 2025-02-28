import React, {useEffect, useState} from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {Accordion, Card, Button} from 'react-bootstrap';

import {Truck, CreditCard, MapPin, Clock, CheckCircle} from 'react-feather';

import productsData from '../data/products.json';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
const faqs = [
    {
        question: "Когда можно посадить растения, приобретённые в питомнике?",
        answer: "Растения с закрытой корневой системой можно высаживать в период с весны до осени. Эти саженцы не повреждают корни при посадке и легко адаптируются на новом месте, обеспечивая хороший рост."
    },
    {
        question: "Когда начинается продажа саженцев плодовых деревьев?",
        answer: "Продажа саженцев плодовых и ягодных, а также декоративных растений обычно начинается в марте-апреле, но это зависит от погодных условий в конкретном году. Если хотите, вы можете связаться с нами, и мы уведомим вас, как только начнутся продажи."
    },
    {
        question: "Можно ли заказать крупномерные растения с посадкой?",
        answer: "Мы предлагаем услугу посадки, стоимость которой составляет +30% от цены растения."
    },
    {
        question: "Как можно приобрести растения в питомнике «Эко-Питомник»?",
        answer: "Вы можете заказать саженцы через наш интернет-магазин или по телефону. На сайте размещена подробная информация о каждом виде растений, чтобы помочь вам сделать правильный выбор."
    },
    {
        question: "Продаются ли растения, выращенные в питомнике?",
        answer: "Да, мы продаём растения, которые выращиваем на территории нашего питомника. Это позволяет нам гарантировать высокое качество и хорошую приживаемость саженцев, так как мы соблюдаем все агротехнические нормы."
    },
    {
        question: "Какова минимальная сумма заказа на сайте?",
        answer: "Минимальная сумма заказа в нашем интернет-магазине составляет 5000 рублей, не включая стоимость доставки."
    },
    {
        question: "Какова стоимость доставки?",
        answer: "Стоимость доставки по МКАД составляет 500 рублей. Заказы на сумму от 50 000 рублей по Москве доставляются бесплатно. Для доставки в область стоимость рассчитывается как 500 рублей + 50 рублей за каждый километр. Для подробной информации и обсуждения доставки, пожалуйста, свяжитесь с нашим оператором."
    },
    {
        question: "Какие способы оплаты доступны для заказа?",
        answer: "Вы можете оплатить заказ наличными курьеру при получении, банковской картой, переводом на банковскую карту или безналичным переводом на расчётный счёт."
    },
    {
        question: "Работает ли питомник с оптовыми покупателями?",
        answer: "Да, мы предоставляем возможность заказать как небольшие партии, так и оптовые поставки. Для оптовых клиентов действуют специальные условия и прайс-лист."
    }
];


const FAQs = () => {

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
            <div className="container my-5 flex-grow-1">
                <h1 className="text-center mb-4 text-dark">Часто задаваемые вопросы</h1>

                <Accordion className="w-100" defaultActiveKey="0">
                    {faqs.map((faq, index) => (
                        <Accordion.Item
                            key={index}
                            eventKey={String(index)}
                            className="mb-3 border-0"
                        >
                            <Accordion.Header
                                className="fs-5"
                                style={{
                                    transition: 'background-color 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                {faq.question}
                            </Accordion.Header>
                            <Accordion.Body>
                                {faq.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                {/* Stiluri custom */}
                <style>
                    {`
                    .accordion-item {
                            border: 1px solid #e5e7eb !important;
                            border-radius: 12px !important;
                            margin-bottom: 1rem !important;
                            overflow: hidden;
                            transition: all 0.3s ease;
                        }
                    
                        .accordion-button:not(.collapsed) {
                            background-color: #648c94 !important;
                            color: white !important;
                        }
                        .accordion-button:hover {
                            background-color: #648c94 !important;
                            color: white;
                        }
                        .accordion-button:focus {
                            box-shadow: none !important;
                        }
                    `}
                </style>
            </div>

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

export default FAQs;
