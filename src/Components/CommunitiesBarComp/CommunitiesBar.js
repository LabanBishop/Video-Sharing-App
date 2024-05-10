import React, { useState } from "react"
import './_CommunitiesBar.scss'

const keywords = [
    'All',
    'React js',
    'Angular js',
    'React Native',
    'use of API',
    'Redux',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Coding',
    'Cricket',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Poor Coder',
    'Shwetabh',
 ]
 const CommunitiesBar = () => {
    const [activeElement, setActiveElement] = useState('All')
 
    const handleClick = value => {
       setActiveElement(value)
    }
 
    return (
       <div className='CommunitiesBar'>
          {keywords.map((value, i) => (
             <span
                onClick={() => handleClick(value)}
                key={i}
                className={activeElement === value ? 'active' : ''}>
                {value}
             </span>
          ))}
       </div>
    )
 }

export default CommunitiesBar