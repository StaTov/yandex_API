import { useState } from "react";

const FileLoader = () => {
    const [file, setFile] = useState('')
    

    const handleFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleUploadFile = () => {
        if (!file) {
            return;
        }
        console.log('file', file)
    }

    return (
        <>
            <div >
                <label >
                    добавить файл
                    <input type='file' onChange={handleFile} />
                </label>
                <div>{file && `${file.name} - ${file.type}`}</div>
                <button onClick={handleUploadFile}>загрузить файл</button>
            </div>
        </>
    )
};

export default FileLoader;