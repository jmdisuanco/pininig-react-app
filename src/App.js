import React,{useEffect,useState, Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config'
import service from './pinipig/service'
let infoService = service(`${config.host}/info.json`)

export const  Online = (props)=>{
  let {result, app, version} = props.info
  
  return (
    <div id="Meta" >
         {result === 'Ok' ? 
          <div>
            <div style={{color:'lightgreen'}}>*** Online ***</div>
            <div >Name: <span style={{fontSize:'.8em'}}>{app}</span></div>
            <div >Version: <span style={{fontSize:'.8em'}}>{version}</span></div>
          </div>
      : 
           <div style={{color:'red'}}>*** Pinipig Server is offline ***</div>
      }
    </div>
    
  )
}

function App() {
  const [info,setInfo] = useState({result:'offline'})
  
  
  useEffect( ()=>{
    
    async function pullInfo (){
      let response = await infoService('get','')
     
      setInfo(response)
    }
  
    pullInfo()
  },[])

  useEffect(()=>{
    console.log(info)
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      
        <a
          className="App-link"
          href="https://pinipig.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about this client stack
        </a>
        <a
          className="App-link"
          href="https://pinipig.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Pinipig.js
        </a>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Suspense fallback={<div></div>}>
           <Online info={info} />
        </Suspense>
      </header>
      
    </div>
  );
}

export default App;
