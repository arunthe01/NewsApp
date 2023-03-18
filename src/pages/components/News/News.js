import React from 'react'
import styles from '@/styles/News.module.css'
import Link from 'next/link'
import Image from 'next/image'
// import { getStrapiMedia } from "../utils/medias"

function News({Data}) {
  return (
    <div className={styles.news}>

        

{ console.log(Data)}
         {
            
           Data && Data.map((item,i)=> 

                   (


                    <div className={styles.newsContainer} key ={i}>

                    { item.urlToImage && <img src={item.urlToImage} className={styles.newsImage}/>}

                     <p className={styles.newsContent}>{item.content}</p>

                     <p className={styles.newsDescription}>{item.description}</p>


                     <Link className={styles.newsButton} href={item.url} target="_blank"> Read More... </Link>



                     


                    </div>



                   )
            )

        }

           
            
            

            


              

           

            
                
         


         


       


    </div>
    
  )
}

export default News