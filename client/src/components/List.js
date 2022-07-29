import React, {useState,useEffect} from 'react'
import 'boxicons'
import DateList from './dateList'
import {default as api} from '../store/apiSlice'

export default function List() {
  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  const [getLists] = api.useGetListsMutation();
  let [tran, setTran] = useState();
  const [isclick, setClick] = useState(false);
  let Transactions, history, dateLists;

  const handleClick = (e) => {
    if(!e.target.dataset.id) return 0;
    deleteTransaction({ _id : e.target.dataset.id })
    window.location.reload();
  }

  const handleOnClick = async (e) => {
    if(!e.target.value) return {};
    setClick(true);
    const result = await getLists({data: e.target.value});
    Transactions = result.data.map((v, i) => <Transaction key={i} category={v} handle={handleClick} ></Transaction>);
    setTran(Transactions);
  }

  if(isFetching){
    Transactions = <div>Fetching</div>;
  }else if(isSuccess){
    Transactions = data.map((v, i) => <Transaction key={i} category={v} handle={handleClick} ></Transaction>);
    history = historyHeader(Transactions);
    dateLists = <DatelistShow date={Transactions} click={handleOnClick}></DatelistShow>
  }else if(isError){
    Transactions = <div>Error</div>
  }

  if(isclick){
    Transactions = "";
    if(tran){
      if(!Boolean(tran[0].props.category)){
        tran = (<div className="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                  <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <p className="font-bold text-red-700">No records found</p>
                </div>
              </div>);
      }
    }
  }

  return (
    <div className="flex flex-col py-6 gap-3">
        {history}
        {dateLists}
        {Transactions}
        {tran}
    </div>
  )
}
function Transaction({category, handle}){
    if(!category) return <></>;
    return (
      <div className="item flex justify-center bg-gray-50 py-1 rounded " style={{ borderLeft : `8px solid ${category.color ??  "#e5e5e5"}`}}>
        <span className='block w-full'>{(category.name.length >= 25 ? category.name.substring(0, 25) + "..." : category.name) ?? ''}</span>
        <div className='has-tooltip'>
          <span className='tooltip rounded shadow-lg p-1 px-3 bg-zinc-500 text-white -mt-9'>$ {category.amount}</span>
          <box-icon className='flex' color={category.color ??  "#e5e5e5"} name='dollar-circle'></box-icon>
        </div>
        <button className='px-3' onClick={handle}><box-icon data-id={category._id ?? ''}  color={category.color ??  "#e5e5e5"} name="trash" ></box-icon></button>            
      </div>
    )
}

function historyHeader(data){
  if(data.length == 0 || data == null) return <></>;
  return (
    <h1 className="py-4 font-bold text-xl">History</h1>
  )
}

function DatelistShow({date,click}){
  if(date.length == 0 || date == null) return <></>;
  return (
    <DateList onClick={click}></DateList>
  )
}

