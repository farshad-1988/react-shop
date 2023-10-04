import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import { signUpWithEmail } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



const Signup = ()=>{
    const navigate = useNavigate()
    const {setCartItems,setNewSignIn} = useContext(CartContext)


    const userSchema = yup.object().shape({
        name:yup.string().min(3).required("please enter a valid name"),
        // lastName:yup.string().min(3).required("please enter a valid family"),
        email:yup.string().email("you must enter valid email address").required("enter email address"),
        // address:yup.string().min(10).required("please enter a valid address"),
        password: yup.string().min(4).max(15).required("use a password"),
        confirmPassword:yup.string().oneOf([yup.ref("password") , "password is not match"]).required("you must confirm pass")
    })

    const {register , handleSubmit , formState:{errors}} = useForm({resolver:yupResolver(userSchema)})

    const submitFormToDB = async ({email , password , name})=>{
        setNewSignIn("signup")
        setCartItems(JSON.parse(localStorage.getItem("cart")))
        await signUpWithEmail(email , password , name)
        navigate("/")
    }

    return (
        <form className="container " onSubmit={handleSubmit(submitFormToDB)}>
            <div className="mt-2">
                <span>first name:</span>
                <input className="form-control" type="text" placeholder="please enter your firstname..." {...register("name")} />
                {errors.name?.message && <p className="text-danger">{errors.name.message}</p>}
            </div>
            {/* <div className="mt-2">
                <span>last name:</span>
                <input className="form-control" type="text" placeholder="please enter your lastname..." {...register("lastName")}/>
                {errors.lastName?.message && <p className="text-danger">{errors.lastName.message}</p>}
            </div> */}
            <div className="mt-2">
                <span>email address:</span>
                <input className="form-control" type="text" placeholder="please enter your email..." {...register("email")}/>
                {errors.email?.message && <p className="text-danger">{errors.email.message}</p>}
            </div>
            {/* <div className="mt-2">
                <span>address:</span>
                <input className="form-control" type="text" placeholder="please enter your postal address..." {...register("address")}/>
                {errors.address?.message && <p className="text-danger">{errors.address.message}</p>}
            </div> */}
            <div className="mt-2">
                <span>password:</span>
                <input className="form-control" type="password" placeholder="please enter your password..." {...register("password")}/>
                {errors.password?.message && <p className="text-danger">{errors.password.message}</p>}
            </div>
            <div className="mt-2">
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

export default Signup