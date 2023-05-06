import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes,useSearchParams,useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation();
  useEffect(() => {
   const page = searchParams.get("page") ?? 1;
   if(location.pathname.includes("tag")){
    //iska matlab tag wala page show krna hai. phele tag nikalo
    const tag = location.pathname.split('/').at(-1).replace("-"," ");
    console.log('tag update hua hai',tag)
    fetchBlogPosts(Number(page),tag);
   }else if(location.pathname.includes('categories')){
    const category = location.pathname.split('/').at(-1).replace("-"," ");
    fetchBlogPosts(Number(page),null,category);
   }else{
    fetchBlogPosts(Number(page));
   }
  }, [location.pathname,location.search ]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:blogId' element={<BlogPage/>}/>
        <Route path='/tag/:tag' element={<TagPage/>}/>
        <Route path='/categories/:category' element={<CategoryPage/>}/>
      </Routes>
    </>
  );
}
