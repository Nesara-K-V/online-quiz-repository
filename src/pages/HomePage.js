import React, { useState } from 'react';
import '../App.css';
import SelectFields from '../components/SelectFields';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setPlayerName } from '../redux/actions';



const HomePage = () => {
    const { response, error, loading } = useAxios({ url: "/api_category.php" })
    console.log(response)
    const [name, setName] = useState('');
    const dispatch=useDispatch();
    

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    
    const navigate = useNavigate();

    if (loading) {
        return (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        );
      }

      if (error) {
        return (
          console.log(error)
        );
      }

    

    const handleSubmit = (event) => {
        dispatch(setPlayerName(name))
        event.preventDefault();
        navigate('/quizgame');
        // You can add additional form submission logic here
    };

    const difficulties = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
        ]

    const typeOptions = [
        { id: "multiple", name: "Multiple Choise" },
        {id:'boolean',name:"True/False"},
    ]

    return (
        
        <div className='container'>
            <h2>Create a Quiz Game</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={handleNameChange}
                        placeholder='Enter your name'
                        required
                    />
                </div>
                <SelectFields label="Select Category" options={response.trivia_categories} />
                <SelectFields label="Select Difficulty" options={difficulties} />
                <SelectFields label="Type" options={typeOptions} />


                <button type='submit' className='submit-btn'>START QUIZ</button>
            </form>
        </div>
    );
}

export default HomePage;
