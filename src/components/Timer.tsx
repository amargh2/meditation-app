import { IntervalHistogram } from 'perf_hooks';
import React from 'react'
import { useState, useEffect } from 'react';
import internal from 'stream';

const Timer = (props:any) => {
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [userSelectedMinutes, setUserSelectedMinutes] = useState(0)
    const [userSelectedHours, setUserSelectedHours] = useState(0)

  //convert the minutes selected to hours and minutes
    function timeConvert(n:number) {
      var num = n;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours > 0 ? rhours + ":" + rminutes + ':' + seconds : rminutes + ':' + (seconds === 0 ? '00' :seconds);
      }
      

    const reset = () => {
        setSeconds(0)
        setMinutes(0)
    }

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? (<div className='flex'> 
                <form className='flex-col flex gap-3'>
                 <label htmlFor='minutes'>How long would you like to meditate?</label>
                   <input className='rounded-full text-center' 
                    type='number' 
                    id='minutes' 
                    onChange={(e) => setUserSelectedMinutes(parseInt(e.target.value))}
                    placeholder='Minutes'/>
                   <button className='p-2 bg-blue-100 rounded-full' 
                    onClick={()=> setMinutes(userSelectedMinutes) && setUserSelectedHours(userSelectedHours)}>
                      Submit
                    </button>
                </form>
              </div>)
            : <div className='flex items-center gap-2 flex-col'>
                <h1>{timeConvert(minutes)}</h1>
                <button className='py-2 px-4 bg-blue-100 rounded-full' onClick={() => reset()}>Stop</button>
            </div>  
        }

        </div>
    )
}

export default Timer;