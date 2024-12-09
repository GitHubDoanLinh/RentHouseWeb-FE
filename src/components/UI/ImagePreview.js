const ImagePreview = ({ image, onRemove }) =>{
    return (
    <div>
        <img
            src={URL.createObjectURL(image)}
            alt={`Preview`}
            style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
        />
        <button type="button" onClick={onRemove}>
            Remove
        </button>
    </div>
);}
export default ImagePreview;
// ImagePreview.js
// import React from 'react';
//
// const ImagePreview = ({ imageUrl, onRemove }) => (
//     <div>
//         <img
//             src={imageUrl}
//             alt={`Preview`}
//             style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
//         />
//         <button type="button" onClick={onRemove}>
//             Remove
//         </button>
//     </div>
// );
//
// export default ImagePreview;