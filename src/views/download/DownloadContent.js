import {useState} from "react"

const DownloadContent = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleDownload = () => {
        if (file) {
            const url = window.URL.createObjectURL(new Blob([file]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('파일을 업로드하세요.');
        }
    }

    return (
        <div>
            <h1>로컬 파일 다운로드 페이지</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleDownload}>파일 다운로드</button>
        </div>
    )
}

export default DownloadContent