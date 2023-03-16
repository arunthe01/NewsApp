import React, { useState } from 'react'
import styles from '@/styles/Pagination.module.css'

function Pagination({noOfPostPerPage, totalPosts,paginate,active,SetActive,handleNext,handlePrev}) {

  const arr = [];





  for(let i = 1; i<Math.ceil(totalPosts/noOfPostPerPage); i++){
    arr.push(i);
  }





  return (

    <div className={styles.pagination}  >


    <button className={styles.number} onClick={handlePrev}> Prev</button>

    {
            arr.map((i,idx)=>(

                <button className={`${styles.number}   ${active == i && styles.numberActive}` } onClick={(e)=>{paginate(i); SetActive(i)}} key={idx}>

                        {i}
                </button>


            ))
            
            

    }
    <button className={styles.number} onClick={handleNext}> Next</button>

    

    </div>)
}

export default Pagination