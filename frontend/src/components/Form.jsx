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
      
          <div className="flex flex-col items-center">
            <button name="submit" className="content-center btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Register</button>
          </div>

          
        </form>
      </div>

      <br></br>

      <div className="flex flex-col">
        <div className="flex flex-row gap-20 justify-center">
          <div>
            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid First Name</p>       
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Last Name</p> 
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Phone Number</p>
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Date of Birth</p>
            </div>

            <div className="flex flex-row gap-2 pt-1 ">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Address</p>
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Postcode</p>
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid Company</p>
            </div>

            <div className="flex flex-row gap-2 pt-1">
              <img src={tick} className="object w-4 h-auto"></img>
              <p className="text-success text-xs font-bold">Valid File</p>
            </div>
          </div>

      
        <div>
          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid First Name</p>
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Last Name</p> 
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Phone Number</p>
          </div>
 
          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Date of Birth</p>
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Address</p>
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Postcode</p>
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid Company</p>
          </div>

          <div className="flex flex-row gap-2 pt-1">
            <img src={xImage} className="object w-4 h-auto"></img>
            <p className="text-error text-xs font-bold">Invalid File</p>
          </div>

        </div>
      </div>
    </div>



      <br></br>
      <br></br>
    </>
  );
}
  
export default Form;
  