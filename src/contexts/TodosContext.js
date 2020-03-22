import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import services from "../services";

export const TodosContext = createContext();

function TodosContextProvider(props) {
    const [createdTodos, setCreatedTodos] = useState([]);
    const [chosenTodos, setChosenTodos] = useState([]);
    const [isTodosReady, setIsTodosReady] = useState(false);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            if (auth) {
                const createdRes = await services.query(
                    "todos",
                    "author",
                    "==",
                    auth.id
                );
                if (createdRes) setCreatedTodos(createdRes);
                const chosenRes = await services.query(
                    "todos",
                    "users",
                    "array-contains",
                    auth.id
                );
                if (chosenRes) setChosenTodos(chosenRes);
                setIsTodosReady(true);
            }
        };
        fetchData();
    }, []);
    return (
        <TodosContext.Provider
            value={{ createdTodos, chosenTodos, isTodosReady }}
        >
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;
