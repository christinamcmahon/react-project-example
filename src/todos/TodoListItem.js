import React from 'react';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 5px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 2px 4px grey;
`;

export const getBorderStyleForDate = (startingDate, currentDate) =>
    (startingDate > new Date(currentDate - 86400000 * 5) ? 'none' : '2px solid red')

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;

const CompletedButton = styled(Button)`
    background-color: lightgreen;
`;

const RemoveButton = styled(Button)`
    background-color: lightcoral;
    margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
    return (
        <Container createdAt={todo.createdAt}>
            <h3>{todo.text}</h3>
            <p>
                Created at:&nbsp;
                {(new Date(todo.createdAt)).toLocaleDateString()}
            </p>
            <ButtonsContainer>
                {todo.isCompleted ? null :
                    <CompletedButton
                        onClick={() => onCompletedPressed(todo.id)}>
                        Mark As Completed
                    </CompletedButton>
                }
                <RemoveButton
                    onClick={() => onRemovePressed(todo.id)}>
                    Remove
                </RemoveButton>
            </ButtonsContainer>
        </Container>
    );
}

export default TodoListItem;