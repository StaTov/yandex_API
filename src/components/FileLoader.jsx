import { useState, useRef } from "react";
import { uploadAll } from "../services/api-service";
import Notification from "./Notification";



const FileLoader = () => {
    const [fileList, setFileList] = useState(null)
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const aRef = useRef(null);
    const files = fileList ? [...fileList] : []

    const handleFileChange = (e) => {
        if (e.target.files.length > 100) {
            setNote('Максимальное количество файлов 100')
            setFileList(null)
            e.target.value = ''
            return
        }
        setFileList(e.target.files)
    }

    const handleUploadAll = async () => {
        // Проверка на наличие файлов
        if (!files || files.length < 1) {
            setNote('Добавьте файлы.')
            return;
        }
        try {
            setIsLoading(true)
            const existFiles = await uploadAll(files)

            // Проверка существующих файлов 
            if (existFiles && existFiles.length > 0) {

                const messageList = existFiles.map(m =>
                    m.message.slice(7, -16))
                setNote(<div>
                    Невозможно добавить файлы, <br />
                    Файлы с таким именем уже существуют на диске:
                    <ul>
                        {messageList.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                </div>)
                return;
            }
            setNote('Все файлы успешно загружены.')
        } catch (error) {
            setNote(`Что-то пошло не так ${error.message}`)
            console.log(error)
        } finally {
            aRef.current.value = null;
            setFileList(null)
            setIsLoading(false)
        }
    }
//rgb(172, 231, 211)
    return (
        <>
            <div className="loader_container">
                <div className="div_title">Загрузка файлов на yandex disk</div>
                <div>
                    <div className='loader'>
                        <input ref={aRef} type="file" onChange={handleFileChange} multiple />
                        <button onClick={handleUploadAll}>Загрузить</button>
                        {isLoading && <div className="box_circle2">
                            <div className="circle2"></div>
                        </div>}
                    </div>
                        <div className="box__1">
                            Файлы:
                            <div className='box_list'>
                                <ul style={{ marginLeft: '40px' }}>
                                    {files.map((file, i) => (
                                        <li key={i}>
                                            {file.name} - {file.type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                </div>


            </div>
            <Notification note={note} setNote={setNote} />
        </>
    )
};

export default FileLoader;