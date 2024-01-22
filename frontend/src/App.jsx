import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'

function App() {
  //it will cancel old request itself
   const controller=new AbortController()

  // const [products,error,loading]=customReactQuery('/api/products')
  const [products, setProducts] = useState([])
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const [search,setSearch]=useState('')

      //;--> to diffenetiate the code where it is end 
    /*;(async()=>{
        const response=await axios.get('/api/products')
      }) */
  useEffect(()=>{
     // eslint-disable-next-line no-extra-semi
     ; (async()=>{
       try {
        setLoading(true)
        setError(false)
         const response=await axios.get('/api/products?search='+search,
         {
          signal:controller.signal //inside controller it will send the request and old request will send to catch
         })
         console.log(response.data);
         setProducts(response.data)
         setLoading(false)
       } catch (error) {
        if (axios.isCancel(error)){
          console.log('Request canceled',error.message)
          return
        }
        setError(true)
        setLoading(false)
       }
      }) ()
      //cleanup
      return ()=>{ //cleanup method when component mount it will unmount also
        controller.abort()
        //this done to give 1st data then 2nd data and .....
        //race condition
      }
  },[search])

  // if (error){
  //   //const response=await axios.get('/api/product')
  //   return <h1>Something went wrong</h1>
  // }
  // if(loading){
  //   return <h1>Loading....</h1>
  // }


  return (
    <>
      <h1>Chai aur API in react</h1>
      <input type="text" placeholder='Search'
      value={search} 
      onChange={(e)=>setSearch(e.target.value)}/>
      {/* conditional rendering  */}
      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went wrong</h1>}
      <h2>Number of Products are :{products.length}</h2>
    </>
  )
}

export default App

// const customReactQuery=(urlPath)=>{
//   const [products, setProducts] = useState([])
//   const [error,setError]=useState(false)
//   const [loading,setLoading]=useState(false)

//       //;--> to diffenetiate the code where it is end 
//     /*;(async()=>{
//         const response=await axios.get('/api/products')
//       }) */
//   useEffect(()=>{
//       (async()=>{
//        try {
//         setLoading(true)
//         setError(false)
//          const response=await axios.get(urlPath)
//          console.log(response.data);
//          setProducts(response.data)
//          setLoading(false)
//        } catch (error) {
        
//         setError(true)
//         setLoading(false)
//        }
//       }) ()
//   },[])

//   return [products,error,loading]
// }
