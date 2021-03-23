import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
const SkeletonLoading =()=>
         {
          return(
          <>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="text" height={30}/>
          <Skeleton variant="rect"  height={160} />
          <Skeleton variant="text" />
          </>
         )}

export default SkeletonLoading