import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment';
const Table = () => {
  const [employee, setemployee] = useState([]);
  const [search, setSearch] = useState("");
  const [cp, setCP] = useState(1);
  const recordpage = 5;
  const lindex = cp * recordpage;
  const findex = lindex - recordpage;
  const record = employee.slice(findex, lindex);
  const [ratings, setRatings] = useState({}); 
  const npage = Math.ceil(employee.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  
  useEffect(() => {

  getemployee();
  }, [search]);

  const getemployee = () => {
    axios
      .get("http://localhost:3001/employee")
      .then((response) => {
        let filteredemployee = response.data;
        if (search) {
          filteredemployee = filteredemployee.filter((emp) =>
            emp.name.toLowerCase().includes(search.toLowerCase())|| emp.dept.toLowerCase().includes(search.toLowerCase()) ||
            emp.design.includes(search.toLowerCase()) || emp.date.includes(search) || emp.gender.toLowerCase()===(search.toLowerCase())
          );
        }
        setemployee(filteredemployee);
        setCP(1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function prePage() {
    if (cp !== findex) {
      setCP(cp - 1);
    }
  }

  function nextPage() {
    if (cp !== lindex) {
      setCP(cp + 1);
    }
  }

  function changeCP(id) {
    setCP(id);
  }
  
  

  return (
    <>
     <div className='nav'>
      <nav>
           <div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><Link to="/">Add Employee</Link></li>
      <li><Link to="/analysis">Analysis</Link></li>
            </ul>
            </div>
            
        </nav>
        </div>
      <div className="show">
        <Link to="/">
          <button>Add employee</button>
        </Link>
      </div>
      <h1 className="heading">List of employee</h1>
      <div className="search">
        <div className="total">
          Total Number of employee:
          <span>{employee.length}</span>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="search .."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th> Gender</th>
              <th>Location</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date of Hire</th>
              <th>Salary</th> 
              
            </tr>
          </thead>
          <tbody>
            {record.map((val, key) => {
              const formattedDate = moment(val.date).format("YYYY-MM-DD");
              const formathire = moment(val.hire).format("YYYY-MM-DD");
              return (
                <tr key={key}>
                  <td>{val.empid}</td>
                  <td>{val.name}</td>
                  <td>{formattedDate}</td>
                  <td>{val.email}</td>
                  <td>{val.gender}</td>
                  <td>{val.location}</td>
                  <td>{val.dept}</td>
                  <td>{val.design}</td>
                  <td>{formathire}</td>
                  <td>${val.salary}</td>

                  
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item${cp === n ? " active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCP(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Table;
