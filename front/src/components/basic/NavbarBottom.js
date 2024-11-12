import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import main from '../../images/NavbarBottom11.png';
import categorychoice from '../../images/NavbarBottom22.png';
import mypage from '../../images/NavbarBottom33.png';

import allboard from '../../images/NavbarBottom111.png';
import adminpage from '../../images/NavbarBottom222.png';

import './NavbarBottom.css';

function NavbarBottom() {
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useContext(AuthContext); // AuthContext에서 값 받아오기

  // 현재 경로가 /login이면 NavbarBottom 숨기기
  if (location.pathname === '/login') {
    return null;
  }

  // 로그인하지 않은 경우 아무것도 렌더링하지 않음
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {isAdmin ? (
        <div className="NavbarBottom_layout">
          {/* 관리자 페이지 */}
          <Link to="/">
            <img src={main} alt="메인" />
          </Link>
          <Link to="/categorychoice">
            <img src={categorychoice} alt="카테고리 선택" />
          </Link>
          <Link to="/mypage">
            <img src={mypage} alt="마이페이지" />
          </Link>
        </div>
      ) : (
        <div className="NavbarBottom_layout">
          {/* 일반 사용자 페이지 */}
          <Link to="/">
            <img src={allboard} alt="전체게시판" />
          </Link>
          <Link to="/adminpage">
            <img src={adminpage} alt="관리자 페이지" />
          </Link>
        </div>
      )}
    </>
  );
}

export default NavbarBottom;
