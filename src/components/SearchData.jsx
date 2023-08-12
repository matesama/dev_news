import axios from "axios";
import {useState, useEffect} from "react";



const SearchData = () => {
    const [data, setData] = useState([]);
    const [searchContent, setSearchContent] = useState("");

    const handleSearch = (event) => {
        setSearchContent(event.target.value);
    }
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const getData = await axios.get(`http://hn.algolia.com/api/v1/search?query=${searchContent}`);
            if(!getData) throw new Error("Request failed with a status of ${getData.status}");
            const response = await getData.data.hits;
            setData([response]);
            console.log(response);
        }catch(error) {
            console.log(error.message);
        }
    }

    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="search" placeholder="Search with dev news" onChange={handleSearch}></input>
                <button type="submit">Search</button>
            </form>
            {data.length ? (
            data.map((response) => (
                <div key={response.created_at_i}>
                <h2>{response.title}</h2>
                <p>{response.url}</p>
                </div>
            )) 
            ) : (
                <p>What do you want to know?</p>
            )}


        </div>
    )
}

export default SearchData;