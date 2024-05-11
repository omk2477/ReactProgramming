import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {Row, Col, Card, InputGroup, Button, Form} from 'react-bootstrap'
import { FaCartPlus } from "react-icons/fa";

const Books = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('자바');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const callAPI = async() => {
    setLoading(true);
    const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
    const config={
      headers:{"Authorization": "KakaoAK c1f829c384e668bcf4c03aad698cda22"}
    };
    const res=await axios.get(url, config);
    console.log(res.data);
    setBooks(res.data.documents);
    setLoading(false)
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }

  if (loading) return <h1 className='my-5'>로딩중입니다.....</h1>
  return (
    <div>
      <h1 className='my-5'>도서검색</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={4}>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='검색어' value={query}></Form.Control>
              <Button type='submit'>검색</Button>
            </InputGroup>
          </Form>
          <Card>
          </Card>
        </Col>
      </Row>
      <Row>
        {books.map(book=>
          <Col xs={6} md={3} lg={2} className='mb-2'>
            <Card>
              <Card.Body>
                <img src={book.thumbnail || 'http://via.placeholder.com/120x170'}/>
              </Card.Body>
              <Card.Footer>
                <div className='ellipsis'>{book.title}</div>
                <FaCartPlus style={{cursor:'pointer', fontSize:'20px', color:'green'}}/>
              </Card.Footer>
            </Card>
          </Col>)}
      </Row>
      <div>
        <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
        <span className='mx-2'>{page}</span>
        <Button onClick={()=>setPage(page+1)}>다음</Button>
      </div>
    </div>
  )
}

export default Books