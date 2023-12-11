import xImage from "../assets/red-x-icon.svg";
import tick from "../assets/green-tick.svg";

function Form() {

  return (
    <>
      <h1 className="p-5 font-bold w-full text-center"> Please Register Below </h1>

      <div className="container w-3/5 mx-auto">
        <form action="" method="POST">
          <div className="grid grid-cols-3 grid-flow-row">
          
          {/* First Name Input */}
          <div className="flex flex-col items-center gap-2 py-2"> 
            <label for="firstName">First Name</label> 
            <input 
            type="text" 
            name="firstName" 
            required
            pattern="/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$" // First name Regex
            className="input input-bordered input-info w-full max-w-xs" 
            />
          </div>

          {/* Last Name Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="lastName">Last Name</label> 
            <input 
            type="text" 
            name="lastName"
            required
            pattern="/^[a-z ,.'-]+$/i" // Last name Regex
            className="input input-bordered input-info w-full max-w-xs " 
            />
          </div>
                  
          {/* UK Phone Number Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="phoneNumber">Phone Number</label>
            <input 
            type="text" 
            name="phoneNumber"
            required
            pattern="^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$"
            className="input input-bordered input-info w-full max-w-xs" 
            />
          </div>

          {/* Date of Birth Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="dob">Date of Birth</label>
            <input 
            type="date" 
            name="dob"
            min={"01/01/1900"}
            max={"01/01/2010"} 
            required
            className="input input-bordered input-info w-full max-w-xs" 
            />
          </div>

          {/* UK Address Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="address">Address</label>
            <input 
            type="text"
            name="address" 
            required
            pattern="[A-Za-z0-9'\.\-\s\,]{1,100}$" // Max 100 Characters, only certain special symbols allowed.
            className="input input-bordered input-info w-full max-w-xs" 
            />
          </div>

          {/* UK Post Code Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="postCode">Post Code</label>
            <input 
            type="text" 
            name="postCode"
            required
            pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" 
            className="input input-bordered input-info w-full max-w-xs" 
            />
            </div>

          {/* Company Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="company">Company</label>
            <input 
            type="text" 
            name="company" 
            required
            pattern="^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$"
            className="input input-bordered input-info w-full max-w-xs" 
            />
            </div>

          {/* UK Nationality Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="nationality">Nationality</label>
            <select name="nationality" className="select select-info w-full max-w-xs">
              <option disabled selected>Select Nationality</option>
              <option>English</option>
              <option>Scottish</option>
              <option>Welsh</option>
              <option>Northern Irish</option>
            </select>
            </div>


          {/* JSON File Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label for="nationality">Medical Record JSON</label>
            <input 
            type="file" 
            name="json-file"
            required
            className="file-input file-input-bordered file-input-info w-full max-w-xs" 
            />
          </div>
        </div>

        <br></br>

          {/* Disabled Checkbox Input */}
          <div className="form-control w-full items-center">
            <label className="cursor-pointer label gap-2">
              <span className="label-text">Disabled</span>
              <input type="checkbox" checked="checked" className="checkbox checkbox-info" />
            </label>
          </div>

          <br></br>
          

          <div className="flex flex-col items-center">
            <button name="submit" className="content-center btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Register</button>
          </div>

          
        </form>
      </div>

        <br></br>

        <div className="flex flex-col w-full items-center">
          <div className="grid grid-cols-2 text-xs gap-y-0">
            
            <img src={tick} className="object-fill w-1/12 h-auto"></img>
            <p className="text-success">Valid First Name</p>

            <img src={tick} className="object-fill w-1/12 h-auto"></img>
            <p className="text-success">Valid Last Name</p> 

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Phone Number</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Date of Birth</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Address</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Postcode</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Company</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid Nationality</p>

            <img src={tick} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-success">Valid File</p>

            <img src={xImage} className="object-fill w-1/12 h-auto"></img>
            <p className="text-error">Invalid First Name</p>

            <img src={xImage} className="object-fill w-1/12 h-auto"></img>
            <p className="text-error ">Invalid Last Name</p> 

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Phone Number</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Date of Birth</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Address</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Postcode</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Company</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid Nationality</p>

            <img src={xImage} className="object-fill w-1/12 h-1/12"></img>
            <p className="text-error">Invalid File</p>

          

          
          </div>
        </div>
      

        <br></br>
        <br></br>
    </>
  );
}
  
export default Form;
  