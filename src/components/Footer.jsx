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
                    {/* Adresă și contact */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h4 className="mb-4 fw-bold">Наш Адрес</h4>
                                <div className="mb-3">
                                    <p className="mb-1 fw-semibold">Наш питомник:</p>
                                    <p className="mb-3">Село Михеево</p>
                                    <a
                                        href="https://www.google.com/maps/place/Eko+Pitomnik+-+Rasteniya+Dlya+Sada/@55.3791495,38.4637093,2337m/data=!3m1!1e3!4m15!1m8!3m7!1s0x414a8dd5355f11e3:0x4782cbb344cc33eb!2sMikheevo,+Regiunea+Moscova,+Rusia,+140167!3b1!8m2!3d55.3821847!4d38.4585382!16s%2Fg%2F1hb_g8rwd!3m5!1s0x414a8fbf644b56f3:0x27f5f9f5080242d0!8m2!3d55.3772504!4d38.4712046!16s%2Fg%2F11rhqk_gk6?entry=ttu&g_ep=EgoyMDI1MDIwMy4wIKXMDSoASAFQAw%3D%3D"
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
                                    +7(495)532-07-00
                                </p>
                                <p>
                                    <i className="bi bi-phone me-2"></i>
                                    +7(926)239-63-83
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
                            <iframe width="100%" height="400" frameBorder="0" scrolling="no" marginHeight="0"
                                    marginWidth="0"
                                    id="gmap_canvas"
                                    src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%D1%81%D0%B5%D0%BB%D0%BE%20%D0%9C%D0%B8%D1%85%D0%B5%D0%B5%D0%B2%D0%BE,%20119%20Moscow%20+(Location)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
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