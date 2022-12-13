import React, { useEffect, useRef } from "react";

export default function PicturePreviews({ pictures, removePicture }) {
	return (
		<div className="image-previews">
			{pictures.length > 0 &&
				pictures.map((picture) => {
					return (
						<div
							className="image-wrapper"
							key={picture.id_encoded}
							onClick={() => removePicture(picture.id_encoded)}
						>
							<img src={picture.thumb.url} alt={picture.name} />
							<div className="remove-overlay">
								<span className="material-symbols-outlined">delete</span>
							</div>
                            
						</div>
					);
				})}
		</div>
	);
}
