import React, { useEffect, useRef, useState } from "react";
import Spinner from "../Loading/Spinner";
import "./AddListing.scss";

export default function DropArea({setPictures, pictures, setError, loading, setLoading}) {
    const uploadAreaRef = useRef();
    const [fileCount, setFileCount] = useState(0);

    // HANDLE DRAG AND DROP UPLOADS
	useEffect(() => {
		const uploadAreaElement = uploadAreaRef.current;

        if (!uploadAreaElement) return;

		// prevent default behaviour for all relevant events to avoid unexpected behaviour
		["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
			uploadAreaElement.addEventListener(eventName, preventDefaults, false);
		});

		function preventDefaults(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		// HANDLE drag over

		// add "highlight" class when user drags over a file
		["dragenter", "dragover"].forEach((eventName) => {
			uploadAreaElement.addEventListener(eventName, highlight, false);
		});

		// remove "highlight" class when user no longer drags over a file
		["dragleave", "drop"].forEach((eventName) => {
			uploadAreaElement.addEventListener(eventName, unhighlight, false);
		});

		function highlight(e) {
			uploadAreaElement.classList.add("highlight");
		}

		function unhighlight(e) {
			uploadAreaElement.classList.remove("highlight");
		}

		// HANDLE drop

        uploadAreaElement.addEventListener('drop', handleDrop, false)

        function handleDrop(e) {
            handleUpload(e.dataTransfer.files);
        }
          
        // cleanup event listeners
        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                uploadAreaElement.removeEventListener(eventName, preventDefaults, false);
            });
            ["dragenter", "dragover"].forEach((eventName) => {
                uploadAreaElement.removeEventListener(eventName, highlight, false);
            });
            ["dragleave", "drop"].forEach((eventName) => {
                uploadAreaElement.removeEventListener(eventName, unhighlight, false);
            });
            uploadAreaElement.removeEventListener('drop', handleDrop, false)
        };
	}, []);

    // HANDLE BUTTON UPLOADS
    function handleButtonUpload(e) {
        e.preventDefault();
        handleUpload(e.target.files)
    }

    // HANDLE UPLOAD
    function handleUpload(files) {
        setLoading(true);
        setError(false);
        handleFiles(files)
                .then((returnedData) => {
                    setLoading(false);
                    setPictures(prevState => [...prevState, ...returnedData]);
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err.message)});
    }

    // handle files
    async function handleFiles(files) {
        const filesArray = [...files];
        const returnedData = [];

        setFileCount(filesArray.length);

        for (let i = 0; i < filesArray.length; i++) {
            try {
                const data = await uploadFile(filesArray[i]);
                returnedData.push(data.image);
            } catch (err) {
                throw Error(err);
            }
            

        }
        return returnedData;
    }
    
    // send the image to an external hosting service
    async function uploadFile(file) {
        let url = "https://freeimage.host/api/1/upload";

        const formData = new FormData()
        formData.append("source", file)

        const response = await fetch(url + "?key=" + process.env.REACT_APP_IMG_API_KEY, {
            method: "POST",
            body: formData
        })
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (!response.ok) {
            throw Error("Something went wrong when uploading your images");
        }
        
    }

    if (loading) {
        return (<div className="upload-area-loading">
            <Spinner/>
            <p>Uploading {fileCount} {fileCount > 1 || fileCount === 0 ? "files" : "file"}</p>
        </div>)
    } else {
        return  (<div className="upload-section" ref={uploadAreaRef}>
        <span className="material-symbols-outlined">
            add_photo_alternate
        </span>
        <p>
            Drop your images here or click the button to upload your images
        </p>
        <label htmlFor="file-input">Upload</label>
        <input type="file" id="file-input" multiple onChange={handleButtonUpload}/>
        </div>)
    }
}
