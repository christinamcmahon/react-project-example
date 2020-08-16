import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTodos } from './selectors';
import { addTodoRequest } from './thunks';

const FormContainer = styled.div`
    border-radius: 5px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 4px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 5px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: lightskyblue;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <FormContainer>
            <NewTodoInput
                type="text"
                placeholder="Type your new todo here"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <NewTodoButton
                onClick={() => {
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}>
                Create Todo
            </NewTodoButton>
        </FormContainer>
    );
};

// state is an object that represents the entire redux state
// mapStateToProps takes the state object and returns another 
// object containing pieces that the component needs access to
const mapStateToProps = state => ({
    todos: getTodos(state),
});

// dispatch is a function that allows the components to trigger actions
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);