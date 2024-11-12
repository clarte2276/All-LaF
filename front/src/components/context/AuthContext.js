import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    // 로그인 상태를 확인하는 API 엔드포인트 호출
    axios
      .get('/check-login', { withCredentials: true }) // withCredentials는 쿠키를 포함하도록 함
      .then((response) => {
        // 서버에서 반환된 로그인 상태 정보
        const { loggedIn, user } = response.data; // 서버 응답이 { loggedIn: true, user: { id: 'admin' } }

        if (loggedIn) {
          setIsLoggedIn(true);
          setIsAdmin(user.id === 'admin'); // id가 'admin'인 경우 관리자로 설정
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      })
      .catch((error) => {
        console.error('로그인 상태 확인 중 오류 발생:', error);
        setIsLoggedIn(false); // 에러가 나면 로그인 상태를 false로 설정
        setIsAdmin(false); // 관리자도 false로 설정
      })
      .finally(() => {
        setLoading(false); // 데이터 로딩 완료
      });
  }, []);

  if (loading) {
    return null; // 로딩 중에는 아무것도 렌더링하지 않음 (로딩 스피너 등 추가 가능)
  }

  return <AuthContext.Provider value={{ isLoggedIn, isAdmin }}>{children}</AuthContext.Provider>;
};
