import React from 'react';
import '../../App.css'
const ImageLinkForm = ({onInputChange , onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>{'this is a face app for magic '}</p>
            <div className='w-40 center'>
                <input type="text" className='f4 pa2 w-70 center' onChange={onInputChange}/>
                <button className='w-30 ma2 pa2 ph3 pv2 grow dim dib white bg-light-purple link pointer'
                onClick={onButtonSubmit}
                >
                    Detect</button>
            </div>
        </div>

    )
}

export default ImageLinkForm 