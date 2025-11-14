
import { useEffect } from "react";
import { ReadyState, useServer } from "../useServer";

export const App = () => {
  const { readyState } = useServer((msg) => {
    console.log(msg);
  });

  function onViewItemList(items)
  {
    console.log("view_item_list event detected:", items);
  }
  
  useEffect(() => {

    window.addEventListener('datalayerpush', (event: any) => {
       if(event.detail.eventAction === 'view_item_list') {
        onViewItemList(event.detail.ecommerce.impressions);
       }
    })
  },[])
  return readyState === ReadyState.OPEN ? <>test</> : <>null</>;
};
