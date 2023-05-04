import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CheckJobType() {
    return (
        <Autocomplete
            multiple
            id="checkjobtype"
            options={JobType}
            disableCloseOnSelect
            getOptionLabel={(option) => option.jtype}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.jtype}
                </li>
            )}
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Job Type" placeholder="Job Type" />
            )}
        />
    );
}

const JobType = [
    { jtype: 'Full Time' },
    { jtype: 'Part Time' },
    { jtype: 'Contract' },
    { jtype: 'Temporary' },
    { jtype: 'Volunteer' },
    { jtype: 'Internship' },
    { jtype: 'Other' },
];



export default CheckJobType 