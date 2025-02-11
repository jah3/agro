// ProductDetail.jsx
import React, {useEffect, useState} from 'react';
import {Heart} from "lucide-react";

const ProductDetail = ({product, handleBack, addToCart}) => {
    const [selectedTab, setSelectedTab] = useState("description");
    const [quantity, setQuantity] = useState(1);
    const [selectedAge, setSelectedAge] = useState(() =>
        parseInt(Object.keys(product.priceByAge)[0])
    );
    const [selectedService, setSelectedService] = useState('no-planting');

    const characteristicLabels = {
        'bloomPeriod': 'Период цветения',
        'color': 'Цвет',
        'Cозревание': 'Созревание',
        'deliveryStandard': 'Стандарт поставки',
        'description': 'Описание',
        'diseaseResistance': 'Устойчивость к болезням',
        'flowerColor': 'Цветок',
        'flowerDiameter': 'Диаметр цветка',
        'frostResistance': 'Морозостойкость',
        'fruitShape': 'Форма плода',
        'fruitSize': 'Размер плода',
        'height': 'Высота',
        'leafShape': 'Форма листа',
        'lifespan': 'Продолжительность жизни',
        'location': 'Местоположение',
        'maturityPeriod': 'Период зрелости',
        'plantFeatures': 'Особенности растения',
        'plantHeight': 'Высота растения',
        'ripeningPeriod': 'Период созревания',
        'seedlingType': 'Тип саженца',
        'shootHeight': 'Высота побега',
        'taste': 'Вкус',
        'variety': 'Сорт',
        'winterHardiness': 'Зимостойкость',
        'yieldKg': 'Урожайность (кг)',
        'Активный период': 'Активный период',
        'Антракноз и септориоз': 'Антракноз и септориоз',
        'Аромат': 'Аромат',
        'Аромат / запах': 'Аромат / запах',
        'Аромат цветов': 'Аромат цветов',
        'Аромат:': 'Аромат:',
        'Благоухание': 'Благоухание',
        'Болезнеустойчивость': 'Болезнеустойчивость',
        'Бутоны': 'Бутоны',
        'В какой стране выведен сорт': 'В какой стране выведен сорт',
        'Вес': 'Вес',
        'Вес одной упаковки': 'Вес одной упаковки',
        'Вес плода': 'Вес плода',
        'Вес плода, в граммах': 'Вес плода, в граммах',
        'Вес плода, гр': 'Вес плода, гр',
        'Вес плода, грамм': 'Вес плода, грамм',
        'Вес плодов': 'Вес плодов',
        'Вес плодов, г': 'Вес плодов, г',
        'Вес плодов:': 'Вес плодов:',
        'Вес ягоды, г': 'Вес ягоды, г',
        'Вид': 'Вид',
        'Вид растения': 'Вид растения',
        'Вид цветка': 'Вид цветка',
        'вкус': 'вкус',
        'Вкус (сладкий, кислый и тд):': 'Вкус (сладкий, кислый и тд):',
        'Вкус плода': 'Вкус плода',
        'Вкус плодов': 'Вкус плодов',
        'Вкус, вкусовые качества': 'Вкус, вкусовые качества',
        'Вкус.': 'Вкус.',
        'Вкусовые качества': 'Вкусовые качества',
        'Влага': 'Влага',
        'Возраст': 'Возраст',
        'Возраст саженца': 'Возраст саженца',
        'Возраст:': 'Возраст:',
        'Вредители и болезни': 'Вредители и болезни',
        'Время посадки': 'Время посадки',
        'Время сбора урожая': 'Время сбора урожая',
        'Время созревания': 'Время созревания',
        'Время цветения': 'Время цветения',
        'Время цветения:': 'Время цветения:',
        'Вступление сорта в плодоношение': 'Вступление сорта в плодоношение',
        'Высокая зимостойкость': 'Высокая зимостойкость',
        'высота': 'высота',
        'Высота': 'Высота',
        'ВЫСОТА': 'ВЫСОТА',
        'ВЫСОТА (М)': 'ВЫСОТА (М)',
        'Высота (см)': 'Высота (см)',
        'Высота (см):': 'Высота (см):',
        'Высота в 10-15 лет': 'Высота в 10-15 лет',
        'Высота в см.': 'Высота в см.',
        'Высота взрослого растения:': 'Высота взрослого растения:',
        'Высота во взрослом возрасте': 'Высота во взрослом возрасте',
        'Высота дерева': 'Высота дерева',
        'Высота куста': 'Высота куста',
        'Высота куста, см': 'Высота куста, см',
        'Высота лозы': 'Высота лозы',
        'Высота подрезки': 'Высота подрезки',
        'Высота растения': 'Высота растения',
        'высота растения': 'высота растения',
        'Высота растения, метр': 'Высота растения, метр',
        'Высота растения:': 'Высота растения:',
        'Высота саженца': 'Высота саженца',
        'Высота саженца, м': 'Высота саженца, м',
        'Высота, см': 'Высота, см',
        'Высота:': 'Высота:',
        'Глубина посадки': 'Глубина посадки',
        'Глубина посадки:': 'Глубина посадки:',
        'Год селекции': 'Год селекции',
        'Группa': 'Группa',
        'Группа': 'Группа',
        'Группа клематисов': 'Группа клематисов',
        'Группа обрезки': 'Группа обрезки',
        'Группа:': 'Группа:',
        'Декоративность': 'Декоративность',
        'Декоративные качества': 'Декоративные качества',
        'Диаметр': 'Диаметр',
        'Диаметр кроны и высота в условиях средней полосы': 'Диаметр кроны и высота в условиях средней полосы',
        'Диаметр лозы': 'Диаметр лозы',
        'Диаметр цветка (см)': 'Диаметр цветка (см)',
        'Диаметр цветка (см):': 'Диаметр цветка (см):',
        'Диаметр цветка:': 'Диаметр цветка:',
        'Диаметр цветков': 'Диаметр цветков',
        'Длина листев': 'Длина листев',
        'Длина листовой пластины': 'Длина листовой пластины',
        'Длительность жизни': 'Длительность жизни',
        'Дополнительно': 'Дополнительно',
        'Доступное количество:': 'Доступное количество:',
        'Другие особенности растения': 'Другие особенности растения'
    };

    const calculatePrice = () => {
        const basePrice = product.priceByAge[selectedAge];
        return selectedService === 'with-planting' ? Math.round(basePrice * 1.3) : basePrice;
    };

    const getYearLabel = (age) => {
        if (age % 10 === 1 && age % 100 !== 11) {
            return "год";
        } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
            return "года";
        } else {
            return "лет";
        }
    };


    return (
        <div>

            <button className="btn btn-secondary mb-3" onClick={handleBack}>← Назад</button>
            <h3>{product.name}</h3>

            <div className="row">
                <div className="col-md-6">
                    <div className="card p-3">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top"
                            style={{
                                borderRadius: "10px",
                                maxHeight: "500px",
                                objectFit: "cover",
                                width: "100%"
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card-body">


                        <div className="mb-3">
                            <label className="form-label">Возраст:</label>
                            <div className="d-flex gap-2 flex-wrap">
                                {Object.entries(product.priceByAge).map(([age, price]) => {
                                    const numericAge = parseInt(age);
                                    return (
                                        <button
                                            key={age}
                                            className={`btn ${selectedAge === numericAge ? 'btn-success' : 'btn-outline-secondary'}`}
                                            onClick={() => setSelectedAge(numericAge)}
                                        >
                                            {numericAge} {getYearLabel(numericAge)} ({price} руб)
                                        </button>
                                    );
                                })}
                            </div>
                        </div>


                        <div className="mb-4">
                            <label className="form-label">Услуги:</label>
                            <div className="d-flex gap-2">
                                <button
                                    className={`btn ${selectedService === 'no-planting' ? 'btn-success' : 'btn-outline-secondary'}`}
                                    onClick={() => setSelectedService('no-planting')}
                                >
                                    Посадка не нужна
                                </button>
                                <button
                                    className={`btn ${selectedService === 'with-planting' ? 'btn-success' : 'btn-outline-secondary'}`}
                                    onClick={() => setSelectedService('with-planting')}
                                >
                                    С посадкой +30% от стоимости
                                </button>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 mb-4">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <span className="fs-5">{quantity}</span>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <button
                                className="btn btn-success"
                                onClick={() => addToCart(product, selectedAge, selectedService, quantity)}
                            >
                                Добавить в корзину ({calculatePrice() * quantity} руб)
                            </button>
                            <button className="btn btn-outline-warning">
                                <Heart size={20} className="me-2"/>
                                В избранное
                            </button>
                        </div>

                        <div className="alert alert-warning p-3 rounded">
                            <p><strong>Категории:</strong> {product.categories?.join(", ")}</p>
                            <p><strong>Минимальная сумма заказа:</strong> {product.min_order}</p>
                            <p className="mb-0"><strong>Никаких предоплат!</strong> Оформляйте заказ онлайн и
                                оплачивайте при получении.</p>
                        </div>

                        <div className="mb-4">
                            <div className="btn-group w-100">
                                <button
                                    className={`btn ${selectedTab === "description" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setSelectedTab("description")}
                                >
                                    Описание
                                </button>
                                <button
                                    className={`btn ${selectedTab === "characteristics" ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setSelectedTab("characteristics")}
                                >
                                    Характеристики
                                </button>
                            </div>
                        </div>

                        {selectedTab === "description" ? (
                            <div className="fs-5">
                                {product.description}
                            </div>
                        ) : (
                            <table className="table table-striped">
                                <tbody>
                                {Object.entries(product.characteristics).map(([key, value]) => {
                                    if (!characteristicLabels[key]) return null;
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{characteristicLabels[key]}</th>
                                            <td>{value}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;