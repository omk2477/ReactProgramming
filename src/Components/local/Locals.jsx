import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Table, Row, Col, InputGroup, Form, Button} from 'react-bootstrap';
import { app } from '../../firebaseInit'
import { getDatabase, ref, set, get } from 'firebase/database'
import { useNavigate } from 'react-router-dom';

const Local = () => {
  const db = getDatabase(app);
  const navi = useNavigate();
  const uid=sessionStorage.getItem('uid');
  const [loading, setLoading] = useState(false);
  const [locals, setLocals] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('인하대학교');

  const callAPI = async() => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');
    setLoading(true);
    const url=`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=10&page=${page}`;
    const config={
      headers:{"Authorization": "KakaoAK c1f829c384e668bcf4c03aad698cda22"}
    };
    const res=await axios.get(url, config);
    console.log(res.data);
    setLocals(res.data.documents);
    setLoading(false)
  }

  const onClickFavorite = async (local) => {
    if (!uid) {
      sessionStorage.setItem('target', '/locals');
      navi('/login');
      return;
    }
    if(window.confirm("즐겨찾기에 추가하실래요?")){
      console.log(local);
      setLoading(true);
      await get(ref(db, `favorite/${uid}/${local.id}`)).then(async snapshot=>{
        if(snapshot.exists()){
          alert("이미 즐겨찾기에 등록되었습니다.");
        }else{
          set(ref(db, `favorite/${uid}/${local.id}`), local);
          alert("즐겨찾기에 등록되었습니다.");
        }
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    callAPI();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if(query===""){
      alert("검색어를 입력하세요!");
    }else{
      callAPI();
    }
  }

  if (loading) return <h1 className='my-5'>로딩중입니다......</h1>
  return (
    <div>
      <h1 className='my-5'>지역검색</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={4}>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='검색어' value={query}></Form.Control>
              <Button type='submit'>검색</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr className='text-center'>
            <td>ID</td>
            <td>장소명</td>
            <td>주소</td>
            <td>전화</td>
            <td>즐겨찾기</td>
          </tr>
        </thead>
        <tbody>
          {locals.map(local=>
            <tr key={local.id}>
              <td>{local.id}</td>
              <td>{local.place_name}</td>
              <td>{local.address_name}</td>
              <td>{local.phone}</td>
              <td><Button onClick={()=>onClickFavorite(local)}>즐겨찾기</Button></td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default Local