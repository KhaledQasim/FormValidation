function Form() {
    return (
      <>
        <h1 className="p-5 font-bold w-full text-center"> Please Register Below </h1>

        <form action="" method="POST">
          <div className="container mx-auto">
            <div className="grid grid-cols-3 grid-rows-auto gap-2 place-items-center">

              {/* Username Input */}
              <input 
              type="text" 
              name="username"
              placeholder="Username" 
              required
              pattern="^[a-zA-Z0-9]{3,13}$" // Username Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />
              
              {/* First Name Input */}
              <input 
              type="text" 
              name="first-name"
              placeholder="First Name" 
              required
              pattern="/^[a-z ,.'-]+$/i" // First name Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Last Name Input */}
              <input 
              type="text" 
              name="last-name"
              placeholder="Last Name" 
              required
              pattern="/^[a-z ,.'-]+$/i" // Last name Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Email Input */}
              <input 
              type="text" 
              name="email"
              placeholder="Email" 
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Email Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />

            {/* Password Input */}
              <input 
              type="password" 
              name="password"
              placeholder="Password" 
              required
              pattern="^[a-zA-Z\d][a-zA-Z\d!?%&*]{7,21}$" // Password regex - Must contain lowercase,uppercase, special character(!?%&*), and be between 8 and 22 characters
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Confirm Password Input */}
              <input 
              type="password" 
              name="confirm-password"
              placeholder="Confirm Password" 
              required
              pattern="^[a-zA-Z\d][a-zA-Z\d!?%&*]{7,21}$" // Password regex - Must contain lowercase,uppercase, special character(!?%&*), and be between 8 and 22 characters
              className="input input-bordered input-info w-full max-w-xs" 
              />
              
              {/* Phone Number Input */}
              <input 
              type="text" 
              name="phone-number"
              placeholder="Phone Number" 
              required
              pattern="^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$" // UK Phone Number Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Date of Birth Input */}
              <input 
              type="date" 
              name="dob"
              min={"01/01/1900"}
              max={"01/01/2010"} 
              required
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Address Input */}
              <input 
              type="text"
              name="address" 
              placeholder="Address" 
              required
              pattern="[A-Za-z0-9'\.\-\s\,]{1,100}$" // Max 100 Characters, only certain special symbols allowed.
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Post Code Input */}
              <input 
              type="text" 
              name="post-code"
              placeholder="Post Code" 
              required
              pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})" // UK Post Code Regex
              className="input input-bordered input-info w-full max-w-xs" 
              />

              {/* Nationality Input */}
              <select name="nationality" className="select select-info w-full max-w-xs">
                <option disabled selected>Select Nationality</option>
                <option>English</option>
                <option>Scottish</option>
                <option>Welsh</option>
                <option>Northern Ireland</option>
              </select>

              {/* JSON File Input */}
              <input 
              type="text" 
              name="json-file"
              placeholder="JSON File Upload?" 
              required
              className="input input-bordered input-info w-full max-w-xs" 
              />

              
              
            </div>
          </div>
          
          <br></br>
          <br></br>
          <div className="flex flex-col items-center">
            <button name="submit" className="content-center btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Register</button>
          </div>
        </form>

      </>
    );
  }
  
export default Form;
  