"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTodosByUser, createTodo, updateTodo, deleteTodo } from "../lib/db";

interface Todo {
  no: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  userId: string;
}

export default function TodoList({ userId }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, [userId]);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodosByUser(Number(userId));
    setTodos(fetchedTodos);
  };

  const addTodo = async () => {
    if (inputValue.trim() !== "") {
      await createTodo(inputValue, Number(userId));
      setInputValue("");
      fetchTodos();
    }
  };

  const toggleTodo = async (no: number) => {
    const todo = todos.find((t) => t.no === no);
    if (todo) {
      await updateTodo(no, !todo.completed);
      fetchTodos();
    }
  };

  const deleteTodoItem = async (no: number) => {
    await deleteTodo(no);
    fetchTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <Button variant="contained" onClick={addTodo} sx={{ mt: 1 }}>
          Add Todo
        </Button>
      </Box>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => setFilter(newFilter || "all")}
        aria-label="text alignment"
      >
        <ToggleButton value="all" aria-label="all">
          All
        </ToggleButton>
        <ToggleButton value="active" aria-label="active">
          Active
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>
      <List>
        {filteredTodos.map((todo) => (
          <ListItem
            key={todo.no}
            dense
            button
            onClick={() => toggleTodo(todo.no)}
          >
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={todo.text}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodoItem(todo.no)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
