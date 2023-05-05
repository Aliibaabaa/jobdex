
import '../css/signin.css';
import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link as Router } from "react-router-dom";
import logoo1 from '../images/sample-logo.png';
import Image from 'react-bootstrap/Image';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Select from "@mui/material/Select";
import Web3 from 'web3';

const theme = createTheme();

function SignUp() {
    const [userType, setUserType] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
    }

    const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"; // replace with your contract address
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

    const web3 = new Web3(Web3.givenProvider); // create a new web3 instance using the injected provider (e.g., Metamask)

    async function register() {
        try {
            const accounts = await web3.eth.getAccounts(); // get the current user's Ethereum account
            const contract = new web3.eth.Contract(abi, contractAddress); // create a new contract instance

            await contract.methods
                .registerUser(userType, name, email)
                .send({ from: accounts[0] }); // call the registerUser function and send the transaction using the current user's account
            alert("User registered successfully!"); // show a success message
        } catch (error) {
            console.error(error);
            alert("Failed to register user");
        }

    }
    return (
        <Container className="signUp" >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image className="logoo" src={logoo1} responsive />
                        <Typography component="h1" variant="h5" className="headerr">
                            Join Now!
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullName"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="userType-label">User Type</InputLabel>
                                        <Select
                                            labelId="userType-label"
                                            id="userType"
                                            value={userType}
                                            onChange={(e) => setUserType(e.target.value)}
                                            placeholder="User Type"
                                            label="User Type"
                                        >
                                            <option value="JobSeeker">Job Seeker</option>
                                            <option value="Employer">Employer</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                            </Grid>
                            <Button
                                onClick={register}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Router to="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Router>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>
    );
}

export default SignUp