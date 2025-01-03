import React, { useEffect } from 'react'
import ProductCard from './components/ProductCard'
import { Row, Col, Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../../features/product/productSlice'
import { ColorRing } from 'react-loader-spinner'

const LandingPage = () => {
  const dispatch = useDispatch()

  const { productList, loading } = useSelector(state => state.product)
  const [query] = useSearchParams()
  const name = query.get('name')

  useEffect(() => {
    dispatch(getProductList({ name }))
  }, [query])

  if (loading) {
    return (
      <Container>
        <Row>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Row>
      </Container>
    )
  }

  if (productList.length > 0) {
    return (
      <Container>
        <Row>
          {productList.map(item => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    )
  }

  if (name === null) {
    return null
  }

  return (
    <Container>
      <Row>
        {
          <div className='text-align-center empty-bag'>
            {name === '' ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{name}과 일치한 상품이 없습니다!</h2>
            )}
          </div>
        }
      </Row>
    </Container>
  )
}

export default LandingPage
