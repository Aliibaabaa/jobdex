import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CheckWorkSetUp() {
    return (
        <Autocomplete
            multiple
            id="checkworksetup"
            options={WorkSetUp}
            disableCloseOnSelect
            getOptionLabel={(option) => option.wsetup}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.wsetup}
                </li>
            )}
            style={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Work Set Up" placeholder="Work Set Up" />
            )}
        />
    );
}

const WorkSetUp = [
    { wsetup: 'Remote' },
    { wsetup: 'Hybrid' },
    { wsetup: 'On-Site' },
    { wsetup: 'Flexitime' },
    { wsetup: 'Condensed Workweeks' },
    { wsetup: 'Shift Work' },
    { wsetup: 'Job Sharing' },
];


export default CheckWorkSetUp