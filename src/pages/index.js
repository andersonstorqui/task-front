import React, { useState, useEffect } from 'react';
import { Container, Content, Input, Button, Form, H1,ButtonInput } from './style';

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTask, completed: false }),
      });

      if (response.ok) {
        fetchTasks(); 
        setNewTask(''); 
      } else {
        console.error('Erro ao adicionar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  
  const updateTask = async (e) => {
    e.preventDefault();
    if (editTaskDescription.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${editTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: editTaskDescription }),
      });

      if (response.ok) {
        fetchTasks(); 
        setEditTaskId(null); 
        setEditTaskDescription(''); 
      } else {
        console.error('Erro ao atualizar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks(); 
      } else {
        console.error('Erro ao deletar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        fetchTasks(); 
      } else {
        console.error('Erro ao atualizar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      <H1>Digite sua tarefa</H1>
      <Content>
        {editTaskId ? (
          <Form onSubmit={updateTask}>
            <Input
              type="text"
              placeholder="Editar tarefa"
              value={editTaskDescription}
              onChange={(e) => setEditTaskDescription(e.target.value)}
            />
            <Button type="submit">Atualizar</Button>
            <Button onClick={() => setEditTaskId(null)}>Cancelar</Button>
          </Form>
        ) : (
          <Form onSubmit={addTask}>
            <Input
              type="text"
              placeholder="Digite aqui sua tarefa"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <ButtonInput type="submit">Enviar</ButtonInput>
          </Form>
        )}
      </Content>
      <div>
        <H1>Aqui estão suas tarefas!</H1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => toggleTaskCompletion(task.id, task.completed)}
              >
                {task.description}
              </span>
              <Button onClick={() => {
                setEditTaskId(task.id);
                setEditTaskDescription(task.description);
              }}>
                Editar
              </Button>
              <Button onClick={() => deleteTask(task.id)}>Deletar</Button>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Page;
