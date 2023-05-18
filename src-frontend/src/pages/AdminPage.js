import React from 'react'
// import styled from 'styled-components'
import { Admin, Resource, Layout } from 'react-admin'
import { DataProvider } from '../admin/DataProvider'
import { UserList, UserEdit, UserCreate } from '../admin/users'
import { ProductList, ProductEdit, ProductCreate } from '../admin/products'
import { ReviewList, ReviewEdit, ReviewCreate } from '../admin/reviews'
import { OrderList, OrderEdit, OrderCreate } from '../admin/orders'

const CustomLayout = (props) => {
  return <Layout {...props} appBar={() => <></>} />
}

const AdminPage = () => {
  return (
    <Admin layout={CustomLayout} basename='/admin' dataProvider={DataProvider}>
      <Resource name='users' list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name='products' list={ProductList} edit={ProductEdit} create={ProductCreate} />
      <Resource name='reviews' list={ReviewList} edit={ReviewEdit} create={ReviewCreate} />
      <Resource name='orders' list={OrderList} edit={OrderEdit} create={OrderCreate} />
    </Admin>
  )
}

export default AdminPage