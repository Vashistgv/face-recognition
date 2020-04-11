import React from 'react';

const Rank = ({name , rank}) => {
    return(
        
           <div>
               <div className='white f3'>
{`${name} you have searched ... `}
               </div>
               <div className='white f3'>
{`#${rank}`}
               </div>
           </div>
    
    )
}

export default Rank 