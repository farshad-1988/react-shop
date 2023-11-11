import React, { useContext, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getDocumentUser } from "../firebase.config";
import PurchasedItems from "./PurchasedItems";


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
                  onClick={() => navigate(`editUserData`)}
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
                return (
                    <PurchasedItems allPurchasedItemsInfo={allPurchasedItemsInfo} key={`purchasedInfo${index}`}/>
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
