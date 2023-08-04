import React from "react"; 

function SILFieldSetComp({insideComp, endAdornment}) {
  
  return (
    <div className="SILFieldSetComp  MuiFormControl-root MuiTextField-root w100 css-1u3bzj6-MuiFormControl-root-MuiTextField-root" style={{paddingBottom:'35px'}}>
      <label className=" SILFieldSetCompLabel MuiFormControl-root MuiTextField-root w100 css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
        Duration
      </label>

      <div className="sil-field-set-comp"> 
      {insideComp}
      </div>
      

      <div className="MuiInputAdornment-root MuiInputAdornment-positionStart MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-ittuaa-MuiInputAdornment-root">
        <span className="notranslate">​</span>
      </div>
      <div className="sil-input-adornment  sil-svg-end-adornment">
         {endAdornment}
      </div>
      <fieldset
        aria-hidden="true"
        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline sil-fieldSet"
      >
        <legend className="css-14lo706">
          <span>Duration</span>
        </legend>
      </fieldset>
    </div>
  );
}

export default SILFieldSetComp;
