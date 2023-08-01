import { useState } from "react";
import { loadAll, loadFile } from "../services/api-service";
import Notification from "./Notification";
import axios from "axios";

const FileLoader = () => {
    const [fileList, setFileList] = useState(null)
    const [file, setFile] = useState('')
    const [note, setNote] = useState('')
    const files = fileList ? [...fileList] : []

    const handleFile = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }
    const handleFileChange = (e) => {
        if (e.target.files.length > 100) {
            setNote('Максимальное количество файлов 100')
            setFileList(null)
            e.target.value = ''
            return
        }
        setFileList(e.target.files)
    }
    const handleUploadAll = (fileList) => {
        if (!fileList) {
            setNote('Добавьте файлы.')
            return;
        }
       loadAll(fileList)
    }
    const handleUploadFile = async () => {
        if (!file) {
            setNote('Добавьте файл.')
            return;
        }
        try {
            await loadFile(file)
            setFile(null)
            setNote(`${file.name} успешно загружен.`)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setNote(error.response.data.message)
            } else {
                setNote('Что-то пошло не так')
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="loader_container">
                <div className="div_title">Загрузка файлов на yandex disk</div>
                <div className="loader">
                    выбрать файл
                    <input
                        type='file'
                        onChange={handleFile} />

                    <div>{file && `${file.name} - ${file.type}`}</div>
                    <button onClick={handleUploadFile}>загрузить файл</button>
                </div>

                <div>
                    <div>
                        <input type="file" onChange={handleFileChange} multiple />

                        <ul>
                            {files.map((file, i) => (
                                <li key={i}>
                                    {file.name} - {file.type}
                                </li>
                            ))}
                        </ul>

                        <button onClick={handleUploadAll}>Upload</button>
                    </div>
                </div>
            </div>
            <Notification note={note} setNote={setNote} />
        </>
    )
};

export default FileLoader;