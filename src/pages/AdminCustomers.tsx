import { useSelector } from "react-redux";
import { User, UserReducerInitState } from "../redux/reducers/user/userTypes";
import { useGetAllUsersQuery } from "../redux/reducers/user/userApi";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import deleteIcon from "../assets/delete.svg"

function AdminCustomers() {
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const [userList, setUserList] = useState<User[]>([]);
  const { data } = useGetAllUsersQuery(adminId ?? skipToken);

  useEffect(() => {
    if (data) {
      setUserList(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (adminId) {
    }
  }, [adminId]);

  return (
    <section className="coupon-container">
      <div className="add-coupon">
        <h1>Users</h1>
      </div>
      <div className="display-coupon">
        {!userList.length ? (
          <div className="no-coupons">
            <h1>No Users</h1>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Avtar</th>
                <th>User</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user) => (
                <tr key={user._id}>
                  <td><img className="avatar" src={user.photo} alt="avtar" /></td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                  {user.role === "user" && 
                    <p className="delete-td">
                      <img
                        src={deleteIcon}
                        alt="delete"
                        title="delete user"
                      />
                    </p>
                  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default AdminCustomers;
