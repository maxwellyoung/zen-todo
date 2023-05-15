'use client'

import React, { useState } from 'react'
import TodoItem from './ToDoItem'

interface Todo {
	id: number
	task: string
}

const TodoList: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [newTask, setNewTask] = useState('')

	const handleAddTodo = () => {
		if (newTask.trim() !== '') {
			const newTodo: Todo = {
				id: Date.now(),
				task: newTask.trim(),
			}

			setTodos([...todos, newTodo])
			setNewTask('')
		}
	}

	const handleUpdateTodo = (id: number, newTask: string) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, task: newTask } : todo
		)

		setTodos(updatedTodos)
	}

	const handleDeleteTodo = (id: number) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id)
		setTodos(updatedTodos)
	}

	return (
		<div className="container mx-auto p-4 ">
			<h1 className="text-3xl font-bold mb-4">Todo List</h1>
			<div className="flex mb-4">
				<input
					type="text"
					className="border rounded px-2 py-1 mr-4 flex-grow focus:outline-none text-black"
					placeholder="Enter a task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
					onClick={handleAddTodo}
				>
					Add
				</button>
			</div>
			{todos.length > 0 ? (
				<ul className="bg-white rounded shadow text-black">
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onUpdate={handleUpdateTodo}
							onDelete={handleDeleteTodo}
						/>
					))}
				</ul>
			) : (
				<p>No todos yet.</p>
			)}
		</div>
	)
}

export default TodoList
