import React, { useState } from 'react'

interface Todo {
	id: number
	task: string
}

interface TodoItemProps {
	todo: Todo
	onUpdate: (id: number, newTask: string) => void
	onDelete: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
	const [editMode, setEditMode] = useState(false)
	const [task, setTask] = useState(todo.task)

	const handleToggleEditMode = () => {
		setEditMode(!editMode)
	}

	const handleUpdateTask = () => {
		if (task.trim() !== '') {
			onUpdate(todo.id, task.trim())
			setEditMode(false)
		}
	}

	const handleDeleteTask = () => {
		onDelete(todo.id)
	}

	return (
		<li className="flex items-center justify-between py-2 px-4 border-b">
			{editMode ? (
				<input
					type="text"
					className="border rounded px-2 py-1 flex-grow focus:outline-none text-black"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
			) : (
				<p className="flex-grow text-black">{todo.task}</p>
			)}
			<div className="flex items-center">
				{editMode ? (
					<button
						className="bg-green-500 text-white px-2 py-1 rounded mr-2 focus:outline-none"
						onClick={handleUpdateTask}
					>
						Update
					</button>
				) : (
					<button
						className="bg-blue-500 text-white px-2 py-1 rounded mr-2 focus:outline-none"
						onClick={handleToggleEditMode}
					>
						Edit
					</button>
				)}
				<button
					className="bg-red-500 text-white px-2 py-1 rounded focus:outline-none"
					onClick={handleDeleteTask}
				>
					Delete
				</button>
			</div>
		</li>
	)
}

export default TodoItem
