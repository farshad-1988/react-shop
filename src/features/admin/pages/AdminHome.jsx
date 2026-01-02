import { Link } from "react-router-dom"


const AdminHome = () => {
  return (
    <>
    
    <div className="row d-flex" style={{height:"200px", marginTop:"100px"}} >
    <div className="d-flex flex-column m-auto justify-content-around bg-light h-75 w-50 rounded-3">
      <Link className="row w-75 m-auto text-decoration-none" to={"addnewproduct"}><button className="btn btn-primary">add new product</button></Link>
      <Link className="row w-75 m-auto text-decoration-none" to={"editproduct"}><button className="btn btn-primary mt-3">edit product</button></Link>
    </div>
    </div>
    </>

  )
}

export default AdminHome