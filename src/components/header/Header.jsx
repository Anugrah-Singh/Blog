import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <Container>
        <nav className="flex items-center py-4">
          <div className="flex items-center">
            <Link 
              to='/' 
              className="transition-transform duration-300 hover:scale-105"
            >
              <Logo width='70px' />
            </Link>
          </div>
          
          <ul className="flex items-center gap-2 ml-auto">
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-gray-300 rounded-lg 
                    transition-all duration-300 hover:bg-gray-800 
                    hover:text-white hover:shadow-md active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header