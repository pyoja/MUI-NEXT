"use client";

import React, { useState } from "react";
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
import useSWR from "swr";

interface Todo {
  no: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  userId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TodoList({ userId }: TodoListProps) {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    data: todos,
    error,
    mutate,
  } = useSWR(`/api/todos?userId=${userId}`, fetcher);

  const addTodo = async () => {
    if (inputValue.trim() !== "") {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue, userId }),
      });
      setInputValue("");
      mutate();
    }
  };

  const toggleTodo = async (todo: Todo) => {
    await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todo.no, completed: !todo.completed }),
    });
    mutate();
  };

  const deleteTodoItem = async (todo: Todo) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todo.no }),
    });
    mutate();
  };

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo: Todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "active") return !todo.completed;
        return true;
      })
    : [];

  if (error) return <div>Failed to load</div>;
  if (!todos) return <div>Loading...</div>;

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
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
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
        {filteredTodos.map((todo: Todo) => (
          <ListItem key={todo.no} dense button onClick={() => toggleTodo(todo)}>
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
                onClick={() => deleteTodoItem(todo)}
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
