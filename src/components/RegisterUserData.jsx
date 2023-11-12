import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'

import { signUpWithEmail } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



const RegisterUserData = ()=>{
    const navigate = useNavigate()
    const { cartDispatch , cartItems} = useContext(CartContext)


    const userSchema = yup.object().shape({
        name: yup.string().min(3).required("please enter a valid name"),
        lastName: yup.string().min(3).required("please enter a valid family"),
        email: yup.string().email("you must enter valid email address").required("enter email address"),
        phoneNumber: yup.number().min(10).required("enter phone number"),
        address: yup.object({
            address1 : yup.string().max(30).required("please enter your address"),
            address2 : yup.string().max(30),
            city : yup.string().max(20).required("please enter your city"),
            district : yup.string().max(20).required("please enter your district or state"),
            zipCode : yup.string().max(10).required("please enter your zip code"),
            country : yup.string().max(20).required("please enter your country") 
        }),
        password: yup.string().min(4).max(15).required("use a password"),
        confirmPassword: yup.string().oneOf([yup.ref("password") , "password is not match"]).required("you must confirm pass")
    })

    const {register , handleSubmit , formState:{errors}} = useForm({resolver:yupResolver(userSchema)})

    const submitFormToDB = async ({email ,name , lastName, password ,address , phoneNumber})=>{
        await signUpWithEmail(email ,name , lastName, password ,address,phoneNumber ,cartItems)
        cartDispatch( {type:"SET_CART_ITEMS" , payload:cartItems})
        cartDispatch({ type: "CHANGING_IN_CART" });
        // cartDispatch({type:"SET_SIGNING_TYPE" , payload:"signup"})
        navigate("/")
    }

    return (
        <form className="container m-auto col-8 row" onSubmit={handleSubmit(submitFormToDB)}>
            <div className="mt-2 col-6">
                <span>first name:</span>
                <input className="form-control" type="text" placeholder="please enter your firstname..." {...register("name")} />
                {errors.name?.message && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>last name:</span>
                <input className="form-control" type="text" placeholder="please enter your lastname..." {...register("lastName")}/>
                {errors.lastName?.message && <p className="text-danger">{errors.lastName.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>email address:</span>
                <input className="form-control" type="text" placeholder="please enter your email..." {...register("email")}/>
                {errors.email?.message && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>phone number:</span>
                <input className="form-control" type="number" placeholder="please enter your email..." {...register("phoneNumber")}/>
                {errors.phoneNumber?.message && <p className="text-danger">{errors.phoneNumber.message}</p>}
            </div>

            
            <div className="mt-2 col-6">
                <span>address1:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.address1")}/>
                {errors.address?.address1?.message && <p className="text-danger">{errors.address?.address1.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>address2:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.address2")}/>
                {errors.address?.address2?.message && <p className="text-danger">{errors.address?.address2.message}</p>}
            </div>
            <div className="mt-2 col-3">
                <span>city:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.city")}/>
                {errors.address?.city?.message && <p className="text-danger">{errors.address?.city.message}</p>}
            </div>
            <div className="mt-2 col-3">
                <span>district:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.district")}/>
                {errors.address?.district?.message && <p className="text-danger">{errors.address?.district.message}</p>}
            </div>
            <div className="mt-2 col-3">
                <span>zipCode:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.zipCode")}/>
                {errors.address?.zipCode?.message && <p className="text-danger">{errors.address?.zipCode.message}</p>}
            </div>
            <div className="mt-2 col-3">
                <span>country:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address.country")}/>
                {errors.address?.country?.message && <p className="text-danger">{errors.address?.country.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>password:</span>
                <input className="form-control" type="password" placeholder="please enter your password..." {...register("password")}/>
                {errors.password?.message && <p className="text-danger">{errors.password.message}</p>}
            </div>
            <div className="mt-2 col-6">
                <span>repeat password:</span>
                <input className="form-control" type="password" placeholder="please confirm your password..." {...register("confirmPassword")}/>
                {errors.confirmPassword?.message && <p className="text-danger">{errors.confirmPassword.message}</p>}
            </div>
            <div className="text-center">
                <button className="mt-3 btn btn-primary w-50" type="submit">register</button>
            </div>
        </form>
    )
}

export default RegisterUserData