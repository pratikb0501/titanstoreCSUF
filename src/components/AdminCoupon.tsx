import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateNewCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "../redux/reducers/coupon/couponApi";
import {
  CouponPayload,
  DeleteCouponResponse,
  NewCouponResponse
} from "../redux/reducers/coupon/couponTypes";
import { UserReducerInitState } from "../redux/reducers/user/userTypes";
import Fallback from "./Fallback";

function AdminCoupon() {
  const adminId = useSelector(
    (state: { userReducer: UserReducerInitState }) =>
      state.userReducer.user?._id
  );
  const [createNewCoupon] = useCreateNewCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const {
    data: couponsList,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllCouponsQuery(adminId!);
  // const[allCouponsList,setAllCouponsList] = useState<CouponResponse[]>();
  const [couponName, setCouponName] = useState<string>("");
  const [couponAmount, setCouponAmount] = useState<number>(0);

  // useEffect(() => {
  //   toast.error("Error Occured");
  // }, [isError]);

  const delCoupon = async (couponId: string) => {
    try {
      const res: DeleteCouponResponse = await deleteCoupon({
        couponId,
        adminId: adminId!,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Failed to Delete");
    }
  };

  const addNewCoupon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!couponName || couponAmount < 1) {
      toast.error("Fill all the details");
      return;
    } else {
      try {
        const payload: CouponPayload = {
          couponCode: couponName.toLowerCase(),
          amount: couponAmount,
          adminId: adminId!,
        };
        const { message, success }: NewCouponResponse = await createNewCoupon(
          payload
        ).unwrap();
        if (success) {
          toast.success(message);
          setCouponAmount(0);
          setCouponName("");
        }
      } catch (error) {
        // const couponError = error as CouponErrorResponse;
        toast.error("Failed ! Please try another code");
      }
    }
  };

  if (isLoading) {
    return <Fallback />;
  }

  if (isError) {
    // toast.error("Error Occured");
  }

  if (isSuccess) {
    const { coupons } = couponsList;
    return (
      <section className="coupon-container">
        <div className="add-coupon">
          <h1>Add Coupon</h1>
          <form className="create-coupon" onSubmit={(e) => addNewCoupon(e)}>
            <div className="coupon-input">
              <label>Coupon code</label>
              <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                onBlur={() => {
                  if (!couponName) {
                    toast.error("Code cannot be empty");
                  }
                }}
              />
            </div>
            <div className="coupon-input">
              <label>Discount Amount</label>
              <input
                type="number"
                min={1}
                step={1}
                value={couponAmount}
                onChange={(e) =>
                  setCouponAmount(Math.round(Number(e.target.value)))
                }
                onBlur={() => {
                  if (couponAmount < 1) {
                    toast.error("Amount cannot be less than 1");
                  }
                }}
              />
            </div>
            <div className="coupon-btn">
              <label>Save</label>
              <button type="submit" disabled={!couponName || couponAmount < 1}>
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="display-coupon">
          {!(coupons.length) ? (
            <div className="no-coupons">
              <h1>No coupons</h1>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Coupon</th>
                  <th>Amount</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {coupons?.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.couponCode}</td>
                    <td>$ {coupon.amount}</td>
                    <td>
                      <p className="delete-td">
                        <img
                          src="/src/assets/delete.svg"
                          alt="delete"
                          title="delete coupon"
                          onClick={() => delCoupon(coupon._id)}
                        />
                      </p>
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
}

export default AdminCoupon;
