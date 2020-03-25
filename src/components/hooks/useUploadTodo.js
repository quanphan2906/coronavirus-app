import { useState, useEffect } from "react";
import services from "../../services";

function useUploadTodo(auth, todoInfo, files, todoId) {
    const [isUploading, setIsUploading] = useState(false);
    const [validation, setValidation] = useState({
        title: "",
        description: "",
        steps: {}
    });
    const [uploadResult, setUploadResult] = useState(null);

    const validate = (todoObj, validation) => {
        const validationRes = validation;
        validationRes.isValid = true;
        if (todoObj.title === "") {
            validationRes.title = "Please input your todo's title";
            validationRes.isValid = false;
        }
        if (todoObj.description === "") {
            validationRes.description = "Please input your todo's description";
            validationRes.isValid = false;
        }
        for (let index in todoObj.steps) {
            if (todoObj.steps[index].content === "") {
                validationRes.isValid = false;
                validationRes.steps[index] =
                    "Please input the content of this step or delete it";
            }
        }
        if (validationRes.isValid) {
            return true;
        } else {
            delete validationRes.isValid;
            setValidation(validationRes);
            setIsUploading(false);
            return false;
        }
    };

    const uploadToFirebaseStorage = async file => {
        const fileName = new Date() + "-" + file.name;
        const res = await services.uploadFile("image", fileName, file);
        return res;
    };

    // useEffect(() => {
    //     var steps = {};
    //     for (let key in todoInfo.steps) {
    //         steps[key] = "";
    //     }
    //     setValidation({
    //         title: "",
    //         description: "",
    //         steps: steps
    //     });
    // }, [todoInfo]);

    useEffect(() => {
        if (isUploading === true) {
            const upload = async () => {
                setIsUploading(true);
                const todoObj = {
                    ...todoInfo,
                    author: auth.id,
                    createdAt: new Date()
                };
                const boolean = validate(todoObj, validation);
                if (boolean) {
                    if (todoInfo.imgUrl === "" && files.img) {
                        const res = await uploadToFirebaseStorage(files.img);
                        if (res.isSuccess) {
                            todoObj.imgUrl = res.url;
                        } else {
                            setUploadResult(res.error);
                        }
                    }
                    for (let index in todoInfo.steps) {
                        const step = todoInfo.steps[index];
                        if (!step.imgUrl && files.steps[index]) {
                            const res = await uploadToFirebaseStorage(
                                files.steps[index]
                            );
                            if (res.isSuccess) {
                                todoObj.steps[index].imgUrl = res.url;
                            } else {
                                setUploadResult(res.error);
                            }
                        }
                    }
                    delete todoObj.id;
                    if (todoId) {
                        await services.update("todos", todoId, todoObj);
                    } else {
                        await services.create("todos", todoObj);
                    }
                    setIsUploading(false);
                    setUploadResult("Upload Succeed");
                }
            };
            upload();
        }
    }, [isUploading, todoId, todoInfo, auth]);

    return [
        { isUploading, validation, uploadResult },
        setIsUploading,
        setValidation,
        setUploadResult
    ];
}

export default useUploadTodo;
