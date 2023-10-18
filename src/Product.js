
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';



export default function Product() {
    
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [reloadData, setReloadData] = useState(false); // New state variable

    useEffect(() => {
        let componentMounted = true;

        const getProduct = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());

                setLoading(false);
                console.log(filter);
            }
            componentMounted = false;
        }

        getProduct();
    }, [reloadData]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton/>
                </div>
                <div className="col-md-3">
                    <Skeleton/>
                </div>
                <div className="col-md-3">
                    <Skeleton/>
                </div>
                <div className="col-md-3">
                    <Skeleton/>
                </div>
            </>
        )
    };

    const filterProducts = (cat) => {
        const response = data.filter((x)=>x.category === cat)
        setFilter(response);
    }

    const handleReloadData = () => {
        setReloadData(!reloadData); // Toggle the reload state
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <div className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</div>
                    <div className="btn btn-outline-dark me-2" onClick={()=>filterProducts(`men's clothing`)}>Men Clothes</div>
                    <div className="btn btn-outline-dark me-2" onClick={()=>filterProducts(`women's clothing`)}>Women Clothes</div>
                    <div className="btn btn-outline-dark me-2" onClick={()=>filterProducts(`jewelery`)}>Jewelry</div>
                    <div className="btn btn-outline-dark me-2" onClick={()=>filterProducts(`electronics`)}>Electronics</div>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.image} className="card-img-top" alt={product.title} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="cards-title mb-0">{product.title.substring(0, 12)}</h5>
                                            <p className="cards-text lead fw-bold">$ {product.price}</p>
                                            <div to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</div>
                                        </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>

        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>TES CODING FRONTEND</h1>
                        <hr />
                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className='buttons d-flex justify-content-center'>
                        <button
                            className="btn btn-outline-primary mb-5"
                            onClick={handleReloadData}
                        >
                            Muat Ulang
                        </button>
                    </div>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

