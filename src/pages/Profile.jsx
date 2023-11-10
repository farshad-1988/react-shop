import React, { useContext, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getDocumentUser } from "../firebase.config";


const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userDoc, setUserDoc, currentUser } = useContext(UserContext)


  useEffect(() => {

    const getUserInfo = async () => {
      if (!currentUser) return
      const userInfo = await getDocumentUser(currentUser.uid);
      setUserDoc(userInfo)
    };
    getUserInfo();
  }, [currentUser]);

  const {
    name,
    lastName,
    email,
    phoneNumber,
    address,
    purchasedItems: allCompletedPurchase,
  } = { ...userDoc };
  const { address1, address2, city, district, zipCode, country } = {
    ...address,
  };

  return (
    // <Routes>
    //     <Route index element={
    <>
      <div className="row">
        <div className="d-flex flex-column align-item-center col-12 col-xl-6" >
          {!currentUser || !userDoc ? <span className="spinner spinner-border align-self-center mt-4"></span> :
            <div>
              <div className="container row m-3 lh-base">
                {name && lastName && <span className="text-capitalize">{name + " " + lastName}</span>}
                <span>{email}</span>
                <span>{phoneNumber}</span>
              </div>
              <div className="container m-3 h-auto ff-profile-address-box" >
                {userDoc.address ? <div className="row border border-secondary rounded text-capitalize lh-base p-3">
                  <span>{address1}</span>
                  {address2 && <span>{address2}</span>}
                  <span>{city}</span>
                  <span>{district}</span>
                  <span>{zipCode}</span>
                  <span>{country}</span>
                </div> : <span className="text-danger">please click on edit button and complete your information</span>}

                <button
                  disabled={!userDoc}
                  className="btn btn-danger mt-3 w-100"
                  onClick={() => navigate(`/editUserData/${userId}`)}
                >
                  edit
                </button>
              </div>
            </div>
          }

        </div>

        <div className="col-12 col-xl-6">
          {allCompletedPurchase ?
            Object.entries(allCompletedPurchase)?.map(
              (allPurchasedItemsInfo, index) => {
                const purchasedItems = allPurchasedItemsInfo[1].purchasedItems;
                const purchasedInfo =
                  allPurchasedItemsInfo[1].summaryPurchaseInfo;
                let datePurchasedRegistered = purchasedInfo.purchasedAt.toDate()
                return (
                  <div className="row mt-2 ms-2" key={`purchasedInfo${index}`}>
                    <div className=" col-6 mt-5">
                      {/* gh */}
                      <span className="text-danger">purchase Id: </span>
                      <p>{purchasedInfo.purchasedId}</p>
                      <p>{purchasedInfo.totalCountAndPrice.totalPrice}$</p>
                      <p>{purchasedInfo.totalCountAndPrice.totalCount} items have purchased</p>
                      <p>order date:{datePurchasedRegistered.toDateString()}</p>
                      <p>deliverty date:{purchasedInfo.deliveryDay}</p>
                    </div>

                    <div className="col-6 bg-secondary rounded-circle d-flex m-3 ff-purchased-items-container">
                      <div className="d-flex flex-wrap justify-content-center m-auto">
                        {purchasedItems?.map((purchasedItem, index) => {
                          if (index < 4)
                            return (
                              <div
                                key={`purchasedItem${index}`}
                                className="rounded-circle mt-1 me-1"
                                style={{
                                  backgroundImage: `url(${purchasedItem.imagesUrl[0]})`,
                                  backgroundSize: "cover",
                                  width:"95px",
                                  height:"95px",
                                }}
                              ></div>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            ) : <span className="spinner spinner-border  mt-4"></span>}
          {allCompletedPurchase?.length === 0 && <div className="text-center mt-5 text-danger">you don't have any completed purchase.</div>}
        </div>
      </div>
    </>
  );
};

export default Profile;
