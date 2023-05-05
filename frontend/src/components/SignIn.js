import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link as Router } from "react-router-dom";
import '../components/css/signin.css';
import { Container } from 'react-bootstrap';
import logoo1 from './images/sample-logo.png';
import Image from 'react-bootstrap/Image';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Web3 from 'web3';

const theme = createTheme();

function SignIn() {

    // Define the state variables for the user inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('JobSeeker');

    // Define the Ethereum provider object
    let provider;
    if (window.ethereum) {
        provider = new Web3(window.ethereum);
    } else if (window.web3) {
        provider = new Web3(window.web3.currentProvider);
    } else {
        alert('No web3 provider detected');
        return null;
    }

    // Define the UserRegistry contract ABI
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "enum UserRegistry.UserType",
                    "name": "_userType",
                    "type": "uint8"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "enum UserRegistry.UserType",
                    "name": "userType",
                    "type": "uint8"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "UserRegistered",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_wallet",
                    "type": "address"
                }
            ],
            "name": "getUserByAddress",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum UserRegistry.UserType",
                            "name": "userType",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "wallet",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "isRegistered",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct UserRegistry.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_userId",
                    "type": "uint256"
                }
            ],
            "name": "getUserById",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum UserRegistry.UserType",
                            "name": "userType",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "wallet",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "isRegistered",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct UserRegistry.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_wallet",
                    "type": "address"
                }
            ],
            "name": "isUserRegistered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Define the UserRegistry contract object
    const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
    const contract = new provider.eth.Contract(abi, contractAddress);

    // Define the function to handle the form submission
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Call the registerUser function on the contract
            const tx = await contract.registerUser(userType, name, email);
            await tx.wait();

            // Display a success message
            alert('User registered successfully!');
        } catch (error) {
            // Display an error message
            alert(error.message);
        }
    }


    // const [showPassword, setShowPassword] = React.useState(false);

    // const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    // const [userTypee, setUserTypee] = useState('');

    // const handleChange = (event) => {
    //     setUserTypee(event.target.value);
    // };

    return (
        <Container className="signIn">
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid className="sidepic"
                        item
                        xs={false}
                        sm={3}
                        md={7}
                        sx={{
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        }}
                    />
                    <Grid item xs={12} sm={9} md={5} component={Paper} elevation={6} square className="LogArea">
                        <Box className="LogArea2"
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Image className="logoo" src={logoo1} responsive />

                            <Typography component="h1" variant="h5" className="headerr">
                                Welcome!
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} className="inputfield">
                                <TextField
                                    // margin="auto"
                                    required
                                    //fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="fullName"
                                    autoComplete="fullName"
                                    autoFocus
                                    className='fName'

                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <TextField
                                    // margin="auto"
                                    required
                                    //fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    className='emailadd'

                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                {/* <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl> */}
                                <FormControl fullWidth>
                                    <InputLabel id="usertype-label">
                                        User Type</InputLabel>
                                    <Select
                                        labelId="usertype-label"
                                        id="usertype"
                                        // value={userTypee}
                                        label="User Type"
                                        // onChange={handleChange}
                                        className='usertype-f'

                                        value={userType}
                                        onChange={(event) => setUserType(event.target.value)}
                                    >
                                        <option value="JobSeeker">Job Seeker</option>
                                        <option value="Employer">Employer</option>
                                    </Select>
                                </FormControl>
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>


                                <Grid container>
                                    {/* <Grid item xs>
                                        <Link href="#" variant="body3">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}

                                    <Grid item>
                                        <Link href="/signup" variant="body3">
                                            {"Don't have an account? SIGN UP"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                {/* <Copyright sx={{ mt: 5 }} /> */}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Container>
    );
}

export default SignIn;
