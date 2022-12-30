export const renderDefaultImage = (e) => {
    const backupImage = process.env.REACT_APP_PLACEHOLDER_IMG;
    if (e.target.src !== backupImage) {
      e.target.src = backupImage;
    } 
  }