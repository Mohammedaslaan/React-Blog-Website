import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import BlogDetails from '../components/BlogDetails'; // add import statement

function BlogPage() {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const navigation = useNavigate();
  const [blog,setBlog] =useState(null);
  const [relatedBlog,setRelatedBlog] = useState([]);
  const location = useLocation();
  const {setLoading,loading} = useContext(AppContext);
  const blogId = location.pathname.split('/').at(-1);
  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log('url is',url)
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log('data aarha hai',data)
        setBlog(data.blog);
        setRelatedBlog(data.relatedBlogs);
        console.log('related blogs set kiye  hai',relatedBlog)
    }
    catch(err){
      console.log('error aaya hai blogid me');
      setBlog(null);
      setRelatedBlog([]);

    }
    setLoading(false);
  }
  useEffect(()=>{
    if(blogId){
      fetchRelatedBlogs();
    }
    
  },[location.pathname])
  return (
    <div className=''>
      <Header/>
      <div className=' mt-[90px] w-11/12 max-w-2xl mx-auto'>
        <button onClick={()=> navigation(-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md mb-5">Back</button>
      </div>
      {
        loading ? (
          <div>
            <p className="text-center font-bold text-3xl">Loading</p>
          </div>
        ) : 
        blog ?
        (
          <div>
              <BlogDetails post={blog}/>
              <h2 className='text-2xl font-bold mt-8 mb-8  w-11/12 max-w-2xl mx-auto'>Related Blogs</h2>
              { 
                relatedBlog.map((post)=>{
                  return (<div key={post.id}>
                    <BlogDetails post={post}/>
                  </div>)
                })
              }
          </div>
        ) : 
        (<div>
          <p>No Blog Found</p>
        </div>)
      }
    </div>
  )
}

export default BlogPage
