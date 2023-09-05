import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const NewEditor = ({editorData,handleChangeEditor,type, value}) => {
    // console.log(editorData);
    const handleChange = (content) => {
        // console.log(editorData);
        handleChangeEditor(content);//Get Content Inside Editor
    }

    if (!editorData) {
        return null;
    }

    return (
        <div>
            <SunEditor
                defaultValue={editorData}
                setOptions={{ height: 400,buttonList: [['undo', 'redo', 'bold', 'underline', 'fontColor', 'table', 'link', 'image','indent','outdent','list','link','align', 'codeView','video','formatBlock']] }}
                onChange={handleChange}
            />
        </div>
    );
};
export default NewEditor;
