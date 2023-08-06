import { useState, useRef } from "react";
import { uploadAll } from "../services/api-service";
import Notification from "./Notification";

const DiskApi = () => {

    const [fileList, setFileList] = useState(null)
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const aRef = useRef(null);
    const files = fileList ? [...fileList] : []

    const handleFileChange = (e) => {
        if (e.target.files.length > 100) {
            setNote('Максимальное количество файлов 100')
            setFileList(null)
            aRef.current.value = null
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
                    Невозможно выполнить. <br />
                    Файлы с таким именем уже существуют на диске:
                    <ul className='messagelist'>
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

    const handleRemoveByClick = (name) => {
        if (!name) {
            return
        }
        setFileList([...fileList].filter(f => f.name !== name))
    }

    return (
        <>
            <div className='container_bx'>
                <div className='box'>
                    <h2 className='upload_title'>Добавить файлы на диск</h2>
                    <div className='upload_bx'>
                        <input ref={aRef} type="file" onChange={handleFileChange} id='upload_input' multiple hidden />
                        <label htmlFor='upload_input' className='upload_label'>
                            <span className='fa fa-cloud-download'></span>
                            <div className='upload_text'>Click To Upload</div>
                        </label>
                        <div className="buttonwrapper" >
                            <button type='button' onClick={handleUploadAll}>
                                {
                                    isLoading
                                        ? <i className='fa fa-refresh fa-spiner'></i>
                                        : 'загрузить'
                                }
                            </button>
                        </div>
                        <div id='filewrapper'>
                            <h3 className='uploaded'>Выбранные файлы</h3>
                            {files.map((file, i) => (
                                <div className='filebox' key={i}>
                                    <div className='left'>
                                        <span className='filetype'>{file.type}</span>
                                        <h3>{file.name}</h3>
                                    </div>
                                    <div className='right'>
                                        <span type='button' onClick={() => handleRemoveByClick(file.name)}>&#215;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Notification note={note} setNote={setNote} />
        </>
    )
}

export default DiskApi;