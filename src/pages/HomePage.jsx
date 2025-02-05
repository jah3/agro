import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import NavigationBar from "../components/NavigationBar";
import productsData from "../data/products.json";
import Footer from "../components/Footer";
import BottomNavigationBar from "../components/BottomNavigationBar";
import CategoryGrid from "../components/product/CategoryGrid";
import SubcategoryGrid from "../components/product/SubcategoryGrid";
import ProductGrid from "../components/product/ProductGrid";
import ProductDetail from "../components/product/ProductDetail";
import Dostavka from "./Dostavka.jsx";

const HomePage = () => {
    const { category: urlCategory, subcategory: urlSubcategory, id: productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    // Effect to detect back button press
    useEffect(() => {
        const handlePopState = () => {
            if (selectedProduct) {
                navigate(`/store/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(selectedSubcategory)}`);
                setSelectedProduct(null);
            } else if (selectedSubcategory) {
                navigate(`/store/${encodeURIComponent(selectedCategory)}`);
                setSelectedSubcategory(null);
            } else if (selectedCategory) {
                navigate("/store");
                setSelectedCategory(null);
            }
        };

        window.onpopstate = handlePopState;

        // Clean up the event listener
        return () => {
            window.onpopstate = null;
        };
    }, [selectedCategory, selectedSubcategory, selectedProduct, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadInitialState = async () => {
            try {
                const savedCartItems = Cookies.get('cartItems');
                if (savedCartItems) setCartItems(JSON.parse(savedCartItems));

                if (productId) {
                    let foundProduct = null;
                    let foundCategory = null;
                    let foundSubcategory = null;

                    for (const [category, categoryData] of Object.entries(productsData)) {
                        if (categoryData.subcategories) {
                            for (const [subcategory, subcategoryData] of Object.entries(categoryData.subcategories)) {
                                if (subcategoryData.products) {
                                    for (const product of subcategoryData.products) {
                                        if (product.id === productId) {
                                            foundProduct = product;
                                            foundCategory = category;
                                            foundSubcategory = subcategory;
                                            break;
                                        }
                                    }
                                }
                                if (foundProduct) break;
                            }
                        }
                        if (foundProduct) break;
                    }

                    if (foundProduct) {
                        setSelectedCategory(foundCategory);
                        setSelectedSubcategory(foundSubcategory);
                        setSelectedProduct(foundProduct);
                    } else {
                        navigate("/", { replace: true });
                    }
                }
            } catch (error) {
                console.error("Error loading data:", error);
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialState();
    }, [productId, navigate]);

    useEffect(() => {
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
    }, [cartItems]);

    const calculatePrice = (product, age, serviceType) => {
        const basePrice = product.priceByAge[age];
        return serviceType === 'with-planting' ? Math.round(basePrice * 1.3) : basePrice;
    };

    const addToCart = (product, age, serviceType, quantity) => {
        const price = calculatePrice(product, age, serviceType);
        const existingItem = cartItems.find(item =>
            item.id === product.id &&
            item.age === age &&
            item.serviceType === serviceType
        );

        const newItem = {
            ...product,
            quantity,
            age,
            price,
            serviceType,
            image: product.image,
            min_price: product.min_price
        };

        setCartItems(prevItems => {
            const updatedItems = existingItem
                ? prevItems.map(item =>
                    item.id === newItem.id &&
                    item.age === newItem.age &&
                    item.serviceType === newItem.serviceType
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
                : [...prevItems, newItem];

            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
            return updatedItems;
        });
    };

    const removeFromCart = (item) => {
        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        navigate(`/store/${encodeURIComponent(category)}`);
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        navigate(`/store/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(subcategory)}`);
    };

    const handleBack = () => {
        if (selectedProduct) {
            navigate(`/store/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(selectedSubcategory)}`);
            setSelectedProduct(null);
        } else if (selectedSubcategory) {
            navigate(`/store/${encodeURIComponent(selectedCategory)}`);
            setSelectedSubcategory(null);
        } else if (selectedCategory) {
            navigate("/store");
            setSelectedCategory(null);
        }
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            const results = [];
            Object.values(productsData).forEach(category => {
                if (category.subcategories) {
                    Object.values(category.subcategories).forEach(subcategory => {
                        if (subcategory.products) {
                            subcategory.products.forEach(product => {
                                if (product.name.toLowerCase().includes(query.toLowerCase())) {
                                    results.push(product);
                                }
                            });
                        }
                    });
                }
            });
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (product) => {
        setSelectedProduct(product);
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {showNotification && (
                <div
                    className="alert alert-success position-fixed start-50 translate-middle-x mb-3"
                    style={{ zIndex: 9999, minWidth: "300px" }}
                >
                    Товар успешно добавлен в корзину!
                </div>
            )}

            <NavigationBar
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                productsData={productsData}
            />

            <main className="flex-grow-1">
                <div className="container mt-4 mb-5">
                    {location.pathname.includes('/dostavka') ? (
                        <Dostavka />
                    ) : isLoading ? (
                        <div className="text-center my-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : !selectedCategory ? (
                        <CategoryGrid
                            productsData={productsData}
                            handleCategorySelect={handleCategorySelect}
                        />
                    ) : !selectedSubcategory ? (
                        <SubcategoryGrid
                            selectedCategory={selectedCategory}
                            productsData={productsData}
                            handleSubcategorySelect={handleSubcategorySelect}
                            handleBack={handleBack}
                        />
                    ) : !selectedProduct ? (
                        <ProductGrid
                            selectedCategory={selectedCategory}
                            selectedSubcategory={selectedSubcategory}
                            productsData={productsData}
                            setSelectedProduct={setSelectedProduct}
                        />
                    ) : (
                        <ProductDetail
                            product={selectedProduct}
                            handleBack={handleBack}
                            addToCart={addToCart}
                        />
                    )}
                </div>
            </main>

            <BottomNavigationBar
                cartItemsCount={cartItems.length}
                favoritesCount={0}
                searchResults={searchResults}
                onSearchQueryChange={handleSearchQueryChange}
                onResultClick={handleSearchResultClick}
            />

            <Footer />
        </div>
    );
};

export default HomePage;
