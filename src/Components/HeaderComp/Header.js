import React from "react"
import "./_Header.scss"

import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications, MdApps } from "react-icons/md"

const Header = ({handleToggleSidebar}) => {
   return (
      <div className='header '>
         <div>
         <FaBars
            className='header__menu'
            size={26}
            onClick={() => handleToggleSidebar()}
         />
         </div>

         <img
            src='https://t3.ftcdn.net/jpg/04/70/54/06/360_F_470540652_7fkgeB4r6yvCp4kMB7IQhqzzyENsGufj.jpg'
            alt=''
            className='header__logo'
         />
         <form>
            <input type="text" placeholder="Search" />
            <button type="submit">
               <AiOutlineSearch size={22} />
            </button>
         </form>

         <div className="header__icons">
            <MdNotifications size={28} />
            <MdApps size={28} />
            <img
               src="https://cdn-icons-png.flaticon.com/512/266/266033.png"
               alt="avatar"
            />
         </div>
      </div>
   )
}

export default Header