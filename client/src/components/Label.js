import React from "react";
import {default as api} from '../store/apiSlice'
import { getLabels } from '../helper/helper';

export default function Label() {
  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()

  let Transactions;

  if(isFetching){
    Transactions = <div>Fetching</div>;
  }else if(isSuccess){
    Transactions = getLabels(data, 'type').map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>);
  }else if(isError){
    Transactions = <div>Error</div>
  }

  return (
    <>
      {Transactions}
    </>
  );
}

function LabelComponent({data}) {
  if (!data) return <></>;
  return (
    <div className="lables flex justify-between py-1">
      <div className="flex gap-3">
        <div className="w-1 rounded py-3" style={{ background: data.color ?? "#f9c74f" }}></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
