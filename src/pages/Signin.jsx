import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signInWithEmail, signOutUser } from "../firebase.config"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"



const Signin = ()=>{
        const {cartDispatch , cartItems} = useContext(CartContext)
        const navigate = useNavigate()
        const userSchema = yup.object().shape({
            email:yup.string().email("your email is not valid").required("you must enter your email address"),
            password:yup.string().min(4).max(30).required("enter password please")
        })

    const {register , handleSubmit , formState:{errors}} = useForm({resolver:yupResolver(userSchema)})
    
        const login = async({email , password})=>{
            try {
                const cartAfterSignin = await signInWithEmail(email , password , cartItems)
                cartDispatch({type:"SET_CART_ITEMS" , payload:cartAfterSignin})
                cartDispatch({type:"CHANGING_IN_CART"})
                // cartDispatch({type:"SET_SIGNING_TYPE" , payload:"signin"})
                navigate("/")
            } catch (error) {
                console.error(errors)
            }
        }


    
    return (
        <form className="container w-75" onSubmit={handleSubmit(login)}>
            <span>email: </span>
            <input className="form-control" type="email" {...register("email")}/>
            <span>password: </span>
            <input className="form-control" type="password" {...register("password")}/>
            <div className="text-center mt-3">
                <button className="btn btn-primary w-50" type="submit">log in</button>
            </div>
            {/* <button type="button" onClick={()=>signOutUser()}>signout</button> */}
        </form>
    )
}

export default Signin