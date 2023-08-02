import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';


function SelectTurf({wid80,title, options, onChange, defValue}) {
    const {data} = useSelector(state=>state.booking)
    const turf = data.turf;
    
  const handleChange = (e) => { 
    onChange(e.target.value)

  } 

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={turf}
          label={title} 
          onChange={(e) => handleChange(e)}
        > 
          {options.map((option) => ( 
            <MenuItem key={option.value} value={option.value}>{ option.icon ? option.icon: ''  } {option.label}</MenuItem> 
          ))}


        </Select>
      </FormControl>
    </Box>
  );
}


export default SelectTurf