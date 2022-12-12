import React, { useEffect, useRef } from "react";
import "./AddListing.scss";

export default function DropArea({setPictures, pictures, setError}) {
    const uploadAreaRef = useRef();

    // this useEffect handles drag and drop to upload files
	useEffect(() => {
		const uploadAreaElement = uploadAreaRef.current;

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
            handleFiles(e.dataTransfer.files)
        }

		// HANDLE the dropped files
        function handleFiles(files) {
            ([...files]).forEach(uploadFile)
        }
        
        // send the image to an external hosting service
        async function uploadFile(file) {
            let url = "https://freeimage.host/api/1/upload";

			const formData = new FormData()
			formData.append("source", file)

            try {
                const response = await fetch(url + "?key=" + process.env.REACT_APP_IMG_API_KEY, {
                    method: "POST",
                    body: formData
                })
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setPictures([...pictures, data.image])
                } else if (!response.ok) {
                    setError("Something went wrong when uploading your images");
                }
            } catch (err) {
                setError(err.message);
            }
			
			
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

    return (
        <div className="upload-section" ref={uploadAreaRef}>
			<span className="material-symbols-outlined">
				add_photo_alternate
			</span>
			<p>
				Drop your images here or click the button to upload your images
			</p>
			<label htmlFor="file-input">Upload</label>
			<input type="file" id="file-input" multiple />
		</div>
    )
}
