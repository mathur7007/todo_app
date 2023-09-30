import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
	const [todos, setTodos] = useState(() => {
		return JSON.parse(localStorage.getItem("TodoItems")) || [];
	});

	const todoName = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (todoName.current.value === "") return;

		setTodos((lastTodos) => {
			let newvalue = todoName.current.value;
			todoName.current.value = "";
			return [...lastTodos, { id: crypto.randomUUID(), title: newvalue, completed: false }];
		});
	};

	const toggleTodo = (id, completed) => {
		setTodos((lastTodos) => {
			return lastTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}
				return todo;
			});
		});
	};

	const deleteTodo = (id) => {
		setTodos((lastTodos) => {
			return lastTodos.filter((todo) => todo.id !== id);
		});
	};

	useEffect(() => {
		localStorage.setItem("TodoItems", JSON.stringify(todos));
	}, [todos]);

	return (
		<>
			<form action="" className="new-item-form" onSubmit={handleSubmit}>
				<div className="form-row ">
					<label htmlFor="todoName">add list</label>
					<input ref={todoName} type="text" id="todoName" name="todoName" autoComplete="off" />
				</div>
				<button type="submit" className="btn">
					Add
				</button>
			</form>
			<h1 className="header">Todo List</h1>
			<ul className="list">
				{todos.length === 0 && "No todos"}
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<label>
								<input type="checkbox" onChange={(e) => toggleTodo(todo.id, e.target.checked)} checked={todo.completed} />
								{todo.title}
							</label>
							<button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default App;
