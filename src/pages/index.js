import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Nav from './components/nav/Nav'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Pagination from './components/pagination/Pagination'
import News from './components/News/News'
const inter = Inter({ subsets: ['latin'] })





export default function Home() {


 


 const [Data,setData] = useState("");
 const [active,SetActive] = useState(1);
 const [prev,setPrev] = useState(Data);
 

    const [noOfPostPerPage, setnoOfPostPerPAge] = useState(6);
    const[pageNumber, setPageNumber] = useState(1);
   

    var lastIndex = pageNumber * noOfPostPerPage;
    var firstIndex = lastIndex - noOfPostPerPage;
    var ModArray = Data && Data.slice(firstIndex,lastIndex);

    var total_pages = Data && Math.ceil(Data.length/noOfPostPerPage);

   

 


  const x = useEffect( ()=>{
  
    axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=8ca2258b01c144908c384ba4d4f03e41").then(async function(resp){
      const data = resp;
      setData(data.data.articles);
      setPrev(data.data.articles);
    }).catch(function(err){
      alert(err.respose.headers);
    });

  

},[])




function paginate(number){

  console.log(pageNumber);

   setPageNumber(number);
   

}

function handleNext(){

  if(pageNumber < total_pages-1){
    setPageNumber(pageNumber+1);
    SetActive(pageNumber+1)
  }

  

}

function handlePrev(){

  if(pageNumber != 1){
    setPageNumber(pageNumber-1);
    SetActive(pageNumber-1);
  }

}



  return (
    <>
    <Nav setData={setData}  SetActive={SetActive} prev={prev}/>
    <News Data={ModArray}/>
    <Pagination noOfPostPerPage={noOfPostPerPage} totalPosts={Data && Data.length} paginate={paginate} active={active} SetActive={SetActive} handleNext={handleNext} handlePrev={handlePrev}/>
    </>
  )
}
