import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function MUISelect({wid80,title, options, onChange}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    onChange();
  };

  return (
    <Box className={wid80}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={title} 
        > 
          {options.map((option) => ( 
            <MenuItem key={option.value} value={option.value}>{ option.icon ? option.icon: ''  } {option.label}</MenuItem> 
          ))}


        </Select>
      </FormControl>
    </Box>
  );
}


export default MUISelect