import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import "./App.css"
function Create() {
  const [name,setname]=useState("");
  const [empid,setempid]=useState("");
  const [date,setdate]=useState("");
  const [dept,setdept]=useState("");
  const [email,setemail]=useState("");
  const [gender,setgender]=useState("");
  const [designation,setdesignation]=useState("");
  const [location,setlocation]=useState("");
  const [salary,setsalary]=useState(0);
  const [dateofhire,sethire]=useState("");

  const [msg,setmsg]=useState(false);
  const[msginfo,setinfo]=useState("");
  
  const addemployee=()=>{
    console.log("hello");
    axios.post("http://localhost:3001/create",{
      name:name,
      empid:empid,
      date:date,
      dept:dept,
      email:email,
      gender:gender,
      location:location,
      designation:designation,
      dateofhire:dateofhire,
      salary:salary
    }).then(()=>{
      console.log('success');
      setmsg(true);
      setinfo("Successfully Inserted")
    }).catch((error) => {
      console.error('Error inserting data:', error);
      console.log(error);
      setmsg(true);
      setinfo(error.response.data.error);
  });
  setname("");
  setempid("");
  setdate("");
  setdept("");
  setemail("");
  setgender("");
  setdesignation("");
  setlocation("");
  setsalary("");
  sethire("");  
  };
  const handleClick = () => {
    setmsg(false);
  };






  return (
    <div className="App">
      <div className='nav'>
      <nav>
           <div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><Link to="/employee">Employee List</Link></li>
      <li><Link to="/analysis">Analysis</Link></li>
            </ul>
            </div>
            
        </nav>
        </div>
    <h1 className='heading'>Employee registration</h1>
    <div className='show'>
          
             <Link to="/employee" ><button> Show all the Employee</button></Link>
          
      </div>
      {msg&& (<div className='info'><div>{msginfo}</div><div onClick={handleClick}><RxCross2/></div></div>)}
    <div className='container'>
    <div className="form">
      <div>
    <label>Name</label>
  <input onChange={(e)=>{setname(e.target.value)}} type="text" className="name" value={name}/>
  <br></br>
  <label>Employee ID</label>
  <input onChange={(e)=>{setempid(e.target.value)}} type="number" className="emp_id" value={empid} />
  <br></br>
  <label>Email Address</label>
  <input type="email" onChange={(e)=>{setemail(e.target.value)}} className="position" value={email} />
  <br></br>
  <label>Date of Birth</label>
  <input type="date" onChange={(e)=>{setdate(e.target.value)}} className="age" value={date}/>
  <br></br>
  <label>Gender</label>
  <div onChange={(e)=>{setgender(e.target.value)}}>
    <input type="radio" value="male" name="gender"/>
    <label  className="label-radio" htmlFor="male">Male</label>
    <input type="radio" value="female" name="gender" />
    <label className="label-radio" htmlFor="female">Female</label>
    </div>
    <br></br>

  </div>
  <div>
  
  <label>Work Location</label>
  <input type="text"  value={location} onChange={(e)=>{setlocation(e.target.value)}} className="position" />
  <br></br>
  <label>Department</label>
  <select value={dept} onChange={(e)=>{setdept(e.target.value)}} >
  <option value="">Select</option>
  <option value="Human Resources (HR)">Human Resources (HR)</option>
  <option value="Finance">Finance</option>
  <option value="Marketing">Marketing</option>
  <option value="Sales">Sales</option>
  <option value="Information Technology (IT)">Information Technology (IT)</option>
  <option value="Customer Service">Customer Service</option>
  <option value="Research and Development (R&D)">Research and Development (R&D)</option>
  <option value="Administrative">Administrative</option>
    </select>
    <br></br>

  <label>Designation</label>
  <input type="text" value={designation} onChange={(e)=>{setdesignation(e.target.value)}} className="wage" />
  <br></br>
  <label>Salary</label>
  <input type="number" value={salary} onChange={(e)=>{setsalary(e.target.value)}} className="wage" />
  <br></br>
  <label>Date of Hire</label>
  <input type="date" value={dateofhire} onChange={(e)=>{sethire(e.target.value)}} className="" />
  <br></br>
  

  </div>
  </div>
  <button onClick={addemployee} >ADD EMPLOYEE</button>
    </div>

    
  </div>

  );
}



export default Create;
