import {useState, useEffect} from "react";
import {Menu, X, Heart, ShoppingCart, Trash2} from "lucide-react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const NavigationBar = ({
                           cartItems = [],
                           addToCart,
                           removeFromCart,
                           productsData = {},
                       }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    useEffect(() => {
        Cookies.set("cartItems", JSON.stringify(cartItems), {expires: 7});
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 668);
        };
        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [cartItems]);

    const searchProducts = (query) => {
        if (!query || !productsData) return [];

        const results = [];
        Object.values(productsData).forEach((category) => {
            Object.values(category.subcategories || {}).forEach((subcategory) => {
                (subcategory.products || []).forEach((product) => {
                    if (product.name?.toLowerCase().includes(query.toLowerCase())) {
                        results.push(product);
                    }
                });
            });
        });
        return results;
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            setSearchResults(searchProducts(searchQuery));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleProductRedirect = (product) => {
        setSearchQuery("");
        navigate(`/product/${product.id}`);
    };

    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
        const updatedCartItems = cartItems.filter(
            (cartItem) => cartItem.id !== item.id
        );
        Cookies.set("cartItems", JSON.stringify(updatedCartItems), {expires: 7});
    };

    return (
        <div>
            {/* Search Bar and Cart - Desktop */}
            <div
                className="d-none d-lg-flex justify-content-center py-2 bg-light"
                style={{backgroundColor: "#C2D6C5"}}
            >
                <div
                    className="input-group"
                    style={{maxWidth: "600px", width: "100%", position: "relative"}}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{backgroundColor: "#F3F6F2", color: "#3E4F44"}}
                    />

                    {searchResults.length > 0 && (
                        <div
                            className="search-results-dropdown"
                            style={{
                                position: "absolute",
                                top: "100%",
                                width: "100%",
                                zIndex: 1000,
                                backgroundColor: "white",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                maxHeight: "400px",
                                overflowY: "auto",
                            }}
                        >
                            {searchResults.map((product, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center p-3 border-bottom"
                                    style={{cursor: "pointer"}}
                                    onClick={() => handleProductRedirect(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            marginRight: "15px",
                                        }}
                                    />
                                    <div>
                                        <div className="font-weight-bold">{product.name}</div>
                                        <div>от {product.min_price} руб</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        className="btn btn-outline-success"
                        type="button"
                        style={{backgroundColor: "#9F684B", color: "#FFF"}}
                    >
                        Поиск
                    </button>

                    {/* În NavigationBar.jsx - secțiunea desktop */}
                    <div className="d-flex align-items-center ms-3">
                        <Heart
                            className="icon"
                            style={{color: "#9F684B", marginRight: "10px"}}
                        />
                        <div
                            className="position-relative"
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            style={{marginRight: "15px"}}
                        >
                            <ShoppingCart className="icon" style={{color: "#9F684B"}}/>
                            {cartItems.length > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-8px",
                                        right: "-8px",
                                        backgroundColor: "#FF6347",
                                        color: "#FFF",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "12px",
                                    }}
                                >
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bara de navigare */}
            <nav
                className="navbar navbar-expand-lg navbar-dark"
                style={{
                    backgroundColor: "#5E8D66",
                    width: "80%",
                    margin: "10px auto",
                    borderRadius: "15px",
                    padding: "10px",
                    position: "relative",
                }}
            >
                {/* Brand (Desktop) */}
                <a href="/store" className="d-none d-lg-block">
                    <img
                        src="/logo/logonav.png"
                        height="40"
                        alt="Садовый Рай"
                        className="d-inline-block align-top me-2"
                    />
                </a>


                {/* Butoane pentru mobil */}
                <div className="d-flex justify-content-between w-100 d-lg-none">
                    {/* Buton hamburger/X */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{borderColor: "#FFF"}}
                    >
                        {isSidebarOpen ? (
                            <X size={24} style={{color: "#FFF"}}/>
                        ) : (
                            <Menu size={24} style={{color: "#FFF"}}/>
                        )}
                    </button>

                    {/* Brand (Mobile - Centered) */}


                    <a href="/store" className="d-block d-lg-none mx-auto">
                        <img
                            src="/logo/logonav.png"
                            height="45"
                            alt="Садовый Рай"
                            className="d-inline-block align-top"
                        />
                    </a>

                    {/* Buton coș (Mobil) */}
                    <div
                        className="position-relative"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        style={{
                            marginRight: "15px",
                            display: "flex",
                            alignItems: "center", // This centers the icon vertically
                        }}
                    >
                        <ShoppingCart style={{color: "#FFF", cursor: "pointer"}}/>
                        {cartItems.length > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-8px", // Position the badge on top of the icon
                                    right: "-8px",
                                    backgroundColor: "#FF6347",
                                    color: "#FFF",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center", // Center the badge's text vertically
                                    justifyContent: "center", // Center the badge's text horizontally
                                    fontSize: "12px",
                                }}
                            >
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Elementele de navigare */}
                <div
                    className={`collapse navbar-collapse ${isSidebarOpen ? "show" : ""}`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/store" style={{color: "#FFF"}}>
                                КАТАЛОГ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => navigate("/dostavka")}
                                style={{color: "#FFF", cursor: "pointer"}}
                            >
                                ДОСТАВКА И ОПЛАТА
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => navigate("/about-us")}
                                style={{color: "#FFF", cursor: "pointer"}}
                            >
                                О НАС
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => navigate("/garantii")}
                                style={{color: "#FFF", cursor: "pointer"}}
                            >
                                ГАРАНТИИ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => navigate("/contacts")}
                                style={{color: "#FFF", cursor: "pointer"}}
                            >
                                КОНТАКТЫ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{color: "#FFF"}}>
                                СТАТЬИ
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" style={{color: "#FFF"}}>
                                ВОПРОС – ОТВЕТ
                            </a>
                        </li>
                    </ul>
                    <div className="ml-auto d-none d-lg-block text-center">
                        <div className="text-white" style={{fontSize: "14px"}}>
                            +7 (495) 532-07-00
                        </div>
                        <div className="text-white" style={{fontSize: "14px"}}>
                            +7 (926) 239-63-83
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal coș */}
            {isCartOpen && (
                <div
                    className="cart-modal"
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        width: isMobile ? "75%" : "30%",
                        height: "100%",
                        backgroundColor: "#fff",
                        boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        zIndex: 1000,
                        transition: "width 0.3s ease-in-out",
                        overflowY: "auto",
                    }}
                >
                    <button
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: "absolute",
                            top: "0px",
                            right: "10px",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            color: "#666",
                        }}
                    >
                        <X size={24}/>
                    </button>
                    <h4>Корзина</h4>
                    <ul style={{listStyleType: "none", padding: 0}}>
                        {cartItems.map((item, index) => (
                            <li
                                key={index}
                                className="d-flex justify-content-between align-items-center mb-3"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <div>
                                        <span>{item.name}</span>
                                        <div>
                                            <small>
                                                {item.price} руб x {item.quantity} (Возраст: {item.age}{" "}
                                                лет)
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleRemoveFromCart(item)}
                                >
                                    <Trash2 style={{fontSize: "1.2rem", color: "#FFF"}}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <hr/>
                    <p>
                        <strong>Подытог:</strong> {totalAmount} руб
                    </p>
                    <button
                        className="btn btn-success w-100"
                        onClick={() =>
                            navigate("/checkout", {
                                state: {
                                    cartItems,
                                    totalAmount: cartItems.reduce(
                                        (acc, item) => acc + item.price * item.quantity,
                                        0
                                    ),
                                },
                            })
                        }
                    >
                        Оформление заказа
                    </button>
                </div>
            )}
        </div>
    );
};

export default NavigationBar;