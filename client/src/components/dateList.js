import React from 'react'
import {default as api} from '../store/apiSlice'

export default function DateList() {
  const [getLists] = api.useGetListsMutation();

  const handleClick = (e) => {
    if(!e.target.value) return {};
    getLists({data: e.target.value})
  }

  return (
    <ul className="flex">
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="all" onClick={handleClick}>All</button>
        </li>
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="week" onClick={handleClick}>Week Ago</button>
        </li>
        <li className="mr-3">
        <button className="inline-block rounded py-1 px-3 bg-indigo-500 text-white" value="month" onClick={handleClick}>Month Ago</button>
        </li>
    </ul>
  )
}