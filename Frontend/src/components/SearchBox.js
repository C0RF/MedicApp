import React, { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'; 
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'es-US'

const SearchBox = (props) => {
  const { placeholder, handlerSearch } = props
  const [name, setName] = useState('');
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    handleListen()
    // eslint-disable-next-line
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      setTimeout(() => {
        if(isListening){
          setIsListening(false);
        }
      }, 2500);

      mic.onend = () => {
        console.log('continuar..')
        mic.start()
      }


    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Microfono detenido')
      }
    }
    mic.onstart = () => {
      console.log('Microfono encendido')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setName(transcript.replace(/[&\\#,+()$~%.'":*?<>{}]/g, ""))
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handlerSearch(name)
  };
  return (
    <>
        { SpeechRecognition ? 
        <FormControl sx={{ m: 0, width: '100%', background: 'white'}} variant="filled">
            <OutlinedInput
                sx={{ 
                  borderColor: "#0073A4", 
                }}
                color="primary" //focused
                type='text'
                placeholder={placeholder}
                value={name}
                onChange={handleChange}
                endAdornment={
                <InputAdornment position="end">
                    <Divider sx={{ height: 35, m: 1.5 }} orientation="vertical" />
                    <IconButton
                      sx={{ 
                        color: "#0073A4", 
                      }}
                      onClick={() => setIsListening(prevState => !prevState)}
                      edge="end"
                      className="primary"
                    >
                      {isListening ? <MicIcon /> : <MicNoneIcon />}
                    </IconButton>
                    <div style={{margin: "3px", height: "35"}} />
                    <IconButton
                      sx={{ 
                        color: "#0073A4", 
                      }}
                      onClick={submitHandler}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                </InputAdornment>
                }
            />
            </FormControl>
        : 
        <h3>
            Su navegador no soporta el módulo SpeechRecognition, use otro navegador
        </h3>
        }
    </>
  );
}


export default SearchBox;