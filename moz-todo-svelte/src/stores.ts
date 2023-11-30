// stores.ts

// imports
import { writable } from "svelte/store";
import { localStore } from "./localStore";
import type { TodoType } from "./types/todo.type";

// export the alert
export const alert = writable<string>("Welcome to the To-Do list app!");

// the initialTodos
const initialTodos: TodoType[] = [
	{ id: 1, name: "Visit MDN web docs", completed: true },
	{ id: 2, name: "Complete the Svelte Tutorial", completed: false },
];

// export the initialTodos
export const todos = localStore<TodoType[]>("mdn-svelte-todo", initialTodos);