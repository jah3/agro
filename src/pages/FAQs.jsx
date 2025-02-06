import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {Accordion, Card, Button} from 'react-bootstrap';

const faqs = [
    {
        question: "Когда можно сажать растения, купленные в питомнике?",
        answer: "Растения с закрытой корневой системой можно сажать с весны до осени. При посадке таких саженцев корни не травмируются и деревья или кустарники быстро приживаются на новом месте, давая прирост."
    },
    {
        question: "Когда начинается продажа саженцев плодовых деревьев?",
        answer: "Как правило, продажа саженцев плодово – ягодных и декоративных культур начинается с марта-апреля, все зависит от конкретных условий года. При желании, Вы можете связаться с нами, и наш менеджер уведомит Вас сразу, как только будут открыты продажи."
    },
    {
        question: "Можно ли заказать доставку крупномеров вместе с посадкой?",
        answer: "Мы предоставляем услуги посадки, доплата составляет +30% к стоимости растения."
    },
    {
        question: "Как можно купить растения в питомнике «Эко-Питомник»?",
        answer: "Заказать саженцы можно в нашем интернет – магазине или по телефону. На сайте представлена подробная информация о каждом виде и сорте растений для того, чтобы клиентам было удобнее осуществлять свой выбор."
    },
    {
        question: "В продаже растения, которые были выращены на территории питомника?",
        answer: "Да, мы реализуем посадочный материал, который сами и выращиваем. Это дает нам возможность гарантировать качество и высокую приживаемость саженцев, поскольку при выращивании мы соблюдаем все правила агротехники."
    },
    {
        question: "Какая минимальная сумма заказа на сайте?",
        answer: "Минимальная сумма заказа в нашем интернет-магазине 5000 рублей без учёта доставки."
    },
    {
        question: "Сколько стоит доставка?",
        answer: "Стоимость доставки составляет 500 рублей в пределах МКАД. Заказы от 50 000 рублей по Москве мы доставляем бесплатно. Стоимость доставки в область рассчитывается следующим образом – 500 рублей + 50 рублей за 1 км."
    },
    {
        question: "Как можно оплатить заказ?",
        answer: "Наличными курьеру при получении, банковской картой, переводом на банковскую карту, безналичным переводом на расчётный счёт."
    },
    {
        question: "Работает ли питомник с оптовыми покупателями?",
        answer: "Да, у нас можно заказать как несколько позиций, так и оптовую партию. Для оптовых покупателей у нас действует специальный прайс лист."
    }
];

const FAQs = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavigationBar/>
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
                            background-color: #5E8D66 !important;
                            color: white !important;
                        }
                        .accordion-button:hover {
                            background-color: #5E8D66 !important;
                            color: white;
                        }
                        .accordion-button:focus {
                            box-shadow: none !important;
                        }
                    `}
                </style>
            </div>

            <Footer/>
            <BottomNavigationBar/>
        </div>
    );
};

export default FAQs;
