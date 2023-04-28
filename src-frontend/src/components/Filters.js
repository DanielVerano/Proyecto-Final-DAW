import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from "../context/filter_context";
import { formatPrice } from "../utils/helpers";

const Filters = () => {
  const {
    filters: { text, category, min_price, max_price, price },
    updateFilters,
    clearFilters } = useFilterContext();

  return (
    <Wrapper className='sticky-sm-top'>
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="text" className='form-label fw-bold'>Texto:</label>
          <input type="text" name="text" value={text} onChange={updateFilters} className='form-control' placeholder='Búsqueda' />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-bold">Categoría:</label>
          <select name="category" className="form-select" value={category} onChange={updateFilters}>
            <option value="all">Todas</option>
            <option value="smartphones">Smartphones</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-bold">Precio:</label>
          <p>{formatPrice(price)}</p>
          <input type="range" name="price" className='form-range' value={price} min={min_price} max={max_price} onChange={updateFilters} />
        </div>
        <div className="mb-3">
          <button className="btn btn-danger" onClick={clearFilters}>Borrar filtros</button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
  top: 1rem;
`

export default Filters