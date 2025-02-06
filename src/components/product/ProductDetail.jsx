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
        height: "Высота взрослого растения",
        flowerDiameter: "Диаметр цветка",
        bloomPeriod: "Период цветения",
        winterHardiness: "Зимостойкость",
        deliveryStandard: "Стандарт поставки",
        flowerColor: "Цвет цветка",
        plantFeatures: "Особенности растения",
        location: "Местоположение"
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    });

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