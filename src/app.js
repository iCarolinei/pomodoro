import React, { useEffect, useState } from "react";
import {render} from "react-dom";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Compteur ()
{
    const defaultSeconds = 300;
    const [seconds, setSeconds] = useState(defaultSeconds);
    const [currentSeconds, setCurrentSeconds] = useState(defaultSeconds);
    const [active, setActive] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function CloseModal(startTimer) {
        setModalIsOpen(false);

        if(!startTimer)
            return;

        Reset();
        setActive(true);
    }

    useEffect(() => {
        let interval = null;
        if (active) {
        if(currentSeconds == 0)
        {
            setActive(false);
            setModalIsOpen(true);
        }else
        {
            interval = setInterval(() => {
                setCurrentSeconds(currentSeconds => currentSeconds -1);
              }, 1000);
        }
         
        } 
        else if (!active && interval != null) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [active, currentSeconds]);


    useEffect(() => {
       setCurrentSeconds(seconds);
      }, [seconds]);

    function IncreaseTime() {
        setSeconds(seconds => seconds+60);
    }
    
    function DecreaseTime() {
        if(seconds >= 120)

        setSeconds(seconds => seconds-60);
    }

    function SwitchState() 
    {
        setActive(active => !active);
    }

    function GetToogleState()
    {
        return (active ? "Stop" : "Start");
    }

    function Reset()
    {
        setActive(false);
        setCurrentSeconds(seconds);
    }

    function GetTimerDisplay()
    {
        let min = Math.floor(currentSeconds / 60);
        let sec = (currentSeconds - (min * 60));
        return `${FormatValue(min)}:${FormatValue(sec)}`
    }

    function FormatValue(value)
    {
        if (value < 10)
            return "0" + value;

        return value;
    }
 
    return <div>
    <h1>{GetTimerDisplay()} </h1>
    <button disabled={active} onClick={() => IncreaseTime()}>+</button>
    <button disabled={active} onClick={() => DecreaseTime()}>-</button>
    <button onClick={() => SwitchState()}>{GetToogleState()}</button>
    <button onClick={() => Reset(false)}>Reset</button>

    <Modal show={modalIsOpen} onHide={() =>CloseModal(false)}>
        <Modal.Header >
            <Modal.Title>Pfiouuu</Modal.Title>
        </Modal.Header>
        <Modal.Body>It's time to take a break !</Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() =>CloseModal(false)}>
                Close
            </Button>
            <Button variant="secondary" onClick={() =>CloseModal(true)}>
                Close and restart timer
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
}

render(
<div>
  <Compteur />
</div>,document.querySelector("#hello-example")
)


