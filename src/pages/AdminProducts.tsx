import { useState } from "react";
import AddNewProduct from "../components/AddNewProduct";
import AdminProductsList from "../components/AdminProductsList";

function AdminProducts() {
  const [tab, setTab] = useState("all");

  const changeTab = (tabName:string)=>{
    setTab(tabName)
  }
  return (
    <div className="admin-products-container">
      <div className="admin-products-header">
        <button
          title={tab == "new" ? "view all products" : "add new product"}
          onClick={() => setTab(tab == "new" ? "all" : "new")}
        >
          {tab == "new" ? "All" : "New"}
        </button>
      </div>
      <div className="admin-products-content">
        {tab == "new" ? <AddNewProduct changeTab={changeTab} /> : <AdminProductsList />}
      </div>
    </div>
  );
}

export default AdminProducts;
