import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

function TagPage() {
  const navigation = useNavigate()
  const location = useLocation();;
  const tag = location.pathname.split('/').at(-1);
  return (
    <div>
      <Header/>
      <div className='mt-[90px] w-11/12 max-w-2xl mx-auto'>
        <button onClick={()=> navigation(-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md mb-5">Back</button>
        <h2 className='text-[20px] font-bold'>Blogs Tagged <span className='underline text-blue-600'>#{tag.replace("-"," ")}</span></h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default TagPage