import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const Pagination = ({nPages,currentPage,setCurrentPage}) => {

    const handlePageChange = (page)=>{
        setCurrentPage(page)
    }
  
    return (
      <ResponsivePagination
        current={currentPage}
        total={nPages}
        onPageChange={handlePageChange}
        maxWidth="20px"
      />
    );
}

export default Pagination