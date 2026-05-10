import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('task')) || []
    })

    const [search, setSearch] = useState('')
    const [task, setTask] = useState('')

    const tasksFilter = tasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        })
    }, [])

    const handleAdd = () => {
        if (task.trim() === '') return

        const newTask = {
            id: Date.now(),
            text: task,
            done: false,
        }

        setTasks([newTask, ...tasks])
        setTask('')
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleDone = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? { ...task, done: !task.done }
                    : task
            )
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-5">
            <div className="max-w-2xl mx-auto">

                <div
                    data-aos="zoom-in"
                    className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20"
                >
                    <h1 className="text-2xl sm:text-4xl font-bold text-center text-white mb-2">
                        TO-DO LIST
                    </h1>

                    <p className="text-center text-gray-300 mb-6 text-sm sm:text-base">
                        You have {tasks.length} tasks
                    </p>


                    <div className="flex flex-col sm:flex-row gap-3 mb-6">

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search tasks..."
                            className="flex-1 px-4 py-3 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
                        />

                        <input
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleAdd()
                            }
                            type="text"
                            placeholder="Enter your task..."
                            className="flex-1 px-4 py-3 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
                        />



                        <button
                            onClick={handleAdd}
                            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                            ADD
                        </button>
                    </div>


                    <div className="space-y-3 sm:space-y-4 max-h-[450px] overflow-y-auto pr-1 sm:pr-2">

                        {tasks.length === 0 ? (
                            <div
                                data-aos="fade-up"
                                className="text-center text-gray-300 py-10 text-sm sm:text-base"
                            >
                                No tasks yet 👀
                            </div>
                        ) : (
                            tasksFilter.map((task) => (
                                <div
                                    key={task.id}
                                    data-aos="fade-up"
                                    className="bg-white/10 border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md"
                                >
                                    <h3
                                        className={`text-base sm:text-lg font-medium transition-all duration-300 break-words ${task.done
                                            ? 'line-through text-green-400'
                                            : 'text-white'
                                            }`}
                                    >
                                        {task.text}
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() =>
                                                toggleDone(task.id)
                                            }
                                            className={`px-3 sm:px-4 py-2 rounded-xl text-white font-medium transition-all duration-300 text-sm sm:text-base ${task.done
                                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                                : 'bg-green-500 hover:bg-green-600'
                                                }`}
                                        >
                                            {task.done ? 'Pending' : 'Done'}
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                            className="px-3 sm:px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 text-sm sm:text-base"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}