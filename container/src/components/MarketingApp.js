import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathName })=>{
        if(history.location.pathname !== nextPathName){
          history.push(nextPathName);
        }
      }
    });

    // let the child mfe know about navigation in the container app
    history.listen(onParentNavigate); 
  }, []);

  return <div ref={ref} />;
};
