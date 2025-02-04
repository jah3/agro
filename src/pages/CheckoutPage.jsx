import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit2 } from "lucide-react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import BottomNavigationBar from "../components/BottomNavigationBar";
import emailjs from "emailjs-com";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obținem datele din location.state; dacă nu există, redirecționăm către pagina principală
    const { cartItems: passedCartItems, totalAmount: passedTotalAmount } =
    location.state || { cartItems: [], totalAmount: 0 };

    // Stare locală pentru coș, pentru a permite editarea cantității
    const [localCartItems, setLocalCartItems] = useState(passedCartItems || []);

    // Calculăm suma totală pe baza localCartItems
    const computedTotalAmount = localCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const deliveryCost = 500;
    const total = computedTotalAmount + deliveryCost;

    // Starea formularului cu datele personale și selectarea metodei de plată
    const [formData, setFormData] = useState({
        name: "",
        region: "Москва",
        address: "",
        phone: "",
        email: "",
        notes: "",
        paymentMethod: ""
    });
    const [errors, setErrors] = useState({});

    // Starea pentru editarea parametrilor unui produs (de exemplu, cantitatea)
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedQuantity, setEditedQuantity] = useState(1);

    // Determinăm dacă este versiunea mobilă pentru a schimba ordinea blocurilor
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        if (!localCartItems?.length) {
            navigate("/");
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [localCartItems, navigate]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Имя обязательно";
        if (!formData.region.trim()) newErrors.region = "Область/район обязателен";
        if (!formData.address.trim()) newErrors.address = "Адрес обязателен";
        if (!formData.phone.trim()) newErrors.phone = "Телефон обязателен";
        if (!/^\d+$/.test(formData.phone.trim()))
            newErrors.phone = "Неверный формат телефона";
        if (!formData.paymentMethod)
            newErrors.paymentMethod = "Выберите способ оплаты";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const emailData = {
            name: formData.name,
            region: formData.region,
            address: formData.address,
            phone: formData.phone,
            email: formData.email || "Не указан",
            notes: formData.notes || "Нет примечаний",
            paymentMethod: formData.paymentMethod,
            cartItems: localCartItems.map((item) =>
                `${item.name} (x${item.quantity}) - ${item.price * item.quantity} руб`
            ).join("\n"),
            subtotal: computedTotalAmount.toString(),
            delivery: deliveryCost.toString(),
            total: total.toString()
        };

        try {
            await emailjs.send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                emailData,
                import.meta.env.VITE_APP_EMAILJS_EMAIL_DATA_KEY
            );
            alert("Заказ успешно оформлен! Мы свяжемся с вами.");
            navigate("/");
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.");
        }
    };
    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    // Funcția pentru a începe editarea cantității unui produs
    const startEditing = (item) => {
        setEditingProductId(item.id);
        setEditedQuantity(item.quantity);
    };

    // Salvăm modificarea cantității pentru produsul selectat
    const saveChanges = () => {
        setLocalCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === editingProductId
                    ? { ...item, quantity: Number(editedQuantity) }
                    : item
            )
        );
        setEditingProductId(null);
    };

    const cancelEditing = () => {
        setEditingProductId(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navigația de sus */}
            <NavigationBar />

            <main className="flex-grow-1">
                <div className="container py-5">
                    <h1 className="mb-4">Оформление заказа</h1>
                    {/* Form pentru trimiterea datelor */}
                    <form onSubmit={handleSubmit}>
                        <div className="row g-5">
                            {/*
                              Pentru desktop:
                              - coloana din stânga: formularul cu date personale
                              - coloana din dreapta: cardul cu informații despre produse
                              Pentru mobile: se schimbă ordinea (cardul apare primul)
                            */}
                            {/* Cardul cu informații despre produse și sume – fundalul modificat la light gray */}
                            <div className="col-md-6 order-1 order-md-2">
                                <div className="card p-4 shadow-sm" style={{ backgroundColor: "#f7f7f7" }}>
                                    {/* Titlul cu coloane */}
                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                                        <h5 className="mb-0">Товар</h5>
                                        <h5 className="mb-0">Подытог</h5>
                                    </div>

                                    {/* Lista de produse */}
                                    {localCartItems.map((item, index) => (
                                        <div key={index} className="py-2 border-bottom">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="mb-0">{item.name}</p>
                                                    <small className="text-muted">
                                                        {item.quantity} × {item.price} руб
                                                    </small>
                                                </div>
                                                <div>{item.quantity * item.price} руб</div>
                                            </div>
                                            {/* Secțiune pentru modificarea parametrilor produsului */}
                                            <div className="mt-2">
                                                {editingProductId === item.id ? (
                                                    <div className="d-flex align-items-center">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            className="form-control form-control-sm me-2"
                                                            style={{ width: "80px" }}
                                                            value={editedQuantity}
                                                            onChange={(e) =>
                                                                setEditedQuantity(e.target.value)
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary me-2"
                                                            onClick={saveChanges}
                                                        >
                                                            Сохранить
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={cancelEditing}
                                                        >
                                                            Отмена
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0 text-decoration-none"
                                                        onClick={() => startEditing(item)}
                                                    >
                                                        <Edit2 size={16} className="me-1" /> Изменить параметры
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Afișarea sumelor */}
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-between">
                                            <span>Подытог:</span>
                                            <span>{computedTotalAmount} руб</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Доставка:</span>
                                            <span>{deliveryCost} руб</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between fs-5 fw-bold">
                                            <span>Итого:</span>
                                            <span className="px-3 py-1" style={{  color: "#198754" }}>
                                                {total} руб
                                            </span>
                                        </div>
                                    </div>

                                    {/* Secțiunea de selectare a metodei de plată */}
                                    <div className="mt-4">
                                        <label className="form-label fw-bold">Способ оплаты *</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="Переводом на банковскую карту при получении"
                                                    id="paymentCard"
                                                    checked={formData.paymentMethod === "Переводом на банковскую карту при получении"}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="paymentCard">
                                                    Переводом на банковскую карту при получении
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="Банковской картой при получении"
                                                    id="paymentBank"
                                                    checked={formData.paymentMethod === "Банковской картой при получении"}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="paymentBank">
                                                    Банковской картой при получении
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="Наличными курьеру при получении"
                                                    id="paymentCash"
                                                    checked={formData.paymentMethod === "Наличными курьеру при получении"}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="paymentCash">
                                                    Наличными курьеру при получении
                                                </label>
                                            </div>
                                        </div>
                                        {errors.paymentMethod && (
                                            <div className="text-danger mt-1">{errors.paymentMethod}</div>
                                        )}
                                    </div>

                                    {/* Informații despre confidențialitate */}
                                    <div className="mt-3">
                                        <small className="text-muted">
                                            Ваши личные данные будут использоваться для обработки
                                            вашего заказа, и для других целей, описанных в нашей privacy policy.
                                        </small>
                                    </div>

                                    {/* Butonul de confirmare a comenzii */}
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-success w-100 py-3">
                                            Подтвердить заказ
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Formularul cu date personale */}
                            <div className="col-md-6 order-2 order-md-1">
                                <div className="card p-4 shadow-sm">
                                    <h5 className="mb-3">Ваши данные</h5>
                                    <div className="mb-3">
                                        <label className="form-label">Имя *</label>
                                        <input
                                            name="name"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Регион *</label>
                                        <select
                                            name="region"
                                            className={`form-select ${errors.region ? "is-invalid" : ""}`}
                                            value={formData.region}
                                            onChange={handleChange}
                                        >
                                            <option>Москва</option>
                                            <option>Московская область</option>
                                        </select>
                                        {errors.region && (
                                            <div className="invalid-feedback">{errors.region}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Адрес *</label>
                                        <input
                                            name="address"
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Улица и номер дома"
                                        />
                                        {errors.address && (
                                            <div className="invalid-feedback">{errors.address}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Телефон *</label>
                                        <input
                                            name="phone"
                                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Например: 79991234567"
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">{errors.phone}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email (необязательно)</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Примечания к заказу (необязательно)
                                        </label>
                                        <textarea
                                            name="notes"
                                            className="form-control"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Navigația de jos și footer */}
            <BottomNavigationBar />
            <Footer />
        </div>
    );
};

export default CheckoutPage;
