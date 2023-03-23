import React, { useState } from 'react'
import styles from '@/styles/Nav.module.css'
import Image from 'next/image'
import categories from '../images/categories.png'
import { useEffect } from 'react'
import axios from 'axios'


function handleCategories(){
    alert("categories");
}




function Nav({setData,SetActive,prev}) {

  // var v = Data;

  var [latest,setLatest] = useState(),[ business, SetBusiness]  = useState(),[ sports, setSports] = useState(), [entertainment,setEntertainment] = useState("");
  const [query,SetQuery]= useState("");
  const x = useEffect( ()=>{
  

    axios.get("https://newsapi.org/v2/everything?q=latest&from=2023-03-15&to=2023-03-15&sortBy=popularity&apiKey=8ca2258b01c144908c384ba4d4f03e41").then(async function(resp){
      const data = resp;
      setLatest(data.data.articles);
      
    });
  
  
    axios.get("https://newsapi.org/v2/everything?q=business&from=2023-03-15&to=2023-03-15&sortBy=popularity&apiKey=8ca2258b01c144908c384ba4d4f03e41").then(async function(resp){
      const data = resp;
      SetBusiness (data.data.articles);
      
    });
  
  
    axios.get("https://newsapi.org/v2/everything?q=sports&from=2023-03-15&to=2023-03-15&sortBy=popularity&apiKey=8ca2258b01c144908c384ba4d4f03e41").then(async function(resp){
      const data = resp;
      setSports( data.data.articles);
      
    });
  
  
    axios.get("https://newsapi.org/v2/everything?q=entertainment&from=2023-03-15&to=2023-03-15&sortBy=popularity&apiKey=8ca2258b01c144908c384ba4d4f03e41").then(async function(resp){
      const data = resp;
      setEntertainment (data.data.articles);
      
    });
  
  },[])



  function handleChange(e,b){

   
   
   
    if(e.key === "Enter"|| b!=""){

      if(b!="") SetQuery(b);
     
      axios.get(`https://newsapi.org/v2/everything?q=${query}&from=2023-03-15&to=2023-03-15&sortBy=popularity&apiKey=8ca2258b01c144908c384ba4d4f03e41`).then(function(resp){
        const data = resp;
        if( !data || data.data.articles.length == 0) alert("Not found on api");
        else setData(data.data.articles);
      }).catch(function (error) {
        if (error) {
        // Request made and server responded
        alert("Error:"+error.response.headers);
       
        } 

      });

      

    }
  }
  return (
    <div className={styles.nav}> 
        <div className={styles.headers}>
          <p className={styles.appName}> News App</p>
          <p className={styles.homeButton} onClick={()=>{setData(prev)}}>Home</p>
        </div>
        <div className={styles.rightNav}>

          <div className={styles.searchContainer}> 
            <div className={styles.searchBar}> 
                <input className={styles.searchInput}  onKeyPress={(e)=>{handleChange(e,"");   SetQuery((e.target.value));}} placeholder="The Api Listed by Company is not allowing to fetch data once the website is deployed."/> 
            </div>

            <div className={styles.dropdownSearch}>
          {entertainment&& entertainment
            .filter((item) => {
              const searchTerm = (query.toString())?.toLowerCase();
              
              const api_data = (item?.title?.toString())?.toLowerCase();

              return (
                searchTerm &&
                api_data.startsWith(searchTerm)
               
              );
            })
            .slice(0, 20)
            .map((item,idx) => (
              <div 
                onClick={(e) => handleChange(e,item)}
                className={styles.dropdownSearchrow}
                key={idx}
              >
                {item.title}
              </div>
            ))}
        </div>

          </div>
           
              <div class={styles.dropdown}>
                <button className={styles.dropbtn}>Categories
                  <i className="fa fa-caret-down" style={{"width":"20px" , "height":"20px"}}> ▼</i>
                </button>
                <div class={styles.dropdowncontent}>
                  <a onClick={(e)=>{e.preventDefault; SetActive(1);  setData(business); } }>Business</a>
                  <a onClick={(e)=>{e.preventDefault ; SetActive(1);setData(sports);  } }>Sports</a>
                  <a onClick={(e)=>{e.preventDefault;SetActive(1); setData(entertainment);  }}>Entertainment</a>
                  <a onClick={(e)=>{e.preventDefault;SetActive(1); setData(latest);  }}>Latest</a>

                </div>
              </div> 
            </div>
        
    </div>
  )
}

export default Nav
