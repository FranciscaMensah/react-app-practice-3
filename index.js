import React from 'react';
import ReactDOM from 'react-dom/client';
import Confetti from 'react-confetti';
import './index.css';
import { nanoid } from 'nanoid';
import Die from './Die';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App(){
    const [dice, setDice] = React.useState(allNewDice);
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(()=>{
        // console.log('State changed')
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);

        if (allHeld && allSameValue){
            setTenzies(true);
            console.log('Die is held')
        }
        
    }, [dice])

    function generateNewDie(){
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    function allNewDice(){
        const newDice = [];
        
        for(let i = 0; i < 10; i += 1){
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    const diceElements = dice.map(die => {
        return <Die 
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                onClick={()=> {holdDice(die.id)}}
                />
    })

    function rollDice(){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld === true?
            {...die}:
            generateNewDie();
        }));
    }

    function holdDice(id){
       setDice(oldDice => oldDice.map(die => {
        return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
       }))
    }

    function resetDice(){
        setTenzies(false);
        setDice(allNewDice());
    }

    return (
        <main>
            <div className='caption'>
                <h1 className='title'>Tenzies Game</h1>
                <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className='dice-container'>
                {diceElements}
            </div>
            <div className='alert-box'>
                {tenzies && <Confetti/>}
                {tenzies && 'You Win!'}
            </div>
            <button onClick={tenzies ? resetDice : rollDice}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main> 
    )
}

root.render(<App/>)