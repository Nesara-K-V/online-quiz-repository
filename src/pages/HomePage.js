import React, { useState } from 'react';
import '../App.css';
import SelectFields from '../components/SelectFields';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setPlayerName } from '../redux/actions';

const HomePage = () => {
    const { response, error, loading } = useAxios({ url: "/api_category.php" });
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        dispatch(setPlayerName(name));
        event.preventDefault();
        navigate('/quizgame');
    };

    const difficulties = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
    ];

    const typeOptions = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True/False" },
    ];

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        console.error(error);
        return null;
    }

    return (
        <div className='bg'>
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
                <SelectFields label="Select Category" options={response?.trivia_categories || []} />
                <SelectFields label="Select Difficulty" options={difficulties} />
                <SelectFields label="Type" options={typeOptions} />
                <button type='submit' className='submit-btn'>START QUIZ</button>
            </form>
        </div>
        </div>
    );
}

export default HomePage;
