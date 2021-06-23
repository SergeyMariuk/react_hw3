import './App.css';
import { useEffect, useReducer, useState } from 'react';

const initialState = {
  step: 1,
  step_1: {
    name: '',
    surname: '',
    email: '',
  },
  step_2: {
    city: '',
    street: '',
    number: '',
  },
  step_3: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgb0huCSe0621Cx94nZtuj2IQ6y2uWZlmM8w&usqp=CAU'
  },
  step_4: {
    psw: '',
    cpsw: '',
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        step: state.step + 1
      }
      case 'PREV_STEP':
        return {
          ...state,
          step: state.step - 1
      }
      case 'CHANGE_STEP_1':
        return {
          ...state,
          step_1: {...state.step_1, ...action.payload}
      }
      case 'CHANGE_STEP_2':
        return {
          ...state,
          step_2: {...state.step_2, ...action.payload}
      }
      case 'CHANGE_STEP_3':
        return {
          ...state,
          step_3: {...state.step_3, ...action.payload}
      }
      case 'CHANGE_STEP_4':
        return {
          ...state,
          step_4: {...state.step_4, ...action.payload}
      }
    default:
      return state;
  }
}

const Step_1 = ({dispatch, values, isDark}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch({type: 'CHANGE_STEP_1', payload: {[name]: value}})
  }
  return (
    <div>
      <label>
        <h3>Name</h3>
        <input value={values.name} type="text" name="name" onChange={handleChange}/>
      </label>
      <label>
        <h3>Surname</h3>
        <input value={values.surname} type="text" name="surname" onChange={handleChange}/>
      </label>
      <label>
        <h3>Email</h3>
        <input value={values.email} type="text" name="email" onChange={handleChange}/>
      </label>
    </div>
  )
}

const Step_2 = ({dispatch, values}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch({type: 'CHANGE_STEP_2', payload: {[name]: value}})
  }
  return (
    <div>
      <label>
        <h3>City</h3>
        <input value={values.city} type="text" name="city" onChange={handleChange}/>
      </label>
      <label>
        <h3>Street</h3>
        <input value={values.street} type="text" name="street" onChange={handleChange}/>
      </label>
      <label>
        <h3>Number of the hous</h3>
        <input value={values.number} type="text" name="number" onChange={handleChange}/>
      </label>
    </div>
  )
}

const Step_3 = ({dispatch, values}) => {
  const [imgUrl, setImgUrl] = useState(values.img)

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImgUrl(fileReader.result)
      dispatch({type: 'CHANGE_STEP_3', payload: {img: fileReader.result}})
    }
    fileReader.readAsDataURL(file)

  }
  return (
    <div>
      <img src={imgUrl} alt="#" />
      <label className="custom-file-upload">
        Upload Photo
        <input  type="file" accept=".jpg, .png, .jpeg" name="img" onChange={handleChange} />
      </label>
    </div>
  )
}

const Step_4 = ({dispatch, values}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch({type: 'CHANGE_STEP_4', payload: {[name]: value}})
  }
  return (
    <div>
      <label>
        <h3>Password</h3>
        <input value={values.psw} type="password" name="psw" onChange={handleChange}/>
      </label>
      <label>
        <h3>Confirm Password</h3>
        <input value={values.cpsw} type="password" name="cpsw" onChange={handleChange}/>
      </label>
    </div>
  )
}

const Step_5 = ({state}) => {
  return (
    <div>
      <h1>Thank you for registration</h1>
      <img src={state.step_3.img} alt="" />
      <h3>Contact Information:</h3>
      <p>Name: {state.step_1.name}</p>
      <p>Surname: {state.step_1.surname}</p>
      <p>Email: {state.step_1.email}</p>
      <p>City: {state.step_2.city}</p>
      <p>Street: {state.step_2.street}</p>
      <p>Number of the hous: {state.step_2.number}</p>
    </div>
  )
}



const Theme = ({isDark, setIsDark}) => {
  const handleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="theme">
      <label>
        <input type="checkbox" name="theme" onChange={handleTheme}/>
        <span>Dark</span>
      </label>
    </div>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDark, setIsDark] = useState(false)

  const handleSubmit = () => {
    let password = false
    if (state.step_4.psw === state.step_4.cpsw) password = true 
    else {
      alert ("Your passwords must match")
      return
    }
    for (let key in state) {
      if (typeof state[key] === 'object'){
        for (let k in state[key]){
          if(!state[key][k]){
            alert ('Please, go back to the previous steps and fill all fields')
            return
          }
        }
      }
    }
    
    if(password) dispatch({type: 'NEXT_STEP'})
  }

  const handleNextStep = () => dispatch({type: 'NEXT_STEP'})
  const handlePrevStep = () => dispatch({type: 'PREV_STEP'})
  
  if(!isDark){

  return (
    <div className="App">
      <Theme isDark={isDark} setIsDark={setIsDark}/>
      <div className="container">
        <div className="main">
        {state.step < 5 && <h1>Step: {state.step}</h1>}
          <div>
            {state.step === 1 && <Step_1 dispatch={dispatch} values={state.step_1} isDark={isDark}/>}
            {state.step === 2 && <Step_2 dispatch={dispatch} values={state.step_2}/>}
            {state.step === 3 && <Step_3 dispatch={dispatch} values={state.step_3}/>}
            {state.step === 4 && <Step_4 dispatch={dispatch} values={state.step_4}/>}
            {state.step === 5 && <Step_5 state={state}/>}
          </div>
        </div>
        {state.step < 5 && <footer>
          {state.step === 1 && <button className="single-button" onClick={handleNextStep}>Next</button>}
          {state.step > 1 && state.step < 5 && <button onClick={handlePrevStep}>Previous</button>}
          {state.step < 4 && state.step > 1 && <button onClick={handleNextStep}>Next</button>}
          {state.step === 4 && <button onClick={handleSubmit}>Submit</button>}
        </footer>}
      </div>
    </div>
  );}
  else{
    return (
      <div className="App dark">
        <Theme isDark={isDark} setIsDark={setIsDark}/>
        <div className="container">
          <div className="main">
          {state.step < 5 && <h1>Step: {state.step}</h1>}
            <div>
              {state.step === 1 && <Step_1 dispatch={dispatch} values={state.step_1} isDark={isDark}/>}
              {state.step === 2 && <Step_2 dispatch={dispatch} values={state.step_2}/>}
              {state.step === 3 && <Step_3 dispatch={dispatch} values={state.step_3}/>}
              {state.step === 4 && <Step_4 dispatch={dispatch} values={state.step_4}/>}
              {state.step === 5 && <Step_5 state={state}/>}
            </div>
          </div>
          {state.step < 5 && <footer>
            {state.step === 1 && <button className="single-button" onClick={handleNextStep}>Next</button>}
            {state.step > 1 && state.step < 5 && <button onClick={handlePrevStep}>Previous</button>}
            {state.step < 4 && state.step > 1 && <button onClick={handleNextStep}>Next</button>}
            {state.step === 4 && <button onClick={handleSubmit}>Submit</button>}
          </footer>}
        </div>
      </div>
    );
  }
}

export default App;
