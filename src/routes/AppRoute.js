import { 
    Outlet, 
    useLoaderData, 
    Link, 
    useNavigation,
    NavLink,
    Form,
    useSubmit
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import spinner from '../images/spinner-solid.svg'
import { updateSearchQuery } from "../redux-data/productsSlice";

export async function loader() {
    // Fetch all categories
    const repsonse = await fetch('https://dummyjson.com/products/categories');
    const json = await repsonse.json();
    console.log(json)
    return json;
}

export default function AppRoute() {
    const categories = useLoaderData();
    const navigation = useNavigation();
    const itemIds = useSelector(state => state.products.itemsIds);
    const itemCounts = useSelector(state => state.products.itemCounts);
    const searchQuery = useSelector(state => state.products.searchQuery);
    const dispatch = useDispatch();
    const submit = useSubmit();


    // clears the search form input
    useEffect(() => {
        document.getElementById('search').value = ""
    });

    // scrolls window to top when page loads
    useEffect(() => {
        if (navigation.location) {
            window.scroll({
                top: 0,
                left: 0
            })
        } 
    })

    let total = 0;
    for (let i = 0; i < itemIds?.length; i++) {
        let itemid = itemIds[i];
        total += itemCounts[itemid]
    }

    // Formats the json data
    const formatCategory = category => {
        const capital = category.substring(0,1).toUpperCase();
            const replacedDash = category.replace("-", " ");
            const formattedCategory = capital + replacedDash.substring(1, categories.length)
            
            return formattedCategory;
    }

    return (
        <div className="app">
            <header>
                <div id="desktop-logo">
                    <h1><Link to="/"><i className="fa-brands fa-react fa-lg"></i></Link></h1>
                </div>
                <div className="mobile-menu">
                        <div id="mobile-logo">
                            <h1><Link to="/"><i className="fa-brands fa-react fa-lg"></i></Link></h1>
                        </div>
                        <Link to="/login-signup" className="login-signup">Login / Sign Up</Link>
                        <Link to="/basket" className="basket">
                            <i className="fa-solid fa-basket-shopping fa-lg"></i>
                            <span className="basket-count">{total}</span>
                        </Link>
                    </div>
                <nav id="primary">
                    
                    <Form 
                        id="search-form"
                        action="search"
                    >
                        <div id="search-container">
                            <label htmlFor="search" hidden={true}>Search</label>
                                <input 
                                    type="search" 
                                    id="search" 
                                    name="q"
                                    value={searchQuery}
                                    placeholder="Search for product..."
                                    onChange={(e) => {
                                            const firstSearch = searchQuery === null;
                                            submit(e.target.form, {
                                                replace: !firstSearch
                                            }) 
                                            dispatch(updateSearchQuery(e.target.value))
                                        }
                                    }
                            />
                            <button type="submit"><i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
                        </div>
                    </Form>
                    <div className="desktop-menu">
                        <Link to="/login-signup" className="login-signup">Login / Sign Up</Link>
                        <Link to="/basket" className="basket">
                            <i className="fa-solid fa-basket-shopping fa-lg"></i>
                            <span className="basket-count">{total}</span>
                        </Link>
                    </div>
                </nav>
            </header>
            <nav id="secondary">
                <NavLink 
                    to="/"
                    className={({ isActive, isPending}) => 
                        isActive 
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }   
                >
                    Featured
                </NavLink>
                <ul className="category-list">
                    {categories.map(category => 
                        <li key={category}>
                            <NavLink to={`/products/category/${category}`} key={category}>{formatCategory(category)}</NavLink>
                        </li>
                    )}
                    <Link to="/error" className="invalid-link">Invalid link</Link>
                </ul>
            </nav>
            <main>
                {
                navigation.state === "loading"
                    ? <div className="loading-container">
                        <div className="spinner">
                            <img src={spinner} alt="Content is loading"/>
                        </div>
                      </div>
                    : <Outlet />
                }
            </main>
            <footer>
                <h2>Footer</h2>
            </footer>
        </div>
    )
}