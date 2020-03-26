import React, { useState, useContext, useCallback } from "react";
import FilterBar from "../layout/FilterBar";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../layout/Loader";
import { Redirect } from "react-router-dom";
import StepList from "./StepList";
import Publish from "./Publish";
import Description from "./Description";
import Topic from "./Topic";
import Title from "./Title";
import useUploadTodo from "../hooks/useUploadTodo";
import useFetchData from "../hooks/useFetchData";

function CreateTodo(props) {
    const { auth } = useContext(AuthContext);

    const topics = ["Learning websites", "Crafting", "Cooking"];

    const fetchFunc = useCallback(async () => {
        if (props.match.params.todoId) {
            console.log(props.match.params.todoId);
            const todoId = props.match.params.todoId;
            const res = await services.render("todos", todoId);
            if (res) {
                return res;
            } else {
                props.history.push("/yourtodos/1");
            }
        }
    }, [props.match.params.todoId, props.history]);

    const [
        { data, isLoading, error },
        setTodoInfo,
        setIsLoading
    ] = useFetchData(
        {
            title: "",
            type: "Learning websites",
            description: "",
            imgUrl: "",
            steps: {
                1: {
                    content: "",
                    imgUrl: ""
                }
            },
            author: "",
            createdAt: ""
        },
        fetchFunc
    );
    const todoInfo = data;

    const [files, setFiles] = useState({
        img: null,
        steps: {}
    });

    const [
        { isUploading, validation, uploadResult },
        setIsUploading,
        setValidation,
        setUploadResult
    ] = useUploadTodo(auth, todoInfo, files, props.match.params.todoId);

    const handleFormChange = e => {
        setUploadResult(null);
        setValidation({
            title: "",
            description: "",
            steps: {}
        });
        setTodoInfo({
            ...todoInfo,
            [e.target.id]: e.target.value
        });
    };

    const handleImgChange = (e, index = null) => {
        setUploadResult(null);
        if (index === null) {
            setFiles({
                ...files,
                img: e.target.files[0]
            });
            setTodoInfo({
                ...todoInfo,
                imgUrl: ""
            });
        } else {
            setFiles({
                ...files,
                steps: {
                    ...files.steps,
                    [index]: e.target.files[0]
                }
            });
            if (todoInfo.steps[index].imgUrl) {
                setTodoInfo({
                    ...todoInfo,
                    steps: {
                        ...todoInfo.steps,
                        [index]: {
                            ...todoInfo.steps[index],
                            imgUrl: ""
                        }
                    }
                });
            }
        }
    };

    const handleStepChange = (e, index = null) => {
        setUploadResult(null);
        setValidation({
            title: "",
            description: "",
            steps: {}
        });
        setTodoInfo({
            ...todoInfo,
            steps: {
                ...todoInfo.steps,
                [index]: {
                    ...todoInfo.steps[index],
                    content: e.target.value
                }
            }
        });
    };

    const addStep = () => {
        var newIndex = Number(Object.keys(todoInfo.steps).length) + 1;
        newIndex = newIndex.toString();
        setValidation({
            title: "",
            description: "",
            steps: {}
        });
        setTodoInfo({
            ...todoInfo,
            steps: {
                ...todoInfo.steps,
                [newIndex]: {
                    content: "",
                    imgUrl: ""
                }
            }
        });
        setFiles({
            ...files,
            steps: {
                ...files.steps,
                [newIndex]: ""
            }
        });
    };

    const deleteStep = index => {
        if (Object.keys(todoInfo.steps).length > 1) {
            var steps = {};
            var i = 1;
            for (let key in todoInfo.steps) {
                if (key !== index) {
                    steps[i.toString()] = todoInfo.steps[key];
                    i++;
                }
            }
            setValidation({
                title: "",
                description: "",
                steps: {}
            });
            setTodoInfo({
                ...todoInfo,
                steps
            });
        }
    };

    const handleFormSubmit = () => {
        setUploadResult(null);
        setIsUploading(true);
    };

    if (!auth) return <Redirect to="/signin" />;
    if (isLoading) return <Loader />;
    if (error) return <div>Something went wrong...!</div>;
    return (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <Title todoInfo={todoInfo} handleFormChange={handleFormChange} />

            <div className="container red-text"> {validation.title} </div>

            <Topic>
                <FilterBar
                    title={"topics"}
                    options={topics}
                    multiple={false}
                    id={"type"}
                    value={todoInfo.type}
                    onChange={handleFormChange}
                />
            </Topic>

            <div className="divider"></div>

            <Description
                todoInfo={todoInfo}
                handleFormChange={handleFormChange}
                validation={validation}
                handleImgChange={handleImgChange}
                files={files}
            />

            <div className="divider"></div>

            <StepList
                todoInfo={todoInfo}
                validation={validation}
                addStep={addStep}
                deleteStep={deleteStep}
                files={files}
                handleStepChange={handleStepChange}
                handleImgChange={handleImgChange}
            />

            <Publish
                handleFormSubmit={handleFormSubmit}
                uploading={isUploading}
                uploadResult={uploadResult}
            />
        </div>
    );
}

export default CreateTodo;
