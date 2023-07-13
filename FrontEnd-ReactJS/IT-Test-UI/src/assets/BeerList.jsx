import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function BeerList() {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    // const records = Data.slice(firstIndex, lastIndex);
    // const npage = Math.ceil(Data.length / recordsPerPage);
    const [beerList, setBeerList] = useState([])
    const usenavigate = useNavigate();

    const getListBeer = async () => {
        let jwtToken = localStorage.getItem("jwtToken");
        const URLAPI = 'https://localhost:7251/api/beer';
        fetch(URLAPI, {headers:{
            'Authorization': 'bearer ' + jwtToken
        }})
        .then(response =>  response.json())
        .then(dataResponse => {
            setBeerList(dataResponse)
    })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                text: error.message
            })
        });
    }

    const records = beerList.slice(firstIndex, lastIndex);
    const npage = Math.ceil(beerList.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changeCPage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if(currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }

    function LogOut() {
        localStorage.clear();
        usenavigate('/')
    }

    useEffect(() => {
        getListBeer()
    }, [])

    return (
        <div>
            <Table responsive> 
                <thead>
                    <tr>
                        <th>ID Beer</th>
                        <th>Name Beer</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((d,i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.description}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <nav>
                <ul className='pagination'>
                        <li className='page-item'>
                            <a href="#" className='page-link'
                            onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n,i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href="#" className='page-link'
                                    onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href="#" className='page-link'
                            onClick={nextPage}>Next</a>
                        </li>
                </ul>
            </nav>
            <button className='btn btn-danger' onClick={LogOut}>LogOut</button>
        </div>
    )
}

export default BeerList