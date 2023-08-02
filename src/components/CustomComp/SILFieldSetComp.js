import React from "react"; 

function SILFieldSetComp({insideComp, endAdornment}) {
  return (
    <div className="SILFieldSetComp  MuiFormControl-root MuiTextField-root wid-80 css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
      <label className=" SILFieldSetCompLabel MuiFormControl-root MuiTextField-root wid-80 css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
        Duration
      </label>

      <div className="sil-field-set-comp"> 
      {insideComp}
      </div>
      

      <div class="MuiInputAdornment-root MuiInputAdornment-positionStart MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-ittuaa-MuiInputAdornment-root">
        <span class="notranslate">​</span>
      </div>
      <div class="sil-input-adornment  sil-svg-end-adornment">
         {endAdornment}
      </div>
      <fieldset
        aria-hidden="true"
        class="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline sil-fieldSet"
      >
        <legend class="css-14lo706">
          <span>Duration</span>
        </legend>
      </fieldset>
    </div>
  );
}

export default SILFieldSetComp;
