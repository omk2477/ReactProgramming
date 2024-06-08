import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Books from "./book/Books";
import Local from "./local/Locals";
import Favorite from "./local/Favorite";
import Cart from "./book/Cart";
import Login from "./user/Login";
import Join from "./user/Join";
import { onLog } from "firebase/app";
import Mypage from "./user/Mypage";
import ListPage from "./bbs/ListPage";
import InsertPage from "./bbs/InsertPage";
import ReadPage from "./bbs/ReadPage";
import UpdatePage from "./bbs/UpdatePage";

const Menu = () => {
  const navi = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃 하실거에요?")) {
      sessionStorage.removeItem("email");
      navi("/");
    }
  };
  return (
    <>
      <Navbar expand="lg" bg="black" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/books">도서검색</Nav.Link>
              <Nav.Link href="/locals">지역검색</Nav.Link>
              {sessionStorage.getItem('uid') &&
                <>
                  <Nav.Link href="/cart">장바구니</Nav.Link>
                  <Nav.Link href="/favorite">즐겨찾기</Nav.Link>
                </>
              }
              <Nav.Link href="/bbs">게시판</Nav.Link>
            </Nav>
            {sessionStorage.getItem("email") ? (
              <Nav>
                <Nav.Link href="/mypage">{sessionStorage.getItem("email")}</Nav.Link>

                <Nav.Link href="#" onClick={onLogout}>
                  로그아웃
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">로그인</Nav.Link>
              </Nav>
            )}
            {/* <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/locals" element={<Local />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/bbs" element={<ListPage />} />
        <Route path="/bbs/insert" element={<InsertPage />} />
        <Route path="/bbs/read/:id" element={<ReadPage />} />
        <Route path="/bbs/update/:id" element={<UpdatePage />} />
      </Routes>
    </>
  );
};

export default Menu;
