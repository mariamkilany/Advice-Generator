import './App.css';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
import {ImLoop2} from 'react-icons/im'
import { useEffect, useState } from 'react';
import axios from 'axios';




function App() {
  const [quote,setQuote]=useState('');
  const [author,setAuthor]=useState('');
  const [gener,setGener] = useState('');
  const [authorQuotes,setAuthorQuotes]=useState(null)
  const generateQuote = async()=>{
    await axios.get(' https://quote-garden.onrender.com/api/v3/quotes/random').then((res)=>{
    setQuote(res.data.data[0].quoteText)
    setAuthor(res.data.data[0].quoteAuthor)
    setGener(res.data.data[0].quoteGenre)
    setAuthorQuotes(null)
    console.log(res)
  })
  }
  const generateAuthorQoutes = async()=>{
    await axios.get('https://quote-garden.onrender.com/api/v3/quotes',{params:{author}}).then((res)=>{
      setAuthorQuotes(res.data.data)
      console.log(res.data.data)
    })
  }
useEffect(()=>{
  generateQuote()
},[])
  return (
    <>
    <button className='btn random-btn' onClick={generateQuote}>random <ImLoop2/></button>
    
    <div className="advCon">
    {
      authorQuotes === null ? 
      <section className='row'>
        <div className="container py-2 ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-12 col-xl-5"
            style={{display: "flex",justifyContent: "center",alignItems: "center"}}
            >
              <figure className="bg-light p-2"
                style={{borderLeft: ".35rem solid #fcdb5e", borderTop:" 1px solid #eee",
                borderRight: '1px solid #eee', borderBottom:' 1px solid #eee'}}>
                <i className="fas fa-quote-left fa-2x mb-4" style={{color: '#fcdb5e'}}></i>
                <blockquote className="blockquote pb-2">
                  <p>
                    {quote}
                  </p>
                </blockquote>
              </figure>
            </div>
          </div>
        </div>
      </section>
    :
    authorQuotes.map((authQ)=>{
      return(
      <section className='row'>
        <div className="container py-2 ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-md-12 col-xl-5"
            style={{display: "flex",justifyContent: "center",alignItems: "center"}}
            >
              <figure className="bg-light p-2"
                style={{borderLeft: ".35rem solid #fcdb5e", borderTop:" 1px solid #eee",
                borderRight: '1px solid #eee', borderBottom:' 1px solid #eee'}}>
                <i className="fas fa-quote-left fa-2x mb-4" style={{color: '#fcdb5e'}}></i>
                <blockquote className="blockquote pb-2">
                  <p>
                    {authQ.quoteText}
                  </p>
                </blockquote>
              </figure>
            </div>
          </div>
        </div>
      </section>
      )
    })
    }
    <figcaption className="blockquote-footer mb-0" onClick={generateAuthorQoutes}>
      <span className='d-flex flex-column'>
        <span style={{fontSize:'20px'}}>{author}</span> 
        <span style={{fontSize:'15px',paddingTop:'10px'}}>{gener}</span>
      </span>
        <HiOutlineArrowNarrowRight color='white'/>
        </figcaption>
    </div>
    </>
  );
}

export default App;
