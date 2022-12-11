import React, { useEffect, useRef } from "react";
import "./AddListing.scss";

export default function AddListing() {
	const uploadAreaRef = useRef();

    // this useEffect handles drag and drop to upload files
	useEffect(() => {
		["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
			uploadAreaRef.current.addEventListener(eventName, preventDefaults, false);
		});

		function preventDefaults(e) {
			e.preventDefault();
			e.stopPropagation();
		}

		["dragenter", "dragover"].forEach((eventName) => {
			uploadAreaRef.current.addEventListener(eventName, highlight, false);
		});
		["dragleave", "drop"].forEach((eventName) => {
			uploadAreaRef.current.addEventListener(eventName, unhighlight, false);
		});

		function highlight(e) {
			uploadAreaRef.current.classList.add("highlight");
		}

		function unhighlight(e) {
			uploadAreaRef.current.classList.remove("highlight");
		}

        uploadAreaRef.current.addEventListener('drop', handleDrop, false)

        function handleDrop(e) {
            handleFiles(e.dataTransfer.files)
        }

        function handleFiles(files) {
            ([...files]).forEach(uploadFile)
        }
        
        // send data to node server
        function uploadFile(file) {
            let url = process.env.REACT_APP_SERVER_URL + "/upload/image"
            let formData = new FormData()
            let headers = new Headers();

			// TODO: figure out how to upload files


			// METHOD 1, URI string too long

            //  // output base64 string
            //   var reader = new FileReader();
        
            //   reader.onload = function () {
            //       let base64String = reader.result.replace("data:", "")
            //           .replace(/^.+,/, "")
            //      // "http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5&source=" + encodeURIComponent(base64String) + "&format=json"
            //       fetch(url, {
            //           method: 'POST',
            //           headers: { 'Content-Type': 'application/json' },
            //           body: JSON.stringify({ base64: base64String})
            //       })
            //       .then(response => { console.log(response, "response"); return response.json()})
            //       .then(data => console.log(data, "data"))
            //       .catch((err) => { console.log(err, err.message) })
            //   }
            //   reader.readAsDataURL(file);

			// METHOD 2, Imgur api too busy? Too many requests

            //  headers.append("Authorization", `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`);
            //  formData.append('image', file)
            //  console.log(formData.getAll("image"));
    
            //  fetch(url, {
            //    method: 'POST',
            //    body: formData,
            //    headers: headers,
            //  })
            //  .then(response => { console.log(response, "response"); return response.json()})
            //  .then(data => console.log(data, "data"))
            //  .catch((err) => { console.log(err, err.message) })
        }
          

        return () => {
            ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                uploadAreaRef.current.removeEventListener(eventName, preventDefaults, false);
            });
            ["dragenter", "dragover"].forEach((eventName) => {
                uploadAreaRef.current.removeEventListener(eventName, highlight, false);
            });
            ["dragleave", "drop"].forEach((eventName) => {
                uploadAreaRef.current.removeEventListener(eventName, unhighlight, false);
            });
            uploadAreaRef.current.removeEventListener('drop', handleDrop, false)
        };
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<section className="item-section">
			<h2>Add a Listing</h2>
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<div className="left">
						<div className="form-section">
							<label>Title</label>
							<input type="text" />
						</div>
						<div className="form-section">
							<label>Description</label>
							<textarea cols="30" rows="5"></textarea>
						</div>
						<div className="form-section">
							<label>Price</label>
							<input type="number" />
						</div>
						<div className="form-section">
							<label>Location</label>
							<input type="text" />
						</div>
						<button className="gradient-btn">Create</button>
					</div>

					<div className="image-upload-container">
						<label>Upload Images</label>
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
					</div>
				</form>
			</div>
		</section>
	);
}
