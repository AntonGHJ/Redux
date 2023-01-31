import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom/client';
import configureStore from './store/store';
import { titleChanged, taskDeleted, completeTask, getTasks, loadTasks, getTaskLoadingStatus, createTask } from './store/task';
import { getError } from './store/errors';

const store = configureStore()

const App = (params) => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTaskLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  const addTask = () =>{
    dispatch(createTask({title: "New task", completed: false}))
  }
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <h1>{error}</h1>
  }
  return <><h1> APP</h1>
  <button style={{color:'red'}} onClick={()=> addTask()} >
        Create Task
  </button>
  <ul>
    {state.map(el=>
    <li key={el.id}>
      <p>{el.title}</p>
      <p>{`Completed: ${el.completed}`}</p>      
      <button onClick={()=> dispatch(completeTask(el.id))}>
        Complete
  </button>
  <button onClick={()=> changeTitle(el.id)}>
        Change Title
  </button>
  <button onClick={()=> deleteTask(el.id)} >
        deleteTask
  </button>
  <hr />
  </li>)}
  </ul>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
);
