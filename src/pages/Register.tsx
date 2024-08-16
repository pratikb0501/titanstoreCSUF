import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/Firebase";
import { useEffect, useState } from "react";
import {toast } from "react-toastify";

function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCpassword] = useState('');
  const [dob,setDob] = useState(new Date());
  const [gender,setGender]=useState("male")

  const notify = () => toast.success("Helloooo !");
  useEffect(()=>{
    console.log("REgisterrrrr")
    notify();
  },[])

  const handleRegister = async(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    try {
      console.log("name",name);
      console.log("email",email);
      console.log("password",password);
      console.log("cpassword",cpassword);
      console.log("dob",dob);
      console.log("gender",gender);

      await createUserWithEmailAndPassword(auth,email,password);
    } catch (error) {
    }
  }

  

  return (
    <section className="login-container">
      <div className="login-box">
        <form onSubmit={handleRegister}>
          <p className="title">Register:</p>
          <div className="login-inputs">
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="Name"
              onChange={e=>{
                setName(e.target.value)
              }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={e=>{
                setEmail(e.target.value)
              }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={e=>{
                setPassword(e.target.value)
              }}
              required
            />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              onChange={e=>{
                setCpassword(e.target.value)
              }}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={e=>{
                setDob(new Date(e.target.value))
              }}
              max={new Date().toISOString().split("T")[0]}
              required
            />
            <select name="gender" defaultValue="male" onChange={e => setGender(e.target.value)}>
              <option value="male">
                Male
              </option>
              <option value="female">Female</option>
            </select>
          </div>
          <button type="submit" className="login-btn">Sign-up</button>
        </form>
        <hr />
        <button className="google-btn">Register with Google</button>
      </div>
    </section>
  );
}

export default Register;
