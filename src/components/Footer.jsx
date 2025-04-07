import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <footer className="text-white py-5" style={{backgroundColor: "#648c94"}}>
            <div className="container">
                <div className="row g-4">
                    {/* Adresă și contact */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h4 className="mb-4 fw-bold">Наш Адрес</h4>
                                <div className="mb-3">
                                    <p className="mb-3">Раменский район Загорного-2</p>
                                    <a
                                        href="https://yandex.ru/navi/?whatshere%5Bzoom%5D=18&whatshere%5Bpoint%5D=38.302121%2C55.524664&si=ewj08nx1c348k0mk073uhphpbr"
                                        className="btn btn-light btn-sm d-inline-flex align-items-center"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{color: "#5E8D66"}}
                                    >
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Построить маршрут
                                    </a>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="mb-1">
                                    <i className="bi bi-telephone me-2"></i>
                                    +7
                                </p>
                                <p>
                                    <i className="bi bi-phone me-2"></i>
                                    +7
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Link-uri */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <h4 className="mb-4 fw-bold">СТРАНИЦЫ</h4>
                        <div className="row">
                            <div className="col-12">
                                <ul className="list-unstyled">
                                    {[
                                        ["/store", "КАТАЛОГ"],
                                        ["/dostavka", "Доставка и оплата"],
                                        ["/about-us", "О нас"],
                                        ["/garantii", "Гарантии"],
                                        ["/contacts", "Контакты"],
                                        ["/faqs", "Вопрос-ответ"]
                                    ].map(([path, text]) => (
                                        <li key={path} className="mb-2">
                                            <button
                                                onClick={() => navigate(path)}
                                                className="btn btn-link p-0 text-white text-decoration-none d-block text-start"
                                                style={{transition: "0.3s all"}}
                                            >
                                                {text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Hartă */}
                    <div className="col-12 col-lg-4">
                        <h4 className="mb-4 fw-bold">Мы на карте</h4>
                        <div className="ratio ratio-16x9 border rounded overflow-hidden">
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?ll=38.302121%2C55.524664&z=18&pt=38.302121,55.524664,pm2rdm"
                                width="100%"
                                height="400"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                            <a href='https://www.acadoo.de/leistungen/ghostwriter-doktorarbeit/'></a>
                            <script type='text/javascript'
                                    src='https://embedmaps.com/google-maps-authorization/script.js?id=80325c94ab0a3a3289bcefe2ac06b4dc07586543'></script>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="row mt-4 text-center">
                    <div className="col-12">
                        <a href="https://www.instagram.com/eco_pitomnik/" target="_blank" rel="noreferrer"
                           className="text-white mx-2">
                            <i className="bi bi-instagram" style={{fontSize: "2rem"}}></i>
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=79262396383" target="_blank" rel="noreferrer"
                           className="text-white mx-2">
                            <i className="bi bi-whatsapp" style={{fontSize: "2rem"}}></i>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row mt-5 pt-4">
                    <div className="col-12 text-center">
                        <div className="border-top pt-4">
                            <p className="mb-0 small opacity-75">
                                Садовый - рай ©, 2017 - {new Date().getFullYear()} - Все права защищены
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;