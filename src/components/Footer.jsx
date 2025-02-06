import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <footer className="text-white py-5" style={{backgroundColor: "#5E8D66"}}>
            <div className="container">
                <div className="row g-4">
                    {/* Coloana 1 - Informații comandă */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <h5>Минимальная сумма заказа</h5>
                        <p>5000 рублей без учёта доставки</p>
                        <div className="mt-3">
                            <h6>Введите свои контактные данные</h6>
                            <form>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Телефон"
                                    />
                                </div>
                                <button className="btn btn-success w-100"
                                        style={{backgroundColor: "#9F684B", color: "#FFF"}}>Отправить
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Coloana 2 - Adresă și contact */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <h5>НАШ Адрес</h5>
                        <p className="mb-1">Наш питомник:</p>
                        <p className="mb-3">Село Михеево</p>
                        <a
                            href="https://maps.google.com/?q=Село+Михеево"
                            className="btn btn-outline-light mb-3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Построить маршрут
                        </a>
                        <div className="mt-3">
                            <p>+7(495)532-07-00</p>
                            <p>+7(926)239-63-83</p>
                        </div>
                    </div>

                    {/* Coloana 3 - Link-uri */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="row">
                            <div className="col-6">
                                <h5>СТРАНИЦЫ</h5>
                                <ul className="list-unstyled">
                                    <li><a className="nav-link" href="/store" style={{color: "#FFF"}}>
                                        КАТАЛОГ
                                    </a></li>
                                    <li><a onClick={() => navigate("/dostavka")}
                                           style={{color: "#FFF", cursor: "pointer"}}
                                           className="text-white text-decoration-none">Доставка и оплата</a></li>
                                    <li><a
                                        className="nav-link"
                                        onClick={() => navigate("/about-us")}
                                        style={{color: "#FFF", cursor: "pointer"}}
                                    >О нас</a></li>
                                    <li><a
                                        className="nav-link"
                                        onClick={() => navigate("/garantii")}
                                        style={{color: "#FFF", cursor: "pointer"}}
                                    >Гарантии</a></li>
                                    <li><a
                                        className="nav-link"
                                        onClick={() => navigate("/contacts")}
                                        style={{color: "#FFF", cursor: "pointer"}}
                                    >Контакты</a></li>
                                    <li><a
                                        className="nav-link"
                                        onClick={() => navigate("/faqs")}
                                        style={{color: "#FFF", cursor: "pointer"}}
                                    >Вопрос-ответ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Coloana 4 - Hartă */}
                    <div className="col-12 col-sm-6 col-lg-3">
                        <h5>Карта</h5>
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.4567890123456!2d37.12345678901234!3d55.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDA3JzI0LjQiTiAzN8KwMDcnNDEuNiJF!5e0!3m2!1sen!2sru!4v1234567890123!5m2!1sen!2sru"
                                style={{border: 0, borderRadius: "8px"}}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <hr/>
                        <p className="mb-0">Садовый - рай ©, 2017 - 2025 - Все права защищены</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
