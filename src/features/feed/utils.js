export const isPostLikedByLoggedInUser = (post, loggedInUser) => {
    return post.likes.findIndex(user => user._id === loggedInUser._id) !== -1;
}

export const uploadImage = async (imageFiles) => {
    let imagesMedia = [];
    for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', imageFiles[i]);
        formData.append('upload_preset', 'nivsbj7l');
        let response = await fetch(
            'https://api.cloudinary.com/v1_1/grvsharma/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        );
        response = await response.json();
        imagesMedia.push(response.url);        
    }    
    return imagesMedia;
};

export const uploadVideo = async (videoFiles) => {
    let videosMedia = [];
    for (let i = 0; i < videoFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', videoFiles[i]);
        formData.append('upload_preset', 'nivsbj7l');
        let response = await fetch(
            'https://api.cloudinary.com/v1_1/grvsharma/video/upload',
            {
                method: 'POST',
                body: formData,
            }
        );
        response = await response.json();
        videosMedia.push(response.url);
        // videosMedia.push({
        //     mediaType: 'VIDEO',
        //     source: response.url,
        // });
    }
    return videosMedia;
};

export const validateFileSize = (files) => {
    for (let i = 0; i < files.length; i++) {
        if ((files[i].size / 1024 / 1024) > 5) {
            return false;
        }
    }
    return true;
}