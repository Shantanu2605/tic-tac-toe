import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [turn, setturn] = useState(false);
  const [array, setarray] = useState(Array(9).fill(null))
  const [win, setwin] = useState(false)
  const [player1, setplayer1] = useState(0)
  const [player2, setplayer2] = useState(0)
  const [draw, setdraw] = useState(false)

  const setlocal1= ()=>{
    const newscore= parseInt(player1)+1;
    setplayer1(newscore);
    localStorage.setItem("Player 1", newscore);
  }

   const setlocal2= ()=>{
     const newscore= parseInt(player2)+1;
    setplayer2(newscore);
    localStorage.setItem("Player 2", newscore);
    
  }

  const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

const reset=()=>{
  let c= confirm("Are you sure you want to reset?");
  if(c){

    setplayer1(0);
    setplayer2(0);
    localStorage.clear("Player 1");
    localStorage.clear("Player 2");
    toast.info('Points have been reset!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }
}

const setturnrandom= ()=>{
   const value= Math.random();
  if(value>0.5){
    setturn(true);
  }
  else{
    setturn(false);
  }

}

useEffect(() => {
  setturnrandom();
 
  
}, [])

const playagain= ()=>{
  const arr= document.getElementsByClassName("playbox");
  for (const element of arr) {
    element.innerHTML= '';
    
  }
  setarray(Array(9).fill(null));
  setwin(false);
  setdraw(false);
  setturnrandom();
}


  useEffect(() => {
    let track=0;
    for (const element of array) {
      if(element==0 || element==1){
        track++;
      }
      if(track==9 && !win){
        setdraw(true);
      }
      
    }
    const score1= localStorage.getItem("Player 1");
    if(score1==null){
      setplayer1(0);
    }
    else{

      setplayer1(score1);
    }
    const score2= localStorage.getItem("Player 2");
    if(score2==null){
      setplayer2(0);
    }
    else{

      setplayer2(score2);
    }

    WINNING_COMBINATIONS.forEach(element => {
      const [a,b,c]= element;
      if(array[a]==array[b]&& array[b]==array[c] && array[c]==0){
        setlocal1();
        toast.success('Player 1 Won!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setwin(true);
        setarray(Array(9).fill(null))

      }
      else if(array[a]==array[b]&& array[b]==array[c] && array[c]==1){
        setlocal2();
        toast.success('Player 2 Won!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setwin(true);
         setarray(Array(9).fill(null))
        
      }
      
    });

   
  })
  

  const handlemove= (e)=>{
    console.log(e.target)
    if(win || draw){
      toast.error('Game has finished already!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
    else if(e.target.innerHTML){
      console.log("Invalid move");
    }
    else{
      const newarr= array;
      if(turn){
        e.target.innerHTML= '<img src="cross.svg" style="width:60px;" alt="" />'
        
        newarr[parseInt(e.target.id)]=1;
        setturn(!turn);
        setarray(newarr)
        console.log(newarr)
      }
      else{
        e.target.innerHTML= '<img src="circle.svg" style="width:60px;" alt="" />'
        newarr[parseInt(e.target.id)]=0;
        setarray(newarr);
        setturn(!turn);
        console.log(newarr)

      }
      setturn(!turn);
    }
  }

  return (
   <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
   <Navbar/>
   
   <div className='mx-auto text-center font-[Ubuntu] text-xl mt-2'>Play with friends</div>
   <div className="w-[80%] max-lg:flex-col max-lg:gap-4 flex justify-between mx-auto mt-5">
       <div className="box w-full md:w-[45%] bg-black flex justify-between text-white font-[Orbitron]">
          <div className='flex gap-3 w-full'><img src="person.svg" alt="" />
           <div className="flex flex-col justify-center"><p>Player 1</p><p>O Marker</p></div></div>
          <div className="flex flex-col bg-[#1d3fff] items-center px-3 py-2"><p className='text-2xl'>{player1}</p><p className='text-xs'>Points</p></div>

        </div>
        <div className="box w-full md:w-[45%] bg-black flex justify-between text-white font-[Orbitron]">
          <div className='flex gap-3 w-full'><img src="person.svg" alt="" />
           <div className="flex flex-col justify-center"><p>Player 2</p><p>X Marker</p></div></div>
          <div className="flex flex-col bg-red-700 items-center px-3 py-2"><p className='text-2xl'>{player2}</p><p className='text-xs'>Points</p></div>

        </div>
   </div>
   {(draw && !win) && <div className='text-white px-3 py-1.5 mx-auto mt-3 cursor-default flex items-center gap-1 w-fit bg-slate-800'>Game Drawn!</div>}
  {win? <div className='text-white px-3 py-1.5 mx-auto mt-3 cursor-default flex items-center gap-1 w-fit bg-green-800'>CONGRATULATIONS!</div>: <div className={`w-fit ${turn? "bg-red-700": "bg-[#1d3fff]"} ${draw && "hidden"} text-white px-3 py-1.5 mx-auto mt-3 cursor-default flex items-center gap-1`}>Player {turn? "2": "1"} Turn <img className='down' src="down.svg" alt="" /></div>} 
   <div className="bg-black mt-4 w-[90%] md:w-[50%] mx-auto flex flex-col items-center">
      <div className='flex justify-around w-full border-1 shadow shadow-[orange]'>
        <div id='0' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='1' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='2' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
      </div>
      <div className='flex justify-around w-full border-1 shadow shadow-[orange]'>
        <div id='3' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='4' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='5' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
      </div>
       <div className='flex justify-around w-full border-1 shadow shadow-[orange]'>
        <div id='6' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='7' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
        <div id='8' className="playbox h-[100px] w-[33.6%] justify-center flex items-center border border-white " onClick={e=> {handlemove(e)}}></div>
      </div>
   </div>

    <div className="button pb-[60px] pb flex flex-col gap-4 w-[50%] mx-auto mt-4 justify-center items-center">{(win || draw)&&<button className='bg-[#219b21] cursor-pointer hover:bg-[#0c560c] text-white px-2 py-2 font-[Roboto] rounded-md' onClick={playagain}>Play Again</button> }
<button className='bg-red-600 text-white w-fit flex items-center px-2 font-[Roboto] hover:bg-[#bb0606] py-1 rounded-md cursor-pointer' onClick={reset}>Reset Points <img src="reset.svg" alt="" /></button>
</div>
<Footer/>
   </>
  )
}

export default App
