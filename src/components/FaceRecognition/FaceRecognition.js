import React from 'react';
import './faceReg.css'
const FaceRecognition = ({ imageUrl, box }) => {
    console.log(box , "box")
    return (

        <div className='center ma'>
            <div className='mt2 absolute'>
                <img id='imageurl' src={imageUrl} alt='loading...' width='500px' height='auto' />
                <div className='bounding-box'  
                style={{
                top : box.top_col , 
                left : box.left_col ,
                right : box.right_col ,
                 bottom : box.bottom_col  
                }}></div>
            </div>
        </div>

    )
}

export default FaceRecognition 