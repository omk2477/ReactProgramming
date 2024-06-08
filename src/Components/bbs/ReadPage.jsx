import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Row, Col, Button, Card } from 'react-bootstrap'
import Comments from './Comments'

const ReadPage = () => {
  const [loading, setLoading] = useState(false);
  const loginEmail = sessionStorage.getItem('email');
  const { id } = useParams();
  const db = getFirestore(app);
  const [post, setPost] = useState(''); // post를 null로 초기화

  const callAPI = async () => {
    setLoading(true);
    const res = await getDoc(doc(db, `posts/${id}`));
    console.log(res.data());
    setPost(res.data());
    setLoading(false);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const onClickDelete = async() => {
    if(!window.confirm(`${id}번 게시글을 삭제하실래요?`)) return;
    await deleteDoc(doc(db, `/posts/${id}`))
    window.location.href='/bbs';
  }

  if(loading) return <div>로딩중</div>

  const { email, date, title, contents } = post;

  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <h1>게시글정보</h1>
        {loginEmail === email &&
          <div className='text-end mb-2'>
            <Button onClick={()=>window.location.href=`/bbs/update/${id}`} variant='success' size='sm' className='me-2'>수정</Button>
            <Button onClick={onClickDelete} variant='danger' size='sm'>삭제</Button>
          </div>
        }
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <div className='text-muted'>
              <span className='me-3'>{date}</span>
              <span>{email}</span>
            </div>
            <hr />
            <div style={{ whiteSpace: 'pre-wrap' }}>{contents}</div>
          </Card.Body>
        </Card>
      </Col>
      <Comments/>
    </Row>
  )
}

export default ReadPage
