import axios from "axios";
import {useState, useEffect} from "react";
import BasicSpinner from "./BasicSpinner";
import NewsPagination from './NewsPagination';



const SearchData = () => {
    const [data, setData] = useState([]);
    const [searchContent, setSearchContent] = useState("");
    const [load, setLoad] = useState(false);
    const [noContentCase, setNoContentCase] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(15);

    const handleSearch = (event) => {
        setSearchContent(event.target.value);
    }
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try{
            setLoad(!load);
            const getData = await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchContent}&page=${currentPage}&hitsPerPage=${postPerPage}`);
            if(!getData) throw new Error("Request failed with a status of ${getData.status}");
            const response = await getData.data.hits; //data already an array
            setData(response);
            console.log(response);
            if(response.length > 0) {
                setLoad(load);
            } else if(response.length === 0) {
                setLoad(load);
                setNoContentCase("no results found");
            }
        }catch(error) {
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        handleSubmit
    }, [currentPage])

    /*const handleChangePage = (page) => {
        setPage(page)
    }*/
     
    /*// Get current data
    const indexOfLastData = currentPage * postPerPage;
    const indexOfFirstData = indexOfLastData - postPerPage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);*/

    // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="search" placeholder="Search with dev news" onChange={handleSearch}></input>
                <button type="submit">Search</button>
            </form>
        
            {load ? (<BasicSpinner  />) : null}
            <h4>{noContentCase}</h4>
            {data.length ? (
            data.map((response) => (
                <tr key={response.created_at_i}>
                <th>{response.title}:</th>
                <td>{response.url}</td>
                </tr>
            )) 
            ) : (
                <h4>What do you want to know?</h4>
            )}
           
            
<NewsPagination currentPage={currentPage} postPerPage={postPerPage} totalPosts={data.length} paginate={paginate} />
        </div>
    )
}

export default SearchData;