// BottomNavigationBar.jsx
import { useState, useEffect } from "react";
import { Home, Search, Heart, Phone, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BottomNavigationBar = ({
                                 cartItemsCount,
                                 favoritesCount,
                                 searchResults = [],
                                 onSearchQueryChange,
                                 onResultClick
                             }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        onSearchQueryChange?.(searchQuery);
    }, [searchQuery]);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) setSearchQuery("");
    };

    return (
        <>
            {/* Search Overlay */}
            {isSearchOpen && (
                <div
                    className="fixed-top vh-100 vw-100"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 9998,
                        backdropFilter: "blur(3px)"
                    }}
                    onClick={handleSearchToggle}
                >
                    <div
                        className="container"
                        style={{
                            position: "relative",
                            top: "1%",
                            zIndex: 9999
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="input-group shadow-lg mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Поиск..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                style={{
                                    borderRadius: "15px 0 0 15px",
                                    border: "none",
                                    padding: "1rem"
                                }}
                            />
                            <button
                                className="btn btn-lg"
                                style={{
                                    backgroundColor: "#9F684B",
                                    color: "white",
                                    borderRadius: "0 15px 15px 0",
                                    border: "none"
                                }}
                            >
                                <Search size={24} />
                            </button>
                        </div>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div
                                className="bg-white rounded-3 shadow-lg"
                                style={{
                                    maxHeight: "60vh",
                                    overflowY: "auto",
                                    border: "1px solid rgba(0,0,0,0.1)"
                                }}
                            >
                                {searchResults.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="d-flex align-items-center p-3 border-bottom"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            onResultClick?.(product);
                                            handleSearchToggle();
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                marginRight: "15px",
                                                borderRadius: "8px"
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
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <div
                className="d-lg-none"
                style={{
                    position: "fixed",
                    bottom: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9999,
                    width: "90%",
                    maxWidth: "500px",
                    transition: "all 0.3s ease"
                }}
            >
                <nav
                    className="navbar navbar-dark d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "#5E8D66",
                        borderRadius: "20px",
                        padding: "12px 10px",
                        width: "100%",
                        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    <ul
                        className="d-flex justify-content-around align-items-center w-100 p-0 m-0"
                        style={{
                            listStyle: "none",
                            gap: "0"
                        }}
                    >
                        {[
                            {
                                icon: Home,
                                label: "Магазин",
                                action: () => navigate("/")
                            },
                            {
                                icon: Search,
                                label: "Поиск",
                                action: handleSearchToggle,
                            },
                            {
                                icon: Heart,
                                label: "Избранное",
                                action: () => navigate("/favorites"),
                                badge: favoritesCount
                            },
                            {
                                icon: Phone,
                                label: "Контакты",
                                action: () => navigate("/contacts")
                            }
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="text-center"
                                style={{
                                    flex: "1 1 25%",
                                    minWidth: "60px",
                                    position: "relative"
                                }}
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <button
                                        className="btn rounded-circle p-2"
                                        onClick={item.action}
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            backgroundColor: "#9F684B",
                                            color: "#FFF",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: "4px"
                                        }}
                                    >
                                        <item.icon size={20} />
                                        {item.badge !== undefined && item.badge > 0 && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-2px",
                                                    right: "2px",
                                                    backgroundColor: "#FF4757",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "18px",
                                                    height: "18px",
                                                    fontSize: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                {item.badge}
                                            </div>
                                        )}
                                    </button>
                                    <div
                                        className="text-white"
                                        style={{
                                            fontSize: "0.65rem",
                                            lineHeight: "1.2",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default BottomNavigationBar;