import Pagination from 'react-bootstrap/Pagination';





const NewsPagination = ({currentPage, postPerPage, totalPosts, paginate}) => {
  
  let pageNumbers = [];
  let page = 1;
console.log(totalPosts)
  for(page=1; page < Math.ceil(totalPosts / postPerPage); page++) {
    pageNumbers.push(page)
  }
    
  let start = 1,
  end = pageNumbers.length;
  if (currentPage - 2 > 1) {
  start = currentPage - 2;
  }
  if (currentPage + 2 < pageNumbers.length) {
  end = currentPage + 2;
}
  

  


  return (
    <Pagination>
      <Pagination.First
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {start !== 1 && <Pagination.Ellipsis /> ? pageNumbers.slice(start - 1, end).map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => paginate(page)}
          active={currentPage === page}
        >
          {page}
        </Pagination.Item>
      )) : <Pagination.Item
      key={page}
      onClick={() => paginate(page)}
      active={currentPage === page}
    >
      {page}
    </Pagination.Item> }
    <Pagination.Item
      key={page +1}
      onClick={() => paginate(page +1)}
      active={currentPage === page +1}
    >
      {page + 1}
    </Pagination.Item>
    <Pagination.Item
      key={page +2}
      onClick={() => paginate(page + 2)}
      active={currentPage === page + 2}
    >
      {page + 2}
    </Pagination.Item>
    
      
      {end !== pageNumbers.length && <Pagination.Ellipsis />}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
      <Pagination.Last
        onClick={() => paginate(pageNumbers.length)}
        disabled={currentPage === pageNumbers.length}
      />
    </Pagination>
  );
}

export default NewsPagination;