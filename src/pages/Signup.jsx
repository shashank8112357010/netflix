import React, { useState } from 'react'
import styled from "styled-components"
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const checkIfEmailExists = async(email)=>{
        try {
            const signInMethods = await fetchSignInMethodsForEmail(firebaseAuth, email);
            return signInMethods.length > 0;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async() =>{
        try {
            const {email, password} = formValues;
            const emailExists = await checkIfEmailExists(email);

            if(emailExists){
                setError("Email already exists, Please use a different email!!");
            }
            else{
                await createUserWithEmailAndPassword(firebaseAuth, email, password);
                setError("");
            }
        } catch (err) {
            // console.log(err);
            // setError("Failed to sign up!! Please try again");
            console.log("Error during sign-up:", err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Email already exists. Please use a different email.");
            } else {
                setError("Failed to sign up. Please try again.");
            }
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser)=>{
        if(currentUser) navigate("/login")
    })

    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Unlimited Movies, TV Shows and more</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className="form">
                        <input
                            type="email"
                            placeholder='Email Address'
                            name='email'
                            value={formValues.email}
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        {
                            showPassword && (
                                <input
                                    type="password" placeholder='Password' name='password'
                                    value={formValues.password}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                            )
                        }

                        {
                            !showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>
                        }
                    </div>
                    <button onClick={handleSignIn}>Sign Up</button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div`
    position: relative;
    .content{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body{
            gap: 1rem;
            .text{
                gap: 1rem;
                text-align: center;
                font-size: 2rem;
                h1{
                    padding:0 25rem;
                }
            }
            .form{
                display: grid;
                grid-template-columns: ${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
                width: 60%;
                input{
                    color: black;
                    border: none;
                    padding: 1.5rem;
                    font-size: 1.2rem;
                    border: 1px solid black;
                    &:focus{
                        outline: none;
                    }
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor: pointer;
                    color: white;
                    font-weight: bolder;
                    font-size: 1.05rem;
                }
            }
            button{
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                border-radius: 0.2rem;
                font-weight: bolder;
                font-size: 1.05rem;
            }
        }
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 1rem;
    font-size: 1rem;
`