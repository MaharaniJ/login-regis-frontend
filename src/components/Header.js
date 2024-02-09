import React from 'react'
import Avatar from '@mui/material/Avatar';
import './header.css'

const Header = () => {
  return (
    <div>
        <header>
            <nav>
                <h1>Authentication</h1>
                  <div className='avatar'>
                      <Avatar style={{background:'blue'}}>M</Avatar>
                  </div>
            </nav>
        </header>
      
    </div>
  )
}

export default Header
