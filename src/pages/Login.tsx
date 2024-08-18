import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import google from "../assets/google_logo.svg";
import { auth } from "../components/Firebase";
import { useCreateNewUserMutation } from "../redux/reducers/user/userApi";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";

function Login() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [createUser] = useCreateNewUserMutation();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitState }) => state.userReducer
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const response = await createUser({
        _id: user.uid,
        gender,
        dob,
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        role: "user",
      }).unwrap();
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      if (error) {
        toast.error("Fail to Sign In");
      }
    }
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <form>
          <p className="title">Login:</p>
          <div className="login-inputs">
            {/* <input
              type="email"
              name="email"
              autoFocus
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            /> */}
            <label htmlFor="dob" className="input-label">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={(e) => {
                setDob(e.target.value);
              }}
              value={dob}
              max={new Date().toISOString().split("T")[0]}
              required
            />
            <label htmlFor="gender" className="input-label">
              Gender
            </label>
            <select
              name="gender"
              defaultValue=""
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* <button type="submit" className="login-btn">
            Login
          </button> */}
        </form>
        {/* <hr /> */}
        <button className="google-btn" onClick={handleLogin}>
          Sign-in using{" "}
          <span>
            <img src={google} alt="google_logo" />
          </span>
        </button>
        <p className="tip">
          Enter details if you are logging for the first time
        </p>
      </div>
    </section>
  );
}

export default Login;
