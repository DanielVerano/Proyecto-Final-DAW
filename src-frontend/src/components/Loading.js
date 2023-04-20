import React from 'react'

const Loading = () => {
  return (
    <section className='text-center p-3'>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </section>
  )
}

export default Loading