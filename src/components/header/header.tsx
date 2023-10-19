import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { selectCart } from "../../redux/slices/cartSlice"
import Search from "../search/search"
import style from './header.module.scss'

function Header() {
  const location = useLocation()
  const { items, totalPrice } = useSelector(selectCart)
  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      // console.log(json)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  return (
    <>
      <header className={style.header}>
        <div className={style.logo_wrapper}>
          <Link to="/Rental/">
            <div className={style.header__logo}>
              <img width="90" src='../../../public/logoTest.svg' alt="logo" />
              <div className={style.header_title}>
                <h1>Грант аренда</h1>
                <p>приложение аренды строительной техники</p>
              </div>
            </div>
          </Link>
        </div>

        {location.pathname !== "/Rental/login" && (

          <div className={style.header_user}>
            <div className={style.header__login}>
              <Link to="/Rental/login" className={style.button__login}>
                <svg id="Icons_User" overflow="hidden" version="1.1" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <circle fill="white" cx="48" cy="30" r="16" />
                    <path width='40px' height='50px' fill="white" d=" M 80 82 L 80 66 C 80 63.6 78.8 61.2 76.8 59.6 C 72.4 56 66.8 53.6 61.2 52 C 57.2 50.8 52.8 50 48 50 C 43.6 50 39.2 50.8 34.8 52 C 29.2 53.6 23.6 56.4 19.2 59.6 C 17.2 61.2 16 63.6 16 66 L 16 82 L 80 82 Z" />
                  </g>
                </svg>
              </Link>
            </div>
            <div className={style.header__cart}>
              {location.pathname !== '/Rental/cart' && (
                <Link to="/Rental/cart" className={style.button__cart}>
                  <span>{totalPrice} ₽</span>
                  <div className={style.button__cart_delimiter}></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{totalCount}</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {location.pathname === "/Rental/" && <Search />}
        {/* <Search /> */}
      </header >
    </>
  )

}

export default Header