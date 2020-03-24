import React, { useState, useEffect, useContext } from "react";
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

function CreateTodo(props) {
    const { auth } = useContext(AuthContext);
    const topics = ["Learning websites", "Crafting", "Cooking"];
    const [todoInfo, setTodoInfo] = useState({
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
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        steps: {}
    });
    useEffect(() => {
        var steps = {};
        for (let key in todoInfo.steps) {
            steps[key] = "";
        }
        setErrors({
            title: "",
            description: "",
            steps: steps
        });
    }, [todoInfo]);

    const [files, setFiles] = useState({
        img: null,
        steps: {}
    });
    const [isTodoInfoReady, setIsTodoInfoReady] = useState(false);
    const [uploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);

    useEffect(() => {
        const todoId = props.match.params.todoId;
        const fetchData = async () => {
            const todoInfoRes = await services.render("todos", todoId);
            if (todoInfoRes) {
                setTodoInfo(todoInfoRes);
                setIsTodoInfoReady(true);
            } else {
                props.history.push("/yourtodos/1");
            }
        };
        if (todoId) {
            fetchData();
        } else {
            setIsTodoInfoReady(true);
        }
    }, []);

    const handleFormChange = e => {
        setUploadResult(null);
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
            setTodoInfo({
                ...todoInfo,
                steps
            });
        }
    };

    const handleFormSubmit = async () => {
        setUploadResult(null);
        setIsUploading(true);
    };
    const validation = todoObj => {
        const validation = errors;
        validation.isValid = true;
        if (todoObj.title === "") {
            validation.title = "Please input your todo's title";
            validation.isValid = false;
        }
        if (todoObj.description === "") {
            validation.description = "Please input your todo's description";
            validation.isValid = false;
        }
        for (let index in todoObj.steps) {
            if (todoObj.steps[index].content === "") {
                validation.isValid = false;
                validation.steps[index] =
                    "Please input the content of this step or delete it";
            }
        }
        if (validation.isValid) {
            return true;
        } else {
            delete validation.isValid;
            setErrors(validation);
            setIsUploading(false);
            return false;
        }
    };

    useEffect(() => {
        if (uploading === true) {
            const upload = async () => {
                const todoObj = {
                    ...todoInfo,
                    author: auth.id,
                    createdAt: new Date()
                };
                console.log(todoObj);
                const boolean = validation(todoObj);
                if (boolean) {
                    if (todoInfo.imgUrl === "" && files.img) {
                        const file = files.img;
                        const fileName = new Date() + "-" + file.name;
                        const res = await services.uploadFile(
                            "image",
                            fileName,
                            file
                        );
                        if (res.isSuccess) {
                            todoObj.imgUrl = res.url;
                        } else {
                            setUploadResult(res.error);
                        }
                    }
                    for (let index in todoInfo.steps) {
                        const step = todoInfo.steps[index];
                        if (!step.imgUrl && files.steps[index]) {
                            const file = files.steps[index];
                            const fileName = new Date() + "-" + file.name;
                            const res = await services.uploadFile(
                                "image",
                                fileName,
                                file
                            );
                            if (res.isSuccess) {
                                todoObj.steps[index].imgUrl = res.url;
                            } else {
                                setUploadResult(res.error);
                            }
                        }
                    }
                    delete todoObj.id;
                    if (props.match.params.todoId) {
                        await services.update(
                            "todos",
                            props.match.params.todoId,
                            todoObj
                        );
                    } else {
                        await services.create("todos", todoObj);
                    }
                    setIsUploading(false);
                    setUploadResult("Upload Succeed");
                }
            };
            upload();
        }
    }, [uploading]);
    if (!auth) return <Redirect to="/signin" />;
    return isTodoInfoReady ? (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <Title todoInfo={todoInfo} handleFormChange={handleFormChange} />

            <div className="container red-text"> {errors.title} </div>

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
                errors={errors}
                handleImgChange={handleImgChange}
                files={files}
            />

            <div className="divider"></div>

            <StepList
                todoInfo={todoInfo}
                errors={errors}
                addStep={addStep}
                deleteStep={deleteStep}
                files={files}
                handleStepChange={handleStepChange}
                handleImgChange={handleImgChange}
            />

            <Publish
                handleFormSubmit={handleFormSubmit}
                uploading={uploading}
                uploadResult={uploadResult}
            />
        </div>
    ) : (
        <Loader />
    );
}

export default CreateTodo;
