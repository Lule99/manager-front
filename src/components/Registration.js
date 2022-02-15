import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/registration.css'
import {Button, Col, Modal, Row} from "react-bootstrap";
import { useLocation } from 'react-router-dom'

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPsw] = useState('');
    const [matchingPassword, setPswRe] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errIdMsg, setErrIdMsg] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showImg, setShowImg] = useState(true);
    const [jmbg, setJmbg] = useState('');
    const [musko, setMusko] = useState(false)
    const [zensko, setZensko] = useState(false)
    const [birthday, setBirthday] = useState('');


    const retConfPath =()=> {
        return window.location.href.substr(0, window.location.href.length - 17);
      };
  
      const  onSubmit = (e) => {
          e.preventDefault();
          if(password.length < 8){
              setErrIdMsg('Lozinka mora imati minimalno 8 karaktera!');
              return;
          }
        /* Ovde axios TODO */
      };
  
      const togglePopup = () => {
          if(isOpen === true)
              setIsOpen(!isOpen);
      };
  
      const toggleSpinner = () => {
          if(loading === false)
              setLoading(!loading);
          setLoading( !(birthday === '' ||
              email === '' ||
              password === '' ||
              matchingPassword === '' ||
              firstName === '' ||
              lastName === '' ||
              address === '' ||
              city === '' ||
              state === '' ||
              phoneNumber === ''));
      };
    

    return(
        
        <div class="content-body">
            <div  class="container-fluid">
                <form className='add-form' onSubmit={onSubmit}>
                        <div>
                        <div className ="container">
                        <h1 className = "veciFont" >Registracija</h1>
                        <p>Kreiranje novog naloga</p>
                        <p className="myErrMsg">{errMsg}</p>
                        <br/>


                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" className="mojInput" placeholder="primer@gmail.com" name="email" id="email"
                                value={email} onChange={(e) => setEmail(e.target.value)} required/>

                            <label htmlFor="psw"><b>Lozinka</b></label>
                            <input type="password" className="mojInput" placeholder="Unesite lozinku" name="psw" id="psw"
                                value={password} onChange={(e) => setPsw(e.target.value)} required/>

                            <label htmlFor="psw-repeat"><b>Ponovite lozinku</b></label>
                            <input type="password" className="mojInput" placeholder="Ponovite lozinku" name="psw-repeat" id="psw-repeat"
                                value={matchingPassword} onChange={(e) => setPswRe(e.target.value)} required/>
                            <p className="myErrMsg">{errIdMsg}</p>

                            <label htmlFor="fistName"><b>Ime</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite ime" name="firstName" id="firstName"
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>

                            <label htmlFor="lastName"><b>Prezime</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite prezime" name="lastName" id="lastName"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} required/>

                            <label htmlFor="fistName"><b>JMBG</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite JMBG" name="jmbg" id="jmbg"
                                value={jmbg} onChange={(e) => setJmbg(e.target.value)} required/>

                            <label htmlFor="fistName"><b>Pol</b></label>
                                <div className='center'>
                                <input type="radio" className="mojInput"  name="musko" id="musko"
                                    value={musko} onChange={(e) => setMusko(e.target.value)}  checked/>
                                    <label className='radioLabel' for="musko">Muško</label>
                                </div>

                                <div className='center'>
                                <input type="radio" className="mojInput"  name="zensko" id="zensko"
                                value={zensko} onChange={(e) => setZensko(e.target.value)}/>
                                <label className='radioLabel' for="zensko">Žensko</label>
                                </div>

                            <label htmlFor="datumRodjenja"><b>Datum Rođenja</b></label>
                            <input type="date" className="mojInput" placeholder="Unesite datum rođenja" name="datumRodjenja" id="datumRodjenja"
                                value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>

                            <label htmlFor="address"><b>Adresa</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite adresu" name="address" id="regAdr"
                                value={address} onChange={(e) => setAddress(e.target.value)} required/>

                            <label htmlFor="city"><b>Grad</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite grad" name="city" id="city"
                                value={city} onChange={(e) => setCity(e.target.value)} required/>

                            <label htmlFor="state"><b>Država</b></label>
                            <input type="text" className="mojInput" placeholder="Unesite državu" name="state" id="state"
                                value={state} onChange={(e) => setState(e.target.value)} required/>

                            <label htmlFor="phoneNumber"><b>Broj telefona</b></label>
                            <input type="text" className="mojInput" placeholder="npr. 0123456789" name="phoneNumber" id="phoneNumber"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>

                        <br/>
                    
                        <button type="submit" className="registerbtn" onClick={toggleSpinner}>{ loading === false ? 'Registruj se' : "CLip loader"}</button>
                        <Modal show={isOpen} onHide={togglePopup} centered>
                            <Modal.Body>
                                <Row>
                                    {showImg && <img src={""} alt="" />}
                                </Row>
                                <Row>
                                    <label className="text-dark">{errMsg}</label>
                                </Row>
                                <hr/>
                                <Row>
                                        <Button onClick={togglePopup}>Prihvati</Button>
                                </Row>
                            </Modal.Body>
                        </Modal>
                        </div>
                            <div  className="container signin">
                                    <p>Već imate nalog? <Link to="/api/login">Prijavite se</Link>.</p>
                            </div>
                        </div>
                </form>
            </div>
        </div>

);
}

export default Registration