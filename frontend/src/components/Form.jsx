import xImage from "../assets/red-x-icon.svg";
import tick from "../assets/green-tick.svg";
import { useState } from "react";

function Form() {
  //Form Values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [company, setCompany] = useState("");
  const [nationality, setNationality] = useState("");
  const [jsonFile, setJsonFile] = useState("");

  //Valid Text Divs - Off by default
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [validDob, setValidDob] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validPostcode, setValidPostcode] = useState(false);
  const [validCompany, setValidCompany] = useState(false);
  const [validNationality, setValidNationality] = useState(false);
  const [validJsonFile, setValidJsonFile] = useState(false);

  //Invalid Text Divs - On by Default
  const [invalidFirstName, setInvalidFirstName] = useState(true);
  const [invalidLastName, setInvalidLastName] = useState(true);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(true);
  const [invalidDob, setInvalidDob] = useState(true);
  const [invalidAddress, setInvalidAddress] = useState(true);
  const [invalidPostcode, setInvalidPostcode] = useState(true);
  const [invalidCompany, setInvalidCompany] = useState(true);
  const [invalidNationality, setInvalidNationality] = useState(true);
  const [invalidJsonFile, setInvalidJsonFile] = useState(true);

  //Register Button - Off by default
  const [submitButton, setSubmitButton] = useState(false);

  //Regex/Tests
  const validateName = new RegExp("^[a-z ,.'\\-]{1,20}$", "i"); // 20 characters maximum. Letters and some special characters allowed. Case-insensitive.
  const validateNumber = new RegExp(
    "^(?:\\+?44|0)(?:\\s?\\d{4}|\\s\\d{3}\\s\\d{3}|\\s\\d{4}\\s\\d{4}|\\d{10})$"
  ); // Uk Phone Number format
  const validateAddress = new RegExp("[A-Za-z0-9'.-s,]{1,100}$"); //100 characters maximum, letters, numbers, and some special characters allowed.
  const validatePostcode = new RegExp(
    "[A-Za-z]{1,2}\\d[A-Za-z\\d]?\\s?\\d[A-Za-z]{2}"
  ); // UK Post Code Format
  const validateCompany = new RegExp("^\\w[\\w.\\-#&\\s]{1,50}$", "i"); // 50 characters maximum. Letters and some special characters allowed. Case-insensitive.
  const validateNationality = new RegExp(
    "English|Scottish|Welsh|Northern Irish"
  ); // Selection must be one of the four options

  // Check DOB is between allowed range
  function validateDate(date) {
    const min = new Date("1910-01-01");
    const max = new Date("2010-01-01");
    const dob = Date.parse(date);

    if (min < dob && dob < max) {
      return true;
    }
  }

  // Check file is a .json
  function validateJson(filePath) {
    const fileExtension = filePath.split(".").pop();

    if (fileExtension === "json") {
      return true;
    }
  }

  function submit() {
    console.log("Connect to backend")
    
  }

  // Run tests & Update Valid/Invald text onclick

  function validate() {
    if (validateName.test(firstName)) {
      setValidFirstName(true);
      setInvalidFirstName(false);
    } else {
      setValidFirstName(false);
      setInvalidFirstName(true);
    }

    if (validateName.test(lastName)) {
      setValidLastName(true);
      setInvalidLastName(false);
    } else {
      setValidLastName(false);
      setInvalidLastName(true);
    }

    if (validateNumber.test(phoneNumber)) {
      setValidPhoneNumber(true);
      setInvalidPhoneNumber(false);
    } else {
      setValidPhoneNumber(false);
      setInvalidPhoneNumber(true);
    }

    if (validateDate(dob)) {
      setValidDob(true);
      setInvalidDob(false);
    } else {
      setValidDob(false);
      setInvalidDob(true);
    }

    if (validateAddress.test(address)) {
      setValidAddress(true);
      setInvalidAddress(false);
    } else {
      setValidAddress(false);
      setInvalidAddress(true);
    }

    if (validatePostcode.test(postcode)) {
      setValidPostcode(true);
      setInvalidPostcode(false);
    } else {
      setValidPostcode(false);
      setInvalidPostcode(true);
    }

    if (validateCompany.test(company)) {
      setValidCompany(true);
      setInvalidCompany(false);
    } else {
      setValidCompany(false);
      setInvalidCompany(true);
    }

    if (validateNationality.test(nationality)) {
      setValidNationality(true);
      setInvalidNationality(false);
    } else {
      setValidNationality(false);
      setInvalidNationality(true);
    }

    if (validateJson(jsonFile)) {
      setValidJsonFile(true);
      setInvalidJsonFile(false);
    } else {
      setValidJsonFile(false);
      setInvalidJsonFile(true);
    }

    // If all tests are passed, show submit button
    if (validateName.test(firstName) && validateName.test(lastName) && validateNumber.test(phoneNumber) && 
    validateDate(dob) && validateAddress.test(address) && validatePostcode.test(postcode) && validateCompany.test(company) 
    && validateNationality.test(nationality) && validateJson(jsonFile)) {
      setSubmitButton(true)
    } else {
      setSubmitButton(false)
    }

  }

  //HTML FORM
  return (
    <>
      <h1 className="p-5 font-bold w-full text-center">
        {" "}
        Please Register Below{" "}
      </h1>

      <div className="container w-3/5 mx-auto">
        <form onSubmit={submit}>
          <div className="grid grid-cols-3 grid-flow-row">
            {/* First Name Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            {/* Last Name Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs "
                onClick={validate}
              />
            </div>

            {/* UK Phone Number Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                required
                placeholder="07823123123"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            {/* Date of Birth Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                min={"01/01/1900"}
                max={"01/01/2010"}
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            {/* UK Address Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                required
                placeholder="House Name, Street Name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            {/* UK Post Code Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="postCode">Post Code</label>
              <input
                type="text"
                name="postCode"
                required
                placeholder="B4 7ET"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            {/* Company Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                name="company"
                required
                placeholder="Student"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input input-bordered input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

          {/* UK Nationality Input */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label htmlFor="nationality">Nationality</label>
            <select value={nationality} onChange={(e) => setNationality(e.target.value)} name="nationality" className="select select-info w-full max-w-xs onClick={validate}">
              <option selected>Select Nationality</option>
              <option>English</option>
              <option>Scottish</option>
              <option>Welsh</option>
              <option>Northern Irish</option>
            </select>
            </div>

            {/* JSON File Input */}
            <div className="flex flex-col items-center gap-2 py-2">
              <label htmlFor="nationality">Medical Record JSON</label>
              <input
                type="file"
                name="jsonFile"
                required
                value={jsonFile}
                onChange={(e) => setJsonFile(e.target.value)}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
                onClick={validate}
              />
            </div>

            <br></br>
            <br></br>

            {submitButton && (<div className="flex flex-col items-center">
            <br></br>
               <button
                name="submit"
                className="content-center btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
              >
                Submit
              </button>
            </div>)}

          </div>
        </form>
      </div>

      <br></br>

      <div className="flex flex-col">
        <div className="flex flex-row gap-20 justify-center">
          {/* VALID TEXT OBJECTS */}
          <div>
            {validFirstName && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">
                  Valid First Name
                </p>
              </div>
            )}

            {validLastName && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">
                  Valid Last Name
                </p>
              </div>
            )}

            {validPhoneNumber && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">
                  Valid Phone Number
                </p>
              </div>
            )}

            {validDob && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">
                  Valid Date of Birth
                </p>
              </div>
            )}

            {validAddress && (
              <div className="flex flex-row gap-2 pt-1 ">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">Valid Address</p>
              </div>
            )}

            {validPostcode && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">Valid Postcode</p>
              </div>
            )}

            {validCompany && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">Valid Company</p>
              </div>
            )}

            {validNationality && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">
                  Valid Nationality
                </p>
              </div>
            )}

            {validJsonFile && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={tick} className="object w-4 h-auto"></img>
                <p className="text-success text-xs font-bold">Valid File</p>
              </div>
            )}
          </div>

          {/* INVALID TEXT OBJECTS */}
          <div>
            {invalidFirstName && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">
                  Invalid First Name
                </p>
              </div>
            )}

            {invalidLastName && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">
                  Invalid Last Name
                </p>
              </div>
            )}

            {invalidPhoneNumber && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">
                  Invalid Phone Number
                </p>
              </div>
            )}

            {invalidDob && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">
                  Invalid Date of Birth
                </p>
              </div>
            )}

            {invalidAddress && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">Invalid Address</p>
              </div>
            )}

            {invalidPostcode && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">Invalid Postcode</p>
              </div>
            )}

            {invalidCompany && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">Invalid Company</p>
              </div>
            )}

            {invalidNationality && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">
                  Invalid Nationality
                </p>
              </div>
            )}

            {invalidJsonFile && (
              <div className="flex flex-row gap-2 pt-1">
                <img src={xImage} className="object w-4 h-auto"></img>
                <p className="text-error text-xs font-bold">Invalid File</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
    </>
  );
}

export default Form;
