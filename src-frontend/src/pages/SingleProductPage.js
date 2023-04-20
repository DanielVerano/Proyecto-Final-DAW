import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProductPage = () => {
    const { productId } = useParams();
    console.log(productId);

    return (
        <div>SingleProductPage</div>
    )
}

export default SingleProductPage