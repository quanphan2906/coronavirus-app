import React, { useState, useEffect, useContext } from "react";
import FilterBar from "../whatTodo/FilterBar";
import Step from "./Step";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";

function CreateTodo(props) {
    const topics = ["Learning websites", "Crafting", "Cooking"];
    const { auth } = useContext(AuthContext);
    const [todoInfo, setTodoInfo] = useState({
        title: "",
        type: "",
        description: "",
        imgUrl: "",
        steps: {
            1: {
                content: "",
                imgUrl: ""
            }
        },
        author: "",
        createdAt: "",
        users: []
    });
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
                props.history.push("/yourtodos/created/1");
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

    const handleFormSubmit = async () => {
        setUploadResult(null);
        setIsUploading(true);
    };
    useEffect(() => {
        if (uploading === true) {
            const upload = async () => {
                const todoObj = {
                    ...todoInfo,
                    author: auth.id,
                    createdAt: new Date()
                };
                // TODO: Do form validation
                if (todoInfo.imgUrl === "") {
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
                    if (!step.imgUrl) {
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
            };
            upload();
        }
    }, [uploading]);

    useEffect(() => {
        console.log("todoInfo", todoInfo);
        console.log("files", files);
    });

    return isTodoInfoReady ? (
        <div className="create-todo col s10 offset-m1 offset-l1">
            <div className="container todo-title-wrapper white lighten-3 z-depth-2">
                <div className="input-field">
                    <textarea
                        id="title"
                        className="materialize-textarea"
                        placeholder="Set the title of your todo here"
                        value={todoInfo.title}
                        onChange={handleFormChange}
                    />
                </div>
            </div>

            <section className="summary-wrapper row section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    Choose your topic
                </div>
                <div className="col l4 offset-l1">
                    <FilterBar
                        title={"topics"}
                        options={topics}
                        multiple={false}
                        id={"type"}
                        value={todoInfo.type}
                        onChange={handleFormChange}
                    />
                </div>
            </section>

            <div className="divider"></div>

            <section className="description-wrapper row section">
                <div className="col l5 offset-l1">
                    <div className="title pink-text text-darken-2 section">
                        Description
                    </div>
                    <div className="input-field">
                        <textarea
                            className="content materialize-textarea"
                            placeholder="Some words to describe your brilliant idea"
                            id="description"
                            value={todoInfo.description}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>
                <div className="col l1 offset-l1">
                    <input type="file" onChange={handleImgChange} />
                    <img
                        src={
                            todoInfo.imgUrl
                                ? todoInfo.imgUrl
                                : files.img
                                ? URL.createObjectURL(files.img)
                                : "https://via.placeholder.com/150"
                        }
                        alt=""
                    />
                </div>
            </section>

            <div className="divider"></div>

            <section className="steps-wrapper section">
                <div className="title pink-text text-darken-2 col l4 offset-l1">
                    Steps
                </div>
                <div className="steps-container">
                    {Object.entries(todoInfo.steps).map(([key, value]) => (
                        <Step
                            key={key}
                            isAuthor={true}
                            step={value}
                            index={key}
                            file={files.steps[key]}
                            onStepChange={handleStepChange}
                            onImgChange={handleImgChange}
                        />
                    ))}
                </div>
                <div className="container btn-add-container">
                    <button
                        className="btn btn-floating pink right"
                        onClick={addStep}
                    >
                        <i className="material-icons"> add </i>
                    </button>
                </div>
            </section>

            <div className="section center">
                <button className="btn pink" onClick={handleFormSubmit}>
                    {!uploading ? (
                        <>
                            Publish <i className="material-icons right">send</i>
                        </>
                    ) : (
                        <>Loading...</>
                    )}
                </button>
                {uploadResult ? (
                    <div className="upload-result">{uploadResult}</div>
                ) : (
                    false
                )}
                {uploading ? (
                    <div className="loading-container">
                        <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    false
                )}
            </div>
        </div>
    ) : (
        <div className="loading-container">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default CreateTodo;
